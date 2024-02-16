import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Navbar, NavbarBrand, Link } from "@nextui-org/react";
import { Logo } from "@/icons";
import handleDeleteAccount from "@/helpers/handleDeleteAccount";

const AccountDeleted = () => {
  const router = useRouter();
  const [isDeleted, setIsDeleted] = useState(null); // 新增状态变量

  useEffect(() => {
    const deleteAccount = async () => {
      const { token } = router.query;

      if (token) {
        const result = await handleDeleteAccount(token);
        setIsDeleted(result); // 根据结果更新状态
      }
    };

    deleteAccount();
  }, [router]);

  if (isDeleted === null) return <div>Please wait...</div>;
  return (
    <div className="h-screen">
      <Navbar maxWidth="full" className="sticky h-16 ">
        <NavbarBrand href="/" as={Link}>
          <p className="font-bold text-2xl text-foreground">NextAni</p>
        </NavbarBrand>
      </Navbar>

      <div className="max-w-screen h-5/6 flex flex-col justify-center items-center">
        {isDeleted ? (
          <>
            <p className="text-5xl font-bold">Account Delete Confirmed</p>
            <p className="my-4">
              Your account was deleted successfully. You may now close this
              window!
            </p>
          </>
        ) : (
          <>
            <p className="text-5xl font-bold">Account Deletion Failed</p>
            <p className="my-4">
              There was a problem deleting your account. Please try again later
              or contact support.
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default AccountDeleted;
