import { Select, SelectItem } from "@nextui-org/react";
import { Genres, Types, Years } from "@/constans/categoryData";
import { useSelector } from "react-redux";
import { useResponsive } from "@/hooks/useResponsive";
import { useRef, useState, useEffect } from "react";

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

  //adjust popoverContent when overflow
  const [genresClass, setGenresClass] = useState("rounded-lg min-w-max");
  const genresRef = useRef(null);

  const [typesClass, setTypesClass] = useState("rounded-lg min-w-max");
  const typesRef = useRef(null);

  const [statusClass, setStatusClass] = useState("rounded-lg min-w-max");
  const statusRef = useRef(null);

  const [yearClass, setYearClass] = useState("rounded-lg min-w-max");
  const yearRef = useRef(null);

  const [seasonClass, setSeasonClass] = useState("rounded-lg min-w-max");
  const seasonRef = useRef(null);

  const [ratedClass, setRatedClass] = useState("rounded-lg min-w-max");
  const ratedRef = useRef(null);

  const [sortbyClass, setSortbyClass] = useState("rounded-lg min-w-max");
  const sortbyRef = useRef(null);

  const scrollContainer = useRef(null);

  const adjustSelectCss = (ref, setClass) => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const isOverflowingRight = rect.right > window.innerWidth / 2;
      const isWithinBounds = rect.right <= window.innerWidth / 2;
      process.env.SHOW_CONSOLE === "dev" && console.log(rect.right);
      process.env.SHOW_CONSOLE === "dev" && console.log(window.innerWidth);
      if (isOverflowingRight) {
        setClass("rounded-lg min-w-max absolute right-0");
      } else if (isWithinBounds) {
        setClass("rounded-lg min-w-max");
      }
    }
  };

  function debounce(func, wait) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }

  useEffect(() => {
    const checkAllSelects = () => {
      adjustSelectCss(genresRef, setGenresClass);
      adjustSelectCss(typesRef, setTypesClass);
      adjustSelectCss(statusRef, setStatusClass);
      adjustSelectCss(yearRef, setYearClass);
      adjustSelectCss(seasonRef, setSeasonClass);
      adjustSelectCss(ratedRef, setRatedClass);
      adjustSelectCss(sortbyRef, setSortbyClass);
    };

    checkAllSelects();
    const debouncedCheckAllSelects = debounce(checkAllSelects, 200);

    const container = scrollContainer.current;
    if (container) {
      container.addEventListener("scroll", debouncedCheckAllSelects, true);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", debouncedCheckAllSelects, true);
      }
    };
  }, []);

  const { isXs } = useResponsive();
  const isMobileDevice = useSelector((state) => state.isMobile.isMobileDevice);
  return (
    <div
      ref={scrollContainer}
      className={`flex overflow-x-auto overflow-hidden ${
        isMobileDevice
          ? "px-3 scrollbar-hide touch-pan pb-2.5 "
          : !isXs
          ? "px-3  touch-pan pb-2.5 "
          : " "
      }`}
    >
      <div className="mr-2" ref={genresRef}>
        <Select
          aria-label="Genres"
          radius="lg"
          className="min-w-[93px]"
          size="sm"
          labelPlacement="outside"
          placeholder="Genres"
          variant="bordered"
          classNames={{
            listboxWrapper: "overscroll-none",

            trigger:
              isMobileDevice || !isXs
                ? "shadow-none border-default border-1 pl-3"
                : " shadow-none border-none ",

            popoverContent: genresClass,
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
      </div>

      <div className="mr-2" ref={typesRef}>
        <Select
          aria-label="Types"
          className="min-w-[93px]"
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

            popoverContent: typesClass,
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
      <div className="mr-2" ref={statusRef}>
        <Select
          aria-label="Status"
          className="min-w-[93px]"
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

            popoverContent: statusClass,
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
      </div>
      <div className="mr-2" ref={yearRef}>
        <Select
          aria-label="Year"
          className="min-w-[93px]"
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

            popoverContent: yearClass,
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
      <div className="mr-2" ref={seasonRef}>
        <Select
          aria-label="Season"
          className="min-w-[93px]"
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

            popoverContent: seasonClass,
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
      <div className="mr-2" ref={ratedRef}>
        <Select
          aria-label="Rated"
          className="min-w-[93px]"
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

            popoverContent: ratedClass,
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
      <div ref={sortbyRef}>
        <Select
          aria-label="Sort by"
          className="min-w-[93px]"
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

            popoverContent: sortbyClass,
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
