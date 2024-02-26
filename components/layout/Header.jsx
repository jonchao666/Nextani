import { useTheme } from "next-themes";
import { useState, useEffect, useRef } from "react";
import { SearchIcon, SignInIcon, GuideButtonIcon, Logo } from "@/icons";

import useSearch from "@/hooks/useSearch";
import { fetchUserData } from "@/reducers/userSlice";
import { fetchIsSensitiveFilterDisabled } from "@/reducers/sensitiveFilterSlice";

import { useRouter } from "next/router";
import AvatarDropdown from "./AvatarDropdown";
import { useSelector, useDispatch } from "react-redux";

import { useResponsive } from "@/hooks/useResponsive";
import {
  Input,
  Button,
  Link,
  Navbar,
  NavbarContent,
  NavbarItem,
  NavbarBrand,
} from "@nextui-org/react";

export default function Header({ width }) {
  const { isXs } = useResponsive();
  const { resolvedTheme } = useTheme();
  const router = useRouter();

  const [isMounted, setIsMounted] = useState(false);
  const { query, setQuery, results, isLoading } = useSearch();
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const blurTimeoutRef = useRef();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isMobileDevice = useSelector((state) => state.isMobile.isMobileDevice);
  const pageName = useSelector((state) => state.pageName.pageName);
  const [showInput, setShowInput] = useState(false);

  const handleFocus = () => {
    if (blurTimeoutRef.current) {
      clearTimeout(blurTimeoutRef.current);
    }
    setIsSearchFocused(true);
  };

  const handleBlur = () => {
    blurTimeoutRef.current = setTimeout(() => {
      setIsSearchFocused(false);
    }, 150); // 150ms delay
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      router.push(`/searchResult?debouncedQuery=${query}`);
    }
  };

  const handleSearchClick = () => {
    if (query) {
      router.push(`/searchResult?debouncedQuery=${query}`);
    }
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [searchRef]);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  localStorage.setItem("redirect", router.asPath);
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
        <div className="fixed top-12 left-0 h-screen w-screen bg-black bg-opacity-50"></div>
      )}
      {!showInput && (
        <div className="shrink">
          {pageName === "home" || (!isMobileDevice && isXs) ? (
            <Link
              href="/"
              className={`font-medium ${
                isMobileDevice || !isXs
                  ? "text-xl text-foreground ml-3"
                  : "text-2xl"
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
              <Link
                onClick={handleSearchClick}
                className="text-foreground cursor-pointer"
              >
                <SearchIcon size={18} />
              </Link>
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
              showResults &&
              isSearchFocused &&
              !isLoading &&
              results.length > 0 && (
                <div
                  className={` z-10 flex flex-col bg-background dark:bg-[rgb(40,40,40)] border dark:border-none left-0 ${
                    showInput
                      ? "top-12 fixed h-full"
                      : "top-14 absolute rounded-2xl"
                  } border-gray-300 py-4  shadow-lg  w-full `}
                >
                  {results.map((result, index) => (
                    <Link
                      href={`/animeDetails/default?mal_id=${result.mal_id}`}
                      key={index}
                      className="pl-4 pr-6 leading-8 hover:bg-gray-100 text-foreground font-medium"
                    >
                      <span
                        className="material-symbols-outlined mr-4"
                        style={{
                          fontVariationSettings:
                            "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 24",
                        }}
                      >
                        search
                      </span>
                      <p className={`line-clamp-1 ${showInput && "py-2.5"}`}>
                        {result.matchedTitles[0].title}{" "}
                      </p>
                    </Link>
                  ))}
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
            {isMobileDevice || !isXs ? null : isAuthenticated ? (
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
                variant={resolvedTheme === "light" ? "light" : "ghost"}
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
