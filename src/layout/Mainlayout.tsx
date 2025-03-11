import { Outlet } from "react-router-dom";
import Navbar from "../components/Header";
import Footer from "../components/Footer";

const Mainlayout = () => {
  return (
    <div>
      <div className="flex flex-col">
        <Navbar />
      </div>
      <div>
        <Outlet />
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Mainlayout;
