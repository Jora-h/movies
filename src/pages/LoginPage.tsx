import {
  Form,
  useActionData,
  useLocation,
  useNavigation,
} from "react-router-dom";

const LoginPage = () => {
  let location = useLocation();
  let params = new URLSearchParams(location.search);
  let from = params.get("from") || "/";

  let navigation = useNavigation();
  let isLoggingIn = navigation.formData?.get("username") != null;

  let actionData = useActionData() as { error: string } | undefined;

  return (
    <div>
      <Form method="post" replace className="login-form">
        <h1>Sign in</h1>
        <input type="hidden" name="redirectTo" value={from} />
        <label className="form-field">
          username
          <input name="username" />
        </label>
        <label className="form-field">
          password
          <input name="password" />
        </label>
        <button type="submit" disabled={isLoggingIn} className="form-button">
          {isLoggingIn ? "Logging in..." : "Login"}
        </button>
        {actionData && actionData.error ? (
          <p style={{ color: "red" }}>{actionData.error}</p>
        ) : null}
      </Form>
    </div>
  );
};

export default LoginPage;
