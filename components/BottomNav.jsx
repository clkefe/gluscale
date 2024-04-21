"use client";

import Link from "next/link";

import {
  IconHome,
  IconUser,
  IconArticle,
  IconFlame,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const PAGES = [
  {
    href: "/dashboard",
    icon: <IconHome stroke={1.2} width={32} height={32} />,
    active: true,
  },
  {
    href: "/dashboard/carts",
    icon: <IconFlame stroke={1.2} width={32} height={32} />,
    active: false,
  },
  {
    href: "/summary",
    icon: <IconArticle stroke={1.2} width={32} height={32} />,
    active: false,
  },
  {
    href: "/profile",
    icon: <IconUser stroke={1.5} width={32} height={32} />,
    active: false,
  },
];

const BottomNav = () => {
  const pathname = usePathname();
  const [activePage, setActivePage] = useState(null);

  useEffect(() => {
    const currentPath = pathname;

    PAGES.forEach((page) => {
      if (page.href === currentPath) {
        setActivePage(page);
      }
    });
  }, [pathname]);

  return (
    <nav className="fixed inset-x-0 bottom-0 bg-orange-200 border-t shadow-lg">
      <div className="flex justify-between items-center px-8 py-3 max-w-screen-xl mx-auto">
        {PAGES.map((page) => (
          <Link
            key={page.title}
            href={page.href}
            className={`flex items-center ${
              activePage === page && "border-b-2 border-b-orange-400"
            }`}
            width={page.width}
            height={page.height}
          >
            {page.icon}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
