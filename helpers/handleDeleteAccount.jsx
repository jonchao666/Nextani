export default async function handleDeleteAccount(token) {
  try {
    const jwt =
      typeof window !== "undefined" ? localStorage.getItem("jwt") : null;
    const response = await fetch(`${process.env.API_URL}/user/deleteAccount`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: token }),
    });

    const data = await response.json();
    if (response.ok) {
      localStorage.removeItem("jwt");

      console.log("Account has been deleted:", data);
      return true;
    } else {
      console.error("Failed to delete account:", data);
      return false;
    }
  } catch (error) {
    console.error("Error deleting account:", error);
    return false;
  }
}
