import WatchlistCard from "./WatchlistCard";
import { Button, Link } from "@nextui-org/react";
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

  const { isXs } = useResponsive();

  useEffect(() => {
    async function fetchData() {
      let data = await fetchWatchlists();
      setWatchlists(data);

      setIsWatchlistsEmpty(data && data.length === 0);
    }
    fetchData();
  }, [fetchWatchlists]);

  return (
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
          <h3 className="text-xl font-bold">Watchlist</h3>
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
      ) : !watchlists ? (
        <CircularProgress size="sm" color="default" label="Loading..." />
      ) : isMobileDevice || !isXs ? (
        <div
          className={`mt-2.5 px-3 flex overflow-x-auto touch-pan gap-3 overflow-hidden ${
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
      )}
    </div>
  );
}
