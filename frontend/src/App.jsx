import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Stage1 from "./components/Stage1";
import Stage2 from "./components/Stage2";
import Stage3 from "./components/Stage3";
import RegistrationComplete from "./components/RegistrationComplete";
import "./App.css";

export default function App() {
  const [step, setStep] = useState(1);
  const [token, setToken] = useState(
    () => localStorage.getItem("token") || null,
  );
  const [teamId, setTeamId] = useState(
    () => localStorage.getItem("teamId") || null,
  );
  const [leaderData, setLeaderData] = useState(null);

  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
    if (teamId) localStorage.setItem("teamId", teamId);
    else localStorage.removeItem("teamId");
  }, [token, teamId]);

  return (
    <>
      <Navbar />
      {step === 1 && (
        <Stage1
          onRegistered={(t, id) => {
            setToken(t);
            setTeamId(id);
            setStep(2);
          }}
        />
      )}
      {step === 2 && (
        <Stage2
          onContinue={(data) => {
            setLeaderData(data);
            setStep(3);
          }}
        />
      )}
      {step === 3 && (
        <Stage3
          token={token}
          leaderData={leaderData}
          onComplete={() => setStep(4)}
        />
      )}
      {step === 4 && <RegistrationComplete />}
    </>
  );
}
