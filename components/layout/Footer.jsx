import { SignInIcon } from "@/icons";
import { useSelector } from "react-redux";
import { Button, Link, Avatar } from "@nextui-org/react";
import { ThemeSwitcherIconOnly } from "@/components/layout/ThemeSwitcherIconOnly";

export default function Footer({ mainWidth, isMobileDevice, isXs }) {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const { displayImageUrl } = useSelector((state) => state.user);

  return isMobileDevice || !isXs ? (
    <div className="fixed pb-safe-bottom bg-background w-full z-30  bottom-0  border-t-1 dark:border-[rgba(255,255,255,0.2)]">
      <div className="max-w-[500px] mx-auto">
        <div className="flex justify-around items-center  h-12">
          <Button
            as={Link}
            isIconOnly
            href="/"
            color="foreground"
            className="text-foreground cursor-pointer "
            startContent={
              <div className="flex flex-col items-center">
                <span
                  className="material-symbols-outlined"
                  style={{
                    fontVariationSettings: `"FILL" 0, "wght" 250, "GRAD" 0, "opsz" 24`,
                  }}
                >
                  home
                </span>

                <span className="text-[11px] leading-3">Home</span>
              </div>
            }
          ></Button>
          <Button
            as={Link}
            isIconOnly
            href="/animeIndex?category=Explore"
            color="foreground"
            className="text-foreground cursor-pointer "
            startContent={
              <div className="flex flex-col items-center">
                <span
                  className="material-symbols-outlined"
                  style={{
                    fontVariationSettings: `"FILL" 0, "wght" 250, "GRAD" 0, "opsz" 24`,
                  }}
                >
                  explore
                </span>

                <span className="text-[11px] leading-3">Explore</span>
              </div>
            }
          ></Button>

          {isAuthenticated ? (
            <Link
              href="/you"
              className="flex flex-col items-center justify-center w-10 h-10 text-foreground"
            >
              <Avatar
                className={`cursor-pointer ${
                  isMobileDevice || !isXs ? "h-6 w-6" : ""
                }`}
                size="sm"
                src={displayImageUrl}
              ></Avatar>
              <span className="text-[11px] leading-3">You</span>
            </Link>
          ) : (
            <Link
              href="/you"
              className="text-foreground flex flex-col items-center justify-center w-10 h-10"
            >
              <SignInIcon size={24} />
              <span className="text-[11px] leading-3 ">You</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  ) : (
    <footer className=" mx-auto  flex-col" style={{ width: mainWidth }}>
      <div className="py-5  flex flex-wrap  justify-start items-center gap-x-6 gap-y-2">
        <p className="text-sm  text-[#909090] dark:text-[rgb(113,113,113)]">
          © 2024 NextAni
        </p>

        <div className="flex flex-wrap gap-x-6 gap-y-2">
          <Link
            href="/legalPages/About"
            className=" text-sm font-medium text-[rgb(102,102,102)] dark:text-[rgb(136,136,136)]"
          >
            About
          </Link>

          <Link
            href="/legalPages/ContactUs"
            className="text-sm  font-medium text-[rgb(102,102,102)] dark:text-[rgb(136,136,136)]"
          >
            Contact us
          </Link>
          <Link
            href="/legalPages/PrivacyPolicy"
            className=" text-sm font-medium text-[rgb(102,102,102)] dark:text-[rgb(136,136,136)]"
          >
            Privacy Policy
          </Link>
          <Link
            href="/legalPages/TermsOfService"
            className="text-sm  font-medium text-[rgb(102,102,102)] dark:text-[rgb(136,136,136)]"
          >
            Terms of Service
          </Link>
          <ThemeSwitcherIconOnly />
        </div>
      </div>
    </footer>
  );
}
