import { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Divider,
  Avatar,
  Button,
} from "@nextui-org/react";
import handleUpdateDisplayName from "@/utils/handleUpdateDisplayName";
import handleFileUpload from "@/utils/handleFileUpload";
import { changeUserEmail, deleteUserAccount } from "@/utils/firebaseAuth";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import {
  ShowEmailChangeToast,
  ShowDeleteAccountToast,
} from "@/components/layout/Toasts";

import { getIdToken } from "@/utils/firebaseAuth";

export default function AccountSettings() {
  const dispatch = useDispatch();
  const { email, displayImageUrl, changingDisplayName } = useSelector(
    (state) => state.user
  );

  const [displayNameChange, setDisplayNameChange] = useState("");
  const [emailChange, setEmailChange] = useState("");
  const router = useRouter();
  const { userData } = useSelector((state) => state.user);
  const isMobileDevice = useSelector((state) => state.isMobile.isMobileDevice);
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);
  const [showDeleteAccountPage, setShowDeleteAccountPage] = useState(false);
  const [verifyingEmail, setVerifyingEmail] = useState(false);

  useEffect(() => {
    if (userData) {
      setEmailChange(userData.email);
      setDisplayNameChange(userData.displayName);
    }
  }, [userData, dispatch]);
  const handleInputDisplayNameChange = (e) => {
    setDisplayNameChange(e.target.value);
  };

  const handleInputEmailChange = (e) => {
    setEmailChange(e.target.value);
  };

  const handleUpdateEmail = async (newEmail) => {
    setVerifyingEmail(true);
    process.env.SHOW_CONSOLE === "dev" && console.log(newEmail);
    try {
      await changeUserEmail(newEmail);
      ShowEmailChangeToast(newEmail, "success");
    } catch (error) {
      process.env.SHOW_CONSOLE === "dev" &&
        console.log("Error change email: ", error);

      ShowEmailChangeToast(newEmail, "error", error.message);
    } finally {
      setVerifyingEmail(false);
    }
  };

  //delete account from database
  async function deleteAccount() {
    try {
      const idToken = await getIdToken();
      await axios.delete(`${process.env.API_URL}/user`, {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });
      console.error("Delete account from database successfully");
    } catch (error) {
      console.error("Error delete account from database:", error);
    }
  }
  const handleDeleteAccount = async () => {
    setIsDeletingAccount(true);

    try {
      await deleteAccount();
      await deleteUserAccount();
      ShowDeleteAccountToast("success");
    } catch (error) {
      process.env.SHOW_CONSOLE === "dev" &&
        console.log("Error delete account: ", error);

      ShowDeleteAccountToast("error", error.message);
    } finally {
      setIsDeletingAccount(false);
      setShowDeleteAccountPage(false);
    }
  };

  return (
    <div>
      {showDeleteAccountPage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 h-dvh w-dvw">
          <div className="flex items-center justify-center h-full w-full">
            <div className="max-w-[480px] bg-white p-6 flex gap-6 flex-col justify-between rounded-xl">
              <p className="text-2xl font-medium ">Delete Personal Account</p>
              <p className="">
                Are you sure you want to delete your account? This action cannot
                be undone and you will permanently lose your profile, settings,
                and data.
              </p>

              <div className="flex justify-between">
                <Button
                  onClick={() => setShowDeleteAccountPage(false)}
                  radius="sm"
                  className="bg-white border-2 border-default hover:bg-default-200 text-black dark:bg-black dark:text-white "
                >
                  Cancel
                </Button>
                <Button
                  isLoading={isDeletingAccount ? true : false}
                  onClick={() => handleDeleteAccount()}
                  radius="sm"
                  className="bg-black  text-white dark:bg-white dark:text-black "
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className={isMobileDevice ? "" : " mt-6"}>
        <input
          type="file"
          id="fileInput"
          style={{ display: "none" }}
          onChange={(e) => handleFileUpload(e, dispatch)}
        />
        <Card radius="sm" className=" mb-8 " shadow="sm">
          <CardBody className="min-h-[150px] p-6 flex flex-row justify-between">
            <div className="flex flex-col  justify-between ">
              <h4 className="text-xl font-medium">Avatar</h4>
              <p className="my-3 text-sm">
                This is your avatar.
                <br /> Click on the avatar to upload a custom one from your
                files.
              </p>
            </div>
            <Avatar
              onClick={() => document.getElementById("fileInput").click()}
              className="cursor-pointer h-20 w-20 avatar-image shrink-0"
              src={displayImageUrl}
              fallback={<div className="bg-currentColor"></div>}
            ></Avatar>
          </CardBody>
          <Divider />
          <CardFooter className="h-14 py-3 px-6 ">
            <p className=" text-sm text-[#909090]">
              An avatar is optional but strongly recommended.
            </p>
          </CardFooter>
        </Card>

        <Card radius="sm" className=" mb-8 mx-auto" shadow="sm">
          <CardBody className="min-h-[150px] p-6 flex flex-col  justify-between">
            <h4 className="text-xl font-medium">Display Name</h4>
            <p className="my-3 text-sm">
              Please enter your full name, or a display name you are comfortable
              with.
            </p>
            <input
              className="pl-2.5 py-1 border border-[#eaeaea] focus:border-[#666] focus:outline-none dark:border-[#333] dark:focus:border-[#888]  rounded-md max-w-[300px] h-9 dark:bg-[#18181b]"
              type="text"
              maxLength="20"
              title={displayNameChange}
              value={displayNameChange}
              onChange={handleInputDisplayNameChange}
            />
          </CardBody>
          <Divider />
          <CardFooter className="h-14 py-3 px-6  justify-between">
            <p className=" text-sm text-[#909090]">
              Please use 20 characters at maximum.
            </p>

            <Button
              isLoading={changingDisplayName}
              size="sm"
              isDisabled={
                displayNameChange.length === 0 || displayNameChange.length > 20
              }
              className="bg-black bg-black text-white dark:bg-white dark:text-black text-sm"
              onClick={() =>
                handleUpdateDisplayName(displayNameChange, dispatch)
              }
            >
              Save
            </Button>
          </CardFooter>
        </Card>

        <Card
          radius="sm"
          className=" mb-8 mx-auto"
          shadow="sm"
          isDisabled={verifyingEmail}
        >
          <CardBody className="min-h-[150px] p-6 flex flex-col  justify-between ">
            <h4 className="text-xl font-medium">Email</h4>
            <p className="my-3 text-sm">
              Please enter the email address you want to use to log in with
              NextAni.
            </p>
            <input
              className="pl-2.5 py-1 border border-[#eaeaea] focus:border-[#666] focus:outline-none dark:border-[#333] dark:focus:border-[#888]  rounded-md max-w-[300px] h-9 dark:bg-[#18181b]"
              type="email"
              title={emailChange}
              value={emailChange}
              onChange={handleInputEmailChange}
            />
          </CardBody>
          <Divider />
          <CardFooter className="h-14 py-3 px-6 justify-between ">
            <p className=" text-sm text-[#909090]">
              We will email you to verify the change.
            </p>
            <Button
              size="sm"
              isDisabled={emailChange === email ? true : false}
              isLoading={verifyingEmail}
              className="bg-black  text-white dark:bg-white dark:text-black text-sm"
              onClick={() => handleUpdateEmail(emailChange)}
            >
              Save
            </Button>
          </CardFooter>
        </Card>

        <Card
          radius="sm"
          className=" mb-8 mx-auto"
          shadow="sm"
          isDisabled={isDeletingAccount ? true : false}
        >
          <CardBody className="min-h-[150px] p-6 ">
            <div className="flex flex-col  justify-between ">
              <h4 className="text-xl font-medium">Delete Account</h4>

              <p className="my-3 text-sm">
                Permanently remove your Personal Account and all of its contents
                from the NextAni platform. This action is not reversible, so
                please continue with caution.
              </p>
            </div>
          </CardBody>
          <Divider />
          <CardFooter className="h-14 py-3 px-6   justify-end">
            <Button
              onClick={() => setShowDeleteAccountPage(true)}
              radius="sm"
              className="bg-[#da2f35] text-white hover:bg-[#ae292f] "
            >
              Delete Personal Account
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
