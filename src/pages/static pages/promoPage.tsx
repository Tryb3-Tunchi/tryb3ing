import {
  Gift,
  Users,
  Award,
  Shield,
  Zap,
  Globe,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

const PromotionsCompanyPage = () => {
  return (
    <div className="pt-24 pb-16 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Promotions & Company</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Learn about our company and take advantage of our exclusive promotions
        </p>
      </div>

      {/* Current Promotions Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Current Promotions
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
            <div className="h-48 bg-blue-600 flex items-center justify-center">
              <Gift className="h-16 w-16 text-white" />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Welcome Bonus</h3>
              <p className="text-gray-600 mb-4">
                Get up to $500 bonus when you open and fund a new trading
                account
              </p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Ends in 14 days</span>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                  Claim Now
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
            <div className="h-48 bg-purple-600 flex items-center justify-center">
              <Users className="h-16 w-16 text-white" />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Refer A Friend</h3>
              <p className="text-gray-600 mb-4">
                Earn $100 for each friend you refer who opens and funds an
                account
              </p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Ongoing promotion</span>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                  Share Now
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
            <div className="h-48 bg-green-600 flex items-center justify-center">
              <Award className="h-16 w-16 text-white" />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Loyalty Program</h3>
              <p className="text-gray-600 mb-4">
                Earn points for every trade you make and redeem for cash or
                benefits
              </p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Ongoing program</span>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Company Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">
          About Our Company
        </h2>
        <div className="bg-gray-50 p-8 rounded-xl">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-gray-600 mb-6">
                We aim to provide traders of all levels with the tools,
                education, and support they need to succeed in the financial
                markets. Our innovative platform and commitment to transparency
                set us apart in the industry.
              </p>
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-gray-600">
                To become the most trusted and accessible trading platform
                globally, empowering millions of people to achieve financial
                freedom through smart trading and investment strategies.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">Key Facts</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Shield className="mr-3 h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Fully Regulated</h4>
                    <p className="text-gray-600 text-sm">
                      Licensed and regulated by top-tier financial authorities
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Globe className="mr-3 h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Global Presence</h4>
                    <p className="text-gray-600 text-sm">
                      Operating in over 50 countries with clients worldwide
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Users className="mr-3 h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Client-Centric</h4>
                    <p className="text-gray-600 text-sm">
                      24/7 customer support and dedicated account managers
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Zap className="mr-3 h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Advanced Technology</h4>
                    <p className="text-gray-600 text-sm">
                      State-of-the-art trading platforms and ultra-fast
                      execution
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Our Leadership Team
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition text-center">
            <img
              src="./img8.jpg"
              className="w-28 h-28 bg-gray-200 rounded-full mx-auto mb-4"
            ></img>
            <h3 className="text-xl font-bold mb-1">Sarah Johnson</h3>
            <p className="text-blue-600 mb-4">Chief Executive Officer</p>
            <p className="text-gray-600 text-sm">
              Over 20 years of experience in financial markets and fintech
              innovation
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition text-center">
            <img
              src="./img9.jpg"
              className="w-28 h-28 bg-gray-200 rounded-full mx-auto mb-4"
            ></img>
            <h3 className="text-xl font-bold mb-1">Michael Chen</h3>
            <p className="text-blue-600 mb-4">Chief Technology Officer</p>
            <p className="text-gray-600 text-sm">
              Technology leader with expertise in trading platforms and
              algorithmic trading
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition text-center">
            <img
              src="./img10.jpg"
              className="w-28 h-28 bg-gray-200 rounded-full mx-auto mb-4"
            ></img>
            <h3 className="text-xl font-bold mb-1">Alex Rodriguez</h3>
            <p className="text-blue-600 mb-4">Chief Market Analyst</p>
            <p className="text-gray-600 text-sm">
              Former hedge fund manager with deep insights into global markets
            </p>
          </div>
        </div>
      </section>

      {/* Contact and Offices */}
      <section>
        <h2 className="text-3xl font-bold mb-8 text-center">Contact Us</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-bold mb-4">Get in Touch</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <Mail className="mr-3 h-5 w-5 text-blue-600" />
                <p>customerservice@xexplatform.space</p>
              </div>
              <div className="flex items-center">
                <Phone className="mr-3 h-5 w-5 text-blue-600" />
                <p>+1 (252) 280-1299</p>
              </div>
            </div>
            <h3 className="text-xl font-bold mb-4 mt-6">Global Offices</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <MapPin className="mr-3 h-5 w-5 text-blue-600 mt-1" />
                <div>
                  <h4 className="font-semibold">London</h4>
                  <p className="text-gray-600 text-sm">
                    Plot 42B Financial Street, London, UK
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <MapPin className="mr-3 h-5 w-5 text-blue-600 mt-1" />
                <div>
                  <h4 className="font-semibold">New York</h4>
                  <p className="text-gray-600 text-sm">
                    Riggs Building Wall Street, New York, USA
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <MapPin className="mr-3 h-5 w-5 text-blue-600 mt-1" />
                <div>
                  <h4 className="font-semibold">Singapore</h4>
                  <p className="text-gray-600 text-sm">
                    789 Marina Bay, Singapore
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-bold mb-4">Send Us a Message</h3>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your name"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your email"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={4}
                  placeholder="Your message"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PromotionsCompanyPage;
