import { createClient } from "../../../lib/supabase/server";
import axios from "axios";

export async function GET() {
  console.log("AA");
  const supabase = createClient();
  const userSession = await supabase.auth.getSession();

  if (userSession.data.session === null) {
    return Response.json({ error: "Unauthorized" });
  }

  const user = await supabase.auth.getUser();

  let data = JSON.stringify({
    client_user_id: user.data.user.id,
  });

  let config = {
    method: "post",
    url: "https://api.sandbox.tryvital.io/v2/user/",
    headers: {
      Accept: "application/json",
      "x-vital-api-key": process.env.VITAL_API_KEY,
      "Content-Type": "application/json",
    },
    data: data,
  };

  const { data: response, error } = await axios
    .request(config)
    .catch((error) => {
      return { error: error.message };
    });

  if (error) {
    console.log("SSD", error);
    return Response.json({ error: error });
  }

  console.log("DFDSF");
  const { error: error2 } = await supabase.from("wearable_connection").insert({
    user_id: user.data.user.id,
    vital_uid: response.user_id,
  });

  console.log(error2);

  await checkDragonEgg(supabase, user.data.user.id);

  return Response.json({
    data: "Yay! Your libre is now connected to your account.",
  });
}

const checkDragonEgg = async (supabase, userId) => {
  console.log("Starting checking dragon egg");

  const filterDate = new Date();
  filterDate.setDate(filterDate.getDate() - 1);
  filterDate.setHours(20, 0, 0, 0);
  const yesterdayStr = filterDate.toISOString();

  const { data, error } = await supabase
    .from("dragon_egg")
    .select()
    .eq("user_id", userId)
    .gte("created_at", yesterdayStr);

  console.log(data, error);

  if (error) {
    console.error(error);
    return;
  }

  if (data.length > 0) {
    console.log("Already exist. Returning");
    return;
  }

  const { error: error2 } = await supabase.from("dragon_egg").insert({
    user_id: userId,
    dragon_id: Math.floor(Math.random() * 2),
  });

  console.log(error2);
};
