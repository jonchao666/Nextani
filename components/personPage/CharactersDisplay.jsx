import CharaterCard from "./CharaterCard";

import { useEffect, useState } from "react";
import { useResponsive } from "@/hooks/useResponsive";

export default function CharactersDisplay({ data }) {
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
      <div className="text-xl font-medium my-3">Voices</div>
      <div className={` grid ${colToShow} gap-y-6  gap-x-4  `}>
        {data &&
          data.voices.map((item, index) => (
            <CharaterCard key={index} data={item} />
          ))}
      </div>
    </div>
  );
}
