import CharacterCard from "./CharacterCard";
import { Textarea, Button, Image } from "@nextui-org/react";
import Link from "next/link";
export default function MainAreaCharaters({ characters, data }) {
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
    <div className="grow mb-8">
      <div className="text-sm font-medium mb-2.5 flex justify-between items-center">
        <h3>Characters</h3>
        <Button
          as={Link}
          size="sm"
          variant="light"
          color="primary"
          radius="full"
          href={`/animeDetails/default?mal_id=${data.mal_id}`}
          scroll={false}
          className="text-sm text-primary font-medium"
        >
          Back
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 3xl:grid-cols-3 gap-y-4 gap-x-8 ">
        {validCharacters.map((character, index) => (
          <CharacterCard key={index} character={character} />
        ))}
      </div>
    </div>
  );
}
