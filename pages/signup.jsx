import { Button, Input } from "@nextui-org/react";
import Link from "next/link";
import { useState, useMemo } from "react";
import Oauth2 from "@/components/auth/oauth2";
import { EyeFilledIcon, EyeSlashFilledIcon } from "@/icons";
import useUserActivity from "@/hooks/useUserActivity";
import { useRouter } from "next/router";
import { register } from "@/utils/firebaseAuth";

export default function SignUp() {
  const [password, setPassword] = useState("");
  //email validate
  const [email, setEmail] = useState("");
  const validateEmail = (email) => email.match(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/);
  const isEmailInvalid = useMemo(() => {
    if (email === "") return false;
    return validateEmail(email) ? false : true;
  }, [email]);

  // displayName validate
  const [displayName, setDisplayName] = useState("");
  const validateDisplayName = (displayName) => {
    return displayName.length <= 20;
  };
  const isDisplayNameInvalid = useMemo(() => {
    if (displayName === "") return false;
    return validateDisplayName(displayName) ? false : true;
  }, [displayName]);

  // sign up
  const router = useRouter();
  const { localVerifyEmail } = useUserActivity();
  const [isLocalSignUp, setIsLocalSignUp] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const [signUpError, setSignUpError] = useState(null);
  const [verifyingEmail, setVerifyingEmail] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const handleSignUp = async (email, password, name) => {
    if (!name) {
      setSignUpError("Missing display name. please enter display name.");
      return;
    }

    setVerifyingEmail(true);
    try {
      await register(email, password, name.slice(0, 20));

      router.push(`/verify-email?email=${email}`);
      setSignUpError(null);
    } catch (error) {
      console.error("Error signing up:", error);
      setSignUpError(error.message);
      setVerifyingEmail(false);
    }
  };

  return (
    <div className="h-dvh w-dvw">
      <div className="w-full h-2/3 flex justify-center items-center">
        <div className="flex flex-col w-full max-w-[400px] px-10">
          <div className="text-3xl font-bold mx-auto mb-8 ">
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
              className="mb-3"
              isDisabled={verifyingEmail}
              label="Password"
              variant="bordered"
              placeholder="Enter your password"
              onValueChange={setPassword}
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
          {isLocalSignUp && (
            <Input
              classNames={{ input: "text-md" }}
              isDisabled={verifyingEmail}
              isInvalid={isDisplayNameInvalid}
              label="Display name"
              variant="bordered"
              placeholder="Enter your display name"
              onValueChange={setDisplayName}
              errorMessage={
                signUpError
                  ? signUpError
                  : isDisplayNameInvalid
                  ? "Display name must be at most 20 characters long."
                  : null
              }
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
              !isLocalSignUp && !isEmailInvalid && setIsLocalSignUp(true),
                !isEmailInvalid &&
                  !isDisplayNameInvalid &&
                  isLocalSignUp &&
                  handleSignUp(email, password, displayName);
            }}
          >
            Continue
          </Button>
          <div className="mt-4 text-center">
            <p>Already have an account?</p>
            <Link href="/login" className="cursor-pointer text-primary text-sm">
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
