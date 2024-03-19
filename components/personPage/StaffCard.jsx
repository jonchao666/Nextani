import { Card, Image } from "@nextui-org/react";
import Link from "next/link";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useResponsive } from "@/hooks/useResponsive";
export default function StaffCard({ data }) {
  const isMobileDevice = useSelector((state) => state.isMobile.isMobileDevice);

  const { isXs } = useResponsive();
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false); // 新增状态用于追踪图片加载是否失败
  const url =
    hasError ||
    data.anime.images.jpg.image_url.startsWith(
      "https://cdn.myanimelist.net/images/questionmark_23.gif"
    )
      ? "https://s4.anilist.co/file/anilistcdn/character/large/default.jpg"
      : data.anime.images.jpg.image_url;

  return (
    <div className=" min-w-[305px]">
      <Card
        className={`isPressable hover:opacity-100 ${
          isMobileDevice || !isXs
            ? "bg-background shadow-none"
            : "hover:scale-105 bg-[rgb(255,255,255)] dark:bg-[rgb(24,24,27)]  shadow-md"
        } rounded-lg  flex flex-row     ${isLoaded ? "visible" : "invisible"}`}
      >
        <Link
          href={`/animeDetails/default?mal_id=${data.anime.mal_id}`}
          className="p-0 overflow-hidden shrink-0"
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
            alt={data.anime.title}
            src={url}
          />
        </Link>
        <div className="flex flex-col justify-between text-xs  text-left p-2.5">
          <div>
            <Link href={`/animeDetails/default?mal_id=${data.anime.mal_id}`}>
              <span className="line-clamp-2 break-words">
                {data.anime.title}
              </span>
            </Link>
          </div>

          <div>
            <div className="line-clamp-2 break-words text-[rgb(96,96,96)] dark:text-[rgb(170,170,170)]  text-xs">
              {data.position.startsWith("add")
                ? data.position.split(" ").slice(1).join(" ")
                : data.position}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
