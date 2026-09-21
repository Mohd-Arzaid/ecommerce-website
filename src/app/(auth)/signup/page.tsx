"use client";

import FrontendLayout from "@/components/layouts/frontend-layout";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { z } from "zod";

const SignUpSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.email("Please enter a valid email address."),
  password: z.string().min(6, "Password must be at least 6 characters long."),
});

// z.infer gets the TypeScript type from the Zod schema for ex : {name: string, email: string, password: string}
type SignUpFormValues = z.infer<typeof SignUpSchema>;

const SignupPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormValues>({
    // Connects React Hook Form with Zod for form validation
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignUpFormValues) => {
    console.log(data);
  };

  return (
    <FrontendLayout>
      <section className="flex min-h-[70vh] items-center justify-center py-16">
        <div className="max-w-md w-full">
          {/* header */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-foreground">
              Create Account
            </h2>

            <p className="mt-3 text-muted-foreground">
              Join us and start shopping your favorite styles.
            </p>
          </div>

          {/* form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 mt-8">
            <Input
              label="Full Name"
              placeholder="Enter your full name"
              type="text"
              {...register("name")}
              error={errors.name?.message}
            />
            <Input
              label="Email Address"
              placeholder="Enter your email address"
              type="email"
              {...register("email")}
              error={errors.email?.message}
            />
            <Input
              label="Password"
              placeholder="Create a password"
              type="text"
              {...register("password")}
              error={errors.password?.message}
            />

            <Button fullWidth disabled={isSubmitting}>
              {isSubmitting ? "Creating Account..." : "Create Account"}
            </Button>

            <Button
              fullWidth
              leftIcon={<FcGoogle size={18} />}
              variant="outline"
            >
              Continue with Google
            </Button>
          </form>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              className="font-semibold text-primary hover:underline"
              href="/login"
            >
              Log in
            </Link>
          </p>
        </div>
      </section>
    </FrontendLayout>
  );
};

export default SignupPage;
