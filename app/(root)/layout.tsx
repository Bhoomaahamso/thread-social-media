import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";
import "../globals.css";
import LeftSidebar from "@/components/LeftSidebar";
import RightSidebar from "@/components/RightSidebar";
import Bottombar from "@/components/Bottombar";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Threads",
  description: "Threads social network",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <div className="ha-screen flex flex-col h-screen">
            <Navbar />
            <section className="flex flex-1 ha-max bg-black text-white">
              <LeftSidebar />
              <main className="flex-1 overflow-auto  max-h-[calc(100vh_-_48px)]">{children}</main>
              {/* <RightSidebar /> */}
            </section>
            <Bottombar />
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
