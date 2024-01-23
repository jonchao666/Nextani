import { useTheme } from "next-themes";
import { useState, useEffect, useRef } from "react";
import { SearchIcon, SignInIcon, GuideButtonIcon, Logo } from "@/icons";
import { Button, Link, Avatar } from "@nextui-org/react";
import { ThemeSwitcher } from "./ThemeSwitcher";
import useSearch from "@/hooks/useSearch";

import { useRouter } from "next/router";
import AvatarDropdown from "./AvatarDropdown";
import { useSelector, useDispatch } from "react-redux";
import { checkAuthState } from "@/reducers/authSlice";

import {
  Input,
  Navbar,
  NavbarContent,
  NavbarItem,
  NavbarBrand,
} from "@nextui-org/react";

export default function Header({ toggleSidebar, noMenu }) {
  const { resolvedTheme } = useTheme();
  const router = useRouter();
  const dispatch = useDispatch();
  const [isMounted, setIsMounted] = useState(false);
  const { query, setQuery, results, isLoading } = useSearch();
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const blurTimeoutRef = useRef();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

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
    } else {
      // 可以在这里添加代码来显示提示消息，例如使用一个 toast 提示
      // 或者什么也不做
    }
  };

  useEffect(() => {
    dispatch(checkAuthState());
  }, [dispatch]);

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
      isBlurred="false"
      className="fixed z-30"
      maxWidth="full"
      classNames={{
        wrapper: "px-6",
        item: ["bg-backgroundwhite ", "items-center"],
      }}
    >
      {!noMenu && (
        <Button
          onClick={toggleSidebar}
          isIconOnly
          radius="full"
          variant="ghost"
          className="border-none"
        >
          <GuideButtonIcon />
        </Button>
      )}

      <NavbarBrand href="/" as={Link}>
        <p className="font-bold text-2xl hidden sm:block text-foreground">
          NextAni
        </p>
      </NavbarBrand>
      <NavbarContent className="relative max-w-[650px] w-full" justify="center">
        <Input
          classNames={{
            base: " h-10 ",
            mainWrapper: "h-full",

            input: "text-small ",
            inputWrapper:
              "h-full font-normal  border-1 border-gray-300  dark:border-customGray",
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
          variant="bordered"
          color="primary"
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowResults(true);
          }}
          onKeyDown={handleKeyDown}
        />
        {showResults && isSearchFocused && (
          <div className="absolute z-10 flex flex-col bg-background  border left-0 top-14 border-gray-300 py-4 rounded-2xl shadow-lg min-w-max w-full ">
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
                {result.matchedTitles[0].title} {/* 或其他信息 */}
              </Link>
            ))}
          </div>
        )}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          {isAuthenticated ? (
            <AvatarDropdown />
          ) : (
            <Button
              as={Link}
              href="/login"
              startContent={<SignInIcon size={24} />}
              className=" text-sm font-medium pl-2 pr-3  border-1 dark:border-customGray "
              size="sm"
              variant={resolvedTheme === "light" ? "light" : "ghost"}
              radius="full"
              color="primary"
            >
              <span className="-ml-1">Sign in</span>
            </Button>
          )}
        </NavbarItem>
        <ThemeSwitcher />
      </NavbarContent>
    </Navbar>
  );
}
