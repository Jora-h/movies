import useSWR from "swr";
import MovieThumbnail from "./MovieThumbnail";
import { fetcher } from "../utils/swr";

const Carousel = () => {
  const { data, error, isLoading } = useSWR("/api/movies", fetcher);

  if (error) return <div>error</div>;
  if (isLoading) return <div>..loading</div>;
  if (!data || data?.length === 0) return <p>No movie found</p>;

  return (
    <div className="carousel">
      {data.map((movie) => (
        <MovieThumbnail />
      ))}
    </div>
  );
};

const TrendingSection = () => {
  return (
    <div className="section trending">
      <div className="section-heading">
        <h2>Trending</h2>
      </div>
      <Carousel />
    </div>
  );
};

export default TrendingSection;
