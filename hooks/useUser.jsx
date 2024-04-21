"use client";

import { useCallback, useEffect, useState } from "react";

import { createClient } from "../lib/supabase/client";
import { useRouter } from "next/navigation";

export default function useUser() {
  const supabase = createClient();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const [authenticated, setAuthenticated] = useState(false);

  const [glucoseLevel, setGlucoseLevel] = useState(null);
  const [aiFeedback, setAiFeedback] = useState(null);


  useEffect(() => {
    async function getGlucoseLevel() {
      const { data, error } = await supabase
        .from("glucose_level")
        .select("value")
        .order("created_at", { ascending: false })
        .limit(1);

      if (error) {
        console.error(error);
        return;
      }

      if (data.length > 0) {
        setGlucoseLevel(data[0].value);
      }

      const { data: data3, error: error3 } = await supabase
        .from("gemini_feedback")
        .select()
        .order("created_at", { ascending: false })
        .limit(1);

      console.log(data3);
      if (data3.length > 0) {
        setAiFeedback(data3[0]?.advice);
      }

      return setTimeout(getGlucoseLevel, 300000);
    }

    getGlucoseLevel();
  }, [supabase]);

  const getProfile = useCallback(async () => {
    try {
      setLoading(true);

      const { data, error } = await supabase.auth.getUser();
      if (error) throw error;

      const { data: data2, error: error2 } = await supabase
        .from("wearable_connection")
        .select()
        .eq("user_id", data.user.id);

      if (error2) throw error;

      const isWearableConnected = data2.length > 0;

      if (data) {
        setUser({ id: data.user.id, isWearableConnected });
        setAuthenticated(true);
      }
    } catch (error) {
      setAuthenticated(false);
    }

    setLoading(false);
  }, []);

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
    setAuthenticated(false);

    router.push("/");
  };

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  return {
    user,
    loading,
    authenticated,
    signUpWithGoogle,
    signUpWithEmail,
    signOut,
    glucoseLevel,
    aiFeedback,
  };
}
