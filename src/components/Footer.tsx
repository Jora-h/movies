import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div className="logo">
        <Link to="/">Movies@app</Link>
      </div>
      <nav className="secondary-navigation">
        <ul>
          <li>
            <Link to="/">link 1</Link>
          </li>
          <li>
            <Link to="/">link 2</Link>
          </li>
          <li>
            <Link to="/">link 3</Link>
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;
