// Import necessary React hooks and components
import { useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { Link, Button, Divider } from "@nextui-org/react";
import LoginRequest from "@/components/auth/LoginRequest";
import { setPageName } from "@/reducers/pageNameSlice";
import { useResponsive } from "@/hooks/useResponsive";
import { useTheme } from "next-themes";

// Settings component for managing theme preferences
export default function Settings() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isMobileDevice = useSelector((state) => state.isMobile.isMobileDevice);
  const { isXs } = useResponsive();
  const { theme, setTheme } = useTheme();

  const dispatch = useDispatch();
  const router = useRouter();

  // Set the page name on component mount
  useEffect(() => {
    dispatch(setPageName("Theme"));
  }, [dispatch]);

  // Handle user logout
  const handleLogOut = () => {
    localStorage.removeItem("jwt");
    router.push("/logout-callback");
  };

  // Redirect to login if not authenticated on a non-mobile XS device
  if (!isAuthenticated && !isMobileDevice && isXs) {
    return <LoginRequest />;
  }

  // Theme option click handler
  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
  };

  // Renders theme option
  const renderThemeOption = (optionTheme, label) => (
    <div
      onClick={() => handleThemeChange(optionTheme)}
      className="px-4 my-3 text-foreground flex items-center justify-between cursor-pointer"
    >
      <span>{label}</span>
      {theme === optionTheme && (
        <span
          className="material-symbols-outlined"
          style={{
            fontVariationSettings: `"FILL" 0, "wght" 250, "GRAD" 0, "opsz" 24`,
          }}
        >
          done
        </span>
      )}
    </div>
  );

  return (
    <Layout>
      {/* Display settings title for non-mobile or non-extra-small screens */}
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
        {/* Theme selection options for mobile devices */}
        {isMobileDevice && (
          <div className="flex flex-col px-3">
            {renderThemeOption("system", "Use device theme")}
            {renderThemeOption("dark", "Dark theme")}
            {renderThemeOption("light", "Light theme")}
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
          {/* Account and privacy settings buttons for desktop */}
          {isAuthenticated && (
            <Button
              as={Link}
              fullWidth
              href="/settings/Account"
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
          {/* Additional settings options for mobile devices */}
          {isMobileDevice && (
            <div className="flex flex-col">
              <Button
                as={Link}
                href="/settings/Theme"
                fullWidth
                variant="flat"
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
              {isAuthenticated && (
                <Button
                  onClick={handleLogOut}
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
        {/* Desktop theme selection options */}
        <div className="flex flex-col">
          {renderThemeOption("system", "Use device theme")}
          {renderThemeOption("dark", "Dark theme")}
          {renderThemeOption("light", "Light theme")}
        </div>
      </div>
    </Layout>
  );
}
