import useSWRMutation, { MutationFetcher } from "swr/mutation";
import { User } from "../types";

const getLoginRequest: MutationFetcher<any, string, FormData> = async (
  url,
  { arg: body }
) =>
  fetch(url, {
    method: "POST",
    body,
  }).then((res) => {
    if (!res.ok) {
      if (res.status === 401) {
        throw new Error("Password or Username Wrong!");
      }
      throw new Error("Something went wrong!");
    }
    return res.json();
  });

const LoginPage = () => {
  const {
    trigger: login,
    isMutating,
    error,
  } = useSWRMutation<User, Error, string, FormData>(
    "/api/login",
    getLoginRequest
  );

  const handleLogin: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const data = await login(formData);
    if (data) {
      window.location.reload();
    }
  };

  return (
    <form className="login-form" onSubmit={handleLogin}>
      <h1>Sign in</h1>
      <label className="form-field">
        username
        <input name="username" required />
      </label>
      <label className="form-field">
        password
        <input name="password" type="password" required />
      </label>
      <button type="submit">{isMutating ? "...Submitting" : "Login"}</button>
      {error ? <p style={{ color: "red" }}>{error.message}</p> : null}
    </form>
  );
};

export default LoginPage;
