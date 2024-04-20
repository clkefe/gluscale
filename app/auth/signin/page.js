"use client";

import React, { useEffect } from "react";
import { Button } from "@mui/material";
import { TextBox } from "devextreme-react/text-box";

import useUser from "../../../hooks/useUser";

const App = () => {
  const { signUp, loading, authanticated } = useUser();

  return (
    <div className="bg-white p-4">
      <Button onClick={() => signUp("google")}>Sign up with Google</Button>
      <TextBox defaultValue="Email" onValueChanged={(e) => setEmail(e.value)} />
      <TextBox
        defaultValue="Password"
        onValueChanged={(e) => setPassword(e.value)}
      />
      <Button onClick={signUp}>Sign Up</Button>
    </div>
  );
};

export default App;
