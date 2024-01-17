import CharaterCard from "./CharaterCard";
import StaffCard from "./StaffCard";
import { useEffect, useState } from "react";
import { useResponsive } from "@/hooks/useResponsive";

export default function CardDisplay({ data }) {
  const { isXl, isLg, isMd, isSm, isXs } = useResponsive();
  const [colToShow, setColToShow] = useState(1);

  useEffect(() => {
    // 根据屏幕尺寸更新 slidesToShow 的值
    const newColToshow = isXl
      ? " grid-cols-4"
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
    <div className="mb-12">
      {data && data.voices.length > 0 && (
        <div>
          <div className="text-xl font-medium my-3">Voices</div>
          <div className={` grid ${colToShow} gap-y-6  gap-x-4  `}>
            {data.voices.map((item, index) => (
              <CharaterCard key={index} data={item} />
            ))}
          </div>
        </div>
      )}

      {data && data.anime.length > 0 && (
        <div>
          <div className="text-xl font-medium my-3">Anime</div>
          <div className={` grid ${colToShow} gap-y-6  gap-x-4  `}>
            {data.anime.map((item, index) => (
              <StaffCard key={index} data={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
