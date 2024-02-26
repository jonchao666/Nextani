import { Button, Select } from "@nextui-org/react";
import { MoonIcon, SunIcon, SystemIcon } from "@/icons";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeSwitcherSelector() {
  const { theme, setTheme } = useTheme();

  const [isMounted, setIsMounted] = useState(false);

  const handleThemeChange = (event) => {
    const selectedTheme = event.target.value;
    setTheme(selectedTheme);
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  const startContent =
    theme === "light" ? (
      <SunIcon />
    ) : theme === "dark" ? (
      <MoonIcon />
    ) : theme === "system" ? (
      <SystemIcon />
    ) : null;

  return (
    <div>
      <select
        className=" z-10 outline-none w-16 py-0.5 rounded-md text-tiny group-data-[hover=true]:border-default-500 border-small border-default-300 dark:border-default-200 bg-transparent text-default-500"
        id="theme"
        name="theme"
        value={theme}
        onChange={handleThemeChange}
      >
        <option value="system">System</option>
        <option value="dark">Dark</option>
        <option value="light">Light</option>
      </select>
    </div>
  );
}
