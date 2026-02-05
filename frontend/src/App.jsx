import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
import Stage1 from "./components/Stage1";
import Stage2 from "./components/Stage2";
import Stage3 from "./components/Stage3";
import RegistrationComplete from "./components/RegistrationComplete";
import "./App.css";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<> <Navbar /> <LandingPage /> </>}/>
        <Route path="/register" element={<Stage1 />}/>
        <Route path="/register/stage2" element={<Stage2 />}/>
        <Route path="/register/stage3" element={<Stage3 />}/>
        <Route path="/register/complete" element={<RegistrationComplete />}/>
      </Routes>
    </Router>
  );
}
