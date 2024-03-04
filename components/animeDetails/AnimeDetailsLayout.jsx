import DetailsPanel from "@/components/animeDetails/detailsPanel/DetailsPanel";
import AnimeInformation from "@/components/animeDetails/AnimeInformation";
import Layout from "@/components/layout/Layout";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchUserData } from "@/reducers/userSlice";
import { useResponsive } from "@/hooks/useResponsive";
import { setPageName } from "@/reducers/pageNameSlice";
import { Skeleton } from "@nextui-org/react";
import { CircularProgress } from "@nextui-org/react";

export default function AnimeDetailsLayout({
  children,
  data,
  characters,
  videos,
  mal_id,
  videoLoading,
  setVideoLoading,
  loading,
}) {
  const dispatch = useDispatch();
  const { isXs } = useResponsive();
  const [videoUrl, setVideoUrl] = useState("");
  const isMobileDevice = useSelector((state) => state.isMobile.isMobileDevice);

  const mainCharacters = [];
  const jwt =
    typeof window !== "undefined" ? localStorage.getItem("jwt") : null;

  useEffect(() => {
    if (jwt) {
      dispatch(fetchUserData(jwt));
    }
  }, [jwt, dispatch]);

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

      setPV(tempPV);
      setVideoUrl(
        tempPV[0].trailer.embed_url.replace("autoplay=1", "autoplay=0")
      );
    }
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
    <Layout youPage={true}>
      {loading && (
        <div className="fixed z-20 top-0 left-0 bg-background h-screen w-screen  ">
          <div className="h-5/6 flex justify-center items-center">
            <CircularProgress
              size="sm"
              color="primary"
              aria-label="Loading..."
            />
          </div>
        </div>
      )}
      <div className="flex justify-center">
        <main className="  w-full h-full max-w-[1280px] ">
          {videos && videos.length > 0 && (
            <Skeleton
              className={`aspect-video w-full h-full ${
                isMobileDevice || !isXs ? "" : "rounded-xl mt-6"
              } `}
              isLoaded={!videoLoading}
            >
              <iframe
                onClick={(e) => videoLoading && e.preventDefault()}
                id="videoIframe"
                className={`aspect-video w-full h-full ${
                  isMobileDevice || !isXs ? "" : "rounded-xl"
                } `}
                src={videoUrl}
                title={videos.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </Skeleton>
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
            {children}
          </div>
        </main>
      </div>
    </Layout>
  );
}
