"use server";

import { EditProfileFormValues } from "@/components/user/edit-profile-form";
import { getCurrentUser } from "../auth/get-current-user";
import { prisma } from "@/database/db";
import { revalidatePath } from "next/cache";

export const updateProfile = async (data: EditProfileFormValues) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    await prisma.$transaction(async (tx) => {
      // update user
      await tx.user.update({
        where: {
          id: currentUser.id,
        },
        data: {
          name: data.name,
          phone: data.phone,
        },
      });

      // get user default address
      const defaultAddress = await tx.address.findFirst({
        where: {
          userId: currentUser.id,
          isDefault: true,
        },
      });

      if (defaultAddress) {
        await tx.address.update({
          where: {
            id: defaultAddress.id,
          },
          data: {
            firstName: data.firstname,
            lastName: data.lastname,
            phone: data.phone,
            street: data.street,
            city: data.city,
            state: data.state,
            country: data.country,
            postalCode: data.postalCode,
          },
        });
      } else {
        await tx.address.create({
          data: {
            userId: currentUser.id,
            firstName: data.firstname,
            lastName: data.lastname,
            phone: data.phone,
            street: data.street,
            city: data.city,
            state: data.state,
            country: data.country,
            postalCode: data.postalCode,
            isDefault: true,
          },
        });
      }
    });

    revalidatePath("/account");
    revalidatePath("/account/edit");
    return {
      success: true,
      message: "Profile updated successfully",
    };
  } catch (error) {
    console.error("Failed to update Profile:", error);
    return {
      success: false,
      message: "Failed to update Profile",
    };
  }
};
