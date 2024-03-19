import { Button } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageName } from "@/reducers/pageNameSlice";
import { sendVerificationEmail } from "@/utils/firebaseAuth";
import { ShowVerifyEmailToast } from "@/components/layout/Toasts";

export default function EmailNotVerified() {
  const [verifyingEmail, setVerifyingEmail] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageName("You"));
  }, [dispatch]);

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

  return (
    <div className="pt-[140px]  flex flex-col justify-center items-center ">
      <div className="max-w-[400px] flex flex-col items-center px-10">
        <span
          className="material-symbols-outlined !text-6xl "
          style={{
            fontVariationSettings: `"FILL" 0, "wght" 200, "GRAD" 0, "opsz" 24`,
          }}
        >
          video_library
        </span>
        <div className="pb-6 pt-4 text-center">
          <p className="text-2xl mb-4">Enjoy your favorite animes</p>
          <p className="text-sm">
            Verify email to access the animes, characters, and staff you&apos;ve
            liked or saved
          </p>
        </div>

        <Button
          onClick={handleResendEmail}
          variant="ghost"
          isLoading={verifyingEmail}
          radius="sm"
          className="w-full"
        >
          Verify email
        </Button>
      </div>
    </div>
  );
}
