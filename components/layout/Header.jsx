import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { SearchIcon, SignInIcon } from "@/icons";
import useSearch from "@/hooks/useSearch";
import { useRouter } from "next/router";
import AvatarDropdown from "./AvatarDropdown";
import { useSelector } from "react-redux";
import { useResponsive } from "@/hooks/useResponsive";
import useAuthStatus from "@/hooks/useAuthStatus";
import { CircularProgress } from "@nextui-org/react";
import {
  Input,
  Button,
  Navbar,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import Link from "next/link";

export default function Header({ width }) {
  const {
    setQuery,
    results,
    isLoading,
    searchStart,
    showResults,
    setShowResults,
    isSearchFocused,
    handleSearchClick,
    handleFocus,
    handleBlur,
    handleKeyDown,
    searchRef,
    query,
  } = useSearch();
  const { isXs } = useResponsive();
  const { resolvedTheme } = useTheme();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const { user, loading } = useAuthStatus();
  const isMobileDevice = useSelector((state) => state.isMobile.isMobileDevice);
  const pageName = useSelector((state) => state.pageName.pageName);
  const [showInput, setShowInput] = useState(false);

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [searchRef, setShowResults]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Navbar
      style={{ width: width }}
      isBlurred="false"
      className={`fixed z-30 mx-auto `}
      maxWidth="full"
      classNames={
        isMobileDevice || !isXs
          ? { wrapper: "px-0 h-12 gap-3" }
          : {
              wrapper: "px-0 h-14",
            }
      }
    >
      {showInput && (
        <div className="fixed top-12 left-0 h-dvh w-dvw bg-black bg-opacity-50"></div>
      )}
      {!showInput && (
        <div className="shrink">
          {pageName === "home" || (!isMobileDevice && isXs) ? (
            <Link
              href="/"
              className={`font-medium  ${
                isMobileDevice || !isXs
                  ? "text-xl  ml-3"
                  : "text-2xl text-primary"
              }`}
            >
              NextAni
            </Link>
          ) : (
            <p className="font-medium  line-clamp-1 break-all ml-3">
              {pageName}
            </p>
          )}
        </div>
      )}
      {(!showInput && isMobileDevice) || (!showInput && !isXs) ? null : (
        <NavbarContent className="relative w-full pl-3 gap-3" justify="center">
          {showInput && (
            <span
              onClick={() => setShowInput(false)}
              className="material-symbols-outlined"
              style={{
                fontVariationSettings:
                  "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 24",
              }}
            >
              arrow_back
            </span>
          )}

          <Input
            className={`max-w-[650px] ${!showInput && "mx-1 md:mx-10"}`}
            classNames={{
              base: "  ",
              mainWrapper: "h-full",

              input: "text-md ",
              inputWrapper:
                "h-full font-normal border-1  border-gray-300  dark:border-[rgba(255,255,255,0.2)]",
            }}
            placeholder="Type to search..."
            endContent={
              <div
                onClick={handleSearchClick}
                className="text-foreground cursor-pointer"
              >
                <SearchIcon size={18} />
              </div>
            }
            type="search"
            radius="full"
            variant={!showInput && "bordered"}
            color={showInput ? "default" : "primary"}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowResults(true);
            }}
            onKeyDown={handleKeyDown}
            startContent={
              query !== "" &&
              showResults &&
              (isMobileDevice || isSearchFocused) && (
                <div
                  className={` z-10 flex flex-col bg-background  dark:bg-[rgb(40,40,40)] border dark:border-none left-0 ${
                    showInput
                      ? "top-12 fixed h-full"
                      : "top-14 absolute rounded-2xl"
                  } border-gray-300 py-4  shadow-lg  w-full `}
                >
                  {isLoading ? (
                    <div className="text-center  font-medium ">
                      Please wait...
                    </div>
                  ) : results.length > 0 ? (
                    <div>
                      {results.map((result, index) => (
                        <Link
                          href={`/animeDetails/default?mal_id=${result.mal_id}`}
                          onClick={() => setShowInput(false)}
                          key={index}
                          className={
                            isMobileDevice
                              ? "flex items-center gap-4 px-3 leading-8 text-foreground font-medium"
                              : "flex items-center gap-4 px-3 leading-8 hover:bg-[rgba(0,0,0,0.05)] dark:hover:bg-[rgba(255,255,255,0.13)] text-foreground font-medium"
                          }
                        >
                          <span
                            className="material-symbols-outlined "
                            style={{
                              fontVariationSettings:
                                "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 24",
                            }}
                          >
                            search
                          </span>
                          <p className={`line-clamp-1 ${showInput && "py-2"}`}>
                            {result.matchedTitles[0].title}
                          </p>
                        </Link>
                      ))}
                    </div>
                  ) : !searchStart ? (
                    <div className="text-center  font-medium ">
                      No results found.
                    </div>
                  ) : null}
                </div>
              )
            }
          />
        </NavbarContent>
      )}

      <NavbarContent justify="end">
        {!showInput && (
          <NavbarItem className="items-center flex ">
            {isMobileDevice || !isXs ? null : (
              <Button
                as={Link}
                isIconOnly
                href="/animeIndex?category=Explore"
                color="foreground"
                startContent={
                  <span
                    className="material-symbols-outlined"
                    style={{
                      fontVariationSettings: `"FILL" 0, "wght" 250, "GRAD" 0, "opsz" 24`,
                    }}
                  >
                    explore
                  </span>
                }
                className="text-foreground cursor-pointer "
              ></Button>
            )}
            {isMobileDevice || !isXs ? null : (
              <Button
                as={Link}
                isIconOnly
                href="/you"
                color="foreground"
                startContent={
                  <span
                    className="material-symbols-outlined"
                    style={{
                      fontVariationSettings: `"FILL" 0, "wght" 250, "GRAD" 0, "opsz" 24`,
                    }}
                  >
                    video_library
                  </span>
                }
                className="text-foreground cursor-pointer "
              ></Button>
            )}
            {isMobileDevice || !isXs ? (
              <div
                className={`w-10 h-10 flex justify-center items-center ${
                  pageName !== "You" ? "mr-1" : ""
                }`}
                onClick={() => setShowInput(true)}
              >
                <SearchIcon size={18} />
              </div>
            ) : null}
            {isMobileDevice || !isXs || loading ? null : user ? (
              <div className="w-12 flex justify-center">
                <AvatarDropdown isMobileDevice={isMobileDevice} isXs={isXs} />
              </div>
            ) : (
              <Button
                as={Link}
                href="/login"
                startContent={<SignInIcon size={24} />}
                className=" text-sm font-medium pl-2 pr-3  border-1 dark:border-[rgba(255,255,255,0.2)] "
                size="sm"
                variant={
                  resolvedTheme === "light"
                    ? "light"
                    : isMobileDevice
                    ? "bordered"
                    : "ghost"
                }
                radius="full"
                color="primary"
              >
                <span className="-ml-1">Sign in</span>
              </Button>
            )}

            {pageName !== "You" || (!isMobileDevice && isXs) ? null : (
              <Button
                as={Link}
                isIconOnly
                href="/settings"
                color="foreground"
                startContent={
                  <span
                    className="material-symbols-outlined "
                    style={{
                      fontVariationSettings: `"FILL" 0, "wght" 250, "GRAD" 0, "opsz" 24`,
                    }}
                  >
                    settings
                  </span>
                }
                className="text-foreground cursor-pointer mr-1"
              ></Button>
            )}
          </NavbarItem>
        )}
      </NavbarContent>
    </Navbar>
  );
}
