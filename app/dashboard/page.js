"use client";

import React, { useState, useEffect } from "react";
import useUser from "../../hooks/useUser";
import Image from "next/image";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import NaviationBar from "../../components/NavigationBar";

export default function Dashboard() {
  const { user, loading } = useUser();

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

  return (
    <div className="w-full h-screen">
      <div className="container mx-auto">
        {/* Top NavBar */}
        <div className="flex justify-between mt-6">
          <div>
            <NaviationBar />
          </div>
        </div>

        {/* Egg Visualization */}
        <div className="flex justify-center bg-card shadow-xl rounded-md items-center object-fill mt-32">
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
      </div>
    </div>
  );
}
