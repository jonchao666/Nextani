import Header from "./Header";

import { useSelector, useDispatch } from "react-redux";

import { useEffect, useState } from "react";
import { useResponsive } from "@/hooks/useResponsive";

import Footer from "./Footer";

const Layout = ({ children, youPage }) => {
  const dispatch = useDispatch();
  const { isXl, isLg, isMd, isSm, isXs } = useResponsive();
  const [mainWidth, setMainWidth] = useState();
  const isMobileDevice = useSelector((state) => state.isMobile.isMobileDevice);

  //main area width
  useEffect(() => {
    const width = isMobileDevice
      ? "100vw"
      : isXl
      ? youPage
        ? "1260px"
        : "1280px"
      : isLg
      ? youPage
        ? "1102px"
        : "1066px"
      : isMd
      ? youPage
        ? "786px"
        : "852px"
      : isSm
      ? youPage
        ? "628px"
        : "638px"
      : isXs
      ? youPage
        ? "470px"
        : "424px"
      : "100vw";
    setMainWidth(width);
  }, [isXl, isLg, isMd, isSm, isXs, youPage, isMobileDevice]);
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return null;
  }
  return (
    <div className="h-screen flex flex-col">
      <Header width={mainWidth} />
      <div className={isMobileDevice || !isXs ? "min-h-12" : "min-h-14"}></div>
      <main
        className={
          isMobileDevice || !isXs
            ? "bg-background grow pb-safe-bottom"
            : "bg-background grow"
        }
      >
        <div className="mx-auto" style={{ width: mainWidth }}>
          {children}
        </div>
      </main>
      <div className={` ${isMobileDevice || !isXs ? "min-h-12" : ""}`}></div>
      <Footer
        mainWidth={mainWidth}
        isMobileDevice={isMobileDevice}
        isXs={isXs}
      />
    </div>
  );
};

export default Layout;
