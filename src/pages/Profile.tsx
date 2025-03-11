import { useState } from "react";
import {
  User,
  FileText,
  Shield,
  Scale,
  LifeBuoy,
  AlertCircle,
} from "lucide-react";
import { Card, CardContent, Input } from "../components/Card";
import { Button } from "../components/Card";
import { Alert, AlertTitle, AlertDescription } from "../components/Card";
import DashboardNav from "../components/DashboardNav";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("Profile");
  const [formData, setFormData] = useState({
    fullName: "josh leon",
    address: "20, 20 Fatai Atere Way, Lagos, Nigeria",
    dob: "1990-11-11",
    country: "Nigeria",
    email: "new4mails@exdonuts.com",
    phone: "+2347082227836",
  });

  const sidebarItems = [
    { icon: User, path: "/profile", label: "Profile" },
    { icon: FileText, path: "/verify", label: "Financial Information" },
    { icon: FileText, path: "/verify", label: "Upload Documents" },
    { icon: Shield, path: "", label: "Settings & Security" },
    { icon: Scale, path: "/settings", label: "Legal" },
    { icon: LifeBuoy, path: "/support", label: "Support" },
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <>
      {" "}
      <DashboardNav />
      <div className="flex pt-20 min-h-screen bg-gray-50">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r">
          <div className="p-4 border-b">
            <div className="flex items-center space-x-2">
              <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center">
                JL
              </div>
              <div>
                <div className="font-medium">{formData.fullName}</div>
                <div className="text-sm text-gray-500">{formData.email}</div>
                <div className="text-xs text-red-500 flex items-center">
                  <AlertCircle className="w-3 h-3 mr-1" />
                  Not verified
                </div>
              </div>
            </div>
          </div>

          <nav className="p-2">
            {sidebarItems.map((item) => (
              <Link
                //  key={item}
                to={item.path}
                className="flex items-center px-6 py-3 hover:bg-gray-100 transition-colors font-semibold"
              >
                <button
                  key={item.label}
                  onClick={() => setActiveTab(item.label)}
                  className={`w-full flex items-center space-x-2 px-4 py-2 rounded-lg text-left ${
                    activeTab === item.label
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              </Link>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="max-w-3xl mx-auto">
            <Alert className="mb-6">
              <AlertTitle>Complete your financial profile</AlertTitle>
              <AlertDescription>
                This will help us ensure you're aware of the risks related to
                online trading, and that our products are suitable for you.
              </AlertDescription>
              <Button className="mt-4">Complete Form</Button>
            </Alert>

            <form onSubmit={handleSubmit}>
              <Card className="mb-6">
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-4">
                    Personal Details
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Full Name
                      </label>
                      <Input
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Residential Address
                      </label>
                      <Input
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Date of Birth
                      </label>
                      <Input
                        type="date"
                        name="dob"
                        value={formData.dob}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Country
                      </label>
                      <Input
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-4">
                    Contact Information
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Email
                      </label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Phone
                      </label>
                      <Input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="mt-6 flex justify-end">
                <button type="submit">Save Changes</button>type
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
