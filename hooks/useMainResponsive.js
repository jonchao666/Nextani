import { useSelector, useDispatch } from "react-redux";
import { toggleSidebar } from "@/reducers/sidebarSlice";
import { setShowSidebars } from "@/reducers/sidebarVisibilitySlice";
import { useEffect } from "react";

export default function useMainResponsive() {
  const showSidebar = useSelector((state) => state.sidebar.showSidebar);
  const dispatch = useDispatch();

  useEffect(() => {
    function handleResize() {
      dispatch(setShowSidebars(window.innerWidth >= 790));
    }

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch]);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 1315 && showSidebar) {
        dispatch(toggleSidebar());
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [showSidebar, dispatch]);
}
