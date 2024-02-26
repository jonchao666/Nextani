import { useMediaQuery } from "react-responsive";

export function useResponsive() {
  const isXl = useMediaQuery({ query: "(min-width: 1324px)" });
  const isLg = useMediaQuery({ query: "(min-width: 1110px)" });
  const isMd = useMediaQuery({ query: "(min-width: 896px)" });
  const isSm = useMediaQuery({ query: "(min-width: 672px)" });
  const isXs = useMediaQuery({ query: "(min-width: 458px)" });

  return {
    isXl,
    isLg,
    isMd,
    isSm,
    isXs,
  };
}
