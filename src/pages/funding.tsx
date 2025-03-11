import React, { useState, useContext, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../components/Card";
import { Wallet, Copy, Check } from "lucide-react";
import DashboardNav from "../components/DashboardNav";
import { BalanceContext, Transaction } from "../components/balance/BalanceContext";

interface DepositMethod {
  name: string;
  verified: boolean;
}

interface CryptoWallet {
  name: string;
  address: string;
}

const FundingPage: React.FC = () => {
  const [showDepositForm, setShowDepositForm] = useState<boolean>(false);
  const [showCryptoOptions, setShowCryptoOptions] = useState<boolean>(false);
  const [selectedMethod, setSelectedMethod] = useState<string>("");
  const [selectedCrypto, setSelectedCrypto] = useState<string>("");
  const [depositAmount, setDepositAmount] = useState<number>(200);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [copiedAddress, setCopiedAddress] = useState<string>("");
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error";
  }>({
    text: "",
    type: "success",
  });
  
  const { 
    balance, 
    createDeposit, 
    transactions,
    getRecentTransactions 
  } = useContext(BalanceContext);

  // Get processing deposits (now from the context)
  const processingDeposits = getRecentTransactions().filter(
    tx => tx.type === "deposit" && tx.status === "processing"
  );

  const cryptoWallets: CryptoWallet[] = [
    { name: "USDT", address: "TSyDhPPK2ynXmNgFxYsUG4JBy5Yg4b34Y" },
    { name: "USDC", address: "0x4af06993248310599558167ad3597A018f53A7a7" },
    { name: "BTC", address: "bc1q5qhm53rjqvewj9lzexnu6k8m8sdydm7sz9m0rk" },
    { name: "ETH", address: "0x4af06993248310599558167ad3597A018f53A7a7" },
    { name: "XRP", address: "0x4af06993248310599558167ad3597A018f53A7a7" }
  ];

  const handleMethodSelect = (method: string) => {
    setSelectedMethod(method);
    setMessage({ text: "", type: "success" });
    
    if (method === "Cryptocurrency") {
      setShowCryptoOptions(true);
      setShowDepositForm(false);
    } else {
      setShowCryptoOptions(false);
      setShowDepositForm(true);
    }
  };

  const handleCryptoSelect = (cryptoName: string) => {
    setSelectedCrypto(cryptoName);
    setShowDepositForm(true);
    setShowCryptoOptions(false);
  };

  const copyToClipboard = (address: string) => {
    navigator.clipboard.writeText(address)
      .then(() => {
        setCopiedAddress(address);
        setTimeout(() => setCopiedAddress(""), 3000);
      })
      .catch(err => {
        console.error("Failed to copy: ", err);
        setMessage({
          text: "Failed to copy address to clipboard",
          type: "error",
        });
      });
  };

  const handleDepositSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ text: "", type: "success" });

    try {
      // Validate amount
      if (depositAmount < 200) {
        throw new Error("Minimum deposit amount is 200 USD");
      }

      // Create the deposit using the context function
      // Now with method and cryptoType parameters
      const response = await createDeposit(
        depositAmount, 
        selectedMethod,
        selectedMethod === "Cryptocurrency" ? selectedCrypto : undefined
      );

      const cryptoMessage = selectedMethod === "Cryptocurrency" 
        ? ` via ${selectedCrypto}` 
        : "";

      setMessage({
        text: `Your deposit of $${depositAmount}${cryptoMessage} is being processed. Reference ID: ${response.transaction.id}`,
        type: "success",
      });

      // Reset the form
      setDepositAmount(200);
      setShowDepositForm(false);
      setShowCryptoOptions(false);
    } catch (error) {
      console.error("Deposit failed:", error);
      setMessage({
        text: error instanceof Error
          ? error.message
          : "Failed to process your deposit. Please try again.",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fundingOptions: string[] = [
    "Deposits",
    "Withdrawals",
    "Internal Transfer",
    "Transactions History",
  ];

  const depositMethods: DepositMethod[] = [
    { name: "Cryptocurrency", verified: false },
    { name: "Stocks", verified: false },
    { name: "Bank Wire Transfer", verified: false },
    { name: "Credit/Debit Cards", verified: true },
    { name: "Online Bank Transfer", verified: true },
  ];

  const getCurrentWalletAddress = () => {
    const wallet = cryptoWallets.find(w => w.name === selectedCrypto);
    return wallet ? wallet.address : "";
  };

  return (
    <>
      <DashboardNav />
      <div className="w-full max-w-6xl mt-20 mx-auto p-4 space-y-6">
        {/* Account Balance Section */}
        <Card className="bg-white rounded-xl shadow-sm">
          <CardHeader>
            <CardTitle>Account Balance</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {balance ? (
              <div className="p-4 border rounded-lg">
                <p className="text-sm text-gray-500">Available Balance</p>
                <p className="text-2xl font-bold">
                  ${parseFloat(balance.amount).toFixed(2)} USD
                </p>
              </div>
            ) : (
              <p>No balance available or loading...</p>
            )}
          </CardContent>
        </Card>

        {/* Processing Deposits Section */}
        {processingDeposits.length > 0 && (
          <Card className="bg-white rounded-xl shadow-sm">
            <CardHeader>
              <CardTitle>Processing Deposits</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <ul className="space-y-4">
                {processingDeposits.map((deposit) => (
                  <li key={deposit.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm text-gray-500">
                          Deposit ID: {deposit.id}
                        </p>
                        <p className="text-lg font-bold">
                          ${deposit.amount.toFixed(2)} ({deposit.method}
                          {deposit.cryptoType ? ` - ${deposit.cryptoType}` : ""})
                        </p>
                        <p className="text-xs text-gray-500">
                          {deposit.timestamp.toLocaleString()}
                        </p>
                      </div>
                      <p className={`text-sm px-2 py-1 rounded ${
                        deposit.status === "processing"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                      }`}>
                        {deposit.status}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {/* The rest of your component remains the same */}
        {/* Connect Wallet Section */}
        <Card className="bg-white rounded-xl shadow-sm">
          <CardContent className="p-6">
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
              <Wallet className="w-5 h-5" />
              Connect Wallet
            </button>
          </CardContent>
        </Card>

        {/* Deposit Methods and Forms - Keep the rest of your component unchanged */}
        {!showDepositForm && !showCryptoOptions ? (
          // Initial View - Funding Options and Deposit Methods
          <div className="grid md:grid-cols-2 gap-6">
            {/* Funding Options */}
            <Card className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>Funding</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {fundingOptions.map((option) => (
                    <li
                      key={option}
                      className="text-blue-500 hover:text-blue-700 cursor-pointer"
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Deposit Methods */}
            <Card className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>Deposit Methods</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {depositMethods.map((method) => (
                    <li
                      key={method.name}
                      className={`flex items-center p-2 rounded-lg ${
                        method.verified
                          ? "opacity-50 cursor-not-allowed"
                          : "cursor-pointer hover:bg-gray-50"
                      }`}
                      onClick={() =>
                        !method.verified && handleMethodSelect(method.name)
                      }
                    >
                      <span className="text-gray-800">{method.name}</span>
                      {method.verified && (
                        <span className="ml-2 text-sm text-gray-500">
                          (Verified clients only)
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        ) : showCryptoOptions ? (
          // Crypto Options View
          <Card className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm">
            <CardHeader>
              <CardTitle>Select Cryptocurrency</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="mb-4 text-gray-600">
                Please select the cryptocurrency you would like to deposit:
              </p>
              
              <ul className="space-y-2 mb-6">
                {cryptoWallets.map((wallet) => (
                  <li key={wallet.name}>
                    <button
                      onClick={() => handleCryptoSelect(wallet.name)}
                      className="w-full text-left p-3 border rounded-lg hover:bg-gray-50 flex justify-between items-center"
                    >
                      <span className="font-medium">{wallet.name}</span>
                      <span className="text-blue-500">Select</span>
                    </button>
                  </li>
                ))}
              </ul>
              
              <button
                className="text-blue-500 hover:text-blue-700"
                onClick={() => {
                  setShowCryptoOptions(false);
                  setSelectedMethod("");
                }}
              >
                Back to Deposit Methods
              </button>
            </CardContent>
          </Card>
        ) : (
          // Deposit Form View
          <Card className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm">
            <CardContent className="p-8">
              <h2 className="text-xl font-bold mb-6">
                Before you proceed with a deposit via {selectedMethod}
                {selectedCrypto ? ` (${selectedCrypto})` : ""}, please note the following:
              </h2>
              
              {message.text && (
                <div
                  className={`p-4 mb-4 rounded-lg ${
                    message.type === "success"
                      ? "bg-green-50 text-green-700"
                      : "bg-red-50 text-red-700"
                  }`}
                >
                  {message.text}
                </div>
              )}

              {selectedMethod === "Cryptocurrency" && (
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-bold mb-2">{selectedCrypto} Deposit Address:</h3>
                  <div className="flex items-center justify-between p-3 bg-white border rounded-lg">
                    <code className="text-sm break-all">{getCurrentWalletAddress()}</code>
                    <button 
                      className="ml-2 p-1 text-blue-500 hover:text-blue-700" 
                      onClick={() => copyToClipboard(getCurrentWalletAddress())}
                    >
                      {copiedAddress === getCurrentWalletAddress() ? (
                        <Check className="w-5 h-5 text-green-500" />
                      ) : (
                        <Copy className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">
                    Send only {selectedCrypto} to this address. Sending any other cryptocurrency may result in permanent loss.
                  </p>
                </div>
              )}

              <ul className="space-y-4 mb-8 list-disc pl-6">
                <li>
                  Please ensure all payments are made from an account registered in the same name as your trading account.
                </li>
                {selectedMethod === "Cryptocurrency" ? (
                  <>
                    <li>
                      Cryptocurrency deposits typically require 1-6 network confirmations before they are credited to your account.
                    </li>
                    <li>
                      The USD value will be calculated based on the exchange rate at the time your deposit is received.
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      All withdrawals, excluding profits, can only be paid back to the original payment method, up to the deposited amount.
                    </li>
                    <li>
                      We do not charge any commissions or fees for deposits via {selectedMethod}.
                    </li>
                  </>
                )}
                <li>
                  By submitting a deposit request, you consent to your data being shared with third parties as necessary to process your payment.
                </li>
              </ul>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-bold mb-4">
                  Deposit Funds - {selectedMethod}
                  {selectedCrypto ? ` (${selectedCrypto})` : ""}
                </h3>
                
                <p className="mb-4">
                  Please enter the amount you wish to deposit to your account.
                </p>
                
                <div className="text-sm text-gray-600 mb-4">
                  <p>Minimum deposit 200 USD</p>
                  <p>Remaining Deposit Limit for Non-Verified Account 2500 USD</p>
                </div>
                
                <form onSubmit={handleDepositSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Deposit Amount (USD):
                    </label>
                    <input
                      type="number"
                      min="200"
                      step="any"
                      value={depositAmount}
                      onChange={(e) => setDepositAmount(parseFloat(e.target.value) || 0)}
                      className="w-full p-2 border rounded-md"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
                    disabled={isLoading}
                  >
                    {isLoading ? "Processing..." : "Confirm Deposit"}
                  </button>
                </form>
              </div>

              <button
                className="mt-4 text-blue-500 hover:text-blue-700"
                onClick={() => {
                  if (selectedMethod === "Cryptocurrency") {
                    setShowCryptoOptions(true);
                    setShowDepositForm(false);
                  } else {
                    setShowDepositForm(false);
                    setSelectedMethod("");
                  }
                }}
              >
                Back
              </button>
            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
};

export default FundingPage;