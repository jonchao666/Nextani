import { useResponsive } from "@/hooks/useResponsive";
import { useSelector } from "react-redux";
import ImageCard from "@/components/layout/ImageCard";
import { Button, Link } from "@nextui-org/react";
export default function Recommendations({ recommendations, data }) {
  const isMobileDevice = useSelector((state) => state.isMobile.isMobileDevice);

  const { isXs } = useResponsive();
  return (
    <div className={`mb-3 ${isMobileDevice && "px-3"}`}>
      {data && recommendations.length > 0 && (
        <div className=" font-medium mb-1.5 flex justify-between items-center">
          <h3>Recommendations</h3>

          {recommendations.length >= 7 && (
            <Button
              variant={isMobileDevice || !isXs ? "bordered" : "light"}
              radius="full"
              color={isMobileDevice || !isXs ? "default" : "primary"}
              size={isMobileDevice || !isXs ? "sm" : "md"}
              className={` hover:opacity-100  font-medium ${
                isMobileDevice || !isXs ? "text-sm border-1" : "h-9"
              }`}
              as={Link}
              href={`/recommendations?mal_id=${data.mal_id}`}
            >
              View all
            </Button>
          )}
        </div>
      )}
      {isMobileDevice || !isXs ? (
        <div
          className={`flex overflow-x-auto touch-pan-x gap-3 overflow-hidden ${
            isMobileDevice ? "scrollbar-hide" : ""
          } pb-3`}
        >
          {recommendations.map((item, index) => (
            <ImageCard key={index} data={item} smallSize={true} />
          ))}
        </div>
      ) : (
        <div className="flex flex-wrap gap-x-1 gap-y-6">
          {recommendations.map((item, index) => (
            <ImageCard key={index} data={item} smallSize={true} />
          ))}
        </div>
      )}
    </div>
  );
}
