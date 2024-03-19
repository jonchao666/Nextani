import { useRouter } from "next/router";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { useState } from "react";
import useAuthStatus from "@/hooks/useAuthStatus";
import { sendVerificationEmail } from "@/utils/firebaseAuth";
import LoginRequest from "@/components/auth/LoginRequest";
import { ShowVerifyEmailToast } from "@/components/layout/Toasts";

const VerifyEmail = () => {
  const { user, loading } = useAuthStatus();
  const router = useRouter();
  const { email } = router.query;
  const [verifyingEmail, setVerifyingEmail] = useState(false);
  const handleResendEmail = async () => {
    setVerifyingEmail(true);
    try {
      await sendVerificationEmail();
      ShowVerifyEmailToast("success");
    } catch (error) {
      console.error("Error sending verification email:", error);
      ShowVerifyEmailToast("error", error);
    } finally {
      setVerifyingEmail(false);
    }
  };
  const handleBackToHome = () => {
    window.location.href = "/";
  };
  if (loading) return null;
  if (!user) return <LoginRequest />;
  return (
    <div className="h-dvh w-dvw">
      <div className="w-full h-2/3 flex justify-center items-center">
        <div className="flex flex-col w-full max-w-[400px] px-10 items-center">
          <span
            className="material-symbols-outlined !text-6xl "
            style={{
              fontVariationSettings: `"FILL" 0, "wght" 200, "GRAD" 0, "opsz" 24`,
            }}
          >
            email
          </span>
          <p className="text-2xl mb-4 mt-2">Verify your email</p>

          <p className="text-sm text-center">
            We sent an email to {email}. Click the link inside to get started.
          </p>

          <Button
            isLoading={verifyingEmail}
            className="w-full mt-6"
            radius="sm"
            variant="ghost"
            onClick={handleResendEmail}
          >
            Resend email
          </Button>
          <div
            onClick={handleBackToHome}
            className="text-sm mt-4 text-center text-primary"
          >
            Back to home
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
