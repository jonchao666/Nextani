import { SearchIcon, SignInIcon, GuideButtonIcon } from "@/icons";
import { Button, Link, Avatar } from "@nextui-org/react";
import Layout from "../layout/Layout";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
export default function LoginRequest() {
  const { theme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Layout>
      <div className="flex flex-col justify-center items-center ">
        <p className="text-2xl my-4">Please sign in first.</p>

        <Button
          as={Link}
          href="/login"
          startContent={<SignInIcon size={24} />}
          className=" text-sm font-medium pl-2 pr-3  border-1 dark:border-customGray "
          size="sm"
          variant={theme === "light" ? "light" : "ghost"}
          radius="full"
          color="primary"
        >
          <span className="-ml-1">Sign in</span>
        </Button>
      </div>
    </Layout>
  );
}
