// import React, { useState } from "react";
import { IoClose } from "react-icons/io5"; // Import the close icon

const ForgotPasswordModal = ({
  loginData,
  setLoginData,
  otp,
  setOtp,
  handleForgotPasswordRequest,
  handleVerifyForgotPasswordOtp,
  handleSetNewPassword,
  onClose, // Add the onClose prop
}) => {
  // const [loginData, setLoginData] = useState({loginData})
  return (
    <div className="relative">
      {/* Close button in the top right corner */}
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-2xl text-gray-600 hover:text-gray-800"
      >
        <IoClose />
      </button>

      <h3 className="text-xl font-semibold text-center mb-4">
        Forgot Password
      </h3>
      <div className="space-y-2">
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={loginData.email}
          onChange={(e) =>
            setLoginData({ ...loginData, email: e.target.value })
          }
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
          onChange={(e) =>
            setLoginData({ ...loginData, newPassword: e.target.value })
          }
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
  );
};

export default ForgotPasswordModal;
