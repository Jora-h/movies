import { Fetcher } from "swr";

type Movie = {
  id: string;
  title: string;
};

export const fetcher: Fetcher<Movie[], string> = (...args) =>
  fetch(...args).then((res) => res.json());
