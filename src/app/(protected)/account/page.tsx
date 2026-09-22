"use client";
import Button from "@/components/ui/button";
import { logout } from "@/server-actions/auth/logout";

const Account = () => {
  return (
    <div>
      <Button onClick={logout}>Log Out</Button>
    </div>
  );
};

export default Account;
