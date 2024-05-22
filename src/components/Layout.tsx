import { Link, Outlet } from "react-router-dom";
import AuthStatus from "./AuthStatus";

const Layout = () => {
  return (
    <div>
      Header with links and login status
      <Link to="/">Home</Link>
      <Link to="/category">Category</Link>
      <Link to="/bookmarked">Bookmarked</Link>
      <Link to="/movies/:id">Single Movie</Link>
      <AuthStatus />
      <Outlet />
      Footer
    </div>
  );
};

export default Layout;
