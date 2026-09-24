import { redirect } from "next/navigation";
import { getCurrentUser } from "./get-current-user";
import { prisma } from "@/database/db";

export const requireAdmin = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    redirect("/login");
  }

  // fetch the users role from the database
  const user = await prisma.user.findUnique({
    where: { id: currentUser.id },
    select: {
      role: true,
    },
  });
  if (user?.role !== "ADMIN") {
    redirect("/account");
  }
};
