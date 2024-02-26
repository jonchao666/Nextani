import { Button, Image, Input, Link } from "@nextui-org/react";
import { GoogleIcon, MicrosoftIcon, AppleIcon } from "@/icons";
import { useTheme } from "next-themes";

export default function Oauth2({ redirect }) {
  const { resolvedTheme } = useTheme();

  return (
    <div className="flex flex-col  w-[320px] gap-2 mt-4">
      <Button
        as={Link}
        href={process.env.GOOGLE_LOGIN_URL}
        className="justify-start border-1"
        radius="sm"
        size="lg"
        variant="ghost"
        startContent={<GoogleIcon />}
      >
        Continue with Google
      </Button>
    </div>
  );
}
