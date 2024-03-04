import { Card, Image, Link } from "@nextui-org/react";
import { useSelector } from "react-redux";
export default function StaffCard({ person }) {
  const isMobileDevice = useSelector((state) => state.isMobile.isMobileDevice);
  if (!person) return null;
  return (
    <div>
      <Card
        className={
          isMobileDevice
            ? " flex-row rounded-lg shadow-md  bg-[rgb(255,255,255)] dark:bg-[rgb(24,24,27)] shadow-sm "
            : " flex-row rounded-lg shadow-md hover:scale-105 bg-[rgb(255,255,255)] dark:bg-[rgb(24,24,27)] shadow-sm "
        }
      >
        <Link
          href={`/person?mal_id=${person.person.mal_id}`}
          className="shrink-0"
        >
          <Image
            radius="none"
            className="w-[60px] h-[81px] object-cover"
            alt={person.person.name}
            src={
              person.person.images.jpg.image_url.startsWith(
                "https://cdn.myanimelist.net/images/questionmark_23.gif"
              )
                ? "https://s4.anilist.co/file/anilistcdn/character/large/default.jpg"
                : person.person.images.jpg.image_url
            }
          ></Image>
        </Link>

        <div className="flex flex-col justify-between text-xs  p-2.5 ">
          <Link
            className="text-xs text-foreground"
            href={`/person?mal_id=${person.person.mal_id}`}
          >
            {person.person.name}
          </Link>
          <div className="text-[rgb(96,96,96)] dark:text-[rgb(170,170,170)]">
            {person.positions[0]}
          </div>
        </div>
      </Card>
    </div>
  );
}
