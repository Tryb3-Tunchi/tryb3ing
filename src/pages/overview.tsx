"use client";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import image2 from "../image/image2.png";
import img7 from "../image/img7.png";
import img6 from "../image/img6.png";

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
    img6,
    image2,
    img6,
    image2,
    img7,
    image2,
    // Add more company logos as needed
  ];

  // Fetch price data from 12data API
  useEffect(() => {
    const fetchPriceData = async () => {
      try {
        // Define symbols to fetch
        const symbols = [
          "AAPL",
          "MSFT",
          "AMZN",
          "GOOGL",
          "BTC/USD",
          "ETH/USD",
          "EUR/USD",
          "GBP/USD",
        ];
        const apiKey = "ac56b30d361643d9b722e4d23b98b19a";

        // Create promises for all symbol requests
        const requests = symbols.map((symbol) =>
          fetch(
            `https://api.twelvedata.com/price?symbol=${symbol}&apikey=${apiKey}`
          )
            .then((response) => response.json())
            .then((data) => ({
              symbol,
              price: parseFloat(data.price).toFixed(2),
              change:
                (Math.random() > 0.5 ? "+" : "-") +
                (Math.random() * 2).toFixed(2) +
                "%", // Simulating change percentage
            }))
            .catch((error) => {
              console.error(`Error fetching ${symbol}:`, error);
              return null; // Return null for failed requests
            })
        );

        // Wait for all requests to complete
        const results = await Promise.all(requests);
        setPriceData(
          results.filter((item): item is PriceData => item !== null)
        ); // Filter out null values
      } catch (error) {
        console.error("Error fetching price data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPriceData();

    // Set up interval to refresh data every 60 seconds
    const intervalId = setInterval(fetchPriceData, 60000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="relative min-h-screen w-full mt-2 overflow-hidden">
      {/* Price ticker at the top */}
      <div className="w-full bg-gray-900 py-2 overflow-hidden">
        {loading ? (
          <div className="text-white text-center">Loading market data...</div>
        ) : (
          <motion.div
            className="flex space-x-8"
            animate={{
              x: [0, -2000],
            }}
            transition={{
              x: {
                duration: 30,
                repeat: Infinity,
                repeatType: "loop",
                ease: "linear",
              },
            }}
          >
            {/* Duplicate the price data array to create seamless loop */}
            {[...priceData, ...priceData].map((item, index) => (
              <div
                key={index}
                className="flex-shrink-0 flex items-center space-x-2"
              >
                <span className="font-bold text-white">{item.symbol}</span>
                <span className="text-white">{item.price}</span>
                <span
                  className={
                    item.change.startsWith("+")
                      ? "text-green-400"
                      : "text-red-400"
                  }
                >
                  {item.change}
                </span>
              </div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Animated background */}
      <div className="absolute inset-0 z-0">
        <div className="h-full w-full bg-gradient-to-br from-blue-900 to-black">
          {/* Animated market graph lines */}
          <svg className="absolute inset-0 w-full h-full opacity-20">
            <pattern
              id="graph-pattern"
              x="0"
              y="0"
              width="100"
              height="100"
              patternUnits="userSpaceOnUse"
            >
              <motion.path
                d="M 0 50 Q 25 25, 50 50 T 100 50"
                stroke="white"
                strokeWidth="1"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </pattern>
            <rect
              x="0"
              y="0"
              width="100%"
              height="100%"
              fill="url(#graph-pattern)"
            />
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-white px-4 ">
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Trusted by over 15 Million Traders
          </h1>
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            The Most Awarded Broker for a Reason
          </h2>
          <p className="text-xl md:text-2xl mb-8">
            We offer a superior trading environment that puts traders in the
            best position to profit.
          </p>
          <Link to="/signup">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 my-4 px-4 rounded-full transition-all duration-300 transform hover:scale-105">
              Get Your Welcome Bonus**Limited-Time Offer
            </button>
          </Link>
          <p className="text-lg mt-4">Easy Access to 1,400+ Global Assets</p>
        </div>

        {/* Company logos carousel */}
        <div className="absolute bottom-0 w-full overflow-hidden py-8 bg-gradient-to-r from-transparent via-black/30 to-transparent">
          <motion.div
            className="flex space-x-8"
            animate={{
              x: [0, -1000],
            }}
            transition={{
              x: {
                duration: 20,
                repeat: Infinity,
                repeatType: "loop",
                ease: "linear",
              },
            }}
          >
            {/* Duplicate the logos array to create seamless loop */}
            {[...companies, ...companies].map((logo, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-20 h-20 bg-white rounded-full p-[1px]"
              >
                <img
                  src={logo}
                  alt={`Company logo ${index + 1}`}
                  className="w-full h-full object-cover rounded-full border-none"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
