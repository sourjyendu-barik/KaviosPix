//import React from "react";
import { useState } from "react";
import { useNavigate, type NavigateFunction } from "react-router-dom";
import { useGoogleLogin, type CodeResponse } from "@react-oauth/google";
import { googleAuth } from "../api";
import { useUserContext } from "../context/AuthProvider";
import Loader from "../components/Loader";
//import axios from "axios";
import {
  showToastError,
  showToastSuccess,
} from "../ToastServices/toastService";
const SignIn = () => {
  const { setUser, fetchUserDetails } = useUserContext();
  const navigate: NavigateFunction = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSuccess = async (authResult: CodeResponse) => {
    //console.log(authResult);
    setLoading(true);
    try {
      if (authResult[`code`]) {
        const result = await googleAuth(authResult[`code`]);
        // console.log(result.data.user);
        setUser(result?.data?.user);

        await fetchUserDetails();
        showToastSuccess("Login Successfully");
        navigate("/dashboard", { replace: true });
      }
    } catch (error) {
      console.error(error);
      showToastError("Error in signUp");
    } finally {
      setLoading(false);
    }
  };
  const handlError = async (
    errorResult: Pick<
      CodeResponse,
      "error" | "error_description" | "error_uri"
    >,
  ) => {
    showToastError(JSON.stringify(errorResult));
  };
  const googleLogin = useGoogleLogin({
    onSuccess: handleSuccess,
    onError: handlError,
    flow: "auth-code",
  });
  if (loading) {
    return <Loader message="Signing you in..." />;
  }
  return (
    <div className="flex justify-center items-center min-h-screen bg-white sm:bg-gray-50">
      <div className="w-full min-h-screen sm:min-h-0 flex flex-col justify-center sm:block sm:max-w-md sm:rounded-2xl sm:border sm:border-gray-200 sm:shadow-sm px-6 py-10 sm:p-10">
        <div className="text-center">
          <div className="mb-8 sm:mb-6 flex justify-center">
            <div className="w-16 h-16 rounded-2xl bg-gray-900 flex items-center justify-center text-white text-2xl font-bold">
              K
            </div>
          </div>

          <h2 className="text-2xl sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-1">
            Welcome to KaviosPix
          </h2>

          <p className="text-sm text-gray-500 mb-8 sm:mb-6">
            Sign in or create your account in one click
          </p>

          <button
            className="w-full flex items-center justify-center gap-2 py-3.5 sm:py-3 rounded-xl border border-gray-300 text-gray-800 font-medium shadow-sm hover:bg-gray-50 active:bg-gray-100 transition"
            onClick={() => googleLogin()}
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              width="20"
            />
            Continue with Google
          </button>

          <p className="flex items-center justify-center gap-1 text-xs text-gray-400 mt-8 sm:mt-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-3.5 h-3.5 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 10-8 0v4h8z"
              />
            </svg>
            Secure authentication powered by Google OAuth
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
