import { useState, useEffect } from "react";

export default function useSearch(initialQuery = "", delay = 500) {
  const [query, setQuery] = useState(initialQuery);
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // 防抖逻辑
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedQuery(query);
    }, delay);

    return () => clearTimeout(timerId);
  }, [query, delay]);

  // 执行搜索
  useEffect(() => {
    const fetchData = async () => {
      if (debouncedQuery) {
        setIsLoading(true);
        try {
          const response = await fetch(
            `${process.env.API_URL}/anime/search?query=${debouncedQuery}&limit=10`,
            {
              headers: { "X-API-Key": process.env.API_KEY },
            }
          );
          const data = await response.json();
          setResults(data);
        } catch (error) {
          console.error("Error fetching search results:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchData();
  }, [debouncedQuery]);

  return { query, setQuery, results, isLoading };
}
