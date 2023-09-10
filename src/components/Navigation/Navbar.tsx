"use client";

import Link from "next/link";
import config from "../../../config";
import { useState } from "react";
import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import { EB_Garamond } from "next/font/google";

const Pop = EB_Garamond({ subsets: ["latin"], weight: "600" });

const NewNavbar = ({ user }: Session) => {
  const [showMenu, setShowMenu] = useState<Boolean>(false);
  return (
    <header className="shadow-md pb-3">
      <nav className="flex justify-between items-center mx-[10%] my-2">
        <Link href="/" className="flex">
          <div className="inline rounded-[50%] -rotate-6 bg-yellow-400 text-red-600 text-5xl pb-2 cursor-pointer my-1">
            <span className={`${Pop.className} inline-block font-semibold`}>
              Seinfeld Store
            </span>
          </div>
        </Link>

        {!user ? (
          <button
            className="bg-yellow-300 rounded-md px-4 py-2"
            onClick={() => signIn()}
          >
            Sign In
          </button>
        ) : (
          <>
            <div
              className="relative ml-3 "
              onClick={() => setShowMenu(!showMenu)}
            >
              <div>
                <button
                  type="button"
                  className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  id="user-menu-button"
                  aria-expanded="false"
                  aria-haspopup="true"
                >
                  <span className="absolute -inset-1.5"></span>
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="h-8 w-8 rounded-full"
                    src={user.image || "images/no-profile-picture"}
                    alt={user.name || "User image"}
                    onClick={() => setShowMenu(!showMenu)}
                  />
                </button>
              </div>
              {showMenu && (
                <div
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu-button"
                >
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700"
                    role="menuitem"
                    id="user-menu-item-0"
                  >
                    Orders (Comming soon)
                  </a>

                  <p
                    onClick={() =>
                      signOut({ callbackUrl: `${config.website_url}` })
                    }
                    className="cursor-pointer block px-4 py-2 text-sm text-gray-700"
                    role="menuitem"
                    id="user-menu-item-2"
                  >
                    Sign out
                  </p>
                </div>
              )}
            </div>
          </>
        )}
      </nav>
    </header>
  );
};

export default NewNavbar;
