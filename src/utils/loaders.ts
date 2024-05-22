import { LoaderFunctionArgs, redirect } from "react-router-dom";
import { fakeAuthProvider } from "../auth";

export const loginLoader = async () => {
  if (fakeAuthProvider.isAuthenticated) {
    return redirect("/");
  }
  return null;
};

export const protectedLoader = ({ request }: LoaderFunctionArgs) => {
  // If the user is not logged in and tries to access `/protected`, we redirect
  // them to `/login` with a `from` parameter that allows login to redirect back
  // to this page upon successful authentication
  if (!fakeAuthProvider.isAuthenticated) {
    let params = new URLSearchParams();
    params.set("from", new URL(request.url).pathname);
    return redirect("/login?" + params.toString());
  }
  return null;
};
