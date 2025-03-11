import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../Card";
// import { Button } from "../Card";
import { Input } from "../Card";
import { RxCross2 } from "react-icons/rx";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../auth/AuthContext";

interface VerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVerify: (code: string) => void;
  onResend: () => void;
  // onOpenChange:()=> void;
  verificationCode: string;
  setVerificationCode: React.Dispatch<React.SetStateAction<string>>;
}

export default function VerificationModal({
  isOpen,
  onClose,
  onVerify,
  onResend,
  verificationCode,
  setVerificationCode,
}: VerificationModalProps) {
  const [countdown, setCountdown] = useState(0);

//   const {sign} = useAuth()
//     const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onVerify(verificationCode);
    // navigate("/");
    setVerificationCode("")
    onClose();
    // const response = await login(loginData);
    // localStorage.setItem("token", response.access_token);
    // sign();
    // navigate('/')
  };

  const handleResend = (e) => {
    e.preventDefault();
    onResend();
    setVerificationCode("")
    setCountdown(60);

  };

  return (
    <Dialog open={isOpen}
     onOpenChange={(open:boolean) => {
      if (!open) onClose();
     }}>
      <DialogContent className="sm:max-w-[400px] p-6">
        <DialogHeader className="flex justify-between items-center">
          <DialogTitle className="text-xl text-center flex-1">
            Verify your email
          </DialogTitle>
          <button
            type="submit"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
            aria-label="Close"
          >
            <RxCross2 size={20} />
          </button>
        </DialogHeader>

        <div className="text-center text-sm text-gray-600 mt-2">
          Please enter the verification code sent to your email
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div>
            <Input
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              placeholder="Enter code"
              className="text-center text-lg tracking-widest h-12"
              maxLength={6}
              pattern="[0-9]*"
              inputMode="numeric"
              autoComplete="one-time-code"
            />
          </div>

          <div className="space-y-3">
            <button type="submit" className="Button w-full h-11">
              Verify Code
            </button>

            <button
              type="submit"
              // variant="ghost"
              onClick={handleResend}
              disabled={countdown > 0}
              className="w-full h-11"
            >
              {countdown > 0 ? `Resend code in ${countdown}s` : "Resend code"}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}