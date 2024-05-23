import { useFetcher } from "react-router-dom";
import useSWR, { Fetcher } from "swr";
import { User } from "../types";
import useSWRMutation, { MutationFetcher } from "swr/mutation";

const getLogoutRequest: MutationFetcher<any, string> = async (url) =>
  fetch(url);
const getUserRequest: Fetcher<User, string> = async (url) =>
  fetch(url).then((res) => {
    if (!res.ok) {
      if (res.status === 403) {
        throw new Error("User not found!");
      }
      throw new Error("Something went wrong!");
    }
    return res.json();
  });

const AuthStatus = () => {
  const fetcher = useFetcher();
  const { data, error } = useSWR<User, Error, string>(
    "/api/user",
    getUserRequest
  );

  const { trigger: logout, isMutating } = useSWRMutation<User, Error, string>(
    "/api/logout",
    getLogoutRequest
  );

  const handleLogout = async () => {
    await logout();

    window.location.reload();
  };

  if (error) return null;
  if (!data) return null;

  return (
    <>
      <p>Welcome 👋 {data.name}!</p>
      <fetcher.Form method="post" onSubmit={handleLogout}>
        <button type="submit" disabled={isMutating}>
          {isMutating ? "Signing out..." : "Sign out"}
        </button>
      </fetcher.Form>
    </>
  );
};

export default AuthStatus;
