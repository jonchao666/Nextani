import ImageCard from "@/components/layout/ImageCard";
import { Button } from "@nextui-org/react";
import { CircularProgress } from "@nextui-org/react";
import useUserActivity from "@/hooks/useUserActivity";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useResponsive } from "@/hooks/useResponsive";
import Link from "next/link";

export default function FavoriteAnime({ colToShow }) {
  const { fetchLikedAnime } = useUserActivity();
  const numToShow = parseInt(colToShow.split("-")[2]);
  const [likedAnime, setLikedAnime] = useState(null);
  const [isLikedAnimeEmpty, setIsLikedAnimeEmpty] = useState(false);
  const isMobileDevice = useSelector((state) => state.isMobile.isMobileDevice);
  const { isXs } = useResponsive();
  const [loading, setLoading] = useState(false);
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

      let data = await fetchLikedAnime();
      isLoadingData = false;
      setLoading(false);

      setLikedAnime(data);
      setIsLikedAnimeEmpty(data && data.length === 0);
    }
    fetchData();
  }, [fetchLikedAnime]);

  return (
    <div>
      {likedAnime && (
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
                favorite
              </span>
              <h3
                className={
                  isMobileDevice || !isXs
                    ? "text-lg font-bold"
                    : "text-xl font-bold"
                }
              >
                Favorite animes
              </h3>
            </div>
            {!isLikedAnimeEmpty && (
              <Button
                variant={isMobileDevice || !isXs ? "bordered" : "light"}
                radius="full"
                color={isMobileDevice || !isXs ? "default" : "primary"}
                size={isMobileDevice || !isXs ? "sm" : "md"}
                className={` hover:opacity-100  font-medium ${
                  isMobileDevice || !isXs ? "text-sm border-1" : "h-9"
                }`}
                href="/likedAnime"
                as={Link}
              >
                View All
              </Button>
            )}
          </div>
          {isLikedAnimeEmpty ? (
            <div
              className={`text-sm text-[rgb(96,96,96)] dark:text-[rgb(170,170,170)] mt-2 ${
                isMobileDevice || !isXs ? "px-3" : ""
              }`}
            >
              Use the favorite icon to save animes. Your list shows up right
              here.
            </div>
          ) : loading ? (
            <CircularProgress
              size="sm"
              color="default"
              aria-label="Loading..."
              className="mx-auto"
            />
          ) : likedAnime ? (
            isMobileDevice || !isXs ? (
              <div
                className={`mt-2.5 px-3 flex overflow-x-auto touch-pan gap-3 overflow-hidden ${
                  isMobileDevice ? "scrollbar-hide" : ""
                }`}
              >
                {likedAnime.map((data, index) => (
                  <ImageCard key={index} data={data} smallSize={true} />
                ))}
              </div>
            ) : (
              <div className={`w-full grid ${colToShow} gap-y-6 gap-x-1 mt-4 `}>
                {likedAnime.slice(0, numToShow).map((data, index) => (
                  <ImageCard key={index} data={data} smallSize={true} />
                ))}
              </div>
            )
          ) : null}
        </div>
      )}
    </div>
  );
}
