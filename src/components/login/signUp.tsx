import { FormEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import VerificationModal from "../../components/login/verifyModal";
import apiService from "../Api/apiService";
import { useAuth } from "../../auth/AuthContext";
import { BalanceContext } from "../balance/BalanceContext";

interface SignupData {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  password: string;
  verify_password: string;
  agreedToTerms: boolean;
}

interface FieldErrors {
  [key: string]: string;
}

const SignUpPage = () => {
  // Get refreshBalances from BalanceContext properly
  const balanceContext = useContext(BalanceContext);
  const { refreshBalances } = balanceContext || {};

  const [signupData, setSignupData] = useState<SignupData>({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    password: "",
    verify_password: "",
    agreedToTerms: false,
  });
  const [verificationCode, setVerificationCode] = useState<string>("");
  const [isVerificationModalOpen, setVerificationModalOpen] =
    useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const navigate = useNavigate();
  const { sign } = useAuth();

  const handleSignupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setSignupData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error when user types
    setError("");

    // Clear field-specific error
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateSignupForm = (): boolean => {
    const errors: FieldErrors = {};
    let isValid = true;

    // Check each required field
    if (!signupData.first_name.trim()) {
      errors.first_name = "First name is required";
      isValid = false;
    }

    if (!signupData.last_name.trim()) {
      errors.last_name = "Last name is required";
      isValid = false;
    }

    if (!signupData.email.trim()) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(signupData.email)) {
      errors.email = "Please enter a valid email";
      isValid = false;
    }

    if (!signupData.phone_number.trim()) {
      errors.phone_number = "Phone number is required";
      isValid = false;
    }

    if (!signupData.password) {
      errors.password = "Password is required";
      isValid = false;
    } else if (signupData.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
      isValid = false;
    }

    if (!signupData.verify_password) {
      errors.verify_password = "Please confirm your password";
      isValid = false;
    } else if (signupData.password !== signupData.verify_password) {
      errors.verify_password = "Passwords do not match";
      isValid = false;
    }

    if (!signupData.agreedToTerms) {
      errors.agreedToTerms = "You must agree to the Terms and Conditions";
      isValid = false;
    }

    setFieldErrors(errors);
    return isValid;
  };

  const handleSignupSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Validate form before submission
    if (!validateSignupForm()) {
      return;
    }

    setIsProcessing(true);
    setError("");

    try {
      const response = await apiService.signup(signupData);
      if (response && response.message) {
        setVerificationModalOpen(true);
        // alert("Signup successful! Please verify your email with the OTP sent.");
      } else {
        setError("Signup failed.");
      }
    } catch (error: any) {
      console.error("An error occurred during signup:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("An error occurred during signup. Please try again.");
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const handleVerifyCode = async (otp: string) => {
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
          if (refreshBalances) {
            refreshBalances(); // Refresh balances after signup if available
          }
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

  return (
    <div className="min-h-screen flex items-center mt-20 justify-center bg-gradient-to-br from-blue-50 to-indigo-50 px-4 py-12">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -left-64 top-0">
          <img src="img3.png" alt="Decorative left" className="opacity-10" />
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
            src="img1.png"
            alt="Sign up illustration"
            className="w-full max-w-sm mb-8 rounded-lg shadow-lg"
          />
          <h2 className="text-3xl font-bold mb-4">Welcome Back!</h2>
          <p className="text-blue-100 text-center">
            Invest Smart, Trade Confidently
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
                    className={`w-full px-4 py-3 rounded-lg border ${
                      fieldErrors.first_name
                        ? "border-red-500"
                        : "border-gray-300"
                    } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 outline-none`}
                  />
                  {fieldErrors.first_name && (
                    <p className="text-red-500 text-xs mt-1">
                      {fieldErrors.first_name}
                    </p>
                  )}
                </div>

                <div className="transform transition-all duration-300 hover:-translate-y-1">
                  <input
                    type="text"
                    name="last_name"
                    placeholder="Last Name"
                    value={signupData.last_name}
                    onChange={handleSignupChange}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      fieldErrors.last_name
                        ? "border-red-500"
                        : "border-gray-300"
                    } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 outline-none`}
                  />
                  {fieldErrors.last_name && (
                    <p className="text-red-500 text-xs mt-1">
                      {fieldErrors.last_name}
                    </p>
                  )}
                </div>

                <div className="transform transition-all duration-300 hover:-translate-y-1">
                  <input
                    type="tel"
                    name="phone_number"
                    placeholder="Phone"
                    value={signupData.phone_number}
                    onChange={handleSignupChange}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      fieldErrors.phone_number
                        ? "border-red-500"
                        : "border-gray-300"
                    } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 outline-none`}
                  />
                  {fieldErrors.phone_number && (
                    <p className="text-red-500 text-xs mt-1">
                      {fieldErrors.phone_number}
                    </p>
                  )}
                </div>

                <div className="transform transition-all duration-300 hover:-translate-y-1">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={signupData.email}
                    onChange={handleSignupChange}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      fieldErrors.email ? "border-red-500" : "border-gray-300"
                    } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 outline-none`}
                  />
                  {fieldErrors.email && (
                    <p className="text-red-500 text-xs mt-1">
                      {fieldErrors.email}
                    </p>
                  )}
                </div>

                <div className="transform transition-all duration-300 hover:-translate-y-1">
                  <input
                    type="password"
                    name="password"
                    placeholder="Password (8 characters at least)"
                    value={signupData.password}
                    onChange={handleSignupChange}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      fieldErrors.password
                        ? "border-red-500"
                        : "border-gray-300"
                    } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 outline-none`}
                  />
                  {fieldErrors.password && (
                    <p className="text-red-500 text-xs mt-1">
                      {fieldErrors.password}
                    </p>
                  )}
                </div>

                <div className="transform transition-all duration-300 hover:-translate-y-1">
                  <input
                    type="password"
                    name="verify_password"
                    placeholder="Confirm Password"
                    value={signupData.verify_password}
                    onChange={handleSignupChange}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      fieldErrors.verify_password
                        ? "border-red-500"
                        : "border-gray-300"
                    } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 outline-none`}
                  />
                  {fieldErrors.verify_password && (
                    <p className="text-red-500 text-xs mt-1">
                      {fieldErrors.verify_password}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-2 mt-6">
                <input
                  type="checkbox"
                  name="agreedToTerms"
                  checked={signupData.agreedToTerms}
                  onChange={handleSignupChange}
                  className={`w-4 h-4 ${
                    fieldErrors.agreedToTerms
                      ? "border-red-500"
                      : "border-gray-300"
                  } text-blue-600 rounded focus:ring-blue-500`}
                />
                <label
                  className={`text-sm ${
                    fieldErrors.agreedToTerms ? "text-red-500" : "text-gray-600"
                  }`}
                >
                  I agree to the terms and conditions
                </label>
              </div>
              {fieldErrors.agreedToTerms && (
                <p className="text-red-500 text-xs">
                  {fieldErrors.agreedToTerms}
                </p>
              )}

              {error && (
                <p className="text-red-500 text-sm mt-2 animate-shake">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={isProcessing}
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
