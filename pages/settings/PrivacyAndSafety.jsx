import { useRouter } from "next/router";
import Layout from "@/components/layout/Layout";
import AccountSettings from "@/components/settings/AccountSettings";
import axios from "axios";

import {
  Navbar,
  NavbarBrand,
  Link,
  Button,
  Card,
  CardBody,
  Avatar,
  Divider,
  CardFooter,
  Checkbox,
} from "@nextui-org/react";
import LoginRequest from "@/components/auth/LoginRequest";
import { useDispatch, useSelector } from "react-redux";
import { setIsSensitiveFilterDisabled } from "@/reducers/sensitiveFilterSlice";
import { useResponsive } from "@/hooks/useResponsive";
import { setPageName } from "@/reducers/pageNameSlice";
import { useEffect, useState } from "react";
export default function PrivacyAndSafety() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { section } = router.query;
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isSensitiveFilterDisabled = useSelector(
    (state) => state.isSensitiveFilterDisabled.isSensitiveFilterDisabled
  );
  const isMobileDevice = useSelector((state) => state.isMobile.isMobileDevice);
  const { isXs } = useResponsive();

  useEffect(() => {
    dispatch(setPageName("Privacy and safety"));
  }, [dispatch]);
  const jwt =
    typeof window !== "undefined" ? localStorage.getItem("jwt") : null;

  const handleSensitiveFilter = async (e) => {
    let checked = e.target.checked;
    dispatch(setIsSensitiveFilterDisabled(checked));
    try {
      await axios.post(
        `${process.env.API_URL}/user/isSensitiveFilterDisabled`,
        {
          isSensitiveFilterDisabled: checked,
        },
        {
          headers: { Authorization: `Bearer ${jwt}` },
        }
      );
      console.log("IsSensitiveFilterDisabled updated success");
    } catch (error) {
      console.error("Error updated IsSensitiveFilterDisabled:", error);
    }
  };

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

        <Card
          radius="sm"
          className={isMobileDevice ? "w-full mb-8" : "w-full mb-8 mt-6"}
          shadow="sm"
        >
          <CardBody className=" p-6 flex flex-row justify-between items-center">
            <div className="flex flex-col  justify-between ">
              <h4 className="text-xl font-medium ">Sensitive content</h4>
            </div>
            <div>
              <Checkbox
                size="sm"
                isSelected={isSensitiveFilterDisabled}
                onChange={(e) => handleSensitiveFilter(e)}
              >
                <span>Disable Filtering</span>
              </Checkbox>
            </div>
          </CardBody>
          <Divider />
          <CardFooter className="h-14 py-3 px-6 ">
            <p className=" text-sm text-[#909090]">
              Disable sensitive media on NextAni.
            </p>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
}
