import { useTheme } from "next-themes";
import { Switch } from "@nextui-org/react";
import { MoonIcon, SunIcon } from "@/icons";

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div>
      <Switch
        onValueChange={() => setTheme(theme === "dark" ? "light" : "dark")}
        defaultSelected
        size="lg"
        color="primary"
        startContent={<SunIcon />}
        endContent={<MoonIcon />}
      ></Switch>
    </div>
  );
};
