import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="h-11 bg-purple-600 p-6 flex justify-between items-center">
      <Link href="/">
        <div className="flex items-center px-2 text-white p-6">
          <Image
            src="/assets/logo.svg"
            alt="logo"
            width={36}
            height={36}
            className="text-white rounded-full p-1"
          />
          <p className="text-white text-xl">Threads</p>
        </div>
      </Link>
      {/* <div className="text-white md:hidden"> */}
      <div className="text-white">
        <UserButton afterSignOutUrl="/" />
      </div>
    </nav>
  );
};
export default Navbar;
