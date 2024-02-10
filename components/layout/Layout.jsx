import Header from "./Header";
import Sidebar from "./Sidebar";
import MiniSidebar from "./MiniSidebar";
import { useSelector, useDispatch } from "react-redux";
import { toggleSidebar, setShowSidebar } from "@/reducers/sidebarSlice";
import useMainResponsive from "@/hooks/useMainResponsive";
import { useEffect, useState } from "react";
import { useResponsive } from "@/hooks/useResponsive";
import { fetchUserData } from "@/reducers/userSlice";

const Layout = ({ children, col1Width, youPage }) => {
  useMainResponsive();
  const showSidebar = useSelector((state) => state.sidebar.showSidebar);
  const showSidebars = useSelector(
    (state) => state.sidebarVisibility.showSidebars
  );
  const dispatch = useDispatch();
  const { isXl, isLg, isMd, isSm, isXs } = useResponsive();
  const [mainWidth, setMainWidth] = useState();

  const jwt =
    typeof window !== "undefined" ? localStorage.getItem("jwt") : null;

  useEffect(() => {
    if (jwt) {
      dispatch(fetchUserData(jwt));
    }
  }, [jwt, dispatch]);

  useEffect(() => {
    if (!showSidebars) {
      dispatch(setShowSidebar(false));
    }
  }, [dispatch, showSidebars]);

  //main area width
  useEffect(() => {
    const width = isXl
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
        ? "312px"
        : "424px"
      : col1Width
      ? col1Width
      : "210px";
    setMainWidth(width);
  }, [isXl, isLg, isMd, isSm, isXs, col1Width, youPage]);

  return (
    <div>
      {!showSidebars && showSidebar && (
        <div className="fixed inset-0  bg-[rgba(0,0,0,0.5)] z-40" />
      )}
      <Header toggleSidebar={() => dispatch(toggleSidebar())} />

      {showSidebars ? (
        showSidebar ? (
          <Sidebar />
        ) : (
          <MiniSidebar />
        )
      ) : (
        showSidebar && (
          <Sidebar
            absolute={true}
            toggleSidebar={() => dispatch(toggleSidebar())}
          />
        )
      )}
      <main
        style={{ height: "calc(100vh-64px)" }}
        className={`bg-background mt-16 ${
          showSidebars ? (showSidebar ? "ml-60" : "ml-[72px]") : "ml-0"
        }`}
      >
        <div className="mx-auto pt-3 h-full" style={{ maxWidth: mainWidth }}>
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
