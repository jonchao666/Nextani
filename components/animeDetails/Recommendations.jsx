import React, { useState, useEffect } from "react";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import RecommendationsCard from "./RecommendationsCard";
import { CircularProgress } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { useResponsive } from "@/hooks/useResponsive";
import { useSelector, useDispatch } from "react-redux";

export default function Recommendations({ recommendations }) {
  const isMobileDevice = useSelector((state) => state.isMobile.isMobileDevice);

  const { isXs } = useResponsive();
  return (
    <div className={`mb-3 ${isMobileDevice && "px-3"}`}>
      {recommendations.length > 0 && (
        <div className=" font-medium mb-3 ">
          <h3>Recommendations</h3>
        </div>
      )}
      {isMobileDevice || !isXs ? (
        <div
          className={`flex overflow-x-auto touch-pan-x gap-3 overflow-hidden ${
            isMobileDevice ? "scrollbar-hide" : ""
          } pb-3`}
        >
          {recommendations.slice(0, 12).map((item, index) => (
            <RecommendationsCard key={index} data={item} />
          ))}
        </div>
      ) : (
        <div className="flex flex-wrap gap-x-1 gap-y-6">
          {recommendations.slice(0, 12).map((item, index) => (
            <RecommendationsCard key={index} data={item} />
          ))}
        </div>
      )}
    </div>
  );
}
