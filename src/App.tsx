import {
  RouterProvider,
  createBrowserRouter,
  redirect,
} from "react-router-dom";
import { authProvider } from "./auth";
import Layout from "./components/Layout";
import LoginPage from "./pages/LoginPage";
import { loginLoader, protectedLoader } from "./utils/loaders";
import HomePage from "./pages/HomePage";
import CategoryPage from "./pages/CategoryPage";
import BookmarkedPage from "./pages/BookmarkedPage";
import MoviePage from "./pages/MoviePage";
import "./App.css";
import SingleCategoryPage from "./pages/SingleCategoryPage";

const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    Component: Layout,
    children: [
      {
        index: true,
        path: "login",
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
        path: "/category/:categoryId",
        loader: protectedLoader,
        Component: SingleCategoryPage,
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
      await authProvider.signout();
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
