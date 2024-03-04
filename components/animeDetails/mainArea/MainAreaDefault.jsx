import CharacterCard from "./CharacterCard";
import StaffCard from "./StaffCard";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { useSelector } from "react-redux";
import Recommendations from "@/components/animeDetails/Recommendations";
import { useResponsive } from "@/hooks/useResponsive";
export default function MainAreaDefault({
  characters,
  staff,
  data,
  recommendations,
}) {
  const isMobileDevice = useSelector((state) => state.isMobile.isMobileDevice);
  const { isXs } = useResponsive();

  const validVoiceActors =
    characters &&
    characters.data
      .map((character) => ({
        ...character,
        voice_actors: character.voice_actors.filter(
          (va) => va.language === "Japanese"
        ),
      }))
      .filter((character) => character.voice_actors.length > 0)
      .sort((a, b) => b.favorites - a.favorites);

  const validCharacters =
    validVoiceActors && validVoiceActors.length > 0
      ? validVoiceActors
      : characters &&
        characters.data
          .filter((character) => character)
          .sort((a, b) => b.favorites - a.favorites);

  if (staff) {
    for (let i = staff.length - 1; i >= 0; i--) {
      if (staff[i].positions[0] === "Director") {
        let s = staff.splice(i, 1);
        staff.unshift(s[0]);
      }
    }
  }
  return (
    <div className="flex flex-col grow">
      <div className={` ${isMobileDevice || !isXs ? "px-3 mb-6" : " mb-6"}`}>
        {data && validCharacters && validCharacters.length > 0 && (
          <div className=" font-medium mb-1.5 flex justify-between items-center">
            <h3>Characters</h3>

            {validCharacters.length > 6 && (
              <Button
                variant={isMobileDevice || !isXs ? "bordered" : "light"}
                radius="full"
                color={isMobileDevice || !isXs ? "default" : "primary"}
                size={isMobileDevice || !isXs ? "sm" : "md"}
                className={` hover:opacity-100  font-medium ${
                  isMobileDevice || !isXs ? "text-sm border-1" : "h-9"
                }`}
                as={Link}
                href={`/animeDetails/characters?mal_id=${data.mal_id}`}
              >
                View all
              </Button>
            )}
          </div>
        )}

        {validCharacters ? (
          validCharacters.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-4 gap-x-8 ">
              {validCharacters.slice(0, 6).map((character, index) => (
                <CharacterCard key={index} character={character} />
              ))}
            </div>
          ) : (
            "No characters have been added to this title. "
          )
        ) : null}
      </div>

      <div className={` ${isMobileDevice || !isXs ? "px-3 mb-6" : "mb-8"}`}>
        {data && staff && staff.length > 0 && (
          <div className=" font-medium mb-1.5 flex justify-between items-center">
            <h3>Staff</h3>

            {staff.length > 4 && (
              <Button
                variant={isMobileDevice || !isXs ? "bordered" : "light"}
                radius="full"
                color={isMobileDevice || !isXs ? "default" : "primary"}
                size={isMobileDevice || !isXs ? "sm" : "md"}
                className={` hover:opacity-100  font-medium ${
                  isMobileDevice || !isXs ? "text-sm border-1" : "h-9"
                }`}
                as={Link}
                href={`/animeDetails/staff?mal_id=${data.mal_id}`}
              >
                View all
              </Button>
            )}
          </div>
        )}

        {staff ? (
          staff.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2  gap-y-4 gap-x-8 ">
              {staff.slice(0, 4).map((person, index) => (
                <StaffCard key={index} person={person} />
              ))}
            </div>
          ) : (
            "No staff for this anime have been added to this title. "
          )
        ) : null}
      </div>

      {recommendations && recommendations.length > 0 && (
        <Recommendations recommendations={recommendations} data={data} />
      )}
    </div>
  );
}
