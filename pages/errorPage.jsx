import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import { Navbar, NavbarBrand, Link, Button } from "@nextui-org/react";

const ErrorPage = () => {
  return (
    <div className="h-screen">
      <div className="max-w-screen h-5/6 flex flex-col justify-center items-center">
        <p className="text-5xl font-bold">An unexpected error has occurred.</p>
        <div className="flex">
          <p className="my-4 mr-2">Return to</p>
          <Link href="/">Home</Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
