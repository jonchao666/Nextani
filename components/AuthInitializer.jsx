import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchUserData } from "@/reducers/userSlice";
import { fetchIsSensitiveFilterDisabled } from "@/reducers/sensitiveFilterSlice";
import { verifyAuth } from "@/reducers/authSlice";
import { checkIsMobileState } from "@/reducers/isMobileSlice";
import { useRouter } from "next/router";

export default function AuthInitializer() {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const checkState = () => {
      const jwt =
        typeof window !== "undefined" ? localStorage.getItem("jwt") : null;
      dispatch(verifyAuth());
      dispatch(checkIsMobileState());
      if (jwt) {
        dispatch(fetchUserData(jwt));
        dispatch(fetchIsSensitiveFilterDisabled(jwt));
      }
    };

    checkState();
  }, [dispatch, router.pathname]);

  return null;
}
