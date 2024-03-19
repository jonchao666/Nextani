import { setDisplayName, setChangingDisplayName } from "@/reducers/userSlice";
import { ShowDisplayNameToast } from "@/components/layout/Toasts";
import { getIdToken } from "@/utils/firebaseAuth";

export default async function handleUpdateDisplayName(
  displayNameChange,
  dispatch
) {
  try {
    const newDisplayName = displayNameChange;
    dispatch(setChangingDisplayName(true));
    const idToken = await getIdToken();
    const response = await fetch(
      `${process.env.API_URL}/user/updateDisplayName`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${idToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ displayName: newDisplayName }),
      }
    );

    const data = await response.json();
    if (response.ok) {
      dispatch(setDisplayName(newDisplayName));
      process.env.SHOW_CONSOLE === "dev" &&
        console.log("Display name updated:", data);
      ShowDisplayNameToast("success");
    } else {
      console.error("Failed to update display name:", data);
      ShowDisplayNameToast("error");
    }
  } catch (error) {
    console.error("Error updating display name:", error);
    ShowDisplayNameToast("error");
  } finally {
    dispatch(setChangingDisplayName(false));
  }
}
