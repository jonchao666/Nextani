import Layout from "@/components/layout/Layout";
import { useResponsive } from "@/hooks/useResponsive";
import { useDispatch, useSelector } from "react-redux";
import AccountSettings from "@/components/settings/AccountSettings";
import { Link, Button } from "@nextui-org/react";
import LoginRequest from "@/components/auth/LoginRequest";
import { setPageName } from "@/reducers/pageNameSlice";
import { useEffect, useState } from "react";
export default function Settings() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isMobileDevice = useSelector((state) => state.isMobile.isMobileDevice);
  const { isXs } = useResponsive();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPageName("Account"));
  }, [dispatch]);

  if (!isAuthenticated) {
    return <LoginRequest />;
  }
  return (
    <Layout>
      <div>
        {isMobileDevice || !isXs ? null : (
          <p className="text-3xl px-6 pb-10 pt-6  border-b-1 dark:border-[rgba(255,255,255,0.2)]">
            Settings
          </p>
        )}
      </div>

      <div
        className={
          isMobileDevice || !isXs
            ? "justify-between px-3 flex"
            : "justify-between px-6 flex"
        }
      >
        <div
          className={
            isMobileDevice
              ? "mr-6 hidden md:block"
              : "mr-6 hidden md:block mt-6"
          }
        >
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
                onClick={() => handleLogOut()}
                fullWidth
                variant="light"
                radius="sm"
                className="justify-start"
              >
                Logout
              </Button>
            </div>
          ) : null}
        </div>

        <AccountSettings />
      </div>
    </Layout>
  );
}
