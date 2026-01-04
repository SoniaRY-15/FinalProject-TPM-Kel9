import Stepper from "./Stepper";
import UploadBox from "./UploadBox";
import { useState } from "react";
import uploadIcon from "../assets/upload-btn.svg";

export default function Stage3({ step, onContinue }) {
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!e.target.checkValidity()) {
      e.target.reportValidity();
      return;
    }

    onContinue();
  };
  const [cvFile, setCvFile] = useState(null);
  const [cardFile, setCardFile] = useState(null);

  return (
    <div className="container form-step active" id="step-3">
        <form onSubmit={handleSubmit}>
            <div className="input-wrapper">
            <h1 className="form-title"><em>Upload Documents</em></h1>
                <Stepper step={step}/>

                <div className="input-group">
                    <UploadBox
                        title="Upload your Curriculum Vitae"
                        description="Upload Curriculum Vitae .pdf .jpg .jpeg .png"
                        selectedFile={cvFile}
                        onFileSelect={setCvFile}
                        icon={uploadIcon}
                    />
                </div>

                <div className="input-group">
                    <UploadBox
                        title="Upload your Binusian Card"
                        description="Upload Flazz Card .pdf .jpg .jpeg .png"
                        selectedFile={cardFile}
                        onFileSelect={setCardFile}
                        icon={uploadIcon}
                    />
                </div>

                <div className="button-wrapper">
                    <button className="continue-btn" type="submit">Upload</button>
                </div>

            </div>
        </form>
    </div>
  );
}
