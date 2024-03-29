import { useState, useLayoutEffect, useRef } from "react";

export default function DetailsPanelBottom({
  data,
  isLoadingData,
  synopsisWithoutLastParagraph,
}) {
  const [aboutOpen, setAboutOpen] = useState(true);
  const [showToggleButton, setShowToggleButton] = useState(false);

  const textRef = useRef(null);

  useLayoutEffect(() => {
    setAboutOpen(true);
    setShowToggleButton(false);
    setTimeout(() => {
      if (textRef.current) {
        const lineCount = calculateLineCount();
        setShowToggleButton(lineCount > 2);
        if (lineCount > 2) {
          setAboutOpen(false);
        } else {
          setAboutOpen(true);
        }
      }
    }, 1);
  }, [synopsisWithoutLastParagraph]);

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
          aboutOpen
            ? "whitespace-pre-line  text-sm"
            : "whitespace-pre-line text-sm line-clamp-2"
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

        {showToggleButton && !aboutOpen && (
          <div
            onClick={() => setAboutOpen(true)}
            className="cursor-pointer text-sm  font-medium"
          >
            Show more
          </div>
        )}
        {showToggleButton && aboutOpen && (
          <div
            onClick={() => setAboutOpen(false)}
            className="cursor-pointer text-sm  font-medium"
          >
            Show less
          </div>
        )}
      </div>
    </div>
  );
}
