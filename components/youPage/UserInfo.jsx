import { useSelector } from "react-redux";
import { Image } from "@nextui-org/react";
import { useEffect, useState } from "react";
import Link from "next/link";
export default function UserInfo() {
  const { displayName, email, displayImageUrl } = useSelector(
    (state) => state.user
  );
  const [tempDisplayName, setTempDisplayName] = useState("");

  useEffect(() => {
    const getTempDisplayName = () => {
      let idx = email.indexOf("@");
      let rawUsername = email.substring(0, idx);

      let cleanUsername = rawUsername.replace(/[.+]/g, "_");

      let maxLength = 20;
      let trimmedUsername =
        cleanUsername.length > maxLength
          ? cleanUsername.substring(0, maxLength)
          : cleanUsername;

      let finalUsername = trimmedUsername;
      setTempDisplayName(finalUsername);
    };
    if (!displayName) {
      getTempDisplayName();
    }
  }, [displayName, email]);

  return (
    <Link
      href="/settings/Account"
      className="flex px-3 items-center gap-3 mb-4"
    >
      <div>
        <Image
          radius="full"
          alt={displayName || tempDisplayName}
          src={displayImageUrl}
          className="object-cover w-[72px] h-[72px]"
        ></Image>
      </div>
      <div>
        <p className="text-2xl font-bold ">{displayName || tempDisplayName}</p>

        <p className="text-xs">{email}</p>
      </div>
    </Link>
  );
}
