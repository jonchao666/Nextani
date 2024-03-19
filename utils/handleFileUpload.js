import { setDisplayImageUrl } from "@/reducers/userSlice";
import { ShowAvatarUploadToast } from "@/components/layout/Toasts";
import { getIdToken } from "@/utils/firebaseAuth";

export default async function handleFileUpload(event, dispatch) {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = async (event) => {
    const img = new Image();
    img.src = event.target.result;
    img.onload = async () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      const maxWidth = 300;
      const maxHeight = 300;
      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > maxWidth) {
          height *= maxWidth / width;
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width *= maxHeight / height;
          height = maxHeight;
        }
      }

      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);

      const base64Image = canvas.toDataURL("image/jpeg", 0.8);
      const idToken = await getIdToken();
      try {
        const response = await fetch(
          `${process.env.API_URL}/user/updateProfilePicture`,
          {
            method: "POST",
            body: JSON.stringify({ profilePictureBase64: base64Image }),
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${idToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        dispatch(setDisplayImageUrl(data.profilePicture));
        ShowAvatarUploadToast("success");
      } catch (error) {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
        ShowAvatarUploadToast("error");
      }
    };
  };
  reader.readAsDataURL(file);
}
