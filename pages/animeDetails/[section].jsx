import AnimeDetailsDefault from "@/components/animeDetails/AnimeDetailsDefault";
import MainAreaCharaters from "@/components/animeDetails/mainArea/MainAreaCharaters";
import MainAreaStaff from "@/components/animeDetails/mainArea/MainAreaStaff";
import useAnimeDataJikanApi from "@/hooks/useAnimeDataJikanApi";
import { useRouter } from "next/router";
import Layout from "@/components/layout/Layout";

export default function AnimeDetails() {
  const router = useRouter();
  const { section, mal_id } = router.query;

  const {
    data,
    characters,
    staff,
    recommendations,
    videos,
    videoLoading,
    setVideoLoading,
    loading,
  } = useAnimeDataJikanApi(mal_id);

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
        <Layout youPage={true}>
          <AnimeDetailsDefault
            data={data}
            characters={characters}
            videos={videos}
            mal_id={mal_id}
            videoLoading={videoLoading}
            setVideoLoading={setVideoLoading}
            loading={loading}
            recommendations={recommendations}
            staff={staff}
          ></AnimeDetailsDefault>
        </Layout>
      );

    case "staff":
      return (
        <Layout>
          <MainAreaStaff data={data} characters={characters} staff={staff} />
        </Layout>
      );
  }
}
