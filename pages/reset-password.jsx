import { Button, Input } from "@nextui-org/react";
import { useState, useMemo } from "react";
import { resetPassword } from "@/utils/firebaseAuth";
import Link from "next/link";
import { ShowResetPasswordToast } from "@/components/layout/Toasts";

export default function ResetPassword() {
  //email validate
  const [email, setEmail] = useState("");
  const [isResettingPassword, setIsResettingPassword] = useState(false);
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);

  const validateEmail = (email) => email.match(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/);

  const isEmailInvalid = useMemo(() => {
    if (email === "") return false;

    return validateEmail(email) ? false : true;
  }, [email]);

  const handleResetPassword = async (email) => {
    setIsResettingPassword(true);
    try {
      await resetPassword(email);
      setIsCheckingEmail(true);
    } catch (error) {
      ShowResetPasswordToast(email, "error", error.message);
    } finally {
      setIsResettingPassword(false);
    }
  };
  return (
    <div className="h-dvh w-dvw">
      <div className="w-full h-2/3 flex justify-center items-center">
        {isCheckingEmail ? (
          <div className="flex flex-col w-full max-w-[400px] px-10 items-center">
            <span
              className="material-symbols-outlined !text-6xl "
              style={{
                fontVariationSettings: `"FILL" 0, "wght" 200, "GRAD" 0, "opsz" 24`,
              }}
            >
              email
            </span>
            <p className="text-2xl mb-4 mt-2">Check your email address</p>

            <p className="text-sm text-center">
              Please check your email address {email} for instructions on how to
              reset your password.
            </p>

            <Button
              isLoading={isResettingPassword}
              className="w-full mt-6"
              radius="sm"
              variant="ghost"
              onClick={() => handleResetPassword(email)}
            >
              Resend email
            </Button>
          </div>
        ) : (
          <div className="flex flex-col w-full max-w-[400px] px-10">
            <div className="text-3xl font-bold mx-auto mb-8 ">
              Reset your password
            </div>

            <Input
              type="email"
              variant="bordered"
              isInvalid={isEmailInvalid}
              color={isEmailInvalid ? "danger" : "primary"}
              errorMessage={isEmailInvalid && "Please enter a valid email"}
              onValueChange={setEmail}
              label="Email"
              classNames={{ input: "text-md" }}
            />

            <Button
              isLoading={isResettingPassword}
              variant="solid"
              color="primary"
              radius="sm"
              size="lg"
              className="mt-6"
              onClick={() => handleResetPassword(email)}
            >
              Continue
            </Button>

            <div className="mt-4 text-sm text-center">
              <Link href="/login">Back to NextAni</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
