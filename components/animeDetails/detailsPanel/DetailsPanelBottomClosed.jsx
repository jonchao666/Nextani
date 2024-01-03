import { Link } from "@nextui-org/react";

export default function DetailsPanelBottomOpened({
  data,
  synopsisWithoutLastParagraph,
  setSynopsisOpened,
}) {
  if (!synopsisWithoutLastParagraph) {
    return null;
  }

  const paragraphs = synopsisWithoutLastParagraph.split("\n");

  const firstParagraph = paragraphs[0];

  const hasMoreThanOneParagraph = paragraphs.length > 1;

  return (
    <div className="h-full flex flex-col justify-between">
      {firstParagraph && (
        <span className="whitespace-pre-line font-sm">
          Synopsis: {firstParagraph}
        </span>
      )}
      <div className="flex justify-between">
        <div className="flex flex-col">
          <span className="text-[#ffa058] text-xl font-bold">
            {data.score ? data.score.toFixed(2) : "N/A"}
          </span>

          <span className="text-xs text-[#61666d] mt-0.5">
            {data.scored_by ? data.scored_by : "- "}users
          </span>
        </div>

        {hasMoreThanOneParagraph && (
          <Link
            onClick={() => setSynopsisOpened(true)}
            className="cursor-pointer"
          >
            Show more
          </Link>
        )}
      </div>
    </div>
  );
}
