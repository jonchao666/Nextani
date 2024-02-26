import Layout from "@/components/layout/Layout";
import useUserActivity from "@/hooks/useUserActivity";
import { Image, Link, Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LikedAnimeInfinityScoroll from "@/components/favorite/LikedAnimeInfinityScoroll";
import { setPageName } from "@/reducers/pageNameSlice";
import LoginRequest from "@/components/auth/LoginRequest";
import { useResponsive } from "@/hooks/useResponsive";
export default function LikedAnime() {
  const [likedAnime, setLikedAnime] = useState(null);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isMobileDevice = useSelector((state) => state.isMobile.isMobileDevice);
  const { isXs } = useResponsive();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPageName("Favorite anime"));
  }, [dispatch]);
  if (!isAuthenticated) {
    return <LoginRequest />;
  }
  return (
    <Layout>
      <div className={isMobileDevice || !isXs ? "px-3 mb-6" : "mb-6"}>
        {isMobileDevice || !isXs ? null : (
          <div className="flex justify-between items-center">
            <h2 className="text-4xl font-bold pt-6">Favorite anime</h2>
          </div>
        )}
        <div>
          {likedAnime && likedAnime.length === 0 ? (
            <div className="flex justify-center">
              <p className="text-sm py-4">
                Animes you Favorite will show up here.
              </p>
            </div>
          ) : (
            <LikedAnimeInfinityScoroll
              likedAnime={likedAnime}
              setLikedAnime={setLikedAnime}
            />
          )}
        </div>
      </div>
    </Layout>
  );
}
