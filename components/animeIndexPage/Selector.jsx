import { Button, Select, SelectItem } from "@nextui-org/react";
import { Genres, Types, Years, CategoryTitles } from "@/constans/categoryData";
export default function Selector({
  selectedButtonSortby,
  selectedButtonGenres,
  selectedButtonTypes,
  selectedButtonStatus,
  selectedButtonYear,
  selectedButtonSeason,
  selectedButtonRated,

  setSelectedButtonSortby,
  setSelectedButtonGenres,
  setSelectedButtonTypes,
  setSelectedButtonStatus,
  setSelectedButtonYear,
  setSelectedButtonSeason,
  setSelectedButtonRated,
}) {
  return (
    <div
      className="grow grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))]
     mb-4"
    >
      <Select
        size="sm"
        label="Genres"
        variant="bordered"
        classNames={{
          trigger: "border-none shadow-none ",
          value: "text-primary",
          popoverContent: "rounded-lg",
        }}
        selectedKeys={
          selectedButtonGenres === "All Genres" || !selectedButtonGenres
            ? []
            : [selectedButtonGenres]
        }
        onChange={(e) => setSelectedButtonGenres(e.target.value)}
      >
        {Genres.map((genre) => (
          <SelectItem textValue={genre} key={genre} value={genre}>
            {genre}
          </SelectItem>
        ))}
      </Select>

      <Select
        size="sm"
        label="Types"
        variant="bordered"
        classNames={{
          trigger: "border-none shadow-none",
          value: "text-primary",
          popoverContent: "rounded-lg",
        }}
        selectedKeys={
          selectedButtonTypes === "All Types" || !selectedButtonTypes
            ? []
            : [selectedButtonTypes]
        }
        onChange={(e) => setSelectedButtonTypes(e.target.value)}
      >
        {Types.map((type) => (
          <SelectItem textValue={type} key={type}>
            {type}
          </SelectItem>
        ))}
      </Select>

      <Select
        size="sm"
        label="Status"
        variant="bordered"
        classNames={{
          trigger: "border-none shadow-none",
          value: "text-primary",
          popoverContent: "rounded-lg",
        }}
        selectedKeys={
          selectedButtonStatus === "All Status" || !selectedButtonStatus
            ? []
            : [selectedButtonStatus]
        }
        onChange={(e) => setSelectedButtonStatus(e.target.value)}
      >
        <SelectItem
          textValue="Finished Airing"
          key="Finished Airing"
          value="Finished Airing"
        >
          Finished Airing
        </SelectItem>
        <SelectItem
          textValue="Currently Airing"
          key="Currently Airing"
          value="Currently Airing"
        >
          Currently Airing
        </SelectItem>
        <SelectItem
          textValue="Not yet aired"
          key="Not yet aired"
          value="Not yet aired"
        >
          Not yet aired
        </SelectItem>
      </Select>

      <Select
        size="sm"
        label="Year"
        variant="bordered"
        classNames={{
          trigger: "border-none shadow-none",
          value: "text-primary",
          popoverContent: "rounded-lg",
        }}
        selectedKeys={
          selectedButtonYear === "All Year" || !selectedButtonYear
            ? []
            : [selectedButtonYear.toString()]
        }
        onChange={(e) => setSelectedButtonYear(e.target.value)}
      >
        {Years.map((year) => (
          <SelectItem textValue={year} key={year.toString()}>
            {year}
          </SelectItem>
        ))}
      </Select>

      <Select
        size="sm"
        label="Season"
        variant="bordered"
        classNames={{
          trigger: "border-none shadow-none",
          value: "text-primary",
          popoverContent: "rounded-lg",
        }}
        selectedKeys={
          selectedButtonSeason === "All Season" || !selectedButtonSeason
            ? []
            : [selectedButtonSeason]
        }
        onChange={(e) => setSelectedButtonSeason(e.target.value)}
      >
        <SelectItem textValue="winter" key="winter">
          Winter
        </SelectItem>
        <SelectItem textValue="spring" key="spring">
          Spring
        </SelectItem>
        <SelectItem textValue="summer" key="summer">
          Summer
        </SelectItem>
        <SelectItem textValue="fall" key="fall">
          Fall
        </SelectItem>
      </Select>

      <Select
        size="sm"
        label="Rated"
        variant="bordered"
        classNames={{
          trigger: "border-none shadow-none",
          value: "text-primary",
          popoverContent: "rounded-lg",
        }}
        selectedKeys={
          selectedButtonRated === "All Rated" || !selectedButtonRated
            ? []
            : [selectedButtonRated]
        }
        onChange={(e) => setSelectedButtonRated(e.target.value)}
      >
        <SelectItem
          textValue="G - All Ages"
          key="G - All Ages"
          value="G - All Ages"
        >
          G - All Ages
        </SelectItem>
        <SelectItem
          textValue="PG - Children"
          key="PG - Children"
          value="PG - Children"
        >
          PG - Children
        </SelectItem>
        <SelectItem
          textValue="PG-13 - Teens 13 or older"
          key="PG-13 - Teens 13 or older"
          value="PG-13 - Teens 13 or older"
        >
          PG-13 - Teens 13 or older
        </SelectItem>
        <SelectItem
          textValue="R - 17+ (violence & profanity)"
          key="R - 17+ (violence & profanity)"
          value="R - 17+ (violence & profanity)"
        >
          R - 17+ (violence & profanity)
        </SelectItem>
        <SelectItem
          textValue="R+ - Mild Nudity"
          key="R+ - Mild Nudity"
          value="R+ - Mild Nudity"
        >
          R+ - Mild Nudity
        </SelectItem>
        <SelectItem
          textValue="Rx - Hentai"
          key="Rx - Hentai"
          value="Rx - Hentai"
        >
          Rx - Hentai
        </SelectItem>
      </Select>

      <Select
        size="sm"
        label="Sort by"
        variant="bordered"
        classNames={{
          trigger: "border-none shadow-none",
          value: "text-primary",
          popoverContent: "rounded-lg",
        }}
        selectedKeys={[selectedButtonSortby]}
        onChange={(e) => setSelectedButtonSortby(e.target.value)}
      >
        <SelectItem textValue="Popularity" key="Popularity">
          Popularity
        </SelectItem>
        <SelectItem textValue="Score" key="Score">
          Score
        </SelectItem>
      </Select>
    </div>
  );
}
