import { useRouter } from "next/router";
import { Navbar, NavbarBrand, Link } from "@nextui-org/react";

const LoginFailed = () => {
  return (
    <div className="h-screen">
      <Navbar maxWidth="full" className="sticky h-16 ">
        <NavbarBrand href="/" as={Link}>
          <p className="font-bold text-2xl text-foreground">NextAni</p>
        </NavbarBrand>
      </Navbar>

      <div className="max-w-screen h-5/6 flex flex-col justify-center items-center">
        <p className="text-5xl font-bold">Login Failed</p>
        <p className="my-4">
          There was a problem with login in. Please try again later or contact
          support.
        </p>
      </div>
    </div>
  );
};

export default LoginFailed;
