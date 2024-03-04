import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
export default function useAnimeDataLocal() {
  const [data, setData] = useState(null);

  const isSensitiveFilterDisabled = useSelector(
    (state) => state.isSensitiveFilterDisabled.isSensitiveFilterDisabled
  );
  const fetchData = useCallback(
    async (mal_id, retryCount = 0) => {
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
        const maxRetries = 5; // Maximum number of retries
        if (retryCount < maxRetries) {
          setTimeout(
            () => fetchData(mal_id, retryCount + 1),
            1000 * 2 ** retryCount
          ); // Exponential backoff
        } else {
          console.error("Max retries reached for fetching characters data");
        }
      }
    },
    [isSensitiveFilterDisabled]
  );
  return {
    fetchData,
    data,
  };
}
