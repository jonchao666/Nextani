import { useCallback, useEffect, useState } from "react";
import axios from "axios";
export default function useAnimeDataLocal() {
  const [data, setData] = useState(null);

  const fetchData = useCallback(async (mal_id) => {
    let params = {};

    params.mal_id = mal_id;

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
    }
  }, []);
  return {
    fetchData,
    data,
  };
}
