import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { CircularProgress } from "@nextui-org/react";
import ImageCard from "./ImageCard";
import { useState, useEffect } from "react";
import { useResponsive } from "../hooks/useResponsive";
import axios from "axios";
import { parseYears } from "@/helpers/parseCategoryYears";

export default function ShowIndex({
  selectedButtonSortby,
  selectedButtonGenres,
  selectedButtonTypes,
  selectedButtonStatus,
  selectedButtonYear,
  selectedButtonSeason,
  selectedButtonRated,
}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMoreData, setHasMoreData] = useState(true);
  const { isXl, isLg, isMd, isSm, isXs } = useResponsive();
  const [colToShow, setColToShow] = useState(1);

  const year = {};
  const indexData = async () => {
    if (loading || !hasMoreData) return;
    setLoading(true);

    let params = {};

    params.page = page;
    params.sortBy =
      selectedButtonSortby === "Popular"
        ? "members"
        : selectedButtonSortby === "Score"
        ? "score"
        : null;
    params.genre =
      selectedButtonGenres !== "All Genres" ? selectedButtonGenres : null;
    params.type =
      selectedButtonTypes !== "All Types" ? selectedButtonTypes : null;
    params.status =
      selectedButtonStatus !== "All Status" ? selectedButtonStatus : null;
    params.year =
      selectedButtonYear !== "All Year" ? parseYears(selectedButtonYear) : null;
    params.season =
      selectedButtonSeason !== "All Season" ? selectedButtonSeason : null;
    params.rating =
      selectedButtonRated !== "All Rated" ? selectedButtonRated : null;

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
      console.error("Error fetching data", error);
    }

    setLoading(false);
  };

  useEffect(() => {
    setData([]);
    setPage(1);
    setHasMoreData(true);
  }, [
    selectedButtonSortby,
    selectedButtonGenres,
    selectedButtonTypes,
    selectedButtonStatus,
    selectedButtonYear,
    selectedButtonSeason,
    selectedButtonRated,
  ]);
  console.log(page);
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

  const lastElementRef = useInfiniteScroll(indexData);

  return (
    <div>
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
    </div>
  );
}
