import Layout from "@/components/Layout";
import { Button } from "@nextui-org/react";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { genres, types, years } from "@/constans/categoryData";
import ShowIndex from "@/components/ShowIndex";

export default function AnimeIndex() {
  const { theme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);
  const [selectedButtonSortby, setSelectedButtonSortby] = useState("Popular");
  const [selectedButtonGenres, setSelectedButtonGenres] =
    useState("All Genres");
  const [selectedButtonTypes, setSelectedButtonTypes] = useState("All Types");
  const [selectedButtonStatus, setSelectedButtonStatus] =
    useState("All Status");
  const [selectedButtonYear, setSelectedButtonYear] = useState("All Year");
  const [selectedButtonSeason, setSelectedButtonSeason] =
    useState("All Season");
  const [selectedButtonRated, setSelectedButtonRated] = useState("All Rated");

  const selectedButton = [
    selectedButtonSortby,
    selectedButtonGenres,
    selectedButtonTypes,
    selectedButtonStatus,
    selectedButtonYear,
    selectedButtonSeason,
    selectedButtonRated,
  ];
  const header = [
    "Sort by",
    "Genres",
    "Types",
    "Status",
    "Year",
    "Season",
    "Rated",
  ];
  const renderButton = (label, name, group) => (
    <Button
      key={name}
      isDisabled={header.includes(label) ? true : false}
      size="sm"
      disableAnimation
      color="primary"
      radius="sm"
      onClick={
        group === "Sort by"
          ? () => setSelectedButtonSortby(label)
          : group === "Genres"
          ? () => setSelectedButtonGenres(label)
          : group === "Types"
          ? () => setSelectedButtonTypes(label)
          : group === "Status"
          ? () => setSelectedButtonStatus(label)
          : group === "Year"
          ? () => setSelectedButtonYear(label)
          : group === "Rated"
          ? () => setSelectedButtonRated(label)
          : group === "Season"
          ? () => setSelectedButtonSeason(label)
          : null
      }
      variant={
        selectedButton.includes(label)
          ? theme === "light"
            ? "flat"
            : "solid"
          : theme === "light"
          ? "light"
          : "ghost"
      }
      className={
        selectedButton.includes(label)
          ? "border-none text-sm py-1 px-2 my-1 mr-4 min-w-0  "
          : "border-none text-sm py-1 px-2 my-1 mr-4 min-w-0 text-foreground opacity-100 justify-start"
      }
    >
      {name}
    </Button>
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Layout>
      <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 pb-6  w-full h-full border-b-1  dark:border-customGray">
        {renderButton("Genres", "Genres", "Genres")}
        <div>
          {renderButton("All Genres", "All", "Genres")}
          {genres.map((genre) => renderButton(genre, genre, "Genres"))}
        </div>

        {renderButton("Types", "Types", "Types")}
        <div>
          {renderButton("All Types", "All", "Types")}
          {types.map((type) => renderButton(type, type, "Types"))}
        </div>

        {renderButton("Status", "Status", "Status")}
        <div>
          {renderButton("All Status", "All", "Status")}
          {renderButton("Finished Airing", "Finished Airing", "Status")}
          {renderButton("Currently Airing", "Currently Airing", "Status")}
          {renderButton("Not yet aired", "Not yet aired", "Status")}
        </div>

        {renderButton("Year", "Year", "Year")}
        <div>
          {renderButton("All Year", "All", "Year")}
          {years.map((year) => renderButton(year, year, "Year"))}
        </div>

        {renderButton("Season", "Season", "Season")}
        <div>
          {renderButton("All Season", "All", "Season")}
          {renderButton("winter", "Winter", "Season")}
          {renderButton("spring", "Spring", "Season")}
          {renderButton("summer", "Summer", "Season")}
          {renderButton("fall", "Fall", "Season")}
        </div>
        {renderButton("Rated", "Rated", "Rated")}
        <div>
          {renderButton("All Rated", "All", "Rated")}
          {renderButton("G - All Ages", "G - All Ages", "Rated")}
          {renderButton("PG - Children", "PG - Children", "Rated")}
          {renderButton(
            "PG-13 - Teens 13 or older",
            "PG-13 - Teens 13 or older",
            "Rated"
          )}
          {renderButton(
            "R - 17+ (violence & profanity)",
            "R - 17+ (violence & profanity)",
            "Rated"
          )}
          {renderButton("R+ - Mild Nudity", "R+ - Mild Nudity", "Rated")}
          {renderButton("Rx - Hentai", "Rx - Hentai", "Rated")}
        </div>
        {renderButton("Sort by", "Sort by", "Sort by")}
        <div>
          {renderButton("Popular", "Popular", "Sort by")}
          {renderButton("Score", "Score", "Sort by")}
        </div>
      </div>
      <ShowIndex
        selectedButtonSortby={selectedButtonSortby}
        selectedButtonGenres={selectedButtonGenres}
        selectedButtonTypes={selectedButtonTypes}
        selectedButtonStatus={selectedButtonStatus}
        selectedButtonYear={selectedButtonYear}
        selectedButtonSeason={selectedButtonSeason}
        selectedButtonRated={selectedButtonRated}
      />
    </Layout>
  );
}
