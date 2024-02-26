import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";

import axios from "axios";
import {
  Card,
  CardFooter,
  CardBody,
  Image,
  Link,
  Button,
} from "@nextui-org/react";
import { HeartIcon } from "@/icons";
import Layout from "@/components/layout/Layout";
import CardDisplay from "@/components/personPage/CardDisplay";
import { useSelector, useDispatch } from "react-redux";
import useUserActivity from "@/hooks/useUserActivity";
import { useResponsive } from "@/hooks/useResponsive";
import { setPageName } from "@/reducers/pageNameSlice";
export default function Person() {
  const router = useRouter();
  const { mal_id } = router.query;
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isMobileDevice = useSelector((state) => state.isMobile.isMobileDevice);
  const dispatch = useDispatch();
  const { isXs } = useResponsive();
  const [data, setData] = useState();
  const [visible, setVisible] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [loginReLike, setLoginReLike] = useState(false);
  const [isPersonLiked, setIsPersonLiked] = useState(false);
  const maxRetries = 3;
  const tooltipRef = useRef(null);

  const { addLikedPerson, removeLikedPerson, checkIsPersonLiked } =
    useUserActivity();

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useEffect(() => {
    async function fetchIsPersonLiked() {
      const response = await checkIsPersonLiked(mal_id);

      setIsPersonLiked(response.isLiked); // Access the isLiked property
    }
    if (isAuthenticated) fetchIsPersonLiked();
  }, [checkIsPersonLiked, mal_id, isAuthenticated]);

  const handleClickLikedButton = (mal_id) => {
    const newIsPersonLiked = !isPersonLiked;
    setIsPersonLiked(newIsPersonLiked);

    if (newIsPersonLiked) {
      addLikedPerson(mal_id);
    } else {
      removeLikedPerson(mal_id);
    }
  };

  const handleClickOutside = (event) => {
    if (tooltipRef.current && !tooltipRef.current.contains(event.target)) {
      setVisible(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.jikan.moe/v4/people/${mal_id}/full`
        );
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);

        if (retryCount < maxRetries) {
          setTimeout(
            setRetryCount((prevCount) => prevCount + 1),
            1200
          );
        }
      }
    };
    if (mal_id) {
      fetchData();
    }
  }, [mal_id, retryCount]);

  //add personal website url to about
  if (data && data.about && data.about.includes("Profile")) {
    const profileIndex = data.about.indexOf("Profile");
    const insertPoint = profileIndex + "Profile".length;

    const nextLineIndex =
      data.about.indexOf("\n", insertPoint) > -1
        ? data.about.indexOf("\n", insertPoint)
        : data.about.length;

    if (data.website_url) {
      data.about =
        data.about.substring(0, insertPoint) +
        ": " +
        data.website_url +
        data.about.substring(nextLineIndex);
    } else {
      data.about = data.about.substring(0, profileIndex);
    }
  }
  useEffect(() => {
    if (data && data.name) {
      dispatch(setPageName(data.name));
    } else {
      setPageName("home");
    }
  }, [dispatch, data]);
  return (
    <Layout>
      {data && (
        <div>
          {visible && (
            <div className="z-40  fixed inset-0 bg-[rgba(0,0,0,0.5)]"></div>
          )}
          <div className={isMobileDevice || !isXs ? "px-3" : ""}>
            <div className={isMobileDevice || !isXs ? "" : "pb-6 pt-3"}>
              <div className="flex ">
                <div
                  className={`mr-6 ${
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
                      isMobileDevice || !isXs
                        ? "w-[72px] h-[72px]"
                        : "w-40 h-40"
                    }`}
                  ></Image>
                </div>
                <div>
                  <div>
                    <div
                      className={
                        isMobileDevice || !isXs ? "text-2xl" : "text-4xl"
                      }
                    >
                      {data.name}
                    </div>
                    <div
                      className={
                        isMobileDevice || !isXs
                          ? "text-xs"
                          : "text-sm pb-3 pt-1"
                      }
                    >
                      {data.family_name}
                      {data.given_name}
                      {isMobileDevice || !isXs ? (
                        <span className="mx-1">‧</span>
                      ) : null}
                      <span
                        className={
                          isMobileDevice || !isXs
                            ? ""
                            : "before:content-['•'] before:mx-1"
                        }
                      >
                        {data.favorites} favorites
                      </span>
                      {data.about && (
                        <div ref={tooltipRef} className=" cursor-pointer">
                          <div
                            onClick={toggleVisibility}
                            className={
                              isMobileDevice || !isXs
                                ? "flex items-center"
                                : "my-1 flex items-center"
                            }
                          >
                            <span
                              className={
                                isMobileDevice || !isXs ? "text-xs" : "text-sm"
                              }
                            >
                              About
                            </span>

                            <span
                              className="material-symbols-outlined "
                              style={{
                                fontVariationSettings: `"FILL" 0, "wght" 250, "GRAD" 0, "opsz" 24`,
                              }}
                            >
                              navigate_next
                            </span>
                          </div>
                          {visible && (
                            <div
                              className="fixed  z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 p-5  rounded-xl shadow-lg
                          sm:max-w-[640px] w-full max-h-[450px] overflow-y-auto whitespace-pre-line bg-background dark:bg-[rgb(40,40,40)] "
                            >
                              <div className="mb-2.5 flex justify-between">
                                <p className="text-xl font-bold">About </p>
                                <span
                                  onClick={() => setVisible(false)}
                                  className="material-symbols-outlined cursor-pointer"
                                  style={{
                                    fontVariationSettings: `"FILL" 0, "wght" 250, "GRAD" 0, "opsz" 24`,
                                  }}
                                >
                                  close
                                </span>
                              </div>
                              <div className="text-sm">{data.about}</div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {isMobileDevice || !isXs ? null : (
                    <Button
                      onClick={() =>
                        isAuthenticated
                          ? handleClickLikedButton(mal_id)
                          : setLoginReLike(true)
                      }
                      size="sm"
                      color="danger"
                      variant={
                        isPersonLiked && isAuthenticated ? "solid" : "ghost"
                      }
                      className={` ${
                        isPersonLiked && isAuthenticated ? "" : "border-1"
                      }`}
                      startContent={
                        <span
                          className="material-symbols-outlined "
                          style={{
                            fontVariationSettings:
                              "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 24",
                          }}
                        >
                          favorite
                        </span>
                      }
                    >
                      Favorites
                    </Button>
                  )}
                  {loginReLike && (
                    <div className="absolute z-20 left-1/2 top-1/2 -translate-x-1/2 rounded-xl  -translate-y-1/2 whitespace-pre-line bg-white  dark:bg-[rgb(40,40,40)]  shadow-lg min-w-max overflow-hidden">
                      <p className="mt-6 mb-4 px-6">Like this person?</p>
                      <p className="mb-8 px-6">
                        Sign in to save this person to your favorite.
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
              <div className="flex flex-col mb-6 mt-3">
                {isMobileDevice || !isXs ? (
                  <Button
                    onClick={() =>
                      isAuthenticated
                        ? handleClickLikedButton(mal_id)
                        : setLoginReLike(true)
                    }
                    size="sm"
                    color="danger"
                    variant={
                      isPersonLiked && isAuthenticated ? "solid" : "bordered"
                    }
                    className={` ${
                      isPersonLiked && isAuthenticated ? "" : "border-1"
                    }`}
                    startContent={
                      <span
                        className="material-symbols-outlined "
                        style={{
                          fontVariationSettings:
                            "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 24",
                        }}
                      >
                        favorite
                      </span>
                    }
                  >
                    Favorites
                  </Button>
                ) : null}
              </div>
            </div>
            <CardDisplay data={data} />
          </div>
        </div>
      )}
    </Layout>
  );
}
