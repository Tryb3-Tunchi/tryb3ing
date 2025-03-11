import React, { useState, useEffect } from "react";
import { Card, CardContent } from "../components/Card";
import { ArrowUp, ArrowDown, RefreshCw } from "lucide-react";
import DashboardNav from "../components/DashboardNav";
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

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface PriceData {
  price: number;
  change: number;
}

interface MarketPrices {
  EURUSD: PriceData;
  BTCUSD: PriceData;
  USDJPY: PriceData;
  GOLD: PriceData;
  [key: string]: PriceData;
}

interface NewsItem {
  title: string;
  source: string;
  url: string;
  publishedAt: string;
}

const MarketDashboard: React.FC = () => {
  const [prices, setPrices] = useState<MarketPrices>({
    EURUSD: { price: 0, change: 0 },
    BTCUSD: { price: 0, change: 0 },
    USDJPY: { price: 0, change: 0 },
    GOLD: { price: 0, change: 0 },
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [chartData, setChartData] = useState<any>(null);

  // Fetch market data using publicly accessible APIs
  const fetchMarketData = async (): Promise<void> => {
    setLoading(true);
    try {
      // For BTC price, we'll use CoinGecko's public API
      const btcResponse = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true"
      );
      const btcData = await btcResponse.json();

      // For demo purposes, we'll use simulated data for other pairs
      // In a production app, you would use authenticated API calls
      const updatedPrices: MarketPrices = {
        BTCUSD: {
          price: btcData.bitcoin.usd,
          change: btcData.bitcoin.usd_24h_change,
        },
        EURUSD: { 
          price: 1.0876, 
          change: -0.12 
        },
        USDJPY: { 
          price: 113.25, 
          change: 0.35 
        },
        GOLD: { 
          price: 2253.80, 
          change: 0.65 
        },
      };
      
      setPrices(updatedPrices);
      setLastUpdated(new Date());
    } catch (error) {
      console.error("Error fetching market data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch historical data for the chart
  const fetchChartData = async (): Promise<void> => {
    try {
      // Using CoinGecko's free API for historical BTC prices
      const response = await fetch(
        "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=30&interval=daily"
      );
      const data = await response.json();
      
      // CoinGecko returns price data as [timestamp, price] pairs
      const prices = data.prices;
      
      // Format the data for Chart.js
      const chartLabels = prices.map((item: [number, number]) => 
        new Date(item[0]).toLocaleDateString()
      );
      
      const chartPrices = prices.map((item: [number, number]) => item[1]);

      setChartData({
        labels: chartLabels,
        datasets: [
          {
            label: "BTC/USD Price",
            data: chartPrices,
            borderColor: "rgba(75, 192, 192, 1)",
            fill: false,
          },
        ],
      });
    } catch (error) {
      console.error("Error fetching chart data:", error);
    }
  };

  // Fetch latest financial news
  const fetchLatestNews = async (): Promise<void> => {
    try {
      // For demo purposes, we'll use mock news data
      // In a production app, you would integrate with a news API
      const mockNews: NewsItem[] = [
        {
          title: "Bitcoin surpasses $60,000 as institutional adoption grows",
          source: "Crypto News",
          url: "#",
          publishedAt: "2025-03-11T08:30:00Z"
        },
        {
          title: "Fed signals potential rate cuts in upcoming meeting",
          source: "Financial Times",
          url: "#",
          publishedAt: "2025-03-10T22:15:00Z"
        },
        {
          title: "Gold reaches new all-time high amid market uncertainty",
          source: "Market Watch",
          url: "#",
          publishedAt: "2025-03-10T16:45:00Z"
        },
        {
          title: "Japanese yen weakens as Bank of Japan maintains policy",
          source: "Reuters",
          url: "#",
          publishedAt: "2025-03-10T10:20:00Z"
        }
      ];
      
      setNews(mockNews);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  // Initial data load
  useEffect(() => {
    fetchMarketData();
    fetchChartData();
    fetchLatestNews();
  }, []);

  // Set up periodic data refresh
  useEffect(() => {
    const interval = setInterval(() => {
      fetchMarketData();
    }, 60000); // Refresh every 60 seconds

    return () => clearInterval(interval);
  }, []);

  const formatPrice = (symbol: string, price: number): string => {
    if (symbol === "BTCUSD") return price.toFixed(2);
    if (symbol === "GOLD") return price.toFixed(2);
    if (symbol === "USDJPY") return price.toFixed(2);
    return price.toFixed(4);
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <>
      <DashboardNav />
      <div className="max-w-6xl mx-auto p-4">
        <div className="flex justify-between items-center pt-20 mb-4">
          <h1 className="text-2xl font-bold">Market Dashboard</h1>
          <div className="flex items-center text-sm text-gray-500">
            <span className="mr-2">
              Last updated: {lastUpdated ? lastUpdated.toLocaleTimeString() : "Loading..."}
            </span>
            <button
              onClick={fetchMarketData}
              disabled={loading}
              className="flex items-center p-1 hover:bg-gray-100 rounded-full"
            >
              <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
            </button>
          </div>
        </div>

        {/* Top Tickers */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {Object.entries(prices).map(([symbol, data]) => (
            <Card key={symbol} className="bg-white hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-bold">{symbol}</span>
                  {data.change > 0 ? (
                    <span className="text-green-500 flex items-center">
                      <ArrowUp size={16} />+{Math.abs(data.change).toFixed(2)}%
                    </span>
                  ) : (
                    <span className="text-red-500 flex items-center">
                      <ArrowDown size={16} />-{Math.abs(data.change).toFixed(2)}%
                    </span>
                  )}
                </div>
                <div className="text-2xl font-semibold mb-1">
                  {formatPrice(symbol, data.price)}
                </div>
                <div className="text-sm text-gray-500">1D change</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Chart */}
        <Card className="mb-6">
          <CardContent>
            <h2 className="text-xl font-bold mb-4">BTC/USD Price Chart</h2>
            {chartData ? (
              <Line data={chartData} />
            ) : (
              <div className="flex justify-center py-8">
                <RefreshCw size={24} className="animate-spin text-gray-400" />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Latest News */}
        <Card className="mb-6">
          <CardContent>
            <h2 className="text-xl font-bold mb-4">Latest Market News</h2>
            <div className="divide-y">
              {news.map((item, index) => (
                <div key={index} className="py-3">
                  <h3 className="font-semibold">{item.title}</h3>
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>{item.source}</span>
                    <span>{formatDate(item.publishedAt)}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default MarketDashboard;