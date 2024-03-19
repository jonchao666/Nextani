import { Button } from "@nextui-org/react";
import { GoogleIcon } from "@/icons";
import { useSelector } from "react-redux";
import { handleGoogleLogin } from "@/utils/firebaseAuth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getAuth, getRedirectResult } from "firebase/auth";

export default function Oauth2() {
  const isMobileDevice = useSelector((state) => state.isMobile.isMobileDevice);
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    getRedirectResult(auth)
      .then((result) => {
        if (result && result.user) {
          router.replace("/");
          process.env.SHOW_CONSOLE === "dev" &&
            console.log("Login success", result.user);
        } else {
          console.log("No redirect login or login failed");
          setLoading(false);
        }
      })
      .catch((error) => {
        router.push("/login-failed");
        console.error("Login process error", error);
      });
  }, []);

  if (loading)
    return (
      <div className="fixed top-0 left-0 w-dvw h-dvh bg-background z-20">
        <p className="p-3">Please wait...</p>
      </div>
    );
  return (
    <div className="flex flex-col w- gap-2 mt-4">
      <Button
        onClick={handleGoogleLogin}
        className="justify-start border-1"
        radius="sm"
        size="lg"
        variant={isMobileDevice ? "bordered" : "ghost"}
        startContent={<GoogleIcon />}
      >
        Continue with Google
      </Button>
    </div>
  );
}
