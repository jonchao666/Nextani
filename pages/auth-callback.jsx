import { useEffect } from "react";
import { useRouter } from "next/router";

const AuthCallback = () => {
  const router = useRouter();

  useEffect(() => {
    const token = router.query.token;
    if (token) {
      localStorage.setItem("jwt", token);
      router.replace("/"); // 重定向到主页或其他页面
    }
  }, [router]);

  return <div>Please wait...</div>;
};

export default AuthCallback;
