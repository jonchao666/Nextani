import { useMediaQuery } from "react-responsive";
import { useSelector } from "react-redux";

export function useResponsive() {
  const showSidebar = useSelector((state) => state.sidebar.showSidebar);

  // 先调用所有可能的 useMediaQuery
  const isXlWithSidebar = useMediaQuery({ query: "(min-width: 1564px)" });
  const isLgWithSidebar = useMediaQuery({ query: "(min-width: 1350px)" });
  const isMdWithSidebar = useMediaQuery({ query: "(min-width: 1136px)" });
  const isSmWithSidebar = useMediaQuery({ query: "(min-width: 912px)" });
  const isXsWithSidebar = useMediaQuery({ query: "(min-width: 698px)" });

  const isXlWithoutSidebar = useMediaQuery({ query: "(min-width: 1396px)" });
  const isLgWithoutSidebar = useMediaQuery({ query: "(min-width: 1182px)" });
  const isMdWithoutSidebar = useMediaQuery({ query: "(min-width: 968px)" });
  const isSmWithoutSidebar = useMediaQuery({ query: "(min-width: 744px)" });
  const isXsWithoutSidebar = useMediaQuery({ query: "(min-width: 530px)" });

  // 根据 showSidebar 的状态选择使用哪一组响应式断点
  return {
    isXl: showSidebar ? isXlWithSidebar : isXlWithoutSidebar,
    isLg: showSidebar ? isLgWithSidebar : isLgWithoutSidebar,
    isMd: showSidebar ? isMdWithSidebar : isMdWithoutSidebar,
    isSm: showSidebar ? isSmWithSidebar : isSmWithoutSidebar,
    isXs: showSidebar ? isXsWithSidebar : isXsWithoutSidebar,
  };
}
