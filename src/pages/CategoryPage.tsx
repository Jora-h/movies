import { Link } from "react-router-dom";
import useSWR from "swr";
import { fetcher } from "../utils/swr";

const CategoryPage = () => {
  const { data, error, isLoading } = useSWR<string[]>(
    "/api/categories",
    fetcher
  );

  if (error) return <div>error</div>;
  if (isLoading) return <div>..loading</div>;
  if (!data || data?.length === 0) return <p>No category found</p>;

  return (
    <>
      <h3>Category Page</h3>
      <ul>
        {data.map((category) => (
          <li>
            <Link to={`/category/${category}`}>{category}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default CategoryPage;
