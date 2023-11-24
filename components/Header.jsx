import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { SearchIcon, SignInIcon, GuideButtonIcon } from "@/icons";
import { Button } from "@nextui-org/react";
import {
  Input,
  Navbar,
  NavbarContent,
  NavbarItem,
  NavbarBrand,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from "@nextui-org/react";
import { Menu, MenuItem } from "@mui/material";
import {
  DefaultDropdownMenu,
  LanguageDropdownMenu,
  DeviceThemeDropdownMenu,
} from "./DropDownMenu";

export default function Header({ toggleSidebar }) {
  const { theme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState("light"); // 设置默认主题

  const [anchorEl, setAnchorEl] = useState(null);
  const [activeMenu, setActiveMenu] = useState("default");

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuChange = (menu) => {
    setActiveMenu(menu);
    handleMenuClose();
  };

  useEffect(() => {
    setCurrentTheme(theme);
  }, [theme]);
  return (
    <Navbar
      isBlurred="false"
      className="fixed z-30"
      maxWidth="full"
      classNames={{
        wrapper: "px-4",
        item: ["bg-backgroundwhite ", "items-center"],
      }}
    >
      <Button
        onClick={toggleSidebar}
        isIconOnly
        radius="full"
        variant="ghost"
        className="border-none"
      >
        <GuideButtonIcon />
      </Button>

      <NavbarBrand>
        <p className="font-bold text-2xl hidden sm:block">NEXTANI</p>
      </NavbarBrand>
      <NavbarContent className="max-w-[650px] w-full" justify="center">
        <Input
          classNames={{
            base: " h-10 ",
            mainWrapper: "h-full",

            input: "text-small ",
            inputWrapper:
              "h-full font-normal  border-1 border-gray-300  dark:border-customGray",
          }}
          placeholder="Type to search..."
          endContent={<SearchIcon size={18} />}
          type="search"
          radius="full"
          variant="bordered"
          color="primary"
        />
      </NavbarContent>
      <NavbarContent justify="end">
        <div>
          <Button
            onClick={handleMenuOpen}
            disableAnimation
            variant="ghost"
            className="border-none -mr-2"
            radius="full"
            isIconOnly
          >
            <span
              className={`material-symbols-outlined`}
              style={{
                fontVariationSettings: `"FILL" 0, "wght" 300, "GRAD" 0, "opsz" 24`,
              }}
            >
              more_vert
            </span>
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            {activeMenu === "default" && (
              <DefaultDropdownMenu onChangeMenu={handleMenuChange} />
            )}
            {activeMenu === "theme" && (
              <DeviceThemeDropdownMenu onChangeMenu={handleMenuChange} />
            )}
            {activeMenu === "language" && (
              <LanguageDropdownMenu onChangeMenu={handleMenuChange} />
            )}
          </Menu>
        </div>
        <NavbarItem>
          <Button
            startContent={<SignInIcon size={24} />}
            className=" text-sm font-medium pl-2 pr-3  border-1 dark:border-customGray "
            size="sm"
            variant={currentTheme === "light" ? "light" : "ghost"}
            radius="full"
            color="primary"
            href="#"
          >
            <span className="-ml-1">Sign in</span>
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
