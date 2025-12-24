import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import { STATS, PROGRAMS, STORIES, CAMPAIGNS, TESTIMONIALS, UPDATES } from '../constants/data'

function Home() {
  const location = useLocation()
  
  // Desktop banner carousel images
  const desktopBanners = [
    '/banner.jpg',
    '/banner2.jpg',
    // Add more desktop banner images here, e.g.:
    // '/banner3.jpg',
  ]

  // Mobile banner carousel images - add mobile-optimized banner images here
  const mobileBanners = [
    '/banner-mobile.jpg', // Add your mobile banner images
    '/banner2-mobile.jpg',
    // Add more mobile banner images here, e.g.:
    // '/banner3-mobile.jpg',
  ]

  // Detect mobile device
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768) // md breakpoint
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Use mobile banners on mobile, desktop banners on desktop
  const banners = isMobile ? mobileBanners : desktopBanners

  const [currentBanner, setCurrentBanner] = useState(0)
  const [bannerHeight, setBannerHeight] = useState(null)

  useEffect(() => {
    // Smooth scroll to top when page loads or route changes
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    // Refresh AOS after a short delay to ensure DOM is ready
    const timer = setTimeout(() => {
      if (window.AOS) {
        window.AOS.refresh()
      }
    }, 100)
    return () => clearTimeout(timer)
  }, [location.pathname])

  // Reset to first banner when switching between mobile/desktop
  useEffect(() => {
    setCurrentBanner(0)
  }, [isMobile])

  // Measure banner image height
  useEffect(() => {
    const updateHeight = () => {
      if (banners.length === 0) return
      const img = new Image()
      img.src = banners[currentBanner]
      img.onload = () => {
        const aspectRatio = img.height / img.width
        const height = (window.innerWidth * aspectRatio)
        setBannerHeight(height)
      }
    }
    
    updateHeight()
    
    window.addEventListener('resize', updateHeight)
    return () => window.removeEventListener('resize', updateHeight)
  }, [currentBanner, banners])

  // Auto-play carousel
  useEffect(() => {
    if (banners.length <= 1) return
    
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length)
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(interval)
  }, [banners.length])

  const goToSlide = (index) => {
    setCurrentBanner(index)
  }

  const nextSlide = () => {
    setCurrentBanner((prev) => (prev + 1) % banners.length)
  }

  const prevSlide = () => {
    setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length)
  }

  return (
    <div className="App bg-white w-full">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section with Banner Carousel */}
      <section className="relative w-full overflow-hidden mt-20 sm:mt-24 md:mt-24 lg:mt-28 xl:mt-32">
        {/* Banner Carousel Container */}
        <div 
          className="relative w-full"
          style={{ height: bannerHeight ? `${bannerHeight}px` : 'auto', minHeight: '400px' }}
        >
          {banners.map((banner, index) => (
            <div
              key={index}
              className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out ${
                index === currentBanner ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
              style={{
                backgroundImage: `url(${banner})`
              }}
            />
          ))}
        </div>

        {/* Navigation Dots - Only show if multiple banners */}
        {banners.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2 md:gap-3">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentBanner
                    ? 'w-8 md:w-10 h-2 md:h-2.5 bg-white shadow-lg'
                    : 'w-2 md:w-2.5 h-2 md:h-2.5 bg-white/50 hover:bg-white/70'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </section>

      {/* About Us Section */}
      <section className="pt-4 pb-12 sm:pt-6 sm:pb-16 md:pt-8 md:pb-20 bg-gradient-to-b from-white via-primary-50/20 to-white w-full relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-48 h-48 bg-primary-200/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-64 h-64 bg-yellow-200/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          {/* Section Header */}
          <div className="text-center mb-6 sm:mb-8" data-aos="fade-up">
            <div className="inline-block mb-1.5">
              <span className="text-primary-600 text-[10px] sm:text-xs font-bold uppercase tracking-widest">Who We Are</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-2">
              <span className="bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 bg-clip-text text-transparent">
                ABOUT US
              </span>
            </h2>
            <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-primary-500 to-transparent mx-auto"></div>
          </div>
          
          {/* Main Content with Side Elements */}
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-center">
              {/* Left Side Enhancement */}
              <div className="hidden lg:block lg:col-span-2 space-y-4" data-aos="fade-right" data-aos-delay="150">
                {/* Community Card - Yellow */}
                <div className="group relative bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-4 border-2 border-yellow-200/60 shadow-lg hover:shadow-2xl hover:shadow-yellow-200/50 transition-all duration-500 hover:-translate-y-2 overflow-hidden">
                  {/* Animated Background Pattern */}
                  <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                    <div className="absolute inset-0" style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23eab308' fill-opacity='0.4'%3E%3Cpath d='M20 20.5V18H0v-2h20v-2H0v-2h20v-2H0V8h20V6H0V4h20V2H0V0h22v20h18v-2H22zm0 0v2H0v-2h20z'/%3E%3C/g%3E%3C/svg%3E")`,
                      backgroundSize: '40px 40px'
                    }}></div>
                  </div>
                  <div className="relative z-10">
                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center shadow-xl mb-3 mx-auto transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-extrabold bg-gradient-to-r from-yellow-600 to-yellow-700 bg-clip-text text-transparent text-center mb-1.5">Community</h3>
                    <p className="text-xs text-gray-700 text-center leading-relaxed font-medium">Uniting hearts, transforming lives together</p>
                  </div>
                </div>
                
                {/* Impact Card - Dark Blue/Primary */}
                <div className="group relative bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl p-4 border-2 border-primary-200/60 shadow-lg hover:shadow-2xl hover:shadow-primary-200/50 transition-all duration-500 hover:-translate-y-2 overflow-hidden">
                  {/* Animated Background Pattern */}
                  <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                    <div className="absolute inset-0" style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%231A4B8A' fill-opacity='0.4'%3E%3Cpath d='M20 20.5V18H0v-2h20v-2H0v-2h20v-2H0V8h20V6H0V4h20V2H0V0h22v20h18v-2H22zm0 0v2H0v-2h20z'/%3E%3C/g%3E%3C/svg%3E")`,
                      backgroundSize: '40px 40px'
                    }}></div>
                  </div>
                  <div className="relative z-10">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 rounded-lg flex items-center justify-center shadow-xl mb-3 mx-auto transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-extrabold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent text-center mb-1.5">Impact</h3>
                    <p className="text-xs text-gray-700 text-center leading-relaxed font-medium">Measuring success in lives transformed</p>
                  </div>
                </div>
              </div>

              {/* Main Content Card */}
              <div className="lg:col-span-8" data-aos="fade-up" data-aos-delay="100">
                <div className="relative">
                  {/* Decorative Corner Elements */}
                  <div className="absolute -top-2 -left-2 w-12 h-12 border-t-2 border-l-2 border-primary-400 rounded-tl-xl opacity-30"></div>
                  <div className="absolute -bottom-2 -right-2 w-12 h-12 border-b-2 border-r-2 border-primary-400 rounded-br-xl opacity-30"></div>
                  
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 md:p-10 shadow-xl border border-white/50 relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231A4B8A' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    backgroundSize: '60px 60px'
                  }}></div>
                </div>
                
                <div className="relative z-10">
                  {/* Main Statement */}
                  <div className="mb-6 sm:mb-8" data-aos="fade-up" data-aos-delay="150">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center shadow-lg transform rotate-3">
                        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </div>
                      <p className="text-base sm:text-lg md:text-xl text-gray-800 leading-relaxed font-bold">
                        <span className="bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
                          Well-Ed Foundation exists because wellness should never be a privilege.
                        </span>
                      </p>
                    </div>
                  </div>
                  
                  {/* Description */}
                  <div className="mb-6 sm:mb-8" data-aos="fade-up" data-aos-delay="200">
                    <p className="text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed">
                      We focus on making <span className="font-semibold text-primary-700">wellness education reachable</span> for people who are often left out — across regions, communities, and economic backgrounds. By spreading awareness and basic health understanding, we help individuals take better care of themselves and their families.
                    </p>
                  </div>
                  
                  {/* Divider with Icon */}
                  <div className="flex items-center gap-3 my-6 sm:my-8" data-aos="fade-up" data-aos-delay="250">
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary-300 to-transparent"></div>
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center shadow-lg transform -rotate-6">
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary-300 to-transparent"></div>
                  </div>
                  
                  {/* Well-Ed Definition */}
                  <div className="bg-gradient-to-br from-primary-50 via-yellow-50/50 to-primary-50 rounded-xl p-5 sm:p-6 md:p-8 border-2 border-primary-200/50 shadow-lg" data-aos="fade-up" data-aos-delay="300">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-1.5 h-1.5 bg-primary-600 rounded-full animate-pulse"></div>
                      <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-800">Our Name, Our Mission</h3>
                    </div>
                    <p className="text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed font-semibold">
                      <span className="text-lg sm:text-xl md:text-2xl font-extrabold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">Well-Ed</span> stands for <span className="text-primary-700 font-bold">Wellness Education</span>, because <span className="text-yellow-600 font-bold italic">knowledge is where good health begins.</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
              </div>

              {/* Right Side Enhancement */}
              <div className="hidden lg:block lg:col-span-2 space-y-4" data-aos="fade-left" data-aos-delay="150">
                {/* Education Card - Green */}
                <div className="group relative bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border-2 border-green-200/60 shadow-lg hover:shadow-2xl hover:shadow-green-200/50 transition-all duration-500 hover:-translate-y-2 overflow-hidden">
                  {/* Animated Background Pattern */}
                  <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                    <div className="absolute inset-0" style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%2322c55e' fill-opacity='0.4'%3E%3Cpath d='M20 20.5V18H0v-2h20v-2H0v-2h20v-2H0V8h20V6H0V4h20V2H0V0h22v20h18v-2H22zm0 0v2H0v-2h20z'/%3E%3C/g%3E%3C/svg%3E")`,
                      backgroundSize: '40px 40px'
                    }}></div>
                  </div>
                  <div className="relative z-10">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-400 via-green-500 to-green-600 rounded-lg flex items-center justify-center shadow-xl mb-3 mx-auto transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-extrabold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent text-center mb-1.5">Education</h3>
                    <p className="text-xs text-gray-700 text-center leading-relaxed font-medium">Igniting minds, unlocking potential</p>
                  </div>
                </div>
                
                {/* Care Card - Light Blue */}
                <div className="group relative bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border-2 border-blue-200/60 shadow-lg hover:shadow-2xl hover:shadow-blue-200/50 transition-all duration-500 hover:-translate-y-2 overflow-hidden">
                  {/* Animated Background Pattern */}
                  <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                    <div className="absolute inset-0" style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%233b82f6' fill-opacity='0.4'%3E%3Cpath d='M20 20.5V18H0v-2h20v-2H0v-2h20v-2H0V8h20V6H0V4h20V2H0V0h22v20h18v-2H22zm0 0v2H0v-2h20z'/%3E%3C/g%3E%3C/svg%3E")`,
                      backgroundSize: '40px 40px'
                    }}></div>
                  </div>
                  <div className="relative z-10">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-300 via-blue-400 to-blue-500 rounded-lg flex items-center justify-center shadow-xl mb-3 mx-auto transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-extrabold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent text-center mb-1.5">Care</h3>
                    <p className="text-xs text-gray-700 text-center leading-relaxed font-medium">Nurturing wellness with compassion</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Bottom Decorative Elements */}
          <div className="mt-8 sm:mt-10 flex justify-center gap-3" data-aos="fade-up" data-aos-delay="350">
            <div className="w-2 h-2 bg-primary-400 rounded-full"></div>
            <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
            <div className="w-2 h-2 bg-primary-400 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-8 md:py-10 bg-gradient-to-br from-primary-50 via-yellow-50/40 to-primary-50 relative w-full overflow-hidden">
        {/* Attractive Background Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-8"></div>
        
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary-100/30 via-transparent to-yellow-100/30"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>
        
        {/* Animated Blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-40 h-40 bg-primary-200/40 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-yellow-200/40 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-success-200/20 rounded-full blur-2xl animate-pulse-slow"></div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary-400 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative w-full z-10">
          <div className="text-center mb-6 md:mb-8" data-aos="fade-up">
            <div className="inline-block mb-2 px-3 py-1 bg-logo-gradient rounded-full shadow-md transform hover:scale-105 transition-transform duration-300">
              <span className="text-[10px] font-bold text-white uppercase tracking-wider">Making a Difference</span>
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold mb-2">
              <span className="bg-gradient-to-r from-primary-500 to-success-500 bg-clip-text text-transparent">
                OUR IMPACT
              </span>
            </h2>
            <p className="text-sm md:text-base text-gray-700 max-w-2xl mx-auto font-medium mb-2">
              Real numbers, real change, real impact
            </p>
            <div className="w-20 h-0.5 bg-gradient-to-r from-primary-500 to-success-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {STATS.map((stat, index) => {
              // Color themes for each card
              const themes = [
                { gradient: 'from-yellow-400 via-yellow-500 to-yellow-600', bg: 'from-yellow-50 to-yellow-100', border: 'border-yellow-300', text: 'text-yellow-700', shadow: 'shadow-yellow-300/50' },
                { gradient: 'from-primary-600 via-primary-700 to-primary-800', bg: 'from-primary-50 to-primary-100', border: 'border-primary-300', text: 'text-primary-700', shadow: 'shadow-primary-300/50' },
                { gradient: 'from-green-400 via-green-500 to-green-600', bg: 'from-green-50 to-green-100', border: 'border-green-300', text: 'text-green-700', shadow: 'shadow-green-300/50' },
                { gradient: 'from-blue-300 via-blue-400 to-blue-500', bg: 'from-blue-50 to-blue-100', border: 'border-blue-300', text: 'text-blue-700', shadow: 'shadow-blue-300/50' }
              ];
              const theme = themes[index];
              
              return (
                <div 
                  key={index} 
                  className="group relative bg-white/90 backdrop-blur-sm rounded-xl p-3 md:p-4 text-center border-2 border-white/60 hover:border-white shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 overflow-hidden"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  {/* Animated Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${theme.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                  
                  {/* Top Gradient Bar - Always Visible */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${theme.gradient} shadow-md`}></div>
                  
                  {/* Animated Border Glow */}
                  <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${theme.gradient} opacity-0 group-hover:opacity-15 blur-md transition-opacity duration-500`}></div>
                  
                  {/* Decorative Corner Elements */}
                  <div className={`absolute top-1.5 right-1.5 w-2 h-2 border-t-2 border-r-2 ${theme.border} rounded-tr-md opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                  <div className={`absolute bottom-1.5 left-1.5 w-2 h-2 border-b-2 border-l-2 ${theme.border} rounded-bl-md opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                  
                  {/* Floating Particles */}
                  <div className="absolute top-3 right-3 w-1 h-1 bg-primary-300 rounded-full opacity-0 group-hover:opacity-60 animate-pulse"></div>
                  <div className="absolute bottom-3 left-3 w-0.5 h-0.5 bg-primary-400 rounded-full opacity-0 group-hover:opacity-40 animate-pulse" style={{ animationDelay: '0.3s' }}></div>
                  
                  <div className="relative z-10">
                    {/* Icon Container with Animation */}
                    <div className="relative mb-3 flex justify-center">
                      <div className={`w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br ${theme.gradient} rounded-lg flex items-center justify-center shadow-xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 relative overflow-hidden border border-white/50`}>
                        {/* Shimmer Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                        <svg className="w-6 h-6 md:w-7 md:h-7 text-white transform group-hover:scale-110 transition-transform duration-500 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                          {index === 0 && (
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          )}
                          {index === 1 && (
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          )}
                          {index === 2 && (
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          )}
                          {index === 3 && (
                            <>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                            </>
                          )}
                        </svg>
                      </div>
                    </div>
                    
                    {/* Number with Counter Animation Effect */}
                    <div className="mb-1.5">
                      <div className={`text-2xl md:text-3xl lg:text-4xl font-extrabold bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent mb-1 transform group-hover:scale-105 transition-transform duration-300`}>
                        {stat.number}
                      </div>
                      {/* Animated Underline - Always Visible */}
                      <div className={`h-0.5 bg-gradient-to-r ${theme.gradient} w-full mx-auto rounded-full`}></div>
                    </div>
                    
                    {/* Label */}
                    <div className={`text-[10px] md:text-xs font-bold ${theme.text} uppercase tracking-wider mb-2 transform group-hover:translate-y-[-1px] transition-transform duration-300`}>
                      {stat.label}
                    </div>
                    
                    {/* Progress Indicator (appears on hover) */}
                    <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <div className={`w-1 h-1 rounded-full bg-gradient-to-r ${theme.gradient} animate-pulse`}></div>
                        <span className="text-[9px] text-gray-500 font-medium">Growing</span>
                        <div className={`w-1 h-1 rounded-full bg-gradient-to-r ${theme.gradient} animate-pulse`} style={{ animationDelay: '0.2s' }}></div>
                      </div>
                      <div className="w-full h-0.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className={`h-full bg-gradient-to-r ${theme.gradient} rounded-full transform translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-1000`} style={{ width: `${75 + index * 5}%` }}></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Glow Effect on Hover */}
                  <div className={`absolute inset-0 rounded-xl ${theme.shadow} opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-500 -z-10`}></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Support A Cause Section */}
      <section className="py-20 bg-gradient-to-b from-primary-50/30 to-white w-full relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-4xl md:text-5xl font-extrabold gradient-text mb-4">Support A Cause</h2>
            <p className="text-gray-600 max-w-2xl mx-auto font-light">Join us in making a meaningful difference</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {CAMPAIGNS.map((campaign, index) => {
              const percentage = Math.round((campaign.raised / campaign.goal) * 100)
              return (
                <div 
                  key={index}
                  className="group relative glass rounded-3xl shadow-xl border border-primary-100/50 overflow-hidden card-hover"
                  data-aos="fade-up"
                  data-aos-delay={index * 150}
                >
                  <div className="absolute top-0 left-0 right-0 h-2 bg-accent-gradient"></div>
                  <div className="p-8">
                    <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">{campaign.image}</div>
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 uppercase tracking-wide">{campaign.title}</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed text-sm">{campaign.description}</p>
                    <div className="mb-4">
                      <div className="flex justify-between text-xs text-gray-600 mb-2">
                        <span>Progress</span>
                        <span className="font-semibold text-primary-600">{percentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div 
                          className="h-full bg-accent-gradient rounded-full transition-all duration-1000"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                    <a href="#" className="inline-flex items-center text-primary-600 font-semibold hover:text-primary-700 text-sm group-hover:translate-x-2 transition-transform duration-300">
                      know more
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-white relative w-full">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative w-full">
          <div className="text-center mb-20" data-aos="fade-up">
            <h2 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 leading-tight">
              "Hope Begins Here."
            </h2>
            <p className="text-xl md:text-2xl text-gray-700 mb-5 font-medium max-w-3xl mx-auto">
              Serving nourishment, knowledge, and dignity to help every individual rise.
            </p>
            <p className="text-lg md:text-xl text-gray-600 italic font-light">
              "Welled Foundation - Serving humanity with heart."
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto text-center mb-20" data-aos="fade-up" data-aos-delay="100">
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-light">
              Welled Foundation is a humanitarian initiative committed to uplifting lives with dignity. We serve marginalized communities by ensuring reliable nourishment, empowering education, and continuous support initiatives that cultivate lasting progress and dignified futures. Our mission is simple yet powerful: to create equal opportunities, empower communities, and ensure that no one is left behindΓÇöregardless of age, background, or circumstance.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10 md:gap-12">
            {/* Mission Section */}
            <div 
              className="group glass rounded-3xl p-10 shadow-xl hover:shadow-2xl border border-primary-100/50 transition-all duration-500 transform hover:-translate-y-2 card-hover"
              data-aos="fade-right"
              data-aos-delay="200"
            >
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-accent-gradient rounded-t-3xl"></div>
              <div className="mb-6">
                <div className="w-16 h-1.5 bg-accent-gradient rounded-full mb-6"></div>
                <h3 className="text-2xl md:text-3xl font-bold gradient-text-primary mb-4 leading-tight">
                  To Feed. To Educate. To Uplift.
                </h3>
                <p className="text-lg text-gray-700 mb-6 font-semibold">
                  Focused on hunger relief, learning access & human support.
                </p>
              </div>
              <div className="border-t border-gray-200 pt-6 mb-6">
                <p className="text-gray-700 font-bold text-lg mb-6">
                  Our mission: Restore dignity through action, not words.
                </p>
                <div className="w-20 h-1.5 bg-accent-gradient rounded-full"></div>
              </div>
              <p className="text-gray-600 leading-relaxed text-base font-light">
                We exist to serve humanity with purpose and compassion. Our mission focuses on feeding the hungry, educating the underserved, and offering essential support to people in crisis. Through structured programs and collective action, Welled Foundation aims to reduce hardship, inspire hope, and guide individuals toward a more stable and dignified life.
              </p>
            </div>

            {/* Vision Section */}
            <div 
              className="group glass rounded-3xl p-10 shadow-xl hover:shadow-2xl border border-secondary-100/50 transition-all duration-500 transform hover:-translate-y-2 card-hover"
              data-aos="fade-left"
              data-aos-delay="200"
            >
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-blue-gradient rounded-t-3xl"></div>
              <div className="mb-6">
                <div className="w-16 h-1.5 bg-blue-gradient rounded-full mb-6"></div>
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                  <span className="bg-gradient-to-r from-secondary-600 to-secondary-500 bg-clip-text text-transparent">Empowering Lives. Restoring Hope.</span>
                </h3>
                <p className="text-lg text-gray-700 mb-6 font-semibold">
                  Bridging gaps in health, learning, and opportunity for a stronger tomorrow.
                </p>
                  </div>
              <div className="border-t border-gray-200 pt-6 mb-6">
                <p className="text-gray-700 font-bold text-lg mb-6">
                  Together, we can transform communities.
                </p>
                <div className="w-20 h-1.5 bg-blue-gradient rounded-full"></div>
              </div>
              <p className="text-gray-600 leading-relaxed text-base font-light">
                We envision a future where nourishment, education, and basic support reach every person in need. Through sustainable action and community-driven initiatives, Welled Foundation strives to eliminate hunger, uplift disadvantaged people, and create pathways to growth. Our dream is to empower lives and build a society where compassion drives progress.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Programmes Section */}
      <section id="work" className="py-20 bg-gradient-to-b from-white via-primary-50/20 to-white w-full relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-4xl md:text-5xl font-extrabold gradient-text mb-4">Our Programmes</h2>
            <p className="text-gray-600 max-w-2xl mx-auto font-light">Comprehensive initiatives for sustainable change</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROGRAMS.map((program, index) => {
              return (
                <div 
                  key={index} 
                  className="group relative glass rounded-2xl overflow-hidden shadow-soft border border-gray-100/50 card-hover"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div className="h-1.5 bg-accent-gradient"></div>
                  <div className="p-6">
                    <div className="flex items-start mb-4">
                      <div className="w-16 h-16 rounded-xl bg-accent-gradient flex items-center justify-center text-3xl mr-4 shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                        {program.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-1">{program.title}</h3>
                        <p className="text-xs text-gray-500 uppercase tracking-wide">{program.subtitle}</p>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">{program.detail}</p>
                    <a href="#" className="inline-flex items-center text-primary-600 font-semibold text-sm hover:text-primary-700 group-hover:translate-x-2 transition-all duration-300">
                      Know More
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section id="impact" className="py-24 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white relative overflow-hidden w-full">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%221%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')]"></div>
        </div>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-2xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative w-full z-10">
          <div className="text-center mb-16" data-aos="fade-up">
            <div className="inline-block mb-3 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <span className="text-sm font-semibold uppercase tracking-wider">Making a Difference</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-white via-yellow-100 to-white bg-clip-text text-transparent">
              Our Impact
            </h2>
            <p className="text-lg md:text-xl opacity-90 max-w-3xl mx-auto font-light">
              Real numbers, real change, real impact. See how we're making a difference together.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {/* Meals Served Card */}
            <div 
              className="group relative bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:border-white/40 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-yellow-400/20 overflow-hidden"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              {/* Card Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Top Accent Bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400"></div>
              
              <div className="relative z-10">
                {/* Icon */}
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400/20 to-yellow-500/20 rounded-xl flex items-center justify-center mb-6 backdrop-blur-sm border border-yellow-400/30 group-hover:scale-110 transition-transform duration-500">
                  <svg className="w-8 h-8 text-yellow-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                
                {/* Number */}
                <div className="mb-3">
                  <div className="text-5xl md:text-6xl font-extrabold text-white mb-1">2.5M+</div>
                  <div className="text-xs text-yellow-300/80 font-semibold uppercase tracking-wider">Since 2010</div>
                </div>
                
                {/* Title */}
                <div className="text-xl md:text-2xl font-bold mb-3 text-white">Meals Served</div>
                
                {/* Description */}
                <p className="text-sm md:text-base opacity-80 leading-relaxed mb-4 font-light">
                  Providing nutritious meals to families and children in need across our programs.
                </p>
                
                {/* Progress Indicator */}
                <div className="mt-6 pt-4 border-t border-white/10">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-white/70">Annual Growth</span>
                    <span className="text-yellow-300 font-semibold">+15%</span>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-yellow-400 to-yellow-300 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Schools Supported Card */}
            <div 
              className="group relative bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:border-white/40 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-400/20 overflow-hidden"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              {/* Card Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Top Accent Bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400"></div>
              
              <div className="relative z-10">
                {/* Icon */}
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400/20 to-cyan-500/20 rounded-xl flex items-center justify-center mb-6 backdrop-blur-sm border border-blue-400/30 group-hover:scale-110 transition-transform duration-500">
                  <svg className="w-8 h-8 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                
                {/* Number */}
                <div className="mb-3">
                  <div className="text-5xl md:text-6xl font-extrabold text-white mb-1">500+</div>
                  <div className="text-xs text-blue-300/80 font-semibold uppercase tracking-wider">Active Programs</div>
                </div>
                
                {/* Title */}
                <div className="text-xl md:text-2xl font-bold mb-3 text-white">Schools Supported</div>
                
                {/* Description */}
                <p className="text-sm md:text-base opacity-80 leading-relaxed mb-4 font-light">
                  Enhancing educational infrastructure and resources in underserved communities.
                </p>
                
                {/* Progress Indicator */}
                <div className="mt-6 pt-4 border-t border-white/10">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-white/70">Annual Growth</span>
                    <span className="text-blue-300 font-semibold">+22%</span>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-400 to-cyan-300 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Lives Changed Card */}
            <div 
              className="group relative bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:border-white/40 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-green-400/20 overflow-hidden"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              {/* Card Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Top Accent Bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 via-emerald-400 to-green-400"></div>
              
              <div className="relative z-10">
                {/* Icon */}
                <div className="w-16 h-16 bg-gradient-to-br from-green-400/20 to-emerald-500/20 rounded-xl flex items-center justify-center mb-6 backdrop-blur-sm border border-green-400/30 group-hover:scale-110 transition-transform duration-500">
                  <svg className="w-8 h-8 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                
                {/* Number */}
                <div className="mb-3">
                  <div className="text-5xl md:text-6xl font-extrabold text-white mb-1">50K+</div>
                  <div className="text-xs text-green-300/80 font-semibold uppercase tracking-wider">Lives Transformed</div>
                </div>
                
                {/* Title */}
                <div className="text-xl md:text-2xl font-bold mb-3 text-white">Lives Changed</div>
                
                {/* Description */}
                <p className="text-sm md:text-base opacity-80 leading-relaxed mb-4 font-light">
                  Creating opportunities and transforming lives through our comprehensive programs.
                </p>
                
                {/* Progress Indicator */}
                <div className="mt-6 pt-4 border-t border-white/10">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-white/70">Annual Growth</span>
                    <span className="text-green-300 font-semibold">+18%</span>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-green-400 to-emerald-300 rounded-full" style={{ width: '78%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gradient-to-b from-secondary-50/30 via-white to-primary-50/20 w-full relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="text-center mb-20" data-aos="fade-up">
            <h2 className="text-4xl md:text-6xl font-extrabold gradient-text mb-6">Hear from Our Contributors</h2>
            <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto font-light">
              Trusted partners and supporters share their experiences working with Welled Foundation.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10">
            {TESTIMONIALS.map((testimonial, index) => (
              <div 
                key={index} 
                className="group glass rounded-3xl p-10 shadow-xl hover:shadow-2xl hover:shadow-primary-100/50 transition-all duration-500 transform hover:-translate-y-3 border border-gray-100/50 card-hover"
                data-aos="fade-up"
                data-aos-delay={index * 150}
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-400 via-secondary-400 to-primary-400 rounded-t-3xl"></div>
                <div className="text-6xl mb-6 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">{testimonial.image}</div>
                <p className="text-gray-700 text-lg mb-8 leading-relaxed italic font-light relative pl-6">
                  <span className="absolute left-0 top-0 text-5xl text-primary-200 opacity-30 font-serif leading-none">&ldquo;</span>
                  {testimonial.quote}
                </p>
                <div className="border-t border-gray-200 pt-6">
                  <div className="font-bold text-gray-900 text-xl mb-1">{testimonial.name}</div>
                  <div className="text-gray-600 font-medium text-sm">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stories Section */}
      <section id="stories" className="py-24 bg-gradient-to-b from-primary-50/20 via-white to-secondary-50/20 w-full relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="text-center mb-20" data-aos="fade-up">
            <h2 className="text-4xl md:text-6xl font-extrabold gradient-text mb-6">Impact Stories</h2>
            <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto font-light">
              Hear from the people whose lives have been transformed by our programs.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10">
            {STORIES.map((story, index) => (
              <div 
                key={index} 
                className="group glass rounded-3xl p-10 shadow-xl hover:shadow-2xl hover:shadow-primary-100/50 transition-all duration-500 transform hover:-translate-y-3 border border-gray-100/50 card-hover"
                data-aos="fade-up"
                data-aos-delay={index * 150}
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-accent-gradient rounded-t-3xl"></div>
                <div className="text-6xl mb-6 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">{story.image}</div>
                <div className="text-primary-600 text-sm mb-6 font-semibold uppercase tracking-wide">{story.location}</div>
                <p className="text-gray-700 text-lg mb-8 leading-relaxed italic font-light relative pl-6">
                  <span className="absolute left-0 top-0 text-5xl text-primary-200 opacity-30 font-serif leading-none">&ldquo;</span>
                  {story.quote}
                </p>
                <div className="border-t border-gray-200 pt-6">
                  <div className="font-bold text-gray-900 text-xl mb-1">{story.name}</div>
                  <div className="text-gray-600 font-medium">{story.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Updates Section */}
      <section className="py-24 bg-white w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6">Latest Updates</h2>
            <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto font-light">
              Stay informed about our latest initiatives, milestones, and impact stories.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {UPDATES.map((update, index) => (
              <div 
                key={index}
                className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-primary-100 text-primary-600 text-xs font-semibold rounded-full uppercase tracking-wide">
                      {update.category}
                    </span>
                    <span className="text-sm text-gray-500">{update.date}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 leading-tight">{update.title}</h3>
                  <p className="text-gray-600 leading-relaxed mb-6 font-light">{update.excerpt}</p>
                  <a href="#" className="text-primary-600 font-semibold hover:text-primary-700 inline-flex items-center group">
                    Read More
                    <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12" data-aos="fade-up" data-aos-delay="300">
                <button className="px-8 py-4 bg-primary-50 text-primary-700 font-semibold rounded-xl hover:bg-primary-100 transition-all duration-300 border border-primary-200">
                  View All Updates
                </button>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section id="contact" className="py-24 bg-white relative w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6">Get in Touch</h2>
            <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto font-light">
              Have a question, want to partner with us, or need more information? We'd love to hear from you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div 
              className="bg-white rounded-3xl shadow-xl p-8 md:p-10 border border-gray-100"
              data-aos="fade-right"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h3>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700 mb-2">
                      First Name <span className="text-primary-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700 mb-2">
                      Last Name <span className="text-primary-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address <span className="text-primary-600">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                    placeholder="john.doe@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                    placeholder="+91-9876543210"
                  />
                </div>

                <div>
                  <label htmlFor="organization" className="block text-sm font-semibold text-gray-700 mb-2">
                    Organization / Company
                  </label>
                  <input
                    type="text"
                    id="organization"
                    name="organization"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                    placeholder="Company Name (Optional)"
                  />
                </div>

                <div>
                  <label htmlFor="inquiryType" className="block text-sm font-semibold text-gray-700 mb-2">
                    Type of Inquiry <span className="text-primary-600">*</span>
                  </label>
                  <select
                    id="inquiryType"
                    name="inquiryType"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
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
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                    Message <span className="text-primary-600">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 resize-none"
                    placeholder="Tell us how we can help you..."
                  ></textarea>
                </div>

                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="newsletter"
                    name="newsletter"
                    className="mt-1 w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  />
                  <label htmlFor="newsletter" className="ml-3 text-sm text-gray-600">
                    I would like to receive updates about Welled Foundation's programs and initiatives
                  </label>
                </div>

                <button
                  type="submit"
                  className="btn-premium w-full px-8 py-4 bg-accent-gradient text-white font-semibold rounded-xl hover:shadow-glow-primary transform hover:scale-105 transition-all duration-300 shadow-premium"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div 
              className="space-y-8"
              data-aos="fade-left"
            >
              <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10 border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-12 h-12 bg-accent-gradient rounded-xl flex items-center justify-center shadow-lg">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-semibold text-gray-900 mb-1">Office Address</h4>
                      <p className="text-gray-600 leading-relaxed">
                        123 Foundation Street,<br />
                        Community Center Building,<br />
                        City - 560001, State, Country
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-12 h-12 bg-accent-gradient rounded-xl flex items-center justify-center shadow-lg">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-semibold text-gray-900 mb-1">Email</h4>
                      <a href="mailto:info@welledfoundation.org" className="text-primary-600 hover:text-primary-700 transition-colors">
                        info@welledfoundation.org
                      </a>
                      <br />
                      <a href="mailto:partnerships@welledfoundation.org" className="text-primary-600 hover:text-primary-700 transition-colors">
                        partnerships@welledfoundation.org
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-12 h-12 bg-accent-gradient rounded-xl flex items-center justify-center shadow-lg">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-semibold text-gray-900 mb-1">Phone</h4>
                      <a href="tel:+9118001234567" className="text-primary-600 hover:text-primary-700 transition-colors">
                        +91-1800-123-4567
                      </a>
                      <br />
                      <a href="tel:+919876543210" className="text-primary-600 hover:text-primary-700 transition-colors">
                        +91-98765-43210
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-12 h-12 bg-accent-gradient rounded-xl flex items-center justify-center shadow-lg">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-semibold text-gray-900 mb-1">Office Hours</h4>
                      <p className="text-gray-600">
                        Monday - Friday: 9:00 AM - 6:00 PM<br />
                        Saturday: 10:00 AM - 2:00 PM<br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-600 rounded-3xl p-8 md:p-10 text-white">
                <h3 className="text-2xl font-bold mb-4">Quick Links</h3>
                <ul className="space-y-3">
                  <li>
                    <a href="#about" className="hover:underline flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      About Us
                    </a>
                  </li>
                  <li>
                    <a href="#work" className="hover:underline flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      Our Programs
                    </a>
                  </li>
                  <li>
                    <a href="#get-involved" className="hover:underline flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      Get Involved
                    </a>
                  </li>
                  <li>
                    <a href="#impact" className="hover:underline flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      Our Impact
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Get Involved Section */}
      <section id="get-involved" className="py-24 bg-gradient-to-b from-white via-primary-50/30 to-white relative w-full">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative w-full z-10">
          <div 
            className="bg-blue-gradient rounded-3xl p-12 md:p-20 text-white text-center shadow-2xl relative overflow-hidden"
            data-aos="zoom-in"
          >
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%221%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')]"></div>
            </div>
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
            </div>
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">Make a Difference Today</h2>
              <p className="text-xl md:text-2xl opacity-95 max-w-3xl mx-auto mb-10 font-light">
              Join us in creating lasting change. Your support can transform lives and build stronger communities.
            </p>
              <div className="flex flex-col sm:flex-row gap-5 justify-center" data-aos="fade-up" data-aos-delay="200">
                <Link to="/donate" className="btn-premium px-10 py-4 bg-white text-primary-600 text-lg font-bold rounded-xl hover:bg-primary-50 hover:shadow-xl transform hover:scale-105 transition-all duration-300 shadow-premium">
                  Donate Now
                </Link>
                <button className="px-10 py-4 glass-dark text-white text-lg font-semibold rounded-xl border-2 border-white/50 hover:bg-white/30 hover:border-white transform hover:scale-105 transition-all duration-300">
                Volunteer
              </button>
                <button className="px-10 py-4 glass-dark text-white text-lg font-semibold rounded-xl border-2 border-white/50 hover:bg-white/30 hover:border-white transform hover:scale-105 transition-all duration-300">
                Partner With Us
              </button>
              </div>
              <div className="mt-12 flex flex-wrap justify-center gap-8 text-white/90" data-aos="fade-up" data-aos-delay="300">
                <div className="text-center glass-dark rounded-xl p-4 border border-white/20">
                  <div className="text-3xl font-bold mb-1">16+</div>
                  <div className="text-sm opacity-80">States Reached</div>
                </div>
                <div className="text-center glass-dark rounded-xl p-4 border border-white/20">
                  <div className="text-3xl font-bold mb-1">78+</div>
                  <div className="text-sm opacity-80">Active Locations</div>
                </div>
                <div className="text-center glass-dark rounded-xl p-4 border border-white/20">
                  <div className="text-3xl font-bold mb-1">15+</div>
                  <div className="text-sm opacity-80">Years of Service</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default Home

