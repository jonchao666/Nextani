import { Image, Link, Button } from "@nextui-org/react";
import { CircularProgress } from "@nextui-org/react";
import { useEffect, useState } from "react";
import useUserActivity from "@/hooks/useUserActivity";

export default function FavoritePerson({ colToShow }) {
  const numToShow = parseInt(colToShow.split("-")[2]);
  const { fetchLikedPerson } = useUserActivity();
  const [likedPerson, setLikedPerson] = useState(null);
  const [isLikedPersonEmpty, setIsLikedPersonEmpty] = useState(false);

  useEffect(() => {
    async function fetchData() {
      let data = await fetchLikedPerson();
      setLikedPerson(data);

      setIsLikedPersonEmpty(data && data.length === 0);
    }
    fetchData();
  }, [fetchLikedPerson]);

  return (
    <div className=" py-6 ">
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
          <h3 className="text-xl font-bold">Liked people</h3>
        </div>
        {!isLikedPersonEmpty && (
          <Button
            as={Link}
            href="/likedPeople"
            variant="light"
            color="primary"
            radius="full"
            className="font-medium text-sm h-9"
          >
            See all
          </Button>
        )}
      </div>
      {isLikedPersonEmpty ? (
        <div className="text-sm text-gray-600 dark:text-[rgb(170,170,170)] mt-2">
          Use the favorite icon to like people. Your list shows up right here.
        </div>
      ) : (
        <div className={`w-full grid ${colToShow} gap-y-6 gap-x-1 mt-4 `}>
          {likedPerson ? (
            likedPerson.slice(0, numToShow).map((data, index) => (
              <div key={index}>
                <Link
                  className="hover:opacity-100"
                  as={Link}
                  href={`/person?mal_id=${data.mal_id}`}
                >
                  <Image
                    isZoomed
                    radius="sm"
                    alt={data.apiData.name}
                    key={index}
                    src={
                      data.apiData.images.jpg.image_url ===
                      "https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png"
                        ? "https://s4.anilist.co/file/anilistcdn/character/large/default.jpg"
                        : data.apiData.images.jpg.image_url
                    }
                    className="object-cover h-[210px] w-[154px] "
                  ></Image>
                </Link>
                <Link
                  href={`/person?mal_id=${data.mal_id}`}
                  className="mt-2 line-clamp-2 text-sm font-medium text-foreground"
                >
                  {data.apiData.name}
                </Link>
              </div>
            ))
          ) : (
            <CircularProgress size="sm" color="default" label="Loading..." />
          )}
        </div>
      )}
    </div>
  );
}
