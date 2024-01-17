import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Navbar, NavbarBrand, Link } from "@nextui-org/react";
import handleUpdateEmail from "@/helpers/handleUpdateEmail";
import { useDispatch, useSelector } from "react-redux";
const EmailChanged = () => {
  const router = useRouter();

  const dispatch = useDispatch();

  useEffect(() => {
    const { email, token } = router.query;

    if (email) {
      handleUpdateEmail(email, token);
    }
  }, [router.query]);

  return (
    <div className="h-screen">
      <Navbar maxWidth="full" className="sticky h-16 border">
        <NavbarBrand href="/" as={Link} className="text-foreground">
          <p className="font-bold text-2xl hidden sm:block">NextAni</p>
        </NavbarBrand>
      </Navbar>

      <div className="max-w-screen h-5/6 flex flex-col justify-center items-center">
        <p className="text-5xl font-bold">Email Change Confirmed</p>
        <p className="my-4">
          Your email address was changed successfully. You may now close this
          window!
        </p>
      </div>
    </div>
  );
};

export default EmailChanged;
