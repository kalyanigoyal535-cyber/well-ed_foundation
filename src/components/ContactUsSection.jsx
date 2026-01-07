import React, { useState } from "react";

const ContactUsSection = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    organization: "",
    inquiryType: "",
    message: "",
    newsletter: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };const handleSubmit = async (e) => {
    e.preventDefault();
  
    const payload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      organization: formData.organization,
      inquiryType: formData.inquiryType,
      message: formData.message,
    };
  
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) {
        throw new Error("Failed to submit form");
      }
  
      const data = await response.json();
      console.log("Server response:", data);
  
      // ✅ RESET FORM AFTER SUCCESS
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        organization: "",
        inquiryType: "",
        message: "",
        newsletter: false,
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-5 md:p-5 lg:p-6 border border-gray-200">
      <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-3">
        <div className="w-10 h-10 sm:w-11 sm:h-11 bg-blue-900 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </div>
        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
          Send us a Message
        </h3>
      </div>

      <form
        className="space-y-2.5 sm:space-y-3 md:space-y-3"
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 md:gap-3">
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 sm:py-2.5 text-sm sm:text-base bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-800 focus:border-blue-900 transition-all duration-200"
            placeholder="John"
          />

          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 sm:py-2.5 text-sm sm:text-base bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-800 focus:border-blue-900 transition-all duration-200"
            placeholder="Doe"
          />
        </div>

        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-3 sm:px-3.5 py-2 sm:py-2.5 text-sm sm:text-base bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-800 focus:border-blue-900 transition-all duration-200"
          placeholder="john.doe@example.com"
        />

        <input
          type="tel"
          id="phone"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          className="w-full px-3 sm:px-3.5 py-2 sm:py-2.5 text-sm sm:text-base bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-800 focus:border-blue-900 transition-all duration-200"
          placeholder="+91-9876543210"
        />

        <input
          type="text"
          id="organization"
          name="organization"
          value={formData.organization}
          onChange={handleChange}
          className="w-full px-3 sm:px-3.5 py-2 sm:py-2.5 text-sm sm:text-base bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-800 focus:border-blue-900 transition-all duration-200"
          placeholder="Company Name (Optional)"
        />

        <select
          id="inquiryType"
          name="inquiryType"
          value={formData.inquiryType}
          onChange={handleChange}
          required
          className="w-full px-3 sm:px-3.5 py-2 sm:py-2.5 text-sm sm:text-base bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-800 focus:border-blue-900 transition-all duration-200"
        >
          <option value="">Select an option</option>
          <option value="partnership">Partnership Opportunities</option>
          <option value="volunteer">Volunteer Inquiry</option>
          <option value="donation">Donation & Funding</option>
          <option value="media">Media & Press</option>
          <option value="general">General Inquiry</option>
          <option value="program">Program Information</option>
          <option value="other">Other</option>
        </select>

        <textarea
          id="message"
          name="message"
          rows={3}
          value={formData.message}
          onChange={handleChange}
          required
          className="w-full px-3 sm:px-3.5 py-2 sm:py-2.5 text-sm sm:text-base bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-800 focus:border-blue-900 transition-all duration-200 resize-none"
          placeholder="Tell us how we can help you..."
        />

        <div className="flex items-start">
          <input
            type="checkbox"
            id="newsletter"
            name="newsletter"
            checked={formData.newsletter}
            onChange={handleChange}
            className="mt-0.5 w-4 h-4 sm:w-4 sm:h-4 text-blue-900 border-gray-300 rounded focus:ring-blue-800 flex-shrink-0"
          />
          <label
            htmlFor="newsletter"
            className="ml-2 sm:ml-2.5 text-xs sm:text-sm text-gray-600 leading-relaxed"
          >
            I would like to receive updates about Welled Foundation's programs
            and initiatives
          </label>
        </div>

        <button
          type="submit"
          className="w-full px-5 sm:px-6 py-2.5 sm:py-3 bg-blue-900 text-white text-sm sm:text-base font-semibold rounded-lg hover:bg-blue-800 transition-all duration-200 shadow-md hover:shadow-lg"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactUsSection;
