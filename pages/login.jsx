import { Button, Image, Input, Link } from "@nextui-org/react";
import { useState, useEffect, useMemo } from "react";
import Oauth2 from "@/components/auth/oauth2";
import { useRouter } from "next/router";
import { EyeFilledIcon, EyeSlashFilledIcon } from "@/icons";
import useUserActivity from "@/hooks/useUserActivity";

export default function Login() {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const { redirect } = router.query;

  //email validate
  const [email, setEmail] = useState("");

  const validateEmail = (email) => email.match(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/);

  const isInvalid = useMemo(() => {
    if (email === "") return false;

    return validateEmail(email) ? false : true;
  }, [email]);

  // local login
  const { localLogin } = useUserActivity();
  const [isLocalLogin, setIsLocalLogin] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const handleLogin = async (email, password) => {
    setIsLoading(true);
    let token = await localLogin(email, password);
    console.log(token);
    setIsLoading(false);
    if (token) {
      router.push(`/auth-callback?token=${token}`);
    } else {
      setLoginError(true);
    }
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) return null;

  return (
    <div className="h-screen w-screen">
      <div className="flex items-center justify-center h-2/3">
        <div className="flex flex-col mx-auto">
          <div className="text-3xl font-bold mx-auto mb-8">
            {isLocalLogin ? "Enter your password" : "Log in to NextAni"}
          </div>
          <Input
            type="email"
            variant="bordered"
            isDisabled={isLocalLogin}
            isInvalid={isInvalid}
            color={isInvalid ? "danger" : "primary"}
            errorMessage={isInvalid && "Please enter a valid email"}
            onValueChange={setEmail}
            label="Email"
            className={`${isLocalLogin && "mb-3"} opacity-100 `}
            classNames={{ input: "text-md" }}
          />
          {isLocalLogin && (
            <Input
              classNames={{ input: "text-md" }}
              isDisabled={isLoading}
              label="Password"
              variant="bordered"
              placeholder="Enter your password"
              onValueChange={setPassword}
              errorMessage={loginError && "Incorrect email or password."}
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibility}
                >
                  {isVisible ? (
                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
              type={isVisible ? "text" : "password"}
            />
          )}
          <Button
            isLoading={isLoading}
            variant="solid"
            color="primary"
            radius="sm"
            size="lg"
            className="mt-6"
            onClick={() => {
              !isLocalLogin &&
                !isInvalid &&
                email !== "" &&
                setIsLocalLogin(true),
                isLocalLogin && handleLogin(email, password);
            }}
          >
            Continue
          </Button>
          <div className="mt-4 text-center">
            <p>Don&apos;t have an account?</p>{" "}
            <Link
              href="/signup"
              isDisabled={isLoading}
              className="cursor-pointer"
            >
              Sign up
            </Link>
          </div>
          {!isLocalLogin && (
            <div>
              <div className="flex items-center justify-center pt-4">
                <div className="border-t  flex-grow"></div>
                <span className="mx-4 text-xs">or</span>
                <div className="border-t  flex-grow"></div>
              </div>

              <Oauth2 redirect={redirect} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
