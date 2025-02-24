import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { CircularProgress } from "@nextui-org/react";
import ImageCard from "../layout/ImageCard";
import { useState, useEffect } from "react";
import { useResponsive } from "../../hooks/useResponsive";
import axios from "axios";
import { parseYears } from "@/utils/parseCategoryYears";
import { useSelector } from "react-redux";
import { getLastTwoSeasonAndYears } from "@/utils/getSeasonAndYear";
import { calculatePlaceholdersForLastRow } from "@/utils/getLastRowRequestForFlex";

export default function ShowIndex({
  selectedButtonSortby,
  selectedButtonGenres,
  selectedButtonTypes,
  selectedButtonStatus,
  selectedButtonYear,
  selectedButtonSeason,
  selectedButtonRated,
  groupYearAndSeaon,
}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMoreData, setHasMoreData] = useState(true);
  const { isXl, isLg, isMd, isSm, isXs } = useResponsive();
  const [colToShow, setColToShow] = useState(1);
  const [placeholdersNeeded, setPlaceholdersNeeded] = useState(0);
  const isSensitiveFilterDisabled = useSelector(
    (state) => state.isSensitiveFilterDisabled.isSensitiveFilterDisabled
  );
  const isMobileDevice = useSelector((state) => state.isMobile.isMobileDevice);

  const indexData = async () => {
    if (loading || !hasMoreData) return;
    setLoading(true);

    let params = {};
    params.isSensitiveFilterDisabled = isSensitiveFilterDisabled;
    params.page = page;
    params.sortBy =
      selectedButtonSortby === "Popularity"
        ? "popularity"
        : selectedButtonSortby === "Score"
        ? "score"
        : selectedButtonSortby === "Overall"
        ? "overall"
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

    if (groupYearAndSeaon) {
      const seasonYear = getLastTwoSeasonAndYears();
      params.yearAndSeason = [
        [seasonYear[0].year, seasonYear[0].season],
        [seasonYear[1].year, seasonYear[1].season],
      ];

      params.status = "Finished Airing";
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

  //get last Pseudo-element need when use flex-evenly
  useEffect(() => {
    if (typeof window !== "undefined") {
      let containerWidth = window.innerWidth;
      let itemWidth = 154;
      let itemsCount = data ? data.length : 0;
      setPlaceholdersNeeded(
        calculatePlaceholdersForLastRow(containerWidth, itemWidth, itemsCount)
      );
    }
  }, [data, placeholdersNeeded]);

  const lastElementRef = useInfiniteScroll(indexData);

  return (
    <div>
      {!loading && data.length === 0 ? (
        <div className="text-center mt-4 text-sm">No results found.</div>
      ) : (
        <div className={isMobileDevice || !isXs ? "mt-0 mb-6" : "mt-3 mb-6"}>
          {isMobileDevice || !isXs ? (
            <div className="  flex  justify-evenly flex-wrap gap-y-6 ">
              {data &&
                data.map((item, index) => (
                  <ImageCard key={index} data={item} smallSize={true} />
                ))}
              {Array.from({ length: placeholdersNeeded }, (_, index) => (
                <div
                  key={`placeholder-${index}`}
                  className="w-[154px] h-0 invisible"
                ></div>
              ))}
            </div>
          ) : (
            <div className={`w-full grid ${colToShow} gap-y-6 gap-x-1 `}>
              {data &&
                data.map((item, index) => (
                  <ImageCard key={index} data={item} newPage={true} />
                ))}
            </div>
          )}
          {loading && (
            <CircularProgress
              size="sm"
              className="mx-auto mt-6"
              color="default"
              aria-label="Loading..."
            />
          )}
        </div>
      )}
      <div ref={lastElementRef} className="h-1" />
    </div>
  );
}
