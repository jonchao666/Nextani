import { Card, CardFooter, CardBody, Image } from "@nextui-org/react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useResponsive } from "@/hooks/useResponsive";
import Link from "next/link";

export default function ImageCard({ data, ep, smallSize }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const { isXs } = useResponsive();
  const isMobileDevice = useSelector((state) => state.isMobile.isMobileDevice);
  const url =
    hasError ||
    data.apiData.images.webp.large_image_url.startsWith(
      "https://cdn.myanimelist.net/images/questionmark_23.gif"
    )
      ? "https://s4.anilist.co/file/anilistcdn/character/large/default.jpg"
      : data.apiData.images.webp.large_image_url;

  const height = smallSize ? "h-[221px] " : " h-[302px]";
  const width = smallSize ? " w-[154px]" : " w-[210px] ";

  return (
    <div className={`${width} shrink-0`}>
      <Card
        as={Link}
        shadow="none"
        radius="sm"
        href={`/animeDetails/default?mal_id=${data.mal_id}`}
        className={`isPressable hover:opacity-100 active:opacity-100 ${
          isLoaded ? "visible" : "invisible"
        }`}
      >
        <CardBody className="p-0 overflow-hidden ">
          <Image
            loading="lazy"
            isZoomed={!isMobileDevice}
            className={`${height} ${width} object-cover`}
            onLoad={() => setIsLoaded(true)}
            onError={() => setHasError(true)}
            radius="none"
            alt={data.apiData.title}
            src={url}
          />
        </CardBody>

        {ep ? (
          <CardFooter className="absolute bottom-0 pb-0 z-10 justify-end pr-2">
            {data.apiData.broadcast.time && (
              <p
                className={`text-white font-medium  mb-1 ${
                  isMobileDevice || !isXs ? "text-xs" : " text-sm"
                } `}
                style={{
                  textShadow:
                    "1px 1px hsla(0,0%,6.7%,.2), -1px 1px hsla(0,0%,6.7%,.2), -1px -1px hsla(0,0%,6.7%,.2), 1px -1px hsla(0,0%,6.7%,.2)",
                }}
              >
                update {data.apiData.broadcast.time}
              </p>
            )}
          </CardFooter>
        ) : (
          <CardFooter className="absolute bottom-0 pb-0 z-10 justify-end">
            {data.apiData.score && (
              <p
                className={`text-white shadow-2xl font-bold ${
                  isMobileDevice || !isXs ? "text-lg" : " text-2xl"
                } italic`}
                style={{
                  textShadow:
                    "1px 1px hsla(0,0%,6.7%,.2), -1px 1px hsla(0,0%,6.7%,.2), -1px -1px hsla(0,0%,6.7%,.2), 1px -1px hsla(0,0%,6.7%,.2)",
                }}
              >
                {data.apiData.score.toFixed(1)}
              </p>
            )}
          </CardFooter>
        )}
      </Card>

      <div>
        <Link href={`/animeDetails/default?mal_id=${data.mal_id}`}>
          <p
            className={`mt-2 text-sm  line-clamp-2 break-words ${width} ${
              isMobileDevice || !isXs
                ? " leading-[17.5px]"
                : "leading-[20px] font-medium"
            }  text-foreground`}
          >
            {/* matchedTitles is for the searchResult page */}
            {data.matchedTitles && data.matchedTitles[0].title
              ? data.matchedTitles[0].title
              : data.apiData.title}
          </p>
        </Link>
      </div>
    </div>
  );
}
