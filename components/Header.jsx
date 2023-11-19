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
} from "@nextui-org/react";

export default function Header({ toggleSidebar }) {
  const { theme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState("light"); // 设置默认主题

  useEffect(() => {
    setCurrentTheme(theme);
  }, [theme]);
  return (
    <Navbar
      className="fixed"
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

        <ThemeSwitcher />
      </NavbarContent>
    </Navbar>
  );
}
