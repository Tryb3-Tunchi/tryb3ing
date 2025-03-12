import { useState } from "react";
import { useNavigate } from "react-router-dom";
import VerificationModal from "../../components/login/verifyModal";
import apiService from "../Api/apiService";
import { useAuth } from "../../auth/AuthContext";

const SignInPage = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isVerificationModalOpen, setVerificationModalOpen] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [forgotPasswordData, setForgotPasswordData] = useState({
    email: "",
    otp: "",
    newPassword: "",
  });
  const navigate = useNavigate();
  const { sign } = useAuth();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (isForgotPassword) {
      setForgotPasswordData((prev) => ({ ...prev, [name]: value }));
      if (name === "newPassword") {
        setError("");
      }
    } else {
      setLoginData((prev) => ({ ...prev, [name]: value }));
      if (name === "password") {
        setError("");
      }
    }
  };

  const validatePassword = (password) => {
    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validatePassword(loginData.password)) {
      return;
    }
    try {
      const response = await apiService.login(loginData);

      if (response.access_token) {
        // The apiService already stores tokens in localStorage
        // Just verify that both tokens were received and stored
        if (!response.refresh_token) {
          console.error("Refresh token not received");
          setError("Authentication error: missing refresh token");
          return;
        }

        // Double-check that tokens are in localStorage
        const storedToken = localStorage.getItem("token");
        const storedRefreshToken = localStorage.getItem("refreshToken");

        if (!storedToken || !storedRefreshToken) {
          console.error("Tokens not properly stored in localStorage");
          // Manually store them again to be safe
          localStorage.setItem("token", response.access_token);
          localStorage.setItem("refreshToken", response.refresh_token);
        }

        setVerificationModalOpen(true);
        if (rememberMe) {
          localStorage.setItem("rememberedEmail", loginData.email);
        }
        sign();
        navigate("/home");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setError("Invalid Login Info or check network");
    }
  };

  const handleVerifyCode = async (otp) => {
    try {
      const response = await apiService.verifyOtp(loginData.email, otp);
      if (response.message) {
        // Ensure we have valid tokens after OTP verification
        const storedToken = localStorage.getItem("token");
        const storedRefreshToken = localStorage.getItem("refreshToken");

        if (!storedToken || !storedRefreshToken) {
          console.error("Tokens missing after OTP verification");
          setError("Authentication error after verification");
          return;
        }

        navigate("/home");
      } else {
        alert("OTP verification failed.");
      }
    } catch (error) {
      console.error("Error occurred during OTP verification", error);
      setError("OTP verification failed");
    }
  };

  const handleResend = async () => {
    try {
      await apiService.resendOtp(loginData.email);
      alert("OTP has been resent.");
    } catch (error) {
      console.error("Error occurred while resending OTP", error);
      setError("Error resending OTP");
    }
  };

  const handleForgotPasswordRequest = async () => {
    if (!forgotPasswordData.email) {
      setError("Please enter your email address");
      return;
    }
    try {
      const response = await apiService.requestPasswordChange(
        forgotPasswordData.email
      );
      if (response.message) {
        alert("OTP has been sent to your email.");
      } else {
        setError("Failed to send OTP for password reset.");
      }
    } catch (error) {
      console.error("Error occurred during forgot password request", error);
      setError("Error occurred while requesting password reset");
    }
  };

  const handleVerifyForgotPasswordOtp = async () => {
    if (!forgotPasswordData.otp) {
      setError("Please enter the OTP");
      return;
    }
    try {
      const response = await apiService.verifyPasswordChange(
        forgotPasswordData.email,
        forgotPasswordData.otp
      );
      if (response.message) {
        alert("OTP verified. You can now set a new password.");
      } else {
        setError("OTP verification for password reset failed.");
      }
    } catch (error) {
      console.error(
        "Error occurred during forgot password OTP verification",
        error
      );
      setError("Error verifying OTP for password reset");
    }
  };

  const handleSetNewPassword = async () => {
    if (!validatePassword(forgotPasswordData.newPassword)) {
      return;
    }
    try {
      const response = await apiService.setNewPassword(
        forgotPasswordData.email,
        forgotPasswordData.newPassword
      );
      if (response.message) {
        alert(
          "Password reset successful. You can now log in with your new password."
        );
        setIsForgotPassword(false);
      } else {
        setError("Failed to reset password.");
      }
    } catch (error) {
      console.error("Error occurred while setting new password", error);
      setError("Error resetting password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tl from-blue-50 via-indigo-50 to-purple-50 px-4 py-12 relative overflow-hidden">
      {/* Mobile background effect */}
      <div className=" inset-0 md:hidden">
        <div className=" inset-0 bg-blue-500 opacity-5">
          <div className="absolute w-96 h-96 -top-48 -left-48 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute w-96 h-96 -bottom-48 -right-48 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        </div>
      </div>

      <div className="max-w-4xl w-full mx-auto bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
        <div className="md:w-1/2 p-8">
          <div className="max-w-md mx-auto space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900">
                {isForgotPassword ? "Reset your password" : "Welcome back"}
              </h2>
              <p className="mt-2 text-gray-600">
                {isForgotPassword ? (
                  <button
                    onClick={() => {
                      setIsForgotPassword(false);
                      setError("");
                    }}
                    className="font-medium text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    Back to login
                  </button>
                ) : (
                  <button
                    onClick={() => navigate("/signUp")}
                    className="font-medium text-blue-600 hover:text-blue-700 transition-colors"
                    type="button"
                  >
                    Create a new account
                  </button>
                )}
              </p>
            </div>

            {isForgotPassword ? (
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-4">
                  <div className="transform transition-all duration-300 hover:-translate-y-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={forgotPasswordData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 outline-none"
                      placeholder="Email"
                    />
                  </div>

                  {forgotPasswordData.otp && (
                    <div className="transform transition-all duration-300 hover:-translate-y-1">
                      <input
                        id="otp"
                        name="otp"
                        type="text"
                        required
                        value={forgotPasswordData.otp}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 outline-none"
                        placeholder="OTP"
                      />
                    </div>
                  )}

                  {forgotPasswordData.otp && (
                    <div className="transform transition-all duration-300 hover:-translate-y-1">
                      <input
                        id="newPassword"
                        name="newPassword"
                        type="password"
                        required
                        value={forgotPasswordData.newPassword}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 outline-none"
                        placeholder="New Password (minimum 8 characters)"
                      />
                    </div>
                  )}
                </div>

                {error && (
                  <p className="text-red-500 text-sm mt-2 animate-shake">
                    {error}
                  </p>
                )}

                {!forgotPasswordData.otp ? (
                  <button
                    onClick={handleForgotPasswordRequest}
                    className="w-full py-3 px-4 border border-transparent rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0"
                  >
                    Request OTP
                  </button>
                ) : (
                  <div className="space-y-4">
                    <button
                      onClick={handleVerifyForgotPasswordOtp}
                      className="w-full py-3 px-4 border border-transparent rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0"
                    >
                      Verify OTP
                    </button>
                    <button
                      onClick={handleSetNewPassword}
                      className="w-full py-3 px-4 border border-transparent rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0"
                    >
                      Set New Password
                    </button>
                  </div>
                )}
              </form>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div className="transform transition-all duration-300 hover:-translate-y-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={loginData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 outline-none"
                      placeholder="Email"
                    />
                  </div>

                  <div className="transform transition-all duration-300 hover:-translate-y-1">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      required
                      value={loginData.password}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 outline-none"
                      placeholder="Password (minimum 8 characters)"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-2 block text-sm text-gray-700 cursor-pointer"
                    >
                      Remember me
                    </label>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setIsForgotPassword(true);
                      setError("");
                    }}
                    className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>

                {error && (
                  <p className="text-red-500 text-sm mt-2 animate-shake">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full py-3 px-4 border border-transparent rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0"
                >
                  Sign in
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="md:w-1/2 bg-blue-600 p-8 hidden md:flex flex-col justify-center items-center text-white">
          <img
            src="clothASL2.png"
            alt="Login illustration"
            className="w-full max-w-sm mb-8 rounded-lg shadow-lg"
          />
          <h2 className="text-3xl font-bold mb-4">Hello, Friend!</h2>
          <p className="text-blue-100 text-center">
            Enter your personal details and start your journey with us
          </p>
        </div>
      </div>

      <VerificationModal
        isOpen={isVerificationModalOpen}
        onClose={() => setVerificationModalOpen(false)}
        onVerify={handleVerifyCode}
        onResend={handleResend}
        verificationCode={verificationCode}
        setVerificationCode={setVerificationCode}
      />
    </div>
  );
};

export default SignInPage;
