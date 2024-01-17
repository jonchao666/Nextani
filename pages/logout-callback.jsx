import { useEffect } from "react";
import { useRouter } from "next/router";

const LogOutCallback = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace("/");
  }, [router]);
};

export default LogOutCallback;
