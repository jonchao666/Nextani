import { Card, CardBody, Image } from "@nextui-org/react";
import Link from "next/link";
export default function CharacterCard({ character }) {
  if (!character) return null;
  return (
    <div>
      <Card className=" flex-row justify-between rounded-sm bg-[#edf1f5] dark:bg-background shadow-none">
        <Image
          radius="none"
          className="w-[60px] h-[81px] object-cover"
          alt={character.character.name}
          src={
            character.character.images.webp.image_url.startsWith(
              "https://cdn.myanimelist.net/images/questionmark_23.gif"
            )
              ? "https://s4.anilist.co/file/anilistcdn/character/large/default.jpg"
              : character.character.images.webp.image_url
          }
        ></Image>
        <div className="flex  justify-between text-xs  grow">
          <div className="flex flex-col justify-between p-2.5">
            <div className=" text-left ">{character.character.name}</div>
            <div className="flex-grow"></div>
            <div className="text-left text-[#61666d]">{character.role}</div>
          </div>
          {character.voice_actors.length > 0 && (
            <Link
              href={`/voiceActor?mal_id=${character.voice_actors[0].person.mal_id}`}
              className="flex flex-col justify-between p-2.5"
            >
              <div className=" text-right">
                {character.voice_actors[0].person.name}{" "}
              </div>
              <div className="flex-grow"></div>
              <div className="text-right text-[#61666d]">
                {character.voice_actors[0].language}
              </div>
            </Link>
          )}
        </div>

        {character.voice_actors.length > 0 && (
          <Image
            radius="none"
            className="w-[60px] h-[81px] object-cover"
            alt={character.voice_actors[0].person.name}
            src={
              character.voice_actors[0].person.images.jpg.image_url.startsWith(
                "https://cdn.myanimelist.net/images/questionmark_23.gif"
              )
                ? "https://s4.anilist.co/file/anilistcdn/character/large/default.jpg"
                : character.voice_actors[0].person.images.jpg.image_url
            }
          ></Image>
        )}
      </Card>
    </div>
  );
}
