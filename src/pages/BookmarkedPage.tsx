import useSWR from "swr";
import { fetcher } from "../utils/swr";
import MovieThumbnail from "../components/MovieThumbnail";
import { Movie } from "../types";

const BookmarkedPage = () => {
  const { data, error, isLoading } = useSWR<Movie[]>("/api/bookmarks", fetcher);

  if (error) return <div>error</div>;
  if (isLoading) return <div>..loading</div>;
  if (!data || data?.length === 0) return <p>No movies found</p>;

  return (
    <div>
      <h3>Bookmarked Page</h3>
      {data.map((movie, key) => (
        <MovieThumbnail {...movie} key={"bookmarked-vidoes-item-" + key} />
      ))}
    </div>
  );
};

export default BookmarkedPage;
