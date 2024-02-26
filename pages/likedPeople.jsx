import Layout from "@/components/layout/Layout";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LikedPeopleInfinityScoroll from "@/components/favorite/LikedPeopleInfinityScoroll";
import { setPageName } from "@/reducers/pageNameSlice";
import LoginRequest from "@/components/auth/LoginRequest";
import { useResponsive } from "@/hooks/useResponsive";
export default function LikedPeople() {
  const [likedPerson, setLikedPerson] = useState(null);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isMobileDevice = useSelector((state) => state.isMobile.isMobileDevice);
  const { isXs } = useResponsive();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPageName("Favorite people"));
  }, [dispatch]);
  if (!isAuthenticated) {
    return <LoginRequest />;
  }
  return (
    <Layout>
      <div className={isMobileDevice || !isXs ? "px-3 mb-6" : "mb-6"}>
        {isMobileDevice || !isXs ? null : (
          <div className="flex justify-between items-center">
            <h2 className="text-4xl font-bold pt-6">Favorite people</h2>
          </div>
        )}
        <div>
          {likedPerson && likedPerson.length === 0 ? (
            <div className="flex justify-center">
              <p className="text-sm py-4">
                People you Favorite will show up here.
              </p>
            </div>
          ) : (
            <LikedPeopleInfinityScoroll
              likedPerson={likedPerson}
              setLikedPerson={setLikedPerson}
            />
          )}
        </div>
      </div>
    </Layout>
  );
}
