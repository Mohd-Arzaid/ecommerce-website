import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export const loginWithGoogle = async () => {
  try {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/account",
    });
  } catch (error) {
    toast.error("Google log-in failed");
    return;
  }
};
