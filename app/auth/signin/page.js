"use client"

import React from 'react';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import { Button } from '@mui/material';
import { TextBox } from 'devextreme-react/text-box';

const URL = "https://hoiguobdpfddefwmydeg.supabase.co";
const SUPA_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhvaWd1b2JkcGZkZGVmd215ZGVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM1MTUzNzAsImV4cCI6MjAyOTA5MTM3MH0.bGpmbR4zZLfTYeerKbF65BjFR5p3hQ3OEWc5FaE1a-g";

const supabase = createClient(URL, SUPA_KEY);

async function signUpNewUser() {
    const { data, error } = await supabase.auth.signUp({
      email: 'example@email.com',
      password: 'example-password',
      options: {
        emailRedirectTo: 'https://example.com/welcome',
      },
    })
  }

const signUpWithGoogle = async (provider) => {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: provider,
        options: {
          redirectTo: `${URL}/auth/callback`,
        },
      });
  
      if (error) {
        return console.log(error);
      }
      return router.push(data.url);
};

const App = () => {
    const router = useRouter();
    return (
        <div className="bg-white p-4">
            <Button onClick={() => signUpWithGoogle('google')}>Sign up with Google</Button>
            <TextBox defaultValue="Email" />
            <TextBox defaultValue="Email" />
        </div>
    );
};

export default App;