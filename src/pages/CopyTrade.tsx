
import { Card, CardContent } from "../components/Card";
import { Button } from "../components/Card";
import { Users, TrendingUp, Shield, } from "lucide-react";
import DashboardNav from "../components/DashboardNav";

const CopyTradingSection = () => {
  return (
    <>
      <DashboardNav />
      <div className="w-full mt-16 bg-white">
        {/* Hero Section */}
        <div className="relative bg-blue-600 mt-2  text-white py-20 ">
          <div className="max-w-6xl mx-auto px-4">
            <div className="max-w-2xl">
              <h1 className="text-4xl font-bold mb-6">Copy Trading</h1>
              <p className="text-xl mb-8">
                Copy successful traders automatically and build your investment
                portfolio with proven strategies.
              </p>
              <Button className="bg-green-500 hover:bg-green-600">
                Start Copy Trading
              </Button>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-sm">
              <CardContent>
                <Users className="w-12 h-12 text-blue-500 mb-4" />
                <h3 className="text-xl font-semibold mb-3">
                  Follow Top Traders
                </h3>
                <p className="text-gray-600">
                  Browse through our community of successful traders and choose
                  who to copy based on their performance history.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardContent>
                <TrendingUp className="w-12 h-12 text-blue-500 mb-4" />
                <h3 className="text-xl font-semibold mb-3">
                  Automatic Copying
                </h3>
                <p className="text-gray-600">
                  Their trades are automatically replicated in your account with
                  proportional amounts based on your settings.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardContent>
                <Shield className="w-12 h-12 text-blue-500 mb-4" />
                <h3 className="text-xl font-semibold mb-3">Risk Management</h3>
                <p className="text-gray-600">
                  Set your risk level and investment amount. Stop copying
                  anytime with full control over your funds.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Featured Traders Section */}
        <div className="bg-gray-50 py-16">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">
              Featured Traders
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[1, 2, 3].map((trader) => (
                <Card key={trader} className="border-0 shadow-sm">
                  <CardContent>
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 rounded-full bg-gray-200 mr-4" />
                      <div>
                        <h4 className="font-semibold">Trader {trader}</h4>
                        <p className="text-sm text-gray-500">
                          Professional Trader
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Profit (12M)</span>
                        <span className="text-green-500 font-semibold">
                          +{45 + trader * 10}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Copiers</span>
                        <span className="font-semibold">
                          {1000 + trader * 500}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Risk Score</span>
                        <span className="font-semibold">{4 + trader}</span>
                      </div>
                    </div>
                    <Button className="w-full border border-gray-300 bg-white text-gray-700 hover:bg-gray-50">
                      View Profile
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="max-w-6xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold mb-12 text-center">
            How Copy Trading Works
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: 1,
                title: "Choose a Trader",
                description:
                  "Browse through our selection of successful traders and analyze their performance.",
              },
              {
                step: 2,
                title: "Set Your Amount",
                description:
                  "Decide how much you want to invest and set your risk parameters.",
              },
              {
                step: 3,
                title: "Start Copying",
                description:
                  "Activate copy trading and automatically replicate their trades.",
              },
              {
                step: 4,
                title: "Monitor & Adjust",
                description:
                  "Track your performance and adjust your settings anytime.",
              },
            ].map((step) => (
              <div key={step.step} className="text-center">
                <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-blue-600 text-white py-16">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Start Copy Trading?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of investors already growing their portfolios
              through copy trading.
            </p>
            <Button className="bg-green-500 hover:bg-green-600">
              Open Copy Trading Account
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CopyTradingSection;
