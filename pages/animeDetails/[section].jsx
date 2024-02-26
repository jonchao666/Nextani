import AnimeDetailsLayout from "@/components/animeDetails/AnimeDetailsLayout";
import MainAreaDefault from "@/components/animeDetails/mainArea/MainAreaDefault";
import MainAreaCharaters from "@/components/animeDetails/mainArea/MainAreaCharaters";
import MainAreaStaff from "@/components/animeDetails/mainArea/MainAreaStaff";
import useAnimeDataJikanApi from "@/hooks/useAnimeDataJikanApi";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/layout/Layout";
export default function AnimeDetails() {
  const router = useRouter();
  const { section, mal_id } = router.query;
  const { data, characters, staff, recommendations, videos } =
    useAnimeDataJikanApi(mal_id);

  switch (section) {
    case "characters":
      return (
        <Layout>
          <MainAreaCharaters
            data={data}
            characters={characters}
            staff={staff}
          />
        </Layout>
      );
    case "default":
      return (
        <AnimeDetailsLayout
          data={data}
          characters={characters}
          videos={videos}
          mal_id={mal_id}
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
        <Layout>
          <MainAreaStaff data={data} characters={characters} staff={staff} />
        </Layout>
      );
  }
}
