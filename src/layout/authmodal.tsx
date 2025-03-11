import { useState } from "react";

const LoginModal = ({ isOpen, onClose, onLogin }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    agreedToTerms: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if terms are agreed when signing up
    if (isSignUp && !formData.agreedToTerms) {
      alert("Please agree to the Terms & Conditions");
      return;
    }

    onLogin(formData, isSignUp);
    // Reset form and close modal
    setFormData({ name: "", username: "", password: "", agreedToTerms: false });
    onClose();
  };

  const handleGmailSignUp = () => {
    // Implement Google Sign-In logic
    console.log("Signing up with Gmail");
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-xl w-96 p-6 relative max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {/* Form Title */}
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isSignUp ? "Sign Up" : "Sign In"}
        </h2>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter your full name"
                required={isSignUp}
              />
            </div>
          )}

          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your username"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Terms and Conditions */}
          {isSignUp && (
            <div className="mt-4">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    name="agreedToTerms"
                    type="checkbox"
                    checked={formData.agreedToTerms}
                    onChange={handleInputChange}
                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                    required
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="terms" className="font-medium text-gray-700">
                    By registering, you agree to our Terms & Conditions, Privacy
                    and Cookie Policy, and to join our loyalty programme
                  </label>
                  <p className="text-xs text-gray-500 mt-1">
                    Sign up and never miss out on exclusive member rewards,
                    tailored new arrivals and new launches. Unsubscribe at the
                    bottom of our emails. Find out more
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-colors mt-4"
          >
            {isSignUp ? "Create Account" : "Sign In"}
          </button>

          {/* Divider */}
          {isSignUp && (
            <div className="flex items-center my-4">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-4 text-gray-500">or</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>
          )}

          {/* Gmail Sign Up */}
          {isSignUp && (
            <button
              type="button"
              onClick={handleGmailSignUp}
              className="w-full flex items-center justify-center bg-white border border-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-50 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 48 48"
                className="mr-2"
              >
                <path
                  fill="#EA4335"
                  d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.92 13.22l7.45 5.77C12.46 13.34 17.48 9.5 24 9.5z"
                />
                <path
                  fill="#4285F4"
                  d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                />
                <path
                  fill="#FBBC05"
                  d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.28-3.14.76-4.59l-7.45-5.77c-1.56 3.1-2.46 6.58-2.46 10.36 0 3.78.9 7.26 2.46 10.36l7.45-5.77z"
                />
                <path
                  fill="#34A853"
                  d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.52 0-12.04-4.37-14.07-10.2l-7.68 5.96C6.51 42.62 14.62 48 24 48z"
                />
              </svg>
              Sign up with Gmail
            </button>
          )}
        </form>

        {/* Switch between Sign In and Sign Up */}
        <div className="text-center mt-4">
          {isSignUp ? (
            <p className="text-sm">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => setIsSignUp(false)}
                className="text-indigo-600 hover:text-indigo-800"
              >
                Sign In
              </button>
            </p>
          ) : (
            <p className="text-sm">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => setIsSignUp(true)}
                className="text-indigo-600 hover:text-indigo-800"
              >
                Sign Up
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
