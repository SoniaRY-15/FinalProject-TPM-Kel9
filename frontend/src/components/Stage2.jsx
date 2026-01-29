import { useState } from "react";
import Stepper from "./Stepper";

export default function Stage2({ step, onContinue }) {
  const [customBirthPlace, setCustomBirthPlace] = useState(false);

  // Controlled inputs (kept placeholders / layout same)
  const [leaderName, setLeaderName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [lineId, setLineId] = useState("");
  const [github, setGithub] = useState("");
  const [birthPlaceSelect, setBirthPlaceSelect] = useState("");
  const [birthPlaceCustom, setBirthPlaceCustom] = useState("");
  const [birthDate, setBirthDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!e.target.checkValidity()) {
      e.target.reportValidity();
      return;
    }

    const birthPlace =
      birthPlaceSelect === "Lainnya" ? birthPlaceCustom : birthPlaceSelect;

    onContinue({
      fullName: leaderName,
      email,
      whatsapp,
      lineId,
      github,
      birthPlace,
      birthDate,
    });
  };

  const handleBirthPlaceChange = (e) => {
    const val = e.target.value;
    setBirthPlaceSelect(val);
    if (val === "Lainnya") {
      setCustomBirthPlace(true);
    } else {
      setCustomBirthPlace(false);
      setBirthPlaceCustom("");
    }
  };

  return (
    <div className="container form-step active" id="step-2">
      <form onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <h1 className="form-title">
            <em>Leader Information</em>
          </h1>
          <Stepper step={step} />

          <div className="input-group">
            <input
              type="text"
              placeholder="Leader Name"
              required
              value={leaderName}
              onChange={(e) => setLeaderName(e.target.value)}
            />
          </div>

          <div className="input-group">
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-group">
            <input
              type="text"
              placeholder="Whatsapp Number"
              required
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
            />
          </div>

          <div className="input-group">
            <input
              type="text"
              placeholder="Line ID"
              required
              value={lineId}
              onChange={(e) => setLineId(e.target.value)}
            />
          </div>

          <div className="input-group">
            <input
              type="text"
              placeholder="Github/Gitlab ID"
              required
              value={github}
              onChange={(e) => setGithub(e.target.value)}
            />
          </div>

          <div className="input-group">
            <div className="input-wrapper select-wrapper">
              <select
                id="birthPlaceSelect"
                name="birth_place"
                className="birth-place"
                required
                value={birthPlaceSelect}
                onChange={handleBirthPlaceChange}
              >
                <option value="" disabled>
                  Birth Place
                </option>
                <option value="Jakarta">Jakarta</option>
                <option value="Bogor">Bogor</option>
                <option value="Depok">Depok</option>
                <option value="Tangerang">Tangerang</option>
                <option value="Bekasi">Bekasi</option>
                <option value="Bandung">Bandung</option>
                <option value="Cirebon">Cirebon</option>
                <option value="Tasikmalaya">Tasikmalaya</option>
                <option value="Semarang">Semarang</option>
                <option value="Surakarta (Solo)">Surakarta (Solo)</option>
                <option value="Yogyakarta">Yogyakarta</option>
                <option value="Surabaya">Surabaya</option>
                <option value="Malang">Malang</option>
                <option value="Kediri">Kediri</option>
                <option value="Blitar">Blitar</option>
                <option value="Denpasar">Denpasar</option>
                <option value="Mataram">Mataram</option>
                <option value="Medan">Medan</option>
                <option value="Palembang">Palembang</option>
                <option value="Padang">Padang</option>
                <option value="Pekanbaru">Pekanbaru</option>
                <option value="Bandar Lampung">Bandar Lampung</option>
                <option value="Balikpapan">Balikpapan</option>
                <option value="Samarinda">Samarinda</option>
                <option value="Banjarmasin">Banjarmasin</option>
                <option value="Pontianak">Pontianak</option>
                <option value="Makassar">Makassar</option>
                <option value="Manado">Manado</option>
                <option value="Jayapura">Jayapura</option>
                <option value="Lainnya">Lainnya</option>
              </select>
              <input
                type="text"
                id="birthPlaceInput"
                className="birth-place"
                placeholder="Enter your birth place"
                style={{ display: customBirthPlace ? "block" : "none" }}
                value={birthPlaceCustom}
                onChange={(e) => setBirthPlaceCustom(e.target.value)}
                required={customBirthPlace}
              />
            </div>
          </div>

          <div className="input-group">
            <input
              type="text"
              onFocus={(e) => (e.target.type = "date")}
              onBlur={(e) => {
                if (!e.target.value) e.target.type = "text";
              }}
              placeholder="Birth Date"
              required
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
            />
          </div>

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
