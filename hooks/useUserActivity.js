import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { UserActivityToast } from "@/components/layout/Toasts";
import { useDispatch, useSelector } from "react-redux";
import { getIdToken } from "@/utils/firebaseAuth";

function useUserActivity() {
  const isSensitiveFilterDisabled = useSelector(
    (state) => state.isSensitiveFilterDisabled.isSensitiveFilterDisabled
  );

  const fetchLikedAnime = useCallback(
    async (page, limit) => {
      try {
        const idToken = await getIdToken();
        const response = await axios.get(
          `${process.env.API_URL}/userActivity/likedAnime`,
          {
            headers: { Authorization: `Bearer ${idToken}` },
            params: { page, limit, isSensitiveFilterDisabled },
          }
        );
        const data = response.data;

        return data;
      } catch (error) {
        console.error("Error fetching likedAnime:", error);
      }
    },
    [isSensitiveFilterDisabled]
  );

  // Check if anime is liked
  const checkIsAnimeLiked = useCallback(async (mal_id) => {
    try {
      const idToken = await getIdToken();
      const response = await axios.get(
        `${process.env.API_URL}/userActivity/ifAnimeLiked/${mal_id}`,
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        }
      );
      return response.data; //isLiked:true/false
    } catch (error) {
      console.error("Error checking if anime is liked:", error);
    }
  }, []);

  // Add likedAnime
  async function addLikedAnime(mal_id) {
    try {
      const idToken = await getIdToken();
      const response = await axios.post(
        `${process.env.API_URL}/userActivity/likedAnimeAdd`,
        { mal_id },
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      process.env.SHOW_CONSOLE === "dev" && console.log(response.data);
    } catch (error) {
      console.error("Error create watchlist:", error.response.data);
    }
  }

  // Delete likedAnime
  async function removeLikedAnime(mal_id) {
    try {
      const idToken = await getIdToken();
      const response = await axios.delete(
        `${process.env.API_URL}/userActivity/likedAnime/${mal_id}`,
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        }
      );
      process.env.SHOW_CONSOLE === "dev" && console.log(response.data);
    } catch (error) {
      console.error("Error create watchlist:", error.response.data);
    }
  }

  //get likedPerson
  const fetchLikedPerson = useCallback(async (page, limit) => {
    try {
      const idToken = await getIdToken();
      const response = await axios.get(
        `${process.env.API_URL}/userActivity/likedPerson`,
        {
          params: { page, limit },
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        }
      );
      const data = response.data;

      return data;
    } catch (error) {
      console.error("Error fetching likedPerson:", error);
    }
  }, []);

  //checkIsPersonLiked
  const checkIsPersonLiked = useCallback(async (mal_id) => {
    try {
      const idToken = await getIdToken();
      const response = await axios.get(
        `${process.env.API_URL}/userActivity/ifPersonLiked/${mal_id}`,
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        }
      );
      return response.data; //isLiked:true/false
    } catch (error) {
      console.error("Error checking if person is favorite:", error);
    }
  }, []);
  // Add likedPerson
  async function addLikedPerson(mal_id) {
    try {
      const idToken = await getIdToken();
      const response = await axios.post(
        `${process.env.API_URL}/userActivity/likedPersonAdd`,
        { mal_id },
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      process.env.SHOW_CONSOLE === "dev" && console.log(response.data);
    } catch (error) {
      console.error("Error add likedPerson:", error);
    }
  }

  // Delete likedPerson
  async function removeLikedPerson(mal_id) {
    try {
      const idToken = await getIdToken();
      const response = await axios.delete(
        `${process.env.API_URL}/userActivity/likedPerson/${mal_id}`,
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        }
      );
      process.env.SHOW_CONSOLE === "dev" && console.log(response.data);
    } catch (error) {
      console.error("Error delete likedPerson:", error);
    }
  }

  // fetchHistory
  const fetchHistory = useCallback(async (page = 1, limit = 14) => {
    try {
      const idToken = await getIdToken();
      const response = await axios.get(
        `${process.env.API_URL}/userActivity/history`,
        {
          headers: { Authorization: `Bearer ${idToken}` },
          params: { page, limit },
        }
      );
      const data = response.data;

      return data;
    } catch (error) {
      console.error("Error fetching history:", error);
    }
  }, []);

  // Add history
  const addHistory = useCallback(async (mal_id) => {
    try {
      const idToken = await getIdToken();
      const response = await axios.post(
        `${process.env.API_URL}/userActivity/historyAdd`,
        { mal_id },
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      process.env.SHOW_CONSOLE === "dev" && console.log(response.data);
    } catch (error) {
      console.error("Error adding history:", error);
    }
  }, []);

  // Delete single history
  async function removeHistory(mal_id) {
    try {
      const idToken = await getIdToken();
      const response = await axios.delete(
        `${process.env.API_URL}/userActivity/history/${mal_id}`,
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        }
      );
      UserActivityToast("success", response.data.message);
    } catch (error) {
      console.error("Error deleting history:", error.response.data);
      UserActivityToast("error", error.response.data);
    }
  }

  // Delete all history
  async function removeAllHistory(mal_id) {
    try {
      const idToken = await getIdToken();
      const response = await axios.delete(
        `${process.env.API_URL}/userActivity/history`,
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        }
      );
      UserActivityToast("success", response.data.message);
    } catch (error) {
      console.error("Error deleting history:", error.response.data);
      UserActivityToast("error", error.response.data);
    }
  }

  //fetchSelectedWatchlist
  async function fetchSelectedWatchlist(name, page, limit) {
    try {
      const idToken = await getIdToken();
      const response = await axios.get(
        `${process.env.API_URL}/userActivity/watchlist/${name}`,
        {
          headers: { Authorization: `Bearer ${idToken}` },
          params: { page, limit, isSensitiveFilterDisabled },
        }
      );
      const data = response.data[0];

      return data;
    } catch (error) {
      console.error("Error fetching watchlist:", error);
    }
  }
  //fetch watchlists Without Anime details
  const fetchWatchlistsWithoutAnimeDetails = useCallback(async () => {
    try {
      const idToken = await getIdToken();
      const response = await axios.get(
        `${process.env.API_URL}/userActivity/watchlistsWithoutAnimeDetails/`,
        {
          headers: { Authorization: `Bearer ${idToken}` },
        }
      );

      const data = response.data;

      return data;
    } catch (error) {
      console.error("Error fetching watchlists:", error);
    }
  }, []);
  //fetchwatchlists
  const fetchWatchlists = useCallback(
    async (page, limit) => {
      try {
        const idToken = await getIdToken();
        const response = await axios.get(
          `${process.env.API_URL}/userActivity/watchlists/`,
          {
            headers: { Authorization: `Bearer ${idToken}` },
            params: { page, limit, isSensitiveFilterDisabled },
          }
        );

        const data = response.data;

        return data;
      } catch (error) {
        console.error("Error fetching watchlists:", error);
      }
    },
    [isSensitiveFilterDisabled]
  );
  //create watchlist
  async function createWatchlist(name, mal_id = null) {
    try {
      const idToken = await getIdToken();
      const response = await axios.post(
        `${process.env.API_URL}/userActivity/watchlist/create`,
        { name, mal_id },
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      process.env.SHOW_CONSOLE === "dev" && console.log(response.data);

      if (mal_id) {
        UserActivityToast("success", `Saved to ${name}`);
      } else {
        UserActivityToast("success", response.data.message);
      }
    } catch (error) {
      console.error("Error create watchlist:", error.response.data);
      UserActivityToast("error", error.response.data);
    }
  }

  // Delete watchlist
  async function removeWatchlist(name) {
    try {
      const idToken = await getIdToken();
      const response = await axios.delete(
        `${process.env.API_URL}/userActivity/watchlist/${name}`,
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        }
      );
      process.env.SHOW_CONSOLE === "dev" && console.log(response.data);
      UserActivityToast("success", `Watchlist deleted`);
      return true;
    } catch (error) {
      console.error("Error deleting watchlist:", error);
      UserActivityToast("error", error.response.data);
      return false;
    }
  }

  //fetch Watchlists Containing Anime
  const fetchWatchlistsContainingAnime = useCallback(async (mal_id) => {
    try {
      const idToken = await getIdToken();
      const response = await axios.get(
        `${process.env.API_URL}/userActivity/animeInWatchlists/${mal_id}`,
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("Error fetching watchlists containing anime:", error);
    }
  }, []);
  // Add watchlistItem
  async function addWatchlistItem(name, mal_id) {
    try {
      const idToken = await getIdToken();
      const response = await axios.post(
        `${process.env.API_URL}/userActivity/watchlist/${name}/addItem`,
        { mal_id },
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      process.env.SHOW_CONSOLE === "dev" && console.log(response.data);
      UserActivityToast("success", response.data.message);
    } catch (error) {
      console.error("Error adding item to watchlist:", error.response.data);
      UserActivityToast("error", error.response.data);
    }
  }

  // Delete watchlistItem
  async function removeWatchlistItem(name, mal_id) {
    try {
      const idToken = await getIdToken();
      const response = await axios.delete(
        `${process.env.API_URL}/userActivity/watchlist/${name}/item/${mal_id}`,
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        }
      );
      process.env.SHOW_CONSOLE === "dev" && console.log(response.data);
      UserActivityToast("success", response.data.message);
    } catch (error) {
      console.error("Error deleting watchlist item:", error.response.data);
      UserActivityToast("error", error.response.data);
    }
  }

  //rename watchlist
  async function renameWatchlist(oldName, newName) {
    try {
      const idToken = await getIdToken();
      const response = await axios.patch(
        `${process.env.API_URL}/userActivity/watchlist/rename/${oldName}`,
        { newName },
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        }
      );
      process.env.SHOW_CONSOLE === "dev" && console.log(response.data);
      UserActivityToast("success", `Name changed`);
      return true;
    } catch (error) {
      console.error("Error rename watchlist:", error);
      UserActivityToast("error", error.response.data);
      return false;
    }
  }

  //update description of watchlist
  async function updateWatchlistDescription(name, newDescription) {
    try {
      const idToken = await getIdToken();
      await axios.patch(
        `${process.env.API_URL}/userActivity/watchlist/updateDescription/${name}`,
        { newDescription },
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        }
      );
    } catch (error) {
      console.error("Error update description of watchlist:", error);
    }
  }

  // return state variables and functions
  return {
    // Functions
    fetchLikedAnime,
    checkIsAnimeLiked,
    addLikedAnime,
    removeLikedAnime,
    fetchLikedPerson,
    addLikedPerson,
    removeLikedPerson,
    checkIsPersonLiked,
    fetchHistory,
    addHistory,
    removeHistory,
    removeAllHistory,
    fetchSelectedWatchlist,
    fetchWatchlists,
    fetchWatchlistsWithoutAnimeDetails,
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
