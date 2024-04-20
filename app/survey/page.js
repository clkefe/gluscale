"use client";

import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Button } from "@mui/material";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export default function Home() {
    const [_type, setType] = useState("");
    const [_time_diagnosis, setTimeDiagnosis] = useState("");
    const [_medication, setMedication] = useState("");
    const [_purpose, setPurpose] = useState("");
    const [_insulin_therapy, setInsulinTherapy] = useState("");
    const [_blood_sugar_units, setBloodSugarUnits] = useState("");
    const [_target_range, setTargetRange] = useState("");

    async function insertAllData() {
        const { error } = await supabase
            .from("survey_data")
            .insert([
                {type: _type, time_diagnosis: _time_diagnosis, medication: _medication, purpose: _purpose, insulin_therapy: _insulin_therapy, blood_sugar_units: _blood_sugar_units, target_range:  _target_range},
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
            case "purpose":
                setPurpose(newValue);
                break;
            case "insulin_therapy":
                setInsulinTherapy(newValue);
                break;
            case "blood_sugar_units":
                setBloodSugarUnits(newValue);
                break;
            case "target_range":
                setTargetRange(newValue);
                break;
            default:
                break;
        }
    };

    return (
      <main>
        <div>
            <Button onClick={() => handleButtonClick("type", "Type 1")}>"Type 1"</Button>
            <Button onClick={() => insertAllData()}>Finish Survey</Button>
        </div>
      </main>
    );
  }
  