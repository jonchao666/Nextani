import useUserActivity from "@/hooks/useUserActivity";
import useAnimeDataLocal from "@/hooks/useAnimeDataLocal";
import { useEffect } from "react";
import ImageCard from "@/components/ImageCard";
export default function IsAuthenticated() {
  const {
    // State variables
    likedAnime,
    likedPerson,
    history,
    watchlists,
    selectedWatchlist,

    // Functions
    fetchLikedAnime,
    addLikedAnime,
    removeLikedAnime,
    fetchLikedPerson,
    addLikedPerson,
    removelikedPerson,
    fetchHistory,
    addHistory,
    removeHistory,
    fetchwatchlist,
    createWatchlist,
    removeWatchlist,
    addWatchlistItem,
    removeWatchlistItem,
    renameWatchlist,
    updateWatchlistDescription,
  } = useUserActivity();

  const { data, fetchData } = useAnimeDataLocal();

  useEffect(() => {
    let mal_id = history.slice(0, 6).map((a) => a.mal_id);
    fetchData(mal_id);
  });
  return (
    <div>
      {data.map((data, index) => (
        <ImageCard key={index} data={data} />
      ))}

      <div>Watchlist</div>
      <div>Liked anime</div>
      <div>Liked person</div>
    </div>
  );
}
