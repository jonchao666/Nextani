import { Button, Input, Link } from "@nextui-org/react";
import { useState, useMemo } from "react";
import Oauth2 from "@/components/auth/oauth2";
import { EyeFilledIcon, EyeSlashFilledIcon } from "@/icons";
import useUserActivity from "@/hooks/useUserActivity";
import { useRouter } from "next/router";

export default function SignUp() {
  //email validate
  const [email, setEmail] = useState("");

  const validateEmail = (email) => email.match(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/);

  const isEmailInvalid = useMemo(() => {
    if (email === "") return false;

    return validateEmail(email) ? false : true;
  }, [email]);

  //password validate
  const [password, setPassword] = useState("");
  const validatePassword = (password) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password);
  };

  const isPasswordInvalid = useMemo(() => {
    if (password === "") return false; // 如果密码为空，我们不显示错误信息

    return validatePassword(password) ? false : true;
  }, [password]);

  // sign up
  const router = useRouter();
  const { localVerifyEmail } = useUserActivity();
  const [isLocalSignUp, setIsLocalSignUp] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const [signUpError, setSignUpError] = useState(null);
  const [verifyingEmail, setVerifyingEmail] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const handleSignUp = async (email, password) => {
    setVerifyingEmail(true);
    let res = await localVerifyEmail(email, password);

    if (res) {
      setSignUpError(res);
      setVerifyingEmail(false);
    } else {
      router.push(`signUpVerifyingEmail/?email=${email}`);
    }
  };
  return (
    <div className="h-screen w-screen">
      <div className="w-full h-2/3 flex justify-center items-center">
        <div className="flex flex-col">
          <div className="text-3xl font-bold mx-auto mb-8">
            Create your account
          </div>

          <Input
            isDisabled={verifyingEmail}
            type="email"
            variant="bordered"
            isInvalid={isEmailInvalid}
            color={isEmailInvalid ? "danger" : "primary"}
            errorMessage={isEmailInvalid && "Please enter a valid email"}
            onValueChange={setEmail}
            label="Email"
            className={`${isLocalSignUp && "mb-3"} `}
            classNames={{ input: "text-md" }}
          />
          {isLocalSignUp && (
            <Input
              classNames={{ input: "text-md" }}
              isDisabled={verifyingEmail}
              isInvalid={isPasswordInvalid}
              className="sm:w-[320px] "
              label="Password"
              variant="bordered"
              placeholder="Enter your password"
              onValueChange={setPassword}
              errorMessage={
                !!signUpError
                  ? signUpError
                  : isPasswordInvalid
                  ? "Password must be at least 8 characters long, include numbers, uppercase and lowercase letters."
                  : null
              }
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
            isLoading={verifyingEmail}
            isDisabled={verifyingEmail}
            variant="solid"
            color="primary"
            radius="sm"
            size="lg"
            className="mt-6"
            onClick={() => {
              !isLocalSignUp &&
                !isEmailInvalid &&
                !isPasswordInvalid &&
                email !== "" &&
                setIsLocalSignUp(true),
                isLocalSignUp && handleSignUp(email, password);
            }}
          >
            Continue
          </Button>
          <div className="mt-4 text-center">
            <p>Already have an account?</p>{" "}
            <Link
              href="/login"
              isDisabled={verifyingEmail}
              className="cursor-pointer"
            >
              Log in
            </Link>
          </div>
          {!isLocalSignUp && (
            <div>
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
