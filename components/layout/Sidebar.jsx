import { Button, Link } from "@nextui-org/react";
import { SignInIcon } from "@/icons";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { GuideButtonIcon, Logo } from "@/icons";
import { Navbar, NavbarBrand } from "@nextui-org/react";

import { useSelector } from "react-redux";
export default function Sidebar({ absolute, toggleSidebar }) {
  const { resolvedTheme } = useTheme();

  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const [selectedButton, setSelectedButton] = useState("");
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
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
  }, [router.pathname, category]);

  const handleButtonClick = (name) => {
    setSelectedButton(name);
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const renderButton = (iconName, label, name) => {
    return (
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
        onClick={() => handleButtonClick(name)}
        as={Link}
        variant={
          resolvedTheme === "light"
            ? selectedButton === name
              ? "flat"
              : "light"
            : selectedButton === name
            ? "solid"
            : "ghost"
        }
        className={
          selectedButton === name
            ? "justify-start border-none font-medium hover:opacity-100"
            : "justify-start border-none hover:opacity-100"
        }
      >
        <span
          className={`material-symbols-outlined mr-4`}
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
        {label}
      </Button>
    );
  };

  return (
    <div
      className={`fixed  top-0 left-0  h-[100vh] w-60 bg-background ${
        absolute && "z-50"
      }`}
    >
      <div className="h-16 w-full">
        {absolute && (
          <Navbar>
            <Button
              onClick={toggleSidebar}
              isIconOnly
              radius="full"
              variant="ghost"
              className="border-none "
            >
              <GuideButtonIcon />
            </Button>

            <NavbarBrand href="/" as={Link}>
              <p className="font-bold text-2xl  text-foreground">NextAni</p>
            </NavbarBrand>
          </Navbar>
        )}
      </div>
      <div className=" flex flex-col w-full h-full overscroll-none  hover:overflow-auto  justify-between">
        <div>
          <div className="flex flex-col p-3 ">
            {renderButton("home", "Home", "home")}
            {renderButton("video_library", "You", "you")}
            {renderButton("explore", "Explore", "explore")}
          </div>

          {isAuthenticated ? null : (
            <div className="border-b-1 flex flex-col px-8 py-4 justify-start items-start">
              <p className="text-sm">
                Sign in to like Animes, comment, and add to watchlist.
              </p>
              <Button
                as={Link}
                href="/login"
                startContent={<SignInIcon size={24} />}
                className="text-sm font-medium pl-2 pr-3 border-1 dark:border-[rgba(255,255,255,0.2)] mt-3"
                size="sm"
                variant={resolvedTheme === "light" ? "light" : "ghost"}
                color="primary"
                radius="full"
              >
                <span className="-ml-1">Sign in</span>
              </Button>
            </div>
          )}
        </div>
        <footer className="flex flex-col border-t-1">
          <div className="pt-4 px-6 flex flex-wrap">
            <Link
              href="/legalPages/About"
              className="text-xs mr-2 font-medium text-[rgb(96,96,96)] dark:text-[rgb(170,170,170)]"
            >
              About
            </Link>

            <Link
              href="/legalPages/ContactUs"
              className="text-xs mr-2 font-medium text-[rgb(96,96,96)] dark:text-[rgb(170,170,170)]"
            >
              Contact us
            </Link>
            <Link
              href="/legalPages/TermsOfService"
              className="text-xs mr-2 font-medium text-[rgb(96,96,96)] dark:text-[rgb(170,170,170)]"
            >
              Terms of Service
            </Link>
            <Link
              href="/legalPages/PrivacyPolicy"
              className="text-xs mr-2 font-medium text-[rgb(96,96,96)] dark:text-[rgb(170,170,170)]"
            >
              Privacy Policy
            </Link>
          </div>
          <div className="text-xs py-4 px-6 text-[#909090]">© 2024 NextAni</div>
          <div className="h-16"></div>
        </footer>
      </div>
    </div>
  );
}
