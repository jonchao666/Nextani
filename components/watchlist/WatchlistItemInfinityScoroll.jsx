import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { CircularProgress } from "@nextui-org/react";
import useUserActivity from "@/hooks/useUserActivity";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Image, Link, Button } from "@nextui-org/react";

export default function WatchlistItemInfinityScoroll({
  selectedWatchlist,
  setSelectedWatchlist,
  name,
}) {
  const { fetchSelectedWatchlist, removeWatchlistItem } = useUserActivity();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [isMoreWatchlistItemsAvailable, setIsMoreWatchlistItemsAvailable] =
    useState(true);

  async function fetchData() {
    if (!name || loading || !isMoreWatchlistItemsAvailable) return;
    setLoading(true);
    let data = await fetchSelectedWatchlist(name, page);

    setIsMoreWatchlistItemsAvailable(data.items.length >= 14);

    setSelectedWatchlist((prev) => ({
      ...prev,
      items: [
        ...(prev?.items || []),
        ...data.items.filter(
          (newItem) =>
            !prev?.items?.some((prevItem) => prevItem.mal_id === newItem.mal_id)
        ),
      ],
    }));

    setPage((prev) => prev + 1);

    setLoading(false);
  }

  const handleDeleteWatchlistItem = (mal_id) => {
    removeWatchlistItem(name, mal_id);

    setSelectedWatchlist((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.mal_id !== mal_id),
    }));
  };

  const lastElementRef = useInfiniteScroll(fetchData);

  return (
    <div>
      <div className="mt-4 mb-6">
        {selectedWatchlist &&
          selectedWatchlist.items.map((data, index) => (
            <div
              key={data.mal_id}
              className="flex py-2 justify-between rounded-lg hover:bg-[rgba(0,0,0,0.05)] dark:hover:bg-[rgba(255,255,255,0.13)]"
            >
              <Link
                href={`/animeDetails/default?mal_id=${data.mal_id}`}
                className="hover:opacity-100 grow"
              >
                <div className="flex text-foreground">
                  <div className=" shrink-0 mr-4">
                    <Image
                      radius="sm"
                      className="object-cover h-[151px] w-[105px]"
                      alt={data.apiData.title}
                      src={
                        data.apiData.images.webp.large_image_url ===
                        "https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png"
                          ? "https://s4.anilist.co/file/anilistcdn/character/large/default.jpg"
                          : data.apiData.images.webp.large_image_url
                      }
                    ></Image>
                  </div>
                  <div className="shrink">
                    <p className="text-lg line-clamp-2">{data.apiData.title}</p>
                    <p className="text-sm  text-gray-600 dark:text-[rgb(170,170,170)]">
                      {data.apiData.genres && data.apiData.genres.length > 0
                        ? data.apiData.genres
                            .slice(0, 2)
                            .map((genre) => genre.name)
                            .join("&")
                        : data.apiData.type}{" "}
                      {data.apiData.aired.prop.from.year && (
                        <span className="text-2xl align-[-4px]"> &middot;</span>
                      )}{" "}
                      {data.apiData.aired.prop.from.year}
                    </p>
                    <p className="text-gray-600 dark:text-[rgb(170,170,170)] text-sm line-clamp-2">
                      {data.apiData.synopsis}
                    </p>
                  </div>
                </div>
              </Link>
              <Button
                isIconOnly
                radius="full"
                variant="light"
                onClick={() => handleDeleteWatchlistItem(data.mal_id)}
                startContent={
                  <span
                    className="material-symbols-outlined "
                    style={{
                      fontVariationSettings: `"FILL" 0, "wght" 250, "GRAD" 0, "opsz" 24`,
                    }}
                  >
                    close
                  </span>
                }
              ></Button>
            </div>
          ))}
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