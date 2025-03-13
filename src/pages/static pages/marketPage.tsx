import { useState } from "react";
import {
  DollarSign,
  Bitcoin,
  BarChart2,
  Zap,
  Briefcase,
  LineChart,
  Circle,
  Droplet,
  Share2,
  Grid,
  ArrowRight,
  Info,
  ChevronDown,
} from "lucide-react";

const MarketsPage = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [expandedMarket, setExpandedMarket] = useState(null);

  const markets = [
    {
      id: "forex",
      name: "Forex Trading",
      icon: <DollarSign className="h-6 w-6" />,
      color: "blue",
      description:
        "Trade the world's largest financial market with competitive spreads and deep liquidity.",
      features: [
        "70+ currency pairs",
        "Tight spreads from 0.1 pips",
        "Ultra-fast execution",
        "24/5 market access",
      ],
      details:
        "Foreign exchange market (Forex) is a global decentralized market for trading currencies. With a daily trading volume exceeding $6 trillion, it's the largest financial market in the world. Our platform offers access to major, minor, and exotic currency pairs with competitive pricing and advanced technical tools.",
    },
    {
      id: "crypto",
      name: "Cryptocurrencies",
      icon: <Bitcoin className="h-6 w-6" />,
      color: "orange",
      description:
        "Trade digital assets including Bitcoin, Ethereum and other leading cryptocurrencies.",
      features: [
        "30+ cryptocurrencies",
        "24/7 trading",
        "Competitive fees",
        "Secure wallet integration",
      ],
      details:
        "Cryptocurrency trading allows you to speculate on the price movements of digital assets without owning the underlying coins. Our platform offers access to major cryptocurrencies like Bitcoin, Ethereum, and emerging altcoins with advanced charting tools and real-time market data.",
    },
    {
      id: "derivatives",
      name: "Stock Derivatives",
      icon: <BarChart2 className="h-6 w-6" />,
      color: "green",
      description:
        "Access equity derivatives with competitive conditions and advanced trading tools.",
      features: [
        "Global stock indices",
        "Leveraged trading",
        "Extended market hours",
        "Advanced order types",
      ],
      details:
        "Stock derivatives allow you to speculate on the price movements of shares without owning the underlying assets. Our platform offers access to derivatives based on major global stocks with flexible leverage options and comprehensive risk management tools.",
    },
    {
      id: "turbo",
      name: "Turbo Stocks",
      icon: <Zap className="h-6 w-6" />,
      color: "purple",
      description:
        "Trade short-term stock movements with our innovative turbo trading instruments.",
      features: [
        "Short-term trading",
        "Fixed expiry times",
        "Transparent pricing",
        "Instant execution",
      ],
      details:
        "Turbo Stocks offer a unique way to trade short-term market movements with predetermined expiry times. These innovative instruments allow for quick trading decisions with transparent pricing and potential returns clearly displayed before you enter a position.",
    },
    {
      id: "commodities",
      name: "Commodities",
      icon: <Briefcase className="h-6 w-6" />,
      color: "yellow",
      description:
        "Trade a wide range of commodities including agricultural products and raw materials.",
      features: [
        "All major commodities",
        "Competitive spreads",
        "Real-time market data",
        "Flexible lot sizes",
      ],
      details:
        "Commodity trading allows you to diversify your portfolio with exposure to physical goods like agricultural products, energy resources, and metals. Our platform offers access to a wide range of commodity markets with competitive spreads and advanced technical analysis tools.",
    },
    {
      id: "indices",
      name: "Equity Indices",
      icon: <LineChart className="h-6 w-6" />,
      color: "red",
      description:
        "Access major global stock indices with competitive spreads and conditions.",
      features: [
        "20+ global indices",
        "Low commission",
        "Extended hours trading",
        "Advanced charting",
      ],
      details:
        "Equity indices provide exposure to the performance of a group of stocks representing a particular market or segment. Our platform offers access to major global indices including S&P 500, NASDAQ, FTSE 100, DAX, and Nikkei with competitive spreads and comprehensive market analysis tools.",
    },
    {
      id: "metals",
      name: "Precious Metals",
      icon: <Circle className="h-6 w-6" />,
      color: "gray",
      description:
        "Trade gold, silver, platinum and other precious metals with tight spreads.",
      features: [
        "Spot and futures trading",
        "Competitive pricing",
        "High liquidity",
        "Hedge against inflation",
      ],
      details:
        "Precious metals trading offers a way to diversify your portfolio with assets that often perform well during economic uncertainty. Our platform provides access to gold, silver, platinum, and palladium markets with tight spreads and various contract sizes to suit different trading strategies.",
    },
    {
      id: "energies",
      name: "Energies",
      icon: <Droplet className="h-6 w-6" />,
      color: "blue",
      description:
        "Trade oil, natural gas, and renewable energy markets with advanced tools.",
      features: [
        "Major energy markets",
        "Real-time price data",
        "Technical analysis tools",
        "Flexible position sizing",
      ],
      details:
        "Energy trading allows you to capitalize on price movements in oil, natural gas, and other energy markets that are influenced by global supply and demand factors. Our platform offers access to these markets with real-time data feeds and comprehensive analysis tools.",
    },
    {
      id: "shares",
      name: "Shares",
      icon: <Share2 className="h-6 w-6" />,
      color: "green",
      description:
        "Trade shares of leading global companies with competitive commissions.",
      features: [
        "1000+ global stocks",
        "Low commission rates",
        "Fractional shares available",
        "Corporate actions support",
      ],
      details:
        "Share trading gives you ownership in publicly listed companies. Our platform offers access to over 1000 global stocks across major exchanges with competitive commission rates and the option for fractional share investing to make premium stocks more accessible.",
    },
    {
      id: "thematic",
      name: "Thematic Indices",
      icon: <Grid className="h-6 w-6" />,
      color: "purple",
      description:
        "Trade baskets of stocks focused on specific themes or industry trends.",
      features: [
        "Technology sector",
        "Clean energy",
        "Healthcare innovation",
        "E-commerce leaders",
      ],
      details:
        "Thematic indices allow you to invest in baskets of stocks that follow specific market themes or industry trends. Our platform offers access to curated thematic indices covering emerging technologies, sustainability, healthcare innovation, and more with transparent methodology and competitive pricing.",
    },
  ];

  const handleToggleMarket = (id) => {
    if (expandedMarket === id) {
      setExpandedMarket(null);
    } else {
      setExpandedMarket(id);
    }
  };

  const filterMarkets = () => {
    if (activeTab === "all") return markets;
    return markets.filter((market) => market.id === activeTab);
  };

  return (
    <div className="pt-24 pb-16 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Our Markets</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Access a wide range of global financial markets with competitive
          conditions and advanced trading tools
        </p>
      </div>

      {/* Market Categories Navigation */}
      <div className="flex overflow-x-auto pb-4 mb-8 hide-scrollbar">
        <div className="flex space-x-2 mx-auto">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-4 py-2 rounded-full whitespace-nowrap ${
              activeTab === "all"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            All Markets
          </button>
          {markets.map((market) => (
            <button
              key={market.id}
              onClick={() => setActiveTab(market.id)}
              className={`px-4 py-2 rounded-full whitespace-nowrap ${
                activeTab === market.id
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {market.name}
            </button>
          ))}
        </div>
      </div>

      {/* Markets Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filterMarkets().map((market) => (
          <div
            key={market.id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
          >
            <div className={`p-6 border-b`}>
              <div className="flex items-center mb-4">
                <div
                  className={`p-2 rounded-lg bg-${market.color}-100 text-${market.color}-600 mr-3`}
                >
                  {market.icon}
                </div>
                <h3 className="text-xl font-bold">{market.name}</h3>
              </div>
              <p className="text-gray-600 mb-4">{market.description}</p>
              <ul className="mb-4">
                {market.features.map((feature, idx) => (
                  <li
                    key={idx}
                    className="flex items-center text-sm text-gray-600 mb-2"
                  >
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></div>
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="flex justify-between items-center">
                <button
                  onClick={() => handleToggleMarket(market.id)}
                  className="flex items-center text-blue-600 text-sm font-medium"
                >
                  {expandedMarket === market.id ? "Show less" : "Show more"}
                  <ChevronDown
                    className={`ml-1 h-4 w-4 transform transition-transform ${
                      expandedMarket === market.id ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <a
                  href="/signup"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm"
                >
                  Start Trading
                </a>
              </div>
            </div>

            {/* Expanded Details */}
            {expandedMarket === market.id && (
              <div className="p-6 bg-gray-50">
                <h4 className="font-semibold mb-2 flex items-center">
                  <Info className="h-4 w-4 mr-2 text-blue-600" />
                  About {market.name}
                </h4>
                <p className="text-gray-600 text-sm mb-4">{market.details}</p>
                <a
                  href="#"
                  className="flex items-center text-blue-600 text-sm font-medium"
                >
                  Learn more about {market.name}{" "}
                  <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Trading Conditions */}
      <div className="mt-16 bg-gray-50 p-8 rounded-xl">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Our Trading Conditions
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-xl font-bold mb-4">Competitive Pricing</h3>
            <ul className="space-y-3">
              <li className="flex justify-between">
                <span className="text-gray-600">Forex spreads from</span>
                <span className="font-semibold">0.1 pips</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-600">Crypto fees from</span>
                <span className="font-semibold">0.1%</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-600">Stocks commission</span>
                <span className="font-semibold">0.08%</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-600">Indices spreads from</span>
                <span className="font-semibold">0.4 points</span>
              </li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-xl font-bold mb-4">Execution Quality</h3>
            <ul className="space-y-3">
              <li className="flex justify-between">
                <span className="text-gray-600">Average execution speed</span>
                <span className="font-semibold">&lt;14 ms</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-600">Order rejection rate</span>
                <span className="font-semibold">&lt;0.1%</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-600">Uptime</span>
                <span className="font-semibold">99.9%</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-600">Price improvement</span>
                <span className="font-semibold">Yes</span>
              </li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-xl font-bold mb-4">Trading Features</h3>
            <ul className="space-y-3">
              <li className="flex justify-between">
                <span className="text-gray-600">Max leverage</span>
                <span className="font-semibold">Up to 1:500</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-600">
                  Negative balance protection
                </span>
                <span className="font-semibold">Yes</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-600">Instruments</span>
                <span className="font-semibold">1000+</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-600">Expert advisors</span>
                <span className="font-semibold">Supported</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="mt-16 text-center bg-blue-600 text-white p-8 rounded-xl">
        <h2 className="text-3xl font-bold mb-4">Ready to Start Trading?</h2>
        <p className="mb-8 max-w-2xl mx-auto text-blue-100">
          Open an account in minutes and gain access to all our financial
          markets with competitive spreads, professional tools, and 24/7
          support.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="/signup"
            className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition"
          >
            Create Free Account
          </a>
          <a
            href="#"
            className="px-8 py-3 bg-transparent border border-white text-white font-semibold rounded-lg hover:bg-blue-700 transition"
          >
            Try Demo Account
          </a>
        </div>
      </div>

      {/* Footer Information */}
      <div className="mt-16 text-center text-gray-600">
        <p className="text-sm mb-4">
          <strong>Risk Warning:</strong> Trading financial instruments carries a
          high level of risk. Please ensure you fully understand the risks
          involved.
        </p>
        <p className="text-xs">
          © 2025 XEX Trading Platform. All rights reserved. Trading services
          provided by Trading Platform Ltd., regulated by Financial Authority.
        </p>
      </div>
    </div>
  );
};

export default MarketsPage;
