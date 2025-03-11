import React, { useState, ChangeEvent, FormEvent } from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DashboardNav from "../components/DashboardNav";

interface FormData {
  fullName: string;
  dateOfBirth: string;
  phoneNumber: string;
  address: string;
  country: string;
  postalCode: string;
  passport: File | null;
  idCard: File | null;
  uniqueNumber: string;
  email: string;
  gender: string;
  nationality: string;
  city: string;
  depositMethod: string;
  bankName: string;
  accountNumber: string;
  cryptoWallet: string;
}

const VerifyDetails: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    dateOfBirth: "",
    phoneNumber: "",
    address: "",
    country: "",
    postalCode: "",
    passport: null,
    idCard: null,
    uniqueNumber: "",
    email: "",
    gender: "",
    nationality: "",
    city: "",
    depositMethod: "",
    bankName: "",
    accountNumber: "",
    cryptoWallet: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const totalSteps = 6; // Increment total steps to include the new step

  // Handle input changes
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle file changes
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData((prevData) => ({ ...prevData, [name]: files[0] }));
    }
  };

  // Render errors
  const renderError = (field: keyof FormData) =>
    errors[field] && (
      <div className="text-red-500 text-sm">{errors[field]}</div>
    );

  // Validate the current step
  const validateCurrentStep = (): boolean => {
    const validationErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.fullName)
        validationErrors.fullName = "Full Name is required.";
      if (!formData.dateOfBirth)
        validationErrors.dateOfBirth = "Date of Birth is required.";
      if (!formData.phoneNumber)
        validationErrors.phoneNumber = "Phone Number is required.";
      if (!formData.email) validationErrors.email = "Email is required.";
    } else if (step === 2) {
      if (!formData.address) validationErrors.address = "Address is required.";
      if (!formData.country) validationErrors.country = "Country is required.";
      if (!formData.city) validationErrors.city = "City is required.";
      if (!formData.postalCode)
        validationErrors.postalCode = "Postal Code is required.";
    } else if (step === 3) {
      if (!formData.gender) validationErrors.gender = "Gender is required.";
      if (!formData.nationality)
        validationErrors.nationality = "Nationality is required.";
    } else if (step === 4) {
      if (!formData.depositMethod)
        validationErrors.depositMethod = "Deposit method is required.";
      if (formData.depositMethod === "Bank" && !formData.bankName)
        validationErrors.bankName = "Bank Name is required.";
      if (formData.depositMethod === "Bank" && !formData.accountNumber)
        validationErrors.accountNumber = "Account Number is required.";
      if (formData.depositMethod === "Crypto" && !formData.cryptoWallet)
        validationErrors.cryptoWallet = "Crypto Wallet is required.";
    } else if (step === 5) {
      if (!formData.passport)
        validationErrors.passport = "Passport photo is required.";
      if (!formData.idCard) validationErrors.idCard = "ID card is required.";
      if (!formData.uniqueNumber)
        validationErrors.uniqueNumber = "SSN/Unique Number is required.";
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  // Handle "Next" button click
  const handleNext = () => {
    if (validateCurrentStep()) {
      setStep((prevStep) => prevStep + 1);
    }
  };

  // Handle "Previous" button click
  const handlePrevious = () => {
    setStep((prevStep) => prevStep - 1);
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (validateCurrentStep()) {
      setShowModal(true);
      // setTimeout(() => {
      //   // Show the modal first
      //   navigate("/home");
      // }, 3000);

      try {
        const formDataToSend = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
          if (value !== null) {
            formDataToSend.append(key, value as string | Blob);
          }
        });

        const response = await fetch("https://example.com/api/submit", {
          method: "POST",
          body: formDataToSend,
        });

        if (response.ok) {
          alert("Form submitted successfully!");
          setStep(1);
        } else {
          alert("Failed to submit the form. Please try again.");
        }
      } catch (error) {
        console.log("An error occurred while submitting the form.:", error);
      }
    }
  };

  return (
    <>
    <DashboardNav />
    <div className="container mt-20 mx-auto p-6">
      <form onSubmit={handleSubmit}>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Personal Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg"
                  />
                  {renderError("fullName")}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg"
                  />
                  {renderError("dateOfBirth")}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg"
                  />
                  {renderError("phoneNumber")}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg"
                  />
                  {renderError("email")}
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Address Details</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg"
                  />
                  {renderError("address")}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Country
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg"
                  />
                  {renderError("country")}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg"
                  />
                  {renderError("city")}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg"
                  />
                  {renderError("postalCode")}
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">
                Demographic Information
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  {renderError("gender")}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Nationality
                  </label>
                  <input
                    type="text"
                    name="nationality"
                    value={formData.nationality}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg"
                  />
                  {renderError("nationality")}
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Account Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Deposit Method
                  </label>
                  <select
                    name="depositMethod"
                    value={formData.depositMethod}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg"
                  >
                    <option value="">Select Deposit Method</option>
                    <option value="Bank">Bank</option>
                    <option value="Crypto">Crypto</option>
                    <option value="Card">Card</option>
                    <option value="NFT">NFT</option>
                  </select>
                  {renderError("depositMethod")}
                </div>
                {formData.depositMethod === "Bank" && (
                  <>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Bank Name
                      </label>
                      <input
                        type="text"
                        name="bankName"
                        value={formData.bankName}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded-lg"
                      />
                      {renderError("bankName")}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Account Number
                      </label>
                      <input
                        type="text"
                        name="accountNumber"
                        value={formData.accountNumber}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded-lg"
                      />
                      {renderError("accountNumber")}
                    </div>
                  </>
                )}
                {formData.depositMethod === "Crypto" && (
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Crypto Wallet
                    </label>
                    <input
                      type="text"
                      name="cryptoWallet"
                      value={formData.cryptoWallet}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-lg"
                    />
                    {renderError("cryptoWallet")}
                  </div>
                )}
              </div>
            </div>
          )}

          {step === 5 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Identity Verification</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Passport Photo
                  </label>
                  <input
                    type="file"
                    name="passport"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full p-2 border rounded-lg"
                  />
                  {renderError("passport")}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    ID Card
                  </label>
                  <input
                    type="file"
                    name="idCard"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full p-2 border rounded-lg"
                  />
                  {renderError("idCard")}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    SSN/Unique Number
                  </label>
                  <input
                    type="text"
                    name="uniqueNumber"
                    value={formData.uniqueNumber}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg"
                  />
                  {renderError("uniqueNumber")}
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between mt-6">
            {step > 1 && (
              <button
                type="button"
                onClick={handlePrevious}
                className="py-2 px-4 bg-gray-300 text-gray-800 rounded-lg"
              >
                <ArrowLeft className="mr-2" />
              </button>
            )}

            {step < totalSteps ? (
              <button
                type="button"
                onClick={handleNext}
                className="py-2 px-4 bg-blue-600 text-white rounded-lg"
              >
                Next
                <ArrowRight className="ml-2" />
              </button>
            ) : (
              <button
                type="submit"
                className="py-2 px-4 bg-green-600 text-white rounded-lg"
              >
                Submit
                <Check className="ml-2" />
              </button>
            )}
          </div>
        </div>
      </form>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-bold mb-4">Submitted!</h2>
            <p>Verification in progress. Please wait for further updates.</p>
            <button
            
              onClick={() => navigate("/home")}
              className="mt-4 py-2 px-4 bg-blue-600 text-white rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default VerifyDetails;
