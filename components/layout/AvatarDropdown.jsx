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

export default function AvatarDropdown() {
  const dispatch = useDispatch();
  const { userData, displayName, email, displayImageUrl } = useSelector(
    (state) => state.user
  );

  const router = useRouter();

  const handleLogOut = () => {
    localStorage.removeItem("jwt");
    router.push("/logout-callback");
  };

  useEffect(() => {
    if (userData) {
      dispatch(
        setEmail(userData.google ? userData.google.email : userData.email)
      );
      dispatch(
        setDisplayName(
          userData.google ? userData.google.displayName : userData.displayName
        )
      );
      console.log(userData.profilePicture);
      dispatch(
        setDisplayImageUrl(
          userData.google
            ? userData.google.profilePicture
            : userData.profilePicture
            ? `${process.env.API_URL}${userData.profilePicture}`
            : `${process.env.API_URL}/profilePicture/defaultImage.svg`
        )
      );
    }
  }, [userData, dispatch]);

  if (!userData) return;
  return (
    <Dropdown radius="sm">
      <DropdownTrigger>
        <Avatar
          className="cursor-pointer"
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
        <DropdownSection aria-label="Profile & Actions">
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

          <DropdownItem as={Link} href="/settings" className="text-foreground">
            Settings
          </DropdownItem>
          <DropdownItem onClick={() => handleLogOut()}>Log Out</DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
}
