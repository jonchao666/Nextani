import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Navbar, NavbarBrand, Link } from "@nextui-org/react";
import handleUpdateEmail from "@/helpers/handleUpdateEmail";
import { Logo } from "@/icons";

const EmailChanged = () => {
  const router = useRouter();
  const [isUpdated, setIsUpdated] = useState(null);

  useEffect(() => {
    const updateEmail = async () => {
      const { email, token } = router.query;

      if (email && token) {
        const result = await handleUpdateEmail(email, token);
        setIsUpdated(result);
      }
    };

    updateEmail();
  }, [router.query]);
  if (isUpdated === null) return <div>Please wait...</div>;
  return (
    <div className="h-screen">
      <Navbar maxWidth="full" className="sticky h-16 ">
        <NavbarBrand href="/" as={Link}>
          <p className="font-bold text-2xl text-foreground">NextAni</p>
        </NavbarBrand>
      </Navbar>

      <div className="max-w-screen h-5/6 flex flex-col justify-center items-center">
        {isUpdated ? (
          <>
            <p className="text-5xl font-bold">Email Change Confirmed</p>
            <p className="my-4">
              Your email address was changed successfully. You may now close
              this window!
            </p>
          </>
        ) : (
          <>
            <p className="text-5xl font-bold">Email Change Failed</p>
            <p className="my-4">
              There was a problem changing your email address. Please try again
              later or contact support.
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default EmailChanged;
