// import { useState } from 'react'
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Header";
import Home from "./pages/Home";
import SignInPage from "./components/login/sign";
import SignUpPage from "./components/login/signUp";
import MainHome from "./pages/MainHome";
import VerifyDetails from "./pages/verify";
import MyAccount from "./pages/MyAccount";
import FundingPage from "./pages/funding";
import CopyTradingSection from "./pages/CopyTrade";
import ReferFriendPage from "./pages/Refer";
import MarketDashboard from "./pages/Market";
import ProfilePage from "./pages/Profile";
import AdminDashboard from "./pages/Admin/AdminPages";
import LoginModal from "./components/login/AuthLogin";
import Withdrawal from "./pages/Withdrawal";

function App() {
  return (
    <>
      <div className="bg- text-w">
        <Navbar />
        {/* <Footer /> */}
        {/* <Router> */}
        <Routes>
          <Route index element={<Home />} />
          <Route path="signin" element={<SignInPage />} />
          <Route path="signUp" element={<SignUpPage />} />
          <Route path="home" element={<MainHome />} />
          <Route path="verify" element={<VerifyDetails />} />
          <Route path="account" element={<MyAccount />} />
          <Route path="funding" element={<FundingPage />} />
          <Route path="withdraw" element={<Withdrawal />} />
          <Route path="trade" element={<CopyTradingSection />} />
          <Route path="Refer-friend" element={<ReferFriendPage />} />
          <Route path="market" element={<MarketDashboard />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="admin" element={<AdminDashboard />} />
          <Route
            path="login"
            element={<LoginModal isOpen={true} onClose={() => {}} />}
          />
        </Routes>
        {/* </Router> */}
      </div>
    </>
  );
}

export default App;
