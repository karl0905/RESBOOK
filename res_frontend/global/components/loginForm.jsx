import { Form, useActionData, useNavigation } from "@remix-run/react";

export function LoginForm() {
  const actionData = useActionData();
  const navigation = useNavigation();

  return (
    <Form method="post">
      <input
        type="email"
        name="email"
        placeholder="Email"
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        required
      />
      <button type="submit" disabled={navigation.state === "submitting"}>
        {navigation.state === "submitting" ? "Logging in..." : "Login"}
      </button>
      {actionData?.error && <div>{actionData.error}</div>}
    </Form>
  );
}
