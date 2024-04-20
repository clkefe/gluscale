"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import useUser from "../hooks/useUser";
import { createClient } from "../lib/supabase/client";

export default function Home() {
  const router = useRouter();
  const { user, loading, authenticated, signOut } = useUser();

  return (
    <main>
      <div>
        <h1>Welcome to GlucoBuddy</h1>

        {loading ? (
          <p>Loading..</p>
        ) : authenticated ? (
          <>
            <Button onClick={() => router.push("/dashboard")}>Dashboard</Button>
            <Button onClick={signOut}>Sign Out</Button>
          </>
        ) : (
          <Button onClick={() => router.push("/auth/signin")}>Sign In</Button>
        )}
      </div>
    </main>
  );
}
