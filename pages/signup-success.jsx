import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import { Navbar, NavbarBrand, Link, Button } from "@nextui-org/react";
import { SearchIcon, SignInIcon, GuideButtonIcon, Logo } from "@/icons";
import useUserActivity from "@/hooks/useUserActivity";
const SignupSuccess = () => {
  const { resolvedTheme } = useTheme();
  const router = useRouter();
  const [isSuccess, setIsSuccess] = useState(null);
  const { localSignUp } = useUserActivity();
  const { token } = router.query;
  useEffect(() => {
    const signUp = async () => {
      if (token) {
        const result = await localSignUp(token);
        setIsSuccess(result);
      }
    };

    signUp();
  }, [localSignUp, token]);

  if (isSuccess === null) return <div>Please wait...</div>;
  return (
    <div className="h-screen">
      <div className="max-w-screen h-5/6 flex flex-col justify-center items-center">
        {isSuccess ? (
          <>
            <p className="text-5xl font-bold">Registration Successful</p>
            <p className="my-4">
              Your account has been created successfully. You may now close this
              window or log in to start using our services.
            </p>
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
          </>
        ) : (
          <>
            <p className="text-5xl font-bold">Registration Failed</p>
            <p className="my-4">
              There was a problem creating your account. Please try again later
              or contact our support team for assistance.
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default SignupSuccess;
