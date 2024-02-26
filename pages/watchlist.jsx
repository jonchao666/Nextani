import Layout from "@/components/layout/Layout";
import useUserActivity from "@/hooks/useUserActivity";
import { Image, Link, Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import WatchlistItemInfinityScoroll from "@/components/watchlist/WatchlistItemInfinityScoroll";
import { useResponsive } from "@/hooks/useResponsive";
import LoginRequest from "@/components/auth/LoginRequest";
import { useRouter } from "next/router";
import { setPageName } from "@/reducers/pageNameSlice";
export default function Watchlist() {
  const dispatch = useDispatch();
  const [selectedWatchlist, setSelectedWatchlist] = useState(null);
  const isMobileDevice = useSelector((state) => state.isMobile.isMobileDevice);
  const { isXs } = useResponsive();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const router = useRouter();
  const { name } = router.query;

  useEffect(() => {
    dispatch(setPageName(name));
  }, [dispatch, name]);

  if (!isAuthenticated) {
    return <LoginRequest />;
  }

  return (
    <Layout>
      <div className={isMobileDevice || !isXs ? "px-3" : ""}>
        {isMobileDevice || !isXs ? null : (
          <h2 className="text-4xl font-bold text-ellipsis overflow-hidden  whitespace-nowrap pt-6">
            {name}
          </h2>
        )}
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
