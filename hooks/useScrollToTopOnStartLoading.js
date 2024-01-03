import Router from "next/router";
import { useEffect } from "react";

export default function useScrollToTopOnStartLoading() {
  useEffect(() => {
    const handleRouteChangeStart = () => {
      window.scrollTo(0, 0);
    };

    Router.events.on("routeChangeStart", handleRouteChangeStart);

    return () => {
      Router.events.off("routeChangeStart", handleRouteChangeStart);
    };
  }, []);
}
