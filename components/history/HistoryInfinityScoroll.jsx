import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { CircularProgress } from "@nextui-org/react";
import useUserActivity from "@/hooks/useUserActivity";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Image, Link, Button } from "@nextui-org/react";

import { groupHistoryByDate } from "@/helpers/groupHistoryByDate";
import { useResponsive } from "../../hooks/useResponsive";
export default function HistoryInfinityScoroll({ history, setHistory }) {
  const { fetchHistory, removeHistory } = useUserActivity();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [isMoreHistoryAvailable, setIsMoreHistoryAvailable] = useState(true);
  const isMobileDevice = useSelector((state) => state.isMobile.isMobileDevice);
  const { isXs } = useResponsive();

  async function fetchData() {
    if (loading || !isMoreHistoryAvailable) return;
    setLoading(true);
    let data = await fetchHistory(page, 14);

    setIsMoreHistoryAvailable(data.length >= 14);

    setHistory((prev) => [...(prev ? prev : []), ...data]);

    setPage((prev) => prev + 1);

    setLoading(false);
  }

  const handleDeleteHistory = (mal_id) => {
    removeHistory(mal_id);

    setHistory((prev) => prev.filter((item) => item.mal_id !== mal_id));
  };

  const lastElementRef = useInfiniteScroll(fetchData);

  const groupedHistory = groupHistoryByDate(history);

  return (
    <div>
      <div className="pt-2 ">
        {Object.entries(groupedHistory).map(([date, items]) => (
          <div key={date}>
            <h3
              className={
                isMobileDevice || !isXs
                  ? "text-lg font-bold pt-1 pb-2.5"
                  : "text-xl font-bold pt-6 pb-4 "
              }
            >
              {date}
            </h3>{" "}
            {items.map((data, index) => (
              <div
                key={index}
                className={`flex justify-between rounded-lg hover:bg-[rgba(0,0,0,0.05)] dark:hover:bg-[rgba(255,255,255,0.13)] ${
                  isMobileDevice || !isXs ? "py-1.5" : "py-2"
                } `}
              >
                <Link
                  href={`/animeDetails/default?mal_id=${data.animeDetail.mal_id}`}
                  className="hover:opacity-100 grow"
                >
                  <div className="flex text-foreground">
                    <div className=" shrink-0 mr-4">
                      <Image
                        radius="sm"
                        className="object-cover h-[151px] w-[105px]"
                        alt={data.animeDetail.apiData.title}
                        src={
                          data.animeDetail.apiData.images.webp
                            .large_image_url ===
                          "https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png"
                            ? "https://s4.anilist.co/file/anilistcdn/character/large/default.jpg"
                            : data.animeDetail.apiData.images.webp
                                .large_image_url
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
                        {data.animeDetail.apiData.title}
                      </p>
                      <p
                        className={
                          isMobileDevice || !isXs
                            ? "text-xs  text-[rgb(96,96,96)] dark:text-[rgb(170,170,170)]"
                            : "text-sm  text-[rgb(96,96,96)] dark:text-[rgb(170,170,170)]"
                        }
                      >
                        {data.animeDetail.apiData.genres &&
                        data.animeDetail.apiData.genres.length > 0
                          ? data.animeDetail.apiData.genres
                              .slice(0, 2)
                              .map((genre) => genre.name)
                              .join("&")
                          : data.animeDetail.apiData.type}
                        {data.animeDetail.apiData.aired.prop.from.year &&
                          (isMobileDevice || !isXs ? <span> · </span> : null)}
                        <span
                          className={
                            isMobileDevice || !isXs
                              ? ""
                              : "before:content-['•'] before:mx-1"
                          }
                        >
                          {data.animeDetail.apiData.aired.prop.from.year}
                        </span>
                      </p>
                      <p
                        className={
                          isMobileDevice || !isXs
                            ? "text-[rgb(96,96,96)] dark:text-[rgb(170,170,170)] text-xs line-clamp-2 break-words"
                            : "text-[rgb(96,96,96)] dark:text-[rgb(170,170,170)] text-sm line-clamp-2 break-words"
                        }
                      >
                        {data.animeDetail.apiData.synopsis}
                      </p>
                    </div>
                  </div>
                </Link>
                <Button
                  isIconOnly
                  radius="full"
                  variant="light"
                  onClick={() => handleDeleteHistory(data.animeDetail.mal_id)}
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
