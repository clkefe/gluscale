"use client";

import React, { useEffect } from "react";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import useUser from "../hooks/useUser";
import Image from 'next/image';
// import { Hero } from "../components/hero"
import axios from "axios";

export default function Home() {
  const router = useRouter();

  const { user, isWearableConnected, loading, authenticated, signOut } =
    useUser();

  useEffect(() => {
    async function linkWearable() {
      console.log(loading, isWearableConnected);
      if (loading) return;
      if (isWearableConnected) return;

      const { data, error } = await axios.get("/auth/link");

      if (error) {
        return console.log(error);
      }

      console.log(data);
    }

    linkWearable();
  }, [isWearableConnected, loading]);

  return (
    <main style={{ textAlign: 'center', backgroundColor: '#a6cba4' }}>
      <section class="bg-white dark:bg-gray-900" style={{ backgroundColor: '#C4A484' }}>
    <div class="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
      <div class="mr-auto place-self-center lg:col-span-8">
        <h1 class="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">Diabetes Companion</h1>
        <p class="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-white">Made especially for kids.</p>
        <a href="#" class="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
          Join Now
          <svg class="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
          </a>
            {loading ? (
              <p>Loading..</p>
            ) : authenticated ? (
              <>
                <Button onClick={() => router.push("/dashboard")} variant="contained">Dashboard</Button>
                <Button onClick={signOut} variant="contained">Sign Out</Button>
              </>
            ) : (
              <Button onClick={() => router.push("/auth/signin")} variant="contained">Sign In</Button>
            )}
          </div>
      <div class="flex lg:mt-0 lg:col-span-4 mt-sm">
        <img src="../../eggs2/egg_8.png" alt="egg8" style={{ maxWidth: '60%', height: 'auto', objectFit: 'contain' }}/>
      </div>                
    </div>
  </section>


<div style={{ paddingTop: '4rem', backgroundColor: '#C4A484' }}></div>
<div style={{ paddingTop: '4rem', backgroundColor: '#a6cba4' }}></div>


<div class="container mx-auto max-w-5xl flex gap-12 flex-wrap items-start justify-center md:justify-between">
    <div class="grid gap-4 justify-items-center text-center md:flex-1">
        <div class=" rounded-full border-8 border-amber-400 p-4 ">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-14 h-14">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z">
                </path>
            </svg>
        </div>
        <h3 class="text-3xl font-bold">Safe</h3>
        <p>Real-time data so you don't have to worry</p>
    </div>
    <div class="grid gap-4 justify-items-center text-center md:flex-1">
        <div class=" rounded-full border-8 border-amber-400 p-4 ">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-14 h-14">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"></path>
            </svg>
        </div>
        <h3 class="text-3xl font-bold">Efficient</h3>
        <p>Feel good about your wallet and the environment</p>
    </div>
    <div class="grid gap-4 justify-items-center text-center md:flex-1">
        <div class=" rounded-full border-8 border-amber-400 p-4 ">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-14 h-14">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z">
                </path>
            </svg>

        </div>
        <h3 class="text-3xl font-bold">Proven</h3>
        <p>Leading the Smart Home world for 10 years</p>
    </div>
</div>

<div style={{ paddingTop: '4rem', backgroundColor: '#a6cba4' }}></div>
<div style={{ paddingTop: '4rem', backgroundColor: '#C4A484' }}></div>

<div class="text-center" style={{ backgroundColor: '#C4A484' }}>
    <h2 class="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
        Our Features
    </h2>

    <div class="flex flex-wrap items-center mt-20 text-left text-center">
        <div class="w-full md:w-3/5 lg:w-1/2 px-4">
            <img src="https://picsum.photos/400/240" alt="gem" class="inline-block rounded shadow-lg border border-merino-400"/>
        </div>
        <div class="w-full md:w-2/5 lg:w-1/2 px-4 text-center md:text-left lg:pl-12">
            <h3 class="font-bold mt-8 text-xl md:mt-0 sm:text-2xl">
                Kid-friendly AI Chat
            </h3>
            <p class="sm:text-lg mt-6">
                Use the LocaleData gem to download translations directly into your Ruby on Rails
                projects using the provided command line interface. Just create a project and follow
                the step-by-step instructions.
            </p>
        </div>
    </div>

    <div class="flex flex-wrap items-center mt-20 text-left text-center">
        <div class="w-full md:w-3/5 lg:w-1/2 px-4">
            <img src="https://picsum.photos/400/240" alt="project members" class="inline-block rounded shadow-lg border border-merino-400"/>
        </div>
        <div class="w-full md:w-2/5 lg:w-1/2 px-4 md:order-first text-center md:text-left lg:pr-12" style={{ backgroundColor: '#C4A484' }}>
            <h3 class="font-bold mt-8 text-xl md:mt-0 sm:text-2xl">
                Encourages Kids
            </h3>
            <p class="sm:text-lg mt-6">
                All LocaleData projects are private. Each project can have multiple collaborators
                with different roles and access permissions. You determine who can see and edit
                your translations. Just add admins, developers, translators and configure their
                access rights.
            </p>
        </div>
    </div>

</div>

<div style={{ paddingTop: '4rem', backgroundColor: '#C4A484' }}></div>

<footer class="flex flex-col space-y-10 justify-center m-10">

    <div class="flex justify-center space-x-5">

        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-linkedin" viewBox="0 0 16 16">
  <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"/>
        </svg></a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-linkedin" viewBox="0 0 16 16">
  <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"/>
        </svg></a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-linkedin" viewBox="0 0 16 16">
  <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"/>
        </svg></a>

    </div>
    <p>Created with love at LAHacks 2024</p>
    </footer>

    <div style={{ paddingTop: '1rem', backgroundColor: '#a6cba4' }}></div>


    </main>
  );
}