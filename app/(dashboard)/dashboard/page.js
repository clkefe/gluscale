"use client";

import React, { useState, useEffect } from "react";
import useUser from "../../../hooks/useUser";
import Image from "next/image";
import { IconRobotFace } from "@tabler/icons-react";
import { createClient } from "../../../lib/supabase/client";
import { Button } from "../../../components/ui/button";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../../../components/ui/dialog";

export default function Dashboard() {
  const supabase = createClient();

  const router = useRouter();

  const { user, loading, authenticated, glucoseLevel, aiFeedback } = useUser();

  const [isShaking, setIsShaking] = useState(false);
  const [currentEggStage, setCurrentEggStage] = useState(1);

  const [showDialog, setShowDialog] = useState(false);
  const [currentDragonId, setCurrentDragonId] = useState(null);

  const [glucoseLow, setGlucoseLow] = useState(0);
  const [glucoseHigh, setGlucoseHigh] = useState(0);


  useEffect(() => {
    if (loading) return;
    if (!authenticated) return;

    async function getDragonId() {
      const { data, error } = await supabase
        .from("dragon_egg")
        .select()
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(1);

      console.log("data", data);
      if (error) {
        console.error(error);
        return;
      }

      if (data.length > 0) {
        setCurrentDragonId(data[0].dragon_id);
      } else {
        const newDragonId = Math.floor(Math.random() * 2);
        await supabase.from("dragon_egg").insert([
          {
            user_id: user.id,
            dragon_id: newDragonId,
          },
        ]);

        setCurrentDragonId(newDragonId);
      }
    }

    getDragonId();
  }, [loading, authenticated]);

  useEffect(() => {
    if (loading) return;
    if (!authenticated) return;

    async function checkForCart() {
      const currentTime = new Date();
      const currentHours = currentTime.getHours();

      if (currentHours >= 20 && currentHours < 24) {
        // Check if the cart was created today
        const filterDate = new Date();
        filterDate.setHours(0, 0, 0, 0);
        const filterDateString = filterDate.toISOString();

        const { data, error } = await supabase
          .from("dragon_cart")
          .select()
          .eq("user_id", user.id)
          .gte("created_at", filterDateString)
          .order("created_at", { ascending: false })
          .limit(1);

        if (error) {
          console.error(error);
          return;
        }

        const dragon_cart = data[0];

        if (!dragon_cart) {
          console.log("No cart found");
          return;
        }

        if (!dragon_cart.seen_by_user) {
          console.log("You got a cart!");
          setShowDialog(true);

          const { error } = await supabase.from("dragon_cart").upsert([
            {
              id: dragon_cart.id,
              seen_by_user: true,
              dragon_id: dragon_cart.dragon_id,
            },
          ]);

          console.log(error);
        }
      }
    }

    checkForCart();
  }, [loading, authenticated]);

  useEffect(() => {
    if (loading) return;
    if (!authenticated) return;
  
    async function getGlucoseHigh() {
      const filterDate = new Date();
      filterDate.setHours(0, 0, 0, 0);
      const yesterdayStr = filterDate.toISOString();
      const { data, error } = await supabase
        .from("glucose_level")
        .select("*")
        .eq("user_id", user.id)
        .gte("created_at", yesterdayStr)
        .order("value", { ascending: false })
        .limit(1);
  
      if (error) {
        console.error(error);
        return;
      }
  
      if (data && data.length > 0 && data[0].value) {
        setGlucoseHigh(data[0].value);
        console.log(data[0].value);
      } else {
        console.error("No data found");
      }
    }
  
    async function getGlucoseLow() {
      const filterDate = new Date();
      filterDate.setHours(0, 0, 0, 0);
      const yesterdayStr = filterDate.toISOString();

      const { data, error } = await supabase
        .from("glucose_level")
        .select("*")
        .eq("user_id", user.id)
        .gte("created_at", yesterdayStr)
        .order("value", { ascending: true })
        .limit(1);
  
      if (error) {
        console.error(error);
        return;
      }
  
      if (data && data.length > 0 && data[0].value) {
        setGlucoseLow(data[0].value);
        console.log(data[0].value);
      } else {
        console.error("No data found");
      }
    }
  
    getGlucoseHigh();
    getGlucoseLow();
  }, [loading, authenticated, supabase, user.id]);
  
  //   Egg shaking animation
  useEffect(() => {
    const shake = () => {
      setIsShaking(true);
      setTimeout(() => {
        setIsShaking(false);
      }, 820);
    };

    const startRandomShake = () => {
      const randomInterval =
        Math.random() * 4000 + 1000 - currentEggStage * 100;

      setTimeout(() => {
        shake();
        startRandomShake();
      }, randomInterval);
    };

    const updateStageBasedOnTime = () => {
      const currentTime = new Date();
      const currentHours = currentTime.getHours();

      if (currentHours < 10) {
        setCurrentEggStage(1);
      } else if (currentHours < 12) {
        setCurrentEggStage(2);
      } else if (currentHours < 14) {
        setCurrentEggStage(3);
      } else if (currentHours < 16) {
        setCurrentEggStage(4);
      } else if (currentHours < 18) {
        setCurrentEggStage(6);
      } else if (currentHours < 20) {
        setCurrentEggStage(7);
      } else if (currentHours === 20) {
        setCurrentEggStage(8);
      } else {
        setCurrentEggStage(1);
      }
    };

    updateStageBasedOnTime();
    startRandomShake();

    return () => clearTimeout(startRandomShake);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  } else if (!authenticated) {
    // TODO: Redirect to login page
    router.push("/");
  }

  return (
    <div className="w-full h-screen bg-orange-100 overflow-hidden">
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="w-11/12 sm:max-w-md rounded-md">
          <DialogHeader>
            <DialogTitle>Congrats!!!</DialogTitle>
            <DialogDescription className="flex flex-col justify-center items-center">
              <Image
                src={`/dragons/dragon_${currentDragonId || 0}.png`}
                width={164}
                height={164}
                className="my-4"
              />
              <p>
                Great job keeping your glucose levels on track today! 🌟 Your
                dedication has paid off, and a brand-new dragon has arrived just
                for you. Welcome your latest dragon friend and keep up the
                excellent work!
              </p>
            </DialogDescription>
            <DialogFooter>
              <Button
                className="mt-2"
                onClick={() => {
                  router.push("/dashboard/carts");
                }}
              >
                See your dragon collection
              </Button>
            </DialogFooter>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <div className="container mx-auto">
        {/* Live Glucose Level */}
        <div>
          <div className="flex justify-center mt-8">
            <div className="flex items-center rounded-md p-4">
              <div className="flex flex-col items-start">
                <div className="text-2xl font-mono">Sugar Level</div>
                <div className="flex flex-row justify-start items-end">
                  <div className="text-6xl font-semibold">
                    {loading ? <>NaN</> : glucoseLevel?.toFixed(2)}
                  </div>

                  <div className="text-lg font-light text-muted-foreground ml-1">
                    mg/dL
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Egg Visualization */}
        <div className="flex justify-center bg-card border shadow-xl rounded-md items-center object-fill mt-4">
          <div className="p-8">
            <div
              className={isShaking ? "shake-animation" : ""}
              style={{
                "--shake-x-negative": `-${currentEggStage * 0.6}px`,
                "--shake-x-positive": `${currentEggStage * 0.6}px`,
              }}
            >
              <Image
                src={`/eggs_${currentDragonId || 0}/egg_${currentEggStage}.png`}
                alt="Egg"
                width={142}
                height={168}
                className="object-fill"
                layout="fixed"
              />
            </div>
          </div>
        </div>

        {/* AI Feedback */}
        <div>
          <div className="flex justify-start mt-8 bg-card rounded-md shadow-md">
            <div className="flex rounded-md p-4">
              <div className="flex flex-col items-start">
                <IconRobotFace stroke={1.3} />

                <div className="flex flex-row mt-2">
                  <div className="text-md">
                    {loading ? (
                      <>Loading</>
                    ) : aiFeedback ? (
                      aiFeedback
                    ) : (
                      <>
                        I need you to wait a little bit more to get a feedback!
                        I am still learning about you.
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className = "bg-blue-500 mt-10 rounded-xl p-3 text-center text-xl font-bold font-mono">
          Today's Glucose Level High is {glucoseHigh}
        </div>
        <div className = "bg-blue-500 mt-8 rounded-xl p-3 text-center text-xl font-bold font-mono">
          Today's Glucose Level Low is {glucoseLow}
        </div>
      </div>
      {/* <BottomNav /> */}
    </div>
  );
}
