import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

export default function useAnimeDataJikanApi(mal_id) {
  const [data, setData] = useState(null);
  const [staff, setStaff] = useState(null);
  const [characters, setCharacters] = useState(null);
  const [videos, setVideos] = useState(null);
  const [recommendations, setRecommendations] = useState(null); // 新增状态用于存储推荐信息
  const [videoLoading, setVideoLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const isSensitiveFilterDisabled = useSelector(
    (state) => state.isSensitiveFilterDisabled.isSensitiveFilterDisabled
  );

  useEffect(() => {
    if (!mal_id) {
      return;
    }

    const fetchWithRetry = async (url, config, retries = 5) => {
      for (let i = 0; i < retries; i++) {
        try {
          return await axios.get(url, config);
        } catch (error) {
          if (i === retries - 1) throw error;
          await new Promise((resolve) => setTimeout(resolve, 1000 * 2 ** i)); // Exponential backoff
        }
      }
    };

    const fetchCombinedData = async () => {
      let isLoadingData = true;

      //show loading after 700ms
      const delaySetLoading = async () => {
        await new Promise((resolve) => setTimeout(resolve, 700));
        if (isLoadingData) {
          setLoading(true);
          setVideoLoading(true);
        }
      };

      delaySetLoading();

      const fetchAnimeDetails = async () => {
        const result = await fetchWithRetry(`${process.env.API_URL}/anime`, {
          params: { mal_id, select: true, isSensitiveFilterDisabled },
          headers: { "X-API-Key": process.env.API_KEY },
        });

        setData(result.data[0].apiData);
        setLoading(false);
      };

      const fetchVideos = async () => {
        const result = await fetchWithRetry(
          `https://api.jikan.moe/v4/anime/${mal_id}/videos`,
          {
            timeout: 5000,
          }
        );
        setVideos(result.data.data.promo);
        setVideoLoading(false);
      };

      const fetchCharacters = async () => {
        const result = await fetchWithRetry(
          `https://api.jikan.moe/v4/anime/${mal_id}/characters`,
          {
            timeout: 5000,
          }
        );
        setCharacters(result.data);
      };

      const fetchStaff = async () => {
        const result = await fetchWithRetry(
          `https://api.jikan.moe/v4/anime/${mal_id}/staff`,
          {
            timeout: 5000,
          }
        );
        setStaff(result.data.data);
      };

      const fetchRecommendations = async () => {
        const result = await fetchWithRetry(
          `${process.env.API_URL}/anime/recommendations`,
          {
            params: { mal_id, isSensitiveFilterDisabled, limit: 12 },
            headers: { "X-API-Key": process.env.API_KEY },
          }
        );
        setRecommendations(result.data);
      };

      fetchAnimeDetails();
      fetchVideos();
      fetchCharacters();
      fetchStaff();
      fetchRecommendations();
      isLoadingData = false;
      setLoading(false);
    };

    fetchCombinedData();
  }, [mal_id, isSensitiveFilterDisabled]);

  return {
    data,
    staff,
    characters,
    videos,
    recommendations,
    videoLoading,
    setVideoLoading,
    loading,
  };
}
