"use client";

import React from "react";
import useUser from "../../../hooks/useUser";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Profile() {
  const router = useRouter();

  const { signOut } = useUser();

  async function linkLibre() {
    const { data, error } = await axios.get("/auth/linkLibre");

    if (error) {
      return console.log(error);
    }

    window.open(data.data, "_ blank");
    // router.push(data.data, undefined, { shallow: true }kl);
  }

  return (
    <div className="bg-orange-100 flex justify-center container py-4 h-screen">
      <div className="flex flex-col items-center justify-center mt-[-10]">
        <div className="text-blue-500 text-bold text-lg" onClick={linkLibre}>
          Link Your Libre
        </div>
        <div className="mt-2 text-red-500 text-bold text-lg" onClick={signOut}>
          Sign Out
        </div>
      </div>
    </div>
  );
}
