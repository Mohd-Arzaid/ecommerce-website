import { getCurrentUser } from "@/server-actions/auth/get-current-user";
import { redirect } from "next/navigation";

const AuthLayout = async ({ children }: LayoutProps<"/">) => {
  const currentUser = await getCurrentUser();
  if (currentUser) {
    redirect("/account");   
  }
  return <div>{children}</div>;
};

export default AuthLayout;
