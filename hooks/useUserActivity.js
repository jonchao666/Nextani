import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { UserActivityToast } from "@/components/settings/Toasts";
import { useDispatch, useSelector } from "react-redux";

function useUserActivity() {
  const jwt =
    typeof window !== "undefined" ? localStorage.getItem("jwt") : null;
  // fetchLikedAnime
  const fetchLikedAnime = useCallback(
    async (page, limit) => {
      try {
        const response = await axios.get(
          `${process.env.API_URL}/userActivity/likedAnime`,
          {
            headers: { Authorization: `Bearer ${jwt}` },
            params: { page, limit },
          }
        );
        const data = response.data;

        return data;
      } catch (error) {
        console.error("Error fetching likedAnime:", error);
      }
    },
    [jwt]
  );

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
        return response.data; //isLiked:true/false
      } catch (error) {
        console.error("Error checking if anime is liked:", error);
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
  const fetchLikedPerson = useCallback(
    async (page, limit) => {
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
        return data;
      } catch (error) {
        console.error("Error fetching likedPerson:", error);
      }
    },
    [jwt]
  );

  //checkIsPersonLiked
  const checkIsPersonLiked = useCallback(
    async (mal_id) => {
      try {
        const response = await axios.get(
          `${process.env.API_URL}/userActivity/ifPersonLiked/${mal_id}`,
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        );
        return response.data; //isLiked:true/false
      } catch (error) {
        console.error("Error checking if person is favorite:", error);
      }
    },
    [jwt]
  );
  // Add likedPerson
  async function addLikedPerson(mal_id) {
    try {
      const response = await axios.post(
        `${process.env.API_URL}/userActivity/likedPersonAdd`,
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
      console.error("Error add likedPerson:", error);
    }
  }

  // Delete likedPerson
  async function removeLikedPerson(mal_id) {
    try {
      const response = await axios.delete(
        `${process.env.API_URL}/userActivity/likedPerson/${mal_id}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error delete likedPerson:", error);
    }
  }

  // fetchHistory
  const fetchHistory = useCallback(
    async (page = 1, limit = 14) => {
      try {
        const response = await axios.get(
          `${process.env.API_URL}/userActivity/history`,
          {
            headers: { Authorization: `Bearer ${jwt}` },
            params: { page, limit },
          }
        );
        const data = response.data;

        return data;
      } catch (error) {
        console.error("Error fetching history:", error);
      }
    },
    [jwt]
  );

  // Add history
  const addHistory = useCallback(
    async (mal_id) => {
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
        console.log(response.data);
      } catch (error) {
        console.error("Error adding history:", error);
      }
    },
    [jwt]
  );

  // Delete single history
  async function removeHistory(mal_id) {
    try {
      const response = await axios.delete(
        `${process.env.API_URL}/userActivity/history/${mal_id}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
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
      const response = await axios.delete(
        `${process.env.API_URL}/userActivity/history`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
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
      const response = await axios.get(
        `${process.env.API_URL}/userActivity/watchlist/${name}`,
        {
          headers: { Authorization: `Bearer ${jwt}` },
          params: { page, limit },
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
      const response = await axios.get(
        `${process.env.API_URL}/userActivity/watchlistsWithoutAnimeDetails/`,
        {
          headers: { Authorization: `Bearer ${jwt}` },
        }
      );

      const data = response.data;

      return data;
    } catch (error) {
      console.error("Error fetching watchlists:", error);
    }
  }, [jwt]);
  //fetchwatchlists
  const fetchWatchlists = useCallback(
    async (page, limit) => {
      try {
        const response = await axios.get(
          `${process.env.API_URL}/userActivity/watchlists/`,
          {
            headers: { Authorization: `Bearer ${jwt}` },
            params: { page, limit },
          }
        );

        const data = response.data;

        return data;
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
      const response = await axios.delete(
        `${process.env.API_URL}/userActivity/watchlist/${name}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      console.log(response.data);
      UserActivityToast("success", `Watchlist deleted`);
      return true;
    } catch (error) {
      console.error("Error deleting watchlist:", error);
      UserActivityToast("error", error.response.data);
      return false;
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

        return response.data;
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
      UserActivityToast("success", response.data.message);
    } catch (error) {
      console.error("Error adding item to watchlist:", error.response.data);
      UserActivityToast("error", error.response.data);
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
      UserActivityToast("success", response.data.message);
    } catch (error) {
      console.error("Error deleting watchlist item:", error.response.data);
      UserActivityToast("error", error.response.data);
    }
  }

  //rename watchlist
  async function renameWatchlist(oldName, newName) {
    try {
      const response = await axios.patch(
        `${process.env.API_URL}/userActivity/watchlist/rename/${oldName}`,
        { newName },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      console.log(response.data);
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

  // local login
  async function localLogin(email, password) {
    try {
      const response = await axios.post(
        `${process.env.API_URL}/auth/localLogin`,
        {
          email,
          password,
        }
      );
      console.log("Login Successful");

      return response.data.token;
    } catch (error) {
      console.error("Error login:", error);
      return false;
    }
  }

  //localSignUp
  const localSignUp = useCallback(async (token) => {
    try {
      await axios.post(`${process.env.API_URL}/auth/localSignUp`, {
        token,
      });
      console.log("Registration Successful");
      return true;
    } catch (error) {
      console.error("Error login:", error);
      return false;
    }
  }, []);

  //localVerifyEmail
  async function localVerifyEmail(email, password) {
    try {
      await axios.post(`${process.env.API_URL}/auth/localVerifyEmail`, {
        email,
        password,
      });
    } catch (error) {
      console.error("Error login:", error);
      return error.response.data;
    }
  }

  // return state variables and functions
  return {
    localLogin,
    localSignUp,
    localVerifyEmail,

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
