"use client";

import Image from "next/image";
import { sidebarLinks } from "../constants/menuOptions";
import Link from "next/link.js";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

const Bottombar = () => {
  const { userId } = useAuth();

  const router = useRouter();
  const pathname = usePathname();

  return (
    <section className="w-screen p-3 bg-black text-white fixed left-0 bottom-0 md:hidden">
      <div className="flex justify-around">
        {sidebarLinks.map((link) => {
          const isActive =
            pathname === link.route ||
            (pathname.includes(link.route) && link.route.length > 1);
          if (link.route === "/profile") link.route = `/profile/${userId}`;

          return (
            <div key={link.label}>
              <Link
                className={`mt-6 px-2 py-1 rounded ${
                  isActive && "bg-purple-500"
                } flex flex-col px-2 items-center`}
                href={link.route}
              >
                <Image
                  src={link.imgURL}
                  alt={link.label}
                  width={24}
                  height={24}
                />
                <p className="text-xs mt-2 max-sm:hidden">
                  {link.label.split(" ")[0]}
                </p>
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
};
export default Bottombar;
