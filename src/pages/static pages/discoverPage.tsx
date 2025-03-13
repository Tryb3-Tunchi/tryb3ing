import { BookOpen, Video, Users, FileText, ArrowRight } from "lucide-react";

const DiscoverPage = () => {
  return (
    <div className="pt-24 pb-16 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Discover Trading</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Learn to trade with our comprehensive educational resources and
          community support
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <div className="bg-gray-50 p-8 rounded-xl">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <BookOpen className="mr-2 h-6 w-6 text-blue-600" />
            Learning Center
          </h2>
          <p className="text-gray-600 mb-6">
            Access our comprehensive library of trading education materials
            designed for traders of all levels.
          </p>
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg hover:shadow-md transition">
              <h3 className="font-semibold mb-1">Trading Basics</h3>
              <p className="text-gray-600 text-sm">
                Learn fundamental concepts and terminology
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg hover:shadow-md transition">
              <h3 className="font-semibold mb-1">Technical Analysis</h3>
              <p className="text-gray-600 text-sm">
                Master chart patterns and indicators
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg hover:shadow-md transition">
              <h3 className="font-semibold mb-1">Risk Management</h3>
              <p className="text-gray-600 text-sm">
                Develop strategies to protect your capital
              </p>
            </div>
          </div>
          <button className="mt-6 flex items-center text-blue-600 font-medium">
            Browse all courses <ArrowRight className="ml-1 h-4 w-4" />
          </button>
        </div>

        <div className="bg-gray-50 p-8 rounded-xl">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <Video className="mr-2 h-6 w-6 text-blue-600" />
            Webinars & Events
          </h2>
          <p className="text-gray-600 mb-6">
            Join live and recorded sessions with industry experts sharing
            insights and trading strategies.
          </p>
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg hover:shadow-md transition">
              <div className="flex justify-between mb-1">
                <h3 className="font-semibold">Market Outlook</h3>
                <span className="text-sm bg-blue-100 text-blue-600 px-2 py-1 rounded">
                  Upcoming
                </span>
              </div>
              <p className="text-gray-600 text-sm">
                Weekly analysis of market trends and opportunities
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg hover:shadow-md transition">
              <div className="flex justify-between mb-1">
                <h3 className="font-semibold">Forex Fundamentals</h3>
                <span className="text-sm bg-green-100 text-green-600 px-2 py-1 rounded">
                  On-demand
                </span>
              </div>
              <p className="text-gray-600 text-sm">
                Understanding economic indicators and their impact
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg hover:shadow-md transition">
              <div className="flex justify-between mb-1">
                <h3 className="font-semibold">Crypto Trading</h3>
                <span className="text-sm bg-blue-100 text-blue-600 px-2 py-1 rounded">
                  Upcoming
                </span>
              </div>
              <p className="text-gray-600 text-sm">
                Strategies for cryptocurrency markets
              </p>
            </div>
          </div>
          <button className="mt-6 flex items-center text-blue-600 font-medium">
            View all events <ArrowRight className="ml-1 h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <Users className="mr-2 h-6 w-6 text-blue-600" />
            Trading Community
          </h2>
          <p className="text-gray-600 mb-4">
            Connect with fellow traders, share ideas, and learn from the
            experiences of others in our active community forums.
          </p>
          <button className="px-6 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition">
            Join Community
          </button>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <FileText className="mr-2 h-6 w-6 text-blue-600" />
            Market Analysis
          </h2>
          <p className="text-gray-600 mb-4">
            Access daily market insights, technical analysis, and trading ideas
            from our team of expert analysts.
          </p>
          <button className="px-6 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition">
            Read Analysis
          </button>
        </div>
      </div>

      <div className="bg-blue-600 text-white p-8 rounded-xl text-center">
        <h2 className="text-3xl font-bold mb-4">
          Start Your Trading Journey Today
        </h2>
        <p className="mb-6 max-w-2xl mx-auto">
          Open an account and gain access to all our educational resources,
          trading tools, and community features.
        </p>
        <a
          href="/signup"
          className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition font-medium"
        >
          Create Free Account
        </a>
      </div>
    </div>
  );
};

export default DiscoverPage;
