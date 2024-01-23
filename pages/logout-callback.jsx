import { useEffect } from "react";
import { useRouter } from "next/router";

const LogOutCallback = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace("/");
  }, [router]);

  return <div>Please wait...</div>;
};

export default LogOutCallback;
