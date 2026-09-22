"use client";

import FrontendLayout from "@/components/layouts/frontend-layout";
import Breadcrumb from "@/components/ui/breadcrumb";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Link from "next/link";
import { FormEvent } from "react";
import { FiMapPin, FiUser } from "react-icons/fi";

const EditProfile = () => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

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

        <form onSubmit={handleSubmit} className="space-y-6">
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
              <Input label="Full Name" name="name" placeholder="John Doe" />
              <Input
                label="Phone Number"
                name="phone"
                type="tel"
                placeholder="+234..."
              />
              <div className="sm:col-span-2">
                <Input
                  label="Email Address"
                  name="email"
                  type="email"
                  disabled
                  className="cursor-not-allowed bg-surface text-muted-foreground"
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
              <Input label="First Name" name="firstname" />
              <Input label="Last Name" name="lastname" />
              <Input label="Country" name="country" />
              <Input label="State" name="state" />
              <Input label="City" name="city" />
              <Input
                label="Postal Code"
                name="postalCode"
                placeholder="100001"
              />
              <div className="sm:col-span-2">
                <Input
                  label="Street Address"
                  name="street"
                  variant="textarea"
                  placeholder="Enter your address"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Link href="/account" className="sm:w-auto">
              <Button
                type="button"
                variant="outline"
                className="w-full sm:w-auto"
              >
                Cancel
              </Button>
            </Link>
            <Button type="submit" className="w-full sm:w-auto">
              Save Changes
            </Button>
          </div>
        </form>
      </section>
    </FrontendLayout>
  );
};

export default EditProfile;
