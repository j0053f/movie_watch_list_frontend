import "./About.css";
export default function About() {
  return (
    <header className="header">
      <nav class="header__container">
        <Link to="/movielist/about" className="header__logo">
          Movie List
        </Link>
        <div class="header__aside">
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
