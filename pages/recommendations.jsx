import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { CircularProgress } from "@nextui-org/react";
import ImageCard from "@/components/layout/ImageCard";
import { useState, useEffect } from "react";
import { useResponsive } from "@/hooks/useResponsive";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { calculatePlaceholdersForLastRow } from "@/utils/getLastRowRequestForFlex";
import Layout from "@/components/layout/Layout";
import { setPageName } from "@/reducers/pageNameSlice";

export default function Recommendations() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { mal_id } = router.query;
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

  useEffect(() => {
    dispatch(setPageName("Recommendations"));
  }, [dispatch]);

  const fetchData = async () => {
    if (loading || !hasMoreData || !mal_id) return;
    setLoading(true);
    const url = `${process.env.API_URL}/anime/recommendations`;
    let response = await axios.get(url, {
      params: { mal_id, isSensitiveFilterDisabled, page, limit: 36 },
      headers: {
        "X-API-Key": process.env.API_KEY,
      },
    });

    setData((prev) => [...prev, ...response.data]);
    setPage((prev) => prev + 1);
    setHasMoreData(response.data.length >= 36);
    setLoading(false);
  };

  useEffect(() => {
    setData([]);
    setPage(1);
    setHasMoreData(true);
  }, []);
  useEffect(() => {
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

  const lastElementRef = useInfiniteScroll(fetchData);

  return (
    <Layout>
      <div className={isMobileDevice || !isXs ? "mt-0 mb-6" : "mt-3 mb-6"}>
        {isMobileDevice || !isXs ? (
          <div className="flex  justify-evenly flex-wrap gap-y-6 ">
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
              data.map((item, index) => <ImageCard key={index} data={item} />)}
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
        <div ref={lastElementRef} className="h-1" />
      </div>
    </Layout>
  );
}
