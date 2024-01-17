import {
  setDeletingAccount,
  setShowDeleteAccountPage,
} from "@/reducers/userSlice";
import { showDeleteAccountToast } from "@/components/settings/Toasts";

export default async function handleDeleteAccount(dispatch, router) {
  try {
    const jwt =
      typeof window !== "undefined" ? localStorage.getItem("jwt") : null;

    const response = await fetch(`${process.env.API_URL}/user/deleteAccount`, {
      method: "get",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    const data = await response.json();
    if (response.ok) {
      dispatch(setDeletingAccount(false));
      dispatch(setShowDeleteAccountPage(false));
      localStorage.removeItem("jwt");
      router.push("/");
      showDeleteAccountToast("success");
      console.log("Account has been deleted:", data);
    } else {
      console.error("Failed to delete account:", data);
      dispatch(setDeletingAccount(false));
      showDeleteAccountToast("error");
    }
  } catch (error) {
    console.error("Error deleting account:", error);
    dispatch(setDeletingAccount(false));
    showDeleteAccountToast("error");
  }
}
