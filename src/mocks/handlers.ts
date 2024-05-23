import { http, HttpResponse } from "msw";

const users = [
  {
    username: "hajar",
    password: "test",
    name: "Hajar Hamza",
    token: "abc-123",
  },
];

async function isAuthenticated({
  cookies,
}: {
  cookies: Record<string, string>;
}) {
  if (!cookies.authToken) {
    throw new HttpResponse(null, { status: 403 });
  }
}

export const handlers = [
  http.get("/api/user", async ({ cookies }) => {
    await isAuthenticated({ cookies });

    const user = users.find((user) => user.token === cookies.authToken);
    if (!user) {
      return new HttpResponse(null, { status: 403 });
    }

    const { password: _, ...userData } = user;

    return HttpResponse.json(userData);
  }),
  http.get("/api/logout", () => {
    return new HttpResponse(null, {
      status: 201,
      headers: {
        "Set-Cookie": `authToken=; Max-Age=-99999999;`,
      },
    });
  }),
  http.post("/api/login", async ({ request }) => {
    const data = await request.formData();

    const username = data.get("username");
    const password = data.get("password");

    const user = users.find((user) => user.username === username);
    if (!user || user.password !== password) {
      throw new HttpResponse("Invalid username or password", { status: 401 });
    }

    const { password: _, ...userData } = user;

    return HttpResponse.json(userData, {
      headers: {
        "Set-Cookie": `authToken=${user.token}`,
      },
    });
  }),
  http.get("/api/movies", () =>
    HttpResponse.json([{ title: "name", id: "abc-123" }])
  ),
];
