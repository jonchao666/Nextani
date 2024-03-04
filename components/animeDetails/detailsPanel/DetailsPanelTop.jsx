import { Button, Link } from "@nextui-org/react";
import { useState, useEffect, useRef } from "react";
import useUserActivity from "@/hooks/useUserActivity";
import AddToListComponent from "./AddToListComponent";
import { useSelector } from "react-redux";
import { useResponsive } from "@/hooks/useResponsive";

export default function DetailsPanelTop({
  data,
  mainCharacters,
  setVideoUrl,
  mal_id,
  PV,
}) {
  const {
    addLikedAnime,
    checkIsAnimeLiked,
    removeLikedAnime,

    addHistory,

    fetchWatchlistsWithoutAnimeDetails,
    fetchWatchlistsContainingAnime,
  } = useUserActivity();
  const [watchlistsHasAnime, setWatchlistsHasAnime] = useState(null);
  const [isAnimeLiked, setIsAnimeLiked] = useState(false);
  const [addToListOpen, setAddToListOpen] = useState(false);
  const [loginReLike, setLoginReLike] = useState(false);
  const [loginReList, setLoginReList] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const tooltipRefList = useRef(null);
  const tooltipRefLike = useRef(null);
  const [watchlists, setWatchlists] = useState(null);
  const isMobileDevice = useSelector((state) => state.isMobile.isMobileDevice);

  const { isXs } = useResponsive();
  useEffect(() => {
    async function fetchData() {
      if (isAuthenticated) {
        let data = await fetchWatchlistsWithoutAnimeDetails();
        setWatchlists(data);
        let res = await fetchWatchlistsContainingAnime(mal_id);
        setWatchlistsHasAnime(res);
        addHistory(mal_id);
      }
    }
    fetchData();
  }, [
    fetchWatchlistsWithoutAnimeDetails,
    addHistory,
    fetchWatchlistsContainingAnime,
    mal_id,
    isAuthenticated,
  ]);

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

  const [selectedButtonIndex, setSelectedButtonIndex] = useState();

  useEffect(() => {
    PV && setSelectedButtonIndex(0);
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
            setWatchlists={setWatchlists}
            watchlists={watchlists}
            setAddToListOpen={setAddToListOpen}
            mal_id={mal_id}
            watchlistsHasAnime={watchlistsHasAnime}
            setWatchlistsHasAnime={setWatchlistsHasAnime}
          />
        </div>
      )}
      <div className="flex justify-between">
        <div className="flex">
          {data && (
            <p
              className={`mb-2.5 line-clamp-2 break-words ${
                isMobileDevice || !isXs ? "text-lg" : "text-xl"
              } font-bold mr-4`}
            >
              {data.title}
            </p>
          )}
        </div>
        <div className="shrink-0 flex">
          <div ref={tooltipRefList}>
            <Button
              onClick={() =>
                isAuthenticated ? setAddToListOpen(true) : setLoginReList(true)
              }
              size="sm"
              color="primary"
              variant={isMobileDevice ? "bordered" : "ghost"}
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
              Save to list
            </Button>
          </div>
          {loginReList && (
            <div className="fixed z-20 left-1/2 top-1/2 -translate-x-1/2 rounded-xl  -translate-y-1/2 whitespace-pre-line   bg-background dark:bg-[rgb(40,40,40)]   shadow-lg min-w-max  overflow-hidden">
              <p className="mt-6 mb-4 px-6">Want to see this again later?</p>
              <p className="mb-4 px-6">
                Sign in to save this anime to a watchlist.
              </p>
              <div className="flex justify-end">
                <Button
                  onClick={() => setLoginReList(false)}
                  radius="full"
                  variant="light"
                  className="my-2  "
                >
                  Cancel
                </Button>
                <Button
                  as={Link}
                  href="/login"
                  radius="full"
                  color="primary"
                  variant="light"
                  className="my-2 mr-1.5 "
                >
                  Sign in
                </Button>
              </div>
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
              variant={
                isAnimeLiked && isAuthenticated
                  ? "solid"
                  : isMobileDevice
                  ? "bordered"
                  : "ghost"
              }
              className={`${isAnimeLiked && isAuthenticated ? "" : "border-1"}`}
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
              <div className="fixed z-20 left-1/2 top-1/2 -translate-x-1/2 rounded-xl  -translate-y-1/2 whitespace-pre-line   bg-background dark:bg-[rgb(40,40,40)]  shadow-lg min-w-max overflow-hidden">
                <p className="mt-6 mb-4 px-6">Like this anime?</p>
                <p className="mb-8 px-6">
                  Sign in to save this anime to your favorite.
                </p>
                <div className="flex justify-end">
                  <Button
                    onClick={() => setLoginReLike(false)}
                    radius="full"
                    variant="light"
                    className="my-2  "
                  >
                    Cancel
                  </Button>
                  <Button
                    as={Link}
                    href="/login"
                    radius="full"
                    color="primary"
                    variant="light"
                    className="my-2 mr-1.5 "
                  >
                    Sign in
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {PV && (
        <div className="flex flex-wrap">
          {PV.map((video, index) => (
            <Button
              size="sm"
              variant={
                selectedButtonIndex === index
                  ? "solid"
                  : isMobileDevice
                  ? "bordered"
                  : "ghost"
              }
              color="primary"
              radius="sm"
              className={`mr-2  mb-2 shrink-0  ${
                selectedButtonIndex !== index && "border-1"
              }`}
              key={index}
              onClick={() => handleButtonClick(video, index)}
            >
              {video.title}
            </Button>
          ))}
        </div>
      )}
      <p className="text-sm text-[rgb(96,96,96)] dark:text-[rgb(170,170,170)]  mb-1.5 line-clamp-1">
        {data && data.genres && data.genres.length > 0
          ? data.genres.map((genre) => genre.name).join("/")
          : "Anime"}{" "}
        {data && data.aired.prop.from.year && <span> &middot;</span>}{" "}
        {data && data.aired.prop.from.year}
        <span> &middot;</span> {data && data.status}
      </p>
      <p className="text-sm mb-1.5 text-[rgb(96,96,96)] dark:text-[rgb(170,170,170)] line-clamp-2">
        <span>Voice actors: </span>
        {mainCharacters.length > 0
          ? mainCharacters.map(([characterName, actorName], index, arr) => (
              <span key={characterName} className="mr-2">
                {characterName}: {actorName} {index !== arr.length - 1 && "/"}
              </span>
            ))
          : "No voice actors have been added to this title."}
      </p>
    </div>
  );
}
