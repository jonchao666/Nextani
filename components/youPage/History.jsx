import ImageCard from "@/components/layout/ImageCard";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { CircularProgress } from "@nextui-org/react";
import { useEffect, useState } from "react";
import useUserActivity from "@/hooks/useUserActivity";
import { useSelector } from "react-redux";
import { useResponsive } from "@/hooks/useResponsive";
export default function History({ colToShow }) {
  let numToShow = 2 * parseInt(colToShow.split("-")[2]);
  numToShow = numToShow > 14 ? 14 : numToShow;

  const { fetchHistory } = useUserActivity();
  const [history, setHistory] = useState(null);
  const [isHistoryEmpty, setIsHistoryEmpty] = useState(false);
  const isMobileDevice = useSelector((state) => state.isMobile.isMobileDevice);
  const { isXs } = useResponsive();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      let isLoadingData = true;
      //show loading after 700ms
      const delaySetLoading = async () => {
        await new Promise((resolve) => setTimeout(resolve, 700));
        if (isLoadingData) {
          setLoading(true);
        }
      };
      delaySetLoading();
      let data = await fetchHistory();
      isLoadingData = false;
      setLoading(false);

      setHistory(data);

      setIsHistoryEmpty(data && data.length === 0);
    }
    fetchData();
  }, [fetchHistory]);

  return (
    <div>
      {loading && (
        <div className="fixed z-20 top-0 left-0 bg-background h-dvh w-dvw  ">
          <div className="h-5/6 flex justify-center items-center">
            <CircularProgress
              size="sm"
              color="default"
              aria-label="Loading..."
            />
          </div>
        </div>
      )}
      {history && (
        <div
          className={`border-b-1 dark:border-[rgba(255,255,255,0.2)] ${
            isMobileDevice || !isXs ? "pb-6 " : "py-5"
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
                history
              </span>
              <h3
                className={
                  isMobileDevice || !isXs
                    ? "text-lg font-bold"
                    : "text-xl font-bold"
                }
              >
                History
              </h3>
            </div>
            {!isHistoryEmpty && (
              <Button
                variant={isMobileDevice || !isXs ? "bordered" : "light"}
                radius="full"
                color={isMobileDevice || !isXs ? "default" : "primary"}
                size={isMobileDevice || !isXs ? "sm" : "md"}
                className={` hover:opacity-100  font-medium ${
                  isMobileDevice || !isXs ? "text-sm border-1" : "h-9"
                }`}
                href="/history"
                as={Link}
              >
                View All
              </Button>
            )}
          </div>
          {isHistoryEmpty ? (
            <div
              className={`text-sm text-[rgb(96,96,96)] dark:text-[rgb(170,170,170)] mt-2 ${
                isMobileDevice || !isXs ? "px-3" : ""
              }`}
            >
              Animes you view will show up here.
            </div>
          ) : loading ? (
            <CircularProgress
              size="sm"
              color="default"
              aria-label="Loading..."
              className="mx-auto"
            />
          ) : history ? (
            isMobileDevice || !isXs ? (
              <div
                className={`mt-2.5 px-3 flex overflow-x-auto touch-pan gap-3 overflow-hidden ${
                  isMobileDevice ? "scrollbar-hide" : ""
                }`}
              >
                {history.map((data, index) => (
                  <ImageCard
                    key={index}
                    data={data.animeDetail}
                    smallSize={true}
                  />
                ))}
              </div>
            ) : (
              <div className={`grid ${colToShow} gap-y-6 gap-x-1 mt-4 `}>
                {history.slice(0, numToShow).map((data, index) => (
                  <ImageCard
                    key={index}
                    data={data.animeDetail}
                    smallSize={true}
                  />
                ))}
              </div>
            )
          ) : null}
        </div>
      )}
    </div>
  );
}
