"use client";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import image2 from "../image/image2.png";
import img7 from "../image/img7.png";
import img6 from "../image/img6.png";
import img3 from "../image/img3.png";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Define TypeScript interface for price data
interface PriceData {
  symbol: string;
  price: string;
  change: string;
}

const Overview = () => {
  // State for price data
  const [priceData, setPriceData] = useState<PriceData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Company logos for the carousel
  const companies = [
    { logo: img6, name: "Company 1" },
    { logo: image2, name: "Company 2" },
    { logo: img7, name: "Company 3" },
    { logo: img3, name: "Company 4" },
    { logo: image2, name: "Company 5" },
    { logo: img7, name: "Company 6" },
  ];

  // Sample chart data
  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "BTC/USD",
        data: [30000, 35000, 40000, 38000, 42000, 45000],
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.5)",
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        grid: {
          display: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  // Fetch price data from CoinGecko API
  useEffect(() => {
    const fetchPriceData = async () => {
      try {
        const symbols = [
          "BTC", "ETH", "BNB", "XRP", "SOL", "ADA", "DOGE", "DOT", "MATIC", "LINK",
          "EUR/USD", "GBP/USD", "JPY/USD", "AUD/USD", "CAD/USD", "CHF/USD", "NZD/USD",
          "SGD/USD", "HKD/USD", "CNY/USD", "INR/USD", "KRW/USD", "TWD/USD", "THB/USD",
          "MXN/USD", "BRL/USD", "ARS/USD", "CLP/USD", "COP/USD", "PEN/USD",
          "SEK/USD", "NOK/USD", "DKK/USD", "PLN/USD", "CZK/USD", "HUF/USD", "RON/USD",
          "ZAR/USD", "TRY/USD", "ILS/USD", "EGP/USD", "AED/USD", "SAR/USD",
        ];

        const cryptoEndpoint = "https://api.coingecko.com/api/v3/simple/price";
        const cryptoResponse = await fetch(
          `${cryptoEndpoint}?ids=bitcoin,ethereum,binancecoin,ripple,solana,cardano,dogecoin,polkadot,polygon,chainlink&vs_currencies=usd&include_24hr_change=true`
        );
        const cryptoData = await cryptoResponse.json();

        const forexRequests = symbols
          .filter(
            (symbol) =>
              !["BTC", "ETH", "BNB", "XRP", "SOL", "ADA", "DOGE", "DOT", "MATIC", "LINK"].includes(symbol)
          )
          .map((symbol) =>
            fetch(
              `https://api.twelvedata.com/price?symbol=${symbol}&apikey=ac56b30d361643d9b722e4d23b98b19a`
            )
              .then((response) => response.json())
              .then((data) => {
                if (data.status === "error") {
                  throw new Error(data.message);
                }
                return {
                  symbol,
                  price: parseFloat(data.price).toFixed(4),
                  change: (Math.random() > 0.5 ? "+" : "-") + (Math.random() * 0.5).toFixed(2) + "%",
                };
              })
              .catch(() => null)
          );

        const forexResults = await Promise.all(forexRequests);
        const validForexData = forexResults.filter((result) => result !== null);

        const combinedData = [
          {
            symbol: "BTC/USD",
            price: cryptoData.bitcoin?.usd?.toFixed(2) || "0.00",
            change: (cryptoData.bitcoin?.usd_24h_change?.toFixed(2) || "0.00") + "%",
          },
          {
            symbol: "ETH/USD",
            price: cryptoData.ethereum?.usd?.toFixed(2) || "0.00",
            change: (cryptoData.ethereum?.usd_24h_change?.toFixed(2) || "0.00") + "%",
          },
          {
            symbol: "BNB/USD",
            price: cryptoData.binancecoin?.usd?.toFixed(2) || "0.00",
            change: (cryptoData.binancecoin?.usd_24h_change?.toFixed(2) || "0.00") + "%",
          },
          {
            symbol: "XRP/USD",
            price: cryptoData.ripple?.usd?.toFixed(2) || "0.00",
            change: (cryptoData.ripple?.usd_24h_change?.toFixed(2) || "0.00") + "%",
          },
          {
            symbol: "SOL/USD",
            price: cryptoData.solana?.usd?.toFixed(2) || "0.00",
            change: (cryptoData.solana?.usd_24h_change?.toFixed(2) || "0.00") + "%",
          },
          {
            symbol: "ADA/USD",
            price: cryptoData.cardano?.usd?.toFixed(2) || "0.00",
            change: (cryptoData.cardano?.usd_24h_change?.toFixed(2) || "0.00") + "%",
          },
          {
            symbol: "DOGE/USD",
            price: cryptoData.dogecoin?.usd?.toFixed(2) || "0.00",
            change: (cryptoData.dogecoin?.usd_24h_change?.toFixed(2) || "0.00") + "%",
          },
          {
            symbol: "DOT/USD",
            price: cryptoData.polkadot?.usd?.toFixed(2) || "0.00",
            change: (cryptoData.polkadot?.usd_24h_change?.toFixed(2) || "0.00") + "%",
          },
          {
            symbol: "MATIC/USD",
            price: cryptoData.polygon?.usd?.toFixed(2) || "0.00",
            change: (cryptoData.polygon?.usd_24h_change?.toFixed(2) || "0.00") + "%",
          },
          {
            symbol: "LINK/USD",
            price: cryptoData.chainlink?.usd?.toFixed(2) || "0.00",
            change: (cryptoData.chainlink?.usd_24h_change?.toFixed(2) || "0.00") + "%",
          },
          ...validForexData,
        ];

        setPriceData(combinedData);
      } catch (error) {
        console.error("Error fetching price data:", error);
        const defaultSymbols = [
          "BTC/USD", "ETH/USD", "BNB/USD", "XRP/USD", "SOL/USD", "ADA/USD", "DOGE/USD", "DOT/USD", "MATIC/USD", "LINK/USD",
          "EUR/USD", "GBP/USD", "JPY/USD", "AUD/USD", "CAD/USD", "CHF/USD", "NZD/USD",
          "SGD/USD", "HKD/USD", "CNY/USD", "INR/USD", "KRW/USD", "TWD/USD", "THB/USD",
          "MXN/USD", "BRL/USD", "ARS/USD", "CLP/USD", "COP/USD", "PEN/USD",
          "SEK/USD", "NOK/USD", "DKK/USD", "PLN/USD", "CZK/USD", "HUF/USD", "RON/USD",
          "ZAR/USD", "TRY/USD", "ILS/USD", "EGP/USD", "AED/USD", "SAR/USD",
        ];
        setPriceData(
          defaultSymbols.map((symbol) => ({
            symbol,
            price: "0.00",
            change: "0.00%",
          }))
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPriceData();
    const intervalId = setInterval(fetchPriceData, 15000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="relative min-h-screen w-full mt-20 overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 to-black/80" />
      </div>

      {/* Price ticker */}
      <div className="relative z-10 w-full bg-black/50 py-2 sm:py-3">
        {loading ? (
          <div className="text-white text-center text-sm sm:text-base">
            Loading market data...
          </div>
        ) : (
          <motion.div
            className="flex space-x-3 sm:space-x-4"
            animate={{ x: [0, -1000] }}
            transition={{
              x: {
                duration: 12,
                repeat: Infinity,
                repeatType: "loop",
                ease: "linear",
              },
            }}
          >
            {[...priceData, ...priceData, ...priceData].map((item, index) => (
              <div
                key={index}
                className="flex-shrink-0 flex items-center space-x-1 sm:space-x-2"
              >
                <span className="font-bold text-white text-xs sm:text-sm">
                  {item.symbol}
                </span>
                <span className="text-white text-xs sm:text-sm">
                  {item.symbol.includes("USD") ? "$" : ""}
                  {item.price}
                </span>
                <span
                  className={`px-1 py-0.5 rounded-full text-xs sm:text-sm ${
                    item.change.startsWith("+")
                      ? "bg-green-500/20 text-green-400"
                      : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {item.change}
                </span>
              </div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 pt-16 sm:pt-20 lg:pt-24 pb-16 sm:pb-20 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-start">
          {/* Left content */}
          <div className="space-y-6 sm:space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
                Trade with Confidence on the World's Leading Platform
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-gray-300 mt-4 sm:mt-6 max-w-md">
                Join over 15 million traders who trust our platform for secure and profitable trading. Access 1,400+ global assets with advanced tools and real-time data.
              </p>
            </motion.div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link to="/signup">
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-full transition-all duration-300 transform hover:scale-105">
                  Start Trading Now
                </button>
              </Link>
              <Link to="/promotions">
                <button className="bg-white/10 hover:bg-white/20 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-full transition-all duration-300">
                  Learn More
                </button>
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-white">15M+</div>
                <div className="text-gray-400 text-sm sm:text-base">Active Traders</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-white">1,400+</div>
                <div className="text-gray-400 text-sm sm:text-base">Trading Pairs</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-white">99.9%</div>
                <div className="text-gray-400 text-sm sm:text-base">Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-white">24/7</div>
                <div className="text-gray-400 text-sm sm:text-base">Support</div>
              </div>
            </div>
          </div>

          {/* Right content - Chart */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 sm:p-6">
            <div className="h-[200px] sm:h-[250px] lg:h-[300px]">
              <Line data={chartData} options={chartOptions} />
            </div>
          </div>
        </div>
      </div>

      {/* Company logos carousel */}
      <div className="relative z-10 py-8 sm:py-12 bg-gradient-to-t from-black/90 to-transparent">
        <div className="container mx-auto px-4 sm:px-6">
          <h3 className="text-white text-center text-lg sm:text-xl font-semibold mb-4 sm:mb-6">
            Trusted by Leading Financial Institutions
          </h3>
          <motion.div
            className="flex space-x-6 sm:space-x-12"
            animate={{ x: [0, -1000] }}
            transition={{
              x: {
                duration: 20,
                repeat: Infinity,
                repeatType: "loop",
                ease: "linear",
              },
            }}
          >
            {[...companies, ...companies].map((company, index) => (
              <motion.div
                key={index}
                className="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 bg-white/10 backdrop-blur-sm rounded-xl p-3 sm:p-4 flex items-center justify-center group"
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(255,255,255,0.15)",
                }}
                transition={{ duration: 0.2 }}
              >
                <img
                  src={company.logo}
                  alt={company.name}
                  className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Overview;