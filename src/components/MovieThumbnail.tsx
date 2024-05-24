import useSWRMutation, { MutationFetcher } from "swr/mutation";
import { Movie } from "../types";
import { useSWRConfig } from "swr";
import { Link } from "react-router-dom";

export const getBookmarkRequest: MutationFetcher<any, string> = async (url) =>
  fetch(url, {
    method: "POST",
  }).then((res) => {
    if (!res.ok) {
      throw new Error("Something went wrong!");
    }
  });

export const getUnbookmarkRequest: MutationFetcher<any, string> = async (url) =>
  fetch(url, {
    method: "DELETE",
  }).then((res) => {
    if (!res.ok) {
      throw new Error("Something went wrong!");
    }
  });

const MovieThumbnail = ({
  actors,
  genre,
  rating,
  synopsis,
  thumbnail,
  title,
  year,
  id,
  bookmarked,
}: Movie) => {
  const { mutate } = useSWRConfig();
  const { trigger: bookmark, isMutating: isBookmarkMutating } = useSWRMutation<
    Movie,
    Error,
    string,
    string
  >(`/api/bookmarks/${id}`, getBookmarkRequest);
  const { trigger: unbookmark, isMutating: isUnbookmarkMutating } =
    useSWRMutation<Movie, Error, string, string>(
      `/api/bookmarks/${id}`,
      getUnbookmarkRequest
    );

  const handleBookmark = async () => {
    await bookmark("test");
    mutate("/api/movies");
    mutate("/api/bookmarks");
    mutate("/api/recommended");
  };
  const handleUnbookmark = async () => {
    await unbookmark("test");
    mutate("/api/movies");
    mutate("/api/bookmarks");
    mutate("/api/recommended");
  };

  return (
    <div className="movie-thumbnail">
      <img src={thumbnail} alt={title} className="movie-poster" />
      <div className="movie-info">
        <h3 className="movie-title">{title}</h3>
        <p className="movie-year">{year}</p>
        <p className="movie-rating">
          <Link to={`/category/${genre}`}>{genre}</Link>
        </p>
        <p className="movie-rating">{rating}</p>
        {!bookmarked && (
          <button onClick={handleBookmark} disabled={isBookmarkMutating}>
            {isBookmarkMutating ? "...loading" : "Bookmark"}
          </button>
        )}
        {bookmarked && (
          <button onClick={handleUnbookmark} disabled={isUnbookmarkMutating}>
            {isUnbookmarkMutating ? "...loading" : "Unbookmark"}
          </button>
        )}
        <Link to={`/movies/${id}`}>Details</Link>
      </div>
    </div>
  );
};

export default MovieThumbnail;
