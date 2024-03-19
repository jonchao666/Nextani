import toast from "react-hot-toast";

export const ShowEmailChangeToast = (emailChange, type, error) => {
  toast.dismiss();
  const isSuccess = type === "success";
  const backgroundColor = isSuccess ? "bg-foreground" : "bg-danger";
  const closeIconBg = isSuccess
    ? "hover:bg-foreground text-background"
    : "hover:bg-danger-600 text-white";
  const message = isSuccess ? (
    <div>
      <p className="font-bold">
        Please verify your email to complete the change.
      </p>
      <p>
        Please follow the verification link sent to{" "}
        <span className="font-bold">{emailChange}</span>
      </p>

      <p>
        If you haven&apos;t received the email, it might be because the email
        address is already in use with another account. Please check your spam
        folder as well. If the issue persists, consider using a different email
        address or contact support for assistance.
      </p>
    </div>
  ) : (
    error
  );

  toast.custom(
    (t) => (
      <div
        className={`
       sm:max-w-[420px] w-full p-4 rounded-xl flex items-center justify-between ${backgroundColor}`}
      >
        <div className=" text-sm text-white">{message}</div>

        <span
          onClick={() => toast.remove(t.id)}
          className={`material-symbols-outlined  ${closeIconBg} rounded-full cursor-pointer p-1`}
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

export const ShowDisplayNameToast = (type) => {
  const isSuccess = type === "success";
  const backgroundColor = isSuccess ? "bg-foreground" : "bg-danger";
  const foregroundColor = isSuccess ? "text-background" : "text-white";
  const closeIconBg = isSuccess
    ? "hover:bg-foreground text-background"
    : "hover:bg-danger-600 text-white";
  const message = isSuccess
    ? "Your display name has been updated."
    : "An error occurred. Please try again.";

  toast.custom((t) => (
    <div
      className={` sm:w-[420px] w-full p-4 rounded-xl flex items-center justify-between ${backgroundColor}`}
    >
      <div className={`text-sm ${foregroundColor}`}>
        <p>{message}</p>
      </div>
      <span
        onClick={() => toast.remove(t.id)}
        className={`material-symbols-outlined  ${closeIconBg} rounded-full cursor-pointer p-1`}
        style={{
          fontVariationSettings: `"FILL" 0, "wght" 250, "GRAD" 0, "opsz" 24`,
        }}
      >
        close
      </span>
    </div>
  )),
    {
      duration: 3000,
    };
};

export const ShowAvatarUploadToast = (type) => {
  const isSuccess = type === "success";
  const backgroundColor = isSuccess ? "bg-foreground" : "bg-danger";
  const closeIconBg = isSuccess
    ? "hover:bg-foreground text-background"
    : "hover:bg-danger-600 text-white";
  const message = isSuccess
    ? "Avatar has been updated."
    : "An error occurred. Please try again.";

  toast.custom((t) => (
    <div
      className={` sm:w-[420px] w-full p-4 rounded-xl flex items-center justify-between ${backgroundColor}`}
    >
      <div className="text-sm text-white">
        <p>{message}</p>
      </div>
      <span
        onClick={() => toast.remove(t.id)}
        className={`material-symbols-outlined  ${closeIconBg} rounded-full cursor-pointer p-1`}
        style={{
          fontVariationSettings: `"FILL" 0, "wght" 250, "GRAD" 0, "opsz" 24`,
        }}
      >
        close
      </span>
    </div>
  ));
};

export const ShowDeleteAccountToast = (type, error) => {
  const isSuccess = type === "success";
  const backgroundColor = isSuccess ? "bg-primary" : "bg-danger";
  const closeIconBg = isSuccess
    ? "hover:bg-foreground text-background"
    : "hover:bg-danger-600 text-white";
  const message = isSuccess ? "Account has been deleted." : error;

  toast.custom((t) => (
    <div
      className={` sm:w-[420px] w-full p-4 rounded-xl flex items-center justify-between ${backgroundColor}`}
    >
      <div className="text-sm text-white">
        <p>{message}</p>
      </div>
      <span
        onClick={() => toast.remove(t.id)}
        className={`material-symbols-outlined ${closeIconBg} rounded-full cursor-pointer p-1`}
        style={{
          fontVariationSettings: `"FILL" 0, "wght" 250, "GRAD" 0, "opsz" 24`,
        }}
      >
        close
      </span>
    </div>
  ));
};

export const ShowResetPasswordToast = (email, type, error) => {
  const isSuccess = type === "success";
  const backgroundColor = isSuccess ? "bg-foreground" : "bg-danger";
  const closeIconBg = isSuccess
    ? "hover:bg-foreground text-background"
    : "hover:bg-danger-600 text-white";
  const message = isSuccess ? (
    <div>
      <p className="font-bold">
        Please verify your email to complete the change.
      </p>
      <p>Please follow the verification link sent to</p>
      <p className="font-bold">{email}</p>
    </div>
  ) : (
    error
  );

  toast.custom((t) => (
    <div
      className={`sm:w-[420px] w-full p-4 rounded-xl flex items-center justify-between ${backgroundColor}`}
    >
      <div className=" text-sm text-white">{message}</div>

      <span
        onClick={() => toast.remove(t.id)}
        className={`material-symbols-outlined  ${closeIconBg} rounded-full cursor-pointer p-1`}
        style={{
          fontVariationSettings: `"FILL" 0, "wght" 250, "GRAD" 0, "opsz" 24`,
        }}
      >
        close
      </span>
    </div>
  ));
};

export const ShowVerifyEmailToast = (type, error) => {
  const isSuccess = type === "success";
  const backgroundColor = isSuccess ? "bg-primary" : "bg-danger";
  const closeIconBg = isSuccess
    ? "hover:bg-foreground text-background"
    : "hover:bg-danger-600 text-white";
  const message = isSuccess ? "Verifycation email has been sent." : error;

  toast.custom((t) => (
    <div
      className={` sm:w-[420px] w-full p-4 rounded-xl flex items-center justify-between ${backgroundColor}`}
    >
      <div className="text-sm text-white">
        <p>{message}</p>
      </div>
      <span
        onClick={() => toast.remove(t.id)}
        className={`material-symbols-outlined ${closeIconBg} rounded-full cursor-pointer p-1`}
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
  const closeIconBg = isSuccess
    ? "hover:bg-foreground text-background"
    : "hover:bg-danger-600 text-white";
  const message = data;

  toast.custom((t) => (
    <div
      className={` sm:w-[420px] w-full p-4 rounded-xl flex items-center justify-between ${backgroundColor}`}
    >
      <div className=" text-sm text-background line-clamp-2 break-all">
        {message}
      </div>

      <span
        onClick={() => toast.remove(t.id)}
        className={`material-symbols-outlined  ${closeIconBg} rounded-full cursor-pointer p-1`}
        style={{
          fontVariationSettings: `"FILL" 0, "wght" 250, "GRAD" 0, "opsz" 24`,
        }}
      >
        close
      </span>
    </div>
  )),
    {
      duration: 3000,
    };
};
