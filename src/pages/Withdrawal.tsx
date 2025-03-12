import React, { useState, useContext, useEffect } from "react";
import {
  Wallet,
  AlertCircle,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "../components/Card";
import DashboardNav from "../components/DashboardNav";
import { BalanceContext } from "../components/balance/BalanceContext";
import apiService from "../components/Api/apiService";

interface WithdrawalMethod {
  id: string;
  name: string;
  requiresDetails: boolean;
  detailsType: "crypto" | "bank" | "card";
  minAmount: number;
  maxAmount: number;
}

interface PendingWithdrawal {
  id: string;
  amount: number;
  method: string;
  destinationAddress?: string;
  accountNumber?: string;
  routingNumber?: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

// Interface for the withdrawal request data
interface WithdrawalRequestData {
  amount: string;
  method: string | undefined;
  status: string;
  destination_address?: string;
  account_number?: string;
  routing_number?: string;
}

const WithdrawalPage: React.FC = () => {
  // State for the withdrawal flow
  const [showWithdrawalForm, setShowWithdrawalForm] = useState<boolean>(false);
  const [selectedMethod, setSelectedMethod] = useState<WithdrawalMethod | null>(null);
  const [withdrawalAmount, setWithdrawalAmount] = useState<string>(""); // Use string for input flexibility
  const [destinationAddress, setDestinationAddress] = useState<string>("");
  const [accountNumber, setAccountNumber] = useState<string>("");
  const [routingNumber, setRoutingNumber] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [pendingWithdrawals, setPendingWithdrawals] = useState<PendingWithdrawal[]>([]);
  const [error, setError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  // Get balance from context
  const { balances } = useContext(BalanceContext);

  // Get primary balance
  const getPrimaryBalance = () => {
    if (!balances || balances.length === 0) return { amount: "0", currency: "USD" };
    const usdBalance = balances.find((b) => b.currency === "USD");
    return usdBalance || balances[0];
  };

  const balance = getPrimaryBalance();
  const availableBalance = parseFloat(balance.amount || "0");

  // Withdrawal methods
  const withdrawalMethods: WithdrawalMethod[] = [
    {
      id: "crypto",
      name: "Cryptocurrency",
      requiresDetails: true,
      detailsType: "crypto",
      minAmount: 5, // Minimum withdrawal amount is $5
      maxAmount: 10000,
    },
    {
      id: "bank",
      name: "Bank Wire Transfer",
      requiresDetails: true,
      detailsType: "bank",
      minAmount: 5, // Minimum withdrawal amount is $5
      maxAmount: 25000,
    },
    {
      id: "card",
      name: "Credit/Debit Cards",
      requiresDetails: true,
      detailsType: "card",
      minAmount: 5, // Minimum withdrawal amount is $5
      maxAmount: 5000,
    },
  ];

  // Load pending withdrawals on component mount
  useEffect(() => {
    const fetchWithdrawals = async () => {
      try {
        setIsLoading(true);
        // Get withdrawals from API
        const withdrawals = await apiService.getWithdrawals();

        // Convert API response to our format if needed
        const pendingWithdrawals: any [] = Array.isArray(withdrawals)
          ? withdrawals.map((w) => ({
              id: w.id?.toString() || Math.random().toString(36).substring(7),
              amount: parseFloat(w.amount || "0"),
              method: w.method || "Bank Transfer",
              status: w.status || "pending",
              createdAt: w.timestamp || new Date().toISOString(),
              destinationAddress: w.destination_address,
              accountNumber: w.account_number,
              routingNumber: w.routing_number,
            }))
          : [];

        setPendingWithdrawals(pendingWithdrawals);
      } catch (err) {
        console.error("Failed to load withdrawals:", err);
        setError("Failed to load pending withdrawals. Please refresh the page.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchWithdrawals();
  }, []);

  const handleMethodSelect = (method: WithdrawalMethod) => {
    setSelectedMethod(method);
    setWithdrawalAmount(""); // Clear the input when selecting a new method
    setShowWithdrawalForm(true);
    setError("");
    setSuccessMessage("");
  };

  const validateForm = (): boolean => {
    if (!selectedMethod) {
      setError("Please select a withdrawal method");
      return false;
    }

    const amount = parseFloat(withdrawalAmount);

    if (isNaN(amount)) {
      setError("Please enter a valid amount");
      return false;
    }

    if (amount < selectedMethod.minAmount) {
      setError(`Minimum withdrawal amount is $${selectedMethod.minAmount}`);
      return false;
    }

    if (amount > selectedMethod.maxAmount) {
      setError(`Maximum withdrawal amount is $${selectedMethod.maxAmount}`);
      return false;
    }

    if (amount > availableBalance) {
      setError("Withdrawal amount exceeds available balance");
      return false;
    }

    if (selectedMethod.detailsType === "crypto" && !destinationAddress.trim()) {
      setError("Please enter a valid cryptocurrency address");
      return false;
    }

    if (
      selectedMethod.detailsType === "bank" &&
      (!accountNumber.trim() || !routingNumber.trim())
    ) {
      setError("Please enter both account number and routing number");
      return false;
    }

    return true;
  };

  const handleWithdrawalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      // Create a withdrawal request
      const withdrawalData: WithdrawalRequestData = {
        amount: withdrawalAmount,
        method: selectedMethod?.name,
        status: "pending",
        destination_address: destinationAddress,
        account_number: accountNumber,
        routing_number: routingNumber,
      };

      // Call API service with the proper parameters
      const response = await apiService.createWithdrawal(withdrawalData);

      // Generate a random ID if the API doesn't return one
      const withdrawalId = response?.id || Math.random().toString(36).substring(7);

      // Add to local state
      const newWithdrawal: PendingWithdrawal = {
        id: withdrawalId,
        amount: parseFloat(withdrawalAmount),
        method: selectedMethod?.name || "",
        status: "pending",
        createdAt: new Date().toISOString(),
        destinationAddress,
        accountNumber,
        routingNumber,
      };

      setPendingWithdrawals((prev) => [...prev, newWithdrawal]);

      // Show success message
      setSuccessMessage(
        `Your withdrawal request for $${withdrawalAmount} has been submitted and is pending approval. Reference ID: ${withdrawalId}`
      );

      // Reset form
      setDestinationAddress("");
      setAccountNumber("");
      setRoutingNumber("");
      setWithdrawalAmount("");
      setShowWithdrawalForm(false);

      // Refresh balance to show pending changes
      // await refreshBalances();
    } catch (err) {
      console.error("Withdrawal request failed:", err);
      setError("Failed to process your withdrawal request. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  };

  return (
    <>
      <DashboardNav />
      <div className="w-full max-w-6xl mt-24 mx-auto p-4 space-y-6">
        {/* Account Balance Section */}
        <Card className="bg-white rounded-xl shadow-sm">
          <CardHeader>
            <CardTitle>Account Balance</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="p-4 border rounded-lg">
              <p className="text-sm text-gray-500">Available Balance</p>
              <p className="text-2xl font-bold">${availableBalance.toFixed(2)} USD</p>
            </div>
          </CardContent>
        </Card>

        {/* Pending Withdrawals Section */}
        {pendingWithdrawals.length > 0 && (
          <Card className="bg-white rounded-xl shadow-sm">
            <CardHeader>
              <CardTitle>Pending Withdrawals</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <ul className="space-y-4">
                {pendingWithdrawals.map((withdrawal) => (
                  <li key={withdrawal.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between">
                      <div>
                        <p className="text-sm text-gray-500">
                          Withdrawal ID: {withdrawal.id}
                        </p>
                        <p className="text-lg font-bold">
                          ${withdrawal.amount.toFixed(2)} ({withdrawal.method})
                        </p>
                        <p className="text-sm text-gray-600">
                          Requested: {formatDate(withdrawal.createdAt)}
                        </p>
                        {withdrawal.destinationAddress && (
                          <p className="text-sm text-gray-600 truncate max-w-xs">
                            Destination: {withdrawal.destinationAddress}
                          </p>
                        )}
                        {withdrawal.accountNumber && (
                          <p className="text-sm text-gray-600">
                            Account: ****{withdrawal.accountNumber.slice(-4)}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center">
                        {withdrawal.status === "pending" ? (
                          <div className="flex items-center text-yellow-600">
                            <Clock className="w-4 h-4 mr-1" />
                            <span>Pending</span>
                          </div>
                        ) : withdrawal.status === "approved" ? (
                          <div className="flex items-center text-green-600">
                            <CheckCircle className="w-4 h-4 mr-1" />
                            <span>Approved</span>
                          </div>
                        ) : (
                          <div className="flex items-center text-red-600">
                            <XCircle className="w-4 h-4 mr-1" />
                            <span>Rejected</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {successMessage && (
          <Card className="bg-green-50 rounded-xl shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5" />
                <p className="text-green-800">{successMessage}</p>
              </div>
            </CardContent>
          </Card>
        )}

        {error && (
          <Card className="bg-red-50 rounded-xl shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-start">
                <AlertCircle className="w-5 h-5 text-red-600 mr-2 mt-0.5" />
                <p className="text-red-800">{error}</p>
              </div>
            </CardContent>
          </Card>
        )}

        {!showWithdrawalForm ? (
          // Method Selection View
          <Card className="bg-white rounded-xl shadow-sm">
            <CardHeader>
              <CardTitle>Withdrawal Methods</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-gray-700 mb-4">
                Select your preferred withdrawal method. All withdrawals are subject to review and approval.
              </p>
              <ul className="grid md:grid-cols-2 gap-4">
                {withdrawalMethods.map((method) => (
                  <li key={method.id}>
                    <button
                      onClick={() => handleMethodSelect(method)}
                      className="w-full text-left p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Wallet className="w-5 h-5 text-blue-500" />
                        <div>
                          <p className="font-medium">{method.name}</p>
                          <p className="text-sm text-gray-500">
                            Min: ${method.minAmount} | Max: ${method.maxAmount}
                          </p>
                        </div>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ) : (
          // Withdrawal Form View
          <Card className="bg-white rounded-xl shadow-sm">
            <CardHeader>
              <CardTitle>Request Withdrawal</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <h3 className="font-medium flex items-center gap-2 text-blue-800">
                  <AlertCircle className="w-5 h-5" />
                  Important Information
                </h3>
                <ul className="mt-2 space-y-1 text-sm text-blue-700">
                  <li>• All withdrawals are subject to review and approval by our team</li>
                  <li>• Processing time may take up to 3-5 business days depending on the method</li>
                  <li>• Withdrawals can only be made to accounts in your name</li>
                  <li>• Verification documents may be required for large withdrawals</li>
                </ul>
              </div>

              <form onSubmit={handleWithdrawalSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Withdrawal Method
                  </label>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Wallet className="w-5 h-5 text-blue-500" />
                      <span className="font-medium">{selectedMethod?.name}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Withdrawal Amount (USD)
                  </label>
                  <input
                    type="number"
                    value={withdrawalAmount}
                    onChange={(e) => setWithdrawalAmount(e.target.value)} // Allow any input
                    min={selectedMethod?.minAmount || 5} // Minimum withdrawal is $5
                    max={Math.min(selectedMethod?.maxAmount || 10000, availableBalance)}
                    className="w-full p-3 border rounded-lg"
                    required
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Min: ${selectedMethod?.minAmount} | Max: ${Math.min(selectedMethod?.maxAmount || 10000, availableBalance)}
                  </p>
                </div>

                {selectedMethod?.detailsType === "crypto" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cryptocurrency Address
                    </label>
                    <input
                      type="text"
                      value={destinationAddress}
                      onChange={(e) => setDestinationAddress(e.target.value)}
                      className="w-full p-3 border rounded-lg"
                      placeholder="Enter your wallet address"
                      required
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      Please double-check your address. We are not responsible for funds sent to incorrect addresses.
                    </p>
                  </div>
                )}

                {selectedMethod?.detailsType === "bank" && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Account Number
                      </label>
                      <input
                        type="text"
                        value={accountNumber}
                        onChange={(e) => setAccountNumber(e.target.value)}
                        className="w-full p-3 border rounded-lg"
                        placeholder="Enter your account number"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Routing Number
                      </label>
                      <input
                        type="text"
                        value={routingNumber}
                        onChange={(e) => setRoutingNumber(e.target.value)}
                        className="w-full p-3 border rounded-lg"
                        placeholder="Enter your routing number"
                        required
                      />
                    </div>
                  </>
                )}

                {selectedMethod?.detailsType === "card" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Card Details
                    </label>
                    <p className="text-sm text-gray-600 mb-2">
                      Funds will be sent back to the card you used for deposits.
                    </p>
                    <div className="p-3 bg-gray-50 rounded-lg border">
                      <p className="text-sm">Card ending in ****1234</p>
                      <p className="text-xs text-gray-500">Visa</p>
                    </div>
                  </div>
                )}

                <div className="pt-4 flex flex-wrap gap-4">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex justify-center items-center"
                  >
                    {isLoading ? "Processing..." : "Request Withdrawal"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowWithdrawalForm(false)}
                    className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
};

export default WithdrawalPage;