import { LoaderFunctionArgs, redirect } from "react-router-dom";
import { fakeAuthProvider } from "../auth";

export const loginAction = async ({ request }: LoaderFunctionArgs) => {
  const formData = await request.formData();
  const username = formData.get("username") as string | null;

  // Validate our form inputs and return validation errors via useActionData()
  if (!username) {
    return {
      error: "You must provide a username to log in",
    };
  }

  try {
    await fakeAuthProvider.signin(username);
  } catch (error) {
    return {
      error: "Invalid login attempt",
    };
  }

  const redirectTo = formData.get("redirectTo") as string | null;
  return redirect(redirectTo || "/");
};
