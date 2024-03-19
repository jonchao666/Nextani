const LoginFailed = () => {
  const handleBackToHome = () => {
    window.location.href = "/";
  };
  return (
    <div className="h-screen">
      <div className="max-w-screen h-5/6 flex flex-col justify-center items-center">
        <p className="text-2xl font-bold">Login Failed</p>
        <p className="my-4 text-center px-3">
          There was a problem with login in. Please try again later or contact
          support.
        </p>
        <div onClick={handleBackToHome} className="text-center text-primary">
          Back to home
        </div>
      </div>
    </div>
  );
};

export default LoginFailed;
