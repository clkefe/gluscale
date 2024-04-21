"use client";

import React from "react";
import { Button } from "../../../components/ui/button";
import useUser from "../../../hooks/useUser";

export default function Profile() {
  const { signOut } = useUser();

  return (
    <div className="bg-orange-100 flex justify-center container py-4 h-screen">
      <div className="flex flex-col items-center justify-center">
        <Button>
          <p className="font-mono text-lg mt-6"> Sign out</p>
        </Button>
        <p href="/dashboard" className="mt-1 text-red-500" onClick={signOut}>
          Sign Out
        </p>
      </div>
    </div>
  );
}
