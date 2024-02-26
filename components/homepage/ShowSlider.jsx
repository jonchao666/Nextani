import { Button, Link } from "@nextui-org/react";
import { useEffect, useState } from "react";
import Slider from "react-slick";

import ImageCard from "../layout/ImageCard";
import { useResponsive } from "@/hooks/useResponsive";
import { useTheme } from "next-themes";
import { useSelector, useDispatch } from "react-redux";
import { SampleNextArrow, SamplePrevArrow } from "@/helpers/sliderArrow";
function ShowSlider({ data, title, category }) {
  const [isMounted, setIsMounted] = useState(false);

  const { isXl, isLg, isMd, isSm, isXs } = useResponsive();
  const [slidesToShow, setSlidesToShow] = useState(1);
  const isMobileDevice = useSelector((state) => state.isMobile.isMobileDevice);

  useEffect(() => {
    // 根据屏幕尺寸更新 slidesToShow 的值
    const newSlidesToShow = isXl
      ? 6
      : isLg
      ? 5
      : isMd
      ? 4
      : isSm
      ? 3
      : isXs
      ? 2
      : 1;
    setSlidesToShow(newSlidesToShow);
  }, [isXl, isLg, isMd, isSm, isXs]);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Slider settings
  const settings = {
    dots: false,
    infinite: false,
    lazyLoad: "ondemand",
    speed: 200,
    slidesToShow: slidesToShow,
    slidesToScroll: slidesToShow,
    nextArrow: <SampleNextArrow slidesToShow={slidesToShow} />,
    prevArrow: <SamplePrevArrow />,
    autoplay: false,

    draggable: false,
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className="mx-auto w-full border-b-1 pb-6  dark:border-[rgba(255,255,255,0.2)]">
      <div
        className={` flex items-center justify-between  ${
          isMobileDevice || !isXs ? "mt-3 px-3" : "mt-5"
        }  `}
      >
        <span
          className={`  font-bold line-clamp-1 ${
            isMobileDevice || !isXs ? "text-lg" : "text-xl"
          }  `}
        >
          {title}
        </span>

        <Button
          variant={isMobileDevice || !isXs ? "bordered" : "light"}
          radius="full"
          color={isMobileDevice || !isXs ? "default" : "primary"}
          size={isMobileDevice || !isXs ? "sm" : "md"}
          className={` hover:opacity-100  font-medium ${
            isMobileDevice || !isXs ? "text-sm border-1" : "h-9"
          }`}
          href={`/animeIndex?category=${category}`}
          as={Link}
        >
          View All
        </Button>
      </div>

      {isMobileDevice || !isXs ? (
        <div
          className={`mt-2.5 px-3 flex overflow-x-auto touch-pan gap-3 overflow-hidden ${
            isMobileDevice ? "scrollbar-hide" : ""
          }`}
        >
          {data &&
            data.map((item, index) => (
              <ImageCard key={index} data={item} smallSize={true} />
            ))}
        </div>
      ) : (
        <Slider {...settings} className="mt-5  ">
          {data &&
            data.map((item, index) => <ImageCard key={index} data={item} />)}
        </Slider>
      )}
    </div>
  );
}
export default ShowSlider;
