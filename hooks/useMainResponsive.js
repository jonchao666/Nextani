import { useSelector, useDispatch } from "react-redux";
import { toggleSidebar, setShowSidebar } from "@/reducers/sidebarSlice";
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
      if (window.innerWidth >= 1315) dispatch(setShowSidebar(showSidebar));
      else if (showSidebar) dispatch(setShowSidebar(false));
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [showSidebar, dispatch]);
}
