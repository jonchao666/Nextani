import { Select, SelectItem } from "@nextui-org/react";
import { Genres, Types, Years } from "@/constans/categoryData";
import { useSelector } from "react-redux";
import { useResponsive } from "@/hooks/useResponsive";

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
  const isSensitiveFilterDisabled = useSelector(
    (state) => state.isSensitiveFilterDisabled.isSensitiveFilterDisabled
  );

  const { isXs } = useResponsive();
  const isMobileDevice = useSelector((state) => state.isMobile.isMobileDevice);
  return (
    <div
      className={`flex overflow-x-auto overflow-hidden ${
        isMobileDevice
          ? "px-3 scrollbar-hide touch-pan pb-2.5 "
          : !isXs
          ? "px-3  touch-pan pb-2.5 "
          : ""
      }`}
    >
      <div className="mr-2 ">
        <Select
          aria-label="Genres"
          radius="lg"
          className="min-w-[120px]"
          size="sm"
          labelPlacement="outside"
          placeholder="Genres"
          variant="bordered"
          classNames={{
            listboxWrapper: "overscroll-none ",

            trigger:
              isMobileDevice || !isXs
                ? "shadow-none border-default border-1 pl-3 "
                : " shadow-none border-none ",
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
              {genre === "Slice of Life"
                ? "Life"
                : genre === "Avant Garde"
                ? "Avant"
                : genre === "Award Winning"
                ? "Awarded"
                : genre}
            </SelectItem>
          ))}
        </Select>
      </div>

      <div className="mr-2">
        <Select
          aria-label="Types"
          className="min-w-[120px]"
          size="sm"
          radius="lg"
          placeholder="Types"
          labelPlacement="outside"
          variant="bordered"
          classNames={{
            listboxWrapper: "overscroll-none",

            trigger:
              isMobileDevice || !isXs
                ? "shadow-none border-default border-1 pl-3"
                : " shadow-none border-none",
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
      </div>
      <div className="mr-2">
        <Select
          aria-label="Status"
          className="min-w-[120px]"
          size="sm"
          radius="lg"
          placeholder="Status"
          labelPlacement="outside"
          variant="bordered"
          classNames={{
            listboxWrapper: "overscroll-none",

            trigger:
              isMobileDevice || !isXs
                ? "shadow-none border-default border-1 pl-3"
                : " shadow-none border-none",
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
            Finished
          </SelectItem>
          <SelectItem
            textValue="Currently Airing"
            key="Currently Airing"
            value="Currently Airing"
          >
            Airing
          </SelectItem>
          <SelectItem
            textValue="Not yet aired"
            key="Not yet aired"
            value="Not yet aired"
          >
            Upcoming
          </SelectItem>
        </Select>
      </div>
      <div className="mr-2">
        <Select
          aria-label="Year"
          className="min-w-[120px]"
          size="sm"
          radius="lg"
          placeholder="Year"
          variant="bordered"
          labelPlacement="outside"
          classNames={{
            listboxWrapper: "overscroll-none",

            trigger:
              isMobileDevice || !isXs
                ? "shadow-none border-default border-1 pl-3"
                : " shadow-none border-none",
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
      </div>
      <div className="mr-2">
        <Select
          aria-label="Season"
          className="min-w-[120px]"
          size="sm"
          placeholder="Season"
          labelPlacement="outside"
          radius="lg"
          variant="bordered"
          classNames={{
            listboxWrapper: "overscroll-none",

            trigger:
              isMobileDevice || !isXs
                ? "shadow-none border-default border-1 pl-3"
                : " shadow-none border-none",
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
      </div>
      <div className="mr-2">
        <Select
          aria-label="Rated"
          className="min-w-[120px]"
          size="sm"
          placeholder="Rated"
          labelPlacement="outside"
          radius="lg"
          variant="bordered"
          classNames={{
            listboxWrapper: "overscroll-none",

            trigger:
              isMobileDevice || !isXs
                ? "shadow-none border-default border-1 pl-3"
                : " shadow-none border-none",
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
            G
          </SelectItem>
          <SelectItem
            textValue="PG - Children"
            key="PG - Children"
            value="PG - Children"
          >
            PG
          </SelectItem>
          <SelectItem
            textValue="PG-13 - Teens 13 or older"
            key="PG-13 - Teens 13 or older"
            value="PG-13 - Teens 13 or older"
          >
            PG - 13
          </SelectItem>
          <SelectItem
            textValue="R - 17+ (violence & profanity)"
            key="R - 17+ (violence & profanity)"
            value="R - 17+ (violence & profanity)"
          >
            R - 17+
          </SelectItem>
          <SelectItem
            textValue="R+ - Mild Nudity"
            key="R+ - Mild Nudity"
            value="R+ - Mild Nudity"
          >
            R+
          </SelectItem>
          {isSensitiveFilterDisabled && (
            <SelectItem
              textValue="Rx - Hentai"
              key="Rx - Hentai"
              value="Rx - Hentai"
            >
              Rx
            </SelectItem>
          )}
        </Select>
      </div>
      <div>
        <Select
          aria-label="Sort by"
          className="min-w-[120px]"
          size="sm"
          radius="lg"
          placeholder="Sort by"
          labelPlacement="outside"
          variant="bordered"
          classNames={{
            listboxWrapper: "overscroll-none",
            trigger:
              isMobileDevice || !isXs
                ? "shadow-none border-default border-1 pl-3"
                : " shadow-none border-none",
          }}
          selectedKeys={!selectedButtonSortby ? [] : [selectedButtonSortby]}
          onChange={(e) => setSelectedButtonSortby(e.target.value)}
        >
          <SelectItem textValue="Popularity" key="Popularity">
            Popularity
          </SelectItem>
          <SelectItem textValue="Score" key="Score">
            Score
          </SelectItem>
          <SelectItem textValue="Overall" key="Overall">
            Overall
          </SelectItem>
        </Select>
      </div>
    </div>
  );
}
