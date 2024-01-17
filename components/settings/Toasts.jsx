import toast from "react-hot-toast";
export const showEmailChangeToast = (emailChange, type, error) => {
  const isSuccess = type === "success";
  const backgroundColor = isSuccess ? "bg-primary" : "bg-danger";
  const message = isSuccess ? (
    <div>
      <p className="font-bold">
        Please verify your email to complete the change.
      </p>
      <p>Please follow the verification link sent to</p>
      <p className="font-bold">{emailChange}</p>
    </div>
  ) : (
    `An error occurred. Please try again.${error}`
  );

  toast.custom(
    (t) => (
      <div
        className={`max-h-[92px] w-[420px] p-4 rounded-xl flex items-center justify-between ${backgroundColor}`}
      >
        <div className=" text-sm text-white">{message}</div>

        <span
          onClick={() => toast.remove(t.id)}
          className="material-symbols-outlined text-white hover:bg-primary-600 rounded-full cursor-pointer p-1"
          style={{
            fontVariationSettings: `"FILL" 0, "wght" 250, "GRAD" 0, "opsz" 24`,
          }}
        >
          close
        </span>
      </div>
    ),
    {
      duration: Infinity,
    }
  );
};

export const EmailChangedToast = () => {
  toast.custom((t) => (
    <div
      className={`max-h-[92px] w-[420px] p-4 rounded-xl flex items-center justify-between bg-primary`}
    >
      <div className="text-sm text-white">
        <p>Your email address was changed successfully.</p>
      </div>
      <span
        onClick={() => toast.remove(t.id)}
        className="material-symbols-outlined text-white hover:bg-primary-600 rounded-full cursor-pointer p-1"
        style={{
          fontVariationSettings: `"FILL" 0, "wght" 250, "GRAD" 0, "opsz" 24`,
        }}
      >
        close
      </span>
    </div>
  ));
};

// export const showEmailToast = (type) => {
//   const isSuccess = type === "success";
//   const backgroundColor = isSuccess ? "bg-primary" : "bg-danger";
//   const message = isSuccess
//     ? "Your email has been updated."
//     : "An error occurred. Please try again.";

//   toast.custom((t) => (
//     <div
//       className={`max-h-[92px] w-[420px] p-4 rounded-xl flex items-center justify-between ${backgroundColor}`}
//     >
//       <div className="text-sm text-white">
//         <p>{message}</p>
//       </div>
//       <span
//         onClick={() => toast.remove(t.id)}
//         className="material-symbols-outlined text-white hover:bg-primary-600 rounded-full cursor-pointer p-1"
//         style={{
//           fontVariationSettings: `"FILL" 0, "wght" 250, "GRAD" 0, "opsz" 24`,
//         }}
//       >
//         close
//       </span>
//     </div>
//   ));
// };

export const showDisplayNameToast = (type) => {
  const isSuccess = type === "success";
  const backgroundColor = isSuccess ? "bg-primary" : "bg-danger";
  const message = isSuccess
    ? "Your name has been updated."
    : "An error occurred. Please try again.";

  toast.custom((t) => (
    <div
      className={`max-h-[92px] w-[420px] p-4 rounded-xl flex items-center justify-between ${backgroundColor}`}
    >
      <div className="text-sm text-white">
        <p>{message}</p>
      </div>
      <span
        onClick={() => toast.remove(t.id)}
        className="material-symbols-outlined text-white hover:bg-primary-600 rounded-full cursor-pointer p-1"
        style={{
          fontVariationSettings: `"FILL" 0, "wght" 250, "GRAD" 0, "opsz" 24`,
        }}
      >
        close
      </span>
    </div>
  ));
};

export const showAvatarUploadToast = (type) => {
  const isSuccess = type === "success";
  const backgroundColor = isSuccess ? "bg-primary" : "bg-danger";
  const message = isSuccess
    ? "Avatar has been updated."
    : "An error occurred. Please try again.";

  toast.custom((t) => (
    <div
      className={`max-h-[92px] w-[420px] p-4 rounded-xl flex items-center justify-between ${backgroundColor}`}
    >
      <div className="text-sm text-white">
        <p>{message}</p>
      </div>
      <span
        onClick={() => toast.remove(t.id)}
        className="material-symbols-outlined text-white hover:bg-primary-600 rounded-full cursor-pointer p-1"
        style={{
          fontVariationSettings: `"FILL" 0, "wght" 250, "GRAD" 0, "opsz" 24`,
        }}
      >
        close
      </span>
    </div>
  ));
};

export const showDeleteAccountToast = (type) => {
  const isSuccess = type === "success";
  const backgroundColor = isSuccess ? "bg-primary" : "bg-danger";
  const message = isSuccess
    ? "Account has been deleted."
    : "An error occurred. Please try again.";

  toast.custom((t) => (
    <div
      className={`max-h-[92px] w-[420px] p-4 rounded-xl flex items-center justify-between ${backgroundColor}`}
    >
      <div className="text-sm text-white">
        <p>{message}</p>
      </div>
      <span
        onClick={() => toast.remove(t.id)}
        className="material-symbols-outlined text-white hover:bg-primary-600 rounded-full cursor-pointer p-1"
        style={{
          fontVariationSettings: `"FILL" 0, "wght" 250, "GRAD" 0, "opsz" 24`,
        }}
      >
        close
      </span>
    </div>
  ));
};
