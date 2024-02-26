import {
  User,
  Link,
  Avatar,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownTrigger,
  DropdownSection,
} from "@nextui-org/react";
import {
  setDisplayName,
  setEmail,
  setDisplayImageUrl,
} from "@/reducers/userSlice";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { ThemeSwitcherSelector } from "./ThemeSwitcherSelector";

export default function AvatarDropdown({ isMobileDevice, isXs }) {
  const { displayName, email, displayImageUrl } = useSelector(
    (state) => state.user
  );

  const router = useRouter();

  const handleLogOut = () => {
    localStorage.removeItem("jwt");
    router.push("/logout-callback");
  };

  return (
    <Dropdown radius="sm">
      <DropdownTrigger>
        <Avatar
          className={`cursor-pointer ${
            isMobileDevice || !isXs ? "h-6 w-6" : ""
          }`}
          size="sm"
          src={displayImageUrl}
        ></Avatar>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Custom item styles"
        disabledKeys={["profile"]}
        className="px-2"
        itemClasses={{
          base: [
            "rounded-md",
            "transition-opacity",
            "data-[hover=true]:bg-default-100",
            "dark:data-[hover=true]:bg-default-200",
            "data-[pressed=true]:opacity-70",
          ],
        }}
      >
        <DropdownSection showDivider>
          <DropdownItem
            isReadOnly
            textValue="Profile"
            className="h-14 gap-2 opacity-100 "
          >
            <User
              name={displayName}
              description={email}
              classNames={{
                name: "text-foreground",
                description: "text-foreground",
              }}
              avatarProps={{
                size: "sm",
                src: displayImageUrl,
              }}
            />
          </DropdownItem>

          <DropdownItem as={Link} href="/settings" className="text-foreground ">
            <div className="flex items-center justify-between">
              <p>Settings</p>
              <span
                className="material-symbols-outlined"
                style={{
                  fontVariationSettings: `"FILL" 0, "wght" 250, "GRAD" 0, "opsz" 24`,
                }}
              >
                settings
              </span>
            </div>
          </DropdownItem>
          <DropdownItem
            isReadOnly
            key="theme"
            className="cursor-default"
            endContent={<ThemeSwitcherSelector />}
          >
            Theme
          </DropdownItem>
        </DropdownSection>
        <DropdownSection>
          <DropdownItem href="/legalPages/ContactUs">Contact us</DropdownItem>
          <DropdownItem onClick={() => handleLogOut()}>Log Out</DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
}
