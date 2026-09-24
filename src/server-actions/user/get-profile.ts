import { prisma } from "@/database/db";
import { getCurrentUser } from "../auth/get-current-user";

export const getProfile = async () => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return null;
    }
    const user = await prisma.user.findUnique({
      where: { id: currentUser.id },
      include: {
        addresses: {
          // is line ka mtlb hai - get the default address of the user from the database
          where: {
            isDefault: true,
          },
          // sirf ek default address ko return karna hai
          take : 1
        },
      },
    });

    return user;
  } catch (error) {
    console.log("Failed to fetch profile", error);
    return null;
  }
};
