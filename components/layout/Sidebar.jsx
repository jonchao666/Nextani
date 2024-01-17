import { Button, Link } from "@nextui-org/react";
import { SignInIcon } from "@/icons";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { GuideButtonIcon } from "@/icons";
import { Navbar, NavbarBrand } from "@nextui-org/react";
import useAuth from "@/hooks/useAuth";
export default function Sidebar({ absolute, toggleSidebar }) {
  const { theme } = useTheme();

  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const [selectedButton, setSelectedButton] = useState("");
  const { category } = router.query;
  useEffect(() => {
    // 根据当前路由来设置 selectedButton
    switch (router.pathname) {
      case "/":
        setSelectedButton("home");
        break;
      case "/watchlist":
        setSelectedButton("watchlist");
        break;

      case "/favorites":
        setSelectedButton("favorites");
        break;
      case "/history":
        setSelectedButton("history");
        break;
    }

    switch (category) {
      case "Top":
        setSelectedButton("Top");
        break;
      case "Popular":
        setSelectedButton("Popular");
        break;
      case "Movie":
        setSelectedButton("Movie");
        break;
      case "Music":
        setSelectedButton("Music");
        break;
    }
  }, [router.pathname, category]);

  const handleButtonClick = (name) => {
    setSelectedButton(name);
  };
  const isAuthenticated = useAuth();
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const Explore = ["Popular", "Top", "Movie", "Music"];
  const renderButton = (iconName, label, name) => {
    return (
      <Button
        href={
          name === "home"
            ? "/"
            : Explore.includes(name)
            ? `/animeIndex?category=${name}`
            : undefined
        }
        disableAnimation
        onClick={() => handleButtonClick(name)}
        as={Link}
        variant={
          theme === "light"
            ? selectedButton === name
              ? "flat"
              : "light"
            : selectedButton === name
            ? "solid"
            : "ghost"
        }
        className={
          selectedButton === name
            ? "justify-start border-none font-medium hover:opacity-100"
            : "justify-start border-none hover:opacity-100"
        }
      >
        <span
          className={`material-symbols-outlined mr-4`}
          style={{
            fontVariationSettings:
              selectedButton === name && name === "history"
                ? `"FILL" 0, "wght" 400, "GRAD" 0, "opsz" 24`
                : selectedButton === name
                ? `"FILL" 1, "wght" 200, "GRAD" 0, "opsz" 24`
                : `"FILL" 0, "wght" 200, "GRAD" 0, "opsz" 24`,
          }}
        >
          {iconName}
        </span>
        {label}
      </Button>
    );
  };

  return (
    <div
      className={`fixed  top-0 left-0  h-[100vh] w-60 bg-background ${
        absolute && "z-50"
      }`}
    >
      <div className="h-16 w-full">
        {absolute && (
          <Navbar>
            <Button
              onClick={toggleSidebar}
              isIconOnly
              radius="full"
              variant="ghost"
              className="border-none -ml-2"
            >
              <GuideButtonIcon />
            </Button>

            <NavbarBrand href="/" as={Link}>
              <p className="font-bold text-2xl ">NEXTANI</p>
            </NavbarBrand>
          </Navbar>
        )}
      </div>
      <div className=" flex flex-col w-full h-full overscroll-none  hover:overflow-auto  justify-between">
        <div>
          <div className="border-b-1 flex flex-col p-3 ">
            {renderButton("home", "Home", "home")}
            {renderButton("subscriptions", "Watchlist", "watchlist")}
            {renderButton("favorite", "Favorites", "favorites")}
            {renderButton("history", "History", "history")}
          </div>

          {isAuthenticated ? null : (
            <div className="border-b-1 flex flex-col px-8 py-4 justify-start items-start">
              <span className="text-sm">
                Sign in to like Animes, comment, and add to watchlist.
              </span>
              <Button
                as={Link}
                href="/login"
                startContent={<SignInIcon size={24} />}
                className="text-sm font-medium pl-2 pr-3 border-1 dark:border-customGray mt-3"
                size="sm"
                variant={theme === "light" ? "light" : "ghost"}
                color="primary"
                radius="full"
              >
                <span className="-ml-1">Sign in</span>
              </Button>
            </div>
          )}

          <div className="flex flex-col  p-3">
            <span className="px-3 pt-1.5 pb-1 font-medium">Explore</span>
            <div className="flex flex-col">
              {renderButton("leaderboard", "Top", "Top")}
              {renderButton("trending_up", "Popular", "Popular")}

              {renderButton("movie", "Movie", "Movie")}
              {renderButton("library_music", "Music", "Music")}
            </div>
          </div>
        </div>
        <footer className="flex flex-col border-t-1">
          <div className="pt-4 px-6 flex flex-wrap">
            <Link
              href="/legalPages/About"
              className="text-xs mr-2 font-medium text-gray-600 "
            >
              About
            </Link>

            <Link
              href="/legalPages/ContactUs"
              className="text-xs mr-2 font-medium text-gray-600"
            >
              Contact us
            </Link>
            <Link
              href="/legalPages/TermsOfService"
              className="text-xs mr-2 font-medium text-gray-600"
            >
              Terms of Service
            </Link>
            <Link
              href="/legalPages/PrivacyPolicy"
              className="text-xs mr-2 font-medium text-gray-600"
            >
              Privacy Policy
            </Link>
          </div>
          <div className="text-xs py-4 px-6 text-[#909090]">© 2024 NextAni</div>
          <div className="h-16"></div>
        </footer>
      </div>
    </div>
  );
}
