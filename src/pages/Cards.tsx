"use client";
import { motion } from "framer-motion";
// import commodities from "../image/commodities.png";
// import Image from "./Image";

const Cards = () => {
  const cardData = [
    {
      title: "Forex Trading",
      description:
        "Trade the world's largest financial market with competitive spreads and no commissions",
      image: "/img1.png",
      gradient: "from-blue-500 to-purple-600",
      icon: "📈",
    },
    {
      title: "Stocks & ETFs",
      description:
        "Access thousands of stocks and ETFs from the world's leading exchanges",
      image: "/img2.svg",
      gradient: "from-purple-500 to-pink-600",
      icon: "📊",
    },
    {
      title: "Commodities",
      description:
        "Trade gold, silver, oil and other popular commodities with tight spreads",
      image: "/img3.png",
      gradient: "from-orange-500 to-red-600",
      icon: "🏆",
    },
    {
      title: "Crypto Trading",
      description:
        "Trade major cryptocurrencies with leverage and 24/7 support",
      image: "/img4.png",
      gradient: "from-green-500 to-teal-600",
      icon: "💎",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-2xl md:text-4xl font-bold text-gray-900 mb-6"
          >
            Discover The Best Trading Experience at XEX
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl md:text-3xl font-semibold text-gray-700"
          >
            "Your Gateway to Global Markets"
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Explore some of our must-have products that keep everyone trading
            with us time and again.
          </motion.p>
        </div>

        {/* Large Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cardData.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${card.gradient} p-8 h-[400px] cursor-pointer`}
            >
              {/* Content Container */}
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <span className="text-4xl mb-4 block">{card.icon}</span>
                  <h3 className="text-3xl font-bold text-white mb-4">
                    {card.title}
                  </h3>
                  <p className="text-white/90 text-lg max-w-md">
                    {card.description}
                  </p>
                </div>

                <div className="flex items-center space-x-4">
                  <button className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-full font-semibold backdrop-blur-sm transition-all duration-300">
                    Learn More
                  </button>

                  <button className="bg-white text-gray-900 px-6 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-all duration-300">
                    <a href="/signup">Start Trading</a>
                  </button>
                </div>
              </div>

              {/* Slanted Image */}
              <div className="absolute right-[-5%] bottom-[-5%] w-[250px] h-[250px] transform rotate-12">
                <div className="relative w-full h-full">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="opacity-80 w-full h-full object-contain"
                  />
                </div>
              </div>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent z-0" />
            </motion.div>
          ))}
        </div>

        {/* XEX  App Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 text-white"
        >
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-8 md:mb-0">
              <h3 className="text-3xl font-bold mb-4">XEX App</h3>
              <p className="text-xl text-gray-300 max-w-xl">
                Get full access to XEX services with the top-rated,
                award-winning XEX App (Coming Soon!!!).
              </p>
              <div className="flex space-x-4 mt-6">
                <button className="flex items-center space-x-2 bg-white text-gray-900 px-6 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-all duration-300">
                  <svg
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M17.112 0H6.888C3.088 0 0 3.088 0 6.888v10.224C0 20.912 3.088 24 6.888 24h10.224c3.8 0 6.888-3.088 6.888-6.888V6.888C24 3.088 20.912 0 17.112 0zM12 18.75c-3.728 0-6.75-3.022-6.75-6.75S8.272 5.25 12 5.25 18.75 8.272 18.75 12 15.728 18.75 12 18.75z" />
                  </svg>
                  <span>App Store</span>
                </button>
                <button className="flex items-center space-x-2 bg-white text-gray-900 px-6 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-all duration-300">
                  <svg
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M3.609 1.814L13.792 12 3.609 22.186c-.181.181-.29.432-.29.714 0 .563.454 1.017 1.017 1.017.282 0 .533-.109.714-.29L15.186 13.5c.181-.181.29-.432.29-.714 0-.282-.109-.533-.29-.714L5.05 1.814C4.869 1.633 4.618 1.524 4.336 1.524c-.563 0-1.017.454-1.017 1.017 0 .282.109.533.29.714z" />
                  </svg>
                  <span>Google Play</span>
                </button>
              </div>
            </div>
            <div className="relative w-64 h-64">
              <img
                src="/img5.png"
                alt="XEX  App Preview"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Cards;
