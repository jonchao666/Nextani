import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { CircularProgress } from "@nextui-org/react";
import useUserActivity from "@/hooks/useUserActivity";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Image, Link, Button } from "@nextui-org/react";
import { useResponsive } from "../../hooks/useResponsive";
export default function LikedAnimeInfinityScoroll({
  likedPerson,
  setLikedPerson,
}) {
  const isMobileDevice = useSelector((state) => state.isMobile.isMobileDevice);
  const { isXs } = useResponsive();
  const { fetchLikedPerson, removeLikedPerson } = useUserActivity();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [isMoreLikedPersonAvailable, setIsMoreLikedPersonAvailable] =
    useState(true);

  async function fetchData() {
    if (loading || !isMoreLikedPersonAvailable) return;
    setLoading(true);
    let data = await fetchLikedPerson(page, 14);

    setIsMoreLikedPersonAvailable(data.length >= 14);

    setLikedPerson((prev) => [...(prev ? prev : []), ...data]);

    setPage((prev) => prev + 1);

    setLoading(false);
  }

  const handleDeleteLikedPerson = (mal_id) => {
    removeLikedPerson(mal_id);

    setLikedPerson((prev) => prev.filter((item) => item.mal_id !== mal_id));
  };

  const lastElementRef = useInfiniteScroll(fetchData);

  return (
    <div>
      <div className={isMobileDevice || !isXs ? "" : "mt-4 mb-6"}>
        {likedPerson &&
          likedPerson.map((data, index) => (
            <div
              key={data.mal_id}
              className={`flex justify-between rounded-lg hover:bg-[rgba(0,0,0,0.05)] dark:hover:bg-[rgba(255,255,255,0.13)] ${
                isMobileDevice || !isXs ? "py-1.5" : "py-2"
              }`}
            >
              <Link
                href={`/person?mal_id=${data.mal_id}`}
                className="hover:opacity-100"
              >
                <div className="flex  text-foreground">
                  <div className=" shrink-0 mr-4">
                    <Image
                      radius="sm"
                      className="object-cover h-[151px] w-[105px]"
                      alt={data.apiData.name}
                      src={
                        data.apiData.images.jpg.image_url ===
                        "https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png"
                          ? "https://s4.anilist.co/file/anilistcdn/character/large/default.jpg"
                          : data.apiData.images.jpg.image_url
                      }
                    ></Image>
                  </div>
                  <div className="shrink">
                    <p
                      className={
                        isMobileDevice || !isXs
                          ? "text-sm line-clamp-1 break-words"
                          : "text-lg line-clamp-1 break-words"
                      }
                    >
                      {data.apiData.name}
                    </p>
                    <p
                      className={
                        isMobileDevice || !isXs
                          ? "text-[rgb(96,96,96)] dark:text-[rgb(170,170,170)] text-xs line-clamp-1 break-words "
                          : "text-[rgb(96,96,96)] dark:text-[rgb(170,170,170)] text-sm line-clamp-1 break-words"
                      }
                    >
                      {data.apiData.family_name}
                      {data.apiData.given_name}
                      {data.apiData.given_name &&
                        data.apiData.family_name &&
                        (isMobileDevice || !isXs ? <span> · </span> : null)}

                      <span
                        className={
                          isMobileDevice || !isXs
                            ? ""
                            : "before:content-['•'] before:mx-1"
                        }
                      >
                        {data.apiData.favorites} favorites
                      </span>
                    </p>
                    <p
                      className={
                        isMobileDevice || !isXs
                          ? "text-[rgb(96,96,96)] dark:text-[rgb(170,170,170)] text-xs line-clamp-2 break-all "
                          : "text-[rgb(96,96,96)] dark:text-[rgb(170,170,170)] text-sm line-clamp-2 break-all"
                      }
                    >
                      {data.apiData.about}
                    </p>
                  </div>
                </div>
              </Link>
              <Button
                isIconOnly
                radius="full"
                variant="light"
                onClick={() => handleDeleteLikedPerson(data.mal_id)}
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
