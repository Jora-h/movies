export type User = {
  username: string;
  name: string;
  token: string;
};

export type Movie = {
  id: string;
  title: string;
  year: number;
  rating: string;
  actors: string[];
  genre: string;
  synopsis: string;
  thumbnail: string;
  bookmarked?: boolean;
  isTrending?: boolean;
};
