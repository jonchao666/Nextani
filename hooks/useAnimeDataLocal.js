import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
export default function useAnimeDataLocal() {
  const [data, setData] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 3;
  const isSensitiveFilterDisabled = useSelector(
    (state) => state.isSensitiveFilterDisabled.isSensitiveFilterDisabled
  );
  const fetchData = useCallback(
    async (mal_id) => {
      let params = {};

      params.mal_id = mal_id;
      params.isSensitiveFilterDisabled = isSensitiveFilterDisabled;
      try {
        const response = await axios.get(`${process.env.API_URL}/anime`, {
          params,
          headers: {
            "X-API-Key": process.env.API_KEY,
          },
        });

        setData(response.data);
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
    },
    [isSensitiveFilterDisabled, retryCount]
  );
  return {
    fetchData,
    data,
  };
}
