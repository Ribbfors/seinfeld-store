"use client";

import { usePathname } from "next/navigation";
import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import { EB_Garamond } from "next/font/google";
import {
  Avatar,
  Badge,
  Button,
  Dropdown,
  Navbar as FNavbar,
} from "flowbite-react";
import ShoppingCart from "../ShoppingCart";
import { useCartStore } from "@/store/store";
import { AiOutlineShoppingCart } from "react-icons/ai";

interface NavbarLink {
  label: string;
  href: string;
  icon?: string;
  requiresAuth?: boolean;
}

const Pop = EB_Garamond({ subsets: ["latin"], weight: "600" });

const Navbar = ({ user }: Session) => {
  const cartStore = useCartStore();
  const pathname = usePathname();
  const navbarLinks: NavbarLink[] = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Store",
      href: "/store",
    },
    {
      label: "About",
      href: "/about",
    },
    {
      label: "Profile",
      href: "/profile",
      requiresAuth: true,
    },
  ];

  return (
    <FNavbar>
      <FNavbar.Brand href="/">
        <div className="inline rounded-[50%] -rotate-6 bg-yellow-400 text-red-600 text-5xl pb-2 cursor-pointer my-1">
          <span className={`${Pop.className} inline-block font-semibold`}>
            Seinfeld Store
          </span>
        </div>
      </FNavbar.Brand>
      <div className="flex md:order-2">
        {!user ? (
          <div className="z-1">
            <Button onClick={() => signIn()}>Sign In</Button>
            <FNavbar.Toggle />
          </div>
        ) : (
          <Dropdown
            inline
            label={
              <Avatar
                rounded
                alt="User Profile"
                img={user?.image || "/images/no-profile-picture.png"}
              />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">{user?.name}</span>
              <span className="block truncate text-sm font-medium">
                {user?.email}
              </span>
            </Dropdown.Header>
            {navbarLinks.map((link) => (
              <Dropdown.Item
                key={link.href}
                href={link.href}
                className={`${pathname === link.href && "bg-gray-100"} ${
                  !link.requiresAuth && "block md:hidden"
                }`}
              >
                {link.label}
              </Dropdown.Item>
            ))}

            <Dropdown.Divider />

            <Dropdown.Item
              onClick={() => signOut({ callbackUrl: "http://localhost:3000" })}
            >
              Sign Out
            </Dropdown.Item>
            <div className="flex gap-3 items-center p-2"></div>
          </Dropdown>
        )}
      </div>
      <FNavbar.Collapse>
        {navbarLinks.map((link) => (
          <FNavbar.Link
            key={link.href}
            href={link.href}
            className={`${!link.requiresAuth && "hidden md:block"} ${
              link.requiresAuth && "hidden"
            }`}
            active={pathname === link.href}
          >
            {link.label}
          </FNavbar.Link>
        ))}
      </FNavbar.Collapse>
    </FNavbar>
  );
};

export default Navbar;
