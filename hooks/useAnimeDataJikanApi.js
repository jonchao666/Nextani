// hooks/useAnimeData.js
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
export default function useAnimeDataJikanApi(mal_id) {
  const [data, setData] = useState(null);
  const [recommendations, setRecommendations] = useState(null);
  const [staff, setStaff] = useState(null);
  const [characters, setCharacters] = useState(null);
  const [videos, setVideos] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const router = useRouter();
  const maxRetries = 3;
  const isSensitiveFilterDisabled = useSelector(
    (state) => state.isSensitiveFilterDisabled.isSensitiveFilterDisabled
  );
  useEffect(() => {
    if (!mal_id) {
      return;
    }
    const fetchVideos = async () => {
      try {
        const videosData = await axios.get(
          `https://api.jikan.moe/v4/anime/${mal_id}/videos`
        );
        setVideos(videosData.data.data.promo);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };
    const fetchData = async () => {
      try {
        const [animeData, recsData, charsData, staffData] = await Promise.all([
          axios.get(`${process.env.API_URL}/anime`, {
            params: {
              mal_id,
              select: true,
              isSensitiveFilterDisabled: isSensitiveFilterDisabled,
            },
            headers: { "X-API-Key": process.env.API_KEY },
          }),
          axios.get(`https://api.jikan.moe/v4/anime/${mal_id}/recommendations`),
          axios.get(`https://api.jikan.moe/v4/anime/${mal_id}/characters`),
          axios.get(`https://api.jikan.moe/v4/anime/${mal_id}/staff`),
        ]);

        setData(animeData.data[0].apiData);
        setRecommendations(recsData.data.data);
        setCharacters(charsData.data);
        setStaff(staffData.data.data);
        setTimeout(fetchVideos, 1000);
      } catch (error) {
        console.error("Error fetching data:", error);

        if (retryCount < maxRetries) {
          setTimeout(() => {
            setRetryCount((prevCount) => prevCount + 1);
          }, 1000);
        } else {
          router.push("/errorPage");
        }
      }
    };

    fetchData();
  }, [mal_id, retryCount, isSensitiveFilterDisabled, router]);

  return {
    data,
    recommendations,
    staff,
    characters,
    videos,
  };
}
