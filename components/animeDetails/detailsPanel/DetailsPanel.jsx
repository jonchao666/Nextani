import { Image } from "@nextui-org/react";
import DetailsPanelTop from "./DetailsPanelTop";
import DetailsPanelBottomOpened from "./DetailsPanelBottomOpened";
import DetailsPanelBottomClosed from "./DetailsPanelBottomClosed";
import { Button } from "@nextui-org/react";
import { HeartIcon } from "@/icons";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPageName } from "@/reducers/pageNameSlice";
import { useResponsive } from "@/hooks/useResponsive";
export default function DetailsPanelContents({
  data,
  mainCharacters,
  synopsisWithoutLastParagraph,
  videos,
  setVideoUrl,
  mal_id,
  PV,
}) {
  const dispatch = useDispatch();

  const { isXs } = useResponsive();
  const isMobileDevice = useSelector((state) => state.isMobile.isMobileDevice);
  const [synopsisOpened, setSynopsisOpened] = useState(false);
  const [hasError, setHasError] = useState(false);
  const url =
    hasError ||
    data.images.webp.large_image_url.startsWith(
      "https://cdn.myanimelist.net/images/questionmark_23.gif"
    )
      ? "https://s4.anilist.co/file/anilistcdn/character/large/default.jpg"
      : data.images.webp.large_image_url;

  useEffect(() => {
    dispatch(setPageName(data.title));
  }, [dispatch, data]);
  return (
    <div
      className={` flex w-full ${
        isMobileDevice || !isXs ? "px-3 pt-2.5" : "pt-5"
      }`}
    >
      <div className="w-[142px] shrink-0 mr-4 hidden sm:block">
        <div>
          <Image
            onError={() => setHasError(true)}
            className="object-cover w-[142px] h-[204px]"
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
          PV={PV}
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
