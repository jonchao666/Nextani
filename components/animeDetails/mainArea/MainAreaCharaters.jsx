import CharacterCard from "./CharacterCard";

import Link from "next/link";
export default function MainAreaCharaters({ characters, staff, data }) {
  if (!characters || !staff) {
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
    <div className="grow mb-8">
      <div className="text-sm font-medium mb-2.5 flex justify-between">
        <span>Characters</span>
        <Link
          href={`/animeDetails/default?mal_id=${data.mal_id}`}
          scroll={false}
          className="text-sm text-primary font-normal"
        >
          Back
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 3xl:grid-cols-3 gap-y-4 gap-x-8 ">
        {validCharacters.map((character, index) => (
          <CharacterCard key={index} character={character} />
        ))}
      </div>
    </div>
  );
}
