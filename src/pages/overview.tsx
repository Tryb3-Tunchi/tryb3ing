"use client";
import { motion } from "framer-motion";
// import Link from 'next/link';
import { Link } from "react-router-dom";
// import { useEffect, useState } from "react";
import Image from "../image/Image.png";

const Overview = () => {
  // Company logos for the carousel
  const companies = [
    Image,
    Image,
    Image,
    Image,
    Image,
    Image,
    // Add more company logos as needed
  ];

  return (
    <div className="relative min-h-screen my-10 w-full overflow-hidden">
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
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-white px-4">
        <div className="text-center max-w-4xl mx-auto space-y-6">
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
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105">
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
