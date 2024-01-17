import { setDisplayImageUrl } from "@/reducers/userSlice";
import toast from "react-hot-toast";
import { showAvatarUploadToast } from "@/components/settings/Toasts";

export default async function handleFileUpload(event, dispatch) {
  const jwt =
    typeof window !== "undefined" ? localStorage.getItem("jwt") : null;
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = (event) => {
    console.log("reader loaded");
    const img = new Image();
    img.src = event.target.result;

    img.onload = () => {
      console.log("Image loaded");
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      // 目标尺寸
      const targetWidth = 300;
      const targetHeight = 300;

      // 计算最佳缩放比例
      const scale = Math.min(
        img.width / targetWidth,
        img.height / targetHeight
      );

      // 设置画布尺寸
      canvas.width = targetWidth;
      canvas.height = targetHeight;

      // 计算绘制的起始点和宽高
      const centerX = img.width / 2;
      const centerY = img.height / 2;
      const sourceWidth = targetWidth * scale;
      const sourceHeight = targetHeight * scale;
      const sourceX = centerX - sourceWidth / 2;
      const sourceY = centerY - sourceHeight / 2;

      // 绘制到画布上
      ctx.drawImage(
        img,
        sourceX,
        sourceY,
        sourceWidth,
        sourceHeight,
        0,
        0,
        targetWidth,
        targetHeight
      );

      async function uploadCompressedImage(blob) {
        try {
          const formData = new FormData();
          formData.append("file", blob, "compressed.jpg");

          const response = await fetch(`${process.env.API_URL}/upload`, {
            method: "POST",
            body: formData,
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();

          console.log("File successfully uploaded", data);
          const uploadedImageUrl = `${process.env.API_URL}${data.profilePicture}`;

          dispatch(setDisplayImageUrl(uploadedImageUrl));
          showAvatarUploadToast("success");
        } catch (error) {
          console.error(
            "There has been a problem with your fetch operation:",
            error
          );
          showAvatarUploadToast("error");
        }
      }

      canvas.toBlob(
        async (blob) => {
          // Generate the preview URL from the compressed image blob
          const previewUrl = URL.createObjectURL(blob);

          // Update the avatar's src attribute to show the new image
          const avatarImageElement = document.querySelector(".avatar-image");
          if (avatarImageElement) {
            avatarImageElement.src = previewUrl;
          }

          // Now upload the compressed image to the server
          await uploadCompressedImage(blob);

          // Clean up the preview URL after the upload
          URL.revokeObjectURL(previewUrl);
        },
        "image/jpeg",
        0.8
      );
    };
  };
  reader.readAsDataURL(file);
}
