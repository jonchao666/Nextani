import Link from "next/link";

const ErrorPage = () => {
  return (
    <div className="h-">
      <div className="max-w-screen h-5/6 flex flex-col justify-center items-center">
        <p className="text-5xl font-bold">An unexpected error has occurred.</p>
        <div className="flex">
          <p className="my-4 mr-2">Return to</p>
          <Link href="/">Home</Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
