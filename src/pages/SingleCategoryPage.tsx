import { useParams } from "react-router-dom";
import useSWR from "swr";
import { fetcher } from "../utils/swr";
import MovieThumbnail from "../components/MovieThumbnail";
import { Movie } from "../types";

const SingleCategoryPage = () => {
  let { categoryId } = useParams();
  const { data, error, isLoading } = useSWR<Movie[]>(
    categoryId ? `/api/movies?genre=${categoryId}` : null,
    fetcher
  );

  if (error) return <div>error</div>;
  if (isLoading) return <div>..loading</div>;
  if (!data || data?.length === 0) return <p>No category found</p>;

  return (
    <div>
      <h3>{categoryId}</h3>
      <ul>
        {data.map((movie, key) => (
          <MovieThumbnail {...movie} key={`category-list-item-${key}`} />
        ))}
      </ul>
    </div>
  );
};

export default SingleCategoryPage;
