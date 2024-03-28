import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchUserData, clearUserData } from "@/reducers/userSlice";
import {
  fetchIsSensitiveFilterDisabled,
  resetSensitiveFilterSettings,
} from "@/reducers/sensitiveFilterSlice";
import { checkIsMobileState } from "@/reducers/isMobileSlice";
import { observeAuthState } from "@/utils/firebaseAuth";
import { useRouter } from "next/router";
import clearExpiredLocalStorageData from "@/utils/clearExpiredLocalStorageData";

export default function AuthInitializer() {
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    clearExpiredLocalStorageData();
    const unsubscribe = observeAuthState((user) => {
      if (user) {
        dispatch(fetchUserData());
        dispatch(fetchIsSensitiveFilterDisabled());
      } else {
        dispatch(clearUserData());
        dispatch(resetSensitiveFilterSettings());
      }
      dispatch(checkIsMobileState());
    });

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [dispatch, router]);

  return null;
}
