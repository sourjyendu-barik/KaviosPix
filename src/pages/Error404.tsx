import { useNavigate } from "react-router-dom";

const Error404 = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F8F8] px-4">
      <div className="w-full max-w-md rounded-3xl border border-gray-200 bg-white p-10 text-center shadow-sm">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-black text-white">
          <span className="text-3xl font-bold">!</span>
        </div>

        <h1 className="text-6xl font-black tracking-tight text-gray-900">
          404
        </h1>

        <h2 className="mt-3 text-2xl font-semibold text-gray-900">
          Page Not Found
        </h2>

        <p className="mt-3 text-sm leading-6 text-gray-500">
          The page you're looking for doesn't exist or has been moved. Please
          return to the sign in page and try again.
        </p>

        <button
          onClick={() => navigate("/signIn")}
          className="mt-8 w-full rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition-all duration-200 hover:bg-gray-800 active:scale-95"
        >
          Refresh
        </button>
      </div>
    </div>
  );
};

export default Error404;
