import { Card, Image } from "@nextui-org/react";
import Link from "next/link";
import { useState } from "react";
export default function CharaterCard({ data }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false); // 新增状态用于追踪图片加载是否失败
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
        className={`isPressable hover:opacity-100 hover:scale-105 rounded-lg shadow-md flex flex-row justify-between bg-[rgb(255,255,255)] dark:bg-[rgb(24,24,27)]   ${
          isLoaded ? "visible" : "invisible"
        }`}
      >
        <Link
          href={`/character?mal_id=${data.character.mal_id}`}
          className="p-0 overflow-hidden shrink-0 "
        >
          <Image
            className="h-[81px] w-[60px]   object-cover "
            loading="lazy"
            onLoad={() => setIsLoaded(true)}
            onError={() => setHasError(true)}
            radius="none"
            alt={data.character.name}
            src={url}
          />
        </Link>
        <div className="flex flex-col justify-between text-xs  text-right p-2.5">
          <div>
            <Link href={`/character?mal_id=${data.character.mal_id}`}>
              <span className="text-sm">{data.character.name}</span>
            </Link>
            <div>
              <span className="text-[rgb(96,96,96)] dark:text-[rgb(170,170,170)] ">
                {data.role}
              </span>
            </div>
          </div>

          <div>
            <Link
              href={`/animeDetails/default?mal_id=${data.anime.mal_id}`}
              className="line-clamp-2 break-words  mt-1 text-xs"
            >
              {data.anime.title}
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}
