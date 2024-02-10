import ImageCard from "@/components/ImageCard";
import { Button, Link } from "@nextui-org/react";
import { CircularProgress } from "@nextui-org/react";
import { useEffect, useState } from "react";
import useUserActivity from "@/hooks/useUserActivity";

export default function History({ colToShow }) {
  let numToShow = 2 * parseInt(colToShow.split("-")[2]);
  numToShow = numToShow > 14 ? 14 : numToShow;

  const { fetchHistory } = useUserActivity();

  const [history, setHistory] = useState(null);
  const [isHistoryEmpty, setIsHistoryEmpty] = useState(false);

  useEffect(() => {
    async function fetchData() {
      let data = await fetchHistory();

      setHistory(data);

      setIsHistoryEmpty(data && data.length === 0);
    }
    fetchData();
  }, [fetchHistory]);

  return (
    <div className="border-b-1 py-6">
      <div className="flex justify-between items-center">
        <div className="flex">
          <span
            className="material-symbols-outlined mr-4"
            style={{
              fontVariationSettings: `"FILL" 0, "wght" 250, "GRAD" 0, "opsz" 24`,
            }}
          >
            history
          </span>
          <h3 className="text-xl font-bold">History</h3>
        </div>
        {!isHistoryEmpty && (
          <Button
            as={Link}
            href="/history"
            variant="light"
            color="primary"
            radius="full"
            className="font-medium text-sm h-9"
          >
            See all
          </Button>
        )}
      </div>
      {isHistoryEmpty ? (
        <div className="text-sm text-gray-600 dark:text-[rgb(170,170,170)] mt-2">
          Animes you view will show up here.
        </div>
      ) : (
        <div className={`w-full grid ${colToShow} gap-y-6 gap-x-1 mt-4 `}>
          {history ? (
            history
              .slice(0, numToShow)
              .map((data, index) => (
                <ImageCard
                  key={index}
                  data={data.animeDetail}
                  smallSize={true}
                />
              ))
          ) : (
            <CircularProgress size="sm" color="default" label="Loading..." />
          )}
        </div>
      )}
    </div>
  );
}
