// Import necessary React and Next.js components, hooks, and functions
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Layout from "@/components/layout/Layout";
import AccountSettings from "@/components/settings/AccountSettings";
import LoginRequest from "@/components/auth/LoginRequest";
import { Button, Divider } from "@nextui-org/react";
import Link from "next/link";
import { setPageName } from "@/reducers/pageNameSlice";
import { useResponsive } from "@/hooks/useResponsive";
import useAuthStatus from "@/hooks/useAuthStatus";
import { handleLogOut } from "@/utils/firebaseAuth";

// Define the Settings component
export default function Settings() {
  const { user, loading } = useAuthStatus();
  const isMobileDevice = useSelector((state) => state.isMobile.isMobileDevice);
  const { isXs } = useResponsive();
  const dispatch = useDispatch();
  const [isLogOut, setIsLogOut] = useState(false);
  const router = useRouter();

  // Set the page name using useEffect hook on component mount
  useEffect(() => {
    dispatch(setPageName("Settings"));
  }, [dispatch]);

  //log out
  const logOut = async () => {
    try {
      setIsLogOut(true);
      await handleLogOut();

      window.location.href = "/";
    } catch (error) {
      setIsLogOut(false);
      console.error(error);
    }
  };

  // Conditionally render the LoginRequest component if the user is not authenticated
  // and is accessing from a non-mobile device with extra small screen size
  if (!user && !loading && !isMobileDevice && isXs) {
    return <LoginRequest />;
  }
  if (loading || isLogOut) return <div className="p-3">Please wait...</div>;
  // Main render return for the Settings component
  return (
    <Layout>
      {/* Conditionally render the Settings title for non-mobile or small screen devices */}
      {isMobileDevice || !isXs ? null : (
        <p className="text-3xl px-6 pb-10 pt-6 border-b-1 dark:border-[rgba(255,255,255,0.2)]">
          Settings
        </p>
      )}
      {/* Settings links for mobile and desktop view */}
      <div
        className={
          isMobileDevice || !isXs
            ? "flex flex-col md:hidden"
            : "flex px-6 flex-col md:hidden"
        }
      >
        <Divider />
        {/* Conditionally render Account link if the user is authenticated */}
        {user && (
          <Link href="/settings/Account" className="px-4 my-3 text-foreground">
            Account
          </Link>
        )}
        {/* Privacy and Safety link */}
        {user && (
          <Link
            href="/settings/PrivacyAndSafety"
            className="px-4 my-3 text-foreground"
          >
            Privacy and Safety
          </Link>
        )}
        {/* Additional links rendered only for mobile devices */}
        {isMobileDevice && (
          <div className="flex flex-col">
            <Link href="/settings/Theme" className="px-4 my-3 text-foreground">
              Theme
            </Link>
            <Link href="/settings/Legal" className="px-4 my-3 text-foreground">
              Legal
            </Link>
            <Link
              href="/legalPages/ContactUs"
              className="px-4 my-3 text-foreground"
            >
              Contact us
            </Link>
            <Link
              href="/legalPages/About"
              className="px-4 my-3 text-foreground"
            >
              About
            </Link>

            {user && (
              <div onClick={logOut} className="px-4 my-3 text-foreground">
                Logout
              </div>
            )}
          </div>
        )}
      </div>
      {/* Desktop view for settings options */}
      <div
        className={
          isMobileDevice
            ? "justify-between px-3 hidden md:flex"
            : "justify-between px-6 hidden md:flex"
        }
      >
        <div
          className={
            isMobileDevice
              ? "mr-6 hidden md:block"
              : "mr-6 hidden md:block mt-6"
          }
        >
          {/* Account button for authenticated users */}
          {user && (
            <Button
              fullWidth
              variant="flat"
              radius="sm"
              className="justify-start"
            >
              Account
            </Button>
          )}
          {/* Other settings options */}
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
          {/* Conditional rendering for mobile specific settings options */}
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
                variant="light"
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
              {/* Logout button for authenticated users */}
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
        {/* Account settings component */}
        {user && <AccountSettings />}
      </div>
    </Layout>
  );
}
