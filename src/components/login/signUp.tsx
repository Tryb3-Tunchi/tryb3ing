import { useState } from "react";
import { useNavigate } from "react-router-dom";
import VerificationModal from "../../components/login/verifyModal";
import apiService from "../Api/apiService";
import { useAuth } from "../../auth/AuthContext";

const SignUpPage = () => {
  const [signupData, setSignupData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    password: "",
    verify_password: "",
    agreedToTerms: false,
  });
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerificationModalOpen, setVerificationModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { sign } = useAuth();

  const handleSignupChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSignupData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error when user types
    setError("");
  };

  const validateForm = () => {
    if (signupData.password !== signupData.verify_password) {
      setError("Passwords do not match!");
      return false;
    }

    if (signupData.password.length < 8) {
      setError("Password must be at least 8 characters long");
      return false;
    }

    if (!signupData.agreedToTerms) {
      setError("You must agree to the terms and conditions");
      return false;
    }

    return true;
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsProcessing(true);
    try {
      // Using apiService signup method
      const userData = {
        first_name: signupData.first_name,
        last_name: signupData.last_name,
        email: signupData.email,
        phone_number: signupData.phone_number,
        password: signupData.password,
      };

      const response = await apiService.signup(userData);
      if (response && response.message) {
        setVerificationModalOpen(true);
      } else {
        setError("Signup failed");
      }
    } catch (error) {
      console.error("Error occurred during signup", error);
      setError("Signup failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleVerifyCode = async (otp) => {
    setIsProcessing(true);
    try {
      const response = await apiService.verifyOtp(signupData.email, otp);
      if (response) {
        // After verification, login the user
        const loginResponse = await apiService.login({
          email: signupData.email,
          password: signupData.password,
        });

        if (loginResponse.access_token) {
          // Verify that both tokens were received properly
          if (!loginResponse.refresh_token) {
            console.error("Refresh token not received");
            setError("Authentication error: missing refresh token");
            setIsProcessing(false);
            return;
          }

          // Double-check that tokens are in localStorage (should be handled by apiService.login)
          const storedToken = localStorage.getItem("token");
          const storedRefreshToken = localStorage.getItem("refreshToken");

          if (!storedToken || !storedRefreshToken) {
            console.error("Tokens not properly stored in localStorage");
            // Manually store them again to be safe
            localStorage.setItem("token", loginResponse.access_token);
            localStorage.setItem("refreshToken", loginResponse.refresh_token);
          }

          // Token is stored by apiService
          setVerificationModalOpen(false);
          sign();
          navigate("/home");
        } else {
          setError("Login failed after verification");
        }
      } else {
        setError("OTP verification failed");
      }
    } catch (error) {
      console.error("Error occurred during OTP verification", error);
      setError("OTP verification failed");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleResend = async () => {
    setIsProcessing(true);
    try {
      await apiService.resendOtp(signupData.email);
      alert("OTP has been resent");
    } catch (error) {
      console.error("Error occurred while resending OTP", error);
      setError("Failed to resend OTP");
    } finally {
      setIsProcessing(false);
    }
  };

  const isFormValid =
    signupData.email &&
    signupData.password &&
    signupData.verify_password &&
    signupData.password === signupData.verify_password &&
    signupData.password.length >= 8 &&
    signupData.agreedToTerms;

  return (
    <div className="min-h-screen flex items-center mt-20 justify-center bg-gradient-to-br from-blue-50 to-indigo-50 px-4 py-12">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -left-64 top-0">
          <img
            src="clothASL1.png"
            alt="Decorative left"
            className="opacity-10"
          />
        </div>
        <div className="absolute -right-64 bottom-0">
          <img
            src="/api/placeholder/600/800"
            alt="Decorative right"
            className="opacity-10"
          />
        </div>
      </div>

      <div className="max-w-4xl w-full mx-auto bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
        <div className="md:w-1/2 bg-blue-600 p-8 hidden md:flex flex-col justify-center items-center text-white">
          <img
            src="clothASL1.png"
            alt="Sign up illustration"
            className="w-full max-w-sm mb-8 rounded-lg shadow-lg"
          />
          <h2 className="text-3xl font-bold mb-4">Welcome Back!</h2>
          <p className="text-blue-100 text-center">
            Enjoy Luxury and Unbeatable Fashion Style
          </p>
        </div>

        <div className="md:w-1/2 p-8">
          <div className="max-w-md mx-auto">
            <form onSubmit={handleSignupSubmit} className="space-y-6">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900">
                  Create New Account
                </h3>
                <p className="text-gray-500 mt-2">
                  Fill in your details to get started
                </p>
              </div>

              {/* Form inputs with animation */}
              <div className="space-y-4">
                <div className="transform transition-all duration-300 hover:-translate-y-1">
                  <input
                    type="text"
                    name="first_name"
                    placeholder="First Name"
                    value={signupData.first_name}
                    onChange={handleSignupChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 outline-none"
                  />
                </div>

                <div className="transform transition-all duration-300 hover:-translate-y-1">
                  <input
                    type="text"
                    name="last_name"
                    placeholder="Last Name"
                    value={signupData.last_name}
                    onChange={handleSignupChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 outline-none"
                  />
                </div>

                <div className="transform transition-all duration-300 hover:-translate-y-1">
                  <input
                    type="phone_number"
                    name="phone_number"
                    placeholder="Phone"
                    value={signupData.phone_number}
                    onChange={handleSignupChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 outline-none"
                  />
                </div>

                <div className="transform transition-all duration-300 hover:-translate-y-1">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={signupData.email}
                    onChange={handleSignupChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 outline-none"
                    required
                  />
                </div>

                <div className="transform transition-all duration-300 hover:-translate-y-1">
                  <input
                    type="password"
                    name="password"
                    placeholder="Password (8 characters at least)"
                    value={signupData.password}
                    onChange={handleSignupChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 outline-none"
                    required
                  />
                </div>

                <div className="transform transition-all duration-300 hover:-translate-y-1">
                  <input
                    type="password"
                    name="verify_password"
                    placeholder="Confirm Password"
                    value={signupData.verify_password}
                    onChange={handleSignupChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 outline-none"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2 mt-6">
                <input
                  type="checkbox"
                  name="agreedToTerms"
                  checked={signupData.agreedToTerms}
                  onChange={handleSignupChange}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label className="text-sm text-gray-600">
                  I agree to the terms and conditions
                </label>
              </div>

              {error && (
                <p className="text-red-500 text-sm mt-2 animate-shake">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={!isFormValid || isProcessing}
                className="w-full py-3 px-4 border border-transparent rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-1 active:translate-y-0"
              >
                {isProcessing ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Signing Up...
                  </span>
                ) : (
                  "Sign Up"
                )}
              </button>

              <div className="text-center mt-6">
                <span className="text-gray-600">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => navigate("/signin")}
                    className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-300"
                  >
                    Login
                  </button>
                </span>
              </div>
            </form>
          </div>
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

export default SignUpPage;
