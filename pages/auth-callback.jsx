import { useEffect } from "react";
import { useRouter } from "next/router";

const AuthCallback = () => {
  const router = useRouter();

  useEffect(() => {
    const token = router.query.token;

    if (token) {
      localStorage.setItem("jwt", token);
      router.replace("/");
    }
  }, [router]);

  return <div>Please wait...</div>;
};

export default AuthCallback;
