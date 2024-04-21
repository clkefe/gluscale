"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { useRouter } from "next/navigation";
import useUser from "../hooks/useUser";
import Image from "next/image";
import GoogleLogo from "../public/Google_Logo.png";
import axios from "axios";
import { createClient } from "../lib/supabase/client";

export default function Home() {
  const router = useRouter();
  const supabase = createClient();

  const { isWearableConnected, loading, authenticated, signUpWithGoogle } =
    useUser();

  const [firstTime, setFirstTime] = useState(null);

  useEffect(() => {
    async function fetchFirstTime() {
      const { data } = await supabase.auth.getUser();
      const user = data.user;

      const { data: data1, error } = await supabase
        .from("survey_data")
        .select("*")
        .eq("user_id", user.id);

      console.log(data1, error);

      if (error) {
        console.log(error);
        return false;
      }

      if (data1.length === 0) {
        return true;
      }

      return false;
    }

    async function fetchData() {
      const isFirstTime = await fetchFirstTime();
      console.log("isFirstTime", isFirstTime);
      setFirstTime(isFirstTime);
    }

    fetchData();
  }, []);

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

  useEffect(() => {
    if (loading) return;

    if (authenticated && firstTime) {
      router.push("/survey");
    }
  }, [authenticated, firstTime, loading]);

  return (
    <div>
      <section className="bg-orange-100 pt-12 text-center">
        <div className="flex flex-row justify-center items-center">
          <div className="">
            <h1 className="mb-8 text-4xl font-mono tracking-tight leading-none">
              GluScale
            </h1>
            <p className="mb-6 font-mono text-gray justify-center">
              A Diabetes Companion made for kids.
            </p>

            {loading ? (
              <></>
            ) : authenticated ? (
              <>
                <Button onClick={() => router.push("/dashboard")}>
                  Dashboard
                </Button>
              </>
            ) : (
              <Button
                className="w-56 text-foreground select-none bg-orange-400 hover:bg-orange-500"
                onClick={() => signUpWithGoogle()}
              >
                <Image
                  src={GoogleLogo}
                  alt="Google Logo"
                  width={24}
                  height={24}
                  className="mr-2"
                />
                Continue with Google
              </Button>
            )}
            <div className="flex items-center justify-center mt-8">
              <Image
                src="/eggs_0/egg_8.png"
                alt="egg"
                width={128}
                height={128}
                unoptimized={true}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="container bg-[#a6cba4] mx-auto flex gap-12 flex-wrap items-start justify-center my-8 py-16">
        <div className="grid gap-4 justify-items-center text-center md:flex-1">
          <div className=" rounded-full border-8 border-amber-400 p-4 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-14 h-14"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
              ></path>
            </svg>
          </div>
          <h3 className="text-3xl font-bold">Safe</h3>
          <p>Kid-friendly AI trained to respond as a supported companion</p>
        </div>
        <div className="grid gap-4 justify-items-center text-center md:flex-1">
          <div className=" rounded-full border-8 border-amber-400 p-4 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-14 h-14"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
              ></path>
            </svg>
          </div>
          <h3 className="text-3xl font-bold">Efficient</h3>
          <p>Gamified learning experience, making diabetes managable</p>
        </div>
        <div className="grid gap-4 justify-items-center text-center md:flex-1">
          <div className=" rounded-full border-8 border-amber-400 p-4 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-14 h-14"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
              ></path>
            </svg>
          </div>
          <h3 className="text-3xl font-bold">Proven</h3>
          <p>
            Real-time data with tailored AI responses so you don't have to worry
          </p>
        </div>
      </section>

      <div className="text-center">
        <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
          Our Features
        </h2>

        <div className="flex flex-wrap items-center mt-20 text-center">
          <div className="w-full md:w-3/5 lg:w-1/2 px-4">
            <img
              src="https://picsum.photos/400/240"
              alt="gem"
              className="inline-block rounded shadow-lg border border-merino-400"
            />
          </div>
          <div className="w-full md:w-2/5 lg:w-1/2 px-4 text-center md:text-left lg:pl-12">
            <h3 className="font-bold mt-8 text-xl md:mt-0 sm:text-2xl">
              Revolutionize Diabetes Management
            </h3>
            <p className="sm:text-lg mt-6">
              GluScale serves as an interactive tool designed to educate and
              empower kids to become experts in their own health.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center mt-20 text-center">
          <div className="w-full md:w-3/5 lg:w-1/2 px-4">
            <img
              src="https://picsum.photos/400/240"
              alt="project members"
              className="inline-block rounded shadow-lg border border-merino-400"
            />
          </div>
          <div
            className="w-full md:w-2/5 lg:w-1/2 px-4 md:order-first text-center md:text-left lg:pr-12"
            style={{ backgroundColor: "#FFEDD5" }}
          >
            <h3 className="font-bold mt-8 text-xl md:mt-0 sm:text-2xl">
              Personalized Child Care
            </h3>
            <p className="sm:text-lg mt-6">
              Continuously analyze glucose readings in real-time, providing
              personalized responses and recommendations every five minutes.
              Your child receives immediate and easy to learn support based on
              their unique circumstances.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-[#a6cba4] px-24 mt-12">
        <footer className="flex flex-col space-y-10 justify-center py-8">
          <div className="flex justify-center space-x-5 ">
            <a
              href="https://www.linkedin.com/in/-anthonytam/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-linkedin"
                viewBox="0 0 16 16"
              >
                <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/ivan-vuong/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-linkedin"
                viewBox="0 0 16 16"
              >
                <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
              </svg>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-linkedin"
                viewBox="0 0 16 16"
              >
                <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
              </svg>
            </a>
          </div>
          <p className="pb-4">Created with love at LAHacks 2024</p>
        </footer>
      </div>
    </div>
  );
}
