import Layout from "@/components/layout/Layout";
import ImageCard from "@/components/layout/ImageCard";
import axios from "axios";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { CircularProgress } from "@nextui-org/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useResponsive } from "../hooks/useResponsive";
import { calculatePlaceholdersForLastRow } from "@/helpers/getLastRowRequestForFlex";
import { useSelector, useDispatch } from "react-redux";
export default function SearchResult() {
  const router = useRouter();
  const { debouncedQuery } = router.query;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMoreData, setHasMoreData] = useState(true);
  const { isXl, isLg, isMd, isSm, isXs } = useResponsive();
  const [colToShow, setColToShow] = useState(1);
  const [placeholdersNeeded, setPlaceholdersNeeded] = useState(0);
  const isMobileDevice = useSelector((state) => state.isMobile.isMobileDevice);

  const fetchData = async () => {
    if (loading || !hasMoreData || !debouncedQuery) return;
    setLoading(true);
    let params = {};

    params.page = page;
    params.limit = 18;
    try {
      const responsePage1 = await axios.get(
        `${process.env.API_URL}/anime/search?query=${debouncedQuery}`,
        { params, headers: { "X-API-Key": process.env.API_KEY } }
      );

      const newAnimesPage1 = responsePage1.data.filter(
        (anime) =>
          !data.some((existingAnime) => existingAnime.mal_id === anime.mal_id)
      );

      setData((prevData) => [...prevData, ...newAnimesPage1]);
      setHasMoreData(responsePage1.data.length >= 18);

      if (hasMoreData) {
        params.page = page + 1;

        // 请求第二页数据
        const responsePage2 = await axios.get(
          `${process.env.API_URL}/anime/search?query=${debouncedQuery}`,
          { params, headers: { "X-API-Key": process.env.API_KEY } }
        );
        const newAnimesPage2 = responsePage2.data.filter(
          (anime) =>
            ![...data, ...newAnimesPage1].some(
              (existingAnime) => existingAnime.mal_id === anime.mal_id
            )
        );

        setData((prevData) => [...prevData, ...newAnimesPage2]);
        setHasMoreData(responsePage2.data.length >= 18);
        setPage((prev) => prev + 2);
      } else {
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Error fetching", error);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (debouncedQuery) {
      setData([]); // 重置数据
      setPage(1); // 重置页码
      setHasMoreData(true); // 重置是否有更多数据的标志
    }
  }, [debouncedQuery]);
  const lastElementRef = useInfiniteScroll(fetchData);

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

  return (
    <Layout smallSize>
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
        <div className={`w-full grid ${colToShow} gap-y-6 mb-6 mt-3`}>
          {data &&
            data.map((item, index) => <ImageCard key={index} data={item} />)}
        </div>
      )}
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
