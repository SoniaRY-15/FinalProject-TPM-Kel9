import { Link } from "react-router-dom";
export default function Navbar() {
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
        {/* <li><a href="#">Mentors & Jury</a></li> no mentor and jury section */}
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
          <Link to="/login">Log in / Sign Up </Link>
        </li>
      </ul>
    </nav>
  );
}
