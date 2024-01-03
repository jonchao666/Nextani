import DetailsPanelButton from "./DetailsPanelButton";
import { Button } from "@nextui-org/react";
import { HeartIcon } from "@/icons";
import { useState, useEffect, useMemo } from "react";

export default function DetailsPanelTop({
  data,
  mainCharacters,
  videos,
  setVideoUrl,
}) {
  const PV = useMemo(() => {
    let tempPV = [];
    if (videos) {
      for (let v of videos) {
        tempPV.unshift(v);
      }
    }
    return tempPV;
  }, [videos]);
  const [selectedButtonIndex, setSelectedButtonIndex] = useState();

  useEffect(() => {
    setSelectedButtonIndex(PV.length - 1);
  }, [PV]);

  const handleButtonClick = (video, index) => {
    setVideoUrl(video.trailer.embed_url.replace("autoplay=1", "autoplay=0"));
    setSelectedButtonIndex(index);
  };
  return (
    <div className="w-full">
      <div className="flex justify-between">
        <div className="flex">
          <span className="mb-2.5 line-clamp-2 text-lg font-medium mr-4">
            {data.title}
          </span>
        </div>
        <div className="shrink-0">
          <Button
            size="sm"
            color="primary"
            variant="ghost"
            className="mr-2 border-1"
          >
            <span
              className="material-symbols-outlined "
              style={{
                fontVariationSettings:
                  "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 24",
              }}
            >
              playlist_add
            </span>
            Add to list
          </Button>
          <Button
            isIconOnly
            size="sm"
            color="danger"
            variant="ghost"
            className=" border-1"
          >
            <span
              className="material-symbols-outlined "
              style={{
                fontVariationSettings:
                  "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 24",
              }}
            >
              favorite
            </span>
          </Button>
        </div>
      </div>
      {PV.map((video, index) => (
        <Button
          size="sm"
          variant={selectedButtonIndex === index ? "solid" : "ghost"}
          color="primary"
          radius="sm"
          className="mr-2 border-1 mb-2 "
          key={index}
          onClick={() => handleButtonClick(video, index)}
        >
          {video.title}
        </Button>
      ))}
      <div className="text-sm text-[#61666d] mb-1.5">
        {data.genres && data.genres.length > 0
          ? data.genres.map((genre) => genre.name).join("/")
          : "Anime"}{" "}
        {data.aired.prop.from.year && <span> &middot;</span>}{" "}
        {data.aired.prop.from.year}
        <span> &middot;</span> {data.status}
      </div>
      <div className="text-sm mb-1.5 text-[#61666d]">
        {mainCharacters.length > 0 && <span>Voice actors: </span>}
        {mainCharacters.length > 0 &&
          mainCharacters.map(([characterName, actorName]) => (
            <span key={characterName} className="mr-2">
              {characterName}: {actorName}{" "}
            </span>
          ))}
      </div>
    </div>
  );
}
