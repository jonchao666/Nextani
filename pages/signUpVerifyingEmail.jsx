import { useRouter } from "next/router";
import { Navbar, NavbarBrand, Link, Button } from "@nextui-org/react";
import { useState } from "react";
import useUserActivity from "@/hooks/useUserActivity";
import { useSelector } from "react-redux";
import { useResponsive } from "@/hooks/useResponsive";
const SignUpVerifyingEmail = () => {
  const router = useRouter();
  const { email } = router.query;
  const { localVerifyEmail } = useUserActivity();
  const [signUpError, setSignUpError] = useState(null);
  const [verifyingEmail, setVerifyingEmail] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const isMobileDevice = useSelector((state) => state.isMobile.isMobileDevice);
  const { isXs } = useResponsive();
  const handleSignUp = async (email) => {
    setVerifyingEmail(true);
    let res = await localVerifyEmail(email);

    if (res) {
      setSignUpError(res);
      setVerifyingEmail(false);
    } else {
      setSignUpError(false);
      setVerifyingEmail(false);
    }
    setCountdown(60);
    const intervalId = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);
    setTimeout(() => {
      clearInterval(intervalId);
      setSignUpError(null);
    }, 60000);
  };

  return (
    <div className="h-screen">
      <Navbar maxWidth="full" className="sticky h-16 ">
        <NavbarBrand href="/" as={Link}>
          <p className="font-bold text-2xl text-foreground">NextAni</p>
        </NavbarBrand>
      </Navbar>

      <div className="max-w-screen h-5/6 flex flex-col justify-center items-center px-6">
        <p
          className={
            isMobileDevice || isXs ? "text-3xl font-bold" : "text-5xl font-bold"
          }
        >
          Verify your email
        </p>
        <p className="my-4">
          We sent an email to {email}. Click the link inside to get started.
        </p>
        {signUpError === false ? (
          <div className="flex items-center">
            <p className="text-primary">Email sent. </p>
            <p className="text-sm ">
              Resend email available in {countdown} seconds.
            </p>
          </div>
        ) : signUpError === null ? (
          <Button
            color="primary"
            onClick={() => handleSignUp(email)}
            variant="light"
            isLoading={verifyingEmail}
            className="h-9"
          >
            Resend email
          </Button>
        ) : (
          <p className="text-danger">{signUpError}</p>
        )}
      </div>
    </div>
  );
};

export default SignUpVerifyingEmail;
