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
  const [isWearableConnected, setIsWearableConnected] = useState(false);

  const getProfile = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.getUser();

      const { data: data2, error: error2 } = await supabase
        .from("wearable_connection")
        .select()
        .eq("user_id", data.user.id);

      const isWearableConnected = data2.length > 0;
      setIsWearableConnected(isWearableConnected);

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

  const signUpWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/callback`,
      },
    });

    if (error) {
      return console.log(error);
    }

    return router.push(data.url);
  };

  const signUpWithEmail = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });

      if (error) {
        console.error(error);
        return;
      }

      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setAuthanticated(false);

    router.push("/auth/signin");
  };

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  return {
    user,
    loading,
    authanticated,
    signUpWithGoogle,
    signUpWithEmail,
    signOut,
    isWearableConnected,
  };
}
