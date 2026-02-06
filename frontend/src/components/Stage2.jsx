import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Stepper from "./Stepper";

export default function Stage2() {
  const navigate = useNavigate();
  const [leaderName, setLeaderName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [lineId, setLineId] = useState("");
  const [github, setGithub] = useState("");
  const [birthPlace, setBirthPlace] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [customBirthPlace, setCustomBirthPlace] = useState(false);
  const [birthPlaceSelect, setBirthPlaceSelect] = useState("");
  const [birthPlaceCustom, setBirthPlaceCustom] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const commonBirthPlaces = [
    "Jakarta",
    "Bandung",
    "Surabaya",
    "Medan",
    "Semarang",
    "Makassar",
    "Palembang",
    "Yogyakarta",
    "Lainnya",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (
      !leaderName ||
      !email ||
      !whatsapp ||
      !lineId ||
      !birthPlace ||
      !birthDate
    ) {
      setError("Semua field harus diisi");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Email tidak valid");
      return;
    }

    // Whatsapp validation (minimal 9 digit)
    if (whatsapp.replace(/\D/g, "").length < 9) {
      setError("Nomor Whatsapp minimal 9 digit");
      return;
    }

    // Age validation (minimal 17 tahun)
    const dob = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) age--;

    if (age < 17) {
      setError("Umur minimal 17 tahun");
      return;
    }

    // Determine birth place
    const finalBirthPlace =
      birthPlaceSelect === "Lainnya" ? birthPlaceCustom : birthPlaceSelect;

    if (!finalBirthPlace) {
      setError("Pilih kota tempat lahir");
      return;
    }

    // Save to localStorage
    localStorage.setItem(
      "leaderData",
      JSON.stringify({
        fullName: leaderName,
        email,
        whatsapp,
        lineId,
        github: github || null,
        birthPlace: finalBirthPlace,
        birthDate,
      }),
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

          {error && (
            <div style={{ color: "salmon", marginTop: 8, marginBottom: 16 }}>
              {error}
            </div>
          )}

          <div className="input-group">
            <input
              type="text"
              placeholder="Full Name"
              value={leaderName}
              onChange={(e) => setLeaderName(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <input
              type="text"
              placeholder="WhatsApp Number"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <input
              type="text"
              placeholder="LINE ID"
              value={lineId}
              onChange={(e) => setLineId(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <input
              type="text"
              placeholder="GitHub (Optional)"
              value={github}
              onChange={(e) => setGithub(e.target.value)}
            />
          </div>

          <div className="input-group">
            <select
              className="birth-place"
              value={birthPlaceSelect}
              onChange={(e) => {
                setBirthPlaceSelect(e.target.value);
                if (e.target.value === "Lainnya") {
                  setCustomBirthPlace(true);
                  setBirthPlace("");
                } else {
                  setCustomBirthPlace(false);
                  setBirthPlace(e.target.value);
                }
              }}
              required
            >
              <option value="">Pilih Kota Tempat Lahir</option>
              {commonBirthPlaces.map((place) => (
                <option key={place} value={place}>
                  {place}
                </option>
              ))}
            </select>
          </div>

          {customBirthPlace && (
            <div className="input-group">
              <input
                type="text"
                placeholder="Masukkan Kota Tempat Lahir"
                value={birthPlaceCustom}
                onChange={(e) => {
                  setBirthPlaceCustom(e.target.value);
                  setBirthPlace(e.target.value);
                }}
                required
              />
            </div>
          )}

          <div className="input-group">
            <input
              type="date"
              className="birth-date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              required
            />
          </div>

          <div className="button-wrapper">
            <button className="continue-btn" type="submit" disabled={loading}>
              {loading ? "Loading..." : "Continue"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
