import { LoaderFunctionArgs, redirect } from "react-router-dom";
import { authProvider } from "../auth";

export const loginLoader = async () => {
  if (authProvider.isAuthenticated) {
    return redirect("/");
  }
  return null;
};

export const protectedLoader = ({ request }: LoaderFunctionArgs) => {
  if (!authProvider.isAuthenticated) {
    let params = new URLSearchParams();
    params.set("from", new URL(request.url).pathname);
    return redirect("/login?" + params.toString());
  }
  return null;
};
