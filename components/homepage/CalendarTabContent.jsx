import ImageCard from "@/components/layout/ImageCard";
import { useState, useEffect } from "react";
import { Button } from "@nextui-org/react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useResponsive } from "../../hooks/useResponsive";
import { useSelector } from "react-redux";

export default function CalendarTabContent({ data }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { isXl, isLg, isMd, isSm, isXs } = useResponsive();
  const [slidesToShow, setSlidesToShow] = useState(1);
  const isMobileDevice = useSelector((state) => state.isMobile.isMobileDevice);

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
        className="z-30 bg-background dark:bg-default-100 hover:bg-default dark:hover:bg-default-300 absolute top-[145px] -right-5 
           rounded-full   shadow-sliderArrow
         "
      >
        <span
          className="material-symbols-outlined "
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
           rounded-full shadow-sliderArrow
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

  return isMobileDevice || !isXs ? (
    <div
      className={`flex px-3  overflow-x-auto touch-pan gap-3 overflow-hidden ${
        isMobileDevice ? "scrollbar-hide" : ""
      }`}
    >
      {data &&
        data.map((d) => (
          <ImageCard key={d._id} data={d} ep={true} smallSize={true} />
        ))}
    </div>
  ) : (
    <Slider {...settings}>
      {data && data.map((d) => <ImageCard key={d._id} data={d} ep={true} />)}
    </Slider>
  );
}
