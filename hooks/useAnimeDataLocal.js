import { useEffect, useState } from "react";

export default function useAnimeDataLocal() {
  const [data, setData] = useState(null);

  async function fetchData(mal_id) {
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
  }

  return {
    fetchData,
    data,
  };
}
