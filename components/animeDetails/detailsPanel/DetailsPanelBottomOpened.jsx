import { Button, Link } from "@nextui-org/react";

export default function DetailsPanelBottomOpened({
  data,
  synopsisWithoutLastParagraph,
  setSynopsisOpened,
}) {
  return (
    <div>
      {synopsisWithoutLastParagraph && (
        <p className="whitespace-pre-line text-sm">
          Synopsis: {synopsisWithoutLastParagraph}
        </p>
      )}
      <div className="flex justify-between items-center">
        <div className=" flex flex-col">
          <p className="text-[#ffa058] text-xl font-bold">
            {data.score ? data.score.toFixed(2) : "N/A"}
          </p>

          <p className="text-xs text-[rgb(96,96,96)] dark:text-[rgb(170,170,170)] mt-0.5">
            {data.scored_by ? data.scored_by : "- "}users
          </p>
        </div>
        <div
          onClick={() => setSynopsisOpened(false)}
          className="cursor-pointer text-sm font-medium"
        >
          Show less
        </div>
      </div>
    </div>
  );
}
