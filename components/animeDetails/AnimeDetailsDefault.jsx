import DetailsPanel from "@/components/animeDetails/detailsPanel/DetailsPanel";
import AnimeInformation from "@/components/animeDetails/AnimeInformation";
import Layout from "@/components/layout/Layout";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchUserData } from "@/reducers/userSlice";
import { useResponsive } from "@/hooks/useResponsive";
import { setPageName } from "@/reducers/pageNameSlice";
import { Image } from "@nextui-org/react";
import { CircularProgress } from "@nextui-org/react";
import MainAreaDefault from "@/components/animeDetails/mainArea/MainAreaDefault";

export default function AnimeDetailsLayout({
  staff,
  data,
  characters,
  videos,
  mal_id,
  videoLoading,
  setVideoLoading,
  loading,
  recommendations,
}) {
  const dispatch = useDispatch();
  const { isXs } = useResponsive();
  const [videoUrl, setVideoUrl] = useState("");

  const isMobileDevice = useSelector((state) => state.isMobile.isMobileDevice);

  const mainCharacters = [];

  useEffect(() => {
    if (data) {
      dispatch(setPageName(data.title));
    } else {
      setPageName("home");
    }
  }, [dispatch, data]);

  useEffect(() => {
    const iframe = document.getElementById("videoIframe");
    const handleLoad = () => {
      setVideoLoading(false);
    };
    if (iframe) {
      iframe.addEventListener("load", handleLoad);
    }
    return () => {
      if (iframe) {
        iframe.removeEventListener("load", handleLoad);
      }
    };
  }, [videos, setVideoLoading]);

  const [PV, setPV] = useState(null);
  useEffect(() => {
    let tempPV = [];

    if (videos && videos.length > 0) {
      for (let i = videos.length - 1; i >= 0; i--) {
        if (videos[i].title.startsWith("Character")) continue;
        tempPV.push(videos[i]);
      }
      setVideoUrl(
        tempPV[0]?.trailer.embed_url.replace("autoplay=1", "autoplay=0")
      );
    }

    setPV(tempPV);
  }, [videos]);

  if (characters && characters.data) {
    for (let character of characters.data) {
      if (character.role !== "Main") {
        break;
      }
      mainCharacters.push([
        character.character.name,
        character.voice_actors.length > 0
          ? character.voice_actors[0].person.name
          : null,
      ]);
    }
  }

  let synopsisWithoutLastParagraph;
  if (data && data.synopsis) {
    const paragraphs = data.synopsis.split("\n");
    if (paragraphs[paragraphs.length - 1] === "[Written by MAL Rewrite]") {
      paragraphs.pop();
    }
    if (paragraphs[paragraphs.length - 1] === "") {
      paragraphs.pop();
    }
    synopsisWithoutLastParagraph = paragraphs.join("\n");
  }

  return (
    <div>
      {loading && (
        <div className="fixed z-20 top-0 left-0 bg-background h-dvh w-dvw  ">
          <div className="h-5/6 flex justify-center items-center">
            <CircularProgress
              size="sm"
              color="default"
              aria-label="Loading..."
            />
          </div>
        </div>
      )}
      <div className="flex justify-center">
        <main className="  w-full h-full  ">
          {videos && videos.length > 0 && (
            <div className="relative">
              {videoLoading && (
                <div
                  className={
                    isMobileDevice || !isXs
                      ? "absolute inset-0  bg-black dark:bg-[rgb(24,24,27)] "
                      : "absolute inset-0 rounded-xl bg-black dark:bg-[rgb(24,24,27)] "
                  }
                ></div>
              )}
              <iframe
                onClick={(e) => videoLoading && e.preventDefault()}
                id="videoIframe"
                className={`aspect-video w-full h-full ${
                  isMobileDevice || !isXs ? "" : "rounded-xl"
                }`}
                src={videoUrl}
                title={videos.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}

          <DetailsPanel
            data={data}
            mainCharacters={mainCharacters}
            videos={videos}
            synopsisWithoutLastParagraph={synopsisWithoutLastParagraph}
            setVideoUrl={setVideoUrl}
            mal_id={mal_id}
            PV={PV}
          />
          <div
            className={`flex flex-col  mt-6 w-full ${
              isMobileDevice || !isXs ? "flex-row" : "md:flex-row"
            }`}
          >
            <AnimeInformation data={data} />
            <MainAreaDefault
              data={data}
              characters={characters}
              staff={staff}
              recommendations={recommendations}
            />
          </div>
        </main>
      </div>
    </div>
  );
}