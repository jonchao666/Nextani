import CharacterCard from "./CharacterCard";
import { Textarea, Button, Image, Link } from "@nextui-org/react";
import { useResponsive } from "@/hooks/useResponsive";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPageName } from "@/reducers/pageNameSlice";

export default function MainAreaCharaters({ characters, data }) {
  const dispatch = useDispatch();
  const isMobileDevice = useSelector((state) => state.isMobile.isMobileDevice);
  const { isXl, isLg, isMd, isSm, isXs } = useResponsive();
  const [colToShow, setColToShow] = useState(1);

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
  useEffect(() => {
    dispatch(setPageName("Characters"));
  }, [dispatch]);

  if (!characters) {
    return null;
  }

  const validVoiceActors = characters.data
    .filter(
      (character) =>
        character &&
        character.voice_actors &&
        character.voice_actors[0] &&
        character.voice_actors[0].language === "Japanese"
    )
    .sort((a, b) => b.favorites - a.favorites);

  const validCharacters =
    validVoiceActors.length > 0
      ? validVoiceActors
      : characters.data
          .filter((character) => character)
          .sort((a, b) => b.favorites - a.favorites);

  return (
    <div
      className={`grow ${isMobileDevice || !isXs ? "px-3 mb-6" : " mb-6 mt-3"}`}
    >
      {isMobileDevice || !isXs ? null : (
        <div className=" font-medium mb-2.5 ">
          <h3>Characters</h3>
        </div>
      )}
      <div
        className={`grid   ${colToShow}  ${
          isMobileDevice || !isXs ? "gap-y-2.5" : "gap-y-4"
        }  gap-x-8`}
      >
        {validCharacters.map((character, index) => (
          <CharacterCard key={index} character={character} />
        ))}
      </div>
    </div>
  );
}
