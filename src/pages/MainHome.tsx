import DashboardNav from "../components/DashboardNav";
import MainFooter from "../components/Mainfooter";
import AccountOverview from "./AccountOverview";
import PromoSection from "./PromoSection";

const MainHome = () => {
  return (
    <div>
      <div>
        <DashboardNav />
      </div>
      <div><AccountOverview /> </div>
      <div><PromoSection /> </div>
      <div><MainFooter /> </div>
    </div>
  );
};

export default MainHome;
