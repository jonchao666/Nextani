import { useState, useEffect, useRef } from "react";

export default function DetailsPanelBottomOpened({
  data,
  synopsisWithoutLastParagraph,
  setSynopsisOpened,
}) {
  const [overHeight, setOverHeight] = useState(false);
  const textRef = useRef(null);
  useEffect(() => {
    if (textRef.current) {
      const lineCount = calculateLineCount();
      setOverHeight(lineCount > 2);
    }
  }, []);

  const calculateLineCount = () => {
    const lineHeight = 20;
    const divHeight = textRef.current.clientHeight;
    return divHeight / lineHeight;
  };

  if (!synopsisWithoutLastParagraph) {
    return (
      <p className="font-sm">
        Synopsis: No synopsis information has been added to this title.
      </p>
    );
  }

  return (
    <div className="h-full flex flex-col justify-between">
      <p
        ref={textRef}
        className={
          overHeight
            ? "whitespace-pre-line line-clamp-2 text-sm"
            : "whitespace-pre-line text-sm"
        }
      >
        Synopsis: {synopsisWithoutLastParagraph}
      </p>

      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <p className="text-[#ffa058] text-xl font-bold">
            {data && data.score ? data.score.toFixed(2) : "N/A"}
          </p>

          <p className="text-xs text-[rgb(96,96,96)] dark:text-[rgb(170,170,170)] mt-0.5">
            {data && data.scored_by ? data.scored_by : "- "}users
          </p>
        </div>

        {overHeight && (
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
