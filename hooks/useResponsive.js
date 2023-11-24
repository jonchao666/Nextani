import { useMediaQuery } from "react-responsive";
import { useSelector } from "react-redux";

export function useResponsive() {
  const showSidebar = useSelector((state) => state.sidebar.showSidebar);
  const showSidebars = useSelector(
    (state) => state.sidebarVisibility.showSidebars
  );
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

  const isXlWithoutSidebars = useMediaQuery({ query: "(min-width: 1324px)" });
  const isLgWithoutSidebars = useMediaQuery({ query: "(min-width: 1110px)" });
  const isMdWithoutSidebars = useMediaQuery({ query: "(min-width: 896px)" });
  const isSmWithoutSidebars = useMediaQuery({ query: "(min-width: 672px)" });
  const isXsWithoutSidebars = useMediaQuery({ query: "(min-width: 458px)" });
  // 根据 showSidebar 的状态选择使用哪一组响应式断点
  return {
    isXl: showSidebars
      ? showSidebar
        ? isXlWithSidebar
        : isXlWithoutSidebar
      : isXlWithoutSidebars,
    isLg: showSidebars
      ? showSidebar
        ? isLgWithSidebar
        : isLgWithoutSidebar
      : isLgWithoutSidebars,
    isMd: showSidebars
      ? showSidebar
        ? isMdWithSidebar
        : isMdWithoutSidebar
      : isMdWithoutSidebars,
    isSm: showSidebars
      ? showSidebar
        ? isSmWithSidebar
        : isSmWithoutSidebar
      : isSmWithoutSidebars,
    isXs: showSidebars
      ? showSidebar
        ? isXsWithSidebar
        : isXsWithoutSidebar
      : isXsWithoutSidebars,
  };
}
