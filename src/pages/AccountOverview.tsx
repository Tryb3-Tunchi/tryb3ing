import { useState, useEffect, useContext } from "react";
import { MoreVertical, Download, Upload, Plus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { BalanceContext } from "../components/balance/BalanceContext";
import { Card, CardContent, CardHeader, CardTitle } from "../components/Card";
import apiService from "../components/Api/apiService"; // Uncommented the apiService import

// Define interfaces for account data and account summary
interface AccountData {
  type: string;
  accountNumber: string;
  balance: number;
  profit: number;
  currency: string;
  accountStyle: string;
}

interface AccountSummary {
  id?: number;
  user?: number;
  profit_loss: string;
  opened_position?: number | null;
  margin: string;
  free_margin: string;
  margin_level: string;
  [key: string]: any;
}

const AccountOverview = () => {
  const [accountType, setAccountType] = useState<"real" | "demo">("real");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [accountSummary, setAccountSummary] = useState<AccountSummary | null>(null);
  const [accounts, setAccounts] = useState<Record<string, AccountData>>({
    real: {
      type: "Real Account",
      accountNumber: "111400289",
      balance: 0,
      profit: 0,
      currency: "USD",
      accountStyle: "Standard",
    },
    demo: {
      type: "Demo Account",
      accountNumber: "999500312",
      balance: 10000,
      profit: 100,
      currency: "USD",
      accountStyle: "Practice",
    },
  });
  const navigate = useNavigate();

  // Use BalanceContext to access balances and refresh function
  const {
    balances,
    refreshBalances,
    isLoading: balanceLoading,
  } = useContext(BalanceContext);

  // Fetch account summary data from API - same as in MyAccount component
  const fetchAccountSummary = async () => {
    try {
      const summary = await apiService.getCurrentAccountSummary();
      setAccountSummary(summary);
      return summary;
    } catch (err) {
      console.error("Error fetching account summary:", err);
      setAccountSummary(null);
      return null;
    }
  };

  // Fetch account data and update balances
  useEffect(() => {
    const fetchAccountData = async () => {
      setIsLoading(true);
      try {
        // Fetch account summary to get profit/loss data
        const summary = await fetchAccountSummary();
        
        // Update account data based on balances and account summary
        const updatedAccounts = { ...accounts };

        // Find real balance (USD)
        const realBalance = balances.find((b) => b.currency === "USD");
        if (realBalance) {
          // Use profit_loss from account summary if available, otherwise use placeholder
          const profitLoss = summary ? parseFloat(summary.profit_loss || "0") : 0;
          
          updatedAccounts.real = {
            ...updatedAccounts.real,
            balance: parseFloat(realBalance.amount),
            profit: profitLoss, // Use actual profit/loss from API
          };
        }

        // Find demo balance (DEMO)
        const demoBalance = balances.find((b) => b.currency === "DEMO");
        if (demoBalance) {
          // For demo, we could either have a separate API call or use a placeholder
          // For now, using a placeholder since the focus seems to be on the real account
          updatedAccounts.demo = {
            ...updatedAccounts.demo,
            balance: parseFloat(demoBalance.amount),
            profit: parseFloat(demoBalance.amount) * 0.05, // Placeholder for demo account
          };
        }

        setAccounts(updatedAccounts);
      } catch (error) {
        console.error("Error fetching account data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAccountData();
  }, [balances]); // Re-fetch when balances change

  // Handle deposit action
  const handleDeposit = () => {
    navigate("/funding");
  };

  // Handle withdrawal action
  const handleWithdrawal = () => {
    navigate("/withdraw");
  };

  // Reset demo account balance to maximum when switching to demo
  const handleAccountTypeChange = async (type: "real" | "demo") => {
    setAccountType(type);

    // If switching to demo, verify demo balance exists
    if (type === "demo") {
      try {
        // Find demo balance
        const demoBalance = balances.find((b) => b.currency === "DEMO");

        if (demoBalance && parseFloat(demoBalance.amount) < 1000) {
          // In a real app, you would call an API to reset the demo balance
          // For now, just update the local state
          setAccounts((prev) => ({
            ...prev,
            demo: {
              ...prev.demo,
              balance: 1000,
              profit: 50, // Update profit placeholder
            },
          }));
        }
      } catch (error) {
        console.error("Error handling demo account:", error);
      }
    }
  };

  // Manual refresh function that updates both balances and account summary
  const handleRefresh = async () => {
    setIsLoading(true);
    try {
      await Promise.all([
        refreshBalances(),     // Refresh balances from BalanceContext
        fetchAccountSummary()  // Refresh account summary
      ]);
      setIsMenuOpen(false);    // Close menu after refresh
    } catch (error) {
      console.error("Error refreshing data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-6xl  mx-auto mt-20 px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl text-blue-600 font-extrabold ">Welcome!</h1>
      </div>

      {/* Account Overview Section */}
      <div className="my-8">
        <h1 className="text-2xl font-bold mb-2">Accounts Overview</h1>
        <p className="text-gray-600">
          Stay informed and manage your account with ease via the Account
          Overview.
        </p>
      </div>

      {/* Account Type Selector */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => handleAccountTypeChange("real")}
          className={`px-6 py-2 rounded-lg font-bold ${
            accountType === "real"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          Real
        </button>
        <button
          onClick={() => handleAccountTypeChange("demo")}
          className={`px-6 py-2 rounded-lg font-bold ${
            accountType === "demo"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          Demo
        </button>
      </div>

      {/* Account Details */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Main Account Box */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="font-bold text-xl">
                {accounts[accountType]?.type}
              </h2>
              <p className="text-gray-600">
                {accounts[accountType]?.accountStyle},{" "}
                {accounts[accountType]?.currency}
              </p>
              <p className="text-gray-500 text-sm mt-1">
                #{accounts[accountType]?.accountNumber}
              </p>
            </div>
            <div className="relative">
              <button
                className="p-2 hover:bg-gray-100 rounded-lg"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <MoreVertical className="h-5 w-5" />
              </button>

              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-2 z-10">
                  <button className="w-full px-4 py-2 text-left hover:bg-gray-100">
                    Account Information
                  </button>
                  <button className="w-full px-4 py-2 text-left hover:bg-gray-100">
                    Trading History
                  </button>
                  <button className="w-full px-4 py-2 text-left hover:bg-gray-100">
                    Open Positions
                  </button>
                  <button className="w-full px-4 py-2 text-left hover:bg-gray-100">
                    Change Leverage
                  </button>
                  <button className="w-full px-4 py-2 text-left hover:bg-gray-100">
                    Internal Transfer
                  </button>
                  <button
                    className="w-full px-4 py-2 text-left hover:bg-gray-100"
                    onClick={handleRefresh}
                  >
                    Refresh Balance
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="mb-6">
            <p className="text-gray-600 mb-1">Balance</p>
            <h3 className="text-2xl font-bold">
              {balanceLoading || isLoading
                ? "Loading..."
                : `$${accounts[accountType]?.balance.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}`}
            </h3>
            <div className="mt-2">
              <p className="text-gray-600 mb-1">Profit/Loss</p>
              <h3 className={`text-3xl font-bold ${
                accounts[accountType]?.profit >= 0 ? "text-green-500" : "text-red-500"
              }`}>
                {balanceLoading || isLoading
                  ? "Loading..."
                  : `${accounts[accountType]?.profit >= 0 ? "+" : "-"}$${Math.abs(accounts[accountType]?.profit).toLocaleString(
                      undefined,
                      {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }
                    )}`}
              </h3>
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={handleDeposit}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold flex items-center justify-center"
            >
              <Download className="h-4 w-4 mr-2" />
              Deposit
            </button>

            <button
              onClick={handleWithdrawal}
              className="flex-1 px-4 py-2 border border-blue-600 text-blue-600 rounded-lg font-semibold flex items-center justify-center"
            >
              <Upload className="h-4 w-4 mr-2" />
              Withdraw
            </button>
          </div>
        </div>

        {/* Additional Account Box */}
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center text-center">
          <Plus className="h-12 w-12 text-gray-400 mb-4" />
          <h3 className="font-bold text-xl mb-2">
            Create/Open Additional Account
          </h3>
          <p className="text-gray-600 mb-4">
            Open a new trading account with us
          </p>
          <Link to="/signup">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold">
              Get Started
            </button>
          </Link>
        </div>
      </div>
      <div className="mt-12 grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>EUR/USD Market Chart</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[500px] w-full">
              <iframe
                src="https://s.tradingview.com/widgetembed/?frameElementId=tradingview_12345&symbol=EURUSD&interval=D&hidesidetoolbar=0&symboledit=1&saveimage=1&toolbarbg=f1f3f6&studies=[]&hideideas=1&theme=light&style=1&timezone=Etc%2FUTC&withdateranges=1&studies_overrides={}&overrides={}&enabled_features=[]&disabled_features=[]&locale=en&utm_source=localhost&utm_medium=widget&utm_campaign=chart&utm_term=EURUSD"
                style={{ width: "100%", height: "100%", border: "none" }}
                title="TradingView Chart"
              ></iframe>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>BTC/USD Market Chart</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[500px] w-full">
              <iframe
                src="https://s.tradingview.com/widgetembed/?frameElementId=tradingview_12345&symbol=BTCUSD&interval=D&hidesidetoolbar=0&symboledit=1&saveimage=1&toolbarbg=f1f3f6&studies=[]&hideideas=1&theme=light&style=1&timezone=Etc%2FUTC&withdateranges=1&studies_overrides={}&overrides={}&enabled_features=[]&disabled_features=[]&locale=en&utm_source=localhost&utm_medium=widget&utm_campaign=chart&utm_term=BTCUSD"
                style={{ width: "100%", height: "100%", border: "none" }}
                title="TradingView Chart"
              ></iframe>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AccountOverview;