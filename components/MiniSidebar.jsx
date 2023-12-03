import { Link, Button } from "@nextui-org/react";
import { useTheme } from "next-themes";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedButton } from "@/reducers/selectedButtonSlice";

export default function MiniSidebar() {
  const { theme } = useTheme();
  const selectedButton = useSelector((state) => state.selectedButton.value);
  const dispatch = useDispatch();
  const handleButtonClick = (buttonName) => {
    dispatch(setSelectedButton(buttonName));
  };

  const renderButton = (iconName, label, name) => (
    <Button
      href={name === "home" ? "/" : undefined}
      disableAnimation
      as={Link}
      onClick={() => handleButtonClick(name)}
      variant={theme === "light" ? "light" : "ghost"}
      className="flex flex-col  pt-4 pb-3.5 px-0 w-full h-[74px] border-none min-w-0 min-h-0"
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
        {renderButton("subscriptions", "Watchlist", "watchlist")}
        {renderButton("favorite", "Likes", "likes")}
        {renderButton("history", "History", "history")}
      </div>
    </div>
  );
}
