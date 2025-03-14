import { Gift, Trophy, Users, BookOpen, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const PromoSection = () => {
  return (
    <div className="w-full bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 space-y-6">
        {/* Refer a Friend */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-400 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-start space-x-4">
            <Gift className="w-8 h-8 flex-shrink-0 mt-1" />
            <div className="flex-grow">
              <div className="inline-block bg-blue-500 text-xs font-bold px-2 py-1 rounded mb-2">
                NEW
              </div>
              <h3 className="text-xl font-bold mb-2">XEX Refer a Friend</h3>
              <p className="mb-4">
                Are you a proud XEX client? Why not spread the word about XEX ?
                Invite your friends to start trading with us and earn up to $70
                for each person you refer.
              </p>
              <div className="flex items-center space-x-4">
                <Link to="/Refer-friend">
                  {" "}
                  <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                    See Promo
                  </button>
                </Link>
                <span className="text-sm">*T&Cs apply</span>
              </div>
            </div>
          </div>
        </div>

        {/* Competitions Section */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-500 rounded-xl p-6 text-white shadow-lg">
          <div className="inline-block bg-purple-500 text-xs font-bold px-2 py-1 rounded mb-2">
            Suggested for you!
          </div>
          <div className="flex items-start space-x-4">
            <Trophy className="w-8 h-8 flex-shrink-0 mt-1" />
            <div className="flex-grow">
              <h3 className="text-xl font-bold mb-2">XEX Competitions</h3>
              <h4 className="text-2xl font-bold mb-2">
                Win Your Share of $140,000 🎉
              </h4>
              <p className="mb-4">
                Compete in our Demo or Real competitions. This month's Real
                Competition is Mega so you can win cash with your trading skills
                or luck.
              </p>
              <div className="flex items-center space-x-4">
                <button className="bg-white text-purple-600 px-4 py-2 rounded-lg font-semibold hover:bg-purple-50 transition-colors">
                  Enter For Free
                </button>
                <button className="bg-transparent border-2 border-white px-4 py-2 rounded-lg font-semibold hover:bg-purple-500 transition-colors">
                  Read more
                </button>
              </div>
              <p className="text-sm mt-2">*T&Cs apply</p>
            </div>
          </div>
        </div>

        {/* Copy Trading Section */}
        <div className="bg-gradient-to-r from-green-600 to-teal-500 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-start space-x-4">
            <Users className="w-8 h-8 flex-shrink-0 mt-1" />
            <div className="flex-grow">
              <h3 className="text-xl font-bold mb-2">XEX COPY TRADING</h3>
              <h4 className="text-2xl font-bold mb-2">
                Trade Like an Expert in No Time At All
              </h4>
              <p className="mb-4">Copy Top Traders and Earn When They Do.</p>
              <div className="flex items-center space-x-4">
                <Link to="/trade">
                  <button className="bg-white text-green-600 px-4 py-2 mr-3 rounded-lg font-semibold hover:bg-green-50 transition-colors">
                    Start Copy Trading
                  </button>
                  <button className="bg-transparent border-2 border-white px-4 py-2 rounded-lg font-semibold hover:bg-green-500 transition-colors">
                    Read more
                  </button>
                </Link>
              </div>
              <p className="text-sm mt-2">
                Your capital is at risk. *T&Cs apply.
              </p>
            </div>
          </div>
        </div>

        {/* Education Section */}
        <div className="bg-gradient-to-r from-orange-500 to-yellow-500 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-start space-x-4">
            <BookOpen className="w-8 h-8 flex-shrink-0 mt-1" />
            <div className="flex-grow">
              <h3 className="text-xl font-bold mb-2">Free Trading Education</h3>
              <h4 className="text-2xl font-bold mb-2">
                Take Your Trades to the Next Level
              </h4>
              <p className="mb-4">
                Gain insights from top experts and get your questions answered!
                Join our multilingual webinars and in-person events for traders
                of all levels.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="bg-white text-orange-600 px-4 py-2 rounded-lg font-semibold hover:bg-orange-50 transition-colors flex items-center">
                  Join Webinars
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
                <button className="bg-transparent border-2 border-white px-4 py-2 rounded-lg font-semibold hover:bg-orange-500 transition-colors flex items-center">
                  Join Trading Workshops
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromoSection;
