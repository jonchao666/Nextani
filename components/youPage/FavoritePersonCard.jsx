import { Image, Link } from "@nextui-org/react";
import { useSelector } from "react-redux";
import { useResponsive } from "@/hooks/useResponsive";

export default function FavoritePersonCard({ data }) {
  const isMobileDevice = useSelector((state) => state.isMobile.isMobileDevice);

  const { isXs } = useResponsive();
  return (
    <div>
      <Link
        className="hover:opacity-100"
        as={Link}
        href={`/person?mal_id=${data.mal_id}`}
      >
        <Image
          isZoomed={!isMobileDevice}
          radius="sm"
          alt={data.apiData.name}
          src={
            data.apiData.images.jpg.image_url ===
            "https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png"
              ? "https://s4.anilist.co/file/anilistcdn/character/large/default.jpg"
              : data.apiData.images.jpg.image_url
          }
          className="object-cover h-[210px] w-[154px] "
        ></Image>
      </Link>

      <Link
        href={`/person?mal_id=${data.mal_id}`}
        className={`mt-2 line-clamp-2 w-[154px] break-words  text-foreground text-sm${
          isMobileDevice || !isXs
            ? " leading-[17.5px]"
            : "leading-[20px] font-medium"
        }`}
      >
        {data.apiData.name}
      </Link>
    </div>
  );
}
