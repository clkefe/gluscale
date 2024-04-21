"use client";

import React, { useEffect, useState } from "react";
import { questions } from "../survey/question.js";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { createClient } from "../../lib/supabase/client.js";

export default function Home() {
  const supabase = createClient();
  const router = useRouter();

  const [activeQuestion, setActiveQuestion] = useState(0);
  const [_type, setType] = useState("");
  const [_time_diagnosis, setTimeDiagnosis] = useState("");
  const [_medication, setMedication] = useState("");
  const [_age, setAge] = useState("");

  const questionData = questions.questions[activeQuestion];

  async function insertAllData() {
    const { error } = await supabase.from("survey_data").insert([
      {
        type: _type,
        time_diagnosis: _time_diagnosis,
        medication: _medication,
        age: _age,
      },
    ]);

    console.log(error);
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

  useEffect(() => {
    if (!_age) return;

    async function insert() {
      await insertAllData();
      router.push("/dashboard");
    }

    insert();
  }, [_age]);

  return (
    <div>
      <div className="bg-[#D2E4C4] h-screen flex-grow p-4 overflow-hidden">
        <Image
          src={`/clipart.jpg`}
          alt="hero"
          height={100}
          width={2000}
          className="rounded-10xl p-5 flex-shrink-0"
          draggable={false}
        />
        <div className="justify-center flex flex-col items-center text-black text-4xl font-semibold text-center h-[550px]">
          {questionData.question && (
            <h1 className="overflow-hidden">{questionData.question}</h1>
          )}
          <div className="flex h-[450px] w-[368px]">
            <div className="grid grid-cols-2 mt-5 overflow-hidden">
              {questionData.answers.map((answer, index) => (
                <button
                  key={index}
                  onClick={async () => {
                    handleButtonClick(questionData.field, answer);
                    if (activeQuestion != questions.totalQuestions - 1) {
                      setActiveQuestion(activeQuestion + 1);
                    }
                  }}
                  className={`${
                    index === 0
                      ? "bg-red-500"
                      : index === 1
                      ? "bg-blue-500"
                      : index === 3
                      ? "bg-green-500"
                      : "bg-yellow-500"
                  } text-white p-2 m-1 rounded-lg text-[25px] overflow-hidden items-center justify-center`}
                  style={{ width: "180px", height: "200px" }}
                >
                  {answer}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


//   return (
//     <div>
//       <div className="bg-[#D2E4C4] h-screen flex-grow p-4 overflow-hidden">
//         <Image
//           src={`/clipart.jpg`}
//           alt="hero"
//           height={100}
//           width={2000}
//           className="rounded-10xl p-5 flex-shrink-0"
//           draggable={false}
//         />
//         <div className="justify-center flex flex-col items-center text-black text-4xl font-semibold text-center h-[550px]">
//           {questionData.question && (
//             <h1 className="overflow-hidden">{questionData.question}</h1>
//           )}
//           <div className="flex h-[450px] w-[368px]">
//             <div className="grid grid-cols-2 mt-5 overflow-hidden">
//               {questionData.answers.map((answer, index) => (
//                 <button
//                   key={index}
//                   onClick={async () => {
//                     handleButtonClick(questionData.field, answer);
//                     if (activeQuestion != questions.totalQuestions - 1) {
//                       setActiveQuestion(activeQuestion + 1);
//                     }
//                   }}
//                   className={`${
//                     index === 0
//                       ? "bg-red-500"
//                       : index === 1
//                       ? "bg-blue-500"
//                       : index === 3
//                       ? "bg-green-500"
//                       : "bg-yellow-500"
//                   } text-white p-2 m-1 rounded-lg text-[25px] overflow-hidden items-center justify-center`}
//                   style={{ width: "180px", height: "200px" }}
//                 >
//                   {answer}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
