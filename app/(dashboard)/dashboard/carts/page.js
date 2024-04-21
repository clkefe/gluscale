"use client";

import React, { useState, useEffect } from "react";
import useUser from "../../../../hooks/useUser";
import Image from "next/image";
import { Badge } from "../../../../components/ui/badge";
import { createClient } from "../../../../lib/supabase/client";
import BottomNav from "../../../../components/BottomNav";

const DRAGONS = [
  {
    id: 0,
    name: "Dragon 1",
    imageURL: "/dragons/dragon_0.png",
  },
  {
    id: 1,
    name: "Dragon 2",
    imageURL: "/dragons/dragon_1.png",
  },
];

export default function Dashboard() {
  const supabase = createClient();

  const { user, loading, authenticated, glucoseLevel, aiFeedback } = useUser();

  const [dragons, setDragons] = useState(null);

  useEffect(() => {
    if (loading || !authenticated || !user) return;

    async function getDragons() {
      const { data, error } = await supabase
        .from("dragon_cart")
        .select("*")
        .eq("user_id", user.id);

      if (error) {
        console.error(error);
        return;
      }

      console.log(data);

      // Group dragons by id and save its count
      var groupedDragons = data.reduce((acc, dragon) => {
        if (acc[dragon.dragon_id]) {
          acc[dragon.dragon_id].count += 1;
        } else {
          acc[dragon.dragon_id] = { ...dragon, count: 1 };
        }

        return acc;
      }, {});

      groupedDragons = Object.values(groupedDragons);
      setDragons(groupedDragons);
    }

    getDragons();
  }, [loading, authenticated, user]);

  return (
    <div className="bg-orange-100 container py-4 h-screen">
      <div className="grid grid-cols-1 gap-4">
        {dragons?.map((dragon) => (
          <>
            <div
              key={dragon.id}
              className="flex flex-col justify-center border items-center bg-orange-200 rounded-md shadow-md py-2 font-mono font-light tracking-wide"
            >
              <Image
                src={DRAGONS[dragon.dragon_id].imageURL}
                className="mt-2"
                alt="dragon"
                width={156}
                height={156}
              />

              <p className="pt-3 text-xl">{DRAGONS[dragon.dragon_id].name}</p>
              <Badge className="my-2 text-sm">x{dragon.count}</Badge>
            </div>
          </>
        ))}
      </div>
      {/* <BottomNav /> */}
    </div>
  );
}
