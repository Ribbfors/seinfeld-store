import "./globals.css";
import type { Metadata } from "next";
import { getServerSession } from "next-auth/next";
import { options } from "./api/auth/[...nextauth]/options";
import Navbar from "@/components/Navigation/Navbar";
import ZustandHydrate from "@/utils/ZustandHydrate";
import ShoppingCart from "@/components/ShoppingCart";

export const metadata: Metadata = {
  title: "Seinfeld Store",
  description: "A simple showcase project",
};

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const userSession = await getServerSession(options);

  return (
    <html lang="en">
      <body>
        <ZustandHydrate>
          <ShoppingCart email={userSession?.user?.email} />
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
