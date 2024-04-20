"use client";

import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { questions } from "../survey/question.js";
import { useRouter } from "next/navigation";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export default function Home() {
    const [activeQuestion, setActiveQuestion] = useState(0);
    const [_type, setType] = useState("");
    const [_time_diagnosis, setTimeDiagnosis] = useState("");
    const [_medication, setMedication] = useState("");
    const [_age, setAge] = useState("");
    const router = useRouter();
    const questionData = questions.questions[activeQuestion];

    async function insertAllData() {
        const { error } = await supabase
            .from("survey_data")
            .insert([
                {type: _type, time_diagnosis: _time_diagnosis, medication: _medication, age: _age},
            ])
    }

    const handleButtonClick = (field, newValue) => {
        switch (field) {
            case "type":
                setType(newValue);
                break;
            case "time_diagnosis":
                setTimeDiagnosis(newValue);
                break;
            case "medication":
                setMedication(newValue);
                break;
            case "age":
                setAge(newValue);
                break;
            default:
                break;
        }
    };

    return (
        <div className="bg-[#91F5AD] min-h-screen flex-grow p-4">
          <div className="justify-center flex flex-col items-center text-black text-7xl font-semibold m-4">
            {questionData.question && (
              <h1>{questionData.question}</h1>
            )}
            {questionData.answers.map((answer, index) => (
              <button
                key={index}
                onClick={() => {
                  handleButtonClick(questionData.field, answer)
                  if (activeQuestion === questions.totalQuestions - 1) {
                    insertAllData();
                    router.push("/dashboard")
                  } else {
                    setActiveQuestion(activeQuestion + 1);
                  }
                }}
                className="bg-[#8B9EB7] text-white p-8 m-6 rounded-lg text-5xl"
              >
                {answer}
              </button>
            ))}
          </div>
        </div>
      );
}