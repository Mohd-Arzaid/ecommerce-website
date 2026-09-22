import { getCurrentUser } from "@/server-actions/auth/get-current-user";
import { redirect } from "next/navigation";

const ProtectedLayout = async ({ children }: LayoutProps<"/">) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    redirect("/login");
  }
  return <div>{children}</div>;
};

export default ProtectedLayout;
