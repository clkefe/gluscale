"use client"

import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import useUser from "../hooks/useUser";
import { createClient } from "../lib/supabase/client";

export default function Home() {
  const router = useRouter();
  const supabase = createClient();
  const [firstTime, setFirstTime] = useState(null);
  const { user, loading, authenticated, signOut } = useUser();

  async function fetchFirstTime() {
    const { data: { user } } = await supabase.auth.getUser();
    const { data: data1, error } = await supabase
      .from("survey_data")
      .select("*")
      .eq("user_id", user.id);
    return !!data1;
  }

  useEffect(() => {
    async function fetchData() {
      const isFirstTime = await fetchFirstTime();
      setFirstTime(isFirstTime);
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (authenticated && firstTime) {
      router.push("/survey");  
    }
  }, [authenticated, firstTime]);

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
