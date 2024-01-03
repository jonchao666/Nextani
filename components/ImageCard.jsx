import { Card, CardFooter, CardBody, Image, Link } from "@nextui-org/react";
import { useState } from "react";

export default function ImageCard({ data, ep }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false); // 新增状态用于追踪图片加载是否失败
  const url =
    hasError ||
    data.apiData.images.webp.large_image_url.startsWith(
      "https://cdn.myanimelist.net/images/questionmark_23.gif"
    )
      ? "https://s4.anilist.co/file/anilistcdn/character/large/default.jpg"
      : data.apiData.images.webp.large_image_url;
  return (
    <div className=" w-[210px]">
      <Card
        as={Link}
        href={`/animeDetails/default?mal_id=${data.mal_id}`}
        className={`isPressable hover:opacity-100 rounded-lg shadow-none ${
          isLoaded ? "visible" : "invisible"
        }`}
      >
        <CardBody className="p-0 overflow-hidden">
          <Image
            isZoomed
            className="h-[302px] w-[210px] object-cover "
            loading="lazy"
            onLoad={() => setIsLoaded(true)}
            onError={() => setHasError(true)}
            radius="none"
            alt={data.apiData.title}
            src={url}
          />
          <div className="absolute z-10 bottom-0 left-0 right-0 h-10 bg-bottom-gradient"></div>
        </CardBody>

        {ep ? (
          <CardFooter className="absolute bottom-0 pb-0 z-10 justify-end pr-2">
            {data.apiData.broadcast.time && (
              <span className="text-white font-medium text-sm mb-1  ">
                update {data.apiData.broadcast.time}
              </span>
            )}
          </CardFooter>
        ) : (
          <CardFooter className="absolute bottom-0 pb-0 z-10 justify-end">
            {data.apiData.score && (
              <span className="text-white font-bold text-2xl italic">
                {data.apiData.score.toFixed(1)}
              </span>
            )}
          </CardFooter>
        )}
      </Card>

      <div>
        <span className="mt-2 line-clamp-2 text-sm font-medium">
          {/* matchedTitles is for the searchResult page */}
          {data.matchedTitles && data.matchedTitles[0].title
            ? data.matchedTitles[0].title
            : data.apiData.title}
        </span>
        <span className="text-xs mt-1.5 text-gray-600 ">
          {data.apiData.genres && data.apiData.genres.length > 0
            ? data.apiData.genres
                .slice(0, 2)
                .map((genre) => genre.name)
                .join("&")
            : "Anime"}{" "}
          {data.apiData.aired.prop.from.year && (
            <span className="text-2xl align-[-4px]"> &middot;</span>
          )}{" "}
          {data.apiData.aired.prop.from.year}
        </span>
      </div>
    </div>
  );
}
