"use client";

import Link from "next/link";
import React from "react";

export default function Dashboard() {
  return (
    <div className="bg-orange-100 flex justify-center container py-4 h-screen">
      <div className="flex flex-col items-center justify-center">
        <h1 className="font-mono text-2xl"> Daily Summary</h1>
        <h1 className="font-mono text-lg mt-6"> Coming Soon..</h1>
        <Link href="/dashboard" className="mt-1 text-blue-500 ">
          Go Back
        </Link>
      </div>
    </div>
  );
}
