import DetailsPanelButton from "./DetailsPanelButton";
import { Button, Link } from "@nextui-org/react";
import { SearchIcon, SignInIcon, GuideButtonIcon, Logo } from "@/icons";
import { useState, useEffect, useMemo, useRef } from "react";
import useUserActivity from "@/hooks/useUserActivity";
import AddToListComponent from "./AddToListComponent";
import { useSelector, useDispatch } from "react-redux";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
export default function DetailsPanelTop({
  data,
  mainCharacters,
  videos,
  setVideoUrl,
  mal_id,
}) {
  const {
    watchlists,
    watchlistsHasAnime,

    addLikedAnime,
    checkIsAnimeLiked,
    removeLikedAnime,
    fetchLikedAnime,

    fetchLikedPerson,
    addLikedPerson,
    removelikedPerson,
    fetchHistory,
    addHistory,
    removeHistory,
    fetSelectedWatchlist,
    fetchwatchlists,
    fetchWatchlistsContainingAnime,
    createWatchlist,

    removeWatchlist,

    addWatchlistItem,
    removeWatchlistItem,
    renameWatchlist,
    updateWatchlistDescription,
  } = useUserActivity();
  const [isAnimeLiked, setIsAnimeLiked] = useState(false);
  const [addToListOpen, setAddToListOpen] = useState(false);
  const [loginReLike, setLoginReLike] = useState(false);
  const [loginReList, setLoginReList] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const tooltipRefList = useRef(null);
  const tooltipRefLike = useRef(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    fetchwatchlists(1, 0);
    fetchWatchlistsContainingAnime(mal_id);
  }, [fetchwatchlists, fetchWatchlistsContainingAnime, mal_id]);

  useEffect(() => {
    async function fetchIsAnimeLiked() {
      const response = await checkIsAnimeLiked(mal_id);

      setIsAnimeLiked(response.isLiked); // Access the isLiked property
    }
    if (isAuthenticated) fetchIsAnimeLiked();
  }, [checkIsAnimeLiked, mal_id, isAuthenticated]);

  const handleClickLikedButton = (mal_id) => {
    const newIsAnimeLiked = !isAnimeLiked;
    setIsAnimeLiked(newIsAnimeLiked);

    if (newIsAnimeLiked) {
      addLikedAnime(mal_id);
    } else {
      removeLikedAnime(mal_id);
    }
  };

  //close login request when ClickOutside
  const handleClickOutsideList = (event) => {
    if (
      tooltipRefList.current &&
      !tooltipRefList.current.contains(event.target)
    ) {
      setLoginReList(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideList);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideList);
    };
  }, []);
  //close login request when ClickOutside
  const handleClickOutsideLike = (event) => {
    if (
      tooltipRefLike.current &&
      !tooltipRefLike.current.contains(event.target)
    ) {
      setLoginReLike(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideLike);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideLike);
    };
  }, []);

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
      {addToListOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40">
          <AddToListComponent
            setAddToListOpen={setAddToListOpen}
            createWatchlist={createWatchlist}
            watchlists={watchlists}
            fetchwatchlists={fetchwatchlists}
            mal_id={mal_id}
            addWatchlistItem={addWatchlistItem}
            removeWatchlistItem={removeWatchlistItem}
            fetchWatchlistsContainingAnime={fetchWatchlistsContainingAnime}
            watchlistsHasAnime={watchlistsHasAnime}
          />
        </div>
      )}
      <div className="flex justify-between">
        <div className="flex">
          <span className="mb-2.5 line-clamp-2 text-lg font-medium mr-4">
            {data.title}
          </span>
        </div>
        <div className="shrink-0 flex">
          <div ref={tooltipRefList}>
            <Button
              onClick={() =>
                isAuthenticated ? setAddToListOpen(true) : setLoginReList(true)
              }
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
          </div>
          {loginReList && (
            <div className="absolute z-20 left-1/2 top-1/2 -translate-x-1/2 rounded-xl  -translate-y-1/2 whitespace-pre-line   bg-background   shadow-lg w-[387px] overflow-hidden">
              <p className="mt-6 mb-4 px-6">Want to see this again later?</p>
              <p className="mb-8 px-6">Sign in to add this anime to a list.</p>
              <Button
                as={Link}
                href="/login"
                radius="full"
                color="primary"
                variant="light"
                className="my-2 ml-1.5 "
              >
                Sign in
              </Button>
            </div>
          )}
          <div ref={tooltipRefLike}>
            <Button
              onClick={() =>
                isAuthenticated
                  ? handleClickLikedButton(mal_id)
                  : setLoginReLike(true)
              }
              isIconOnly
              size="sm"
              color="danger"
              variant={isAnimeLiked && isAuthenticated ? "solid" : "ghost"}
              className=" border-1 "
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
            {loginReLike && (
              <div className="absolute z-20 left-1/2 top-1/2 -translate-x-1/2 rounded-xl  -translate-y-1/2 whitespace-pre-line   bg-background   shadow-lg w-[387px] overflow-hidden">
                <p className="mt-6 mb-4 px-6">Like this anime?</p>
                <p className="mb-8 px-6">
                  Sign in to add this anime to your favorite.
                </p>
                <Button
                  as={Link}
                  href="/login"
                  radius="full"
                  color="primary"
                  variant="light"
                  className="my-2 ml-1.5 "
                >
                  Sign in
                </Button>
              </div>
            )}
          </div>
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
        <span>Voice actors: </span>
        {mainCharacters.length > 0
          ? mainCharacters.map(([characterName, actorName]) => (
              <span key={characterName} className="mr-2">
                {characterName}: {actorName}{" "}
              </span>
            ))
          : "No voice actors have been added to this title."}
      </div>
    </div>
  );
}
