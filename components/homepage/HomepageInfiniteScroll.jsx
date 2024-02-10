import { useEffect, useState } from "react";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import ShowSlider from "@/components/homepage/ShowSlider";
import { CircularProgress } from "@nextui-org/react";
import { CategoryTitles, Categories, Genres } from "@/constans/categoryData";
import axios from "axios";

export default function HomepageInfiniteScroll() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dataToFetch, setDataToFetch] = useState([5, 11]);
  const [hasMoreData, setHasMoreData] = useState(true);

  const fetchMoreData = async () => {
    if (loading || !hasMoreData) return;
    setLoading(true);
    for (
      let i = dataToFetch[0];
      i < Math.min(dataToFetch[1], Categories.length);
      i++
    ) {
      const category = Categories[i];
      let params = {};

      if (Genres.includes(category)) {
        // 如果是流派类别
        params.genre = category;
        params.sortBy = "members";
      }

      const url = `${process.env.API_URL}/anime`;

      try {
        const response = await axios.get(url, {
          params,
          headers: { "X-API-Key": process.env.API_KEY },
        });
        setItems((prevData) => [
          ...prevData,
          { title: category, data: response.data },
        ]);
      } catch (error) {
        console.error(`Error fetching ${category}`, error);
        setItems((prevData) => [...prevData, { title: category, data: [] }]);
      }
    }

    const nextStart = dataToFetch[1];
    const nextEnd = nextStart + 6;
    setDataToFetch([nextStart, Math.min(nextEnd, Categories.length)]);
    setHasMoreData(nextStart < Categories.length);
    setLoading(false);
  };

  const lastElementRef = useInfiniteScroll(fetchMoreData);

  return (
    <div>
      {items.map(({ title, data }) => (
        <ShowSlider
          category={title}
          key={title}
          title={CategoryTitles[title] || title}
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

      <div ref={lastElementRef} className="h-1" />
    </div>
  );
}