import { Button } from "@nextui-org/react";
import { MoonIcon, SunIcon, SystemIcon } from "@/icons";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeSwitcher(props) {
  const { theme, setTheme } = useTheme();

  const [isMounted, setIsMounted] = useState(false);

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else if (theme === "dark") {
      setTheme("system");
    } else {
      setTheme("light");
    }
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
  {
    theme === "dark" && <MoonIcon />;
  }
  {
    theme === "system" && <SystemIcon />;
  }
  return (
    <div>
      <Button
        variant="light"
        isIconOnly
        startContent={startContent}
        onClick={toggleTheme}
      ></Button>
    </div>
  );
}
