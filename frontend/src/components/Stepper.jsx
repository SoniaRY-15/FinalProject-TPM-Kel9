import { useEffect, useState } from "react";

export default function Stepper({ step }) {
  const [animateStep, setAnimateStep] = useState(null);

  useEffect(() => {
    setAnimateStep(step);
  }, [step]);

  return (
    <div className="stepper-section">
      <div className="stepper-visual">
        <div className={`ellipse active`} />
        <div className={`progress-line ${step > 2 ? "active" : animateStep === 2 ? "animate" : ""}`} />

        <div className={`ellipse ${step > 2 ? "active" : animateStep === 2 ? "animate" : ""}`} />
        <div className={`progress-line ${step > 3 ? "active" : animateStep === 3 ? "animate" : ""}`} />

        <div className={`ellipse ${step > 3 ? "active" : animateStep === 3 ? "animate" : ""}`} />
      </div>

      <div className="stepper-labels">
        <div className={`label-item ${step >= 1 ? "active" : ""}`}>
          Register Your Team
        </div>
        <div className={`label-item ${step >= 2 ? "active" : ""}`}>
          Leader Information
        </div>
        <div className={`label-item ${step >= 3 ? "active" : ""}`}>
          Upload Documents
        </div>
      </div>
    </div>
  );
}