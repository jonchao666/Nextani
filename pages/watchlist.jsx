import Layout from "@/components/layout/Layout";
import useUserActivity from "@/hooks/useUserActivity";
import { Image, Link, Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import WatchlistItemInfinityScoroll from "@/components/watchlist/WatchlistItemInfinityScoroll";

import LoginRequest from "@/components/auth/LoginRequest";
import { useRouter } from "next/router";

export default function Watchlist() {
  const [selectedWatchlist, setSelectedWatchlist] = useState(null);

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const router = useRouter();
  const { name } = router.query;

  if (!isAuthenticated) {
    return <LoginRequest />;
  }

  return (
    <Layout>
      <div>
        <h2 className="text-4xl font-bold text-ellipsis overflow-hidden  whitespace-nowrap">
          {name}
        </h2>
        {selectedWatchlist && selectedWatchlist.items.length === 0 ? (
          <div className="flex justify-center">
            <p className="text-sm py-4">No animes in this watchlist yet</p>
          </div>
        ) : (
          <WatchlistItemInfinityScoroll
            selectedWatchlist={selectedWatchlist}
            setSelectedWatchlist={setSelectedWatchlist}
            name={name}
          />
        )}
      </div>
    </Layout>
  );
}
