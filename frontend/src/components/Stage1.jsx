import Stepper from "./Stepper";

export default function Stage1({ step, onContinue }) {
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!e.target.checkValidity()) {
      e.target.reportValidity();
      return;
    }

    onContinue();
  };

  return (
    <div className="container form-step active" id="step-1">
        <form onSubmit={handleSubmit}>
            <div className="input-wrapper">
                <h1 className="form-title"><em>Registration Form</em></h1>

                <Stepper step={step}/>

                <div className="input-group">
                    <input type="text" placeholder="Team Name" required/>
                </div>

                <div className="input-group">
                    <input type="password" placeholder="Password" required/>
                </div>

                <div className="button-wrapper">
                    <button className="continue-btn" type="submit">Continue</button>
                </div>
            </div>
        </form>
    </div>
  );
}
