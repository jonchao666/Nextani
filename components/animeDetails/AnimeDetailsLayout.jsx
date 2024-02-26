import DetailsPanel from "@/components/animeDetails/detailsPanel/DetailsPanel";

import AnimeInformation from "@/components/animeDetails/AnimeInformation";
import Layout from "@/components/layout/Layout";
import { useSelector, useDispatch } from "react-redux";

import Sidebar from "@/components/layout/Sidebar";
import { useEffect, useState } from "react";
import { fetchUserData } from "@/reducers/userSlice";
import { useResponsive } from "@/hooks/useResponsive";
export default function AnimeDetailsLayout({
  children,
  data,
  characters,
  videos,
  mal_id,
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

  if (!data) return null;
  return (
    <Layout youPage={true}>
      <div className="flex justify-center">
        <main className="  w-full h-full max-w-[1280px] ">
          {data.trailer && data.trailer.embed_url ? (
            <iframe
              className={`aspect-video w-full h-full ${
                isMobileDevice || !isXs ? "" : "rounded-xl mt-6"
              } `}
              src={videoUrl}
              title={data.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : null}

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
