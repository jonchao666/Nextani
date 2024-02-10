import ImageCard from "@/components/ImageCard";
import { Button, Link } from "@nextui-org/react";
import { CircularProgress } from "@nextui-org/react";
import useUserActivity from "@/hooks/useUserActivity";
import { useEffect, useState } from "react";

export default function FavoriteAnime({ colToShow }) {
  const { fetchLikedAnime } = useUserActivity();
  const numToShow = parseInt(colToShow.split("-")[2]);
  const [likedAnime, setLikedAnime] = useState(null);
  const [isLikedAnimeEmpty, setIsLikedAnimeEmpty] = useState(false);

  useEffect(() => {
    async function fetchData() {
      let data = await fetchLikedAnime();
      setLikedAnime(data);

      setIsLikedAnimeEmpty(data && data.length === 0);
    }
    fetchData();
  }, [fetchLikedAnime]);

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
            favorite
          </span>
          <h3 className="text-xl font-bold">Liked animes</h3>
        </div>
        {!isLikedAnimeEmpty && (
          <Button
            as={Link}
            href="/likedAnime"
            variant="light"
            color="primary"
            radius="full"
            className="font-medium text-sm h-9"
          >
            See all
          </Button>
        )}
      </div>
      {isLikedAnimeEmpty ? (
        <div className="text-sm text-gray-600 dark:text-[rgb(170,170,170)] mt-2">
          Use the favorite icon to like animes. Your list shows up right here.
        </div>
      ) : (
        <div className={`w-full grid ${colToShow} gap-y-6 gap-x-1 mt-4 `}>
          {likedAnime ? (
            likedAnime
              .slice(0, numToShow)
              .map((data, index) => (
                <ImageCard key={index} data={data} smallSize={true} />
              ))
          ) : (
            <CircularProgress size="sm" color="default" label="Loading..." />
          )}
        </div>
      )}
    </div>
  );
}
