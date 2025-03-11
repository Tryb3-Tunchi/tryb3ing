import React from 'react';
import { motion } from 'framer-motion';

const ResultsSection = () => {
  const features = [
    {
      title: "Fund Your Account Safely and Securely",
      description: "Trade with a multi-regulated broker that has built long-standing partnerships with top global banks to ensure your funds are always secure."
    },
    {
      title: "Tight Spreads",
      description: "Trade with spreads as low as 0.8 pips."
    },
    {
      title: "Low Trading Costs",
      description: "Pay no swap fees and zero commission."
    },
    {
      title: "Real Market Prices",
      description: "Enjoy fair prices with no requotes or rejections."
    },
    {
      title: "Instant Withdrawals",
      description: "Get your funds easily and pay no fees."
    }
  ];

  return (
    <div className="relative py-20 overflow-hidden">
      {/* Background with gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-blue-600 opacity-90">
        <div className="absolute inset-0 bg-[url('/path/to/pattern.png')] opacity-10"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4">
        {/* Main Content */}
        <div className="text-center text-white mb-16">
          <h2 className="text-4xl font-bold mb-4">Our Results Are Proven in Numbers</h2>
          <p className="text-xl mb-12">Nobody does more to provide you with what you need to maximise your trading potential.</p>

          {/* Animated Numbers */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="bg-white/10 rounded-lg p-6"
            >
              <div className="text-5xl font-bold mb-2">
                0123456789.0123456789
              </div>
              <p>Billion trades have been executed on XM Platforms</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="bg-white/10 rounded-lg p-6"
            >
              <div className="text-5xl font-bold mb-2">Zero</div>
              <p>rejections or requotes on trades</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="bg-white/10 rounded-lg p-6"
            >
              <div className="text-5xl font-bold mb-2">
                01234567890123456789.0123456789%
              </div>
              <p>of our withdrawals are automatically approved</p>
            </motion.div>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
                className="bg-white/10 rounded-xl p-6 backdrop-blur-sm hover:bg-white/20 transition-all"
              >
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-sm text-gray-200">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          {/* CTA Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-12 px-8 py-4 bg-white text-blue-900 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors"
          >
            Start Trading Today
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default ResultsSection;