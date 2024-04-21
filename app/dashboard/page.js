"use client";

import React, { useState, useEffect } from "react";
import useUser from "../../hooks/useUser";
import Image from "next/image";
import { IconRobotFace } from "@tabler/icons-react";

export default function Dashboard() {
  const { user, loading, authenticated, glucoseLevel, aiFeedback } = useUser();

  const [isShaking, setIsShaking] = useState(false);
  const [currentEggStage, setCurrentEggStage] = useState(1);

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
      } else {
        setCurrentEggStage(8);
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
    return <div>Not authenticated</div>;
  }

  return (
    <div className="w-full h-screen bg-orange-100">
      <div className="container mx-auto">
        {/* Live Glucose Level */}
        <div>
          <div className="flex justify-center mt-8">
            <div className="flex items-center rounded-md p-4">
              <div className="flex flex-col items-start">
                <div className="text-2xl text">Sugar Level</div>
                <div className="flex flex-row justify-start items-end">
                  <div className="text-6xl font-semibold">
                    {loading ? <>...</> : glucoseLevel?.toFixed(2)}
                  </div>

                  <div className="text-lg font-light text-muted-foreground">
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
                src={`/eggs2/egg_${currentEggStage}.png`}
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
                    {loading ? <>...</> : aiFeedback}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
