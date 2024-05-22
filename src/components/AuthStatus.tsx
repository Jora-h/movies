import { useFetcher, useRouteLoaderData } from "react-router-dom";

const AuthStatus = () => {
  let { user } = useRouteLoaderData("root") as { user: string | null };
  let fetcher = useFetcher();

  if (!user) {
    return null;
  }

  let isLoggingOut = fetcher.formData != null;

  return (
    <>
      <p>Welcome 👋 {user}!</p>
      <fetcher.Form method="post" action="/logout">
        <button type="submit" disabled={isLoggingOut}>
          {isLoggingOut ? "Signing out..." : "Sign out"}
        </button>
      </fetcher.Form>
    </>
  );
};

export default AuthStatus;
