import { createClient } from "../../../lib/supabase/server";
import axios from "axios";

export async function GET() {
  const supabase = createClient();
  const userSession = await supabase.auth.getSession();

  if (userSession.data.session === null) {
    return Response.json({ error: "Unauthorized" });
  }

  const user = await supabase.auth.getUser();
  const { data: supData, error: supError } = await supabase
    .from("wearable_connection")
    .select()
    .eq("user_id", user.data.user.id);

  if (supError) {
    console.log(supError);
    return Response.json({ error: supError });
  }

  let payload = JSON.stringify({
    user_id: supData[0].vital_uid,
    provider: "freestyle_libre",
  });

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://api.sandbox.tryvital.io/v2/link/token",
    headers: {
      Accept: "application/json",
      "x-vital-api-key": process.env.VITAL_API_KEY,
      "Content-Type": "application/json",
    },
    data: payload,
  };

  const { data, error } = await axios.request(config).catch((error) => {
    console.log(error);
    return { error: error.message };
  });

  if (error) {
    console.log(error);
    return Response.json({ error: error });
  }

  return Response.json({
    data: `https://link.tryvital.io/?token=${data.link_token}&env=sandbox&region=us`,
  });
}
