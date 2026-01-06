import React from "react";
import ContactUsSection from "./ContactUsSection";

const SendUsMessage = () => {
  return (
    <section
      id="contact"
      className="py-8 sm:py-10 md:py-12 lg:py-16 bg-gray-50 relative w-full"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6 sm:mb-8 md:mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-2 md:mb-3">
            Get in Touch
          </h2>
          <div className="w-16 sm:w-20 h-0.5 bg-blue-900 mx-auto rounded-full mb-2"></div>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
            Have a question, want to partner with us, or need more information?
            We'd love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
        
    <ContactUsSection/>
          <div className="space-y-3 sm:space-y-4 md:space-y-5">
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-5 md:p-6 lg:p-7 border border-gray-200">
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-900 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
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
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
                  Contact Information
                </h3>
              </div>

              <div className="space-y-3 sm:space-y-4 md:space-y-4">
                <div className="flex items-start p-3 sm:p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-blue-900 rounded-lg flex items-center justify-center">
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
                  <div className="ml-3 sm:ml-4">
                    <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-1">
                      Email
                    </h4>
                    <a
                      href="https://mail.google.com/mail/?view=cm&to=welledfoundation@gmail.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-900 hover:text-blue-800 transition-colors font-medium block text-sm sm:text-base break-words"
                    >
                      welledfoundation@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start p-3 sm:p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-blue-900 rounded-lg flex items-center justify-center">
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
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div className="ml-3 sm:ml-4">
                    <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-1">
                      Phone
                    </h4>
                    <a
                      href="tel:+9118001234567"
                      className="text-blue-900 hover:text-blue-800 transition-colors font-medium block mb-1 text-sm sm:text-base"
                    >
                      +91-1800-123-4567
                    </a>
                    <a
                      href="tel:+919876543210"
                      className="text-blue-900 hover:text-blue-800 transition-colors font-medium text-sm sm:text-base"
                    >
                      +91-98765-43210
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-900 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 lg:p-7 text-white shadow-lg">
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
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
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold">
                  Quick Links
                </h3>
              </div>
              <ul className="space-y-1 sm:space-y-1.5">
                <li>
                  <a
                    href="#about"
                    className="flex items-center p-2.5 sm:p-3 rounded-lg hover:bg-white/10 transition-colors duration-200"
                  >
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                    <span className="font-medium text-sm sm:text-base">
                      About Us
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="#work"
                    className="flex items-center p-2.5 sm:p-3 rounded-lg hover:bg-white/10 transition-colors duration-200"
                  >
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                    <span className="font-medium text-sm sm:text-base">
                      Our Programs
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="flex items-center p-2.5 sm:p-3 rounded-lg hover:bg-white/10 transition-colors duration-200"
                  >
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                    <span className="font-medium text-sm sm:text-base">
                      Get Involved
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="#impact"
                    className="flex items-center p-2.5 sm:p-3 rounded-lg hover:bg-white/10 transition-colors duration-200"
                  >
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                    <span className="font-medium text-sm sm:text-base">
                      Our Impact
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SendUsMessage;
