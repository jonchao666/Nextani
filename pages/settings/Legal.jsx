// Importing necessary React, Next.js components, hooks, and functions
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Layout from "@/components/layout/Layout";
import { Button, Divider } from "@nextui-org/react";
import Link from "next/link";
import LoginRequest from "@/components/auth/LoginRequest";
import { setPageName } from "@/reducers/pageNameSlice";
import { useResponsive } from "@/hooks/useResponsive";
import useAuthStatus from "@/hooks/useAuthStatus";
import { handleLogOut } from "@/utils/firebaseAuth";

// Settings component definition
export default function Settings() {
  // State selectors
  const { user, loading } = useAuthStatus();
  const isMobileDevice = useSelector((state) => state.isMobile.isMobileDevice);
  const { isXs } = useResponsive();

  // Hook calls
  const dispatch = useDispatch();
  const router = useRouter();

  // Effect hook to set the page name on component mount
  useEffect(() => {
    dispatch(setPageName("Legal"));
  }, [dispatch]);

  //log out
  const logOut = async () => {
    try {
      await handleLogOut();

      window.location.href = "/";
    } catch (error) {
      console.error(error);
    }
  };

  // Conditional rendering for unauthenticated non-mobile users with extra small screens
  if (!user && !isMobileDevice && isXs) {
    return <LoginRequest />;
  }
  if (loading) return <div className="p-3">Please wait...</div>;
  // Main component render function
  return (
    <Layout>
      {/* Conditionally rendered settings title for non-mobile or extra small screens */}
      {isMobileDevice || !isXs ? null : (
        <p className="text-3xl px-6 pb-10 pt-6 border-b-1 dark:border-[rgba(255,255,255,0.2)]">
          Settings
        </p>
      )}
      <div
        className={
          isMobileDevice || !isXs
            ? "flex flex-col md:hidden"
            : "flex px-6 flex-col md:hidden"
        }
      >
        <Divider />
        {/* Mobile device specific links */}
        {isMobileDevice && (
          <div className="flex flex-col px-3">
            <Link
              href="/legalPages/PrivacyPolicy"
              className="px-4 my-3 text-foreground "
            >
              Privacy policy
            </Link>
            <Link
              href="/legalPages/TermsOfService"
              className="px-4 my-3 text-foreground"
            >
              Terms of service
            </Link>
          </div>
        )}
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
          {/* Authenticated user buttons */}
          {user && (
            <Button
              as={Link}
              href="/settings/Account"
              fullWidth
              variant="light"
              radius="sm"
              className="justify-start"
            >
              Account
            </Button>
          )}
          {user && (
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
          )}
          {/* Additional mobile device specific buttons */}
          {isMobileDevice && (
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
              {user && (
                <Button
                  onClick={logOut}
                  fullWidth
                  variant="light"
                  radius="sm"
                  className="justify-start"
                >
                  Logout
                </Button>
              )}
            </div>
          )}
        </div>
        {/* Desktop specific links */}
        <div className="flex flex-col">
          <Link
            href="/legalPages/PrivacyPolicy"
            className="px-4 my-3 text-foreground"
          >
            Privacy policy
          </Link>
          <Link
            href="/legalPages/TermsOfService"
            className="px-4 my-3 text-foreground"
          >
            Terms of service
          </Link>
        </div>
      </div>
    </Layout>
  );
}
