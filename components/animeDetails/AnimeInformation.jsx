import { Link } from "@nextui-org/react";

export default function AnimeInformation({ data }) {
  function formatDate(dateString) {
    const options = { year: "numeric", month: "short", day: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
  }

  return (
    <div className="sm:w-[154px] mr-4 flex whitespace-nowrap sm:whitespace-normal sm:flex-col shrink-0 overflow-x-scroll sm:overflow-auto mb-6">
      {data.status && (
        <div className="flex flex-col pb-3.5 pr-6">
          <span className="font-medium text-sm pb-1">Status</span>
          <span className="text-xs text-[#61666d]">{data.status}</span>
        </div>
      )}

      {data.type && (
        <div className="flex flex-col pb-3.5 pr-6">
          <span className="font-medium text-sm pb-1">Type</span>
          <span className="text-xs text-[#61666d]">{data.type}</span>
        </div>
      )}

      {data.source && (
        <div className="flex flex-col pb-3.5 pr-6">
          <span className="font-medium text-sm pb-1">Source</span>
          <span className="text-xs text-[#61666d]">{data.source}</span>
        </div>
      )}

      {data.episodes && (
        <div className="flex flex-col pb-3.5 pr-6">
          <span className="font-medium text-sm pb-1">Episodes</span>
          <span className="text-xs text-[#61666d]">{data.episodes}</span>
        </div>
      )}

      {data.duration && (
        <div className="flex flex-col pb-3.5 pr-6">
          <span className="font-medium text-sm pb-1">Duration</span>
          <span className="text-xs text-[#61666d]">{data.duration}</span>
        </div>
      )}

      {data.aired.from && (
        <div className="flex flex-col pb-3.5 pr-6">
          <span className="font-medium text-sm pb-1">Start Date</span>
          <span className="text-xs text-[#61666d]">
            {formatDate(data.aired.from)}
          </span>
        </div>
      )}

      {data.broadcast.string && (
        <div className="flex flex-col pb-3.5 pr-6">
          <span className="font-medium text-sm pb-1">Broadcast</span>
          <span className="text-xs text-[#61666d]">
            {data.broadcast.string}
          </span>
        </div>
      )}

      {data.rank && (
        <div className="flex flex-col pb-3.5 pr-6">
          <span className="font-medium text-sm pb-1">Rank</span>
          <Link
            href="/animeIndex?category=Top"
            className="text-xs text-[#61666d]"
          >
            #{data.rank}
          </Link>
        </div>
      )}

      {data.popularity && (
        <div className="flex flex-col pb-3.5 pr-6">
          <span className="font-medium text-sm pb-1">Popularity</span>
          <Link
            href="/animeIndex?category=Popular"
            className="text-xs text-[#61666d]"
          >
            #{data.popularity}
          </Link>
        </div>
      )}

      {data.studios.length > 0 && (
        <div className="flex flex-col pb-3.5 pr-6">
          <span className="font-medium text-sm pb-1">Studios</span>
          <div className="flex sm:flex-col text-xs text-[#61666d]">
            {data.studios.map((studio, index, array) => (
              <span key={`${studio}-${index}`}>
                {studio.name}{" "}
                {index < array.length - 1 && (
                  <span className="inline sm:hidden">, </span>
                )}
              </span>
            ))}
          </div>
        </div>
      )}

      {data.genres.length > 0 && (
        <div className="flex flex-col pb-3.5 pr-6">
          <span className="font-medium text-sm pb-1">genres</span>
          <div className="flex sm:flex-col text-xs text-[#61666d]">
            {data.genres.map((genre, index, array) => (
              <span key={`${genre.name}-${index}`}>
                {genre.name}{" "}
                {index < array.length - 1 && (
                  <span className="inline sm:hidden">, </span>
                )}
              </span>
            ))}
          </div>
        </div>
      )}

      {data.producers.length > 0 && (
        <div className="flex flex-col pb-3.5 pr-6">
          <span className="font-medium text-sm pb-1">Producers</span>
          <div className="flex sm:flex-col text-xs text-[#61666d]">
            {data.producers.map((producer, index, array) => (
              <span key={`${producer}-${index}`}>
                {producer.name}{" "}
                {index < array.length - 1 && (
                  <span className="inline sm:hidden">, </span>
                )}
              </span>
            ))}
          </div>
        </div>
      )}

      {data.titles.length > 0 && (
        <div className="flex flex-col pb-3.5 pr-6">
          <span className="font-medium text-sm pb-1">Alternative Titles</span>
          <div className="flex sm:flex-col  text-xs text-[#61666d]">
            {[...new Set(data.titles.map((title) => title.title))].map(
              (uniqueTitle, index, array) => (
                <span key={`${uniqueTitle}-${index}`}>
                  {uniqueTitle}
                  {index < array.length - 1 && (
                    <span className="inline sm:hidden">, </span>
                  )}
                </span>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}
