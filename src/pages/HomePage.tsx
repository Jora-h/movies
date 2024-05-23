import AllMoviesSection from "../components/AllMoviesSection";
import RecommendedSection from "../components/RecommendedSection";
import TrendingSection from "../components/TrendingSection";

const HomePage = () => {
  return (
    <div>
      <TrendingSection />
      <RecommendedSection />
      <AllMoviesSection />
    </div>
  );
};

export default HomePage;
