import Header from "./Header";
import Sidebar from "./Sidebar";
import MiniSidebar from "./MiniSidebar";
import { useSelector, useDispatch } from "react-redux";
import { toggleSidebar } from "@/reducers/sidebarSlice";
import useMainResponsive from "@/hooks/useMainResponsive";
import { useEffect, useState } from "react";
import { useResponsive } from "@/hooks/useResponsive";
const Layout = ({ children }) => {
  useMainResponsive();

  const showSidebar = useSelector((state) => state.sidebar.showSidebar);
  const showSidebars = useSelector(
    (state) => state.sidebarVisibility.showSidebars
  );
  const dispatch = useDispatch();
  const { isXl, isLg, isMd, isSm, isXs } = useResponsive();
  const [mainWidth, setMainWidth] = useState();
  useEffect(() => {
    const width = isXl
      ? "1284px"
      : isLg
      ? "1070px"
      : isMd
      ? "856px"
      : isSm
      ? "642px"
      : isXs
      ? "428px"
      : "214px";
    setMainWidth(width);
  }, [isXl, isLg, isMd, isSm, isXs]);

  return (
    <div>
      {!showSidebars && showSidebar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" />
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