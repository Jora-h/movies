import { Link } from "react-router-dom";
import AuthStatus from "./AuthStatus";

const Header = () => {
  return (
    <header>
      <div className="logo">
        <Link to="/">Movies@app</Link>
      </div>
      <nav className="main-navigation">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="category">Categories</Link>
          </li>
          <li>
            <Link to="bookmarked">Bookmarked</Link>
          </li>
        </ul>
      </nav>
      <div className="user">
        <AuthStatus />
      </div>
    </header>
  );
};

export default Header;
