//import React from "react";
import { useNavigate, type NavigateFunction } from "react-router-dom";
import { useGoogleLogin, type CodeResponse } from "@react-oauth/google";
import { googleAuth } from "../api";
import { useUserContext } from "../context/AuthProvider";
import axios from "axios";
const SignIn = () => {
  const { setUser } = useUserContext();
  const navigate: NavigateFunction = useNavigate();

  const handleSuccess = async (authResult: CodeResponse) => {
    // console.log(authResult);
    try {
      if (authResult[`code`]) {
        const result = await googleAuth(authResult[`code`]);
        // console.log(result.data.user);
        setUser(result?.data?.user);
        // console.log(user);
        console.log("navigate happened");
        navigate("/dashboard", { replace: true });
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("Status:", error.response?.status);
        console.log("Data:", error.response?.data);
      } else {
        console.error(error);
      }
    }
  };
  const handlError = async (
    errorResult: Pick<
      CodeResponse,
      "error" | "error_description" | "error_uri"
    >,
  ) => {
    console.log("Google login Failed", errorResult);
  };
  const googleLogin = useGoogleLogin({
    onSuccess: handleSuccess,
    onError: handlError,
    flow: "auth-code",
  });
  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background:
          "linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #ec4899 100%)",
      }}
    >
      <div
        className="card shadow-lg border-0 rounded-4 p-5"
        style={{
          width: "420px",
          background: "rgba(255,255,255,0.95)",
        }}
      >
        <div className="text-center">
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            width="70"
            className="mb-4"
          />

          <h2 className="fw-bold mb-2">Welcome Back</h2>

          <p className="text-muted mb-4">Sign in to access your account</p>

          <button
            className="btn btn-outline-dark w-100 d-flex align-items-center justify-content-center py-3 rounded-3 shadow-sm"
            onClick={() => googleLogin()}
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              width="22"
              className="me-2"
            />
            Continue with Google
          </button>

          <hr className="my-4" />

          <p className="text-secondary small mb-0">
            Secure authentication powered by Google OAuth
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
