"use client";

import FrontendLayout from "@/components/layouts/frontend-layout";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { loginWithGoogle } from "@/services/login-with-google";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { z } from "zod";

const LoginSchema = z.object({
  email: z.email("Please enter a valid email address."),
  password: z.string().min(6, "Password must be at least 6 characters long."),
});

// z.infer gets the TypeScript type from the Zod schema for ex : {name: string, email: string, password: string}
type LoginFormValues = z.infer<typeof LoginSchema>;

const LoginPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    // Connects React Hook Form with Zod for form validation
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    // authClient.signIn.email() is a Better Auth method used to login a user using email and password
    const { error } = await authClient.signIn.email({
      email: data.email,
      password: data.password,
    });

    if (error) {
      toast.error(error.message as string);
      return;
    }

    toast.success("Login successful");
    router.replace("/account");
  };

  return (
    <FrontendLayout>
      <section className="flex min-h-[70vh] items-center justify-center py-16">
        <div className="max-w-md w-full">
          {/* header */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-foreground">Welcome Back</h2>
            <p className="mt-3 text-muted-foreground">
              Login to your account to continue shopping.
            </p>
          </div>

          {/* form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 mt-8">
            <Input
              label="Email Address"
              placeholder="Enter your email address"
              type="email"
              {...register("email")}
              error={errors.email?.message}
            />
            <Input
              label="Password"
              placeholder="Enter your password"
              type="text"
              {...register("password")}
              error={errors.password?.message}
            />

            {/* forgot password link */}
            <div className="flex justify-end text-sm">
              <a
                className="font-medium text-primary hover:underline"
                href="/forgot-password"
              >
                Forgot Password?
              </a>
            </div>

            <Button type="submit" fullWidth disabled={isSubmitting}>
              {isSubmitting ? "Logging in..." : "Log In"}
            </Button>

            <Button
              onClick={loginWithGoogle}
              fullWidth
              leftIcon={<FcGoogle size={18} />}
              variant="outline"
              type="button"
            >
              Continue with Google
            </Button>
          </form>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link
              className="font-semibold text-primary hover:underline"
              href="/signup"
            >
              Create an account
            </Link>
          </p>
        </div>
      </section>
    </FrontendLayout>
  );
};

export default LoginPage;
