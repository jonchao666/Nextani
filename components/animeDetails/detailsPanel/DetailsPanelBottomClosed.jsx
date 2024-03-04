import { Skeleton } from "@nextui-org/react";

export default function DetailsPanelBottomOpened({
  data,

  synopsisWithoutLastParagraph,
  setSynopsisOpened,
}) {
  if (!synopsisWithoutLastParagraph) {
    return (
      <p className="font-sm">
        Synopsis: No synopsis information has been added to this title.
      </p>
    );
  }

  const paragraphs = synopsisWithoutLastParagraph.split("\n");

  const firstParagraph = paragraphs[0];

  const hasMoreThanOneParagraph = paragraphs.length > 1;

  return (
    <div className="h-full flex flex-col justify-between">
      {firstParagraph && (
        <p className="whitespace-pre-line line-clamp-2 text-sm">
          Synopsis: {firstParagraph}
        </p>
      )}
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <p className="text-[#ffa058] text-xl font-bold">
            {data && data.score ? data.score.toFixed(2) : "N/A"}
          </p>

          <p className="text-xs text-[rgb(96,96,96)] dark:text-[rgb(170,170,170)] mt-0.5">
            {data && data.scored_by ? data.scored_by : "- "}users
          </p>
        </div>

        {hasMoreThanOneParagraph && (
          <div
            onClick={() => setSynopsisOpened(true)}
            className="cursor-pointer text-sm  font-medium"
          >
            Show more
          </div>
        )}
      </div>
    </div>
  );
}
