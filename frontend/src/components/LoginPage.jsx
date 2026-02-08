import { useState } from "react";
import "../styles/loginpage.css";

export default function LoginPage (){
  return (
    <>
      <div className="lp-container lp-form-step active" id="step-1">
        <div className="lp-input-wrapper">
          <h1 className="lp-form-title">
            <em>Welcome to Hackathon’25</em>
          </h1>

          <div className="lp-input-group">
            <input type="text" placeholder="Teamname" required />
          </div>

          <div className="lp-input-group">
            <input type="password" placeholder="Password" required />
          </div>

          <div className="lp-button-wrapper">
            <button className="lp-login-btn" id="loginBtn">
              Log in
            </button>
          </div>

          <div className="lp-signup-wrapper">
            <span className="lp-signup-text">Don’t have an account?</span>
            <a href="/register" className="lp-signup-link">
              Register now
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
