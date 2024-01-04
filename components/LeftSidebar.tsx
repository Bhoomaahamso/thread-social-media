"use client";

import Image from "next/image";
import { sidebarLinks } from "../constants/menuOptions";
import Link from "next/link.js";
import { useRouter, usePathname } from "next/navigation";
import { SignIn, SignOutButton, useAuth } from "@clerk/nextjs";

const LeftSidebar = () => {
  const {userId} = useAuth()
  const router = useRouter();
  const pathname = usePathname();

  // console.log(router, "first", pathname);

  return (
    <section className="w-1/5 p-3 flex flex-col justify-between max-md:hidden">
      <div className="">
        {sidebarLinks.map((link) => {
          const isActive =
            pathname === link.route ||
            (pathname.includes(link.route) && link.route.length > 1);

          if(link.route === '/profile') link.route = `/profile/${userId}`;
          return (
            <div className={`mt-6 px-3 py-1 rounded ${isActive && "bg-purple-500"}`}>
              <Link className="flex gap-2 items-center" href={link.route}>
                <Image
                  src={link.imgURL}
                  alt={link.label}
                  width={24}
                  height={24}
                />
                <p className="text-xs ">{link.label}</p>
              </Link>
            </div>
          );
        })}
      </div>
      {/* <div className="flex items-center"> */}
        {/* <SignIn>
        <SignOutButton signOutCallback={() => router.push("/sign-in")}>
        </SignIn> */}
        {/* <SignOutButton>
          <Link
            href={"/sign-in"}
            className="flex justify-center gap-2 items-center cursor-pointer"
          >
            <Image
              src={"/assets/logout.svg"}
              alt="logout"
              width={24}
              height={24}
            />
            <p className=" text-sm cursor-pointer">Logout</p>
          </Link>
        </SignOutButton> */}
      {/* </div> */}
    </section>
  );
};
export default LeftSidebar;
