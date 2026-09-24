import FrontendLayout from "@/components/layouts/frontend-layout";
import Breadcrumb from "@/components/ui/breadcrumb";
import Button from "@/components/ui/button";
import { logout } from "@/server-actions/auth/logout";
import { getProfile } from "@/server-actions/user/get-profile";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FiLogOut, FiMapPin, FiPackage, FiUser } from "react-icons/fi";

const Account = async () => {
  const userProfile = await getProfile();
  if (!userProfile) {
    redirect("/login");
  }
  const address = userProfile.addresses[0];

  return (
    <FrontendLayout>
      <section className="mx-auto max-w-3xl py-10 sm:py-14">
        <Breadcrumb
          items={[{ label: "Home", href: "/" }, { label: "My Account" }]}
        />

        <header className="mb-8">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            My Account
          </h1>
          <p className="mt-2 text-sm text-muted-foreground sm:text-base">
            Manage your profile, orders and account.
          </p>
        </header>

        <div className="space-y-6">
          {/* Profile */}
          <div className="rounded-2xl border border-border bg-card p-5 sm:p-7">
            <div className="mb-6 flex items-center gap-3 border-b border-border pb-5">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-surface text-primary">
                <FiUser size={20} />
              </span>
              <h2 className="text-lg font-semibold text-foreground">
                Profile Information
              </h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl bg-surface px-4 py-3">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  Full Name
                </p>
                <p className="mt-1 font-medium text-foreground">
                  {userProfile.name}
                </p>
              </div>

              <div className="rounded-xl bg-surface px-4 py-3">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  Email
                </p>
                <p className="mt-1 break-all font-medium text-foreground">
                  {userProfile.email}
                </p>
              </div>

              <div className="rounded-xl bg-surface px-4 py-3">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  Phone
                </p>
                <p className="mt-1 font-medium text-foreground">
                  {userProfile.phone ?? "Not provided"}
                </p>
              </div>

              <div className="rounded-xl bg-surface px-4 py-3">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  Member Since
                </p>
                <p className="mt-1 font-medium text-foreground">
                  {userProfile.createdAt.toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href="/account/edit" className="sm:w-auto">
                <Button
                  leftIcon={<FiUser size={16} />}
                  className="w-full sm:w-auto"
                >
                  Edit Profile
                </Button>
              </Link>

              <Link href="/account/orders" className="sm:w-auto">
                <Button
                  variant="outline"
                  leftIcon={<FiPackage size={18} />}
                  className="w-full sm:w-auto"
                >
                  My Orders
                </Button>
              </Link>

              <Button
                variant="outline"
                leftIcon={<FiLogOut size={16} />}
                onClick={logout}
                className="w-full border-destructive/30 text-destructive hover:bg-destructive/5 sm:ml-auto sm:w-auto"
              >
                Logout
              </Button>
            </div>
          </div>

          {/* Shipping address */}
          <div className="rounded-2xl border border-border bg-card p-5 sm:p-7">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-surface text-primary">
                <FiMapPin size={20} />
              </span>
              <h2 className="text-lg font-semibold text-foreground">
                Shipping Address
              </h2>
            </div>

            {address ? (
              <div className="space-y-2 text-sm text-muted-foreground">
                <p className="font-medium text-foreground">
                  {address.firstName} {address.lastName}
                </p>

                <p>{address.street}</p>
                <p>
                  {address.city}, {address.state}
                </p>
                <p>{address.country}</p>
                {address.postalCode && <p>{address.postalCode}</p>}
                <p>{address.phone}</p>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                No shipping address added yet.
              </p>
            )}
          </div>
        </div>
      </section>
    </FrontendLayout>
  );
};

export default Account;
