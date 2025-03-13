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
import ProtectedRoute from "./auth/ProtectAuth";

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
          <Route path="signup" element={<SignUpPage />} />
          <Route
            path="home"
            element={
              <ProtectedRoute>
                <MainHome />
              </ProtectedRoute>
            }
          />

          <Route
            path="verify"
            element={
              <ProtectedRoute>
                <VerifyDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="account"
            element={
              <ProtectedRoute>
                <MyAccount />
              </ProtectedRoute>
            }
          />
          <Route
            path="funding"
            element={
              <ProtectedRoute>
                <FundingPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="withdraw"
            element={
              <ProtectedRoute>
                <Withdrawal />
              </ProtectedRoute>
            }
          />
          <Route
            path="trade"
            element={
              <ProtectedRoute>
                <CopyTradingSection />
              </ProtectedRoute>
            }
          />
          <Route
            path="Refer-friend"
            element={
              <ProtectedRoute>
                <ReferFriendPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="market"
            element={
              <ProtectedRoute>
                <MarketDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

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
