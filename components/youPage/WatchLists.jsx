import WatchlistCard from "./WatchlistCard";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { CircularProgress } from "@nextui-org/react";
import useUserActivity from "@/hooks/useUserActivity";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useResponsive } from "@/hooks/useResponsive";

export default function WatchLists({ colToShow }) {
  let numToShow = 2 * parseInt(colToShow.split("-")[2]);
  numToShow = numToShow > 14 ? 14 : numToShow;
  const { fetchWatchlists } = useUserActivity();
  const isMobileDevice = useSelector((state) => state.isMobile.isMobileDevice);
  const [watchlists, setWatchlists] = useState(null);
  const [isWatchlistsEmpty, setIsWatchlistsEmpty] = useState(false);
  const [loading, setLoading] = useState(false);
  const { isXs } = useResponsive();

  useEffect(() => {
    async function fetchData() {
      let isLoadingData = true;
      //show loading after 700ms
      const delaySetLoading = async () => {
        await new Promise((resolve) => setTimeout(resolve, 700));
        if (isLoadingData) {
          setLoading(true);
        }
      };
      delaySetLoading();
      let data = await fetchWatchlists();

      isLoadingData = false;
      setLoading(false);

      setWatchlists(data);
      setIsWatchlistsEmpty(data && data.length === 0);
    }
    fetchData();
  }, [fetchWatchlists]);

  return (
    <div>
      {watchlists && (
        <div
          className={`border-b-1 dark:border-[rgba(255,255,255,0.2)] ${
            isMobileDevice || !isXs ? "pb-6 pt-3" : "py-5"
          }`}
        >
          <div
            className={`flex justify-between items-center ${
              isMobileDevice || !isXs ? "px-3" : ""
            }`}
          >
            <div className="flex items-center">
              <span
                className="material-symbols-outlined mr-4"
                style={{
                  fontVariationSettings: `"FILL" 0, "wght" 250, "GRAD" 0, "opsz" 24`,
                }}
              >
                playlist_add
              </span>
              <h3
                className={
                  isMobileDevice || !isXs
                    ? "text-lg font-bold"
                    : "text-xl font-bold"
                }
              >
                Watchlist
              </h3>
            </div>
            {!isWatchlistsEmpty && (
              <Button
                variant={isMobileDevice || !isXs ? "bordered" : "light"}
                radius="full"
                color={isMobileDevice || !isXs ? "default" : "primary"}
                size={isMobileDevice || !isXs ? "sm" : "md"}
                className={` hover:opacity-100  font-medium ${
                  isMobileDevice || !isXs ? "text-sm border-1" : "h-9"
                }`}
                href="/watchlists"
                as={Link}
              >
                View All
              </Button>
            )}
          </div>
          {isWatchlistsEmpty ? (
            <div
              className={`text-sm text-[rgb(96,96,96)] dark:text-[rgb(170,170,170)] mt-2 ${
                isMobileDevice || !isXs ? "px-3" : ""
              }`}
            >
              Watchlist you create or save will show up here.
            </div>
          ) : loading ? (
            <CircularProgress
              size="sm"
              color="default"
              aria-label="Loading..."
              className="mx-auto"
            />
          ) : watchlists ? (
            isMobileDevice || !isXs ? (
              <div
                className={`mt-2.5 px-3 flex overflow-x-auto touch-pan gap-3 ${
                  isMobileDevice ? "scrollbar-hide" : ""
                }`}
              >
                {watchlists.map((data, index) => (
                  <WatchlistCard
                    key={index}
                    data={data}
                    index={index}
                    colToShow={colToShow}
                    setWatchlists={setWatchlists}
                    NoneEdit={true}
                  />
                ))}
              </div>
            ) : (
              <div className={`w-full grid ${colToShow} gap-y-6 gap-x-1 mt-4 `}>
                {watchlists.slice(0, numToShow).map((data, index) => (
                  <WatchlistCard
                    key={index}
                    data={data}
                    index={index}
                    colToShow={colToShow}
                    setWatchlists={setWatchlists}
                  />
                ))}
              </div>
            )
          ) : null}
        </div>
      )}
    </div>
  );
}
