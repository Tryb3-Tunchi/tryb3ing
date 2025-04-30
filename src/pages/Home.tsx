import Footer from "../components/Footer";
// import Navbar from "../components/Header";
import ResultsSection from "./Article";
import Cards from "./Cards";
import Overview from "./overview";
import TradingViewSection from "../components/TradingViewSection";
import TestimonialSection from "../components/TestimonialSection";
import PricingSection from "../components/PricingSection";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <Overview />

      {/* Trading View Section */}
      <div className="py-12 bg-white">
        <TradingViewSection />
      </div>

      {/* Pricing Section */}
      <div className="py-12 bg-gray-50">
        <PricingSection />
      </div>

      {/* Cards Section */}
      <div className="py-12 bg-white">
        <Cards />
      </div>

      {/* Testimonials Section */}
      <div className="py-12 bg-gray-50">
        <TestimonialSection />
      </div>

      {/* Results Section */}
      <div className="py-12 bg-white">
        <ResultsSection />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
