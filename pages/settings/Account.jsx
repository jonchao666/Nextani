import Layout from "@/components/layout/Layout";
import { useResponsive } from "@/hooks/useResponsive";
import { useDispatch, useSelector } from "react-redux";
import AccountSettings from "@/components/settings/AccountSettings";
import { Link, Button } from "@nextui-org/react";
import LoginRequest from "@/components/auth/LoginRequest";
import { setPageName } from "@/reducers/pageNameSlice";
import { useEffect } from "react";
import { useRouter } from "next/router";

// Settings page component
export default function Settings() {
  // Accessing Redux store state
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isMobileDevice = useSelector((state) => state.isMobile.isMobileDevice);
  const { isXs } = useResponsive();
  const router = useRouter();
  const dispatch = useDispatch();

  // Setting page name on component mount
  useEffect(() => {
    dispatch(setPageName("Account"));
  }, [dispatch]);

  // Logout handler
  const handleLogOut = () => {
    localStorage.removeItem("jwt");
    router.push("/logout-callback");
  };

  // Redirect to login page if not authenticated
  if (!isAuthenticated) {
    return <LoginRequest />;
  }

  // Render Settings page
  return (
    <Layout>
      <div>
        {/* Only show the Settings title if not on a small screen or mobile device */}
        {!isMobileDevice && isXs && (
          <p className="text-3xl px-6 pb-10 pt-6 border-b-1 dark:border-[rgba(255,255,255,0.2)]">
            Settings
          </p>
        )}
      </div>

      <div
        className={`justify-between px-${
          isMobileDevice || !isXs ? "3" : "6"
        } flex`}
      >
        <div className={`${isMobileDevice ? "hidden" : "mt-6"} mr-6 md:block`}>
          {/* Navigation buttons */}
          <Button
            fullWidth
            variant="flat"
            radius="sm"
            className="justify-start"
          >
            Account
          </Button>
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

          {/* Conditionally render mobile-specific options */}
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
              <Button
                onClick={handleLogOut}
                fullWidth
                variant="light"
                radius="sm"
                className="justify-start"
              >
                Logout
              </Button>
            </div>
          )}
        </div>

        <AccountSettings />
      </div>
    </Layout>
  );
}
