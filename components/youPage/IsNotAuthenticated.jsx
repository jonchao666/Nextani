import { SignInIcon } from "@/icons";
import { Button, Link } from "@nextui-org/react";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

export default function IsNotAuthenticated() {
  const { resolvedTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="pt-[140px]  flex flex-col justify-center items-center">
      <span
        className="material-symbols-outlined text-9xl"
        style={{
          fontVariationSettings: `"FILL" 0, "wght" 200, "GRAD" 0, "opsz" 24`,
        }}
      >
        video_library
      </span>
      <div className="py-6 text-center">
        <p className="text-2xl mb-4">Enjoy your favorite animes</p>
        <p className="text-sm">
          Sign in to access the animes, characters, and staff you&apos;ve liked
          or saved
        </p>
      </div>
      <Button
        as={Link}
        href="/login"
        startContent={<SignInIcon size={24} />}
        className=" text-sm font-medium pl-2 pr-3  border-1 dark:border-customGray "
        size="sm"
        variant={resolvedTheme === "light" ? "light" : "ghost"}
        radius="full"
        color="primary"
      >
        <span className="-ml-1">Sign in</span>
      </Button>
    </div>
  );
}
