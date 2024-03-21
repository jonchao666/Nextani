import { Button, Input } from "@nextui-org/react";
import Link from "next/link";
import { useState, useMemo, useEffect } from "react";
import Oauth2 from "@/components/auth/Oauth2";
import { useRouter } from "next/router";
import { EyeFilledIcon, EyeSlashFilledIcon } from "@/icons";
import { login } from "@/utils/firebaseAuth";
import useAuthStatus from "@/hooks/useAuthStatus";

export default function Login() {
  const router = useRouter();
  const { loading, user } = useAuthStatus();
  //email validate
  const [email, setEmail] = useState("");
  const validateEmail = (email) => email.match(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/);
  const isInvalid = useMemo(() => {
    if (email === "") return false;
    return validateEmail(email) ? false : true;
  }, [email]);

  // local login

  const [isLocalLogin, setIsLocalLogin] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      await login(email, password);
      router.replace("/");
    } catch (error) {
      console.error("Error logging in:", error);
      setLoginError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      router.replace("/");
    }
  });

  return (
    <div className="h-dvh w-dvw">
      <div className="flex items-center justify-center h-2/3">
        <div className="flex flex-col w-full max-w-[400px] px-10">
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
          {isLocalLogin && (
            <Link href="/reset-password" className="mt-4 text-sm">
              Forget password?
            </Link>
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
          <div className="mt-4 text-center cursor-pointer">
            <p>Don&apos;t have an account?</p>{" "}
            <Link
              href="/signup"
              className="cursor-pointer text-sm text-primary"
            >
              Sign up
            </Link>
          </div>
          {!isLocalLogin && (
            <div className="w-full">
              <div className="flex items-center justify-center pt-4">
                <div className="border-t  flex-grow"></div>
                <span className="mx-4 text-xs">or</span>
                <div className="border-t  flex-grow"></div>
              </div>

              <Oauth2 />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
