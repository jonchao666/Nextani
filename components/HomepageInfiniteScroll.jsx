import { useState } from "react";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import ShowSlider from "@/components/ShowSlider";
import { CircularProgress } from "@nextui-org/react";

import {
  categoryTitles,
  categories,
  genres,
  directors,
} from "@/constans/categoryData";
import axios from "axios";

export default function HomepageInfiniteScroll() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dataToFetch, setDataToFetch] = useState([5, 11]);
  const [hasMoreData, setHasMoreData] = useState(true);

  const fetchMoreData = async () => {
    console.log(dataToFetch);
    if (loading || !hasMoreData) return;
    setLoading(true);
    const slidersData = await Promise.all(
      categories.slice(dataToFetch[0], dataToFetch[1]).map(async (category) => {
        let url;
        if (genres.includes(category)) {
          // 如果是流派类别，则构建流派 URL
          url = `${process.env.API_URL}/anime/genres/${category}`;
        } else if (directors.includes(category)) {
          // 如果是流派类别，则构建流派 URL
          url = `${process.env.API_URL}/anime/directors/${category}`;
        } else {
          // 否则，使用原来的 URL
          url = `${process.env.API_URL}/anime/${category}`;
        }

        try {
          const response = await axios.get(url, {
            headers: {
              "X-API-Key": process.env.API_KEY,
            },
          });
          return { title: category, data: response.data };
        } catch (error) {
          console.error(`Error fetching ${category}`, error);
          return { title: category, data: [] };
        }
      })
    );
    setItems((prevData) => [...prevData, ...slidersData]);
    setDataToFetch((prevDataToFetch) => {
      const nextStart = prevDataToFetch[1];
      const nextEnd = nextStart + 6;

      if (nextStart >= categories.length) {
        setHasMoreData(false);
        return prevDataToFetch;
      }

      return [nextStart, Math.min(nextEnd, categories.length)];
    });
    setLoading(false);
  };

  const lastElementRef = useInfiniteScroll(fetchMoreData);

  return (
    <div>
      {items.map(({ title, data }) => (
        <ShowSlider
          key={title}
          title={categoryTitles[title] || title}
          data={data}
        />
      ))}
      {loading && (
        <CircularProgress
          className="mx-auto"
          color="default"
          aria-label="Loading..."
        />
      )}
      <div ref={lastElementRef} />
    </div>
  );
}
