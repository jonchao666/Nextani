import toast from "react-hot-toast";
export const ShowEmailChangeToast = (emailChange, type, error) => {
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
        className={`max-h-[92px] sm:w-[420px] w-full p-4 rounded-xl flex items-center justify-between ${backgroundColor}`}
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
      className={`max-h-[92px] sm:w-[420px] w-full p-4 rounded-xl flex items-center justify-between bg-primary`}
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

export const ShowDisplayNameToast = (type) => {
  const isSuccess = type === "success";
  const backgroundColor = isSuccess ? "bg-primary" : "bg-danger";
  const message = isSuccess
    ? "Your name has been updated."
    : "An error occurred. Please try again.";

  toast.custom((t) => (
    <div
      className={`max-h-[92px] sm:w-[420px] w-full p-4 rounded-xl flex items-center justify-between ${backgroundColor}`}
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

export const ShowAvatarUploadToast = (type) => {
  const isSuccess = type === "success";
  const backgroundColor = isSuccess ? "bg-primary" : "bg-danger";
  const message = isSuccess
    ? "Avatar has been updated."
    : "An error occurred. Please try again.";

  toast.custom((t) => (
    <div
      className={`max-h-[92px] sm:w-[420px] w-full p-4 rounded-xl flex items-center justify-between ${backgroundColor}`}
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

export const ShowDeleteAccountToast = (type) => {
  const isSuccess = type === "success";
  const backgroundColor = isSuccess ? "bg-primary" : "bg-danger";
  const message = isSuccess
    ? "Account has been deleted."
    : "An error occurred. Please try again.";

  toast.custom((t) => (
    <div
      className={`max-h-[92px] sm:w-[420px] w-full p-4 rounded-xl flex items-center justify-between ${backgroundColor}`}
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

export const ShowDeletingAccountToast = (type, error) => {
  const isSuccess = type === "success";
  const backgroundColor = isSuccess ? "bg-primary" : "bg-danger";
  const message = isSuccess ? (
    <div>
      <p>We have sent you an email with a confirmation link.</p>
    </div>
  ) : (
    `An error occurred. Please try again.${error}`
  );

  toast.custom((t) => (
    <div
      className={`max-h-[92px] sm:w-[420px] w-full p-4 rounded-xl flex items-center justify-between ${backgroundColor}`}
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
  ));
};

//UserActivity

export const UserActivityToast = (type, data) => {
  const isSuccess = type === "success";
  const backgroundColor = isSuccess ? "bg-foreground" : "bg-danger";
  const message = data;

  toast.custom((t) => (
    <div
      className={`max-h-[92px] sm:w-[420px] w-full p-4 rounded-xl flex items-center justify-between ${backgroundColor}`}
    >
      <div className=" text-sm text-background">{message}</div>

      <span
        onClick={() => toast.remove(t.id)}
        className="material-symbols-outlined text-background hover:bg-primary-600 rounded-full cursor-pointer p-1"
        style={{
          fontVariationSettings: `"FILL" 0, "wght" 250, "GRAD" 0, "opsz" 24`,
        }}
      >
        close
      </span>
    </div>
  ));
};