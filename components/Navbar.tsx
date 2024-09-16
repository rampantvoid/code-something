"use client";

import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { Button } from "./ui/button";
import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";

const nav = [
  {
    title: "Home",
    link: "/",
  },
  {
    title: "Overview",
    link: "/",
  },
  {
    title: "Demo",
    link: "/",
  },
  {
    title: "Resources",
    link: "/",
  },
];

const Navbar = () => {
  const { data: session } = useSession();
  console.log(session);

  return (
    <div className="p-2 md:x-4 border-b border-secondary">
      <div className="mx-auto flex w-full justify-between items-center">
        <h1 className="text-2xl font-bold text-primary">CodeYantra</h1>

        <ul className="flex items-center gap-2 text-lg">
          {nav.map((item, _) => (
            <li className="px-4 p-2 rounded-sm transition text-gray-500 hover:text-accent hover:cursor-pointer">
              {item.title}
            </li>
          ))}
        </ul>
        {session ? (
          <Button
            className="px-12 text-lg bg-black rounded-full font-light"
            onClick={() => signOut()}
          >
            Sign out
          </Button>
        ) : (
          <Button
            className="px-12 text-lg bg-black rounded-full font-light"
            onClick={() => signIn("azure-ad", { callbackUrl: "/dashboard" })}
          >
            Sign in
          </Button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
