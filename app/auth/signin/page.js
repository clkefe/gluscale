"use client";

import React, {useState} from 'react';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import { Button } from '@mui/material';
import { TextBox } from 'devextreme-react/text-box';

import useUser from "../../../hooks/useUser";

const App = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const supabase = createClient(URL, SUPA_KEY);

    const { signUp } = useUser();
  
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

    return (
        <div>
            <Button onClick={() => signUp("google")}>Sign up with Google</Button>
            <TextBox defaultValue="Email" onValueChanged={(e) => setEmail(e.value)} />
            <TextBox defaultValue="Password" onValueChanged={(e) => setPassword(e.value)} />
            <Button onClick={signUp}>Sign Up</Button>
        </div>
    );
};

export default App;
