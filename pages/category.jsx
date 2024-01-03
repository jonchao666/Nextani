import Layout from "@/components/layout/Layout";
import ImageCard from "@/components/ImageCard";
import axios from "axios";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { CircularProgress } from "@nextui-org/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useResponsive } from "../hooks/useResponsive";
import {
  genres,
  directors,
  categoryTitles,
  types,
} from "@/constans/categoryData";
import {
  getLastSeasonAndYear,
  getNextSeasonAndYear,
} from "@/helpers/getSeasonAndYear";

export default function Category() {
  const router = useRouter();
  const { category } = router.query;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMoreData, setHasMoreData] = useState(true);
  const { isXl, isLg, isMd, isSm, isXs } = useResponsive();
  const [colToShow, setColToShow] = useState(1);

  const slidersData = async () => {
    if (loading || !hasMoreData || !category) return;
    setLoading(true);

    let params = {};

    params.page = page;
    if (genres.includes(category)) {
      // 如果是流派类别
      params.genre = category;
      params.sortBy = "members";
    } else if (directors.includes(category)) {
      // 如果是导演类别
      params.director = category;
      params.sortBy = "members";
    } else if (types.includes(category)) {
      params.type = category;
      params.sortBy = "members";
    } else if (category === "thisSeasonPopular") {
      const seasonYear = getLastSeasonAndYear();

      params.year = seasonYear[0].year;
      params.season = seasonYear[0].season;
      params.sortBy = "members";
    } else if (category === "nextSeason") {
      const seasonYear = getNextSeasonAndYear();
      params.year = seasonYear[0].year;
      params.season = seasonYear[0].season;
      params.sortBy = "members";
    } else if (category === "Popular") {
      params.sortBy = "members";
    } else if (category === "Top") {
      params.sortBy = "score";
    }

    const url = `${process.env.API_URL}/anime`;

    try {
      // 请求第一页数据
      const responsePage1 = await axios.get(url, {
        params,
        headers: {
          "X-API-Key": process.env.API_KEY,
        },
      });
      setData((prevData) => [...prevData, ...responsePage1.data]);
      setHasMoreData(responsePage1.data.length >= 18);

      if (hasMoreData) {
        params.page = page + 1;

        // 请求第二页数据
        const responsePage2 = await axios.get(url, {
          params,
          headers: {
            "X-API-Key": process.env.API_KEY,
          },
        });
        setData((prevData) => [...prevData, ...responsePage2.data]);
        setHasMoreData(responsePage2.data.length >= 18);
        setPage((prev) => prev + 2);
      } else {
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.error(`Error fetching ${category}`, error);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (category) {
      setData([]); // 重置数据
      setPage(1); // 重置页码
      setHasMoreData(true); // 重置是否有更多数据的标志
    }
  }, [category]);
  const lastElementRef = useInfiniteScroll(slidersData);

  useEffect(() => {
    // 根据屏幕尺寸更新 slidesToShow 的值
    const newColToshow = isXl
      ? " grid-cols-6"
      : isLg
      ? "grid-cols-5"
      : isMd
      ? " grid-cols-4"
      : isSm
      ? "grid-cols-3"
      : isXs
      ? "grid-cols-2"
      : "grid-cols-1";
    setColToShow(newColToshow);
  }, [isXl, isLg, isMd, isSm, isXs]);

  return (
    <Layout>
      <div className="text-xl  font-bold line-clamp-1">
        {categoryTitles[category] || category}
      </div>
      <div className={`w-full grid ${colToShow} gap-y-6 mt-6 `}>
        {data && data.map((item) => <ImageCard key={item._id} data={item} />)}
      </div>
      {loading && (
        <CircularProgress
          className="mx-auto"
          color="default"
          aria-label="Loading..."
        />
      )}
      <div ref={lastElementRef} className="h-1" />
    </Layout>
  );
}
