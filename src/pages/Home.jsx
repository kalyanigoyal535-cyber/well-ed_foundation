import { useEffect, useState } from 'react'
import AOS from 'aos'
































































































































































































































































































































import { Link, useLocation } from 'react-router-dom'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import { STATS, PROGRAMS } from '../constants/data'

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
  
  // About Us expand/collapse state
  const [isAboutExpanded, setIsAboutExpanded] = useState(false)

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

  // Initialize AOS on component mount
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      mirror: false,
      offset: 100,
    })
  }, [])

  useEffect(() => {
    // Smooth scroll to top when page loads or route changes
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    // Refresh AOS after a short delay to ensure DOM is ready
    const timer = setTimeout(() => {
      AOS.refresh()
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

  // Impact Stories Carousel
  const impactStories = [
    {
      name: 'Sunita',
      title: 'A Homemaker from a Resettlement Colony',
      description: 'Sunita believed constant fatigue was a normal part of daily life. Through a community wellness session, she learned about basic nutrition and hydration. Small changes in her routine helped her feel more energetic and confident about her health.',
      image: '/impact-sunita.jpg',
      badge: 'WELLNESS CHAMPION'
    },
    {
      name: 'Irfan',
      title: 'A College Student',
      description: 'Irfan struggled with anxiety but never spoke about it. A mental wellness awareness session helped him understand that mental health matters too. Today, he openly talks about stress and encourages others to seek support early.',
      image: '/impact-irfan.jpg',
      badge: 'MENTAL HEALTH ADVOCATE'
    },
    {
      name: 'Rekha',
      title: 'A Daily Wage Worker',
      description: 'Rekha often ignored minor health issues due to lack of information. After attending a health outreach camp, she learned to recognize early warning signs and seek timely help, preventing bigger problems later.',
      image: '/impact-rekha.jpg',
      badge: 'HEALTH AWARENESS LEADER'
    },
    {
      name: 'Aman',
      title: 'A School Student',
      description: 'Aman had difficulty concentrating in school. Wellness education sessions helped his family understand the role of nutrition and sleep. Simple changes improved his focus and learning ability.',
      image: '/impact-aman.jpg',
      badge: 'STUDENT SUCCESS'
    },
    {
      name: 'Community',
      title: 'A Community That Started Talking About Health',
      description: 'In one community, health was rarely discussed. Regular outreach sessions created a safe space for conversation. Slowly, people began asking questions, sharing experiences, and supporting each other\'s well-being.',
      image: '/impact-community.jpg',
      badge: 'COMMUNITY TRANSFORMATION'
    }
  ]
  
  const [currentStory, setCurrentStory] = useState(0)
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)
  
  // Auto-play impact stories carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStory((prev) => (prev + 1) % impactStories.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [impactStories.length])
  
  const nextStory = () => {
    setCurrentStory((prev) => (prev + 1) % impactStories.length)
  }
  
  const prevStory = () => {
    setCurrentStory((prev) => (prev - 1 + impactStories.length) % impactStories.length)
  }
  
  const goToStory = (index) => {
    setCurrentStory(index)
  }
  
  // Touch handlers for swipe
  const minSwipeDistance = 50
  
  const onTouchStart = (e) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }
  
  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }
  
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance
    if (isLeftSwipe) {
      nextStory()
    }
    if (isRightSwipe) {
      prevStory()
    }
  }

  return (
    <div className="App bg-white w-full">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section with Banner Carousel */}
      <section id="banner" className="relative w-full overflow-hidden mt-20 sm:mt-24 md:mt-24 lg:mt-28 xl:mt-32" data-aos="fade-in">
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
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2 md:gap-3" data-aos="fade-up" data-aos-delay="300">
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
      <section id="about" className="pt-4 pb-12 sm:pt-6 sm:pb-16 md:pt-8 md:pb-20 bg-gradient-to-b from-white via-primary-50/20 to-white w-full relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-48 h-48 bg-primary-200/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-64 h-64 bg-yellow-200/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
          <div className="mx-auto">
            <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-center">
              {/* Left Side Enhancement */}
              <div className="hidden lg:block lg:col-span-2 space-y-4" data-aos="fade-right" data-aos-delay="150">
                {/* Community Card - Yellow */}
                <div className="group relative bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-4 border-2 border-yellow-200/60 shadow-lg hover:shadow-2xl hover:shadow-yellow-200/50 transition-all duration-500 hover:-translate-y-2 overflow-hidden" data-aos="zoom-in" data-aos-delay="200">
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
                <div className="group relative bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl p-4 border-2 border-primary-200/60 shadow-lg hover:shadow-2xl hover:shadow-primary-200/50 transition-all duration-500 hover:-translate-y-2 overflow-hidden" data-aos="zoom-in" data-aos-delay="250">
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
                          Well-Ed Foundation was created with a simple intention — to stand with people where they are.
                        </span>
                      </p>
                    </div>
                  </div>
                  
                  {/* Description */}
                  <div className="mb-6 sm:mb-8 space-y-4" data-aos="fade-up" data-aos-delay="200">
                    <p className="text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed">
                      We understand that health is often not ignored by choice. For many individuals and families, it takes a back seat because daily responsibilities are heavy, resources are limited, and reliable guidance is hard to find. We understand the confusion, the hesitation, and the quiet concerns people carry about their well-being.
                    </p>
                    
                    {/* Expandable Content */}
                    {isAboutExpanded && (
                      <div className="space-y-4 transition-all duration-500 ease-in-out">
                        <p className="text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed">
                          At Well-Ed Foundation, we listen before we act. We engage with communities with empathy and respect, acknowledging their realities and lived experiences. Our work is rooted in the belief that every person deserves the opportunity to understand their own health, regardless of background or circumstance.
                        </p>
                        
                        <p className="text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed">
                          We focus on making <span className="font-semibold text-primary-700">wellness education simple, accessible, and meaningful</span>, especially for those who are underserved. By sharing clear, practical health knowledge, we help individuals take small but confident steps toward caring for themselves and their families.
                        </p>
                      </div>
                    )}
                    
                    {/* Know More Button */}
                    <div className="flex justify-start pt-2">
                      <button
                        onClick={() => setIsAboutExpanded(!isAboutExpanded)}
                        className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-primary-700 hover:text-primary-800 bg-primary-50 hover:bg-primary-100 rounded-md transition-all duration-300 shadow-sm hover:shadow border border-primary-200 hover:border-primary-300"
                      >
                        <span>{isAboutExpanded ? 'Show Less' : 'Know More'}</span>
                        <svg 
                          className={`w-3 h-3 transition-transform duration-300 ${isAboutExpanded ? 'rotate-180' : ''}`}
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    </div>
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
                      <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-800">Our Name, Our Promise</h3>
                    </div>
                    <div className="space-y-3">
                      <p className="text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed font-semibold">
                        <span className="text-lg sm:text-xl md:text-2xl font-extrabold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">Well-Ed</span> stands for <span className="text-primary-700 font-bold">Wellness Education</span> — education that supports, not overwhelms.
                      </p>
                      <p className="text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed font-semibold">
                        It reflects our promise to guide without judgment and to help without conditions.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
              </div>

              {/* Right Side Enhancement */}
              <div className="hidden lg:block lg:col-span-2 space-y-4" data-aos="fade-left" data-aos-delay="150">
                {/* Education Card - Green */}
                <div className="group relative bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border-2 border-green-200/60 shadow-lg hover:shadow-2xl hover:shadow-green-200/50 transition-all duration-500 hover:-translate-y-2 overflow-hidden" data-aos="zoom-in" data-aos-delay="200">
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
                <div className="group relative bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border-2 border-blue-200/60 shadow-lg hover:shadow-2xl hover:shadow-blue-200/50 transition-all duration-500 hover:-translate-y-2 overflow-hidden" data-aos="zoom-in" data-aos-delay="250">
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
          
          {/* Two Cards Row */}
          <div className="mt-8 sm:mt-10 md:mt-12 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6" data-aos="fade-up" data-aos-delay="350">
            {/* Our Mission Card */}
            <div className="group relative bg-white/90 backdrop-blur-sm rounded-xl p-4 md:p-5 shadow-lg border border-primary-200/50 hover:shadow-xl transition-all duration-300 overflow-hidden" data-aos="fade-right" data-aos-delay="400">
              {/* Top Accent Bar */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary-500 via-primary-600 to-primary-700"></div>
              
              {/* Icon */}
              <div className="mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center shadow-md transform group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
              </div>
              
              <h3 className="text-lg md:text-xl font-bold text-primary-700 mb-3">Our Mission</h3>
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed mb-2">
                Our mission is to make wellness education accessible to all, with special focus on underprivileged and underserved communities.
              </p>
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                We work to bridge the gaps created by lack of awareness, limited access, and social barriers that prevent people from understanding and managing their health. Through education, outreach, and community engagement, we aim to empower individuals with knowledge that is practical, respectful, and relevant to their everyday lives.
              </p>
            </div>

            {/* Our Commitment Card */}
            <div className="group relative bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 rounded-xl p-4 md:p-5 shadow-lg text-white hover:shadow-xl transition-all duration-300 overflow-hidden" data-aos="fade-left" data-aos-delay="400">
              {/* Decorative Background */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full blur-xl"></div>
              
              <div className="relative z-10">
                {/* Icon */}
                <div className="mb-3">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center shadow-md transform group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                </div>
                
                <h3 className="text-lg md:text-xl font-bold mb-3">Our Commitment</h3>
                <p className="text-xs sm:text-sm leading-relaxed mb-2">
                  At Well-Ed Foundation, wellness is inclusive and compassionate.
                </p>
                <p className="text-xs sm:text-sm leading-relaxed opacity-95">
                  We are committed to walking alongside individuals and communities — listening, learning, and supporting them — because wellness should never be selective, and no one should feel alone on their journey to better health.
                </p>
              </div>
            </div>
          </div>
          
          {/* Bottom Decorative Elements */}
          <div className="mt-8 sm:mt-10 flex justify-center gap-3" data-aos="fade-up" data-aos-delay="400">
            <div className="w-2 h-2 bg-primary-400 rounded-full"></div>
            <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
            <div className="w-2 h-2 bg-primary-400 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="impact" className="py-8 md:py-10 bg-gradient-to-br from-primary-50 via-yellow-50/40 to-primary-50 relative w-full overflow-hidden">
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
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-6 md:mb-8" data-aos="fade-up">
            <div className="inline-block mb-2 px-3 py-1 bg-gray-800 rounded-full shadow-md transform hover:scale-105 transition-transform duration-300">
              <span className="text-[10px] font-bold text-white uppercase tracking-wider">Making a Difference</span>
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold mb-2 text-gray-900">
              OUR IMPACT
            </h2>
            <p className="text-sm md:text-base text-gray-700 max-w-2xl mx-auto font-medium mb-2">
              Real numbers, real change, real impact
            </p>
            <div className="w-20 h-0.5 bg-gradient-to-r from-primary-500 to-success-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
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
                  className="group relative bg-white/90 backdrop-blur-sm rounded-xl p-2 md:p-3 text-center border-2 border-white/60 hover:border-white shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 overflow-hidden"
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
                    <div className="relative mb-2 flex justify-center">
                      <div className={`w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br ${theme.gradient} rounded-lg flex items-center justify-center shadow-xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 relative overflow-hidden border border-white/50`}>
                        {/* Shimmer Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                        <svg className="w-5 h-5 md:w-6 md:h-6 text-white transform group-hover:scale-110 transition-transform duration-500 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
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
                    <div className="mb-1">
                      <div className={`text-xl md:text-2xl lg:text-3xl font-extrabold bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent mb-1 transform group-hover:scale-105 transition-transform duration-300`}>
                        {stat.number}
                      </div>
                      {/* Animated Underline - Always Visible */}
                      <div className={`h-0.5 bg-gradient-to-r ${theme.gradient} w-full mx-auto rounded-full`}></div>
                    </div>
                    
                    {/* Label */}
                    <div className={`text-[9px] md:text-[10px] font-bold ${theme.text} uppercase tracking-wider mb-1 transform group-hover:translate-y-[-1px] transition-transform duration-300`}>
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

      {/* Our Programmes Section - Full Width Creative Design */}
      <section id="work" className="pt-4 md:pt-6 pb-20 md:pb-28 bg-white w-full" style={{ backgroundColor: '#ffffff' }}>
        <div className="w-full">
          {/* Header */}
          <div className="text-center mb-16 md:mb-20" data-aos="fade-up">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold mb-6 text-blue-900">
              Our Programmes
            </h2>
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-yellow-400"></div>
              <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
              <div className="w-12 h-0.5 bg-gradient-to-r from-yellow-400 to-transparent"></div>
            </div>
            <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto font-medium">
              Empowering communities through comprehensive educational and wellness initiatives
            </p>
          </div>
          
          {/* Program Cards - 3 Column Grid Layout */}
          <div className="w-full relative">
            {/* Left Decorative Elements */}
            <div className="hidden lg:flex absolute left-4 top-0 bottom-0 w-48 items-center justify-center pointer-events-none z-0">
              <div className="relative w-full h-full flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-100/50 via-blue-100/40 to-cyan-100/50 rounded-3xl blur-2xl"></div>
                <div className="relative text-8xl opacity-25">📚</div>
                <div className="absolute top-10 left-10 w-24 h-24 bg-indigo-200/30 rounded-full blur-xl"></div>
                <div className="absolute bottom-10 right-10 w-20 h-20 bg-cyan-200/30 rounded-full blur-xl"></div>
              </div>
            </div>
            
            {/* Right Decorative Elements */}
            <div className="hidden lg:flex absolute right-4 top-0 bottom-0 w-48 items-center justify-center pointer-events-none z-0">
              <div className="relative w-full h-full flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-100/50 via-purple-100/40 to-rose-100/50 rounded-3xl blur-2xl"></div>
                <div className="relative text-8xl opacity-25">💡</div>
                <div className="absolute top-10 right-10 w-24 h-24 bg-violet-200/30 rounded-full blur-xl"></div>
                <div className="absolute bottom-10 left-10 w-20 h-20 bg-rose-200/30 rounded-full blur-xl"></div>
              </div>
            </div>
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 relative z-10">
              {PROGRAMS.map((program, index) => {
                // Mood board color palette - Yellow, Dark Blue, Light Blue, Green
                const colorGradients = [
                  'from-blue-700 via-blue-800 to-blue-900', // Dark Blue - Educational Bridge
                  'from-yellow-400 via-yellow-500 to-yellow-600', // Bright Yellow - Digital Literacy
                  'from-blue-400 via-blue-500 to-blue-600', // Light Blue - Health & Wellness
                  'from-green-400 via-green-500 to-green-600', // Bright Green - Nutrition
                  'from-yellow-500 via-yellow-600 to-amber-500', // Yellow variant - Mobile Library
                  'from-emerald-500 via-green-600 to-teal-600' // Green shade - Mentorship
                ]
                const bgGradients = [
                  'from-blue-50 via-blue-100/70 to-white',
                  'from-yellow-50 via-yellow-100/70 to-white',
                  'from-blue-50 via-sky-100/70 to-white',
                  'from-green-50 via-green-100/70 to-white',
                  'from-yellow-50 via-amber-50/70 to-white',
                  'from-emerald-50 via-green-100/70 to-white'
                ]
                
                // Clean SVG icons for each program
                const programIcons = [
                  // 0: Educational Bridge - Book/Education icon
                  <svg key="education" className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>,
                  // 1: Digital Literacy - Laptop/Computer icon
                  <svg key="digital" className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>,
                  // 2: Health & Wellness - Heart/Health icon
                  <svg key="health" className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>,
                  // 3: Nutrition - Food/Meal icon
                  <svg key="nutrition" className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>,
                  // 4: Mobile Library - Book stack icon
                  <svg key="library" className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>,
                  // 5: Mentorship - Users/People icon
                  <svg key="mentorship" className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                ]
                
                return (
                  <div 
                    key={index}
                    className="relative group h-full"
                    data-aos="fade-up"
                    data-aos-delay={index * 100}
                  >
                    {/* Background Card with Gradient */}
                    <div className={`relative h-full rounded-2xl overflow-hidden bg-gradient-to-br ${bgGradients[index]} border-2 border-white/80 shadow-lg hover:shadow-xl transition-all duration-700 transform hover:-translate-y-1 flex flex-col`}>
                      {/* Animated Gradient Overlay */}
                      <div className={`absolute inset-0 bg-gradient-to-r ${colorGradients[index]} opacity-0 group-hover:opacity-10 transition-opacity duration-700`}></div>
                      
                      {/* Top Accent Line */}
                      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${colorGradients[index]} shadow-md`}></div>
                      
                      {/* Content Container */}
                      <div className="relative flex flex-col items-center text-center gap-2 md:gap-3 p-3 md:p-4 flex-grow">
                        {/* Icon Section */}
                        <div className="flex-shrink-0 relative">
                          {/* Floating Icon Container */}
                          <div className="relative">
                            {/* Outer Glow Ring */}
                            <div className={`absolute inset-0 bg-gradient-to-r ${colorGradients[index]} rounded-full blur-2xl opacity-30 group-hover:opacity-50 group-hover:scale-150 transition-all duration-700`}></div>
                            
                            {/* Icon Blob Container */}
                            <div 
                              className={`relative w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-gradient-to-br ${colorGradients[index]} flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-700 shadow-xl border-2 border-white/50 mx-auto`}
                              style={{
                                borderRadius: index === 0 ? '35% 65% 65% 35% / 35% 35% 65% 65%' :
                                              index === 1 ? '65% 35% 35% 65% / 65% 65% 35% 35%' :
                                              index === 2 ? '50% 50% 50% 50% / 60% 40% 60% 40%' :
                                              index === 3 ? '40% 60% 60% 40% / 40% 60% 40% 60%' :
                                              index === 4 ? '60% 40% 40% 60% / 50% 50% 50% 50%' :
                                              '45% 55% 55% 45% / 55% 45% 55% 45%'
                              }}
                            >
                              {/* Icon with Animation */}
                              <div className="relative z-10 transform group-hover:scale-125 transition-transform duration-700">
                                {programIcons[index]}
                              </div>
                              
                              {/* Inner Glow */}
                              <div 
                                className={`absolute inset-3 bg-gradient-to-br ${colorGradients[index]} opacity-30 blur-xl rounded-full`}
                              ></div>
                              
                              {/* Floating Particles */}
                              <div className={`absolute -top-2 -right-2 w-3 h-3 bg-gradient-to-br ${colorGradients[index]} rounded-full opacity-60 group-hover:animate-ping`}></div>
                              <div className={`absolute -bottom-2 -left-2 w-2 h-2 bg-gradient-to-br ${colorGradients[index]} rounded-full opacity-40 group-hover:animate-ping`} style={{ animationDelay: '0.3s' }}></div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Content Section */}
                        <div className="flex-1 flex flex-col items-center justify-between w-full">
                          {/* Program Number Badge */}
                          <div className="inline-flex items-center gap-1.5 mb-2 px-2 py-0.5 bg-white/80 backdrop-blur-sm rounded-full shadow-md">
                            <span className={`text-[10px] font-black bg-gradient-to-r ${colorGradients[index]} bg-clip-text text-transparent`}>
                              #{String(index + 1).padStart(2, '0')}
                            </span>
                            <div className={`w-0.5 h-0.5 rounded-full bg-gradient-to-r ${colorGradients[index]}`}></div>
                          </div>
                          
                          {/* Title */}
                          <h3 className={`text-sm md:text-base lg:text-base font-extrabold mb-1.5 md:mb-2 bg-gradient-to-r ${colorGradients[index]} bg-clip-text text-transparent leading-tight`}>
                            {program.title}
                          </h3>
                          
                          {/* Description */}
                          <p className="text-[10px] md:text-xs text-gray-700 leading-relaxed font-medium mb-2 flex-grow">
                            {program.detail}
                          </p>
                          
                          {/* Decorative Line */}
                          <div className="flex items-center justify-center gap-1.5 w-full mt-auto">
                            <div className={`w-6 h-0.5 bg-gradient-to-r ${colorGradients[index]} rounded-full`}></div>
                            <div className={`w-1.5 h-1.5 bg-gradient-to-r ${colorGradients[index]} rounded-full`}></div>
                            <div className={`w-4 h-0.5 bg-gradient-to-r ${colorGradients[index]} rounded-full`}></div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Bottom Shine Effect */}
                      <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700`}></div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          
          {/* Bottom Decorative Elements */}
          <div className="flex justify-center items-center gap-4 mt-12 md:mt-16" data-aos="fade-up" data-aos-delay="600">
            <div className="w-3 h-3 bg-indigo-600 rounded-full animate-pulse"></div>
            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-indigo-600 to-transparent"></div>
            <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-emerald-500 to-transparent"></div>
            <div className="w-3 h-3 bg-violet-600 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }}></div>
          </div>
        </div>
      </section>


      {/* Impact Stories Carousel Section */}
      <section id="stories" className="pt-4 md:pt-6 pb-8 md:pb-12 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white relative overflow-hidden w-full">
        {/* Dark overlay background */}
        <div className="absolute inset-0 bg-black/40"></div>
        
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%221%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <div className="text-center mb-4 sm:mb-6 md:mb-8" data-aos="fade-up">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold mb-2 md:mb-3 text-white">
              Impact Stories
            </h2>
            <div className="w-20 sm:w-24 h-0.5 sm:h-1 bg-green-500 mx-auto rounded-full"></div>
          </div>

          {/* Carousel */}
          <div 
            className="relative"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {impactStories.map((story, index) => (
              <div
                key={index}
                className={`transition-opacity duration-700 ${
                  index === currentStory ? 'opacity-100' : 'opacity-0 absolute inset-0 pointer-events-none'
                }`}
              >
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-6">
                    {/* Image Section */}
                    <div className="relative md:col-span-2" data-aos="fade-right" data-aos-delay="200">
                      <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-yellow-400/20 to-orange-400/20 aspect-[4/3] md:aspect-[4/3]">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center p-3 md:p-4 lg:p-6">
                            <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-yellow-400 mb-1">
                              {story.name === 'Community' ? 'Community' : story.name.split(' ')[0]}
                            </div>
                            <div className="text-white text-[10px] sm:text-xs md:text-sm mb-2">
                              {story.name === 'Community' ? 'Transforming Lives Through' : 'Transformed Through'}
                            </div>
                            <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-extrabold text-yellow-400 mb-3 md:mb-4">{story.badge}</div>
                            <div className="inline-block px-2 py-1 md:px-3 md:py-1.5 bg-white rounded-lg border-2 border-green-500">
                              <span className="text-green-600 font-bold text-[10px] sm:text-xs">{story.badge}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Content Section */}
                    <div className="flex flex-col justify-center md:col-span-3" data-aos="fade-left" data-aos-delay="300">
                      <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-extrabold mb-2 md:mb-3 text-white leading-tight">
                        {story.name === 'Community' ? story.title : `${story.name}, ${story.title}`}
                      </h3>
                      <p className="text-xs sm:text-sm md:text-base text-white/90 leading-relaxed">
                        {story.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            
            {/* Navigation Arrows - Hidden but functional */}
            <button
              onClick={prevStory}
              className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 opacity-0 cursor-pointer z-20"
              aria-label="Previous story"
            >
            </button>
            <button
              onClick={nextStory}
              className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 opacity-0 cursor-pointer z-20"
              aria-label="Next story"
            >
            </button>
            
            {/* Dots Indicator */}
            <div className="flex justify-center gap-1.5 sm:gap-2 mt-4 sm:mt-6" data-aos="fade-up" data-aos-delay="400">
              {impactStories.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToStory(index)}
                  className={`transition-all duration-300 rounded-full ${
                    index === currentStory
                      ? 'w-8 sm:w-10 h-1.5 sm:h-2 bg-green-500'
                      : 'w-1.5 sm:w-2 h-1.5 sm:h-2 bg-white/30 hover:bg-white/50'
                  }`}
                  aria-label={`Go to story ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section id="contact" className="py-8 sm:py-10 md:py-12 lg:py-16 bg-gray-50 relative w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6 sm:mb-8 md:mb-10" data-aos="fade-up">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-2 md:mb-3">Get in Touch</h2>
            <div className="w-16 sm:w-20 h-0.5 bg-blue-900 mx-auto rounded-full mb-2"></div>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
              Have a question, want to partner with us, or need more information? We'd love to hear from you.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
            {/* Contact Form */}
            <div 
              className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-5 md:p-5 lg:p-6 border border-gray-200"
              data-aos="fade-right"
            >
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-3">
                <div className="w-10 h-10 sm:w-11 sm:h-11 bg-blue-900 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">Send us a Message</h3>
              </div>
              <form className="space-y-2.5 sm:space-y-3 md:space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 md:gap-3">
                  <div>
                    <label htmlFor="firstName" className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-1.5">
                      First Name <span className="text-blue-900">*</span>
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      className="w-full px-3 py-2 sm:py-2.5 text-sm sm:text-base bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-800 focus:border-blue-900 transition-all duration-200"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-1.5">
                      Last Name <span className="text-blue-900">*</span>
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      className="w-full px-3 py-2 sm:py-2.5 text-sm sm:text-base bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-800 focus:border-blue-900 transition-all duration-200"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-1.5">
                    Email Address <span className="text-blue-900">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-3 sm:px-3.5 py-2 sm:py-2.5 text-sm sm:text-base bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-800 focus:border-blue-900 transition-all duration-200"
                    placeholder="john.doe@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-1.5">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full px-3 sm:px-3.5 py-2 sm:py-2.5 text-sm sm:text-base bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-800 focus:border-blue-900 transition-all duration-200"
                    placeholder="+91-9876543210"
                  />
                </div>

                <div>
                  <label htmlFor="organization" className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-1.5">
                    Organization / Company
                  </label>
                  <input
                    type="text"
                    id="organization"
                    name="organization"
                    className="w-full px-3 sm:px-3.5 py-2 sm:py-2.5 text-sm sm:text-base bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-800 focus:border-blue-900 transition-all duration-200"
                    placeholder="Company Name (Optional)"
                  />
                </div>

                <div>
                  <label htmlFor="inquiryType" className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-1.5">
                    Type of Inquiry <span className="text-blue-900">*</span>
                  </label>
                  <select
                    id="inquiryType"
                    name="inquiryType"
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
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-1.5">
                    Message <span className="text-blue-900">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    required
                    className="w-full px-3 sm:px-3.5 py-2 sm:py-2.5 text-sm sm:text-base bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-800 focus:border-blue-900 transition-all duration-200 resize-none"
                    placeholder="Tell us how we can help you..."
                  ></textarea>
                </div>

                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="newsletter"
                    name="newsletter"
                    className="mt-0.5 w-4 h-4 sm:w-4 sm:h-4 text-blue-900 border-gray-300 rounded focus:ring-blue-800 flex-shrink-0"
                  />
                  <label htmlFor="newsletter" className="ml-2 sm:ml-2.5 text-xs sm:text-sm text-gray-600 leading-relaxed">
                    I would like to receive updates about Welled Foundation's programs and initiatives
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

            {/* Contact Information */}
            <div 
              className="space-y-3 sm:space-y-4 md:space-y-5"
              data-aos="fade-left"
            >
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-5 md:p-6 lg:p-7 border border-gray-200" data-aos="fade-up" data-aos-delay="200">
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-900 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">Contact Information</h3>
                </div>
                
                <div className="space-y-3 sm:space-y-4 md:space-y-4">
                  <div className="flex items-start p-3 sm:p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-blue-900 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="ml-3 sm:ml-4">
                      <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-1">Email</h4>
                      <a href="https://mail.google.com/mail/?view=cm&to=welledfoundation@gmail.com" target="_blank" rel="noopener noreferrer" className="text-blue-900 hover:text-blue-800 transition-colors font-medium block text-sm sm:text-base break-words">
                        welledfoundation@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start p-3 sm:p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-blue-900 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div className="ml-3 sm:ml-4">
                      <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-1">Phone</h4>
                      <a href="tel:+9118001234567" className="text-blue-900 hover:text-blue-800 transition-colors font-medium block mb-1 text-sm sm:text-base">
                        +91-1800-123-4567
                      </a>
                      <a href="tel:+919876543210" className="text-blue-900 hover:text-blue-800 transition-colors font-medium text-sm sm:text-base">
                        +91-98765-43210
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-900 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 lg:p-7 text-white shadow-lg" data-aos="fade-up" data-aos-delay="300">
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold">Quick Links</h3>
                </div>
                <ul className="space-y-1 sm:space-y-1.5">
                  <li>
                    <a href="#about" className="flex items-center p-2.5 sm:p-3 rounded-lg hover:bg-white/10 transition-colors duration-200">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      <span className="font-medium text-sm sm:text-base">About Us</span>
                    </a>
                  </li>
                  <li>
                    <a href="#work" className="flex items-center p-2.5 sm:p-3 rounded-lg hover:bg-white/10 transition-colors duration-200">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      <span className="font-medium text-sm sm:text-base">Our Programs</span>
                    </a>
                  </li>
                  <li>
                    <a href="#contact" className="flex items-center p-2.5 sm:p-3 rounded-lg hover:bg-white/10 transition-colors duration-200">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      <span className="font-medium text-sm sm:text-base">Get Involved</span>
                    </a>
                  </li>
                  <li>
                    <a href="#impact" className="flex items-center p-2.5 sm:p-3 rounded-lg hover:bg-white/10 transition-colors duration-200">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      <span className="font-medium text-sm sm:text-base">Our Impact</span>
                    </a>
                  </li>
                </ul>
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

