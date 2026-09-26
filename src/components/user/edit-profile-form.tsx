"use client";

import Link from "next/link";
import { FiMapPin, FiUser } from "react-icons/fi";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { getProfile } from "@/server-actions/user/get-profile";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateProfile } from "@/server-actions/user/updateProfile";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface EditProfileFormProps {
  userProfile: Awaited<ReturnType<typeof getProfile>>;
}

export const editProfileSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters.")
    .max(100, "Name is too long."),

  phone: z
    .string()
    .trim()
    .min(10, "Please enter a valid phone number.")
    .max(20, "Phone number is too long."),

  email: z.email(),
  firstname: z.string().trim().min(2, "First name is required."),

  lastname: z.string().trim().min(2, "Last name is required."),

  country: z.string().trim().min(2, "Country is required."),

  state: z.string().trim().min(2, "State is required."),

  city: z.string().trim().min(2, "City is required."),

  postalCode: z.string().trim().optional(),

  street: z.string().trim().min(5, "Street address is required."),
});

export type EditProfileFormValues = z.infer<typeof editProfileSchema>;

const EditProfileForm = ({ userProfile }: EditProfileFormProps) => {
  const router = useRouter();
  const address = userProfile?.addresses[0];
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EditProfileFormValues>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      name: userProfile?.name ?? "",
      phone: userProfile?.phone ?? "",
      email: userProfile?.email ?? "",
      country: address?.country ?? "",
      firstname: address?.firstName ?? "",
      lastname: address?.lastName ?? "",
      city: address?.city ?? "",
      state: address?.state ?? "",
      postalCode: address?.postalCode ?? "",
      street: address?.street ?? "",
    },
  });

  const onSubmit = async (data: EditProfileFormValues) => {
    const result = await updateProfile(data);
    if(!result.success){
        return toast.error(result.message);
    }
    toast.success(result.message);
    router.refresh();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Personal Information */}
      <div className="rounded-2xl border border-border bg-card p-5 sm:p-7">
        <div className="mb-6 flex items-center gap-3 border-b border-border pb-5">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-surface text-primary">
            <FiUser size={20} />
          </span>
          <h2 className="text-lg font-semibold text-foreground">
            Personal Information
          </h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Input
            {...register("name")}
            label="Full Name"
            placeholder="John Doe"
            error={errors.name?.message}
          />
          <Input
            {...register("phone")}
            label="Phone Number"
            type="tel"
            placeholder="+234..."
            error={errors.phone?.message}
          />
          <div className="sm:col-span-2">
            <Input
              {...register("email")}
              label="Email Address"
              type="email"
              disabled
              className="cursor-not-allowed bg-surface text-muted-foreground"
              error={errors.email?.message}
            />
          </div>
        </div>
      </div>

      {/* Shipping Address */}
      <div className="rounded-2xl border border-border bg-card p-5 sm:p-7">
        <div className="mb-6 flex items-center gap-3 border-b border-border pb-5">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-surface text-primary">
            <FiMapPin size={20} />
          </span>
          <h2 className="text-lg font-semibold text-foreground">
            Shipping Address
          </h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Input
            {...register("firstname")}
            label="First Name"
            error={errors.firstname?.message}
          />
          <Input
            {...register("lastname")}
            label="Last Name"
            error={errors.lastname?.message}
          />
          <Input
            {...register("country")}
            label="Country"
            error={errors.country?.message}
          />
          <Input
            {...register("state")}
            label="State"
            error={errors.state?.message}
          />
          <Input
            {...register("city")}
            label="City"
            error={errors.city?.message}
          />
          <Input
            {...register("postalCode")}
            label="Postal Code"
            placeholder="100001"
            error={errors.postalCode?.message}
          />
          <div className="sm:col-span-2">
            <Input
              {...register("street")}
              label="Street Address"
              error={errors.street?.message}
              placeholder="Enter your address"
              variant="textarea"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Link href="/account" className="sm:w-auto">
          <Button type="button" variant="outline" className="w-full sm:w-auto">
            Cancel
          </Button>
        </Link>
        <Button
          type="submit"
          className="w-full sm:w-auto"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
};

export default EditProfileForm;
