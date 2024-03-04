import { Button, Link } from "@nextui-org/react";
import { GoogleIcon } from "@/icons";
import { useSelector } from "react-redux";

export default function Oauth2() {
  const isMobileDevice = useSelector((state) => state.isMobile.isMobileDevice);
  return (
    <div className="flex flex-col  w-[320px] gap-2 mt-4">
      <Button
        as={Link}
        href={process.env.GOOGLE_LOGIN_URL}
        className="justify-start border-1"
        radius="sm"
        size="lg"
        variant={isMobileDevice ? "bordered" : "ghost"}
        startContent={<GoogleIcon />}
      >
        Continue with Google
      </Button>
    </div>
  );
}
