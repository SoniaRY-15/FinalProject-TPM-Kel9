import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Stepper from "./Stepper";

export default function Stage2() {
  const navigate = useNavigate();
  const [customBirthPlace, setCustomBirthPlace] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!e.target.checkValidity()) {
      e.target.reportValidity();
      return;
    }
    const birthPlace =
      birthPlaceSelect === "Lainnya" ? birthPlaceCustom : birthPlaceSelect;

    localStorage.setItem(
      "leaderData",
      JSON.stringify({
        fullName: leaderName,
        email,
        whatsapp,
        lineId,
        github,
        birthPlace,
        birthDate,
      })
    );
    navigate("/register/stage3");
  };

  return (
    <div className="container form-step active" id="step-2">
      <form onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <h1 className="form-title">
            <em>Leader Information</em>
          </h1>
          <Stepper step={2} />
          <div className="button-wrapper">
            <button className="continue-btn" type="submit">
              Continue
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}