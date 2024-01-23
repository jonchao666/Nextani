import { Image } from "@nextui-org/react";
import DetailsPanelTop from "./DetailsPanelTop";
import DetailsPanelBottomOpened from "./DetailsPanelBottomOpened";
import DetailsPanelBottomClosed from "./DetailsPanelBottomClosed";
import { Button } from "@nextui-org/react";
import { HeartIcon } from "@/icons";
import { useState } from "react";

export default function DetailsPanelContents({
  data,
  mainCharacters,
  synopsisWithoutLastParagraph,
  videos,
  setVideoUrl,
  mal_id,
}) {
  const [synopsisOpened, setSynopsisOpened] = useState(false);
  const [hasError, setHasError] = useState(false);
  const url =
    hasError ||
    data.images.webp.large_image_url.startsWith(
      "https://cdn.myanimelist.net/images/questionmark_23.gif"
    )
      ? "https://s4.anilist.co/file/anilistcdn/character/large/default.jpg"
      : data.images.webp.large_image_url;
  return (
    <div className="pt-5 flex w-full">
      <div className="w-[154px] shrink-0 mr-4 hidden sm:block">
        <div>
          <Image
            onError={() => setHasError(true)}
            className="object-cover w-[154px] h-[221px]"
            alt={data.title}
            src={url}
          ></Image>
        </div>
      </div>

      <div className="flex flex-col w-full">
        <DetailsPanelTop
          data={data}
          mainCharacters={mainCharacters}
          videos={videos}
          setVideoUrl={setVideoUrl}
          mal_id={mal_id}
        />
        {synopsisOpened ? (
          <DetailsPanelBottomOpened
            data={data}
            synopsisWithoutLastParagraph={synopsisWithoutLastParagraph}
            setSynopsisOpened={setSynopsisOpened}
          />
        ) : (
          <DetailsPanelBottomClosed
            data={data}
            synopsisWithoutLastParagraph={synopsisWithoutLastParagraph}
            setSynopsisOpened={setSynopsisOpened}
          />
        )}
      </div>
    </div>
  );
}
