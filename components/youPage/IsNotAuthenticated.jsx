import { SignInIcon } from "@/icons";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPageName } from "@/reducers/pageNameSlice";

export default function IsNotAuthenticated() {
  const { resolvedTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);
  const dispatch = useDispatch();
  const isMobileDevice = useSelector((state) => state.isMobile.isMobileDevice);
  useEffect(() => {
    dispatch(setPageName("You"));
  }, [dispatch]);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="pt-[140px]  flex flex-col justify-center items-center">
      <div className="max-w-[400px] px-10 flex flex-col items-center">
        <span
          className="material-symbols-outlined !text-6xl"
          style={{
            fontVariationSettings: `"FILL" 0, "wght" 200, "GRAD" 0, "opsz" 24`,
          }}
        >
          video_library
        </span>
        <div className="pt-4 pb-6 text-center">
          <p className="text-2xl mb-4">Enjoy your favorite animes</p>
          <p className="text-sm">
            Sign in to access the animes, characters, and staff you&apos;ve
            liked or saved
          </p>
        </div>
        <Button
          as={Link}
          href="/login"
          startContent={<SignInIcon size={24} />}
          className=" text-sm font-medium pl-2 pr-3  border-1 dark:border-[rgba(255,255,255,0.2)] "
          size="sm"
          variant={
            resolvedTheme === "light"
              ? "light"
              : isMobileDevice
              ? "bordered"
              : "ghost"
          }
          radius="full"
          color="primary"
        >
          <span className="-ml-1">Sign in</span>
        </Button>
      </div>
    </div>
  );
}
