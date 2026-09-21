import FrontendLayout from "@/components/layouts/frontend-layout";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";

const SignupPage = () => {
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
          <form className="space-y-5 mt-8">
            <Input label="Full Name" placeholder="John Doe" type="text" />
            <Input
              label="Email Address"
              placeholder="email@gmail.com"
              type="email"
            />
            <Input
              label="Password"
              placeholder="Create a password"
              type="password"
            />

            <Button fullWidth>Create Account</Button>
            <Button
              fullWidth
              leftIcon={<FcGoogle size={18} />}
              variant="outline"
            >
              Continue with Google
            </Button>
          </form>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Already have an account? <Link href="/signin">Log in</Link>
          </p>
        </div>
      </section>
    </FrontendLayout>
  );
};

export default SignupPage;
