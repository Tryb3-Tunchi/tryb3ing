import { useState, useEffect, useRef } from "react";
import { ChevronDown, X, Globe, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import LoginModal from "./login/AuthLogin";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isTradingOpen, setIsTradingOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Create refs for dropdown containers
  const tradingMenuRef = useRef<HTMLDivElement>(null);
  const langMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const languages = ["English", "Español", "Français", "中文"];

  const tradingSubmenu = {
    ACCOUNTS: ["Learn More On Account Types"],
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

  // Handle click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        tradingMenuRef.current &&
        !tradingMenuRef.current.contains(event.target as Node)
      ) {
        setIsTradingOpen(false);
      }
      if (
        langMenuRef.current &&
        !langMenuRef.current.contains(event.target as Node)
      ) {
        setIsLangOpen(false);
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="fixed top-0 w-full py-3 bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 mt-4 -ml-8 font-bold text-3xl">
            <Link to="/">
              <img
                src="./LOGO1.png"
                alt="XEX Platform"
                width={150}
                height={50}
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/trading" className="hover:text-blue-600">
              Trading
            </Link>
            <Link to="/discover" className="hover:text-blue-600">
              Discover
            </Link>
            {/* Trading Menu */}
            <div className="relative" ref={tradingMenuRef}>
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
                          <Link
                            key={item}
                            to="/promotions"
                            className="text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg transition-colors"
                            onClick={() => setIsTradingOpen(false)}
                          >
                            {item}
                          </Link>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 mb-4">MARKETS</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {tradingSubmenu.MARKETS.map((item) => (
                          <Link
                            key={item}
                            to="/markets"
                            className="text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg transition-colors"
                            onClick={() => setIsTradingOpen(false)}
                          >
                            {item}
                          </Link>
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
            <div className="relative" ref={langMenuRef}>
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
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          className="md:hidden bg-white border-t px-4 py-2 space-y-2 absolute w-full left-0 shadow-lg"
          ref={mobileMenuRef}
        >
          <Link
            to="/trading"
            className="block w-full text-left py-2 px-4 text-gray-600 hover:bg-blue-50 rounded-lg hover:text-blue-600"
            onClick={() => setIsMenuOpen(false)}
          >
            Trading
          </Link>
          <Link
            to="/discover"
            className="block w-full text-left py-2 px-4 text-gray-600 hover:bg-blue-50 rounded-lg hover:text-blue-600"
            onClick={() => setIsMenuOpen(false)}
          >
            Discover
          </Link>

          {/* Mobile Trading Menu */}
          <div>
            <button
              onClick={() => setIsTradingOpen(!isTradingOpen)}
              className="flex items-center justify-between w-full py-2 px-4 text-gray-600 hover:bg-blue-50 rounded-lg hover:text-blue-600"
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
                  <h3 className="font-bold text-gray-800 px-4 py-2">
                    ACCOUNTS
                  </h3>
                  <div className="space-y-1">
                    {tradingSubmenu.ACCOUNTS.map((item) => (
                      <Link
                        key={item}
                        to="/promotions"
                        className="block w-full text-left py-2 px-4 text-gray-600 hover:bg-blue-50 rounded-lg hover:text-blue-600"
                        onClick={() => {
                          setIsMenuOpen(false);
                          setIsTradingOpen(false);
                        }}
                      >
                        {item}
                      </Link>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 px-4 py-2">MARKETS</h3>
                  <div className="space-y-1">
                    {tradingSubmenu.MARKETS.map((item) => (
                      <Link
                        key={item}
                        to="/markets"
                        className="block w-full text-left py-2 px-4 text-gray-600 hover:bg-blue-50 rounded-lg hover:text-blue-600"
                        onClick={() => {
                          setIsMenuOpen(false);
                          setIsTradingOpen(false);
                        }}
                      >
                        {item}
                      </Link>
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
              className="flex items-center justify-between w-full py-2 px-4 text-gray-600 hover:bg-blue-50 rounded-lg hover:text-blue-600"
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
                    className="block w-full text-left py-2 px-4 text-gray-600 hover:bg-blue-50 rounded-lg hover:text-blue-600"
                    onClick={() => {
                      setIsLangOpen(false);
                      setIsMenuOpen(false);
                    }}
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
              onClick={() => {
                setIsAuthModalOpen(true);
                setIsMenuOpen(false);
              }}
              className="block w-full py-2 px-4 text-blue-600 hover:bg-blue-50 rounded-lg text-center"
            >
              Sign In
            </button>
            <button
              onClick={() => {
                setIsAuthModalOpen(true);
                setIsMenuOpen(false);
              }}
              className="block w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-center"
            >
              Sign Up
            </button>
          </div>
        </div>
      )}

      {/* Auth Modal */}
      {isAuthModalOpen && (
        <LoginModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;
