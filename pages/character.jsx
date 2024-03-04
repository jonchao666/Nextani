import Layout from "@/components/layout/Layout";
import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Image } from "@nextui-org/react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { useResponsive } from "@/hooks/useResponsive";
import { setPageName } from "@/reducers/pageNameSlice";
import { CircularProgress } from "@nextui-org/react";
import { calculatePlaceholdersForLastRow } from "@/helpers/getLastRowRequestForFlex";

export default function Character() {
  const router = useRouter();
  const { mal_id } = router.query;
  const dispatch = useDispatch();
  const isMobileDevice = useSelector((state) => state.isMobile.isMobileDevice);
  const [colToShow, setColToShow] = useState(1);
  const [placeholdersNeededAnime, setPlaceholdersNeededAnime] = useState(0);
  const [placeholdersNeededManga, setPlaceholdersNeededManga] = useState(0);
  const { isXl, isLg, isMd, isSm, isXs } = useResponsive();
  const [data, setData] = useState();
  const [aboutOpen, setAboutOpen] = useState(false);
  const [showToggleButton, setShowToggleButton] = useState(false);
  const [loading, setLoading] = useState(false);
  const textRef = useRef(null);

  useEffect(() => {
    if (textRef.current) {
      const lineCount = calculateLineCount();

      setShowToggleButton(lineCount >= 3);
    }
  }, [data]);

  const calculateLineCount = () => {
    const lineHeight = 20;
    const divHeight = textRef.current.clientHeight;
    return divHeight / lineHeight;
  };

  useEffect(() => {
    let isLoadingData = true;

    //show loading after 1s
    const delaySetLoading = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      if (isLoadingData) {
        setLoading(true);
      }
    };

    delaySetLoading();

    const fetchWithRetry = async (url, config, retries = 5) => {
      for (let i = 0; i < retries; i++) {
        try {
          const response = await axios.get(url, config);
          return response; // Success, return the response
        } catch (error) {
          if (i === retries - 1) throw error; // Last attempt failed, throw error
          await new Promise((resolve) => setTimeout(resolve, 1000 * 2 ** i)); // Wait before retrying
        }
      }
    };

    const fetchData = async () => {
      try {
        const response = await fetchWithRetry(
          `https://api.jikan.moe/v4/characters/${mal_id}/full`,
          {}
        );
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        isLoadingData = false;
        setLoading(false);
      }
    };

    if (mal_id) {
      fetchData();
    }
  }, [mal_id]);

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

  //get last Pseudo-element need when use flex-evenly
  useEffect(() => {
    if (typeof window !== "undefined") {
      let containerWidth = window.innerWidth;
      let itemWidth = 154;
      let itemsCountAnime =
        data && data.anime.length > 0 ? data.anime.length : 0;
      let itemsCountManga =
        data && data.manga.length > 0 ? data.manga.length : 0;
      setPlaceholdersNeededAnime(
        calculatePlaceholdersForLastRow(
          containerWidth,
          itemWidth,
          itemsCountAnime
        )
      );
      setPlaceholdersNeededManga(
        calculatePlaceholdersForLastRow(
          containerWidth,
          itemWidth,
          itemsCountManga
        )
      );
    }
  }, [data, placeholdersNeededAnime]);

  useEffect(() => {
    if (data && data.name) {
      dispatch(setPageName(data.name));
    } else {
      setPageName("home");
    }
  }, [dispatch, data]);
  return (
    <Layout youPage={true}>
      {loading && (
        <div className="fixed z-20 top-0 left-0 bg-background h-screen w-screen  ">
          <div className="h-5/6 flex justify-center items-center">
            <CircularProgress
              size="sm"
              color="primary"
              aria-label="Loading..."
            />
          </div>
        </div>
      )}
      {data && (
        <div>
          <div
            className={isMobileDevice || !isXs ? "px-3 flex" : "pb-6 pt-3 flex"}
          >
            <div
              className={`mr-6 shrink-0 ${
                isMobileDevice || !isXs ? "" : " hidden md:block"
              }`}
            >
              <Image
                radius="full"
                alt={data.name}
                src={
                  data.images.jpg.image_url ===
                  "https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png"
                    ? "https://s4.anilist.co/file/anilistcdn/character/large/default.jpg"
                    : data.images.jpg.image_url
                }
                className={`object-cover ${
                  isMobileDevice || !isXs ? "w-[72px] h-[72px]" : "w-40 h-40"
                }`}
              ></Image>
            </div>
            <div>
              <div
                className={isMobileDevice || !isXs ? "text-2xl" : "text-4xl"}
              >
                {data.name}
              </div>
              <div
                className={
                  isMobileDevice || !isXs ? "text-xs" : "text-sm pb-3 pt-1"
                }
              >
                {data.name_kanji}
              </div>
              {!isMobileDevice && isXs ? (
                <div>
                  <div
                    ref={textRef}
                    className={aboutOpen ? "text-sm" : "text-sm line-clamp-3"}
                  >
                    {data.about}
                  </div>
                  {showToggleButton && (
                    <div className="flex justify-end">
                      {!aboutOpen ? (
                        <span
                          onClick={() => setAboutOpen(true)}
                          className="font-medium text-sm cursor-pointer mt-2"
                        >
                          Show more
                        </span>
                      ) : (
                        <span
                          onClick={() => setAboutOpen(false)}
                          className="font-medium text-sm cursor-pointer mt-2"
                        >
                          Show less
                        </span>
                      )}
                    </div>
                  )}
                </div>
              ) : null}
            </div>
          </div>
          {isMobileDevice || !isXs ? (
            <div className="px-3 mt-2">
              <div
                ref={textRef}
                className={aboutOpen ? "text-sm" : "text-sm line-clamp-3"}
              >
                {data.about}
              </div>
              {showToggleButton && (
                <div className="flex justify-end">
                  {!aboutOpen ? (
                    <span
                      onClick={() => setAboutOpen(true)}
                      className="font-medium text-sm cursor-pointer mt-2"
                    >
                      Show more
                    </span>
                  ) : (
                    <span
                      onClick={() => setAboutOpen(false)}
                      className="font-medium text-sm cursor-pointer mt-2"
                    >
                      Show less
                    </span>
                  )}
                </div>
              )}
            </div>
          ) : null}
          <div>
            {data.anime.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3 px-3">Animeography</h3>
                {isMobileDevice || !isXs ? (
                  <div className="  flex  justify-evenly flex-wrap gap-y-6 ">
                    {data &&
                      data.anime.map((data, index) => (
                        <div key={index}>
                          <Link
                            href={`/animeDetails/default?mal_id=${data.anime.mal_id}`}
                          >
                            <Image
                              radius="sm"
                              alt={data.anime.title}
                              src={
                                data.anime.images.jpg.image_url ===
                                "https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png"
                                  ? "https://s4.anilist.co/file/anilistcdn/character/large/default.jpg"
                                  : data.anime.images.jpg.image_url
                              }
                              className="object-cover h-[210px] w-[154px] "
                            ></Image>
                          </Link>
                          <Link
                            href={`/animeDetails/default?mal_id=${data.anime.mal_id}`}
                          >
                            <p className="text-sm font-medium line-clamp-2 mt-2  w-[154px]">
                              {data.anime.title}
                            </p>
                          </Link>
                        </div>
                      ))}
                    {Array.from(
                      { length: placeholdersNeededAnime },
                      (_, index) => (
                        <div
                          key={`placeholder-${index}`}
                          className="w-[154px] h-0 invisible"
                        ></div>
                      )
                    )}
                  </div>
                ) : (
                  <div className={`w-full grid ${colToShow} gap-y-6 mb-6 mt-3`}>
                    {data &&
                      data.anime.map((data, index) => (
                        <div key={index}>
                          <Link
                            href={`/animeDetails/default?mal_id=${data.anime.mal_id}`}
                          >
                            <Image
                              radius="sm"
                              alt={data.anime.title}
                              src={
                                data.anime.images.jpg.image_url ===
                                "https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png"
                                  ? "https://s4.anilist.co/file/anilistcdn/character/large/default.jpg"
                                  : data.anime.images.jpg.image_url
                              }
                              className="object-cover h-[210px] w-[154px] "
                            ></Image>
                          </Link>
                          <Link
                            href={`/animeDetails/default?mal_id=${data.anime.mal_id}`}
                          >
                            <p className="text-sm font-medium line-clamp-2 mt-2 w-[154px]">
                              {data.anime.title}
                            </p>
                          </Link>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            )}

            {data.manga.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3 px-3">Mangaography</h3>
                {isMobileDevice || !isXs ? (
                  <div className="  flex  justify-evenly flex-wrap gap-y-6 ">
                    {data &&
                      data.manga.map((data, index) => (
                        <div key={index}>
                          <Image
                            radius="sm"
                            alt={data.manga.title}
                            src={
                              data.manga.images.jpg.image_url ===
                              "https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png"
                                ? "https://s4.anilist.co/file/anilistcdn/character/large/default.jpg"
                                : data.manga.images.jpg.image_url
                            }
                            className="object-cover h-[210px] w-[154px] "
                          ></Image>
                          <div>
                            <p className="text-sm font-medium line-clamp-2 mt-2 w-[154px]">
                              {data.manga.title}
                            </p>
                          </div>
                        </div>
                      ))}
                    {Array.from(
                      { length: placeholdersNeededManga },
                      (_, index) => (
                        <div
                          key={`placeholder-${index}`}
                          className="w-[154px] h-0 invisible"
                        ></div>
                      )
                    )}
                  </div>
                ) : (
                  <div className={`w-full grid ${colToShow} gap-y-6 mb-6 mt-3`}>
                    {data &&
                      data.manga.map((data, index) => (
                        <div key={index}>
                          <Image
                            radius="sm"
                            alt={data.manga.title}
                            src={
                              data.manga.images.jpg.image_url ===
                              "https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png"
                                ? "https://s4.anilist.co/file/anilistcdn/character/large/default.jpg"
                                : data.manga.images.jpg.image_url
                            }
                            className="object-cover h-[210px] w-[154px] "
                          ></Image>
                          <div>
                            <p className="text-sm font-medium line-clamp-2 mt-2 w-[154px]">
                              {data.manga.title}
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </Layout>
  );
}
