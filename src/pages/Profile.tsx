import { useState, useEffect } from "react";
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
import apiService from "../components/Api/apiService"; // Import the API service

// Define the structure of the profile data
interface ProfileData {
  fullName: string;
  address: string;
  dob: string;
  country: string;
  email: string;
  phone: string;
  new_first_name: string;
  new_last_name: string;
  new_phone_number: string;
  password: string;
}

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("Profile");
  const [formData, setFormData] = useState<ProfileData>({
    fullName: "",
    address: "",
    dob: "",
    country: "",
    email: "",
    phone: "",
    new_first_name: "",
    new_last_name: "",
    new_phone_number: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const sidebarItems = [
    { icon: User, path: "/profile", label: "Profile" },
    { icon: FileText, path: "/verify", label: "Financial Information" },
    { icon: FileText, path: "/verify", label: "Upload Documents" },
    { icon: Shield, path: "", label: "Settings & Security" },
    { icon: Scale, path: "/settings", label: "Legal" },
    { icon: LifeBuoy, path: "/support", label: "Support" },
  ];

  // Fetch profile data on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const profile = await apiService.getProfile();
        setFormData({
          fullName: profile.fullName || "",
          address: profile.address || "",
          dob: profile.dob || "",
          country: profile.country || "",
          email: profile.email || "",
          phone: profile.phone || "",
          new_first_name: profile.new_first_name || "",
          new_last_name: profile.new_last_name || "",
          new_phone_number: profile.new_phone_number || "",
          password: "",
        });
      } catch (err) {
        setError("Failed to fetch profile data.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // Prepare profile data for the API
      const profileData = {
        new_first_name: formData.new_first_name,
        new_last_name: formData.new_last_name,
        new_phone_number: formData.new_phone_number,
        password: formData.password,
      };

      // Request profile change
      await apiService.requestProfileChange(profileData);

      // Verify profile change (assuming OTP is handled separately)
      setSuccess("Profile update request sent. Check your email for OTP.");
    } catch (err) {
      setError("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleEmailChange = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // Request email change
      await apiService.requestEmailChange(formData.email);
      setSuccess("Email change request sent. Check your email for OTP.");
    } catch (err) {
      setError("Failed to request email change. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <DashboardNav />
      <div className="flex pt-20 min-h-screen bg-gray-50">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r">
          <div className="p-4 border-b">
            <div className="flex items-center space-x-2">
              <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center">
                {formData.fullName.charAt(0)}
              </div>
              <div>
                <div className="font-medium">
                  Welcome {formData.new_first_name}
                </div>
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
                key={item.label}
                to={item.path}
                className="flex items-center px-6 py-3 hover:bg-gray-100 transition-colors font-semibold"
              >
                <button
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
            {error && (
              <Alert className="mb-6">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {success && (
              <Alert className="mb-6">
                <AlertTitle>Success</AlertTitle>
                <AlertDescription>{success}</AlertDescription>
              </Alert>
            )}

            <Alert className="mb-6">
              <AlertTitle>Complete your financial profile</AlertTitle>
              <AlertDescription>
                This will help us ensure get all the available benefits and full
                accesss and that you're aware of the risks related to online
                trading, and that our products are suitable for you.
              </AlertDescription>
              <a href="/verify">
                <Button className="mt-4">Complete Form</Button>
              </a>
            </Alert>

            <form onSubmit={handleSubmit}>
              <Card className="mb-6">
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-4">
                    Personal Details
                  </h3>

                  <div className="space-y-4">
                    {/* <div>
                      <label className="block text-sm font-medium mb-1">
                        Full Name
                      </label>
                      <Input
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        disabled={loading}
                      />
                    </div> */}
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        First Name
                      </label>
                      <Input
                        name="new_first_name"
                        value={formData.new_first_name}
                        onChange={handleInputChange}
                        disabled={loading}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Last Name
                      </label>
                      <Input
                        name="new_last_name"
                        value={formData.new_last_name}
                        onChange={handleInputChange}
                        disabled={loading}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Email
                      </label>
                      <Input
                        name="email"
                        value={formData.email}
                        onChange={handleEmailChange}
                        disabled={loading}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Date of Birth
                      </label>
                      <Input
                        name="dob"
                        type="date"
                        value={formData.dob}
                        onChange={handleInputChange}
                        disabled={loading}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Country
                      </label>
                      <Input
                        name="country"
                        type="text"
                        value={formData.country}
                        onChange={handleInputChange}
                        disabled={loading}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Phone Number
                      </label>
                      <Input
                        name="new_phone_number"
                        type="number"
                        value={formData.new_phone_number}
                        onChange={handleInputChange}
                        disabled={loading}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Password
                      </label>
                      <Input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        disabled={loading}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="mt-6 flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="Button bg-blue-500 p-2 rounded-md text-white"
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
