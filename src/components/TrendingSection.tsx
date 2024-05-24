import useSWR from "swr";
import { fetcher } from "../utils/swr";
import Carousel from "./Carousel";
import { Movie } from "../types";

const TrendingSection = () => {
  const { data, error, isLoading } = useSWR<Movie[]>("/api/movies", fetcher);

  if (error) return <div>error</div>;
  if (isLoading) return <div>..loading</div>;
  if (!data || data?.length === 0) return <p>No movie found</p>;

  return (
    <div className="section">
      <div className="section-heading">
        <h2>Trending</h2>
      </div>
      <Carousel data={data.filter((movie) => movie.isTrending)} />
    </div>
  );
};

export default TrendingSection;
