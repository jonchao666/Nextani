import { SearchIcon, SignInIcon, GuideButtonIcon } from "@/icons";
import { Button, Link, Avatar } from "@nextui-org/react";
import Layout from "../layout/Layout";
import { useTheme } from "next-themes";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { setPageName } from "@/reducers/pageNameSlice";
export default function LoginRequest() {
  const dispatch = useDispatch();
  const { resolvedTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    dispatch(setPageName("home"));
  }, [dispatch]);

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
          className=" text-sm font-medium pl-2 pr-3  border-1 dark:border-[rgba(255,255,255,0.2)] "
          size="sm"
          variant={resolvedTheme === "light" ? "light" : "ghost"}
          radius="full"
          color="primary"
        >
          <span className="-ml-1">Sign in</span>
        </Button>
      </div>
    </Layout>
  );
}
