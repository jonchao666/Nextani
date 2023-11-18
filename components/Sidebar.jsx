import { Button, Link } from "@nextui-org/react";
import { SignInIcon } from "@/icons";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedButton } from "@/reducers/selectedButtonSlice";

export default function Sidebar() {
  const { theme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState("light"); // 设置默认主题

  useEffect(() => {
    setCurrentTheme(theme);
  }, [theme]);
  const selectedButton = useSelector((state) => state.selectedButton.value);
  const dispatch = useDispatch();
  const [showMore, setShowMore] = useState(false); // 新增状态

  const handleShowMoreClick = () => {
    setShowMore(!showMore);
  };

  const handleButtonClick = (buttonName) => {
    dispatch(setSelectedButton(buttonName));
  };
  const buttonsToShowMore = [
    "sci-fi",
    "drama",
    "romance",
    "slice of life",
    "supernatural",
    "mystery",
    "avant garde",
    "sports",
    "horror",
    "suspense",
    "gourmet",

    "adventure",
    "show less",
  ];
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
          variant={currentTheme === "light" ? "light" : "ghost"}
          className="justify-start border-none"
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
        disableAnimation
        onClick={() => handleButtonClick(name)}
        as={Link}
        variant={
          currentTheme === "light"
            ? selectedButton === name
              ? "flat"
              : "light"
            : selectedButton === name
            ? "solid"
            : "ghost"
        }
        className="justify-start border-none"
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
    <div className="fixed top-0 left-0 overflow-y-hidden hover:overflow-y-scroll h-[100vh] w-60">
      <div className="mt-16 flex flex-col w-full">
        <div className="border-b-1 flex flex-col p-3">
          {renderButton("home", "Home", "home")}
          {renderButton("subscriptions", "Watchlist", "watchlist")}
          {renderButton("favorite", "Likes", "likes")}
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
            variant={currentTheme === "light" ? "light" : "ghost"}
            color="primary"
            radius="full"
            href="#"
          >
            <span className="-ml-1">Sign in</span>
          </Button>
        </div>

        <div className="flex flex-col border-b-1 p-3">
          <span className="px-3 pt-1.5 pb-1 font-medium">Explore</span>
          <div className="flex flex-col">
            {renderButton("trending_up", "Popular", "popular")}
            {renderButton("schedule", "Upcoming", "upcoming")}
            {renderButton("leaderboard", "Top", "top")}
            {renderButton("emoji_events", "Award Winning", "award winning")}
            {renderButton("movie", "Movie", "movie")}
            {renderButton("library_music", "Music", "music")}
            {renderButton("sentiment_very_satisfied", "Comedy", "comedy")}
            {renderButton("auto_awesome", "Fantasy", "fantasy")}

            {renderButton("bolt", "Action", "action")}
            {renderButton("explore", "Adventure", "adventure")}
            {renderButton("expand_more", "Show more", "show more")}
            {renderButton("science", "Sci-Fi", "sci-fi")}
            {renderButton("theater_comedy", "Drama", "drama")}
            {renderButton("local_florist", "Romance", "romance")}
            {renderButton("emoji_people", "Slice of Life", "slice of life")}
            {renderButton("auto_fix_high", "Supernatural", "supernatural")}
            {renderButton("psychology", "Mystery", "mystery")}
            {renderButton("style", "Avant Garde", "avant garde")}
            {renderButton("sports_soccer", "Sports", "sports")}
            {renderButton("mood_bad", "Horror", "horror")}
            {renderButton("hourglass_empty", "Suspense", "suspense")}
            {renderButton("restaurant", "Gourmet", "gourmet")}

            {renderButton("expand_less", "Show less", "show less")}
          </div>
        </div>

        <div className="flex flex-col border-b-1 p-3">
          {renderButton("settings", "Settings", "settings")}
          {renderButton("feedback", "Send feedback", "feedback")}
        </div>

        <footer className="flex flex-col">
          <div className="pt-4 px-6 flex flex-wrap">
            <Link className="text-xs mr-2 font-medium text-gray-600 ">
              About
            </Link>
            <Link className="text-xs mr-2 font-medium text-gray-600">
              Copyright
            </Link>
            <Link className="text-xs mr-2 font-medium text-gray-600">
              Contact us
            </Link>
            <Link className="text-xs mr-2 font-medium text-gray-600">
              Terms
            </Link>
            <Link className="text-xs mr-2 font-medium text-gray-600">
              Privacy
            </Link>
          </div>
          <div className="text-xs py-4 px-6 text-[#909090]">© 2023 Nextani</div>
        </footer>
      </div>
    </div>
  );
}
