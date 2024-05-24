import useSWR from "swr";
import Carousel from "./Carousel";
import { fetcher } from "../utils/swr";

const RecommendedSection = () => {
  const { data, error, isLoading } = useSWR("/api/recommended", fetcher);

  if (error) return <div>error</div>;
  if (isLoading) return <div>..loading</div>;
  if (!data || data?.length === 0) return <p>No movies found</p>;

  return (
    <div className="section">
      <div className="section-heading">
        <h2>Recommended</h2>
      </div>
      <Carousel data={data} />
    </div>
  );
};

export default RecommendedSection;
