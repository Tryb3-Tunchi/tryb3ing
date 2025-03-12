import React from "react";
import { AlertCircle, AlertTriangle } from "lucide-react";

const WithdrawalWarningModal = ({ isOpen, onClose, onProceed }) => {
  const [showConfirmation, setShowConfirmation] = React.useState(false);

  if (!isOpen) return null;

  const handleProceed = () => {
    if (!showConfirmation) {
      setShowConfirmation(true);
    } else {
      onProceed();
      setShowConfirmation(false);
    }
  };

  const handleCancel = () => {
    setShowConfirmation(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 animate-in fade-in duration-200">
        {!showConfirmation ? (
          <>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-orange-100 p-2 rounded-full">
                <AlertTriangle className="w-6 h-6 text-orange-600" />
              </div>
              <h2 className="text-xl font-semibold">
                Withdrawal Not Available
              </h2>
            </div>

            <p className="text-gray-700 mb-4">
              You cannot make withdrawals at this time because positions are
              open or trading is ongoing in your account.
            </p>

            <p className="mb-6 text-gray-700">
              To proceed with the withdrawal, you must stop all active trades,
              which may affect your current profits.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-end">
              <button
                onClick={handleCancel}
                className="py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleProceed}
                className="py-2 px-4 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
              >
                Stop Trading & Proceed
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-red-100 p-2 rounded-full">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
              <h2 className="text-xl font-semibold">
                Warning: Loss of Profits
              </h2>
            </div>

            <p className="text-gray-700 mb-4">
              <strong>Important:</strong> Proceeding with this withdrawal will
              immediately close all your active trades.
            </p>

            <p className="mb-2 text-gray-700">This action will result in:</p>

            <ul className="list-disc pl-5 mb-6 text-gray-700">
              <li>Loss of any unrealized profits from ongoing trades</li>
              <li>Immediate settlement at current market prices</li>
              <li>Potential slippage due to market conditions</li>
            </ul>

            <p className="mb-6 text-gray-700 font-medium">
              Are you sure you want to continue?
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-end">
              <button
                onClick={handleCancel}
                className="py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleProceed}
                className="py-2 px-4 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
              >
                Confirm Withdrawal
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default WithdrawalWarningModal;
