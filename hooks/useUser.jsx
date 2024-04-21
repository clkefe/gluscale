"use client";

import { useCallback, useEffect, useState } from "react";

import { createClient } from "../lib/supabase/client";
import { useRouter } from "next/navigation";
import { getURL } from "../lib/utils";

import axios from "axios";

export default function useUser() {
  const supabase = createClient();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const [authenticated, setAuthenticated] = useState(false);

  const [glucoseLevel, setGlucoseLevel] = useState(null);
  const [aiFeedback, setAiFeedback] = useState(null);

  useEffect(() => {
    if (loading) return;
    if (!authenticated) return;
    if (!user) return;

    async function linkWearable() {
      const { data: dataWearable, error: errorWearable } = await supabase
        .from("wearable_connection")
        .select()
        .eq("user_id", user.id);

      if (errorWearable) throw error;

      const isWearableConnected = dataWearable.length > 0;
      console.log(loading, isWearableConnected, dataWearable);

      if (isWearableConnected) return;

      const { error } = await axios.get("/auth/link");

      if (error) {
        return console.log(error);
      }
    }

    linkWearable();
  }, [user, loading, authenticated]);

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

      if (data3.length > 0) {
        setAiFeedback(data3[0]?.advice);
      }

      return setTimeout(getGlucoseLevel, 10000);
    }

    getGlucoseLevel();
  }, [supabase]);

  const getProfile = useCallback(async () => {
    try {
      setLoading(true);

      const { data, error } = await supabase.auth.getUser();
      if (error) throw error;

      if (data) {
        setUser({ id: data.user.id });
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
        redirectTo: getURL(),
      },
    });

    if (error) {
      return console.log(error);
    }

    return router.push(data.url);
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
    signOut,
    glucoseLevel,
    aiFeedback,
  };
}
