import axios from "axios";
import toast from "react-hot-toast";
import {
  ShowEmailChangeToast,
  EmailChangedToast,
} from "@/components/settings/Toasts";
import { setVerifyingEmail, setEmail } from "@/reducers/userSlice";
export default async function handleVerifyEmail(newEmail, dispatch) {
  const jwt =
    typeof window !== "undefined" ? localStorage.getItem("jwt") : null;
  try {
    // 替换成你的 API 端点和请求配置
    const response = await axios.post(
      `${process.env.API_URL}/user/verifyEmail`,
      {
        email: newEmail,
      },
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

    if (response.status === 200) {
      ShowEmailChangeToast(newEmail, "success");
      const startPolling = () => {
        const intervalId = setInterval(async () => {
          try {
            const response = await axios.post(
              `${process.env.API_URL}/user/checkEmailUpdated`,
              {
                email: newEmail,
              },
              {
                headers: {
                  Authorization: `Bearer ${jwt}`,
                },
              }
            );

            if (response.data.emailUpdated === true) {
              clearInterval(intervalId);
              dispatch(setVerifyingEmail(false));
              dispatch(setEmail(newEmail));
              toast.remove();
              EmailChangedToast();
            }
            console.log(response.data);
          } catch (error) {
            console.error("Error polling email update status:", error);
            clearInterval(intervalId); // 出错时停止轮询
          }
        }, 3000); // 每5秒轮询一次
      };

      // 调用轮询函数
      startPolling();
    } else {
      ShowEmailChangeToast(newEmail, "error");
    }
  } catch (error) {
    console.error("Error requesting email update:", error);
    ShowEmailChangeToast(newEmail, "error", error);
  }
}
