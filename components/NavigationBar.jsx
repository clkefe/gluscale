"use client";

import React from "react";
import Link from "next/link";
import useUser from "../hooks/useUser";

import { Button } from "./ui/button";

import { Separator } from "../components/ui/separator";

import {
  IconHome2,
  IconMenuDeep,
  IconX,
  IconMedal2,
  IconNotebook,
} from "@tabler/icons-react";

import { Drawer, DrawerContent, DrawerTrigger, DrawerClose } from "./ui/drawer";

const NAVIGATION = [
  {
    title: "Home",
    href: "/",
    icon: <IconHome2 stroke={1} />,
  },
  {
    title: "Summary",
    href: "/summary",
    icon: <IconNotebook stroke={1} />,
  },
  {
    title: "Achievements",
    href: "/achievements",
    icon: <IconMedal2 stroke={1} />,
  },
];

export default function NavigationBar() {
  const { user, authenticated, signUp, signOut } = useUser();
  return (
    <div>
      <Drawer direction="left">
        <DrawerTrigger asChild>
          <Button variant="ghost">
            <IconMenuDeep />
          </Button>
        </DrawerTrigger>

        <DrawerContent className="h-screen top-0 left-0 right-auto mt-0 w-3/4 rounded-none border-none border-l-2 border-accent">
          {/* Close bttn */}
          <div className="flex justify-end mt-1">
            <DrawerClose asChild>
              <Button variant="ghost" className="mr-4 top-4">
                <IconX width={21} height={21} />
                <span className="sr-only">Close</span>
              </Button>
            </DrawerClose>
          </div>

          <div className="flex flex-col justify-center mt-4">
            {NAVIGATION.map((navItem) => (
              <div className="px-8 py-2" key={navItem.title}>
                <DrawerClose asChild>
                  <Link href={navItem.href} className="text-left w-full ">
                    <div className="flex justify-start w-full p-0 items-center">
                      {navItem.icon}
                      <span className="ml-4">{navItem.title}</span>
                    </div>
                  </Link>
                </DrawerClose>
              </div>
            ))}

            <Separator className="my-4" />

            {/* Sign in & Sign out buttons */}
            <div className="mt-1">
              {authenticated ? (
                <>
                  <div className="px-8 text-left">
                    <DrawerClose asChild>
                      <Button
                        variant="link"
                        onClick={signOut}
                        className="flex justify-start w-full p-0 text-red-500"
                      >
                        Logout
                      </Button>
                    </DrawerClose>
                  </div>
                </>
              ) : (
                <>
                  <div className="px-8 text-left">
                    <DrawerClose asChild>
                      <Link
                        href="/auth/signin"
                        className="flex justify-start w-full p-0"
                      >
                        Sign In
                      </Link>
                    </DrawerClose>
                  </div>
                </>
              )}
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
