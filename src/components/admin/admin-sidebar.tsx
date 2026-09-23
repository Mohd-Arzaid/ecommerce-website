"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { FiHome, FiPackage, FiBox } from "react-icons/fi";
import { LuCirclePlus } from "react-icons/lu";

const navigation = [
    {
      title: "MAIN",
      items: [
        {
          href: "/admin",
          label: "Dashboard",
          icon: FiHome,
        },
      ],
    },
    {
      title: "CATALOG",
      items: [
        {
          href: "/admin/products",
          label: "Products",
          icon: FiPackage,
        },
        {
          href: "/admin/add-product",
          label: "Create Product",
          icon: LuCirclePlus,
        },
      ],
    },
    {
      title: "SALES",
      items: [
        {
          href: "/admin/orders",
          label: "Orders",
          icon: FiBox,
        },
      ],
    },
  ];

const AdminSidebar = () => {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);
  return (
    <div>AdminSidebar</div>
  )
}

export default AdminSidebar