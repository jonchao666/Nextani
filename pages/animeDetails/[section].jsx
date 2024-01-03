import AnimeDetailsLayout from "@/components/animeDetails/AnimeDetailsLayout";
import MainAreaDefault from "@/components/animeDetails/mainArea/MainAreaDefault";
import MainAreaCharaters from "@/components/animeDetails/mainArea/MainAreaCharaters";
import MainAreaStaff from "@/components/animeDetails/mainArea/MainAreaStaff";
import useAnimeData from "@/hooks/useAnimeData";
import { useRouter } from "next/router";

export default function AnimeDetails() {
  const router = useRouter();
  const { section, mal_id } = router.query;
  const { data, characters, staff, recommendations, videos } =
    useAnimeData(mal_id);

  switch (section) {
    case "characters":
      return (
        <AnimeDetailsLayout
          data={data}
          characters={characters}
          staff={staff}
          recommendations={recommendations}
          videos={videos}
        >
          <MainAreaCharaters
            data={data}
            characters={characters}
            staff={staff}
          />
        </AnimeDetailsLayout>
      );
    case "default":
      return (
        <AnimeDetailsLayout
          data={data}
          characters={characters}
          staff={staff}
          videos={videos}
        >
          <MainAreaDefault
            data={data}
            characters={characters}
            staff={staff}
            recommendations={recommendations}
          />
        </AnimeDetailsLayout>
      );

    case "staff":
      return (
        <AnimeDetailsLayout
          data={data}
          characters={characters}
          staff={staff}
          recommendations={recommendations}
          videos={videos}
        >
          <MainAreaStaff data={data} characters={characters} staff={staff} />
        </AnimeDetailsLayout>
      );
  }
}
