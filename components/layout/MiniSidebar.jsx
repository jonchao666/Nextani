import { Link, Button } from "@nextui-org/react";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function MiniSidebar() {
  const { resolvedTheme } = useTheme();
  const [selectedButton, setSelectedButton] = useState("");

  const router = useRouter();
  const { category } = router.query;
  useEffect(() => {
    // 根据当前路由来设置 selectedButton
    switch (router.pathname) {
      case "/":
        setSelectedButton("home");
        break;
      case "/you":
        setSelectedButton("you");
        break;
    }
    switch (category) {
      case "Top":
        setSelectedButton("explore");
        break;
    }
  }, [router.pathname]);

  const handleButtonClick = (name) => {
    setSelectedButton(name);
  };

  const renderButton = (iconName, label, name) => (
    <Button
      href={
        name === "home"
          ? "/"
          : name === "you"
          ? "/you"
          : name === "explore"
          ? `/animeIndex?category=Top`
          : undefined
      }
      disableAnimation
      as={Link}
      onClick={() => handleButtonClick(name)}
      variant={resolvedTheme === "light" ? "light" : "ghost"}
      className="flex flex-col hover:opacity-100 pt-4 pb-3.5 px-0 w-full h-[74px] border-none min-w-0 min-h-0"
    >
      <span
        className="material-symbols-outlined -mb-2"
        style={{
          fontVariationSettings:
            selectedButton === name && name === "history"
              ? `"FILL" 0, "wght" 400, "GRAD" 0, "opsz" 24`
              : selectedButton === name
              ? `"FILL" 1, "wght" 200, "GRAD" 0, "opsz" 24`
              : `"FILL" 0, "wght" 200, "GRAD" 0, "opsz" 24`,
        }}
      >
        {iconName}
      </span>
      <span className="text-[10px]">{label}</span>
    </Button>
  );

  return (
    <div className="fixed w-[72px] px-1 top-16">
      <div className="flex flex-col mt-1 ">
        {renderButton("home", "Home", "home")}
        {renderButton("video_library", "You", "you")}
        {renderButton("explore", "Explore", "explore")}
      </div>
    </div>
  );
}
