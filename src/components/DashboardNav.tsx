import React, { useState, useContext } from "react";
import { Menu, X, Wallet, User, DollarSign } from "lucide-react";
import { MdSwapHorizontalCircle } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { ThemeToggle } from "./themeToggle";
import { BalanceContext } from "../components/balance/BalanceContext";
import apiService from "../components/Api/apiService";
import useWalletConnect from "../components/walletconnect/Connectwallet"; // Import our custom hook

const DashboardNav: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isAccountReal, setAccountReal] = useState(true);
  const [isProfileOpen, setProfileOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [logoutError, setLogoutError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Use BalanceContext to access balances and related functions
  const { balances, refreshBalances, isLoading, error } =
    useContext(BalanceContext);

  // Use our wallet connect hook
  const {
    connectedWallet,
    openWalletModal,
    disconnectWallet,
    WalletConnectModal,
  } = useWalletConnect();

  // Get the displayed balance based on account type (real/demo)
  const getDisplayedBalance = () => {
    if (balances && balances.length > 0) {
      const displayBalance = isAccountReal
        ? balances.find((b) => b.currency === "USD") || balances[0]
        : balances.find((b) => b.currency === "DEMO") || balances[0];

      // Ensure the balance exists and has an amount
      if (displayBalance && displayBalance.amount) {
        // Handle potential parsing issues
        try {
          const amount = parseFloat(displayBalance.amount);
          if (!isNaN(amount)) {
            return `$${amount.toFixed(2)}`;
          }
        } catch (e) {
          console.error("Error parsing balance amount:", e);
        }
      }
      // Return a placeholder if parsing fails
      return "$0.00";
    }
    return "$0.00"; // Fallback if no balances are available
  };
  // Toggle between real and demo account and refresh balances
  const toggleAccountType = async () => {
    setAccountReal((prev) => !prev);
    await refreshBalances();
  };

  // Logout handler
  const handleLogout = async () => {
    setIsLoggingOut(true);
    setLogoutError(null);

    try {
      await apiService.logout();
      // Disconnect wallet if connected
      if (connectedWallet) {
        disconnectWallet();
      }
      // Navigate to signin page
      navigate("/signin");
    } catch (error) {
      console.error("Logout failed:", error);
      setLogoutError("Failed to log out. You have been logged out locally.");
      // Force navigation even if logout request fails
      navigate("/signin");
    } finally {
      setIsLoggingOut(false);
    }
  };

  // Menu items for the sidebar
  const menuItems = [
    { title: "Home", path: "/home", icon: "home" },
    { title: "My Accounts", path: "/account", icon: "user" },
    { title: "Funding", path: "/funding", icon: "dollar" },
    { title: "Withdrawal", path: "/withdraw", icon: "dollar" },
    { title: "Copy Trading", path: "/trade", icon: "copy" },
    { title: "Refer A Friend", path: "/Refer-friend", icon: "users" },
    { title: "Market Intelligence", path: "/market", icon: "chart" },
    { title: "More", path: "/market", icon: "more" },
  ];

  // Display truncated wallet address
  const getDisplayWalletAddress = () => {
    if (!connectedWallet) return null;
    const { address } = connectedWallet;
    return `${address.substring(0, 6)}...${address.substring(
      address.length - 4
    )}`;
  };

  return (
    <div className="relative">
      {/* Main Navbar */}
      <nav className="bg-white shadow-md py-6 px-6 h-22 flex items-center justify-between fixed top-0 w-full z-50">
        {/* Left Section */}
        <div className="flex items-center justify-center space-x-2">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <Menu className="h-6 w-6 font-semibold" />
          </button>

          {/* <img src="/LOGO1.png" alt="Logo" className="h-10 w-10 pt-2 md:h-0 md:w-0" /> */}

          <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-2">
            <span className="text-xl text-gray-500 hidden lg:block">
              Balance:
            </span>
            <span className="font-semibold text-bas text-xl">
              {isLoading ? "Loading..." : error ? error : getDisplayedBalance()}
            </span>
            <button
              onClick={toggleAccountType}
              className="flex items-center space-x-1 text-sm text-green-300 hover:text-blue-700"
            >
              <span className="font-semibold text-lg hidden md:block pl-2">
                {isAccountReal ? "Real" : "Demo"}
              </span>
              <MdSwapHorizontalCircle className="h-6 w-8" />
            </button>
          </div>
        </div>

        {/* Right Section - Hidden on mobile */}
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/funding">
            <button
              className="px-2 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center font-semibold"
              onClick={async () => {
                // Simulate a deposit action
                await refreshBalances(); // Refresh balances after a deposit
              }}
            >
              <DollarSign className="h-4 w-4 mr-2" />
              Add Balance
            </button>
          </Link>

          {connectedWallet ? (
            <button
              onClick={disconnectWallet}
              className="px-2 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center font-semibold"
            >
              <Wallet className="h-4 w-4 mr-2" />
              {getDisplayWalletAddress()}
            </button>
          ) : (
            <button
              onClick={openWalletModal}
              className="px-2 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 flex items-center font-semibold"
            >
              <Wallet className="h-4 w-4 mr-2" />
              Connect Wallet
            </button>
          )}

          <ThemeToggle />

          <div className="relative">
            <button
              onClick={() => setProfileOpen(!isProfileOpen)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <User className="h-6 w-6" />
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2">
                <Link
                  to="/profile"
                  className="block px-4 py-2 hover:bg-gray-100 font-semibold"
                >
                  Profile
                </Link>
                <Link
                  to="/profile"
                  className="block px-4 py-2 hover:bg-gray-100 font-semibold"
                >
                  Settings
                </Link>
                {connectedWallet && (
                  <div className="px-4 py-2 text-sm text-gray-600 border-t border-b">
                    <p className="font-semibold">Connected wallet:</p>
                    <p className="truncate">{connectedWallet.address}</p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        disconnectWallet();
                      }}
                      className="text-red-500 text-xs mt-1 hover:underline"
                    >
                      Disconnect
                    </button>
                  </div>
                )}
                <hr className="my-2" />
                <button
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 font-semibold"
                >
                  {isLoggingOut ? "Logging out..." : "Sign Out"}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Profile Dropdown */}
        <div className="relative md:hidden">
          <button
            onClick={() => setProfileOpen(!isProfileOpen)}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <User className="h-6 w-6" />
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2">
              <Link
                to="/profile"
                className="block px-4 py-2 hover:bg-gray-100 font-semibold"
              >
                Profile
              </Link>
              <Link
                to="/profile"
                className="block px-4 py-2 hover:bg-gray-100 font-semibold"
              >
                Settings
              </Link>
              {connectedWallet && (
                <div className="px-4 py-2 text-sm text-gray-600 border-t border-b">
                  <p className="font-semibold">Connected wallet:</p>
                  <p className="truncate">{connectedWallet.address}</p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      disconnectWallet();
                    }}
                    className="text-red-500 text-xs mt-1 hover:underline"
                  >
                    Disconnect
                  </button>
                </div>
              )}
              <hr className="my-2" />
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 font-semibold"
              >
                {isLoggingOut ? "Logging out..." : "Sign Out"}
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Logout Error Notification */}
      {logoutError && (
        <div className="fixed top-4 right-4 bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded z-[100] flex items-center justify-between">
          <span>{logoutError}</span>
          <button
            onClick={() => setLogoutError(null)}
            className="ml-4 text-yellow-700 font-bold"
          >
            ×
          </button>
        </div>
      )}

      {/* Sidebar Menu */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity z-50 ${
          isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setSidebarOpen(false)}
      >
        <div
          className={`fixed inset-y-0 left-0 w-64 bg-white transform transition-transform duration-300 ease-in-out ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Sidebar Header */}
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="font-bold text-lg">Menu</h2>
            <div className="md:hidden">
              <ThemeToggle />
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Sidebar Content */}
          <div className="py-4">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className="flex items-center px-6 py-3 hover:bg-gray-100 transition-colors font-semibold"
              >
                <span>{item.title}</span>
              </Link>
            ))}

            {/* Connected Wallet Display in Sidebar */}
            {connectedWallet && (
              <div className="px-6 py-3 border-t border-b my-2">
                <div className="text-sm mb-1 font-semibold text-gray-500">
                  Wallet Connected
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm truncate">
                    {getDisplayWalletAddress()}
                  </span>
                  <button
                    onClick={disconnectWallet}
                    className="text-xs text-red-500 hover:underline"
                  >
                    Disconnect
                  </button>
                </div>
              </div>
            )}

            {/* Mobile-only buttons */}
            <div className="md:hidden px-6 pt-4 space-y-3">
              <Link to="/funding">
                <button
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center font-semibold"
                  onClick={async () => {
                    await refreshBalances();
                  }}
                >
                  <DollarSign className="h-4 w-4 mr-2" />
                  Add Balance
                </button>
              </Link>

              {connectedWallet ? (
                <button
                  onClick={disconnectWallet}
                  className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center justify-center font-semibold"
                >
                  <Wallet className="h-4 w-4 mr-2" />
                  Connected: {getDisplayWalletAddress()}
                </button>
              ) : (
                <button
                  onClick={openWalletModal}
                  className="w-full px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 flex items-center justify-center font-semibold"
                >
                  <Wallet className="h-4 w-4 mr-2" />
                  Connect Wallet
                </button>
              )}

              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center justify-center font-semibold"
              >
                {isLoggingOut ? "Logging out..." : "Sign Out"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Wallet Connect Modal */}
      <WalletConnectModal />
    </div>
  );
};

export default DashboardNav;
