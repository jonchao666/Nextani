import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { CircularProgress } from "@nextui-org/react";
import useUserActivity from "@/hooks/useUserActivity";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Image, Button } from "@nextui-org/react";
import Link from "next/link";
import { useResponsive } from "@/hooks/useResponsive";

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
  const isMobileDevice = useSelector((state) => state.isMobile.isMobileDevice);
  const { isXs } = useResponsive();
  async function fetchData() {
    if (!name || loading || !isMoreWatchlistItemsAvailable) return;

    setLoading(true);

    let data = await fetchSelectedWatchlist(name, page);

    setLoading(false);

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
      <div className={isMobileDevice || !isXs ? "mb-6" : "mt-4 mb-6"}>
        {selectedWatchlist &&
          selectedWatchlist.items.map((data, index) => (
            <div
              key={data.mal_id}
              className={`flex justify-between rounded-lg  ${
                isMobileDevice || !isXs ? "py-1.5" : "py-2"
              }`}
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
                    <p
                      className={
                        isMobileDevice || !isXs
                          ? "text-sm line-clamp-2 break-words"
                          : "text-lg line-clamp-2 break-words"
                      }
                    >
                      {data.apiData.title}
                    </p>
                    <p
                      className={
                        isMobileDevice || !isXs
                          ? "text-[rgb(96,96,96)] dark:text-[rgb(170,170,170)] text-xs line-clamp-1 break-words"
                          : "text-[rgb(96,96,96)] dark:text-[rgb(170,170,170)] text-sm line-clamp-1 break-words"
                      }
                    >
                      {data.apiData.genres && data.apiData.genres.length > 0
                        ? data.apiData.genres
                            .slice(0, 2)
                            .map((genre) => genre.name)
                            .join("&")
                        : data.apiData.type}{" "}
                      {data.apiData.aired.prop.from.year &&
                        (isMobileDevice || !isXs ? <span> · </span> : null)}
                      <span
                        className={
                          isMobileDevice || !isXs
                            ? ""
                            : "before:content-['•'] before:mx-1"
                        }
                      >
                        {data.apiData.aired.prop.from.year}
                      </span>
                    </p>
                    <p
                      className={
                        isMobileDevice || !isXs
                          ? "text-[rgb(96,96,96)] dark:text-[rgb(170,170,170)] text-xs line-clamp-2 break-words"
                          : "text-[rgb(96,96,96)] dark:text-[rgb(170,170,170)] text-sm line-clamp-2 break-words"
                      }
                    >
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
          size="sm"
          className="mx-auto mt-6"
          color="default"
          aria-label="Loading..."
        />
      )}
      <div ref={lastElementRef} className="h-1" />
    </div>
  );
}
