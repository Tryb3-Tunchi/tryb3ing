import { useState } from "react";
import { useNavigate } from "react-router-dom";
import VerificationModal from "./verifyModal";
import { useAuth } from "../../auth/AuthContext";
import apiService from "../Api/apiService"; // Import the ApiService

const LoginModal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState("login");
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    newPassword: "",
  });
  const [signupData, setSignupData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    password: "",
    verify_password: "",
    agreedToTerms: false,
  });

  const [error, setError] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerificationModalOpen, setVerificationModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const { sign } = useAuth();

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignupChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSignupData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    try {
      const response = await apiService.login({
        email: loginData.email,
        password: loginData.password,
      });
      if (response.access_token) {
        // Both tokens are now saved inside the apiService.login method
        // Just verify refresh token is also saved
        if (!localStorage.getItem("refreshToken") && response.refresh_token) {
          localStorage.setItem("refreshToken", response.refresh_token);
        }
        setActiveTab(onClose);
        sign();
        navigate("/home");
      } else {
        alert("Login failed: No token received");
      }
    } catch (error) {
      console.error("Error occurred during login", error);
      setError("Invalid email or password");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    try {
      const response = await apiService.signup(signupData);
      if (response && response.message) {
        setVerificationModalOpen(true);
        alert("Signup successful! Please verify your email with the OTP sent.");
      } else {
        alert("Signup failed.");
      }
    } catch (error) {
      console.error("An error occurred during signup:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await apiService.verifyOtp(
        signupData.email,
        verificationCode
      );
      if (response.message) {
        // If OTP is valid, log the user in
        const loginResponse = await apiService.login({
          email: signupData.email,
          password: signupData.password,
        });
        if (loginResponse.access_token) {
          // Both tokens are now saved inside the apiService.login method
          setActiveTab(onClose);
          sign();
          navigate("/home"); // Navigate to home
        }
        alert("OTP verified. You are now logged in.");
      } else {
        setError("OTP verification failed.");
      }
    } catch (error) {
      console.error("Error occurred during OTP verification", error);
      setError("Error verifying OTP");
    }
  };

  const handleForgotPasswordRequest = async () => {
    try {
      const response = await apiService.requestForgotPassword(loginData.email);
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
    try {
      const response = await apiService.verifyForgotPasswordOtp(
        loginData.email,
        otp
      );
      if (response.message) {
        alert("OTP verified. You can now set a new password.");
        setIsForgotPassword(false);
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
    try {
      const response = await apiService.setNewPassword(
        loginData.email,
        loginData.newPassword
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

  const handleResend = async () => {
    try {
      await apiService.resendOtp(loginData.email);
      alert("OTP has been resent.");
    } catch (error) {
      console.error("Error occurred while resending OTP", error);
      setError("Error resending OTP");
    }
  };

  // Handle return to login from forgot password
  const handleReturnToLogin = () => {
    setIsForgotPassword(false);
    setError("");
    setLoginData((prev) => ({
      ...prev,
      newPassword: "",
    }));
    setOtp("");
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-opacity duration-300 ease-in-out"
      onClick={onClose}
      style={{
        opacity: isOpen ? 1 : 0,
        transition: "opacity 0.3s ease-in-out",
      }}
    >
      <div
        className="bg-white rounded-lg shadow-2xl w-full max-w-md p-6 relative transform transition-all duration-300 ease-in-out"
        onClick={(e) => e.stopPropagation()}
        style={{
          animation: "modal-pop 0.3s ease-out",
        }}
      >
        <style>
          {`
            @keyframes modal-pop {
              0% {
                opacity: 0;
                transform: scale(0.95) translateY(10px);
              }
              100% {
                opacity: 1;
                transform: scale(1) translateY(0);
              }
            }
          `}
        </style>

        {activeTab === "login" && !isForgotPassword ? (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <h3 className="text-xl font-semibold text-center mb-4">Login</h3>
            <div className="space-y-2">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={loginData.email}
                onChange={handleLoginChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={loginData.password}
                onChange={handleLoginChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-xs text-gray-900"
                >
                  Remember me
                </label>
              </div>
              <button
                type="button"
                onClick={() => setIsForgotPassword(true)}
                className="text-xs text-blue-500 hover:text-blue-700"
              >
                Forgot your password?
              </button>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-3 mt-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
            >
              {isProcessing ? "Logging in..." : "Login"}
            </button>
          </form>
        ) : isForgotPassword ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Forgot Password</h3>
              <button
                onClick={handleReturnToLogin}
                className="text-sm text-blue-500 hover:text-blue-700"
              >
                Return to Login
              </button>
            </div>

            <div className="space-y-2">
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={loginData.email}
                onChange={handleLoginChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="button"
              onClick={handleForgotPasswordRequest}
              className="w-full py-3 mt-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Request OTP
            </button>

            <div className="space-y-2 mt-4">
              <input
                type="text"
                name="otp"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="button"
              onClick={handleVerifyForgotPasswordOtp}
              className="w-full py-3 mt-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Verify OTP
            </button>

            <div className="space-y-2 mt-4">
              <input
                type="password"
                name="newPassword"
                placeholder="Enter new password"
                value={loginData.newPassword}
                onChange={handleLoginChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="button"
              onClick={handleSetNewPassword}
              className="w-full py-3 mt-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Set New Password
            </button>
          </div>
        ) : (
          <form onSubmit={handleSignupSubmit} className="space-y-4">
            <h3 className="text-xl font-semibold text-center mb-4">Sign Up</h3>
            <div className="space-y-2">
              <input
                type="text"
                name="first_name"
                placeholder="First Name"
                value={signupData.first_name}
                onChange={handleSignupChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              <input
                type="text"
                name="last_name"
                placeholder="Last Name"
                value={signupData.last_name}
                onChange={handleSignupChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={signupData.email}
                onChange={handleSignupChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              <input
                type="tel"
                name="phone_number"
                placeholder="Phone Number"
                value={signupData.phone_number}
                onChange={handleSignupChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              <input
                type="password"
                name="password"
                placeholder="Password (8 characters at least)"
                value={signupData.password}
                onChange={handleSignupChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              <input
                type="password"
                name="verify_password"
                placeholder="Verify Password (8 characters at least)"
                value={signupData.verify_password}
                onChange={handleSignupChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                name="agreedToTerms"
                checked={signupData.agreedToTerms}
                onChange={handleSignupChange}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="agreedToTerms" className="ml-2 text-sm">
                Agree to Terms and Conditions
              </label>
            </div>
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-3 mt-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
            >
              {isProcessing ? "Signing Up..." : "Sign Up"}
            </button>
          </form>
        )}

        {/* Toggle between Login and Sign Up tabs */}
        {!isForgotPassword && (
          <div className="text-center mt-4">
            {activeTab === "login" ? (
              <span>
                Don't have an account?{" "}
                <button
                  onClick={() => setActiveTab("signup")}
                  className="text-blue-500 hover:text-blue-700"
                >
                  Sign Up
                </button>
              </span>
            ) : (
              <span>
                Already have an account?{" "}
                <button
                  onClick={() => setActiveTab("login")}
                  className="text-blue-500 hover:text-blue-700"
                >
                  Login
                </button>
              </span>
            )}
          </div>
        )}
      </div>

      {/* Verification Modal */}
      <VerificationModal
        isOpen={isVerificationModalOpen}
        onClose={() => setVerificationModalOpen(false)}
        onVerify={handleVerifyOtp}
        onResend={handleResend}
        verificationCode={verificationCode}
        setVerificationCode={setVerificationCode}
      />
    </div>
  );
};

export default LoginModal;