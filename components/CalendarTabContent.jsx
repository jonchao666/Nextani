import ImageCard from "@/components/ImageCard";
import { useState, useEffect } from "react";
import { Button } from "@nextui-org/react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useResponsive } from "../hooks/useResponsive";

export default function CalendarTabContent({ data }) {
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
            currentSlide === slideCount - slidesToShow ? "none" : "block",
        }}
        className="z-30 bg-background dark:bg-default-100 hover:bg-default dark:hover:bg-default-300 absolute top-[145px] -right-4  
          text-xl   rounded-full w-10 h-10 p-0   shadow-sliderArrow
         "
      >
        &gt;
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
        style={{ display: currentSlide === 0 ? "none" : "block" }}
        className="z-30 bg-background dark:bg-default-100 hover:bg-default dark:hover:bg-default-300 absolute top-[145px] -left-5  
          text-xl  rounded-full w-10 h-10 p-0 shadow-sliderArrow
          "
      >
        &lt;
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
    autoplaySpeed: 10000,
    beforeChange: (next) => setCurrentSlide(next),
  };

  return (
    <Slider {...settings}>
      {data && data.map((d) => <ImageCard key={d._id} data={d} ep={true} />)}
    </Slider>
  );
}
