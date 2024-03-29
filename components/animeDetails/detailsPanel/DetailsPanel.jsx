import { Image } from "@nextui-org/react";
import DetailsPanelTop from "./DetailsPanelTop";
import DetailsPanelBottom from "./DetailsPanelBottom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useResponsive } from "@/hooks/useResponsive";

export default function DetailsPanelContents({
  data,
  mainCharacters,
  synopsisWithoutLastParagraph,
  videos,
  setVideoUrl,
  mal_id,
  isLoadingData,
  PV,
}) {
  const { isXs } = useResponsive();
  const isMobileDevice = useSelector((state) => state.isMobile.isMobileDevice);

  const [hasError, setHasError] = useState(false);
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (data) {
      setUrl(
        hasError ||
          data.images.webp.large_image_url.startsWith(
            "https://cdn.myanimelist.net/images/questionmark_23.gif"
          )
          ? "https://s4.anilist.co/file/anilistcdn/character/large/default.jpg"
          : data.images.webp.large_image_url
      );
    }
  }, [data, setUrl, hasError]);

  return (
    <div
      className={` flex w-full ${
        isMobileDevice || !isXs ? "px-3 pt-2.5" : "pt-5"
      }`}
    >
      {url && data && (
        <div className="w-[142px] shrink-0 mr-4 hidden sm:block">
          <Image
            onError={() => setHasError(true)}
            className="object-cover w-[142px] h-[204px]"
            alt={data.title}
            src={url}
          ></Image>
        </div>
      )}

      <div className="flex flex-col w-full">
        <DetailsPanelTop
          data={data}
          mainCharacters={mainCharacters}
          videos={videos}
          setVideoUrl={setVideoUrl}
          mal_id={mal_id}
          PV={PV}
        />

        {!isLoadingData && (
          <DetailsPanelBottom
            data={data}
            isLoadingData={isLoadingData}
            synopsisWithoutLastParagraph={synopsisWithoutLastParagraph}
          />
        )}
      </div>
    </div>
  );
}
