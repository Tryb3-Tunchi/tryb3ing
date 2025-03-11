import  { useState } from "react";
import { Card, CardContent } from "../components/Card";
import { Button } from "../components/Card";
import {  Wallet, History, Gift,  } from "lucide-react";
import { Link } from "react-router-dom";
// import Footer from "../components/Footer";
import MainFooter from "../components/Mainfooter";

const ReferFriendPage = () => {
  const [selectedYear, setSelectedYear] = useState("2024");
  // const [activeTab, setActiveTab] = useState("history");

  const years = ["2019", "2020", "2021", "2022", "2023", "2024"];

  const monthlyData = [
    {
      month: "January",
      earned: "$250",
      successful: 5,
      pending: 2,
      expired: 1,
      ineligible: 0,
    },
    {
      month: "February",
      earned: "$180",
      successful: 3,
      pending: 1,
      expired: 0,
      ineligible: 1,
    },
    // Add more months as needed
  ];

  return (
    <>
      <div className="max-w-6xl mx-auto p-4">
        {/* Navigation */}
        <div className="flex items-center space-x-2 mb-6">
          <Link to="/home">
            <span className="text-gray-600">Home</span>
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-900">History</span>
        </div>

        <div className="grid md:grid-cols-4 pb-16 gap-6">
          {/* Left Sidebar */}
          <div className="md:col-span-1">
            <Card className="mb-4">
              <CardContent>
                <Link to="/account">
                  <Button className="w-full mb-4 flex items-center justify-center gap-2">
                    <Wallet size={18} />
                    Go to MyWallet
                  </Button>
                </Link>
                <ul className="space-y-2">
                  <li className="flex items-center text-blue-500 hover:text-blue-700 cursor-pointer">
                    <Gift size={18} className="mr-2" />
                    Invite a Friend
                  </li>
                  <li className="flex items-center text-blue-500 hover:text-blue-700 cursor-pointer">
                    <History size={18} className="mr-2" />
                    Referrals History
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3">
            <Card>
              <CardContent>
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-4">History</h2>
                  {/* Year Selector */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {years.map((year) => (
                      <button
                        key={year}
                        className={`${
                          selectedYear === year
                            ? "bg-blue-500 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                        onClick={() => setSelectedYear(year)}
                      >
                        {year}
                      </button>
                    ))}
                  </div>

                  {/* Status Filters */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {["Successful", "Pending", "Ineligible"].map((status) => (
                      <Button
                        key={status}
                        className="bg-gray-100 text-gray-700 hover:bg-gray-200"
                      >
                        {status}
                      </Button>
                    ))}
                  </div>

                  {/* Data Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4">Month</th>
                          <th className="text-left py-3 px-4">Money Earned</th>
                          <th className="text-left py-3 px-4">Successful</th>
                          <th className="text-left py-3 px-4">Pending</th>
                          <th className="text-left py-3 px-4">Expired</th>
                          <th className="text-left py-3 px-4">Ineligible</th>
                        </tr>
                      </thead>
                      <tbody>
                        {monthlyData.map((data, index) => (
                          <tr key={index} className="border-b hover:bg-gray-50">
                            <td className="py-3 px-4">{data.month}</td>
                            <td className="py-3 px-4">{data.earned}</td>
                            <td className="py-3 px-4">{data.successful}</td>
                            <td className="py-3 px-4">{data.pending}</td>
                            <td className="py-3 px-4">{data.expired}</td>
                            <td className="py-3 px-4">{data.ineligible}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <MainFooter />
    </>
  );
};

export default ReferFriendPage;
