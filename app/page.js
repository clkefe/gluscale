"use client";

import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import useUser from "../hooks/useUser";

export default function Home() {
  const router = useRouter();

  const { loading, authanticated } = useUser();

  return (
    <main>
      <div>
        <h1>Welcome to GlucoBuddy</h1>

        <Button onClick={() => router.push("/auth/signin")}>Sign In</Button>
      </div>
    </main>
  );
}
