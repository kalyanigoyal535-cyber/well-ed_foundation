import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import AOS from 'aos'
import Navigation from '../components/Navigation'

function Donate() {
  const location = useLocation()
  const [activeTab, setActiveTab] = useState('general')
  const [donationAmount, setDonationAmount] = useState('')
  const [customAmount, setCustomAmount] = useState('')
  const [donorType, setDonorType] = useState('indian')
  const [formData, setFormData] = useState({
    title: 'Mr',
    name: '',
    email: '',
    dob: '',
    mobile: '',
    whatsapp: false,
    alternateMobile: '',
    pan: '',
    address: '',
    pincode: '',
    city: '',
    state: '',
    province: '',
    preferenceState: '',
    want80G: true,
    honorName: '',
    honorOccasion: '',
    honorDate: '',
    memoryName: '',
    occasionType: '',
    occasionDate: '',
    companyName: '',
    companyType: '',
    gstin: '',
    schoolName: '',
    schoolLocation: '',
    equipmentType: '',
    equipmentDetails: ''
  })

  useEffect(() => {
    // Scroll to top when page loads or route changes
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    // Refresh AOS on scroll for better performance
    AOS.refresh()
  }, [location.pathname])

  const presetAmounts = [
    { amount: 4500, label: '₹ 4,500', children: 1 },
    { amount: 9000, label: '₹ 9,000', children: 2 },
    { amount: 13500, label: '₹ 13,500', children: 3 },
    { amount: 18000, label: '₹ 18,000', children: 4 },
    { amount: 24000, label: '₹ 24,000', children: 5 },
    { amount: 30000, label: '₹ 30,000', children: 6 },
    { amount: 37500, label: '₹ 37,500', children: 7 },
    { amount: 45000, label: '₹ 45,000', children: 8 },
    { amount: 60000, label: '₹ 60,000', children: 10 },
    { amount: 75000, label: '₹ 75,000', children: 12 },
    { amount: 90000, label: '₹ 90,000', children: 15 },
    { amount: 105000, label: '₹ 1,05,000', children: 17 },
    { amount: 150000, label: '₹ 1,50,000', children: 25 },
    { amount: 201000, label: '₹ 2,01,000', children: 33 }
  ]

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleAmountSelect = (amount) => {
    setDonationAmount(amount)
    setCustomAmount('')
  }

  const calculateChildren = (amount) => {
    return Math.floor(amount / 4500)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Payment gateway integration will go here
    alert('Thank you for your donation! You will be redirected to the payment gateway.')
    // Redirect to payment gateway
  }

  const donationTabs = [
    { id: 'general', label: 'General Donation', icon: '💝' },
    { id: 'honor', label: 'Donate in Honor', icon: '🎖️' },
    { id: 'memory', label: 'Donate in Memory', icon: '🕊️' },
    { id: 'occasion', label: 'Special Occasion', icon: '🎉' },
    { id: 'sme', label: 'SME Donations', icon: '🏢' },
    { id: 'school', label: 'Sponsor a School', icon: '🏫' },
    { id: 'equipment', label: 'Kitchen Equipment', icon: '🍳' }
  ]

      return (
        <div className="min-h-screen bg-gray-50 overflow-x-hidden">
          <Navigation />
          <section className="py-24 bg-gray-50 min-h-screen pt-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center mb-8 sm:mb-12 px-2" data-aos="fade-up">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-extrabold text-gray-900 mb-3 sm:mb-4 px-2">
              Make a Difference Today
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-2">
              Your contribution helps us feed, educate, and empower communities in need.
            </p>
          </div>

          {/* Donation Type Tabs */}
          <div className="mb-8 overflow-x-auto" data-aos="fade-up" data-aos-delay="100">
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6 min-w-max sm:min-w-0">
              {donationTabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold text-xs sm:text-base transition-all duration-300 transform hover:scale-105 whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg shadow-green-200 scale-105'
                      : 'bg-white text-gray-700 hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 border-2 border-gray-200 hover:border-green-300 shadow-sm hover:shadow-md'
                  }`}
                >
                  <span className="mr-1 sm:mr-2 text-sm sm:text-lg">{tab.icon}</span>
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 items-start">
            {/* Left Column - Donation Amount */}
            <div className="lg:col-span-2 w-full" data-aos="fade-right">
              <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg border border-gray-100 p-4 sm:p-6 md:p-8 mb-6 w-full">
                <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                  <div className="w-1 h-8 sm:h-10 bg-gradient-to-b from-green-500 to-green-600 rounded-full flex-shrink-0"></div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 break-words">Choose Donation Amount</h3>
                </div>
                
                {/* Preset Amounts */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 md:gap-4 mb-6">
                  {presetAmounts.map((preset, index) => (
                    <button
                      key={index}
                      onClick={() => handleAmountSelect(preset.amount)}
                      className={`p-3 sm:p-4 md:p-5 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 w-full ${
                        donationAmount === preset.amount
                          ? 'border-green-500 bg-gradient-to-br from-green-50 to-green-100 text-green-700 font-bold shadow-md shadow-green-200'
                          : 'border-gray-200 bg-white hover:border-green-400 hover:bg-green-50 hover:shadow-md'
                      }`}
                    >
                      <div className="text-sm sm:text-base md:text-xl font-bold mb-1 break-words">{preset.label}</div>
                      <div className="text-xs text-gray-500 font-medium">{preset.children} child(ren)</div>
                    </button>
                  ))}
                </div>

                {/* Custom Amount */}
                <div className="mb-6 w-full">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Or Enter Custom Amount <span className="text-gray-400 font-normal text-xs">(Min ₹500)</span>
                  </label>
                  <div className="relative w-full">
                    <span className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-semibold text-sm sm:text-base">₹</span>
                    <input
                      type="number"
                      value={customAmount}
                      onChange={(e) => {
                        setCustomAmount(e.target.value)
                        setDonationAmount('')
                      }}
                      min="500"
                      placeholder="Enter amount"
                      className="w-full pl-8 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3.5 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 shadow-sm hover:shadow-md text-sm sm:text-base"
                    />
                  </div>
                  {customAmount && (
                    <p className="mt-3 text-xs sm:text-sm text-gray-600 bg-blue-50 px-3 sm:px-4 py-2 rounded-lg border border-blue-100 break-words">
                      <span className="font-semibold text-blue-700">Impact:</span> This will feed {calculateChildren(parseInt(customAmount) || 0)} child(ren) for one academic year
                    </p>
                  )}
                </div>

                {/* Current Selection */}
                {(donationAmount || customAmount) && (
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 rounded-xl p-4 sm:p-5 mb-6 shadow-sm w-full">
                    <div className="flex items-center gap-2 mb-2">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-base sm:text-lg font-bold text-green-800 break-words">
                        Selected Amount: ₹ {donationAmount || customAmount}
                      </p>
                    </div>
                    <p className="text-xs sm:text-sm text-green-700 ml-6 sm:ml-7 break-words">
                      Will feed {calculateChildren(parseInt(donationAmount || customAmount) || 0)} child(ren) for one academic year
                    </p>
                  </div>
                )}

                {/* Donation Type Specific Content */}
                {activeTab === 'honor' && (
                  <div className="mb-6 p-6 bg-blue-50 rounded-xl border-2 border-blue-200">
                    <h4 className="text-xl font-bold text-gray-900 mb-4">Donate in Honor</h4>
                    <p className="text-gray-700 mb-4">
                      Celebrating someone who inspires you is more meaningful when your gesture creates lasting impact. 
                      By donating in their honour, you not only express your gratitude and admiration but also help nourish children with healthy meals.
                    </p>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          In Honor Of <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="honorName"
                          value={formData.honorName}
                          onChange={handleInputChange}
                          placeholder="Name of the person you want to honor"
                          className="w-full px-4 py-3.5 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 shadow-sm hover:shadow-md"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Occasion (Optional)
                        </label>
                        <input
                          type="text"
                          name="honorOccasion"
                          value={formData.honorOccasion}
                          onChange={handleInputChange}
                          placeholder="e.g., Birthday, Anniversary"
                          className="w-full px-4 py-3.5 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 shadow-sm hover:shadow-md"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Date
                        </label>
                        <input
                          type="date"
                          name="honorDate"
                          value={formData.honorDate}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3.5 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 shadow-sm hover:shadow-md"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'memory' && (
                  <div className="mb-6 p-4 sm:p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border-l-4 border-purple-500 shadow-md w-full">
                    <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </div>
                      <h4 className="text-lg sm:text-xl font-bold text-gray-900 break-words">Donate in Memory</h4>
                    </div>
                    <p className="text-sm sm:text-base text-gray-700 mb-4 leading-relaxed break-words">
                      Honor the memory of a loved one by making a meaningful contribution that will help feed and educate children in need.
                    </p>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        In Memory Of <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="memoryName"
                        value={formData.memoryName}
                        onChange={handleInputChange}
                        placeholder="Name of the person you want to remember"
                        className="w-full px-4 py-3.5 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 shadow-sm hover:shadow-md"
                        required
                      />
                    </div>
                  </div>
                )}

                {activeTab === 'occasion' && (
                  <div className="mb-6 p-4 sm:p-6 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl border-l-4 border-yellow-500 shadow-md w-full">
                    <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-yellow-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                        </svg>
                      </div>
                      <h4 className="text-lg sm:text-xl font-bold text-gray-900 break-words">Donate for Special Occasion</h4>
                    </div>
                    <p className="text-sm sm:text-base text-gray-700 mb-4 leading-relaxed break-words">
                      Celebrate your special moments by making a difference in the lives of children.
                    </p>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Occasion Type <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="occasionType"
                          value={formData.occasionType}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3.5 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 shadow-sm hover:shadow-md appearance-none cursor-pointer"
                          required
                        >
                          <option value="">Select Occasion</option>
                          <option value="birthday">Birthday</option>
                          <option value="anniversary">Anniversary</option>
                          <option value="wedding">Wedding</option>
                          <option value="festival">Festival</option>
                          <option value="achievement">Achievement</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Occasion Date
                        </label>
                        <input
                          type="date"
                          name="occasionDate"
                          value={formData.occasionDate}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3.5 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 shadow-sm hover:shadow-md"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'sme' && (
                  <div className="mb-6 p-4 sm:p-6 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl border-l-4 border-indigo-500 shadow-md w-full">
                    <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-indigo-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                      <h4 className="text-lg sm:text-xl font-bold text-gray-900 break-words">SME Donations</h4>
                    </div>
                    <p className="text-sm sm:text-base text-gray-700 mb-4 leading-relaxed break-words">
                      Small and Medium Enterprises can make a significant impact through corporate donations. 
                      Your contribution helps us reach more communities and create lasting change.
                    </p>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Company Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="companyName"
                          value={formData.companyName}
                          onChange={handleInputChange}
                          placeholder="Your company name"
                          className="w-full px-4 py-3.5 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 shadow-sm hover:shadow-md"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Company Type
                        </label>
                        <select
                          name="companyType"
                          value={formData.companyType}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3.5 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 shadow-sm hover:shadow-md appearance-none cursor-pointer"
                        >
                          <option value="">Select Type</option>
                          <option value="private">Private Limited</option>
                          <option value="llp">LLP</option>
                          <option value="partnership">Partnership</option>
                          <option value="proprietorship">Proprietorship</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          GSTIN (if applicable)
                        </label>
                        <input
                          type="text"
                          name="gstin"
                          value={formData.gstin}
                          onChange={handleInputChange}
                          placeholder="GSTIN Number"
                          className="w-full px-4 py-3.5 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 shadow-sm hover:shadow-md"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'school' && (
                  <div className="mb-6 p-4 sm:p-6 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl border-l-4 border-teal-500 shadow-md w-full">
                    <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-teal-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      </div>
                      <h4 className="text-lg sm:text-xl font-bold text-gray-900 break-words">Sponsor a School for a Year</h4>
                    </div>
                    <p className="text-sm sm:text-base text-gray-700 mb-4 leading-relaxed break-words">
                      Sponsor an entire school for one academic year. Your contribution will provide meals, 
                      educational support, and resources to all children in the school.
                    </p>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          School Name (Optional - we can assign one)
                        </label>
                        <input
                          type="text"
                          name="schoolName"
                          value={formData.schoolName}
                          onChange={handleInputChange}
                          placeholder="Preferred school name or leave blank"
                          className="w-full px-4 py-3.5 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 shadow-sm hover:shadow-md"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Preferred Location
                        </label>
                        <input
                          type="text"
                          name="schoolLocation"
                          value={formData.schoolLocation}
                          onChange={handleInputChange}
                          placeholder="State or City preference"
                          className="w-full px-4 py-3.5 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 shadow-sm hover:shadow-md"
                        />
                      </div>
                      <div className="bg-gradient-to-r from-blue-100 to-indigo-100 p-3 sm:p-4 rounded-lg border-l-4 border-blue-500">
                        <p className="text-xs sm:text-sm text-blue-800 leading-relaxed break-words">
                          <strong className="font-bold">Note:</strong> Sponsoring a school typically costs ₹2,00,000 - ₹5,00,000 per year 
                          depending on the number of students. You can specify your preferred amount above.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'equipment' && (
                  <div className="mb-6 p-4 sm:p-6 bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl border-l-4 border-orange-500 shadow-md w-full">
                    <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                      </div>
                      <h4 className="text-lg sm:text-xl font-bold text-gray-900 break-words">Kitchen Equipment Donation</h4>
                    </div>
                    <p className="text-sm sm:text-base text-gray-700 mb-4 leading-relaxed break-words">
                      Help us equip our kitchens with essential equipment to prepare nutritious meals for children.
                    </p>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Equipment Type
                        </label>
                        <select
                          name="equipmentType"
                          value={formData.equipmentType}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3.5 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 shadow-sm hover:shadow-md appearance-none cursor-pointer"
                        >
                          <option value="">Select Equipment</option>
                          <option value="cooking">Cooking Equipment</option>
                          <option value="storage">Storage Equipment</option>
                          <option value="serving">Serving Equipment</option>
                          <option value="safety">Safety Equipment</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Equipment Details (Optional)
                        </label>
                        <textarea
                          name="equipmentDetails"
                          value={formData.equipmentDetails}
                          onChange={handleInputChange}
                          placeholder="Specify equipment details or leave blank for general donation"
                          rows="3"
                          className="w-full px-4 py-3.5 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 shadow-sm hover:shadow-md resize-none"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Donor Information Form */}
            <div className="lg:col-span-1 w-full" data-aos="fade-left">
              <div className="bg-gradient-to-br from-white via-gray-50 to-white rounded-2xl shadow-xl border border-gray-100 p-4 sm:p-6 md:p-8 sticky top-24 w-full">
                <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-gray-200">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 break-words">Donor Details</h3>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Citizenship */}
                  <div className="bg-gray-50 p-3 sm:p-4 rounded-xl border border-gray-200 w-full">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Select Your Citizenship <span className="text-red-500">*</span>
                    </label>
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full">
                      <label className="flex items-center cursor-pointer p-2 sm:p-3 bg-white rounded-lg border-2 border-gray-200 hover:border-green-400 transition-colors flex-1 w-full">
                        <input
                          type="radio"
                          name="citizenship"
                          value="indian"
                          checked={donorType === 'indian'}
                          onChange={() => setDonorType('indian')}
                          className="mr-2 sm:mr-3 w-4 h-4 text-green-600 focus:ring-green-500 flex-shrink-0"
                        />
                        <span className="text-xs sm:text-sm font-medium text-gray-700 break-words">Indian Citizen</span>
                      </label>
                      <label className="flex items-center cursor-pointer p-2 sm:p-3 bg-white rounded-lg border-2 border-gray-200 hover:border-green-400 transition-colors flex-1 w-full">
                        <input
                          type="radio"
                          name="citizenship"
                          value="foreign"
                          checked={donorType === 'foreign'}
                          onChange={() => setDonorType('foreign')}
                          className="mr-2 sm:mr-3 w-4 h-4 text-green-600 focus:ring-green-500 flex-shrink-0"
                        />
                        <span className="text-xs sm:text-sm font-medium text-gray-700 break-words">Foreign National</span>
                      </label>
                    </div>
                  </div>

                  {/* Title */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Title <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3.5 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 shadow-sm hover:shadow-md appearance-none cursor-pointer"
                      required
                    >
                      <option value="Mr">Mr</option>
                      <option value="Mrs">Mrs</option>
                      <option value="Ms">Ms</option>
                      <option value="M/S">M/S</option>
                    </select>
                  </div>

                  {/* Name */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3.5 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 shadow-sm hover:shadow-md"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3.5 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 shadow-sm hover:shadow-md"
                    />
                  </div>

                  {/* Date of Birth */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      name="dob"
                      value={formData.dob}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3.5 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 shadow-sm hover:shadow-md"
                    />
                  </div>

                  {/* Mobile */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Mobile No <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3.5 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 shadow-sm hover:shadow-md"
                    />
                  </div>

                  {/* WhatsApp */}
                  <div className="bg-blue-50 p-3 sm:p-4 rounded-xl border border-blue-100 w-full">
                    <label className="flex items-start cursor-pointer">
                      <input
                        type="checkbox"
                        name="whatsapp"
                        checked={formData.whatsapp || false}
                        onChange={handleInputChange}
                        className="mt-1 mr-2 sm:mr-3 w-4 sm:w-5 h-4 sm:h-5 text-green-600 border-gray-300 rounded focus:ring-green-500 flex-shrink-0"
                      />
                      <span className="text-xs sm:text-sm text-gray-700 flex-1 font-medium break-words">
                        Please share your WhatsApp number for donation updates
                      </span>
                    </label>
                    {formData.whatsapp && (
                      <p className="text-xs text-blue-600 mt-2 ml-6 sm:ml-8 font-medium break-words">
                        ✓ Your mobile number will be used for WhatsApp updates
                      </p>
                    )}
                  </div>

                  {/* Alternate Mobile */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Alternate Mobile No
                    </label>
                    <input
                      type="tel"
                      name="alternateMobile"
                      value={formData.alternateMobile}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3.5 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 shadow-sm hover:shadow-md"
                    />
                  </div>

                  {/* 80G Certificate */}
                  <div className="bg-green-50 p-3 sm:p-4 rounded-xl border border-green-100 w-full">
                    <label className="flex items-start cursor-pointer">
                      <input
                        type="checkbox"
                        name="want80G"
                        checked={formData.want80G}
                        onChange={handleInputChange}
                        className="mt-1 mr-2 sm:mr-3 w-4 sm:w-5 h-4 sm:h-5 text-green-600 border-gray-300 rounded focus:ring-green-500 flex-shrink-0"
                      />
                      <span className="text-xs sm:text-sm text-gray-700 flex-1 font-medium break-words">
                        I would like to receive 80(G) Certificate
                      </span>
                    </label>
                  </div>

                  {/* PAN Number */}
                  {formData.want80G && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        PAN Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="pan"
                        value={formData.pan}
                        onChange={handleInputChange}
                        required={formData.want80G}
                        maxLength="10"
                        className="w-full px-4 py-3.5 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 shadow-sm hover:shadow-md uppercase"
                      />
                    </div>
                  )}

                  {/* Address */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Address <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      rows="3"
                      className="w-full px-4 py-3.5 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 shadow-sm hover:shadow-md resize-none"
                    />
                  </div>

                  {/* Pin Code */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Pin Code <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      required
                      maxLength="6"
                      className="w-full px-4 py-3.5 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 shadow-sm hover:shadow-md"
                    />
                  </div>

                  {/* City */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      City <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3.5 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 shadow-sm hover:shadow-md"
                    />
                  </div>

                  {/* State */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      State <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3.5 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 shadow-sm hover:shadow-md"
                    />
                  </div>

                  {/* Preference State */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Preference State <span className="text-gray-400 font-normal text-xs">(Where you want your donation to be used)</span>
                    </label>
                    <select
                      name="preferenceState"
                      value={formData.preferenceState}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3.5 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 shadow-sm hover:shadow-md appearance-none cursor-pointer"
                    >
                      <option value="">Anywhere</option>
                      <option value="andhra-pradesh">Andhra Pradesh</option>
                      <option value="assam">Assam</option>
                      <option value="chhattisgarh">Chhattisgarh</option>
                      <option value="gujarat">Gujarat</option>
                      <option value="karnataka">Karnataka</option>
                      <option value="maharashtra">Maharashtra</option>
                      <option value="odisha">Odisha</option>
                      <option value="rajasthan">Rajasthan</option>
                      <option value="tamil-nadu">Tamil Nadu</option>
                      <option value="telangana">Telangana</option>
                      <option value="uttar-pradesh">Uttar Pradesh</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {/* Terms and Conditions */}
                  <div className="pt-2 bg-gray-50 p-3 sm:p-4 rounded-xl border border-gray-200 w-full">
                    <label className="flex items-start cursor-pointer">
                      <input
                        type="checkbox"
                        required
                        className="mt-1 mr-2 sm:mr-3 w-4 sm:w-5 h-4 sm:h-5 text-green-600 border-gray-300 rounded focus:ring-green-500 flex-shrink-0"
                      />
                      <span className="text-xs sm:text-sm text-gray-700 flex-1 leading-relaxed break-words">
                        I have read through the website's <a href="#" className="text-green-600 hover:underline font-semibold">Privacy Policy</a> & <a href="#" className="text-green-600 hover:underline font-semibold">Terms and Conditions</a> to make a donation.
                      </span>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={!donationAmount && !customAmount}
                    className="w-full px-8 py-4 bg-gradient-to-r from-green-600 to-green-700 text-white font-bold rounded-xl hover:from-green-700 hover:to-green-800 hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      Donate Now
                    </span>
                  </button>

                  {/* Tax Exemption Info */}
                  <div className="text-center pt-4">
                    <div className="inline-flex items-center gap-2 bg-green-50 px-4 py-2 rounded-lg border border-green-200">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-sm text-green-700 font-semibold">
                        Avail tax exemption under Section 80G
                      </p>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

              {/* Additional Information */}
              <div className="mt-8 sm:mt-12 bg-white rounded-2xl sm:rounded-3xl shadow-xl p-4 sm:p-6 md:p-8 w-full" data-aos="fade-up">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 break-words">Other Ways to Donate</h3>
                <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Bank Transfer / Cheque / DD</h4>
                <p className="text-sm text-gray-600 mb-2">
                  You can donate via bank transfer, cheque, or demand draft. Please contact us for bank details.
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Email:</strong> info@welledfoundation.org<br />
                  <strong>Phone:</strong> +91-1800-123-4567
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">For NRI Donors</h4>
                <p className="text-sm text-gray-600 mb-2">
                  NRI donors and foreign nationals can donate to support Welled Foundation. 
                  Please contact us for FCRA account details and wire transfer information.
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Email:</strong> partnerships@welledfoundation.org
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Donate

