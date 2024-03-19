import Layout from "@/components/layout/Layout";
import { useSelector, useDispatch } from "react-redux";
import LoginRequest from "@/components/auth/LoginRequest";
import WatchlistCard from "@/components/youPage/WatchlistCard";
import { useResponsive } from "@/hooks/useResponsive";
import { useEffect, useState } from "react";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { CircularProgress } from "@nextui-org/react";
import useUserActivity from "@/hooks/useUserActivity";
import { setPageName } from "@/reducers/pageNameSlice";
import { calculatePlaceholdersForLastRow } from "@/utils/getLastRowRequestForFlex";
import useAuthStatus from "@/hooks/useAuthStatus";

export default function Watchlists() {
  const { isXl, isLg, isMd, isSm, isXs } = useResponsive();
  const isMobileDevice = useSelector((state) => state.isMobile.isMobileDevice);

  const [colToShow, setColToShow] = useState("grid-cols-1");
  const { fetchWatchlists } = useUserActivity();
  const [watchlists, setWatchlists] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [placeholdersNeeded, setPlaceholdersNeeded] = useState(0);
  const [isMoreWatchlistsAvailable, setIsMoreWatchlistsAvailable] =
    useState(true);
  const { user } = useAuthStatus();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPageName("Watchlists"));
  }, [dispatch]);

  //get watchlists data
  async function fetchData() {
    if (loading || !isMoreWatchlistsAvailable) return;
    setLoading(true);
    let data = await fetchWatchlists(page, 14);
    setLoading(false);
    setIsMoreWatchlistsAvailable(data.length >= 14);
    setWatchlists((prev) => [...(prev ? prev : []), ...data]);
    setPage((prev) => prev + 1);
  }

  //get column to show

  useEffect(() => {
    const newColToshow = isXl
      ? " grid-cols-8"
      : isLg
      ? "grid-cols-7"
      : isMd
      ? " grid-cols-5"
      : isSm
      ? "grid-cols-4"
      : isXs
      ? "grid-cols-2"
      : "grid-cols-1";
    setColToShow(newColToshow);
  }, [isXl, isLg, isMd, isSm, isXs]);

  const lastElementRef = useInfiniteScroll(fetchData);

  //get last Pseudo-element need when use flex-evenly
  useEffect(() => {
    if (typeof window !== "undefined") {
      let containerWidth = window.innerWidth;
      let itemWidth = 154;
      let itemsCount = watchlists ? watchlists.length : 0;
      setPlaceholdersNeeded(
        calculatePlaceholdersForLastRow(containerWidth, itemWidth, itemsCount)
      );
    }
  }, [watchlists, placeholdersNeeded]);

  //show Login Request when is not Authenticated
  if (!user) {
    return <LoginRequest />;
  }

  return (
    <Layout youPage={true}>
      {isMobileDevice || !isXs ? null : (
        <h2
          className={
            isMobileDevice || !isXs
              ? "text-3xl font-bold pl- pt-6"
              : "text-4xl font-bold pt-6"
          }
        >
          Watchlists
        </h2>
      )}
      {watchlists && watchlists.length === 0 ? (
        <div className="text-sm text-[rgb(96,96,96)] dark:text-[rgb(170,170,170)] mt-2 px-3">
          Watchlist you create or save will show up here.
        </div>
      ) : isMobileDevice || !isXs ? (
        <div className="  flex flex-wrap justify-evenly pb-6 mb-6 gap-y-6 after:content-[''] after:w-[154px]">
          {watchlists &&
            watchlists.map((data, index) => (
              <WatchlistCard
                key={index}
                data={data}
                setWatchlists={setWatchlists}
              />
            ))}
          {Array.from({ length: placeholdersNeeded }, (_, index) => (
            <div
              key={`placeholder-${index}`}
              className="w-[154px] h-0 invisible"
            ></div>
          ))}
        </div>
      ) : (
        <div className=" my-6">
          <div className={`w-full grid ${colToShow} gap-y-6 gap-x-1  `}>
            {watchlists &&
              watchlists.map((data, index) => (
                <WatchlistCard
                  key={index}
                  data={data}
                  setWatchlists={setWatchlists}
                />
              ))}
          </div>
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
    </Layout>
  );
}
