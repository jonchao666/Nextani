import WatchlistCard from "./WatchlistCard";
import { Button, Link } from "@nextui-org/react";
import { CircularProgress } from "@nextui-org/react";
import useUserActivity from "@/hooks/useUserActivity";
import { useEffect, useState } from "react";

export default function WatchLists({ colToShow }) {
  let numToShow = 2 * parseInt(colToShow.split("-")[2]);
  numToShow = numToShow > 14 ? 14 : numToShow;
  const { fetchWatchlists } = useUserActivity();

  const [watchlists, setWatchlists] = useState(null);
  const [isWatchlistsEmpty, setIsWatchlistsEmpty] = useState(false);

  useEffect(() => {
    async function fetchData() {
      let data = await fetchWatchlists();
      setWatchlists(data);

      setIsWatchlistsEmpty(data && data.length === 0);
    }
    fetchData();
  }, [fetchWatchlists]);

  return (
    <div className="border-b-1 py-6">
      <div className="flex justify-between items-center">
        <div className="flex">
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
            as={Link}
            href="/watchlists"
            variant="light"
            color="primary"
            radius="full"
            className="font-medium text-sm h-9"
          >
            See all
          </Button>
        )}
      </div>
      {isWatchlistsEmpty ? (
        <div className="text-sm text-gray-600 dark:text-[rgb(170,170,170)] mt-2">
          Watchlist you create or save will show up here.
        </div>
      ) : (
        <div className={`w-full grid ${colToShow} gap-y-6 gap-x-1 mt-4 `}>
          {watchlists ? (
            watchlists
              .slice(0, numToShow)
              .map((data, index) => (
                <WatchlistCard
                  key={index}
                  data={data}
                  index={index}
                  colToShow={colToShow}
                  setWatchlists={setWatchlists}
                />
              ))
          ) : (
            <CircularProgress size="sm" color="default" label="Loading..." />
          )}
        </div>
      )}
    </div>
  );
}
