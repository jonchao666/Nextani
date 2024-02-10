import Layout from "@/components/layout/Layout";
import useUserActivity from "@/hooks/useUserActivity";
import { Image, Link, Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LikedAnimeInfinityScoroll from "@/components/favorite/LikedAnimeInfinityScoroll";

import LoginRequest from "@/components/auth/LoginRequest";
export default function LikedAnime() {
  const [likedAnime, setLikedAnime] = useState(null);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (!isAuthenticated) {
    return <LoginRequest />;
  }
  return (
    <Layout>
      <div>
        <div className="flex justify-between items-center">
          <h2 className="text-4xl font-bold ">Liked anime</h2>
        </div>
        <div>
          {likedAnime && likedAnime.length === 0 ? (
            <div className="flex justify-center">
              <p className="text-sm py-4">
                Animes you liked will show up here.
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
