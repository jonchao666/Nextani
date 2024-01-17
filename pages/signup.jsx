import { Button, Input, Link } from "@nextui-org/react";
import { useState, useEffect } from "react";
import Oauth2 from "@/components/auth/oauth2";

export default function Login() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="w-screen h-screen">
      <div className="w-full h-full flex justify-center items-center">
        <div className="flex flex-col">
          <div className="text-3xl font-bold mx-auto mb-8">
            Create your account
          </div>

          <Input type="email" label="Email" />
          <Button
            variant="solid"
            color="primary"
            radius="sm"
            size="lg"
            className="mt-6"
          >
            Continue
          </Button>
          <div className="mt-4 text-center">
            <span>Already have an account?</span>{" "}
            <Link href="/login" className="cursor-pointer">
              Log in
            </Link>
          </div>
          <div className="flex items-center justify-center pt-4">
            <div className="border-t  flex-grow"></div>
            <span className="mx-4 text-xs">or</span>
            <div className="border-t  flex-grow"></div>
          </div>

          <Oauth2 />
        </div>
      </div>
    </div>
  );
}
