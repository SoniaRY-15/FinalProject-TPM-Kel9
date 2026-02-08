import successIcon from "../assets/registration-completed.svg";
import { Link } from 'react-router-dom';

export default function RegistrationComplete() {
  return (
    <div className="container form-step active">
      <div className="input-wrapper" style={{ textAlign: "center" }}>
        <img
          src={successIcon}
          alt="Registration Complete"
          style={{ width: "80px", marginBottom: "20px" }}
        />

        <h1 style={{ color: "#ffffff" }}>Registration Complete</h1>
        <p style={{ opacity: 0.8 }}>
          Your registration has been successfully submitted.
        </p>
        <Link to="/user-dashboard" style={{textDecoration: "underline"}}>To User Dashboard</Link>
      </div>
    </div>
  );
}
