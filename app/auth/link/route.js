import { createClient } from "../../../lib/supabase/server";
import axios from "axios";

export async function GET() {
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
    return Response.json({ error: error });
  }

  const { error: error2 } = await supabase.from("wearable_connection").upsert({
    user_id: user.data.user.id,
    vital_uid: response.user_id,
  });

  console.log(error2);

  return Response.json({
    data: "Yay! Your libre is now connected to your account.",
  });
}
