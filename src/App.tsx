import {
  RouterProvider,
  createBrowserRouter,
  redirect,
} from "react-router-dom";
import { fakeAuthProvider } from "./auth";
import Layout from "./components/Layout";
import LoginPage from "./pages/LoginPage";
import { loginLoader, protectedLoader } from "./utils/loaders";
import { loginAction } from "./utils/actions";
import HomePage from "./pages/HomePage";
import CategoryPage from "./pages/CategoryPage";
import BookmarkedPage from "./pages/BookmarkedPage";
import MoviePage from "./pages/MoviePage";
import "./App.css";

const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    loader() {
      return { user: fakeAuthProvider.username };
    },
    Component: Layout,
    children: [
      {
        index: true,
        path: "login",
        action: loginAction,
        loader: loginLoader,
        Component: LoginPage,
      },
      {
        path: "/",
        loader: protectedLoader,
        Component: HomePage,
      },
      {
        path: "/category",
        loader: protectedLoader,
        Component: CategoryPage,
      },
      {
        path: "/bookmarked",
        loader: protectedLoader,
        Component: BookmarkedPage,
      },
      {
        path: "/movies/:id",
        loader: protectedLoader,
        Component: MoviePage,
      },
    ],
  },
  {
    path: "/logout",
    async action() {
      // We signout in a "resource route" that we can hit from a fetcher.Form
      await fakeAuthProvider.signout();
      return redirect("/");
    },
  },
]);

const App = () => {
  return (
    <RouterProvider router={router} fallbackElement={<p>Initial Load...</p>} />
  );
};

export default App;
