import Layout from "@/components/layout/Layout";
import { useSelector } from "react-redux";
import LoginRequest from "@/components/auth/LoginRequest";
import WatchlistCard from "@/components/youPage/WatchlistCard";
import { useResponsive } from "@/hooks/useResponsive";
import { useEffect, useState } from "react";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { CircularProgress } from "@nextui-org/react";
import useUserActivity from "@/hooks/useUserActivity";

export default function Watchlists() {
  //get watchlists data
  const { fetchWatchlists } = useUserActivity();

  const [watchlists, setWatchlists] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [isMoreWatchlistsAvailable, setIsMoreWatchlistsAvailable] =
    useState(true);

  async function fetchData() {
    if (loading || !isMoreWatchlistsAvailable) return;
    setLoading(true);
    let data = await fetchWatchlists(page, 14);
    setIsMoreWatchlistsAvailable(data.length >= 14);
    setWatchlists((prev) => [...(prev ? prev : []), ...data]);
    setPage((prev) => prev + 1);
    setLoading(false);
  }

  //get column to show
  const { isXl, isLg, isMd, isSm, isXs } = useResponsive();
  const [colToShow, setColToShow] = useState("grid-cols-1");
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

  //show Login Request when is not Authenticated
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  if (!isAuthenticated) {
    return <LoginRequest />;
  }

  return (
    <Layout youPage={true}>
      <h2 className="text-4xl font-bold ">Watchlist</h2>
      {watchlists && watchlists.length === 0 ? (
        <div className="text-sm text-gray-600 dark:text-[rgb(170,170,170)] mt-2">
          Watchlist you create or save will show up here.
        </div>
      ) : (
        <div className="pt-2 mb-6">
          <div className={`w-full grid ${colToShow} gap-y-6 gap-x-1 mt-4 `}>
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
          className="mx-auto"
          color="default"
          aria-label="Loading..."
        />
      )}
      <div ref={lastElementRef} className="h-1" />
    </Layout>
  );
}
