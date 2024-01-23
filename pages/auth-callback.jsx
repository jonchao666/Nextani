import { useEffect } from "react";
import { useRouter } from "next/router";

const AuthCallback = () => {
  const router = useRouter();

  useEffect(() => {
    const token = router.query.token;
    const redirectTo = localStorage.getItem("redirect") || "/";

    if (token) {
      localStorage.setItem("jwt", token);
      router.replace(redirectTo);
      localStorage.removeItem("redirect");
    }
  }, [router]);

  return <div>Please wait...</div>;
};

export default AuthCallback;
