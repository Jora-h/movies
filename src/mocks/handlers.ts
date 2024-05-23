import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("/api/movies", () =>
    HttpResponse.json([{ title: "name", id: "abc-123" }])
  ),
];
