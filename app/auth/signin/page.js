"use client";

import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { Button } from "@mui/material";
import { TextBox } from "devextreme-react/text-box";

import useUser from "../../../hooks/useUser";

const App = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signUpWithGoogle, signUpWithEmail } = useUser();

  return (
    <div>
      <Button onClick={() => signUpWithGoogle()}>Sign up with Google</Button>
      <TextBox defaultValue="Email" onValueChanged={(e) => setEmail(e.value)} />
      <TextBox
        defaultValue="Password"
        onValueChanged={(e) => setPassword(e.value)}
      />
      <Button onClick={() => signUpWithEmail(email, password)}>Sign Up</Button>
    </div>
  );
};

export default App;
