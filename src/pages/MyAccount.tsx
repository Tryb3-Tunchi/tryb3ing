import React, { useState, useEffect, useContext } from "react";
import {
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  BarChart2,
  Download,
  Upload,
  RefreshCcw,
  AlertCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/Card";
import MainFooter from "../components/Mainfooter";
import DashboardNav from "../components/DashboardNav";
import apiService from "../components/Api/apiService";
import { BalanceContext } from "../components/balance/BalanceContext";

// Define types for our data
interface Activity {
  id: number;
  type: string;
  amount: number;
  timestamp: string;
  status: string;
  icon: React.ElementType;
}

interface Deposit {
  id?: number;
  amount: string;
  status?: string;
  timestamp?: string;
  user?: number;
}

interface Withdrawal {
  id?: number;
  amount: string;
  status?: string;
  timestamp?: string;
  user?: number;
}

const MyAccount: React.FC = () => {
  const [showTrading, setShowTrading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [depositActivities, setDepositActivities] = useState<Activity[]>([]);
  const [withdrawalActivities, setWithdrawalActivities] = useState<Activity[]>([]);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  // Use context for global balance state
  const { balances, refreshBalances, isLoading: balanceLoading } =
    useContext(BalanceContext);

  // Helper function to format time relative to now
  const formatRelativeTime = (timestamp: string): string => {
    if (!timestamp) return "Unknown time";
    
    try {
      const date = new Date(timestamp);
      const now = new Date();
      const diffInHours = Math.floor(
        (now.getTime() - date.getTime()) / (1000 * 60 * 60)
      );

      if (diffInHours < 1) return "Just now";
      if (diffInHours < 2) return "1 hour ago";
      if (diffInHours < 24) return `${diffInHours} hours ago`;
      if (diffInHours < 48) return "1 day ago";
      return `${Math.floor(diffInHours / 24)} days ago`;
    } catch (e) {
      console.error("Error formatting timestamp:", e);
      return "Invalid date";
    }
  };

  // Fetch recent activity by combining deposits and withdrawals
  const fetchRecentActivity = async () => {
    try {
      // Get deposits and withdrawals
      const deposits: Deposit[] = await apiService.getDeposits();
      const withdrawals: Withdrawal[] = await apiService.getWithdrawals();

      // Process deposits with error handling
      const depositItems: Activity[] = Array.isArray(deposits) 
        ? deposits.map((deposit) => ({
            id: deposit.id || Math.random(),
            type: "Deposit",
            amount: parseFloat(deposit.amount || "0"),
            timestamp: deposit.timestamp || new Date().toISOString(),
            status: deposit.status || "completed",
            icon: Download,
          }))
        : [];

      // Process withdrawals with error handling
      const withdrawalItems: Activity[] = Array.isArray(withdrawals)
        ? withdrawals.map((withdrawal) => ({
            id: withdrawal.id || Math.random(),
            type: "Withdrawal",
            amount: -parseFloat(withdrawal.amount || "0"), // Negative for withdrawals
            timestamp: withdrawal.timestamp || new Date().toISOString(),
            status: withdrawal.status || "completed",
            icon: Upload,
          }))
        : [];

      // Sort by most recent first and store separately
      setDepositActivities(
        depositItems.sort(
          (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        ).slice(0, 5) // Take only the 5 most recent
      );
      
      setWithdrawalActivities(
        withdrawalItems.sort(
          (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        ).slice(0, 5) // Take only the 5 most recent
      );
      
      setLastUpdated(new Date());
    } catch (err) {
      console.error("Activity fetch error:", err);
      // Set empty activities array if API fails
      setDepositActivities([]);
      setWithdrawalActivities([]);
      setError("Failed to load recent activities. Please try again.");
    }
  };

  // Refresh all data
  const refreshData = async () => {
    setError(null);
    try {
      await refreshBalances(); // Fetch balances
      await fetchRecentActivity(); // Fetch recent activity
      setIsLoading(false);
    } catch (err) {
      console.error("Error refreshing data:", err);
      setError("Failed to refresh data. Please try again.");
      setIsLoading(false);
    }
  };

  // Fetch all data on component mount
  useEffect(() => {
    refreshData();

    // Set up refresh interval (every 30 seconds)
    const intervalId = setInterval(refreshData, 30000);

    // Clean up interval
    return () => clearInterval(intervalId);
  }, []);

  // Calculate derived account values if not provided by API
  const calculateAccountData = () => {
    if (!balances || balances.length === 0) {
      return {
        balance: 0,
        equity: 0,
        margin: 0,
        freeMargin: 0,
        marginLevel: 0,
        openPositions: 0,
        profitLoss: 0,
      };
    }

    // Find the real account balance (USD)
    const realBalance = balances.find((b) => b.currency === "USD");

    // If no real balance is found, use the first balance
    const balance = realBalance || balances[0];
    const balanceAmount = parseFloat(balance.amount || "0");

    return {
      balance: balanceAmount,
      equity: balance.equity ? parseFloat(balance.equity) : balanceAmount * 1.25,
      margin: balance.margin ? parseFloat(balance.margin) : balanceAmount * 0.25,
      freeMargin: balance.free_margin
        ? parseFloat(balance.free_margin)
        : balanceAmount * 0.8,
      marginLevel: balance.margin_level ? parseFloat(balance.margin_level) : 450.5,
      openPositions: 3, // This might need to come from another API endpoint
      profitLoss:
        balance.profit_loss
          ? parseFloat(balance.profit_loss)
          : balance.equity
          ? parseFloat(balance.equity) - balanceAmount
          : balanceAmount * 0.25,
    };
  };

  const accountData = calculateAccountData();

  // Activity List Component (reusable)
  const ActivityList = ({ activities, title }) => (
    <Card className="md:bg-blue-200">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>{title}</CardTitle>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Clock className="w-4 h-4" />
          <span>Last updated: {lastUpdated.toLocaleTimeString()}</span>
        </div>
      </CardHeader>
      <CardContent>
        {activities.length === 0 ? (
          <p className="text-center py-4 text-gray-500">
            No {title.toLowerCase()} found
          </p>
        ) : (
          <div className="space-y-4">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`p-2 rounded-full ${
                      activity.type === "Deposit"
                        ? "bg-green-100"
                        : "bg-red-100"
                    }`}
                  >
                    <activity.icon
                      className={`w-4 h-4 ${
                        activity.type === "Deposit"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <p className="font-medium">{activity.type}</p>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${
                          activity.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : activity.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {activity.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">
                      {formatRelativeTime(activity.timestamp)}
                    </p>
                  </div>
                </div>
                <span
                  className={`font-semibold ${
                    activity.amount >= 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {activity.amount >= 0 ? "+" : ""}$
                  {Math.abs(activity.amount).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );

  // Account Overview Component with real data
  const AccountOverview = () => (
    <div className="space-y-6">
      <Card className="bg-white md:bg-blue-200 shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <a href="/home">
            <CardTitle className="text-2xl font-bold">
              Account Overview
            </CardTitle>
          </a>
          <div className="flex space-x-3">
            <button
              onClick={refreshData}
              className="bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-1"
            >
              <RefreshCcw className="w-4 h-4" />
              <span>Refresh</span>
            </button>
            <button
              onClick={() => setShowTrading(true)}
              className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-1"
            >
              <BarChart2 className="w-4 h-4" />
              <span>Open Trading View</span>
            </button>
          </div>
        </CardHeader>
        <CardContent>
          {balanceLoading || isLoading ? (
            <div className="flex justify-center items-center h-40">
              <p>Loading account data...</p>
            </div>
          ) : error ? (
            <div className="flex justify-center items-center h-40 text-red-500">
              <AlertCircle className="w-5 h-5 mr-2" />
              <p>{error}</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Balance Card */}
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm opacity-80">Balance</p>
                      <h3 className="text-2xl font-bold">
                        ${accountData.balance.toFixed(2)}
                      </h3>
                    </div>
                    <Wallet className="w-8 h-8 opacity-80" />
                  </div>
                </div>

                {/* Equity Card */}
                <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm opacity-80">Equity</p>
                      <h3 className="text-2xl font-bold">
                        ${accountData.equity.toFixed(2)}
                      </h3>
                    </div>
                    <ArrowUpRight className="w-8 h-8 opacity-80" />
                  </div>
                </div>

                {/* Profit/Loss Card */}
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm opacity-80">Profit/Loss</p>
                      <h3 className="text-2xl font-bold">
                        ${accountData.profitLoss.toFixed(2)}
                      </h3>
                    </div>
                    <RefreshCcw className="w-8 h-8 opacity-80" />
                  </div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">Margin</p>
                  <p className="text-lg font-semibold">
                    ${accountData.margin.toFixed(2)}
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">Free Margin</p>
                  <p className="text-lg font-semibold">
                    ${accountData.freeMargin.toFixed(2)}
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">Margin Level</p>
                  <p className="text-lg font-semibold">
                    {accountData.marginLevel}%
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">Open Positions</p>
                  <p className="text-lg font-semibold">
                    {accountData.openPositions}
                  </p>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Display separate cards for deposits and withdrawals */}
      <ActivityList activities={depositActivities} title="Recent Deposits" />
      <ActivityList activities={withdrawalActivities} title="Recent Withdrawals" />
    </div>
  );

  // TradingView Component with Real-Time Chart
  const TradingView = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button
          onClick={() => setShowTrading(false)}
          className="text-gray-600 hover:text-gray-800 flex items-center space-x-2"
        >
          <ArrowDownRight className="w-4 h-4" />
          <span>Back to Account Overview</span>
        </button>
        <div className="flex items-center space-x-4">
          <Clock className="w-4 h-4 text-gray-600" />
          <span className="text-sm text-gray-600">Last updated: {lastUpdated.toLocaleTimeString()}</span>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>EUR/USD Market Chart</CardTitle>
        </CardHeader>
        <CardContent>
          {/* TradingView Widget */}
          <div className="h-[500px] w-full">
            <iframe
              src="https://s.tradingview.com/widgetembed/?frameElementId=tradingview_12345&symbol=EURUSD&interval=D&hidesidetoolbar=0&symboledit=1&saveimage=1&toolbarbg=f1f3f6&studies=[]&hideideas=1&theme=light&style=1&timezone=Etc%2FUTC&withdateranges=1&studies_overrides={}&overrides={}&enabled_features=[]&disabled_features=[]&locale=en&utm_source=localhost&utm_medium=widget&utm_campaign=chart&utm_term=EURUSD"
              style={{ width: "100%", height: "100%", border: "none" }}
              title="TradingView Chart"
            ></iframe>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <>
      <div className="mb-10">
        <DashboardNav />
      </div>

      <div className="min-h-screen mt-20 bg-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4 pb-16">
          {showTrading ? <TradingView /> : <AccountOverview />}
        </div>
        <MainFooter />
      </div>
    </>
  );
};

export default MyAccount;