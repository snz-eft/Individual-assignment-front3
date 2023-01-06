import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <nav>
          <ul className="link-grid">
            <li>
              <Link to="/about-us">About</Link>
            </li>
            <li>
              <Link to="/about-us">Contact Us</Link>
            </li>
            <li>
              <Link to="#">Cookies</Link>
            </li>
            <li>
              <Link to="#">Terms and Conditions</Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
