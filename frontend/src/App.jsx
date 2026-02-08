import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
import Stage1 from "./components/Stage1";
import Stage2 from "./components/Stage2";
import Stage3 from "./components/Stage3";
import RegistrationComplete from "./components/RegistrationComplete";
import UserDashboard from "./components/UserDashboard";
import "./App.css";
import AdminPanel from "./components/AdminPanel";
import LoginPage from "./components/LoginPage";
import Editor from "./components/Editor";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<> <Navbar /> <LandingPage /> </>}/>
        <Route path="/register" element={<Stage1 />}/>
        <Route path="/register/stage2" element={<Stage2 />}/>
        <Route path="/register/stage3" element={<Stage3 />}/>
        <Route path="/register/complete" element={<RegistrationComplete />}/>
        <Route path="/user-dashboard" element={<><Navbar /><UserDashboard/></>}/>
        <Route path="/admin" element={<><Navbar /><AdminPanel/></>}/>
        <Route path="/login" element={<><Navbar /><LoginPage/></>}/>
        <Route path="/editor" element={<Editor/>}/>
      </Routes>
    </Router>
  );
}
