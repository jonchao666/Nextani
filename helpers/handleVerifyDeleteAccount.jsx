import axios from "axios";
import toast from "react-hot-toast";
import {
  showDeletingAccountToast,
  showDeleteAccountToast,
} from "@/components/settings/Toasts";

import {
  setVerifyingDeleteAccount,
  setShowDeleteAccountPage,
} from "@/reducers/userSlice";
export default async function handleVerifyDeleteAccount(dispatch, router) {
  const jwt =
    typeof window !== "undefined" ? localStorage.getItem("jwt") : null;
  try {
    // 替换成你的 API 端点和请求配置
    const response = await axios.get(
      `${process.env.API_URL}/user/verifyDeleteAccount`,

      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

    if (response.status === 200) {
      dispatch(setVerifyingDeleteAccount(true));
      dispatch(setShowDeleteAccountPage(false));
      showDeletingAccountToast("success");
      const startPolling = () => {
        const intervalId = setInterval(async () => {
          try {
            const response = await axios.get(
              `${process.env.API_URL}/user/checkAccountDeleted`,

              {
                headers: {
                  Authorization: `Bearer ${jwt}`,
                },
              }
            );

            if (response.data.accountDeleted === true) {
              clearInterval(intervalId);
              router.push("/");
              showDeleteAccountToast("success");
            }
            console.log(response.data);
          } catch (error) {
            console.error("Error delete account:", error);
            clearInterval(intervalId); // 出错时停止轮询
          }
        }, 3000); // 每5秒轮询一次
      };

      // 调用轮询函数
      startPolling();
    } else {
      showDeletingAccountToast("error", error);
    }
  } catch (error) {
    console.error("Error requesting account delete:", error);
    dispatch(setVerifyingDeleteAccount(false));
    showDeletingAccountToast("error", error);
  }
}
