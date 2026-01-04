import { useState } from 'react'
import Navbar from "./components/Navbar";
import Stage1 from "./components/Stage1";
import Stage2 from "./components/Stage2";
import Stage3 from "./components/Stage3";
import RegistrationComplete from "./components/RegistrationComplete";
import './App.css'

export default function App() {
  const [step, setStep] = useState(1);

  return (
    <>
      <Navbar />
      {step === 1 && <Stage1 step={step} onContinue={() => setStep(2)} />}
      {step === 2 && <Stage2 step={step} onContinue={() => setStep(3)} />}
      {step === 3 && <Stage3 step={step} onContinue={() => setStep(4)} />}
      {step === 4 && <RegistrationComplete />}
    </>
  );
}