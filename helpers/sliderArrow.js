import { Button, Link } from "@nextui-org/react";

function SampleNextArrow(props) {
  const { onClick, slideCount, currentSlide, slidesToShow } = props;
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
        className="material-symbols-outlined"
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

export { SampleNextArrow, SamplePrevArrow };
