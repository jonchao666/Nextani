import { Button, Image, Input, Link } from "@nextui-org/react";
import { GoogleIcon, MicrosoftIcon, AppleIcon } from "@/icons";
import { useTheme } from "next-themes";

export default function Oauth2({ redirect }) {
  const { resolvedTheme } = useTheme();

  return (
    <div className="flex flex-col  w-[320px] gap-2 mt-4">
      <Button
        as={Link}
        href="http://localhost:8080/auth/google"
        className="justify-start border-1"
        radius="sm"
        size="lg"
        variant="ghost"
        startContent={<GoogleIcon />}
      >
        Continue with Google
      </Button>
      <Button
        className="justify-start border-1"
        radius="sm"
        size="lg"
        variant="ghost"
        startContent={<MicrosoftIcon />}
      >
        Continue with Microsoft Account
      </Button>
      <Button
        className="justify-start border-1"
        radius="sm"
        size="lg"
        variant="ghost"
        startContent={
          <AppleIcon fill={resolvedTheme === "dark" ? "#FFFFFF" : "#000000"} />
        }
      >
        Continue with Apple
      </Button>
    </div>
  );
}
