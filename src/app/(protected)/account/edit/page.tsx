"use server"

import FrontendLayout from "@/components/layouts/frontend-layout";
import Breadcrumb from "@/components/ui/breadcrumb";
import EditProfileForm from "@/components/user/edit-profile-form";
import { getProfile } from "@/server-actions/user/get-profile";

const EditProfile = async () => {

  const userProfile = await getProfile();

  return (
    <FrontendLayout>
      <section className="mx-auto max-w-3xl py-10 sm:py-14">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Account", href: "/account" },
            { label: "Edit" },
          ]}
        />

        <header className="mb-8">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Edit Profile
          </h1>
          <p className="mt-2 text-sm text-muted-foreground sm:text-base">
            Update your personal details and shipping address.
          </p>
        </header>

        <EditProfileForm userProfile={userProfile} />
      </section>
    </FrontendLayout>
  );
};

export default EditProfile;
