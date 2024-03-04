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

      //show loading after 1s
      const delaySetLoading = async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        if (isLoadingData) {
          setLoading(true);
          setVideoLoading(true);
        }
      };

      delaySetLoading();

      const requests = [
        fetchWithRetry(`${process.env.API_URL}/anime`, {
          params: { mal_id, select: true, isSensitiveFilterDisabled },
          headers: { "X-API-Key": process.env.API_KEY },
        }),
        fetchWithRetry(`https://api.jikan.moe/v4/anime/${mal_id}/videos`, {
          timeout: 3000,
        }),
        fetchWithRetry(`https://api.jikan.moe/v4/anime/${mal_id}/characters`, {
          timeout: 3000,
        }),
        fetchWithRetry(`https://api.jikan.moe/v4/anime/${mal_id}/staff`, {
          timeout: 3000,
        }),
        // 更新获取推荐信息的请求以匹配你的后端API端点
        fetchWithRetry(`${process.env.API_URL}/anime/recommendations`, {
          params: { mal_id, isSensitiveFilterDisabled },
          headers: { "X-API-Key": process.env.API_KEY },
        }),
      ];

      const results = await Promise.allSettled(requests);
      results.forEach((result, index) => {
        if (result.status === "fulfilled") {
          switch (index) {
            case 0:
              setData(result.value.data[0].apiData);
              break;
            case 1:
              setVideos(result.value.data.data.promo);
              break;
            case 2:
              setCharacters(result.value.data);
              break;
            case 3:
              setStaff(result.value.data.data);
              break;
            case 4:
              setRecommendations(result.value.data);
              break;
          }
          isLoadingData = false;
          setLoading(false);
        } else {
          console.error(`Request ${index} failed:`, result.reason);
          // Handle failure as appropriate
        }
      });
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
