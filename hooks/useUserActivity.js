import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { userActivityToast } from "@/components/settings/Toasts";
function useUserActivity() {
  const [watchlists, setWatchlists] = useState([]);
  const [watchlistsHasAnime, setWatchlistsHasAnime] = useState([]);
  const [selectedWatchlist, setSelectedWatchlist] = useState(null);
  const [likedAnime, setLikedAnime] = useState([]);
  const [likedPerson, setLikedPerson] = useState([]);
  const [history, setHistory] = useState([]);
  const jwt =
    typeof window !== "undefined" ? localStorage.getItem("jwt") : null;
  // fetchLikedAnime
  async function fetchLikedAnime(page = 1, limit = 6) {
    try {
      const response = await axios.get(
        `${process.env.API_URL}/userActivity/likedAnime`,
        {
          headers: { Authorization: `Bearer ${jwt}` },
          params: { page, limit },
        }
      );
      const data = response.data;
      setLikedAnime(data);
    } catch (error) {
      console.error("Error fetching likedAnime:", error);
    }
  }

  // Check if anime is liked
  const checkIsAnimeLiked = useCallback(
    async (mal_id) => {
      try {
        const response = await axios.get(
          `${process.env.API_URL}/userActivity/ifAnimeLiked/${mal_id}`,
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        );
        return response.data; // Assuming this is the boolean value true or false
      } catch (error) {
        console.error("Error checking if anime is liked:", error);
        return false; // You might want to return false or handle this case specifically in your UI
      }
    },
    [jwt]
  );

  // Add likedAnime
  async function addLikedAnime(mal_id) {
    try {
      const response = await axios.post(
        `${process.env.API_URL}/userActivity/likedAnimeAdd`,
        { mal_id },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error create watchlist:", error.response.data);
    }
  }

  // Delete likedAnime
  async function removeLikedAnime(mal_id) {
    try {
      const response = await axios.delete(
        `${process.env.API_URL}/userActivity/likedAnime/${mal_id}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error create watchlist:", error.response.data);
    }
  }

  //get likedPerson
  async function fetchLikedPerson(page = 1, limit = 6) {
    try {
      const response = await axios.get(
        `${process.env.API_URL}/userActivity/likedPerson`,
        {
          params: { page, limit },
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      const data = response.data;
      setLikedPerson(data);
    } catch (error) {
      console.error("Error fetching likedPerson:", error);
    }
  }

  // Add likedPerson
  async function addLikedPerson(mal_id) {
    try {
      await axios.post(
        `${process.env.API_URL}/userActivity/likedPersonAdd`,
        { mal_id },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.error("Error add likedPerson:", error);
    }
  }

  // Delete likedPerson
  async function removelikedPerson(mal_id) {
    try {
      await axios.delete(
        `${process.env.API_URL}/userActivity/likedPerson/${mal_id}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
    } catch (error) {
      console.error("Error delete likedPerson:", error);
    }
  }

  // fetchHistory
  async function fetchHistory(page, limit) {
    try {
      const response = await axios.get(
        `${process.env.API_URL}/userActivity/history`,
        {
          headers: { Authorization: `Bearer ${jwt}` },
          params: { page, limit },
        }
      );
      const data = response.data;
      setHistory(data.data);
    } catch (error) {
      console.error("Error fetching history:", error);
    }
  }

  // Add history
  async function addHistory(mal_id) {
    try {
      const response = await axios.post(
        `${process.env.API_URL}/userActivity/historyAdd`,
        { mal_id },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.error("Error adding history:", error);
    }
  }

  // Delete history
  async function removeHistory(mal_id) {
    try {
      await axios.delete(
        `${process.env.API_URL}/userActivity/history/${mal_id}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
    } catch (error) {
      console.error("Error deleting history:", error);
    }
  }

  //fetchSelectedWatchlist
  async function fetSelectedWatchlist(name, page = 1, limit = 6) {
    try {
      const response = await axios.get(
        `${process.env.API_URL}/userActivity/watchlist/${name}`,
        {
          headers: { Authorization: `Bearer ${jwt}` },
          params: { page, limit },
        }
      );
      const data = response.data;
      setSelectedWatchlist(data);
    } catch (error) {
      console.error("Error fetching watchlist:", error);
    }
  }

  //fetchwatchlists
  const fetchwatchlists = useCallback(
    async (page = 1, limit = 6) => {
      try {
        const response = await axios.get(
          `${process.env.API_URL}/userActivity/watchlists/`,
          {
            headers: { Authorization: `Bearer ${jwt}` },
            params: { page, limit },
          }
        );

        const data = response.data;

        setWatchlists(data);
      } catch (error) {
        console.error("Error fetching watchlists:", error);
      }
    },
    [jwt]
  );
  //create watchlist
  async function createWatchlist(name, mal_id = null, description = "") {
    try {
      const response = await axios.post(
        `${process.env.API_URL}/userActivity/watchlist/create`,
        { name, mal_id, description },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      userActivityToast("success", response.data.message);
    } catch (error) {
      console.error("Error create watchlist:", error.response.data);
      userActivityToast("error", error.response.data);
    }
  }

  // Delete watchlist
  async function removeWatchlist(name) {
    try {
      await axios.delete(
        `${process.env.API_URL}/userActivity/watchlist/${name}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
    } catch (error) {
      console.error("Error deleting watchlist:", error);
    }
  }

  //fetch Watchlists Containing Anime
  const fetchWatchlistsContainingAnime = useCallback(
    async (mal_id) => {
      try {
        const response = await axios.get(
          `${process.env.API_URL}/userActivity/animeInWatchlists/${mal_id}`,
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        );

        setWatchlistsHasAnime(response.data);
      } catch (error) {
        console.error("Error fetching watchlists containing anime:", error);
      }
    },
    [jwt]
  );
  // Add watchlistItem
  async function addWatchlistItem(name, mal_id) {
    try {
      const response = await axios.post(
        `${process.env.API_URL}/userActivity/watchlist/${name}/addItem`,
        { mal_id },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      userActivityToast("success", response.data.message);
    } catch (error) {
      console.error("Error adding item to watchlist:", error.response.data);
      userActivityToast("error", error.response.data);
    }
  }

  // Delete watchlistItem
  async function removeWatchlistItem(name, mal_id) {
    try {
      const response = await axios.delete(
        `${process.env.API_URL}/userActivity/watchlist/${name}/item/${mal_id}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      console.log(response.data);
      userActivityToast("success", response.data.message);
    } catch (error) {
      console.error("Error deleting watchlist item:", error.response.data);
      userActivityToast("error", error.response.data);
    }
  }

  //rename watchlist
  async function renameWatchlist(oldName, newName) {
    try {
      await axios.patch(
        `${process.env.API_URL}/userActivity/watchlist/rename/${oldName}`,
        { newName },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
    } catch (error) {
      console.error("Error rename watchlist:", error);
    }
  }

  //update description of watchlist
  async function updateWatchlistDescription(name, newDescription) {
    try {
      await axios.patch(
        `${process.env.API_URL}/userActivity/watchlist/updateDescription/${name}`,
        { newDescription },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
    } catch (error) {
      console.error("Error update description of watchlist:", error);
    }
  }

  // return state variables and functions
  return {
    // State variables
    likedAnime,
    likedPerson,
    history,
    watchlists,
    selectedWatchlist,

    watchlistsHasAnime,
    // Functions
    fetchLikedAnime,
    checkIsAnimeLiked,
    addLikedAnime,
    removeLikedAnime,
    fetchLikedPerson,
    addLikedPerson,
    removelikedPerson,
    fetchHistory,
    addHistory,
    removeHistory,
    fetSelectedWatchlist,
    fetchwatchlists,
    fetchWatchlistsContainingAnime,
    createWatchlist,

    removeWatchlist,

    addWatchlistItem,
    removeWatchlistItem,
    renameWatchlist,
    updateWatchlistDescription,
  };
}

export default useUserActivity;
