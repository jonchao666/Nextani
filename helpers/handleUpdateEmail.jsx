import { setEmail, setVerifyingEmail } from "@/reducers/userSlice";
import { ShowEmailToast } from "@/components/settings/Toasts";

export default async function handleUpdateEmail(newEmail, token) {
  try {
    console.log(newEmail);
    const jwt =
      typeof window !== "undefined" ? localStorage.getItem("jwt") : null;
    const response = await fetch(`${process.env.API_URL}/user/updateEmail`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: newEmail, token: token }),
    });

    const data = await response.json();
    if (response.ok) {
      console.log("email updated:", data);
      return true;
    } else {
      console.error("Failed to update email:", data);
      return false;
    }
  } catch (error) {
    console.error("Error updating email:", error);
    return false;
  }
}
