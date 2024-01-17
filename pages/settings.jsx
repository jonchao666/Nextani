import Layout from "@/components/layout/Layout";
import { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Divider,
  Avatar,
  Button,
  Input,
} from "@nextui-org/react";
import handleUpdateDisplayName from "@/helpers/handleUpdateDisplayName";
import handleFileUpload from "@/helpers/handleFileUpload";
import handleVerifyEmail from "@/helpers/handleVerifyEmail";
import handleDeleteAccount from "@/helpers/handleDeleteAccount";
import useAuth from "@/hooks/useAuth";
import LoginRequest from "@/components/auth/LoginRequest";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import {
  setDisplayName,
  setEmail,
  setDisplayImageUrl,
  setVerifyingEmail,
  setChangingDisplayName,
  setDeletingAccount,
  setShowDeleteAccountPage,
} from "@/reducers/userSlice";

export default function Settings() {
  const isAuthenticated = useAuth();
  const dispatch = useDispatch();
  const {
    email,
    displayImageUrl,
    verifyingEmail,
    changingDisplayName,
    deletingAccount,
    showDeleteAccountPage,
  } = useSelector((state) => state.user);

  const [displayNameChange, setDisplayNameChange] = useState("");
  const [emailChange, setEmailChange] = useState("");
  const router = useRouter();
  const { userData } = useSelector((state) => state.user);

  useEffect(() => {
    if (userData) {
      setEmailChange(userData.google ? userData.google.email : userData.email);

      setDisplayNameChange(
        userData.google ? userData.google.displayName : userData.displayName
      );

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
  const handleInputDisplayNameChange = (e) => {
    setDisplayNameChange(e.target.value);
  };

  const handleInputEmailChange = (e) => {
    setEmailChange(e.target.value);
  };

  if (!isAuthenticated) {
    return <LoginRequest />;
  }
  return (
    <Layout>
      {showDeleteAccountPage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center">
          <div className="max-w-[480px] h-1/4 bg-white dark:bg-black dark:text-white p-6 flex flex-col justify-between rounded-xl">
            <div>
              <p className="text-2xl font-medium mb-6">
                Delete Personal Account
              </p>
              <p className="">
                Are you sure you want to delete your account? This action cannot
                be undone and you will permanently lose your profile, settings,
                and data.
              </p>
            </div>
            <div className="flex justify-between">
              <Button
                onClick={() => dispatch(setShowDeleteAccountPage(false))}
                radius="sm"
                className="bg-white border-2 border-default hover:bg-default-200 text-black dark:bg-black dark:text-white "
              >
                Cancel
              </Button>
              <Button
                isLoading={deletingAccount ? true : false}
                onClick={() => {
                  handleDeleteAccount(dispatch, router),
                    dispatch(setDeletingAccount(true));
                }}
                radius="sm"
                className="bg-black  text-white dark:bg-white dark:text-black "
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}

      <div>
        <input
          type="file"
          id="fileInput"
          style={{ display: "none" }}
          onChange={(e) => handleFileUpload(e, dispatch)}
        />
        <Card radius="sm" className="max-w-[888px] mb-8" shadow="sm">
          <CardBody className="h-[150px] p-6 flex flex-row justify-between">
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
              className="cursor-pointer h-20 w-20 avatar-image"
              src={displayImageUrl}
            ></Avatar>
          </CardBody>
          <Divider />
          <CardFooter className="h-14 py-3 px-6 ">
            <p className=" text-sm text-[#909090]">
              An avatar is optional but strongly recommended.
            </p>
          </CardFooter>
        </Card>

        <Card radius="sm" className="max-w-[888px] mb-8" shadow="sm">
          <CardBody className="h-[150px] p-6 flex flex-col  justify-between">
            <h4 className="text-xl font-medium">Display Name</h4>
            <p className="my-3 text-sm">
              Please enter your full name, or a display name you are comfortable
              with.
            </p>
            <input
              className="pl-2.5 py-1 border border-[#eaeaea] focus:border-[#666] focus:outline-none dark:border-[#333] dark:focus:border-[#888]  rounded-md max-w-[300px] h-9 dark:bg-[#18181b]"
              type="text"
              maxLength="32"
              title={displayNameChange}
              value={displayNameChange}
              onChange={handleInputDisplayNameChange}
            />
          </CardBody>
          <Divider />
          <CardFooter className="h-14 py-3 px-6  justify-between">
            <p className=" text-sm text-[#909090]">
              Please use 32 characters at maximum.
            </p>

            <Button
              isLoading={changingDisplayName ? true : false}
              size="sm"
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
          className="max-w-[888px] mb-8"
          shadow="sm"
          isDisabled={verifyingEmail ? true : false}
        >
          <CardBody className="h-[150px] p-6 flex flex-col  justify-between ">
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
          <CardFooter className="h-14 py-3 px-6 justify-between">
            <p className=" text-sm text-[#909090]">
              We will email you to verify the change.
            </p>
            <Button
              size="sm"
              isDisabled={emailChange === email ? true : false}
              isLoading={verifyingEmail ? true : false}
              className="bg-black  text-white dark:bg-white dark:text-black text-sm"
              onClick={() => {
                handleVerifyEmail(emailChange, dispatch),
                  dispatch(setVerifyingEmail(true));
              }}
            >
              Save
            </Button>
          </CardFooter>
        </Card>

        <Card radius="sm" className="max-w-[888px] mb-8" shadow="sm">
          <CardBody className="h-[150px] p-6 ">
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
              onClick={() => dispatch(setShowDeleteAccountPage(true))}
              radius="sm"
              className="bg-[#da2f35] text-white hover:bg-[#ae292f] "
            >
              Delete Personal Account
            </Button>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
}
