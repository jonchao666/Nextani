import { Card, CardFooter, CardBody, Image } from "@nextui-org/react";
import Link from "next/link";
import { useEffect, useState } from "react";
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
    <div className=" w-[305px]">
      <Card
        className={`isPressable hover:opacity-100 rounded-sm shadow-none flex flex-row justify-between bg-[#edf1f5] dark:bg-background  dark:hover:bg-[rgba(255,255,255,0.13)] ${
          isLoaded ? "visible" : "invisible"
        }`}
      >
        <div className="p-0 overflow-hidden min-w-[80px] ">
          <Image
            isZoomed
            className="h-[118px]  w-full object-cover "
            loading="lazy"
            onLoad={() => setIsLoaded(true)}
            onError={() => setHasError(true)}
            radius="none"
            alt={data.character.name}
            src={url}
          />
        </div>
        <div className="flex flex-col justify-between text-xs  text-right p-2.5">
          <div>
            <div>
              <span className="text-sm">{data.character.name}</span>
            </div>
            <div>
              <span className="text-[#61666d] ">{data.role}</span>
            </div>
          </div>

          <div>
            <Link
              href={`/animeDetails/default?mal_id=${data.anime.mal_id}`}
              className="line-clamp-2  mt-1 text-xs"
            >
              {data.anime.title}
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}
