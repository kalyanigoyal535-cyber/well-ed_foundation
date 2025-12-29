import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import AOS from 'aos'

function Funds() {
  const location = useLocation()
  
  // Sample data - replace with actual data from API/database
  const fundsData = {
    totalReceived: 12500000, // ₹1.25 Crores
    totalUsed: 9800000, // ₹98 Lakhs
    availableBalance: 2700000, // ₹27 Lakhs
    monthlyReceived: [
      { month: 'Jan 2024', amount: 850000 },
      { month: 'Feb 2024', amount: 920000 },
      { month: 'Mar 2024', amount: 1100000 },
      { month: 'Apr 2024', amount: 980000 },
      { month: 'May 2024', amount: 1250000 },
      { month: 'Jun 2024', amount: 1340000 },
    ],
    usageBreakdown: [
      { category: 'Education Programs', amount: 3200000, percentage: 32.7 },
      { category: 'Food & Nutrition', amount: 2800000, percentage: 28.6 },
      { category: 'Healthcare', amount: 1500000, percentage: 15.3 },
      { category: 'Infrastructure', amount: 1200000, percentage: 12.2 },
      { category: 'Administrative', amount: 600000, percentage: 6.1 },
      { category: 'Other Programs', amount: 500000, percentage: 5.1 },
    ],
    recentDonations: [
      { date: '2024-06-15', donor: 'Anonymous', amount: 50000, type: 'General' },
      { date: '2024-06-12', donor: 'ABC Corporation', amount: 200000, type: 'Corporate' },
      { date: '2024-06-10', donor: 'John Doe', amount: 25000, type: 'Individual' },
      { date: '2024-06-08', donor: 'XYZ Foundation', amount: 500000, type: 'Foundation' },
      { date: '2024-06-05', donor: 'Anonymous', amount: 10000, type: 'General' },
    ],
    recentExpenses: [
      { date: '2024-06-14', description: 'School supplies for 500 children', amount: 125000, category: 'Education' },
      { date: '2024-06-13', description: 'Mid-day meals program', amount: 180000, category: 'Nutrition' },
      { date: '2024-06-11', description: 'Medical camp expenses', amount: 95000, category: 'Healthcare' },
      { date: '2024-06-09', description: 'Classroom renovation', amount: 250000, category: 'Infrastructure' },
      { date: '2024-06-07', description: 'Scholarship distribution', amount: 200000, category: 'Education' },
    ]
  }

  const formatCurrency = (amount) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(2)} Cr`
    } else if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(2)} L`
    } else if (amount >= 1000) {
      return `₹${(amount / 1000).toFixed(1)}K`
    }
    return `₹${amount}`
  }

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      mirror: false,
      offset: 100,
    })
    const timer = setTimeout(() => {
      if (window.AOS) {
        window.AOS.refresh()
      }
    }, 100)
    return () => clearTimeout(timer)
  }, [location.pathname])

  const usagePercentage = (fundsData.totalUsed / fundsData.totalReceived) * 100
  const remainingPercentage = 100 - usagePercentage

  return (
    <div className="bg-gray-50 overflow-x-hidden w-full max-w-full">
      <Navigation />
      <section className="py-24 bg-gray-50 pt-32 w-full max-w-full">
        <div className="max-w-7xl mx-auto w-full overflow-x-hidden px-4 sm:px-6 lg:px-8">
          
          {/* Header Section */}
          <div className="text-center mb-12 sm:mb-16" data-aos="fade-up">
            <div className="flex items-center justify-center gap-2 mb-4 sm:mb-6">
              <div className="w-12 sm:w-16 h-0.5 bg-gradient-to-r from-transparent via-primary-400 to-primary-500"></div>
              <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
              <div className="w-12 sm:w-16 h-0.5 bg-gradient-to-r from-primary-500 via-yellow-400 to-transparent"></div>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
              <span className="bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 bg-clip-text text-transparent">
                Financial Transparency
              </span>
            </h1>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
              Complete transparency in how your contributions are received and utilized for maximum impact
            </p>
            <div className="flex items-center justify-center gap-2 mt-4 sm:mt-6">
              <div className="w-12 sm:w-16 h-0.5 bg-gradient-to-r from-transparent via-yellow-400 to-yellow-500"></div>
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <div className="w-12 sm:w-16 h-0.5 bg-gradient-to-r from-yellow-500 via-primary-400 to-transparent"></div>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12" data-aos="fade-up" data-aos-delay="100">
            {/* Total Received */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 shadow-lg border-2 border-green-200 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-200/20 rounded-full blur-3xl"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-green-700 uppercase tracking-wide">Total Received</h3>
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-3xl sm:text-4xl font-bold text-green-800 mb-2">{formatCurrency(fundsData.totalReceived)}</p>
                <p className="text-sm text-green-600">Since inception</p>
              </div>
            </div>

            {/* Total Used */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 shadow-lg border-2 border-blue-200 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200/20 rounded-full blur-3xl"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-blue-700 uppercase tracking-wide">Total Utilized</h3>
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-3xl sm:text-4xl font-bold text-blue-800 mb-2">{formatCurrency(fundsData.totalUsed)}</p>
                <p className="text-sm text-blue-600">{usagePercentage.toFixed(1)}% of total funds</p>
              </div>
            </div>

            {/* Available Balance */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 shadow-lg border-2 border-purple-200 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-200/20 rounded-full blur-3xl"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-purple-700 uppercase tracking-wide">Available Balance</h3>
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <p className="text-3xl sm:text-4xl font-bold text-purple-800 mb-2">{formatCurrency(fundsData.availableBalance)}</p>
                <p className="text-sm text-purple-600">Ready for deployment</p>
              </div>
            </div>
          </div>

          {/* Usage Breakdown */}
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 mb-12" data-aos="fade-up" data-aos-delay="200">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <div className="w-1.5 h-8 bg-gradient-to-b from-primary-500 to-primary-700 rounded-full"></div>
              Fund Utilization Breakdown
            </h2>
            <div className="space-y-4">
              {fundsData.usageBreakdown.map((item, index) => (
                <div key={index} className="relative">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm sm:text-base font-semibold text-gray-700">{item.category}</span>
                    <span className="text-sm sm:text-base font-bold text-primary-700">{formatCurrency(item.amount)}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-primary-500 to-primary-600 h-4 rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
                      style={{ width: `${item.percentage}%` }}
                      data-aos="slide-right"
                      data-aos-delay={300 + index * 100}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500 mt-1 block">{item.percentage.toFixed(1)}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Monthly Trends */}
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 mb-12" data-aos="fade-up" data-aos-delay="300">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <div className="w-1.5 h-8 bg-gradient-to-b from-primary-500 to-primary-700 rounded-full"></div>
              Monthly Funds Received (Last 6 Months)
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {fundsData.monthlyReceived.map((month, index) => {
                const maxAmount = Math.max(...fundsData.monthlyReceived.map(m => m.amount))
                const heightPercentage = (month.amount / maxAmount) * 100
                return (
                  <div key={index} className="text-center">
                    <div className="relative h-48 sm:h-56 bg-gray-100 rounded-lg mb-3 flex items-end justify-center p-2">
                      <div
                        className="w-full bg-gradient-to-t from-primary-600 to-primary-500 rounded-lg transition-all duration-1000 ease-out relative overflow-hidden"
                        style={{ height: `${heightPercentage}%` }}
                        data-aos="slide-up"
                        data-aos-delay={400 + index * 100}
                      >
                        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/20 to-transparent animate-shimmer"></div>
                      </div>
                      <span className="absolute top-2 text-xs font-bold text-gray-700">{formatCurrency(month.amount)}</span>
                    </div>
                    <p className="text-xs sm:text-sm font-medium text-gray-600">{month.month}</p>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
            {/* Recent Donations */}
            <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8" data-aos="fade-up" data-aos-delay="400">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="w-1.5 h-8 bg-gradient-to-b from-green-500 to-green-700 rounded-full"></div>
                Recent Donations
              </h2>
              <div className="space-y-4">
                {fundsData.recentDonations.map((donation, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-green-50 rounded-xl border border-green-100 hover:shadow-md transition-shadow">
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{donation.donor}</p>
                      <p className="text-sm text-gray-600">{donation.date}</p>
                      <span className="inline-block mt-1 px-2 py-1 bg-green-200 text-green-800 text-xs font-semibold rounded">
                        {donation.type}
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-green-700">{formatCurrency(donation.amount)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Expenses */}
            <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8" data-aos="fade-up" data-aos-delay="500">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="w-1.5 h-8 bg-gradient-to-b from-blue-500 to-blue-700 rounded-full"></div>
                Recent Expenses
              </h2>
              <div className="space-y-4">
                {fundsData.recentExpenses.map((expense, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-blue-50 rounded-xl border border-blue-100 hover:shadow-md transition-shadow">
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{expense.description}</p>
                      <p className="text-sm text-gray-600">{expense.date}</p>
                      <span className="inline-block mt-1 px-2 py-1 bg-blue-200 text-blue-800 text-xs font-semibold rounded">
                        {expense.category}
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-blue-700">{formatCurrency(expense.amount)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Transparency Note */}
          <div className="bg-gradient-to-r from-primary-50 to-primary-100 rounded-2xl p-6 sm:p-8 border-2 border-primary-200" data-aos="fade-up" data-aos-delay="600">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Our Commitment to Transparency</h3>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  At Welled Foundation, we believe in complete financial transparency. Every rupee received is accounted for and utilized 
                  with utmost care and efficiency. Our financial records are audited regularly, and we are committed to using your 
                  donations to create maximum impact in the communities we serve. We maintain detailed records of all donations and 
                  expenses, ensuring that our donors can see exactly how their contributions are making a difference.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>
      <Footer />
    </div>
  )
}

export default Funds



