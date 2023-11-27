import { VisuallyHidden, useSwitch } from "@nextui-org/react";
import { MoonIcon, SunIcon } from "@/icons";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeSwitcher(props) {
  const { resolvedTheme, setTheme } = useTheme();

  const [isMounted, setIsMounted] = useState(false);

  const toggleTheme = () => {
    resolvedTheme === "light" ? setTheme("dark") : setTheme("light");
  };
  const { Component, slots, getBaseProps, getInputProps, getWrapperProps } =
    useSwitch(props);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="flex flex-col gap-2">
      <Component {...getBaseProps()} onClick={toggleTheme}>
        <VisuallyHidden>
          <input {...getInputProps()} />
        </VisuallyHidden>
        <div
          {...getWrapperProps()}
          className={slots.wrapper({
            class: [
              "w-8 h-8",
              "flex items-center justify-center",
              "rounded-lg bg-default-100 hover:bg-default-200",
            ],
          })}
        >
          {resolvedTheme === "light" ? <MoonIcon /> : <SunIcon />}
        </div>
      </Component>
    </div>
  );
}
