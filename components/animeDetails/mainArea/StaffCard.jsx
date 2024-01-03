import { Card, Image } from "@nextui-org/react";

export default function StaffCard({ person }) {
  return (
    <div>
      <Card className=" flex-row rounded-sm bg-[#edf1f5] dark:bg-background shadow-none ">
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

        <div className="flex flex-col justify-between text-xs  p-2.5 ">
          <div>{person.person.name}</div>
          <div className="text-[#61666d]">{person.positions[0]}</div>
        </div>
      </Card>
    </div>
  );
}
