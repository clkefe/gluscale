"use client";

import { useCallback, useEffect, useState } from "react";

import { createClient } from "../lib/supabase/client";
import { useRouter } from "next/navigation";

export default function useUser() {
  const supabase = createClient();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const [authanticated, setAuthanticated] = useState(false);

  const getProfile = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.getUser();

      if (error) throw error;
      if (data) {
        setUser(data.user.user_metadata);
        setAuthanticated(true);
      }
    } catch (error) {
      setAuthanticated(false);
    }

    setLoading(false);
  }, [supabase]);

  const signUp = async (provider) => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/callback`,
      },
    });

    if (error) {
      return console.log(error);
    }

    return router.push(data.url);
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setAuthanticated(false);

    router.push("/login");
  };

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  return { user, loading, authanticated, signUp, signOut };
}
