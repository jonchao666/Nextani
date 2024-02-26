import Layout from "@/components/layout/Layout";
import { useResponsive } from "@/hooks/useResponsive";
import { useDispatch, useSelector } from "react-redux";
import AccountSettings from "@/components/settings/AccountSettings";
import { Link, Button, Divider } from "@nextui-org/react";
import LoginRequest from "@/components/auth/LoginRequest";
import { setPageName } from "@/reducers/pageNameSlice";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
export default function Settings() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isMobileDevice = useSelector((state) => state.isMobile.isMobileDevice);
  const { isXs } = useResponsive();
  const { theme, setTheme } = useTheme();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPageName("Legal"));
  }, [dispatch]);
  const router = useRouter();

  const handleLogOut = () => {
    localStorage.removeItem("jwt");
    router.push("/logout-callback");
  };

  if (!isAuthenticated && !isMobileDevice && isXs) {
    return <LoginRequest />;
  }

  return (
    <Layout>
      {isMobileDevice || !isXs ? null : (
        <p className="text-3xl px-6 pb-10 pt-6  border-b-1 dark:border-[rgba(255,255,255,0.2)]">
          Settings
        </p>
      )}
      <div
        className={
          isMobileDevice || !isXs
            ? "flex  flex-col md:hidden"
            : "flex px-6 flex-col md:hidden"
        }
      >
        <Divider />

        {isMobileDevice ? (
          <div className="flex flex-col px-3">
            <Link
              href="/legalPages/PrivacyPolicy"
              className="px-4 my-3 text-foreground "
            >
              <span>Privacy policy</span>
            </Link>

            <Link
              href="/legalPages/TermsOfService"
              className="px-4 my-3 text-foreground n"
            >
              <span>Terms of service</span>
            </Link>
          </div>
        ) : null}
      </div>

      <div
        className={
          isMobileDevice
            ? "justify-start px-3 hidden md:flex"
            : "justify-start px-6 hidden md:flex"
        }
      >
        <div
          className={
            isMobileDevice
              ? "mr-6 hidden md:block"
              : "mr-6 hidden md:block mt-6"
          }
        >
          {isAuthenticated && (
            <Button
              fullWidth
              variant="light"
              radius="sm"
              className="justify-start"
            >
              Account
            </Button>
          )}
          <Button
            as={Link}
            href="/settings/PrivacyAndSafety"
            fullWidth
            variant="light"
            radius="sm"
            className="justify-start"
          >
            Privacy and safety
          </Button>
          {isMobileDevice ? (
            <div className="flex flex-col">
              <Button
                as={Link}
                href="/settings/Theme"
                fullWidth
                variant="light"
                radius="sm"
                className="justify-start"
              >
                Theme
              </Button>

              <Button
                as={Link}
                href="/settings/Legal"
                fullWidth
                variant="flat"
                radius="sm"
                className="justify-start"
              >
                Legal
              </Button>

              <Button
                as={Link}
                href="/legalPages/ContactUs"
                fullWidth
                variant="light"
                radius="sm"
                className="justify-start"
              >
                Contact us
              </Button>

              <Button
                as={Link}
                href="/legalPages/About"
                fullWidth
                variant="light"
                radius="sm"
                className="justify-start"
              >
                About
              </Button>

              {isAuthenticated && (
                <Button
                  onClick={() => handleLogOut()}
                  fullWidth
                  variant="light"
                  radius="sm"
                  className="justify-start"
                >
                  Logout
                </Button>
              )}
            </div>
          ) : null}
        </div>
        <div className="flex flex-col">
          <Link
            href="/legalPages/PrivacyPolicy"
            className="px-4 my-3 text-foreground "
          >
            <span>Privacy policy</span>
          </Link>

          <Link
            href="/legalPages/TermsOfService"
            className="px-4 my-3 text-foreground n"
          >
            <span>Terms of service</span>
          </Link>
        </div>
      </div>
    </Layout>
  );
}
