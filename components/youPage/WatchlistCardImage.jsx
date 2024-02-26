import { Image } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function WatchlistCardImage({ data, dominantColor }) {
  return (
    <div>
      <div className="absolute flex justify-center items-center z-30 left-0 top-0 opacity-0 hover:opacity-100 rounded-lg  h-[210px] w-[148px] bg-[rgba(0,0,0,0.8)]">
        <div className="text-white flex items-center">
          <span
            className="material-symbols-outlined "
            style={{
              fontVariationSettings: `"FILL" 1, "wght" 250, "GRAD" 0, "opsz" 24`,
            }}
          >
            play_arrow
          </span>
          <p className="text-xs font-medium">VIEW ALL</p>
        </div>
      </div>
      <Image
        radius="sm"
        alt={data.animeDetails[0] && data.animeDetails[0].apiData.title}
        src={
          data.animeDetails[0]
            ? data.animeDetails[0].apiData.images.webp.large_image_url
            : "https://s4.anilist.co/file/anilistcdn/character/large/default.jpg"
        }
        className="object-cover h-[210px] w-[148px]"
      />
      <div
        className={`absolute  z-20 right-0 bottom-0 mr-2 mb-2 rounded text-xs text-white flex justify-center items-center bg-[rgba(29,34,51,0.8)]`}
      >
        <span
          className="material-symbols-outlined mx-1 "
          style={{
            fontVariationSettings: `"FILL" 0, "wght" 250, "GRAD" 0, "opsz" 24`,
          }}
        >
          playlist_add
        </span>
        <p className="mr-1">
          {data.items.length > 1
            ? `${data.items.length} animes`
            : `${data.items.length} anime`}
        </p>
      </div>
      <div
        style={{ backgroundColor: dominantColor }}
        className={`absolute z-0 w-[148px] h-[194px] rounded-lg top-2 -right-1.5 `}
      ></div>
    </div>
  );
}
