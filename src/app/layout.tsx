import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { getServerSession } from "next-auth/next";
import { options } from "./api/auth/[...nextauth]/options";
import Navbar from "@/components/Navigation/Navbar";
import ZustandHydrate from "@/utils/ZustandHydrate";
import ShoppingCart from "@/components/ShoppingCart";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const userSession = await getServerSession(options);

  return (
    <html lang="en">
      <body>
        <ZustandHydrate>
          <ShoppingCart />
          <Navbar
            user={userSession?.user}
            expires={userSession?.expires as string}
          />
          <main className="mx-[10%]">{children}</main>
        </ZustandHydrate>
      </body>
    </html>
  );
};

export default RootLayout;
