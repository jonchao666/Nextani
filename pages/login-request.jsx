import { SignInIcon } from "@/icons";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import Layout from "@/components/layout/Layout";
import { useTheme } from "next-themes";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { setPageName } from "@/reducers/pageNameSlice";
import { useSelector } from "react-redux";

export default function LoginRequest() {
  const dispatch = useDispatch();
  const { resolvedTheme } = useTheme();

  const isMobileDevice = useSelector((state) => state.isMobile.isMobileDevice);

  useEffect(() => {
    dispatch(setPageName("home"));
  }, [dispatch]);

  return (
    <Layout>
      <div className="flex flex-col justify-center items-center ">
        <p className="text-2xl my-4">Please sign in first.</p>

        <Button
          as={Link}
          href="/login"
          startContent={<SignInIcon size={24} />}
          className=" text-sm font-medium pl-2 pr-3  border-1 dark:border-[rgba(255,255,255,0.2)] "
          size="sm"
          variant={
            resolvedTheme === "light"
              ? "light"
              : isMobileDevice
              ? "bordered"
              : "ghost"
          }
          radius="full"
          color="primary"
        >
          <span className="-ml-1">Sign in</span>
        </Button>
      </div>
    </Layout>
  );
}
