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
  const [isLoadingData, setIsLoadingData] = useState(false);
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
      setIsLoadingData(true);
      let loadingData = true;
      //show loading after 700ms
      const delaySetLoading = async () => {
        await new Promise((resolve) => setTimeout(resolve, 700));
        if (loadingData) {
          setLoading(true);
          setVideoLoading(true);
        }
      };

      delaySetLoading();

      const fetchAnimeDetails = async () => {
        const cacheKey = `anime-details-${mal_id}`;
        const cachedData = localStorage.getItem(cacheKey);

        if (cachedData) {
          const { data, timestamp } = JSON.parse(cachedData);
          const isExpired = Date.now() - timestamp > 12 * 60 * 60 * 1000;

          if (!isExpired) {
            setData(data);
            setLoading(false);
            setIsLoadingData(false);
            return;
          }
        }
        const result = await fetchWithRetry(`${process.env.API_URL}/anime`, {
          params: { mal_id, select: true, isSensitiveFilterDisabled },
          headers: { "X-API-Key": process.env.API_KEY },
        });

        setData(result.data[0].apiData);
        setLoading(false);
        setIsLoadingData(false);
        localStorage.setItem(
          cacheKey,
          JSON.stringify({
            data: result.data[0].apiData,
            timestamp: Date.now(),
          })
        );
      };

      const fetchVideos = async () => {
        const cacheKey = `anime-videos-${mal_id}`;
        const cachedData = localStorage.getItem(cacheKey);

        if (cachedData) {
          const { data, timestamp } = JSON.parse(cachedData);
          const isExpired = Date.now() - timestamp > 12 * 60 * 60 * 1000;

          if (!isExpired) {
            setVideos(data);
            setVideoLoading(false);
            return;
          }
        }
        const result = await fetchWithRetry(
          `https://api.jikan.moe/v4/anime/${mal_id}/videos`,
          {
            timeout: 5000,
          }
        );
        setVideos(result.data.data.promo);
        setVideoLoading(false);
        localStorage.setItem(
          cacheKey,
          JSON.stringify({
            data: result.data.data.promo,
            timestamp: Date.now(),
          })
        );
      };

      const fetchCharacters = async () => {
        const cacheKey = `anime-characters-${mal_id}`;
        const cachedData = localStorage.getItem(cacheKey);

        if (cachedData) {
          const { data, timestamp } = JSON.parse(cachedData);
          const isExpired = Date.now() - timestamp > 12 * 60 * 60 * 1000;

          if (!isExpired) {
            setCharacters(data);
            return;
          }
        }
        const result = await fetchWithRetry(
          `https://api.jikan.moe/v4/anime/${mal_id}/characters`,
          {
            timeout: 5000,
          }
        );
        setCharacters(result.data);
        localStorage.setItem(
          cacheKey,
          JSON.stringify({ data: result.data, timestamp: Date.now() })
        );
      };

      const fetchStaff = async () => {
        const cacheKey = `anime-staff-${mal_id}`;
        const cachedData = localStorage.getItem(cacheKey);

        if (cachedData) {
          const { data, timestamp } = JSON.parse(cachedData);
          const isExpired = Date.now() - timestamp > 12 * 60 * 60 * 1000;

          if (!isExpired) {
            setStaff(data);
            return;
          }
        }
        const result = await fetchWithRetry(
          `https://api.jikan.moe/v4/anime/${mal_id}/staff`,
          {
            timeout: 5000,
          }
        );
        setStaff(result.data.data);
        localStorage.setItem(
          cacheKey,
          JSON.stringify({ data: result.data.data, timestamp: Date.now() })
        );
      };

      const fetchRecommendations = async () => {
        const cacheKey = `anime-recommendations-${mal_id}`;
        const cachedData = localStorage.getItem(cacheKey);

        if (cachedData) {
          const { data, timestamp } = JSON.parse(cachedData);
          const isExpired = Date.now() - timestamp > 12 * 60 * 60 * 1000;

          if (!isExpired) {
            setRecommendations(data);
            return;
          }
        }
        const result = await fetchWithRetry(
          `${process.env.API_URL}/anime/recommendations`,
          {
            params: { mal_id, isSensitiveFilterDisabled, limit: 12 },
            headers: { "X-API-Key": process.env.API_KEY },
          }
        );
        setRecommendations(result.data);
        localStorage.setItem(
          cacheKey,
          JSON.stringify({ data: result.data, timestamp: Date.now() })
        );
      };

      fetchAnimeDetails();
      fetchVideos();
      fetchCharacters();
      fetchStaff();
      fetchRecommendations();

      loadingData = false;
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
    isLoadingData,
  };
}
