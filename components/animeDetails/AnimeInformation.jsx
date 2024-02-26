import { Link } from "@nextui-org/react";
import { useSelector, useDispatch } from "react-redux";
import { useResponsive } from "@/hooks/useResponsive";
export default function AnimeInformation({ data }) {
  const isMobileDevice = useSelector((state) => state.isMobile.isMobileDevice);
  const { isXs } = useResponsive();
  function formatDate(dateString) {
    const options = { year: "numeric", month: "short", day: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
  }

  return (
    <div
      className={`${
        isMobileDevice || !isXs
          ? "px-3 overflow-x-scroll scrollbar-hide touch-pan mb-2.5"
          : "mb-6 overflow-x-scroll md:overflow-auto md:flex-col md:whitespace-normal md:w-[142px]"
      }  mr-4 flex whitespace-nowrap   shrink-0  `}
    >
      {data.status && (
        <div className="flex flex-col pb-3.5 pr-6">
          <p className="font-medium text-sm pb-1">Status</p>
          <p className="text-xs text-[rgb(96,96,96)] dark:text-[rgb(170,170,170)]">
            {data.status}
          </p>
        </div>
      )}

      {data.type && (
        <div className="flex flex-col pb-3.5 pr-6">
          <p className="font-medium text-sm pb-1">Type</p>
          <p className="text-xs text-[rgb(96,96,96)] dark:text-[rgb(170,170,170)]">
            {data.type}
          </p>
        </div>
      )}

      {data.source && (
        <div className="flex flex-col pb-3.5 pr-6">
          <p className="font-medium text-sm pb-1">Source</p>
          <p className="text-xs text-[rgb(96,96,96)] dark:text-[rgb(170,170,170)]">
            {data.source}
          </p>
        </div>
      )}

      {data.episodes && (
        <div className="flex flex-col pb-3.5 pr-6">
          <p className="font-medium text-sm pb-1">Episodes</p>
          <p className="text-xs text-[rgb(96,96,96)] dark:text-[rgb(170,170,170)]">
            {data.episodes}
          </p>
        </div>
      )}

      {data.duration && (
        <div className="flex flex-col pb-3.5 pr-6">
          <p className="font-medium text-sm pb-1">Duration</p>
          <p className="text-xs text-[rgb(96,96,96)] dark:text-[rgb(170,170,170)]">
            {data.duration}
          </p>
        </div>
      )}

      {data.aired.from && (
        <div className="flex flex-col pb-3.5 pr-6">
          <p className="font-medium text-sm pb-1">Start Date</p>
          <p className="text-xs text-[rgb(96,96,96)] dark:text-[rgb(170,170,170)]">
            {formatDate(data.aired.from)}
          </p>
        </div>
      )}

      {data.broadcast && data.broadcast.string && (
        <div className="flex flex-col pb-3.5 pr-6">
          <p className="font-medium text-sm pb-1">Broadcast</p>
          <p className="text-xs text-[rgb(96,96,96)] dark:text-[rgb(170,170,170)]">
            {data.broadcast.string}
          </p>
        </div>
      )}

      {data.rank && (
        <div className="flex flex-col pb-3.5 pr-6">
          <p className="font-medium text-sm pb-1">Rank</p>
          <div className="text-xs text-[rgb(96,96,96)] dark:text-[rgb(170,170,170)]">
            #{data.rank}
          </div>
        </div>
      )}

      {data.popularity && (
        <div className="flex flex-col pb-3.5 pr-6">
          <p className="font-medium text-sm pb-1">Popularity</p>
          <div className="text-xs text-[rgb(96,96,96)] dark:text-[rgb(170,170,170)]">
            #{data.popularity}
          </div>
        </div>
      )}

      {data.studios.length > 0 && (
        <div className="flex flex-col pb-3.5 pr-6">
          <p className="font-medium text-sm pb-1">Studios</p>
          <div
            className={`flex ${
              isMobileDevice || !isXs ? "flex-row" : "md:flex-col"
            }   text-xs text-[rgb(96,96,96)] dark:text-[rgb(170,170,170)]`}
          >
            {data.studios.map((studio, index, array) => (
              <p key={`${studio}-${index}`}>
                {studio.name}{" "}
                {index < array.length - 1 && (
                  <span className="inline sm:hidden">, </span>
                )}
              </p>
            ))}
          </div>
        </div>
      )}

      {data.genres.length > 0 && (
        <div className="flex flex-col pb-3.5 pr-6">
          <p className="font-medium text-sm pb-1">genres</p>
          <div
            className={`flex ${
              isMobileDevice || !isXs ? "flex-row" : "md:flex-col"
            }   text-xs text-[rgb(96,96,96)] dark:text-[rgb(170,170,170)]`}
          >
            {data.genres.map((genre, index, array) => (
              <p key={`${genre.name}-${index}`}>
                {genre.name}{" "}
                {index < array.length - 1 && (
                  <span className="inline sm:hidden">, </span>
                )}
              </p>
            ))}
          </div>
        </div>
      )}

      {data.producers.length > 0 && (
        <div className="flex flex-col pb-3.5 pr-6">
          <p className="font-medium text-sm pb-1">Producers</p>
          <div
            className={`flex ${
              isMobileDevice || !isXs ? "flex-row" : "md:flex-col"
            }   text-xs text-[rgb(96,96,96)] dark:text-[rgb(170,170,170)]`}
          >
            {data.producers.map((producer, index, array) => (
              <p key={`${producer}-${index}`}>
                {producer.name}{" "}
                {index < array.length - 1 && (
                  <span className="inline sm:hidden">, </span>
                )}
              </p>
            ))}
          </div>
        </div>
      )}

      {data.titles.length > 0 && (
        <div className="flex flex-col pb-3.5 pr-6">
          <p className="font-medium text-sm pb-1">Alternative Titles</p>
          <div
            className={`flex ${
              isMobileDevice || !isXs ? "flex-row" : "md:flex-col"
            }   text-xs text-[rgb(96,96,96)] dark:text-[rgb(170,170,170)]`}
          >
            {[...new Set(data.titles.map((title) => title.title))].map(
              (uniqueTitle, index, array) => (
                <p key={`${uniqueTitle}-${index}`}>
                  {uniqueTitle}
                  {index < array.length - 1 && (
                    <span className="inline sm:hidden">, </span>
                  )}
                </p>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}
