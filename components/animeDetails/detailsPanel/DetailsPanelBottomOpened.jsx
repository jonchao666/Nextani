import { Link } from "@nextui-org/react";

export default function DetailsPanelBottomOpened({
  data,
  synopsisWithoutLastParagraph,
  setSynopsisOpened,
}) {
  return (
    <div>
      {synopsisWithoutLastParagraph && (
        <span className="whitespace-pre-line font-sm">
          Synopsis: {synopsisWithoutLastParagraph}
        </span>
      )}
      <div className="flex justify-between">
        <div className=" flex flex-col">
          <span className="text-[#ffa058] text-xl font-bold">
            {data.score ? data.score.toFixed(2) : "N/A"}
          </span>

          <span className="text-xs text-[#61666d] mt-0.5">
            {data.scored_by ? data.scored_by : "- "}users
          </span>
        </div>
        <Link
          onClick={() => setSynopsisOpened(false)}
          className="cursor-pointer"
        >
          Show less
        </Link>
      </div>
    </div>
  );
}
