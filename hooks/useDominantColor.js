import { useState, useEffect } from "react";
import ColorThief from "colorthief";

const useDominantColor = (imgUrl) => {
  const [color, setColor] = useState("#606060"); // 默认颜色

  useEffect(() => {
    if (typeof window !== "undefined" && imgUrl) {
      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.src = imgUrl;

      img.onload = () => {
        const colorThief = new ColorThief();
        let dominantColor = colorThief.getColor(img);
        const adjustedColor = adjustColorBrightness(dominantColor);
        setColor(`rgb(${adjustedColor.join(",")})`);
      };
    }
  }, [imgUrl]);

  return color;
};

function adjustColorBrightness(rgbArray) {
  const brightness = calculateBrightness(rgbArray);
  if (brightness > 200) {
    return rgbArray.map((color) => Math.max(0, Math.min(255, color * 0.5)));
  } else if (brightness < 100) {
    return rgbArray.map((color) => Math.max(0, Math.min(255, color * 1.5)));
  }
  return rgbArray;
}

function calculateBrightness([r, g, b]) {
  return (r * 299 + g * 587 + b * 114) / 1000;
}

export default useDominantColor;
