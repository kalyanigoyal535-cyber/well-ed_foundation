import { useState } from 'react'
import AOS from 'aos'

function Donate() {
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
    <section id="donate" className="py-24 bg-gray-50 min-h-screen pt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-4">
            Make a Difference Today
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your contribution helps us feed, educate, and empower communities in need.
          </p>
        </div>

        {/* Donation Type Tabs */}
        <div className="mb-8" data-aos="fade-up" data-aos-delay="100">
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {donationTabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-green-600 text-white shadow-lg transform scale-105'
                    : 'bg-white text-gray-700 hover:bg-green-50 border-2 border-gray-200'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Donation Amount */}
          <div className="lg:col-span-2" data-aos="fade-right">
            <div className="bg-white rounded-3xl shadow-xl p-8 mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Choose Donation Amount</h3>
              
              {/* Preset Amounts */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                {presetAmounts.map((preset, index) => (
                  <button
                    key={index}
                    onClick={() => handleAmountSelect(preset.amount)}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                      donationAmount === preset.amount
                        ? 'border-green-600 bg-green-50 text-green-700 font-bold'
                        : 'border-gray-200 hover:border-green-300 hover:bg-green-50'
                    }`}
                  >
                    <div className="text-lg font-semibold">{preset.label}</div>
                    <div className="text-sm text-gray-600">{preset.children} child(ren)</div>
                  </button>
                ))}
              </div>

              {/* Custom Amount */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Or Enter Custom Amount (Minimum ₹500)
                </label>
                <input
                  type="number"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value)
                    setDonationAmount('')
                  }}
                  min="500"
                  placeholder="Enter amount"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                {customAmount && (
                  <p className="mt-2 text-sm text-gray-600">
                    This will feed {calculateChildren(parseInt(customAmount) || 0)} child(ren) for one academic year
                  </p>
                )}
              </div>

              {/* Current Selection */}
              {(donationAmount || customAmount) && (
                <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 mb-6">
                  <p className="text-lg font-semibold text-green-800">
                    Selected Amount: ₹ {donationAmount || customAmount}
                  </p>
                  <p className="text-sm text-green-700">
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
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500"
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
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500"
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
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'memory' && (
                <div className="mb-6 p-6 bg-purple-50 rounded-xl border-2 border-purple-200">
                  <h4 className="text-xl font-bold text-gray-900 mb-4">Donate in Memory</h4>
                  <p className="text-gray-700 mb-4">
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
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500"
                      required
                    />
                  </div>
                </div>
              )}

              {activeTab === 'occasion' && (
                <div className="mb-6 p-6 bg-yellow-50 rounded-xl border-2 border-yellow-200">
                  <h4 className="text-xl font-bold text-gray-900 mb-4">Donate for Special Occasion</h4>
                  <p className="text-gray-700 mb-4">
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
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500"
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
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'sme' && (
                <div className="mb-6 p-6 bg-indigo-50 rounded-xl border-2 border-indigo-200">
                  <h4 className="text-xl font-bold text-gray-900 mb-4">SME Donations</h4>
                  <p className="text-gray-700 mb-4">
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
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500"
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
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500"
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
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'school' && (
                <div className="mb-6 p-6 bg-teal-50 rounded-xl border-2 border-teal-200">
                  <h4 className="text-xl font-bold text-gray-900 mb-4">Sponsor a School for a Year</h4>
                  <p className="text-gray-700 mb-4">
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
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500"
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
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    <div className="bg-blue-100 p-4 rounded-lg">
                      <p className="text-sm text-blue-800">
                        <strong>Note:</strong> Sponsoring a school typically costs ₹2,00,000 - ₹5,00,000 per year 
                        depending on the number of students. You can specify your preferred amount above.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'equipment' && (
                <div className="mb-6 p-6 bg-orange-50 rounded-xl border-2 border-orange-200">
                  <h4 className="text-xl font-bold text-gray-900 mb-4">Kitchen Equipment Donation</h4>
                  <p className="text-gray-700 mb-4">
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
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500"
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
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Donor Information Form */}
          <div className="lg:col-span-1" data-aos="fade-left">
            <div className="bg-white rounded-3xl shadow-xl p-8 sticky top-24">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Donor Details</h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Citizenship */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Select Your Citizenship <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="citizenship"
                        value="indian"
                        checked={donorType === 'indian'}
                        onChange={() => setDonorType('indian')}
                        className="mr-2"
                      />
                      Indian Citizen
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="citizenship"
                        value="foreign"
                        checked={donorType === 'foreign'}
                        onChange={() => setDonorType('foreign')}
                        className="mr-2"
                      />
                      Foreign National
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
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500"
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
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500"
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
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500"
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
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500"
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
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500"
                  />
                </div>

                {/* WhatsApp */}
                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="whatsapp"
                      checked={formData.whatsapp || false}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">
                      Please share your WhatsApp number for donation updates
                    </span>
                  </label>
                  {formData.whatsapp && (
                    <p className="text-xs text-gray-500 mt-1 ml-6">
                      Your mobile number will be used for WhatsApp updates
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
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500"
                  />
                </div>

                {/* 80G Certificate */}
                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="want80G"
                      checked={formData.want80G}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">
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
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500"
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
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500"
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
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500"
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
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500"
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
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500"
                  />
                </div>

                {/* Preference State */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Preference State (Where you want your donation to be used)
                  </label>
                  <select
                    name="preferenceState"
                    value={formData.preferenceState}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500"
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
                <div className="pt-4">
                  <label className="flex items-start">
                    <input
                      type="checkbox"
                      required
                      className="mt-1 mr-2"
                    />
                    <span className="text-sm text-gray-700">
                      I have read through the website's <a href="#" className="text-green-600 hover:underline">Privacy Policy</a> & <a href="#" className="text-green-600 hover:underline">Terms and Conditions</a> to make a donation.
                    </span>
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={!donationAmount && !customAmount}
                  className="w-full px-8 py-4 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none"
                >
                  Donate Now
                </button>

                {/* Tax Exemption Info */}
                <p className="text-sm text-center text-gray-600 pt-4">
                  Avail tax exemption under Section 80G
                </p>
              </form>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-12 bg-white rounded-3xl shadow-xl p-8" data-aos="fade-up">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Other Ways to Donate</h3>
          <div className="grid md:grid-cols-2 gap-6">
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
  )
}

export default Donate

