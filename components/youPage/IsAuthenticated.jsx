import { useEffect, useState } from "react";
import { useResponsive } from "@/hooks/useResponsive";
import WatchLists from "./WatchLists";
import History from "./History";
import FavoriteAnime from "./FavoriteAnime";
import FavoritePerson from "./FavoritePerson";

export default function IsAuthenticated() {
  //get column to show
  const { isXl, isLg, isMd, isSm, isXs } = useResponsive();
  const [colToShow, setColToShow] = useState("grid-cols-1");
  useEffect(() => {
    const newColToshow = isXl
      ? " grid-cols-8"
      : isLg
      ? "grid-cols-7"
      : isMd
      ? " grid-cols-5"
      : isSm
      ? "grid-cols-4"
      : isXs
      ? "grid-cols-2"
      : "grid-cols-1";
    setColToShow(newColToshow);
  }, [isXl, isLg, isMd, isSm, isXs]);

  return (
    <div className="mb-6">
      <History colToShow={colToShow} />

      <WatchLists colToShow={colToShow} />

      <FavoriteAnime colToShow={colToShow} />

      <FavoritePerson colToShow={colToShow} />
    </div>
  );
}
