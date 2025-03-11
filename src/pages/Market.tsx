import React, { useState, useEffect } from "react";
import { Card, CardContent } from "../components/Card";
import {
  ArrowUp,
  ArrowDown,
 
} from "lucide-react";
import DashboardNav from "../components/DashboardNav";

const MarketDashboard = () => {
  const [prices, setPrices] = useState({
    EURUSD: 1.03141,
    BTCUSD: 96763.08,
    USDJPY: 157.085,
    GOLD: 2640.99,
  });

  // Simulate live price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setPrices((prev) => ({
        EURUSD: prev.EURUSD + (Math.random() - 0.5) * 0.001,
        BTCUSD: prev.BTCUSD + (Math.random() - 0.5) * 10,
        USDJPY: prev.USDJPY + (Math.random() - 0.5) * 0.1,
        GOLD: prev.GOLD + (Math.random() - 0.5) * 1,
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {" "}
      <DashboardNav />
      <div className="max-w-6xl mx-auto p-4">
        {/* Top Tickers */}
        <div className="grid grid-cols-1 pt-20 md:grid-cols-4 gap-4 mb-6">
          {Object.entries(prices).map(([symbol, price]) => (
            <Card
              key={symbol}
              className="bg-white hover:shadow-md transition-shadow"
            >
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-bold">{symbol}</span>
                  {Math.random() > 0.5 ? (
                    <span className="text-green-500 flex items-center">
                      <ArrowUp size={16} />+{(Math.random() * 2).toFixed(2)}%
                    </span>
                  ) : (
                    <span className="text-red-500 flex items-center">
                      <ArrowDown size={16} />-{(Math.random() * 2).toFixed(2)}%
                    </span>
                  )}
                </div>
                <div className="text-2xl font-semibold mb-1">
                  {price.toFixed(symbol === "BTCUSD" ? 2 : 5)}
                </div>
                <div className="text-sm text-gray-500">1D change</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Market Analysis */}
          <div className="md:col-span-2">
            <Card className="mb-6">
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold">Market Summary</h2>
                  <div className="flex space-x-2">
                    {["1D", "1M", "3M", "1Y", "All"].map((period) => (
                      <button
                        key={period}
                        className={`px-3 py-1 rounded ${
                          period === "1D"
                            ? "bg-blue-500 text-white"
                            : "bg-gray-100"
                        }`}
                      >
                        {period}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  {[
                    {
                      pair: "EURUSD",
                      name: "Euro vs US Dollar",
                      price: 1.03141,
                      change: -0.32,
                    },
                    {
                      pair: "GBPUSD",
                      name: "Great Britain Pound vs US Dollar",
                      price: 1.24124,
                      change: -0.84,
                    },
                    {
                      pair: "USDJPY",
                      name: "US Dollar vs Japanese Yen",
                      price: 157.085,
                      change: -0.17,
                    },
                  ].map((item) => (
                    <div
                      key={item.pair}
                      className="flex items-center justify-between p-2 hover:bg-gray-50 rounded"
                    >
                      <div>
                        <div className="font-semibold">{item.pair}</div>
                        <div className="text-sm text-gray-500">{item.name}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">{item.price}</div>
                        <div
                          className={`text-sm ${
                            item.change > 0 ? "text-green-500" : "text-red-500"
                          }`}
                        >
                          {item.change}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Latest News */}
            <Card>
              <CardContent>
                <h2 className="text-xl font-bold mb-4">Latest Headlines</h2>
                {[
                  "Argentina's agro export revenue up 58% in...",
                  "World shares start 2025 with a wobble on Trump...",
                  "Tennis-Djokovic continues Monfils...",
                ].map((headline, index) => (
                  <div key={index} className="border-b last:border-0 py-3">
                    <div className="flex items-center text-sm text-gray-500 mb-1">
                      <span className="mr-2">Reuters</span>
                      <span>1 week ago</span>
                    </div>
                    <div className="font-medium hover:text-blue-500 cursor-pointer">
                      {headline}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Market Sentiment */}
          <div>
            <Card>
              <CardContent>
                <h2 className="text-xl font-bold mb-4">Market Sentiment</h2>
                {[
                  { symbol: "EURUSD", buy: 82, sell: 18 },
                  { symbol: "USDJPY", buy: 47, sell: 53 },
                  { symbol: "GOLD", buy: 39, sell: 61 },
                ].map((item) => (
                  <div key={item.symbol} className="mb-4">
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">{item.symbol}</span>
                      <div className="flex space-x-4">
                        <span className="text-green-500">{item.buy}%</span>
                        <span className="text-red-500">{item.sell}%</span>
                      </div>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-500"
                        style={{ width: `${item.buy}%` }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default MarketDashboard;
