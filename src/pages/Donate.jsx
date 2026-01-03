import { useState, useEffect, useMemo, useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import { DONATION_TABS, PRESET_AMOUNTS, INDIAN_STATES } from '../constants/data'

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
    schoolLocation: ''
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [location.pathname])

  const calculateChildren = useCallback((amount) => {
    return Math.floor(amount / 4500)
  }, [])

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleAmountSelect = useCallback((amount) => {
    setDonationAmount(amount)
    setCustomAmount('')
    setErrors(prev => {
      if (prev.amount) {
        const newErrors = { ...prev }
        delete newErrors.amount
        return newErrors
      }
      return prev
    })
  }, [])

  const validateForm = useCallback(() => {
    const newErrors = {}
    
    const amount = parseInt(donationAmount || customAmount) || 0
    if (amount <= 0) {
      newErrors.amount = 'Please enter a valid donation amount'
    }
    
    if (!formData.name || !formData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    
    if (!formData.email || !formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    
    if (!formData.mobile || !formData.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required'
    } else if (!/^[6-9]\d{9}$/.test(formData.mobile.replace(/\D/g, ''))) {
      newErrors.mobile = 'Please enter a valid 10-digit mobile number'
    }
    
    if (!formData.address || !formData.address.trim()) {
      newErrors.address = 'Address is required'
    }
    
    if (!formData.pincode || !formData.pincode.trim()) {
      newErrors.pincode = 'Pincode is required'
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = 'Please enter a valid 6-digit pincode'
    }
    
    if (!formData.city || !formData.city.trim()) {
      newErrors.city = 'City is required'
    }
    
    if (!formData.state || !formData.state.trim()) {
      newErrors.state = 'State is required'
    }
    
    if (activeTab === 'honor' && (!formData.honorName || !formData.honorName.trim())) {
      newErrors.honorName = 'Name is required for honor donation'
    }
    
    if (activeTab === 'memory' && (!formData.memoryName || !formData.memoryName.trim())) {
      newErrors.memoryName = 'Name is required for memory donation'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [formData, activeTab, donationAmount, customAmount])

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault()
    
    const isValid = validateForm()
    if (!isValid) {
      setTimeout(() => {
        const errorElements = document.querySelectorAll('[class*="border-red"]')
        if (errorElements.length > 0) {
          errorElements[0].scrollIntoView({ behavior: 'smooth', block: 'center' })
          errorElements[0].focus()
        }
      }, 100)
      return
    }
    
    setIsSubmitting(true)
    
    try {
      // Form is valid, proceed with submission
      // In a production environment, you would redirect to a payment gateway here
      alert('Thank you for your donation! You will be redirected to the payment gateway.')
      
    } catch (error) {
      console.error('Error submitting donation:', error)
      alert('An error occurred while submitting your donation. Please try again or contact support.')
    } finally {
      setIsSubmitting(false)
    }
  }, [validateForm, donationAmount, customAmount, activeTab, formData, donorType])

  const currentAmount = useMemo(() => {
    return parseInt(donationAmount || customAmount) || 0
  }, [donationAmount, customAmount])
  
  const childrenCount = useMemo(() => {
    return calculateChildren(currentAmount)
  }, [currentAmount, calculateChildren])

      return (
        <div className="bg-gray-50 overflow-x-hidden w-full max-w-full">
          <Navigation />
          <section className="py-16 sm:py-20 md:py-24 bg-gray-50 pt-24 sm:pt-28 md:pt-32 w-full max-w-full">
            <div className="max-w-7xl mx-auto w-full overflow-x-hidden px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 mt-4 sm:mt-8 md:mt-12 relative">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-primary-200/20 rounded-full blur-3xl"></div>
              <div className="absolute top-0 right-1/4 w-24 h-24 bg-yellow-200/20 rounded-full blur-2xl"></div>
              <div className="absolute top-0 left-1/4 w-20 h-20 bg-blue-200/20 rounded-full blur-xl"></div>
            </div>
            
            <div className="flex items-center justify-center gap-2 mb-4 sm:mb-6">
              <div className="w-12 sm:w-16 h-0.5 bg-gradient-to-r from-transparent via-primary-400 to-primary-500"></div>
              <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
              <div className="w-12 sm:w-16 h-0.5 bg-gradient-to-r from-primary-500 via-yellow-400 to-transparent"></div>
            </div>
            
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold mb-3 sm:mb-4 relative z-10">
              <span className="bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 bg-clip-text text-transparent">
                Make a Difference Today
              </span>
            </h2>
            
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed relative z-10">
              Your contribution helps us feed, educate, and empower communities in need.
            </p>
            
            <div className="flex items-center justify-center gap-2 mt-4 sm:mt-6">
              <div className="w-12 sm:w-16 h-0.5 bg-gradient-to-r from-transparent via-yellow-400 to-yellow-500"></div>
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <div className="w-12 sm:w-16 h-0.5 bg-gradient-to-r from-yellow-500 via-primary-400 to-transparent"></div>
            </div>
          </div>

          <div className="mb-8 w-full">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 mb-6 w-full" role="tablist" aria-label="Donation type selection">
              {DONATION_TABS.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  role="tab"
                  aria-selected={activeTab === tab.id}
                  aria-controls={`panel-${tab.id}`}
                  id={`tab-${tab.id}`}
                  className={`px-2 sm:px-3 py-2 sm:py-2.5 rounded-lg font-semibold text-xs sm:text-sm transition-all duration-300 transform hover:scale-105 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 flex items-center justify-center ${
                    activeTab === tab.id
                      ? 'bg-accent-gradient text-white shadow-lg shadow-primary-200 scale-105'
                      : 'bg-white text-gray-700 hover:bg-gradient-to-r hover:from-primary-50 hover:to-primary-100 border-2 border-gray-200 hover:border-primary-300 shadow-sm hover:shadow-md'
                  }`}
                  aria-label={tab.label}
                >
                  <span className="mr-1 text-sm sm:text-base">{tab.icon}</span>
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden text-[10px]">{tab.label.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4 sm:gap-6 lg:gap-8 w-full max-w-full overflow-x-hidden">
            <div className="w-full max-w-full overflow-x-hidden">
              <div className="bg-gradient-to-br from-white via-primary-50/30 to-white rounded-2xl shadow-xl border-2 border-primary-100/50 p-4 sm:p-5 md:p-6 mb-6 w-full max-w-full overflow-x-hidden relative">
                <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-2xl">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary-200/10 rounded-full blur-3xl"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-yellow-200/10 rounded-full blur-2xl"></div>
                </div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5">
                    <div className="w-1.5 h-6 sm:h-8 bg-gradient-to-b from-primary-500 to-primary-700 rounded-full flex-shrink-0 shadow-md"></div>
                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 break-words">
                      <span className="bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
                        Choose Donation Amount
                      </span>
                    </h3>
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-2.5 md:gap-3 mb-5" role="group" aria-label="Preset donation amounts">
                    {PRESET_AMOUNTS.map((preset, index) => (
                      <button
                        key={index}
                        onClick={() => handleAmountSelect(preset.amount)}
                        className={`p-2.5 sm:p-3 md:p-3.5 rounded-lg border-2 transition-all duration-300 transform hover:scale-105 w-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1 relative overflow-hidden ${
                          donationAmount === preset.amount
                            ? 'border-primary-500 bg-gradient-to-br from-primary-500 to-primary-600 text-white font-bold shadow-lg shadow-primary-300/50 scale-105'
                            : 'border-gray-200 bg-white hover:border-primary-400 hover:bg-gradient-to-br hover:from-primary-50 hover:to-primary-100 hover:shadow-md'
                        }`}
                        aria-label={`Donate ${preset.label}`}
                        aria-pressed={donationAmount === preset.amount}
                      >
                        {donationAmount === preset.amount && (
                          <div className="absolute top-1 right-1 w-2 h-2 bg-white rounded-full opacity-80"></div>
                        )}
                        <div className={`text-xs sm:text-sm md:text-base font-bold break-words ${
                          donationAmount === preset.amount ? 'text-white' : 'text-gray-700'
                        }`}>{preset.label}</div>
                      </button>
                    ))}
                  </div>

                  <div className="mb-5 w-full">
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                      Or Enter Custom Amount
                    </label>
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                      <div className="relative flex-1 sm:w-1/2">
                        <span className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-500 font-semibold text-sm">₹</span>
                        <input
                          type="text"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          value={customAmount}
                          onChange={(e) => {
                            const value = e.target.value.replace(/[^0-9]/g, '')
                            setCustomAmount(value)
                            setDonationAmount('')
                            if (errors.amount) {
                              setErrors(prev => {
                                const newErrors = { ...prev }
                                delete newErrors.amount
                                return newErrors
                              })
                            }
                          }}
                          placeholder="Enter amount"
                          className={`w-full pl-7 pr-3 py-2 sm:py-1.5 bg-white border-2 rounded-lg focus:ring-2 focus:ring-primary-500 transition-all duration-200 shadow-sm hover:shadow-md text-sm ${
                            errors.amount ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-primary-500'
                          }`}
                          aria-label="Enter custom donation amount"
                        />
                      </div>
                      <p className="text-xs sm:text-sm text-primary-600 font-medium italic text-center sm:text-left">
                        💝 Every rupee counts! Make your impact, your way.
                      </p>
                    </div>
                  </div>

                  {(donationAmount || customAmount) && (
                    <div className="bg-gradient-to-r from-primary-500 via-primary-600 to-primary-700 border-2 border-primary-400 rounded-lg p-3 sm:p-4 mb-5 shadow-lg w-full relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 animate-shimmer"></div>
                      <div className="flex items-center gap-2 relative z-10">
                        <svg className="w-4 h-4 sm:w-4 sm:h-4 text-white flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-sm sm:text-base font-bold text-white break-words">
                          Selected Amount: ₹ {donationAmount || customAmount}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

                {activeTab === 'honor' && (
                  <div className="mb-6 p-4 sm:p-5 md:p-6 bg-blue-50 rounded-xl border-2 border-blue-200">
                    <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Donate in Honor</h4>
                    <p className="text-sm sm:text-base text-gray-700 mb-4 leading-relaxed">
                      Celebrating someone who inspires you is more meaningful when your gesture creates lasting impact. 
                      By donating in their honour, you not only express your gratitude and admiration but also help nourish children with healthy meals.
                    </p>
                    <div className="space-y-3 sm:space-y-4">
                      <div>
                        <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                          In Honor Of <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="honorName"
                          value={formData.honorName}
                          onChange={handleInputChange}
                          placeholder="Name of the person you want to honor"
                          className="w-full px-3 sm:px-4 py-2.5 sm:py-3 md:py-3.5 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 shadow-sm hover:shadow-md text-sm sm:text-base"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                          Occasion (Optional)
                        </label>
                        <input
                          type="text"
                          name="honorOccasion"
                          value={formData.honorOccasion}
                          onChange={handleInputChange}
                          placeholder="e.g., Birthday, Anniversary"
                          className="w-full px-3 sm:px-4 py-2.5 sm:py-3 md:py-3.5 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 shadow-sm hover:shadow-md text-sm sm:text-base"
                        />
                      </div>
                      <div>
                        <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                          Date
                        </label>
                        <input
                          type="date"
                          name="honorDate"
                          value={formData.honorDate}
                          onChange={handleInputChange}
                          className="w-full px-3 sm:px-4 py-2.5 sm:py-3 md:py-3.5 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 shadow-sm hover:shadow-md text-sm sm:text-base"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'memory' && (
                  <div className="mb-6 p-4 sm:p-5 md:p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border-l-4 border-purple-500 shadow-md w-full">
                    <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </div>
                      <h4 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 break-words">Donate in Memory</h4>
                    </div>
                    <p className="text-xs sm:text-sm md:text-base text-gray-700 mb-4 leading-relaxed break-words">
                      Honor the memory of a loved one by making a meaningful contribution that will help feed and educate children in need.
                    </p>
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                        In Memory Of <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="memoryName"
                        value={formData.memoryName}
                        onChange={handleInputChange}
                        placeholder="Name of the person you want to remember"
                        className={`w-full px-3 sm:px-4 py-2.5 sm:py-3.5 bg-white border-2 rounded-xl focus:ring-2 focus:ring-primary-500 transition-all duration-200 shadow-sm hover:shadow-md text-sm sm:text-base ${
                          errors.memoryName ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-primary-500'
                        }`}
                        required
                      />
                      {errors.memoryName && <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.memoryName}</p>}
                    </div>
                  </div>
                )}

                {activeTab === 'occasion' && (
                  <div className="mb-6 p-4 sm:p-5 md:p-6 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl border-l-4 border-yellow-500 shadow-md w-full">
                    <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-yellow-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                        </svg>
                      </div>
                      <h4 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 break-words">Donate for Special Occasion</h4>
                    </div>
                    <p className="text-xs sm:text-sm md:text-base text-gray-700 mb-4 leading-relaxed break-words">
                      Celebrate your special moments by making a difference in the lives of children.
                    </p>
                    <div className="space-y-3 sm:space-y-4">
                      <div>
                        <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                          Occasion Type <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="occasionType"
                          value={formData.occasionType}
                          onChange={handleInputChange}
                          className="w-full px-3 sm:px-4 py-2.5 sm:py-3 md:py-3.5 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 shadow-sm hover:shadow-md appearance-none cursor-pointer text-sm sm:text-base"
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
                        <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                          Occasion Date
                        </label>
                        <input
                          type="date"
                          name="occasionDate"
                          value={formData.occasionDate}
                          onChange={handleInputChange}
                          className="w-full px-3 sm:px-4 py-2.5 sm:py-3 md:py-3.5 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 shadow-sm hover:shadow-md text-sm sm:text-base"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'sme' && (
                  <div className="mb-6 p-4 sm:p-5 md:p-6 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl border-l-4 border-indigo-500 shadow-md w-full">
                    <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-indigo-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                      <h4 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 break-words">SME Donations</h4>
                    </div>
                    <p className="text-xs sm:text-sm md:text-base text-gray-700 mb-4 leading-relaxed break-words">
                      Small and Medium Enterprises can make a significant impact through corporate donations. 
                      Your contribution helps us reach more communities and create lasting change.
                    </p>
                    <div className="space-y-3 sm:space-y-4">
                      <div>
                        <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                          Company Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="companyName"
                          value={formData.companyName}
                          onChange={handleInputChange}
                          placeholder="Your company name"
                          className="w-full px-3 sm:px-4 py-2.5 sm:py-3 md:py-3.5 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 shadow-sm hover:shadow-md text-sm sm:text-base"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                          Company Type
                        </label>
                        <select
                          name="companyType"
                          value={formData.companyType}
                          onChange={handleInputChange}
                          className="w-full px-3 sm:px-4 py-2.5 sm:py-3 md:py-3.5 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 shadow-sm hover:shadow-md appearance-none cursor-pointer text-sm sm:text-base"
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
                        <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                          GSTIN (if applicable)
                        </label>
                        <input
                          type="text"
                          name="gstin"
                          value={formData.gstin}
                          onChange={handleInputChange}
                          placeholder="GSTIN Number"
                          className="w-full px-3 sm:px-4 py-2.5 sm:py-3 md:py-3.5 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 shadow-sm hover:shadow-md text-sm sm:text-base"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'school' && (
                  <div className="mb-6 p-4 sm:p-5 md:p-6 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl border-l-4 border-teal-500 shadow-md w-full">
                    <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-teal-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      </div>
                      <h4 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 break-words">Sponsor a School for a Year</h4>
                    </div>
                    <p className="text-xs sm:text-sm md:text-base text-gray-700 mb-4 leading-relaxed break-words">
                      Sponsor an entire school for one academic year. Your contribution will provide meals, 
                      educational support, and resources to all children in the school.
                    </p>
                    <div className="space-y-3 sm:space-y-4">
                      <div>
                        <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                          School Name (Optional - we can assign one)
                        </label>
                        <input
                          type="text"
                          name="schoolName"
                          value={formData.schoolName}
                          onChange={handleInputChange}
                          placeholder="Preferred school name or leave blank"
                          className="w-full px-3 sm:px-4 py-2.5 sm:py-3 md:py-3.5 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 shadow-sm hover:shadow-md text-sm sm:text-base"
                        />
                      </div>
                      <div>
                        <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                          Preferred Location
                        </label>
                        <input
                          type="text"
                          name="schoolLocation"
                          value={formData.schoolLocation}
                          onChange={handleInputChange}
                          placeholder="State or City preference"
                          className="w-full px-3 sm:px-4 py-2.5 sm:py-3 md:py-3.5 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 shadow-sm hover:shadow-md text-sm sm:text-base"
                        />
                      </div>
                      <div className="bg-gradient-to-r from-blue-100 to-indigo-100 p-3 sm:p-4 rounded-lg border-l-4 border-blue-500 mt-4">
                        <p className="text-xs sm:text-sm text-blue-800 leading-relaxed break-words">
                          <strong className="font-bold">Note:</strong> Sponsoring a school typically costs ₹2,00,000 - ₹5,00,000 per year 
                          depending on the number of students. You can specify your preferred amount above.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

            <div className="w-full max-w-full overflow-x-hidden">
              <div className="bg-gradient-to-br from-white via-gray-50 to-white rounded-2xl shadow-xl border border-gray-100 p-4 sm:p-5 md:p-6 lg:p-8 w-full max-w-full overflow-x-hidden">
                <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-gray-200">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-accent-gradient rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 break-words">Donor Details</h3>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 md:space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                        Title <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 md:py-3.5 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 shadow-sm hover:shadow-md appearance-none cursor-pointer text-sm sm:text-base"
                        required
                      >
                        <option value="Mr">Mr</option>
                        <option value="Mrs">Mrs</option>
                        <option value="Ms">Ms</option>
                        <option value="M/S">M/S</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                        Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 md:py-3.5 bg-white border-2 rounded-xl focus:ring-2 focus:ring-primary-500 transition-all duration-200 shadow-sm hover:shadow-md text-sm sm:text-base ${
                          errors.name ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-primary-500'
                        }`}
                      />
                      {errors.name && <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.name}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 md:py-3.5 bg-white border-2 rounded-xl focus:ring-2 focus:ring-primary-500 transition-all duration-200 shadow-sm hover:shadow-md text-sm sm:text-base ${
                          errors.email ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-primary-500'
                        }`}
                      />
                      {errors.email && <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.email}</p>}
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        name="dob"
                        value={formData.dob}
                        onChange={handleInputChange}
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 md:py-3.5 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 shadow-sm hover:shadow-md text-sm sm:text-base"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                        Mobile No <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleInputChange}
                        required
                        className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 md:py-3.5 bg-white border-2 rounded-xl focus:ring-2 focus:ring-primary-500 transition-all duration-200 shadow-sm hover:shadow-md text-sm sm:text-base ${
                          errors.mobile ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-primary-500'
                        }`}
                      />
                      {errors.mobile && <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.mobile}</p>}
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                        Alternate Mobile No
                      </label>
                      <input
                        type="tel"
                        name="alternateMobile"
                        value={formData.alternateMobile}
                        onChange={handleInputChange}
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 md:py-3.5 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 shadow-sm hover:shadow-md text-sm sm:text-base"
                      />
                    </div>
                  </div>

                  <div className="bg-blue-50 p-3 sm:p-4 rounded-xl border border-blue-100 w-full">
                    <label className="flex items-start cursor-pointer">
                      <input
                        type="checkbox"
                        name="whatsapp"
                        checked={formData.whatsapp || false}
                        onChange={handleInputChange}
                        className="mt-1 mr-2 sm:mr-3 w-4 sm:w-5 h-4 sm:h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500 flex-shrink-0"
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

                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                      PAN Number <span className="text-gray-400 font-normal text-xs">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      name="pan"
                      value={formData.pan}
                      onChange={handleInputChange}
                      maxLength="10"
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 md:py-3.5 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 shadow-sm hover:shadow-md uppercase text-sm sm:text-base"
                      placeholder="Enter PAN number"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                      Address <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      rows="3"
                      className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 md:py-3.5 bg-white border-2 rounded-xl focus:ring-2 focus:ring-primary-500 transition-all duration-200 shadow-sm hover:shadow-md resize-none text-sm sm:text-base ${
                        errors.address ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-primary-500'
                      }`}
                    />
                    {errors.address && <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.address}</p>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                        Pin Code <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        required
                        maxLength="6"
                        className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 md:py-3.5 bg-white border-2 rounded-xl focus:ring-2 focus:ring-primary-500 transition-all duration-200 shadow-sm hover:shadow-md text-sm sm:text-base ${
                          errors.pincode ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-primary-500'
                        }`}
                      />
                      {errors.pincode && <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.pincode}</p>}
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                        City <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 md:py-3.5 bg-white border-2 rounded-xl focus:ring-2 focus:ring-primary-500 transition-all duration-200 shadow-sm hover:shadow-md text-sm sm:text-base ${
                          errors.city ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-primary-500'
                        }`}
                      />
                      {errors.city && <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.city}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                        State <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                        className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 md:py-3.5 bg-white border-2 rounded-xl focus:ring-2 focus:ring-primary-500 transition-all duration-200 shadow-sm hover:shadow-md text-sm sm:text-base ${
                          errors.state ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-primary-500'
                        }`}
                      />
                      {errors.state && <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.state}</p>}
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                        Preference State <span className="text-gray-400 font-normal text-xs">(Where you want your donation to be used)</span>
                      </label>
                      <select
                        name="preferenceState"
                        value={formData.preferenceState}
                        onChange={handleInputChange}
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 md:py-3.5 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 shadow-sm hover:shadow-md appearance-none cursor-pointer text-sm sm:text-base"
                      >
                        <option value="">Anywhere</option>
                        {INDIAN_STATES.slice(1).map(state => (
                          <option key={state.value} value={state.value}>{state.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="pt-2 bg-gray-50 p-3 sm:p-4 rounded-xl border border-gray-200 w-full">
                    <label className="flex items-start cursor-pointer">
                      <input
                        type="checkbox"
                        required
                        className="mt-1 mr-2 sm:mr-3 w-4 sm:w-5 h-4 sm:h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500 flex-shrink-0"
                      />
                      <span className="text-xs sm:text-sm text-gray-700 flex-1 leading-relaxed break-words">
                        I have read through the website's <a href="#" className="text-primary-600 hover:underline font-semibold">Privacy Policy</a> & <a href="#" className="text-primary-600 hover:underline font-semibold">Terms and Conditions</a> to make a donation.
                      </span>
                    </label>
                  </div>

                  {errors.amount && (
                    <div className="p-3 sm:p-4 bg-red-50 border border-red-200 rounded-xl">
                      <p className="text-xs sm:text-sm text-red-600">{errors.amount}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting || (!donationAmount && !customAmount)}
                    className="w-full px-6 sm:px-8 py-3 sm:py-4 bg-accent-gradient text-white font-bold rounded-xl hover:shadow-glow-primary hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed disabled:transform-none shadow-lg text-sm sm:text-base"
                  >
                    <span className="flex items-center justify-center gap-2">
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                          Donate Now
                        </>
                      )}
                    </span>
                  </button>

                  <div className="text-center pt-4">
                    <div className="inline-flex items-center gap-2 bg-primary-50 px-4 py-2 rounded-lg border border-primary-200">
                      <svg className="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-sm text-primary-700 font-semibold">
                        Avail tax exemption under Section 80G
                      </p>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="mt-8 sm:mt-12 bg-white rounded-2xl sm:rounded-3xl shadow-xl p-4 sm:p-6 md:p-8 w-full">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 break-words">Other Ways to Donate</h3>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Bank Transfer / Cheque / DD</h4>
              <p className="text-sm text-gray-600 mb-2">
                You can donate via bank transfer, cheque, or demand draft. Please contact us for bank details.
              </p>
              <p className="text-sm text-gray-600">
                <strong>Email:</strong> welledfoundation@gmail.com<br />
                <strong>Phone:</strong> +91-1800-123-4567
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default Donate

