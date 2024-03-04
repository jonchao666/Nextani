import { Button } from "@nextui-org/react";
import { MoonIcon, SunIcon, SystemIcon } from "@/icons";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeSwitcherIconOnly() {
  const { theme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  return (
    <div className="flex items-center">
      <Button
        variant={theme === "dark" ? "flat" : "light"}
        isIconOnly
        startContent={<MoonIcon />}
        onClick={() => setTheme("dark")}
      ></Button>

      <Button
        variant={theme === "light" ? "flat" : "light"}
        isIconOnly
        startContent={<SunIcon />}
        onClick={() => setTheme("light")}
      ></Button>

      <Button
        variant={theme === "system" ? "flat" : "light"}
        isIconOnly
        startContent={<SystemIcon />}
        onClick={() => setTheme("system")}
      ></Button>
    </div>
  );
}
