import "./About.css";
import { Link } from "react-router-dom";
export default function About() {
  return (
    <header className="header">
      <nav className="header__container">
        <Link to="/movielist/about" className="header__logo">
          Movie List
        </Link>
        <div className="header__aside">
          <Link className="button button--medium" to="/signin">
            Sign in
          </Link>
          <Link className="button" to="/signup">
            Create an account
          </Link>
        </div>
      </nav>
    </header>
  );
}
