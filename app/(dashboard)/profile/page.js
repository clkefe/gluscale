"use client";

import React from "react";
import { Button } from "../../../components/ui/button";
import useUser from "../../../hooks/useUser";

export default function Profile() {
  const { signOut } = useUser();

  return (
    <div className="bg-orange-100 flex justify-center container py-4 h-screen">
      <div className="flex flex-col items-center justify-center mt-[-10]">
          <div className = "mt-1 text-red-500 text-bold text-2xl" onClick={signOut}>
              Sign Out
          </div>
      </div>
    </div>
  );
}
