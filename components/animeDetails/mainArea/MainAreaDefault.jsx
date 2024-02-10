import CharacterCard from "./CharacterCard";
import StaffCard from "./StaffCard";
import { Textarea, Button, Image } from "@nextui-org/react";
import Link from "next/link";
import { useState } from "react";
import RecommendationsCardInfinityScorll from "@/components/animeDetails/RecommendationsCardInfinityScorll";

export default function MainAreaDefault({
  characters,
  staff,
  data,
  recommendations,
}) {
  const [comment, setComment] = useState("");
  const handleInputChange = (event) => {
    setComment(event.target.value);
  };

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

  for (let i = staff.length - 1; i >= 0; i--) {
    if (staff[i].positions[0] === "Director") {
      let s = staff.splice(i, 1);
      staff.unshift(s[0]);
    }
  }
  return (
    <div className="flex flex-col grow ">
      <div className="mb-6">
        <div className="text-sm font-medium mb-2.5 flex justify-between items-center">
          <h3>Characters</h3>
          {validCharacters.length > 6 && (
            <Button
              size="sm"
              variant="light"
              color="primary"
              radius="full"
              as={Link}
              href={`/animeDetails/characters?mal_id=${data.mal_id}`}
              scroll={false}
              className="text-sm text-primary font-medium"
            >
              View all
            </Button>
          )}
        </div>

        {validCharacters.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 3xl:grid-cols-3 gap-y-4 gap-x-8 ">
            {validCharacters.slice(0, 6).map((character, index) => (
              <CharacterCard key={index} character={character} />
            ))}
          </div>
        ) : (
          "No characters have been added to this title. "
        )}
      </div>

      <div className="mb-8">
        <div className="text-sm font-medium mb-2.5 flex justify-between items-center">
          <h3>Staff</h3>
          {staff.length > 3 && (
            <Button
              size="sm"
              as={Link}
              variant="light"
              color="primary"
              radius="full"
              href={`/animeDetails/staff?mal_id=${data.mal_id}`}
              scroll={false}
              className="text-sm text-primary font-medium"
            >
              View all
            </Button>
          )}
        </div>

        {staff.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 3xl:grid-cols-3 gap-y-4 gap-x-8 ">
            {staff.slice(0, 3).map((person, index) => (
              <StaffCard key={index} person={person} />
            ))}
          </div>
        ) : (
          "No staff for this anime have been added to this title. "
        )}
      </div>

      {recommendations.length > 0 && (
        <RecommendationsCardInfinityScorll recommendations={recommendations} />
      )}

      {/* comment */}
      {/* <div className="mb-6">
        <div className="text-lg font-medium mb-6">0 Comments</div>
        <div className="mr-4">
          <div className="flex ">
            <div className="mr-4">
              <Image
                height={40}
                width={40}
                radius="full"
                alt="default user Avatar"
                src="https://yt3.ggpht.com/a/default-user=s88-c-k-c0x00ffffff-no-rj"
              ></Image>
            </div>
            <Textarea
              classNames={{ inputWrapper: "after:h-[1px]" }}
              variant="underlined"
              minRows="1"
              size="sm"
              onChange={handleInputChange}
              className="pb-2 "
            ></Textarea>
          </div>

          <div className="flex justify-end">
            <Button variant="light" radius="full">
              Cancel
            </Button>
            <Button
              isDisabled={!comment}
              color={comment ? "primary" : "default"}
              radius="full"
              className="ml-2"
            >
              Comment
            </Button>
          </div>
        </div>
      </div> */}
    </div>
  );
}