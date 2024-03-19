import { Card, Image } from "@nextui-org/react";
import Link from "next/link";
import { useSelector } from "react-redux";
export default function CharacterCard({ character }) {
  const isMobileDevice = useSelector((state) => state.isMobile.isMobileDevice);

  if (!character) return null;
  return (
    <div>
      <Card
        className={
          isMobileDevice
            ? " flex-row justify-between rounded-md   bg-background   shadow-none"
            : " flex-row justify-between rounded-md hover:scale-105   bg-[rgb(255,255,255)] dark:bg-[rgb(24,24,27)]  shadow-sm"
        }
      >
        <Link
          href={`/character?mal_id=${character.character.mal_id}`}
          className="shrink-0"
        >
          <Image
            radius="none"
            className={
              isMobileDevice
                ? "w-[60px] h-[81px] object-cover shrink-0 rounded-md"
                : "w-[60px] h-[81px] object-cover shrink-0"
            }
            alt={character.character.name}
            src={
              character.character.images.webp.image_url.startsWith(
                "https://cdn.myanimelist.net/images/questionmark_23.gif"
              )
                ? "https://s4.anilist.co/file/anilistcdn/character/large/default.jpg"
                : character.character.images.webp.image_url
            }
          ></Image>
        </Link>
        <div className="flex  justify-between text-xs  grow">
          <div className="flex flex-col justify-between p-2.5">
            <Link
              href={`/character?mal_id=${character.character.mal_id}`}
              className=" text-left "
            >
              {character.character.name}
            </Link>
            <div className="flex-grow"></div>
            <div className="text-left text-[rgb(96,96,96)] dark:text-[rgb(170,170,170)]">
              {character.role}
            </div>
          </div>
          {character.voice_actors.length > 0 && (
            <div className="flex flex-col justify-between p-2.5">
              <Link
                href={`/person?mal_id=${character.voice_actors[0].person.mal_id}`}
                className=" text-right"
              >
                {character.voice_actors[0].person.name}{" "}
              </Link>
              <div className="flex-grow"></div>
              <div className="text-right text-[rgb(96,96,96)] dark:text-[rgb(170,170,170)]">
                {character.voice_actors[0].language}
              </div>
            </div>
          )}
        </div>

        {character.voice_actors.length > 0 && (
          <Link
            className="shrink-0"
            href={`/person?mal_id=${character.voice_actors[0].person.mal_id}`}
          >
            <Image
              radius="none"
              className={
                isMobileDevice
                  ? "w-[60px] h-[81px] object-cover shrink-0 rounded-md"
                  : "w-[60px] h-[81px] object-cover shrink-0"
              }
              alt={character.voice_actors[0].person.name}
              src={
                character.voice_actors[0].person.images.jpg.image_url.startsWith(
                  "https://cdn.myanimelist.net/images/questionmark_23.gif"
                )
                  ? "https://s4.anilist.co/file/anilistcdn/character/large/default.jpg"
                  : character.voice_actors[0].person.images.jpg.image_url
              }
            ></Image>
          </Link>
        )}
      </Card>
    </div>
  );
}
