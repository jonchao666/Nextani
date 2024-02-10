import Link from "next/link";
import useDominantColor from "@/hooks/useDominantColor";
import WatchlistCardImage from "./WatchlistCardImage";
import WatchlistCardInfo from "./WatchlistCardInfo";
import { useEffect, useState } from "react";

export default function WatchlistCard({
  data,
  setWatchlists,
  index,
  colToShow,
}) {
  //get majority color
  const defaultImageUrl = "#000000";
  const imageUrl =
    data && data.animeDetails[0]
      ? data.animeDetails[0].apiData.images.webp.large_image_url
      : defaultImageUrl;

  const col = colToShow && parseInt(colToShow.split("-")[2]);

  const [editShowLeft, setEditShowLeft] = useState(false);
  useEffect(() => {
    if (index % col >= col - 1) {
      setEditShowLeft(true);
    }
  }, [col, index]);

  return (
    <div>
      <Link href={`/watchlist?name=${data.name}`}>
        <div className="relative z-10 h-[210px] w-[148px]">
          <WatchlistCardImage
            data={data}
            dominantColor={useDominantColor(imageUrl)}
          />
        </div>
      </Link>
      <WatchlistCardInfo
        data={data}
        setWatchlists={setWatchlists}
        editShowLeft={editShowLeft}
      />
    </div>
  );
}
