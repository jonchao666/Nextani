import { setDisplayName, setChangingDisplayName } from "@/reducers/userSlice";
import { showDisplayNameToast } from "@/components/settings/Toasts";

export default async function handleUpdateDisplayName(
  displayNameChange,
  dispatch
) {
  try {
    const newDisplayName = displayNameChange;
    console.log(newDisplayName);
    const jwt =
      typeof window !== "undefined" ? localStorage.getItem("jwt") : null;
    const response = await fetch(
      `${process.env.API_URL}/user/updateDisplayName`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ displayName: newDisplayName }),
      }
    );

    const data = await response.json();
    if (response.ok) {
      dispatch(setDisplayName(newDisplayName));
      dispatch(setChangingDisplayName(false));
      console.log("Display name updated:", data);
      showDisplayNameToast("success");
    } else {
      console.error("Failed to update display name:", data);
      showDisplayNameToast("error");
    }
  } catch (error) {
    console.error("Error updating display name:", error);
    showDisplayNameToast("error");
  }
}
