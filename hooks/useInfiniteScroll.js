import { useEffect, useRef, useCallback } from "react";

export default function useInfiniteScroll(scrollEndCallback) {
  const observer = useRef();

  const lastElementRef = useCallback(
    (node) => {
      if (observer.current) {
        observer.current.disconnect();
      }

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          scrollEndCallback();
        }
      });
      if (node) {
        observer.current.observe(node);
      }
    },
    [scrollEndCallback]
  );
  useEffect(() => {
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);
  return lastElementRef;
}
