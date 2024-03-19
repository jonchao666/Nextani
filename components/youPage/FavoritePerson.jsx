import { Button } from "@nextui-org/react";
import Link from "next/link";
import { CircularProgress } from "@nextui-org/react";
import { useEffect, useState } from "react";
import useUserActivity from "@/hooks/useUserActivity";
import { useSelector } from "react-redux";
import FavoritePersonCard from "./FavoritePersonCard";
import { useResponsive } from "@/hooks/useResponsive";

export default function FavoritePerson({ colToShow }) {
  const numToShow = parseInt(colToShow.split("-")[2]);
  const { fetchLikedPerson } = useUserActivity();
  const [likedPerson, setLikedPerson] = useState(null);
  const [isLikedPersonEmpty, setIsLikedPersonEmpty] = useState(false);
  const isMobileDevice = useSelector((state) => state.isMobile.isMobileDevice);
  const [loading, setLoading] = useState(false);
  const { isXs } = useResponsive();
  useEffect(() => {
    async function fetchData() {
      let isLoadingData = true;
      //show loading after 1s
      const delaySetLoading = async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        if (isLoadingData) {
          setLoading(true);
        }
      };
      delaySetLoading();
      let data = await fetchLikedPerson();
      isLoadingData = false;
      setLoading(false);

      setLikedPerson(data);

      setIsLikedPersonEmpty(data && data.length === 0);
    }
    fetchData();
  }, [fetchLikedPerson]);

  return (
    <div>
      {likedPerson && (
        <div
          className={`border-b-1 dark:border-[rgba(255,255,255,0.2)] ${
            isMobileDevice || !isXs ? "pb-6 pt-3" : "py-5"
          }`}
        >
          <div
            className={`flex justify-between items-center ${
              isMobileDevice || !isXs ? "px-3" : ""
            }`}
          >
            <div className="flex items-center">
              <span
                className="material-symbols-outlined mr-4"
                style={{
                  fontVariationSettings: `"FILL" 0, "wght" 250, "GRAD" 0, "opsz" 24`,
                }}
              >
                favorite
              </span>
              <h3
                className={
                  isMobileDevice || !isXs
                    ? "text-lg font-bold"
                    : "text-xl font-bold"
                }
              >
                Favorite people
              </h3>
            </div>
            {!isLikedPersonEmpty && (
              <Button
                variant={isMobileDevice || !isXs ? "bordered" : "light"}
                radius="full"
                color={isMobileDevice || !isXs ? "default" : "primary"}
                size={isMobileDevice || !isXs ? "sm" : "md"}
                className={` hover:opacity-100  font-medium ${
                  isMobileDevice || !isXs ? "text-sm border-1" : "h-9"
                }`}
                href="/likedPeople"
                as={Link}
              >
                View All
              </Button>
            )}
          </div>
          {isLikedPersonEmpty ? (
            <div
              className={`text-sm text-[rgb(96,96,96)] dark:text-[rgb(170,170,170)] mt-2 ${
                isMobileDevice || !isXs ? "px-3" : ""
              }`}
            >
              Use the favorite icon to save people. Your list shows up right
              here.
            </div>
          ) : loading ? (
            <CircularProgress
              size="sm"
              color="default"
              aria-label="Loading..."
              className="mx-auto "
            />
          ) : likedPerson ? (
            isMobileDevice || !isXs ? (
              <div
                className={`mt-2.5 px-3 flex overflow-x-auto touch-pan gap-3 overflow-hidden ${
                  isMobileDevice ? "scrollbar-hide" : ""
                }`}
              >
                {likedPerson.map((data, index) => (
                  <FavoritePersonCard key={index} data={data} />
                ))}
              </div>
            ) : (
              <div className={` grid ${colToShow} gap-y-6 gap-x-1 mt-4 `}>
                {likedPerson.slice(0, numToShow).map((data, index) => (
                  <FavoritePersonCard key={index} data={data} />
                ))}
              </div>
            )
          ) : null}
        </div>
      )}
    </div>
  );
}
