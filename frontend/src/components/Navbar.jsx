import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check token setiap kali route berubah
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [location]); // Re-check ketika route berubah

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("teamId");
    localStorage.removeItem("teamType");
    localStorage.removeItem("leaderData");

    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <nav>
      <Link to="/" className="logo">
        <em>
          Hackathon <em className="em1">'</em>25
        </em>
      </Link>
      <ul className="nav-links">
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="#prizes">Champion Prizes</a>
        </li>
        <li>
          <a href="#about">About</a>
        </li>
        <li>
          <a href="#faq">FAQ</a>
        </li>
        <li>
          <a href="#timeline">Timeline</a>
        </li>
        <li>
          <a href="/admin">Admin</a>
        </li>
        <li className="signup">
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "inherit",
                textDecoration: "none",
                fontSize: "inherit",
                padding: 0,
              }}
            >
              Logout
            </button>
          ) : (
            <Link to="/login">Log in / Sign Up </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}
