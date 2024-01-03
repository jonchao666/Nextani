import { Image } from "@nextui-org/react";
import { useState } from "react";
import Link from "next/link";
export default function RecommendationsCard({ data }) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !data) {
    return null;
  }

  return (
    <div className=" w-[154px] mr-auto">
      <Link href={`/animeDetails/default?mal_id=${data.entry.mal_id}`}>
        <Image
          radius="sm"
          onError={() => setHasError(true)}
          className=" hover:opacity-100 h-[221px] w-[154px] object-cover"
          src={data.entry.images.jpg.large_image_url}
          alt={data.entry.title}
        />
      </Link>

      <div className=" line-clamp-2 text-sm  mt-2">{data.entry.title}</div>
    </div>
  );
}
