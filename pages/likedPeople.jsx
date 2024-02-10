import Layout from "@/components/layout/Layout";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LikedPeopleInfinityScoroll from "@/components/favorite/LikedPeopleInfinityScoroll";

import LoginRequest from "@/components/auth/LoginRequest";
export default function LikedPeople() {
  const [likedPerson, setLikedPerson] = useState(null);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (!isAuthenticated) {
    return <LoginRequest />;
  }
  return (
    <Layout>
      <div>
        <div className="flex justify-between items-center">
          <h2 className="text-4xl font-bold ">Liked people</h2>
        </div>
        <div>
          {likedPerson && likedPerson.length === 0 ? (
            <div className="flex justify-center">
              <p className="text-sm py-4">
                People you liked will show up here.
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
