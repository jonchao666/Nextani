import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { CircularProgress } from "@nextui-org/react";
import useUserActivity from "@/hooks/useUserActivity";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Image, Link, Button } from "@nextui-org/react";

import { groupHistoryByDate } from "@/helpers/groupHistoryByDate";

export default function HistoryInfinityScoroll({ history, setHistory }) {
  const { fetchHistory, removeHistory } = useUserActivity();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [isMoreHistoryAvailable, setIsMoreHistoryAvailable] = useState(true);

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
      <div className="pt-2 mb-6">
        {Object.entries(groupedHistory).map(([date, items]) => (
          <div key={date}>
            <h3 className="text-xl font-bold pt-6 pb-2">{date}</h3>{" "}
            {items.map((data, index) => (
              <div
                key={index}
                className="flex py-2 justify-between rounded-lg hover:bg-[rgba(0,0,0,0.05)] dark:hover:bg-[rgba(255,255,255,0.13)]"
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
                      <p className="text-lg line-clamp-2">
                        {data.animeDetail.apiData.title}
                      </p>
                      <p className="text-sm  text-gray-600 dark:text-[rgb(170,170,170)]">
                        {data.animeDetail.apiData.genres &&
                        data.animeDetail.apiData.genres.length > 0
                          ? data.animeDetail.apiData.genres
                              .slice(0, 2)
                              .map((genre) => genre.name)
                              .join("&")
                          : data.animeDetail.apiData.type}{" "}
                        {data.animeDetail.apiData.aired.prop.from.year && (
                          <span className="text-2xl align-[-4px]">
                            {" "}
                            &middot;
                          </span>
                        )}{" "}
                        {data.animeDetail.apiData.aired.prop.from.year}
                      </p>
                      <p className="text-gray-600 dark:text-[rgb(170,170,170)] text-sm line-clamp-2">
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
