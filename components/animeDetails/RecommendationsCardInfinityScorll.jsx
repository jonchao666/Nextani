import React, { useState, useEffect } from "react";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import RecommendationsCard from "./RecommendationsCard";
import { CircularProgress } from "@nextui-org/react";
import { Button } from "@nextui-org/react";

export default function RecommendationsCardInfinityScorll({ recommendations }) {
  const [displayedImages, setDisplayedImages] = useState([]);
  const [lastIndex, setLastIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [isViewAll, setIsViewAll] = useState(false);
  const [showViewAll, setShowViewAll] = useState(true);
  const batchSize = 18;

  const loadMoreImages = () => {
    if (loading || !hasMoreData) {
      return;
    }
    setLoading(true);

    const nextImages = recommendations.slice(lastIndex, lastIndex + batchSize);
    setDisplayedImages((prevImages) => [...prevImages, ...nextImages]);
    setLastIndex(lastIndex + batchSize);

    setHasMoreData(lastIndex < recommendations.length - 1);
    setLoading(false);
  };

  useEffect(() => {
    if (recommendations) {
      setDisplayedImages([]); // 重置数据
      setLastIndex(0); // 重置页码
      setHasMoreData(true); // 重置是否有更多数据的标志
      setIsViewAll(false);
      setShowViewAll(recommendations.length > 6);
    }
  }, [recommendations]);

  const lastElementRef = useInfiniteScroll(loadMoreImages);

  const handleViewAllClick = () => {
    setIsViewAll(!isViewAll);
  };
  return (
    <div className="mb-6">
      <div className="text-sm font-medium mb-2.5 flex justify-between items-center">
        <h3>Recommendations</h3>
        <Button
          variant="light"
          color="primary"
          radius="full"
          size="sm"
          onClick={handleViewAllClick}
          className="text-sm text-primary  cursor-pointer font-medium"
        >
          {showViewAll ? (isViewAll ? "View Less" : "View All") : ""}
        </Button>
      </div>
      <div
        className={
          showViewAll
            ? isViewAll
              ? "w-full justify-between  grid   grid-cols-[repeat(auto-fill,154px)] gap-x-2 gap-y-6"
              : "w-full justify-between  grid max-h-[269px] overflow-hidden grid-cols-[repeat(auto-fill,154px)] gap-x-2 gap-y-6"
            : "w-full justify-between  grid grid-cols-[repeat(auto-fill,154px)] gap-x-2 gap-y-6"
        }
      >
        {displayedImages.map((item, index) => (
          <RecommendationsCard key={index} data={item} />
        ))}
      </div>
      {loading && (
        <CircularProgress
          className="mx-auto"
          color="default"
          aria-label="Loading..."
        />
      )}
      <div ref={lastElementRef} className="h-1" />
    </div>
  );
}
