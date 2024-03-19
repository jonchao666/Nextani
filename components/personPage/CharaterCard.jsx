import { Card, Image } from "@nextui-org/react";
import Link from "next/link";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useResponsive } from "@/hooks/useResponsive";

export default function CharaterCard({ data }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const { isXs } = useResponsive();
  const isMobileDevice = useSelector((state) => state.isMobile.isMobileDevice);

  const url =
    hasError ||
    data.character.images.jpg.image_url.startsWith(
      "https://cdn.myanimelist.net/images/questionmark_23.gif"
    )
      ? "https://s4.anilist.co/file/anilistcdn/character/large/default.jpg"
      : data.character.images.jpg.image_url;
  return (
    <div className=" min-w-[305px] ">
      <Card
        className={`isPressable hover:opacity-100 ${
          isMobileDevice || !isXs
            ? "bg-background shadow-none"
            : "hover:scale-105 bg-[rgb(255,255,255)] dark:bg-[rgb(24,24,27)]  shadow-md"
        } rounded-lg  flex flex-row justify-between    ${
          isLoaded ? "visible" : "invisible"
        }`}
      >
        <Link
          href={`/character?mal_id=${data.character.mal_id}`}
          className="p-0 overflow-hidden shrink-0 "
        >
          <Image
            className={
              isMobileDevice
                ? "w-[60px] h-[81px] object-cover shrink-0 rounded-md"
                : "w-[60px] h-[81px] object-cover shrink-0"
            }
            loading="lazy"
            onLoad={() => setIsLoaded(true)}
            onError={() => setHasError(true)}
            radius="none"
            alt={data.character.name}
            src={url}
          />
        </Link>
        <div className="flex  justify-start   grow">
          <div className="flex flex-col justify-between p-2.5 text-xs">
            <Link
              href={`/character?mal_id=${data.character.mal_id}`}
              className=" text-left "
            >
              {data.character.name}
            </Link>

            <div className="text-left line-clamp-2 break-words text-[rgb(96,96,96)] dark:text-[rgb(170,170,170)]">
              {data.anime.title}
            </div>
          </div>
        </div>
        <Link
          href={`/animeDetails/default?mal_id=${data.anime.mal_id}`}
          className="shrink-0"
        >
          <Image
            radius="none"
            className={
              isMobileDevice
                ? "w-[60px] h-[81px] object-cover shrink-0 rounded-md"
                : "w-[60px] h-[81px] object-cover shrink-0"
            }
            alt={data.anime.title}
            src={
              data.anime.images.jpg.image_url.startsWith(
                "https://cdn.myanimelist.net/images/questionmark_23.gif"
              )
                ? "https://s4.anilist.co/file/anilistcdn/character/large/default.jpg"
                : data.anime.images.jpg.image_url
            }
          ></Image>
        </Link>
      </Card>
    </div>
  );
}
