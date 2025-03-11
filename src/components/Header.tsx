import  { useState } from "react";
import { ChevronDown, X, Globe, Menu } from "lucide-react";
// import { Link } from "react-router-dom";
import LoginModal from "./login/AuthLogin";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isTradingOpen, setIsTradingOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const languages = ["English", "Español", "Français", "中文"];

  const tradingSubmenu = {
    ACCOUNTS: ["Account Types"],
    MARKETS: [
      "Forex Trading",
      "Cryptocurrencies",
      "Stock Derivatives",
      "Turbo Stocks",
      "Commodities",
      "Equity Indices",
      "Precious Metals",
      "Energies",
      "Shares",
      "Thematic Indices",
    ],
  };

  return (
    <nav className="fixed top-0 w-full bg-white shadow-md z-50">
      {/* Main Navbar Content */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 font-bold text-xl">LOGO</div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="hover:text-blue-600">
              Trading
            </a>
            <a href="#" className="hover:text-blue-600">
              Discover
            </a>
            {/* Trading Menu */}
            <div className="relative">
              <button
                onClick={() => setIsTradingOpen(!isTradingOpen)}
                className="flex items-center hover:text-blue-600"
              >
                <span>Promotions Company</span>
                <ChevronDown className="ml-1 w-4 h-4" />
              </button>

              {isTradingOpen && (
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-[800px] bg-white shadow-xl rounded-xl py-6 mt-2">
                  <div className="grid grid-cols-2 gap-8 px-8">
                    <div>
                      <h3 className="font-bold text-gray-800 mb-4">ACCOUNTS</h3>
                      <div className="grid gap-2">
                        {tradingSubmenu.ACCOUNTS.map((item) => (
                          <a
                            key={item}
                            href="#"
                            className="text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg transition-colors"
                          >
                            {item}
                          </a>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 mb-4">MARKETS</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {tradingSubmenu.MARKETS.map((item) => (
                          <a
                            key={item}
                            href="#"
                            className="text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg transition-colors"
                          >
                            {item}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Side Items */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center px-3 py-2 hover:text-blue-600"
              >
                <Globe className="w-5 h-5 mr-1" />
                <ChevronDown className="w-4 h-4" />
              </button>

              {isLangOpen && (
                <div className="absolute top-full right-0 w-40 bg-white shadow-lg rounded-xl py-2 mt-2">
                  {languages.map((lang) => (
                    <button
                      key={lang}
                      className="w-full text-left px-4 py-2 hover:bg-blue-50 text-gray-600 hover:text-blue-600"
                      onClick={() => setIsLangOpen(false)}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Auth Buttons */}
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="px-4 py-2 text-blue-600 hover:text-blue-700"
            >
              Sign In
            </button>
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Sign Up
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-50 border-t px-4 py-2 space-y-2">
          <a href="#" className="block py-2 px-4 hover:bg-blue-50 rounded-lg">
            Trading
          </a>
          <a href="#" className="block py-2 px-4 hover:bg-blue-50 rounded-lg">
            Discover
          </a>

          {/* Mobile Trading Menu */}
          <div>
            <button
              onClick={() => setIsTradingOpen(!isTradingOpen)}
              className="flex items-center justify-between w-full py-2 px-4 hover:bg-blue-50 rounded-lg"
            >
              <span>Promotions Company</span>
              <ChevronDown
                className={`w-4 h-4 transform transition-transform ${
                  isTradingOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isTradingOpen && (
              <div className="mt-2 ml-4 space-y-4">
                <div>
                  <h3 className="font-bold text-gray-800 px-4 py-2">ACCOUNTS</h3>
                  <div className="space-y-1">
                    {tradingSubmenu.ACCOUNTS.map((item) => (
                      <a
                        key={item}
                        href="#"
                        className="block py-2 px-4 text-gray-600 hover:bg-blue-50 rounded-lg"
                      >
                        {item}
                      </a>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 px-4 py-2">MARKETS</h3>
                  <div className="space-y-1">
                    {tradingSubmenu.MARKETS.map((item) => (
                      <a
                        key={item}
                        href="#"
                        className="block py-2 px-4 text-gray-600 hover:bg-blue-50 rounded-lg"
                      >
                        {item}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Language Selector */}
          <div>
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center justify-between w-full py-2 px-4 hover:bg-blue-50 rounded-lg"
            >
              <span className="flex items-center">
                <Globe className="w-5 h-5 mr-2" />
                Language
              </span>
              <ChevronDown
                className={`w-4 h-4 transform transition-transform ${
                  isLangOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isLangOpen && (
              <div className="mt-2 ml-4 space-y-1">
                {languages.map((lang) => (
                  <button
                    key={lang}
                    className="block w-full text-left py-2 px-4 text-gray-600 hover:bg-blue-50 rounded-lg"
                    onClick={() => setIsLangOpen(false)}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Auth Buttons */}
          <div className="pt-4 space-y-2">
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="w-full py-2 px-4 text-blue-600 hover:bg-blue-50 rounded-lg"
            >
              Sign In
            </button>
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Sign Up
            </button>
          </div>
        </div>
      )}

      {/* Auth Modal */}
      <LoginModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        // onLogin={(formData: any, isSignUp: any) => {
        //   if (isSignUp) {
        //     console.log("Signing up with data:", formData);
        //   } else {
        //     console.log("Logging in with data:", formData);
        //   }
        // }}
      />
    </nav>
  );
};

export default Navbar;