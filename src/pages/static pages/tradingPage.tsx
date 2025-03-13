import { ArrowUpRight, TrendingUp, BarChart2, PieChart } from "lucide-react";

const TradingPage = () => {
  return (
    <div className="pt-24 pb-16 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Trading Solutions</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Access global markets with advanced trading tools and competitive
          conditions
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
          <div className="bg-blue-100 p-3 rounded-full w-fit mb-4">
            <TrendingUp className="h-6 w-6 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold mb-3">Advanced Charts</h2>
          <p className="text-gray-600 mb-4">
            Access professional-grade charts with 100+ technical indicators and
            drawing tools to analyze market movements.
          </p>
          <a href="#" className="text-blue-600 font-medium flex items-center">
            Learn more <ArrowUpRight className="ml-1 h-4 w-4" />
          </a>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
          <div className="bg-blue-100 p-3 rounded-full w-fit mb-4">
            <BarChart2 className="h-6 w-6 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold mb-3">Market Analysis</h2>
          <p className="text-gray-600 mb-4">
            Get real-time market insights, economic calendars, and expert
            analysis to inform your trading decisions.
          </p>
          <a href="#" className="text-blue-600 font-medium flex items-center">
            Learn more <ArrowUpRight className="ml-1 h-4 w-4" />
          </a>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
          <div className="bg-blue-100 p-3 rounded-full w-fit mb-4">
            <PieChart className="h-6 w-6 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold mb-3">Risk Management</h2>
          <p className="text-gray-600 mb-4">
            Utilize stop-loss, take-profit, and other risk management tools to
            protect your capital and optimize returns.
          </p>
          <a href="#" className="text-blue-600 font-medium flex items-center">
            Learn more <ArrowUpRight className="ml-1 h-4 w-4" />
          </a>
        </div>
      </div>

      <div className="bg-gray-50 p-8 rounded-2xl mb-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Trading Platforms</h2>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="bg-blue-600 text-white p-3 rounded-lg">
                <TrendingUp className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Web Platform</h3>
                <p className="text-gray-600">
                  Trade directly from your browser with our feature-rich web
                  platform. Access all markets, tools, and analytics without
                  downloading any software.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-blue-600 text-white p-3 rounded-lg">
                <BarChart2 className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Mobile App</h3>
                <p className="text-gray-600">
                  Trade on the go with our powerful mobile application. Stay
                  connected to the markets and manage your positions from
                  anywhere in the world.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-blue-600 text-white p-3 rounded-lg">
                <PieChart className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Desktop Software</h3>
                <p className="text-gray-600">
                  Experience maximum performance with our desktop trading
                  platform, designed for professional traders who demand the
                  best tools and execution speed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to start trading?</h2>
        <a
          href="/signup"
          className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Open Trading Account
        </a>
      </div>
    </div>
  );
};

export default TradingPage;
