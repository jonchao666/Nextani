import { Button, Link } from "@nextui-org/react";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ImageCard from "./ImageCard";
import { useResponsive } from "../hooks/useResponsive";
import { useTheme } from "next-themes";

function ShowSlider({ data, title, category }) {
  const { theme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const { isXl, isLg, isMd, isSm, isXs } = useResponsive();
  const [slidesToShow, setSlidesToShow] = useState(1);

  function SampleNextArrow(props) {
    const { onClick, slideCount, currentSlide } = props;
    return (
      <Button
        onClick={onClick}
        variant="solid"
        isIconOnly
        style={{
          display:
            currentSlide === slideCount - slidesToShow ? "none" : "inline-flex",
        }}
        className="z-30 bg-background dark:bg-default-100 hover:bg-default dark:hover:bg-default-300 absolute top-[145px] -right-4  
           rounded-full   shadow-sliderArrow
         "
      >
        <span
          className={`material-symbols-outlined`}
          style={{
            fontVariationSettings: `"FILL" 0, "wght" 250, "GRAD" 0, "opsz" 24`,
          }}
        >
          navigate_next
        </span>
      </Button>
    );
  }

  function SamplePrevArrow(props) {
    const { currentSlide, onClick } = props;
    return (
      <Button
        onClick={onClick}
        variant="solid"
        isIconOnly
        style={{ display: currentSlide === 0 ? "none" : "inline-flex" }}
        className="z-30 bg-background dark:bg-default-100 hover:bg-default dark:hover:bg-default-300 absolute top-[145px] -left-5  
           rounded-full  shadow-sliderArrow 
          "
      >
        <span
          className="material-symbols-outlined "
          style={{
            fontVariationSettings: `"FILL" 0, "wght" 250, "GRAD" 0, "opsz" 24`,
          }}
        >
          navigate_before
        </span>
      </Button>
    );
  }

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

  if (!isMounted) {
    return null;
  }
  // Slider settings
  const settings = {
    dots: false,
    infinite: false,
    lazyLoad: "ondemand",
    speed: 200,
    slidesToShow: slidesToShow,
    slidesToScroll: slidesToShow,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    autoplay: false,

    draggable: false,
    beforeChange: (next) => setCurrentSlide(next),
  };

  return (
    <div className="mx-auto w-full  border-t-1  dark:border-customGray">
      <div className="mt-5   flex items-center justify-between">
        <span className="text-xl  font-bold line-clamp-1">{title}</span>

        <Button
          variant={theme === "light" ? "light" : "ghost"}
          radius="full"
          color="primary"
          className="border-none"
          href={`/category?category=${category}`}
          as={Link}
        >
          View All
        </Button>
      </div>

      <Slider {...settings} className="mt-5 mb-6 bg-background">
        {data && data.map((item) => <ImageCard key={item._id} data={item} />)}
      </Slider>
    </div>
  );
}
export default ShowSlider;
