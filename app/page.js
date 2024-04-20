"use client";

import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import useUser from "../hooks/useUser";

export default function Home() {
  const router = useRouter();

  const { loading, authanticated, signOut } = useUser();

  return (
    <main>
      <div>
        <h1>Welcome to GlucoBuddy</h1>

        {loading ? (
          <p>Loading..</p>
        ) : authanticated ? (
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
