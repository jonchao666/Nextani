import CharaterCard from "./CharaterCard";
import StaffCard from "./StaffCard";
import { useEffect, useState } from "react";
import { useResponsive } from "@/hooks/useResponsive";
import { useSelector } from "react-redux";

export default function CardDisplay({ data }) {
  const { isXl, isLg, isMd, isSm, isXs } = useResponsive();
  const [colToShow, setColToShow] = useState(1);
  const isMobileDevice = useSelector((state) => state.isMobile.isMobileDevice);
  const [showVoicesArrow, setShowVoicesArrow] = useState(true);
  const [showMoreVoices, setShowMoreVoices] = useState(false);
  const [showStaffArrow, setShowStaffArrow] = useState(true);
  const [showMoreStaff, setShowMoreStaff] = useState(false);
  useEffect(() => {
    // 根据屏幕尺寸更新 slidesToShow 的值
    const newColToshow = isXl
      ? " grid-cols-3"
      : isLg
      ? "grid-cols-3"
      : isMd
      ? " grid-cols-2"
      : isSm
      ? "grid-cols-2"
      : isXs
      ? "grid-cols-1"
      : "grid-cols-1";
    setColToShow(newColToshow);
  }, [isXl, isLg, isMd, isSm, isXs]);

  return (
    <div>
      {data && data.voices.length > 0 && (
        <div className="mb-6">
          <div className="text-xl font-medium mb-3">Voice Acting Roles</div>
          <div
            className={` grid ${colToShow} ${
              isMobileDevice || !isXs ? "gap-y-2.5" : "gap-y-4"
            }  gap-x-4  `}
          >
            {showMoreVoices
              ? data.voices.map((item, index) => (
                  <CharaterCard key={index} data={item} />
                ))
              : data.voices
                  .slice(0, 9)
                  .map((item, index) => (
                    <CharaterCard key={index} data={item} />
                  ))}
          </div>
          <div className="text-center mt-3 cursor-pointer">
            {showVoicesArrow && data.voices.length > 9 && (
              <span
                onClick={() => {
                  setShowVoicesArrow(false), setShowMoreVoices(true);
                }}
                className="material-symbols-outlined"
                style={{
                  fontVariationSettings:
                    "'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24",
                }}
              >
                expand_more
              </span>
            )}
          </div>
        </div>
      )}

      {data && data.anime.length > 0 && (
        <div className="mb-6">
          <div className="text-xl font-medium mb-3">Anime Staff Positions</div>
          <div
            className={` grid ${colToShow} ${
              isMobileDevice || !isXs ? "gap-y-2.5" : "gap-y-4"
            }  gap-x-4  `}
          >
            {showMoreStaff
              ? data.anime.map((item, index) => (
                  <StaffCard key={index} data={item} />
                ))
              : data.anime
                  .slice(0, 9)
                  .map((item, index) => <StaffCard key={index} data={item} />)}
          </div>
          <div
            onClick={() => {
              setShowStaffArrow(false), setShowMoreStaff(true);
            }}
            className="text-center mt-3 cursor-pointer"
          >
            {showStaffArrow && data.anime.length > 9 && (
              <span
                className="material-symbols-outlined"
                style={{
                  fontVariationSettings:
                    "'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24",
                }}
              >
                expand_more
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
