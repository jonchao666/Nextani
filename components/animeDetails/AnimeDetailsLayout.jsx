import DetailsPanel from "@/components/animeDetails/detailsPanel/DetailsPanel";

import AnimeInformation from "@/components/animeDetails/AnimeInformation";
import Header from "@/components/layout/Header";
import { useSelector, useDispatch } from "react-redux";
import { setShowSidebar, toggleSidebar } from "@/reducers/sidebarSlice";
import Sidebar from "@/components/layout/Sidebar";
import { useEffect, useState } from "react";
import { fetchUserData } from "@/reducers/userSlice";

export default function AnimeDetailsLayout({
  children,
  data,
  characters,
  videos,
  mal_id,
}) {
  const dispatch = useDispatch();
  const showSidebar = useSelector((state) => state.sidebar.showSidebar);
  const [videoUrl, setVideoUrl] = useState("");
  useEffect(() => {
    dispatch(setShowSidebar(false));
  }, [dispatch]);

  const mainCharacters = [];
  const jwt =
    typeof window !== "undefined" ? localStorage.getItem("jwt") : null;

  useEffect(() => {
    if (jwt) {
      dispatch(fetchUserData(jwt));
    }
  }, [jwt, dispatch]);

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
    <div>
      {showSidebar && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] z-40" />
      )}
      <Header toggleSidebar={() => dispatch(toggleSidebar())} />
      {showSidebar ? (
        <Sidebar
          absolute={true}
          toggleSidebar={() => dispatch(toggleSidebar())}
        />
      ) : null}
      <div className="h-16"></div>
      <div className="flex justify-center">
        <main className="ml-6 pt-6 pr-6 pb-6 w-full h-full max-w-[1280px] ">
          {data.trailer && data.trailer.embed_url && (
            <iframe
              className="aspect-video w-full h-full rounded-xl "
              src={
                videoUrl === ""
                  ? data.trailer.embed_url.replace("autoplay=1", "autoplay=0")
                  : videoUrl
              }
              title={data.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          )}
          <DetailsPanel
            data={data}
            mainCharacters={mainCharacters}
            videos={videos}
            synopsisWithoutLastParagraph={synopsisWithoutLastParagraph}
            setVideoUrl={setVideoUrl}
            mal_id={mal_id}
          />
          <div className="flex flex-col sm:flex-row mt-6 w-full">
            <AnimeInformation data={data} />
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
