import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useRouter } from "next/router";

export default function useSearch(initialQuery = "", delay = 500) {
  const [query, setQuery] = useState(initialQuery);
  const router = useRouter();
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchStart, setSearchStart] = useState(false);
  const isSensitiveFilterDisabled = useSelector(
    (state) => state.isSensitiveFilterDisabled.isSensitiveFilterDisabled
  );
  const [showResults, setShowResults] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = useRef(null);
  const blurTimeoutRef = useRef();
  // 防抖逻辑
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedQuery(query);
    }, delay);

    return () => clearTimeout(timerId);
  }, [query, delay]);

  const handleFocus = () => {
    if (blurTimeoutRef.current) {
      clearTimeout(blurTimeoutRef.current);
    }
    setIsSearchFocused(true);
  };

  const handleBlur = () => {
    blurTimeoutRef.current = setTimeout(() => {
      setIsSearchFocused(false);
    }, 150); // 150ms delay
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      router.push(`/searchResult?debouncedQuery=${query}`);
    }
  };

  const handleSearchClick = () => {
    if (query) {
      router.push(`/searchResult?debouncedQuery=${query}`);
      setShowInput(false);
    }
  };

  useEffect(() => {
    setSearchStart(true);
    const fetchData = async () => {
      if (debouncedQuery) {
        let isLoadingData = true;
        //show loading after 700ms
        const delaySetLoading = async () => {
          await new Promise((resolve) => setTimeout(resolve, 700));
          if (isLoadingData) {
            setIsLoading(true);
          }
        };
        delaySetLoading();
        try {
          const response = await axios.get(
            `${process.env.API_URL}/anime/search?query=${debouncedQuery}&limit=10`,
            {
              params: {
                isSensitiveFilterDisabled,
              },

              headers: { "X-API-Key": process.env.API_KEY },
            }
          );
          const data = await response.data;
          setResults(data);
        } catch (error) {
          console.error("Error fetching search results:", error);
        } finally {
          isLoadingData = false;
          setIsLoading(false);
          setSearchStart(false);
        }
      } else {
        setResults([]);
      }
    };

    fetchData();
  }, [debouncedQuery, isSensitiveFilterDisabled]);

  return {
    query,
    setQuery,
    results,
    isLoading,
    searchStart,
    showResults,
    setShowResults,
    isSearchFocused,
    handleSearchClick,
    handleFocus,
    handleBlur,
    handleKeyDown,
    searchRef,
  };
}
