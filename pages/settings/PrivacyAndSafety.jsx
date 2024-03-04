// Import necessary React and Next.js hooks, and components
import { useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Card,
  CardBody,
  Checkbox,
  Divider,
  CardFooter,
  Link,
} from "@nextui-org/react";
import { setIsSensitiveFilterDisabled } from "@/reducers/sensitiveFilterSlice";
import { useResponsive } from "@/hooks/useResponsive";
import { setPageName } from "@/reducers/pageNameSlice";
import axios from "axios";

// PrivacyAndSafety component handles the privacy and safety settings of the user
export default function PrivacyAndSafety() {
  const router = useRouter();
  const dispatch = useDispatch();

  // Retrieving state from the Redux store
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isSensitiveFilterDisabled = useSelector(
    (state) => state.isSensitiveFilterDisabled.isSensitiveFilterDisabled
  );
  const isMobileDevice = useSelector((state) => state.isMobile.isMobileDevice);
  const { isXs } = useResponsive();

  // Effect hook to set the page name on component mount
  useEffect(() => {
    dispatch(setPageName("Privacy and safety"));
  }, [dispatch]);

  // Retrieving JWT from localStorage securely
  const jwt =
    typeof window !== "undefined" ? localStorage.getItem("jwt") : null;

  // Handles user logout
  const handleLogOut = () => {
    localStorage.removeItem("jwt");
    router.push("/logout-callback");
  };

  // Handles the enabling/disabling of sensitive content filter
  const handleSensitiveFilter = async (e) => {
    const checked = e.target.checked;
    dispatch(setIsSensitiveFilterDisabled(checked));
    try {
      await axios.post(
        `${process.env.API_URL}/user/isSensitiveFilterDisabled`,
        { isSensitiveFilterDisabled: checked },
        { headers: { Authorization: `Bearer ${jwt}` } }
      );
      console.log("IsSensitiveFilterDisabled updated successfully");
    } catch (error) {
      console.error("Error updating IsSensitiveFilterDisabled:", error);
    }
  };

  // Render Privacy and Safety settings page
  return (
    <Layout>
      <div>
        {/* Conditionally renders the page title for non-mobile devices or devices with extra small screen size */}
        {isMobileDevice || !isXs ? null : (
          <p className="text-3xl px-6 pb-10 pt-6 border-b-1 dark:border-[rgba(255,255,255,0.2)]">
            Privacy and Safety
          </p>
        )}
      </div>
      <div
        className={
          isMobileDevice || !isXs
            ? "flex px-3 justify-between"
            : "flex px-6 justify-between"
        }
      >
        <div
          className={
            isMobileDevice
              ? "mr-6 hidden md:block"
              : "mr-6 hidden md:block mt-6"
          }
        >
          {/* Links to other settings pages for authenticated users */}
          {isAuthenticated && (
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
          <Button
            fullWidth
            variant="flat"
            radius="sm"
            className="justify-start"
          >
            Privacy and Safety
          </Button>
          {/* Additional settings options for mobile devices */}
          {isMobileDevice && renderMobileLinks(isAuthenticated, handleLogOut)}
        </div>

        {/* Card component for sensitive content settings */}
        <Card
          radius="sm"
          className={isMobileDevice ? "w-full mb-8 h-fit" : "w-full mb-8 mt-6"}
          shadow="sm"
        >
          <CardBody className="p-6 flex flex-row justify-between items-center">
            <h4 className="text-xl font-medium">Sensitive content</h4>
            <Checkbox
              size="sm"
              isSelected={isSensitiveFilterDisabled}
              onChange={handleSensitiveFilter}
            >
              Disable Filtering
            </Checkbox>
          </CardBody>
          <Divider />
          <CardFooter className="h-14 py-3 px-6">
            <p className="text-sm text-[#909090]">
              Disable sensitive media on NextAni.
            </p>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
}

// Helper function to render mobile-specific links
function renderMobileLinks(isAuthenticated, handleLogOut) {
  return (
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
  );
}
