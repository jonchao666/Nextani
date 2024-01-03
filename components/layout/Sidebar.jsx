import { Button, Link } from "@nextui-org/react";
import { SignInIcon } from "@/icons";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedButton } from "@/reducers/selectedButtonSlice";
import { GuideButtonIcon } from "@/icons";
import { Navbar, NavbarBrand } from "@nextui-org/react";

export default function Sidebar({ absolute, toggleSidebar }) {
  const { theme } = useTheme();

  const [isMounted, setIsMounted] = useState(false);
  const selectedButton = useSelector((state) => state.selectedButton.value);
  const dispatch = useDispatch();
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const handleShowMoreClick = () => {
    setShowMore(!showMore);
  };

  const handleButtonClick = (buttonName) => {
    dispatch(setSelectedButton(buttonName));
  };
  const buttonsToShowMore = ["show less"];
  const Explore = ["Popular", "Top", "Movie", "Music", "Award Winning"];
  const renderButton = (iconName, label, name) => {
    if (!showMore && buttonsToShowMore.includes(name)) {
      return null;
    }
    if (showMore && name === "show more") {
      return null;
    }
    if (name === "show more" || name === "show less") {
      return (
        <Button
          disableAnimation
          onClick={handleShowMoreClick}
          as={Link}
          variant={theme === "light" ? "light" : "ghost"}
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
    }

    return (
      <Button
        href={
          name === "home"
            ? "/"
            : name === "Category"
            ? "/animeIndex"
            : Explore.includes(name)
            ? `/category?category=${name}`
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

          <div className="border-b-1 flex flex-col px-8 py-4 justify-start items-start">
            <span className="text-sm">
              Sign in to like Animes, comment, and add to watchlist.
            </span>
            <Button
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

          <div className="flex flex-col  p-3">
            <span className="px-3 pt-1.5 pb-1 font-medium">Explore</span>
            <div className="flex flex-col">
              {renderButton("category", "Category", "Category")}
              {renderButton("trending_up", "Popular", "Popular")}
              {renderButton("leaderboard", "Top", "Top")}
              {renderButton("movie", "Movie", "Movie")}
              {renderButton("library_music", "Music", "Music")}
              {renderButton("emoji_events", "Award Winning", "Award Winning")}

              {/* {renderButton("expand_more", "Show more", "show more")}
            {renderButton("expand_less", "Show less", "show less")} */}
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
              href="/legalPages/Contact us"
              className="text-xs mr-2 font-medium text-gray-600"
            >
              Contact us
            </Link>
            <Link
              href="/legalPages/Terms of Service"
              className="text-xs mr-2 font-medium text-gray-600"
            >
              Terms of Service
            </Link>
            <Link
              href="/legalPages/Privacy Policy"
              className="text-xs mr-2 font-medium text-gray-600"
            >
              Privacy Policy
            </Link>
          </div>
          <div className="text-xs py-4 px-6 text-[#909090]">© 2023 Nextani</div>
          <div className="h-16"></div>
        </footer>
      </div>
    </div>
  );
}
