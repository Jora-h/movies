import Carousel from "./Carousel";
import { useEffect, useState } from "react";
import useSWRMutation, { MutationFetcher } from "swr/mutation";
import { Movie } from "../types";

const getSearchMoviesRequest: MutationFetcher<Movie[], string, string> = async (
  url,
  { arg: keyword }
) =>
  fetch(`${url}${keyword ? "?keyword=" + keyword : ""}`).then((res) => {
    if (!res.ok) {
      throw new Error("Something went wrong!");
    }
    return res.json();
  });

const AllMoviesSection = () => {
  const {
    data,
    trigger: searchMovies,
    error,
  } = useSWRMutation<Movie[], Error, string, string>(
    "/api/movies",
    getSearchMoviesRequest
  );
  const [keyword, setKeyword] = useState("");

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setKeyword(e.target.value);
  };

  useEffect(() => {
    searchMovies(keyword);
  }, [keyword, searchMovies]);

  return (
    <div className="section recommended">
      <div className="section-heading">
        <h2>All Movies</h2>
        <input
          type="text"
          className="section-search"
          value={keyword}
          onChange={handleChange}
        />
      </div>
      {error || !data || data?.length === 0 ? (
        "No videos found!"
      ) : (
        <Carousel data={data} />
      )}
    </div>
  );
};

export default AllMoviesSection;
