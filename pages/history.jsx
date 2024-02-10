import Layout from "@/components/layout/Layout";
import useUserActivity from "@/hooks/useUserActivity";
import { Image, Link, Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import HistoryInfinityScoroll from "@/components/history/HistoryInfinityScoroll";

import LoginRequest from "@/components/auth/LoginRequest";

export default function History() {
  const { fetchHistory, removeAllHistory } = useUserActivity();
  const [history, setHistory] = useState(null);
  const [showDelete, setShowDelete] = useState(false);
  const [deleteAllLoading, setDeleteAllLoading] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const handleDeleteAllHistory = async () => {
    setDeleteAllLoading(true);
    await removeAllHistory();
    setDeleteAllLoading(false);
    setShowDelete(false);
    setHistory([]);
  };

  if (!isAuthenticated) {
    return <LoginRequest />;
  }
  return (
    <Layout>
      {showDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40">
          <div className="absolute  z-20 bg-background  dark:bg-[rgb(40,40,40)] shadow-lg top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl">
            <div className="my-6">
              <p className="px-6 text-md">Clear view history?</p>
              <p className="mt-4 px-6 text-gray-600 dark:text-[rgb(170,170,170)]">
                Your all NextAni view history will be cleared.
              </p>
            </div>
            <div className=" flex justify-end pr-2 mb-2">
              <Button
                onClick={() => setShowDelete(false)}
                radius="full"
                variant="light"
                className="mr-2 h-9 text-sm font-medium"
              >
                Cancel
              </Button>
              <Button
                isLoading={deleteAllLoading}
                onClick={() => handleDeleteAllHistory()}
                radius="full"
                variant="light"
                color="primary"
                className="h-9 text-sm font-medium"
              >
                Clear view history
              </Button>
            </div>
          </div>
        </div>
      )}
      <div>
        <div className="flex justify-between items-center">
          <h2 className="text-4xl font-bold ">Watch history</h2>
          <Button
            isDisabled={history && history.length === 0}
            onClick={() => setShowDelete(true)}
            variant="light"
            radius="full"
            className="font-medium text-sm h-9"
          >
            <span
              className="material-symbols-outlined "
              style={{
                fontVariationSettings: `"FILL" 0, "wght" 250, "GRAD" 0, "opsz" 24`,
              }}
            >
              delete
            </span>{" "}
            <p className="-ml-1">Clear all history</p>
          </Button>
        </div>
        <div>
          {history && history.length === 0 ? (
            <div className="flex justify-center">
              <p className="text-sm py-4">Animes you view will show up here.</p>
            </div>
          ) : (
            <HistoryInfinityScoroll history={history} setHistory={setHistory} />
          )}
        </div>
      </div>
    </Layout>
  );
}
