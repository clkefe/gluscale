"use client"

import React, {useState} from 'react';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import { Button } from '@mui/material';
import { TextBox } from 'devextreme-react/text-box';

const URL = "https://hoiguobdpfddefwmydeg.supabase.co";
const SUPA_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhvaWd1b2JkcGZkZGVmd215ZGVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM1MTUzNzAsImV4cCI6MjAyOTA5MTM3MH0.bGpmbR4zZLfTYeerKbF65BjFR5p3hQ3OEWc5FaE1a-g";

const App = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const supabase = createClient(URL, SUPA_KEY);

    const signUp = async () => {
        try {
            const { data, error } = await supabase.auth.signUp({
                email: email,
                password: password,
            });

            if (error) {
                console.error(error);
                return;
            }

            console.log(data);
        } catch (error) {
            console.error(error);
        }
    };

    const signUpWithGoogle = async (provider) => {
        try {
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: provider,
                options: {
                    redirectTo: `${URL}/auth/callback`,
                },
            });

            if (error) {
                console.error(error);
                return;
            }

            router.push(data.url);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <Button onClick={() => signUpWithGoogle('google')}>Sign up with Google</Button>
            <TextBox defaultValue="Email" onValueChanged={(e) => setEmail(e.value)} />
            <TextBox defaultValue="Password" onValueChanged={(e) => setPassword(e.value)} />
            <Button onClick={signUp}>Sign Up</Button>
        </div>
    );
};

export default App;