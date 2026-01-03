import { useState, useEffect, useCallback, useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { SOCIAL_LINKS, CONTACT_INFO } from '../constants/data'
import { handleAnchorClick } from '../utils/smoothScroll'

function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSocialMenuOpen, setIsSocialMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isHomePage = useMemo(() => location.pathname === '/', [location.pathname])

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev)
    setIsSocialMenuOpen(false)
  }, [])

  const toggleSocialMenu = useCallback(() => {
    setIsSocialMenuOpen(prev => !prev)
    setIsMobileMenuOpen(false)
  }, [])

  return (
    <>
    <div className="fixed top-0 left-0 right-0 z-[60] bg-white border-b border-primary-100 shadow-sm">
      <div className="w-full px-2 sm:px-3 md:px-4 xl:px-6 relative">
        <div className="flex justify-between items-center py-1.5 sm:py-2 md:py-2.5 min-h-[36px] sm:min-h-[40px] md:h-11">
          <div className="flex items-center gap-2 sm:gap-4 md:gap-6 flex-1 min-w-0">
            <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-md bg-primary-50 border border-primary-200 flex-shrink-0">
              <svg className="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span className="text-[10px] lg:text-xs 2xl:text-sm font-semibold text-primary-700 whitespace-nowrap">Building Hope, Transforming Lives</span>
            </div>
            
            <div className="flex items-center gap-1.5 sm:gap-3 md:gap-4 xl:gap-6 text-[9px] sm:text-[10px] md:text-xs lg:text-sm flex-shrink-0">
            <a 
              href={`tel:${CONTACT_INFO.phone.replace(/\s/g, '')}`}
              className="flex items-center gap-1 sm:gap-1.5 text-gray-700 hover:text-primary-600 transition-colors duration-300 group whitespace-nowrap"
            >
              <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-primary-600 group-hover:scale-110 transition-transform duration-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="font-medium hidden sm:inline">{CONTACT_INFO.phone}</span>
              <span className="font-medium sm:hidden text-[10px]">{CONTACT_INFO.phone.replace(/[^\d]/g, '').slice(-10)}</span>
            </a>
            <a 
              href={`mailto:${CONTACT_INFO.email}`}
              className="flex items-center gap-1 sm:gap-1.5 text-gray-700 hover:text-primary-600 transition-colors duration-300 group whitespace-nowrap"
            >
              <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-primary-600 group-hover:scale-110 transition-transform duration-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="font-medium hidden sm:inline">{CONTACT_INFO.email}</span>
              <span className="font-medium sm:hidden text-[10px]">Email</span>
            </a>
          </div>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4 flex-shrink-0">
            <Link 
              to="/donate" 
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-md text-[10px] lg:text-xs 2xl:text-sm font-semibold hover:from-primary-700 hover:to-primary-800 transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
              </svg>
              <span>Support a Cause</span>
            </Link>
            
            <div className="flex items-center">
              <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2 px-2 sm:px-3 md:px-3 py-1 sm:py-1.5 md:py-1.5 bg-gradient-to-r from-amber-50 via-yellow-50 to-amber-50 border border-amber-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 group">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 md:w-4 md:h-4 text-amber-600 group-hover:scale-110 transition-transform duration-300 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
                <div className="flex items-center gap-1 sm:gap-1.5 md:gap-1.5">
                  <span className="text-[9px] sm:text-xs md:text-xs font-bold text-amber-700 whitespace-nowrap">Great Place To Work</span>
                  <span className="text-[9px] sm:text-xs md:text-xs font-semibold text-amber-600 whitespace-nowrap">Certified</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <nav className={`fixed top-[36px] sm:top-[40px] md:top-11 left-0 right-0 z-50 transition-all duration-700 w-full max-w-full ${
      isScrolled 
        ? 'bg-white shadow-lg shadow-primary-500/5 border-b border-primary-100' 
        : 'bg-white border-b border-primary-100'
    }`}>
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary-500/30 to-transparent"></div>
      
      <div className="w-full px-2 sm:px-3 md:px-4 lg:px-6 overflow-x-hidden relative">
        <div className="flex justify-between items-center h-16 sm:h-18 md:h-20 lg:h-20 w-full">
          {isHomePage ? (
            <a 
              href="#banner" 
              onClick={(e) => handleAnchorClick(e, 0)}
              className="flex-shrink-0 flex items-center gap-1.5 sm:gap-2 md:gap-3 group relative smooth-scroll"
            >
            <div className="relative flex items-center gap-1.5 sm:gap-2 md:gap-3">
              <div className="relative group-hover:scale-110 transition-transform duration-500">
                <img 
                  src="/logo.png" 
                  alt="Welled Foundation Logo" 
                  className="relative h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 lg:h-12 lg:w-12 xl:h-14 xl:w-14 object-contain"
                  loading="eager"
                  width="56"
                  height="56"
                />
              </div>
              
              <div className="relative group-hover:scale-105 transition-transform duration-500">
                <img 
                  src="/text.png" 
                  alt="Text Logo" 
                  className="h-7 w-auto sm:h-8 sm:w-auto md:h-9 md:w-auto lg:h-10 lg:w-auto xl:h-11 xl:w-auto object-contain"
                  loading="eager"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            </div>
            
            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent-gradient group-hover:w-full transition-all duration-500"></div>
          </a>
          ) : (
            <Link 
              to="/" 
              className="flex-shrink-0 flex items-center gap-1.5 sm:gap-2 md:gap-3 group relative"
            >
              <div className="relative flex items-center gap-1.5 sm:gap-2 md:gap-3">
                <div className="relative group-hover:scale-110 transition-transform duration-500">
                  <img 
                    src="/logo.png" 
                    alt="Welled Foundation Logo" 
                    className="relative h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 lg:h-12 lg:w-12 xl:h-14 xl:w-14 object-contain"
                    loading="eager"
                    width="56"
                    height="56"
                  />
                </div>
                
                <div className="relative group-hover:scale-105 transition-transform duration-500">
                  <img 
                    src="/text.png" 
                    alt="Text Logo" 
                    className="h-7 w-auto sm:h-8 sm:w-auto md:h-9 md:w-auto lg:h-10 lg:w-auto xl:h-11 xl:w-auto object-contain"
                    loading="eager"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
              </div>
              
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent-gradient group-hover:w-full transition-all duration-500"></div>
            </Link>
          )}
          
          <div className="hidden lg:flex items-center space-x-0.5 xl:space-x-1">
            {isHomePage ? (
              <>
                <a 
                  href="#about" 
                  className="px-3 xl:px-4 py-2 text-gray-700 hover:text-primary-600 transition-all duration-300 font-medium text-xs lg:text-sm 2xl:text-base relative group smooth-scroll rounded-md"
                  onClick={(e) => handleAnchorClick(e, 100)}
                >
                  <span className="relative z-10 transition-all duration-300">About</span>
                  <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-primary-500 to-primary-600 group-hover:w-3/4 transition-all duration-300 ease-out rounded-full"></span>
                  <span className="absolute inset-0 bg-primary-50/0 rounded-md group-hover:bg-primary-50 transition-all duration-300 -z-0"></span>
                </a>
                <a 
                  href="#work" 
                  className="px-3 xl:px-4 py-2 text-gray-700 hover:text-primary-600 transition-all duration-300 font-medium text-xs lg:text-sm 2xl:text-base relative group smooth-scroll rounded-md"
                  onClick={(e) => handleAnchorClick(e, 100)}
                >
                  <span className="relative z-10 transition-all duration-300">Our Work</span>
                  <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-primary-500 to-primary-600 group-hover:w-3/4 transition-all duration-300 ease-out rounded-full"></span>
                  <span className="absolute inset-0 bg-primary-50/0 rounded-md group-hover:bg-primary-50 transition-all duration-300 -z-0"></span>
                </a>
                <a 
                  href="#impact" 
                  className="px-3 xl:px-4 py-2 text-gray-700 hover:text-primary-600 transition-all duration-300 font-medium text-xs lg:text-sm 2xl:text-base relative group smooth-scroll rounded-md"
                  onClick={(e) => handleAnchorClick(e, 100)}
                >
                  <span className="relative z-10 transition-all duration-300">Impact</span>
                  <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-primary-500 to-primary-600 group-hover:w-3/4 transition-all duration-300 ease-out rounded-full"></span>
                  <span className="absolute inset-0 bg-primary-50/0 rounded-md group-hover:bg-primary-50 transition-all duration-300 -z-0"></span>
                </a>
                <a 
                  href="#stories" 
                  className="px-3 xl:px-4 py-2 text-gray-700 hover:text-primary-600 transition-all duration-300 font-medium text-xs lg:text-sm 2xl:text-base relative group smooth-scroll rounded-md"
                  onClick={(e) => handleAnchorClick(e, 100)}
                >
                  <span className="relative z-10 transition-all duration-300">Stories</span>
                  <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-primary-500 to-primary-600 group-hover:w-3/4 transition-all duration-300 ease-out rounded-full"></span>
                  <span className="absolute inset-0 bg-primary-50/0 rounded-md group-hover:bg-primary-50 transition-all duration-300 -z-0"></span>
                </a>
                <a 
                  href="#contact" 
                  className="px-3 xl:px-4 py-2 text-gray-700 hover:text-primary-600 transition-all duration-300 font-medium text-xs lg:text-sm 2xl:text-base relative group smooth-scroll rounded-md"
                  onClick={(e) => handleAnchorClick(e, 100)}
                >
                  <span className="relative z-10 transition-all duration-300">Get Involved</span>
                  <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-primary-500 to-primary-600 group-hover:w-3/4 transition-all duration-300 ease-out rounded-full"></span>
                  <span className="absolute inset-0 bg-primary-50/0 rounded-md group-hover:bg-primary-50 transition-all duration-300 -z-0"></span>
                </a>
                <Link 
                  to="/funds" 
                  className="px-3 xl:px-4 py-2 text-gray-700 hover:text-primary-600 transition-all duration-300 font-medium text-xs lg:text-sm 2xl:text-base relative group rounded-md"
                >
                  <span className="relative z-10 transition-all duration-300">Funds</span>
                  <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-primary-500 to-primary-600 group-hover:w-3/4 transition-all duration-300 ease-out rounded-full"></span>
                  <span className="absolute inset-0 bg-primary-50/0 rounded-md group-hover:bg-primary-50 transition-all duration-300 -z-0"></span>
                </Link>
              </>
            ) : (
              <>
                <Link 
                  to="/#about" 
                  className="px-3 xl:px-4 py-2 text-gray-700 hover:text-primary-600 transition-all duration-300 font-medium text-xs lg:text-sm 2xl:text-base relative group rounded-md"
                >
                  <span className="relative z-10 transition-all duration-300">About</span>
                  <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-primary-500 to-primary-600 group-hover:w-3/4 transition-all duration-300 ease-out rounded-full"></span>
                  <span className="absolute inset-0 bg-primary-50/0 rounded-md group-hover:bg-primary-50 transition-all duration-300 -z-0"></span>
                </Link>
                <Link 
                  to="/#work" 
                  className="px-3 xl:px-4 py-2 text-gray-700 hover:text-primary-600 transition-all duration-300 font-medium text-xs lg:text-sm 2xl:text-base relative group rounded-md"
                >
                  <span className="relative z-10 transition-all duration-300">Our Work</span>
                  <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-primary-500 to-primary-600 group-hover:w-3/4 transition-all duration-300 ease-out rounded-full"></span>
                  <span className="absolute inset-0 bg-primary-50/0 rounded-md group-hover:bg-primary-50 transition-all duration-300 -z-0"></span>
                </Link>
                <Link 
                  to="/#impact" 
                  className="px-3 xl:px-4 py-2 text-gray-700 hover:text-primary-600 transition-all duration-300 font-medium text-xs lg:text-sm 2xl:text-base relative group rounded-md"
                >
                  <span className="relative z-10 transition-all duration-300">Impact</span>
                  <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-primary-500 to-primary-600 group-hover:w-3/4 transition-all duration-300 ease-out rounded-full"></span>
                  <span className="absolute inset-0 bg-primary-50/0 rounded-md group-hover:bg-primary-50 transition-all duration-300 -z-0"></span>
                </Link>
                <Link 
                  to="/#stories" 
                  className="px-3 xl:px-4 py-2 text-gray-700 hover:text-primary-600 transition-all duration-300 font-medium text-xs lg:text-sm 2xl:text-base relative group rounded-md"
                >
                  <span className="relative z-10 transition-all duration-300">Stories</span>
                  <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-primary-500 to-primary-600 group-hover:w-3/4 transition-all duration-300 ease-out rounded-full"></span>
                  <span className="absolute inset-0 bg-primary-50/0 rounded-md group-hover:bg-primary-50 transition-all duration-300 -z-0"></span>
                </Link>
                <Link 
                  to="/#contact" 
                  className="px-3 xl:px-4 py-2 text-gray-700 hover:text-primary-600 transition-all duration-300 font-medium text-xs lg:text-sm 2xl:text-base relative group rounded-md"
                >
                  <span className="relative z-10 transition-all duration-300">Get Involved</span>
                  <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-primary-500 to-primary-600 group-hover:w-3/4 transition-all duration-300 ease-out rounded-full"></span>
                  <span className="absolute inset-0 bg-primary-50/0 rounded-md group-hover:bg-primary-50 transition-all duration-300 -z-0"></span>
                </Link>
                <Link 
                  to="/funds" 
                  className="px-3 xl:px-4 py-2 text-gray-700 hover:text-primary-600 transition-all duration-300 font-medium text-xs lg:text-sm 2xl:text-base relative group rounded-md"
                >
                  <span className="relative z-10 transition-all duration-300">Funds</span>
                  <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-primary-500 to-primary-600 group-hover:w-3/4 transition-all duration-300 ease-out rounded-full"></span>
                  <span className="absolute inset-0 bg-primary-50/0 rounded-md group-hover:bg-primary-50 transition-all duration-300 -z-0"></span>
                </Link>
              </>
            )}
          </div>

          <div className="hidden lg:flex items-center gap-3 xl:gap-4">
              <div className="flex items-center gap-2 pr-3 xl:pr-4" role="list" aria-label="Social media links">
              {SOCIAL_LINKS.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 transition-all duration-300 ${social.color} hover:text-white hover:scale-110 hover:shadow-lg group relative overflow-hidden`}
                  aria-label={social.name}
                >
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                    <path d={social.icon} />
                  </svg>
                  <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </a>
              ))}
            </div>

            <div className="flex items-center gap-3 xl:gap-4">
              {isHomePage ? (
                <>
                  <a 
                    href="#contact" 
                    className="group relative px-4 py-2 text-gray-700 font-semibold rounded-lg transition-all duration-300 text-[10px] lg:text-xs 2xl:text-sm border border-gray-200 hover:border-primary-300 hover:bg-primary-50 hover:text-primary-700 hover:shadow-md overflow-hidden smooth-scroll"
                    onClick={(e) => handleAnchorClick(e, 100)}
                  >
                    <span className="relative z-10 flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5 transform group-hover:rotate-12 transition-transform duration-300 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span>Contact Us</span>
                    </span>
                  </a>
                  <Link 
                    to="/donate" 
                    className="group relative px-4 py-2 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-semibold rounded-lg transition-all duration-300 text-[10px] lg:text-xs 2xl:text-sm shadow-md hover:shadow-lg hover:shadow-primary-500/30 transform hover:scale-[1.02] overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5 transform group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                      </svg>
                      <span>Donate Now</span>
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-in-out"></div>
                  </Link>
                </>
              ) : (
                <>
                  <Link 
                    to="/#contact" 
                    className="group relative px-4 py-2 text-gray-700 font-semibold rounded-lg transition-all duration-300 text-[10px] lg:text-xs 2xl:text-sm border border-gray-200 hover:border-primary-300 hover:bg-primary-50 hover:text-primary-700 hover:shadow-md overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5 transform group-hover:rotate-12 transition-transform duration-300 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span>Contact Us</span>
                    </span>
                  </Link>
                  <Link 
                    to="/donate" 
                    className="group relative px-4 py-2 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-semibold rounded-lg transition-all duration-300 text-[10px] lg:text-xs 2xl:text-sm shadow-md hover:shadow-lg hover:shadow-primary-500/30 transform hover:scale-[1.02] overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5 transform group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                      </svg>
                      <span>Donate Now</span>
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-in-out"></div>
                  </Link>
                </>
              )}
            </div>
          </div>

          <div className="lg:hidden flex items-center gap-2 sm:gap-3">
            <Link 
              to="/donate" 
              className="group relative px-3 sm:px-4 py-2 sm:py-2.5 bg-[#0f2439] hover:bg-[#0f2439] text-white font-bold rounded-lg sm:rounded-xl transition-all duration-500 text-xs sm:text-sm shadow-lg hover:shadow-xl hover:shadow-[0_0_20px_rgba(15,36,57,0.4)] transform hover:scale-105 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-1.5 sm:gap-2">
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                </svg>
                <span className="hidden sm:inline">Donate Now</span>
                <span className="sm:hidden">Donate</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-[#0f2439]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </Link>
            
            <button 
              onClick={toggleMobileMenu}
              className="relative w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-300 hover:scale-110"
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div id="mobile-menu" className="lg:hidden bg-white border-t border-gray-200 shadow-2xl animate-in slide-in-from-top duration-300" role="menu" aria-label="Mobile navigation menu">
          <div className="px-4 py-3 space-y-1">
            {isHomePage ? (
              <>
                <a href="#about" onClick={(e) => { handleAnchorClick(e, 100); setIsMobileMenuOpen(false); }} className="block px-4 py-2 text-gray-700 hover:text-primary-600 hover:bg-primary-50 font-semibold rounded-xl transition-all duration-300 transform hover:translate-x-2 smooth-scroll">
                  About
                </a>
                <a href="#work" onClick={(e) => { handleAnchorClick(e, 100); setIsMobileMenuOpen(false); }} className="block px-4 py-2 text-gray-700 hover:text-primary-600 hover:bg-primary-50 font-semibold rounded-xl transition-all duration-300 transform hover:translate-x-2 smooth-scroll">
                  Our Work
                </a>
                <a href="#impact" onClick={(e) => { handleAnchorClick(e, 100); setIsMobileMenuOpen(false); }} className="block px-4 py-2 text-gray-700 hover:text-primary-600 hover:bg-primary-50 font-semibold rounded-xl transition-all duration-300 transform hover:translate-x-2 smooth-scroll">
                  Impact
                </a>
                <a href="#stories" onClick={(e) => { handleAnchorClick(e, 100); setIsMobileMenuOpen(false); }} className="block px-4 py-2 text-gray-700 hover:text-primary-600 hover:bg-primary-50 font-semibold rounded-xl transition-all duration-300 transform hover:translate-x-2 smooth-scroll">
                  Stories
                </a>
                <a href="#contact" onClick={(e) => { handleAnchorClick(e, 100); setIsMobileMenuOpen(false); }} className="block px-4 py-2 text-gray-700 hover:text-primary-600 hover:bg-primary-50 font-semibold rounded-xl transition-all duration-300 transform hover:translate-x-2 smooth-scroll">
                  Get Involved
                </a>
                <Link to="/funds" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-2 text-gray-700 hover:text-primary-600 hover:bg-primary-50 font-semibold rounded-xl transition-all duration-300 transform hover:translate-x-2">
                  Funds
                </Link>
              </>
            ) : (
              <>
                <Link to="/#about" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-2 text-gray-700 hover:text-primary-600 hover:bg-primary-50 font-semibold rounded-xl transition-all duration-300 transform hover:translate-x-2">
                  About
                </Link>
                <Link to="/#work" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-2 text-gray-700 hover:text-primary-600 hover:bg-primary-50 font-semibold rounded-xl transition-all duration-300 transform hover:translate-x-2">
                  Our Work
                </Link>
                <Link to="/#impact" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-2 text-gray-700 hover:text-primary-600 hover:bg-primary-50 font-semibold rounded-xl transition-all duration-300 transform hover:translate-x-2">
                  Impact
                </Link>
                <Link to="/#stories" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-2 text-gray-700 hover:text-primary-600 hover:bg-primary-50 font-semibold rounded-xl transition-all duration-300 transform hover:translate-x-2">
                  Stories
                </Link>
                <Link to="/#contact" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-2 text-gray-700 hover:text-primary-600 hover:bg-primary-50 font-semibold rounded-xl transition-all duration-300 transform hover:translate-x-2">
                  Get Involved
                </Link>
                <Link to="/funds" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-2 text-gray-700 hover:text-primary-600 hover:bg-primary-50 font-semibold rounded-xl transition-all duration-300 transform hover:translate-x-2">
                  Funds
                </Link>
              </>
            )}
            
            <div className="border-t border-gray-200 pt-4 mt-2">
              <div className="flex items-center justify-center gap-3 px-4" role="list" aria-label="Social media links">
                {SOCIAL_LINKS.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 transition-all duration-300 ${social.color} hover:text-white hover:scale-110 hover:shadow-lg group relative overflow-hidden`}
                    aria-label={social.name}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <svg className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                      <path d={social.icon} />
                    </svg>
                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </a>
                ))}
              </div>
            </div>
            
              {isHomePage ? (
                <>
                  <a 
                    href="#contact" 
                    onClick={(e) => { handleAnchorClick(e, 100); setIsMobileMenuOpen(false); }} 
                    className="group relative block w-full px-6 py-3.5 text-gray-700 font-bold hover:text-gray-900 rounded-xl transition-all duration-500 text-center border-2 border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50 hover:shadow-xl transform hover:scale-[1.02] overflow-hidden smooth-scroll"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      <svg className="w-4 h-4 transform group-hover:rotate-12 transition-transform duration-500 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span>Contact Us</span>
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-100/0 via-gray-100/50 to-gray-100/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
                  </a>
                  <Link 
                    to="/donate" 
                    onClick={() => setIsMobileMenuOpen(false)} 
                    className="group relative block w-full px-6 py-3.5 bg-[#0f2439] hover:bg-[#0f2439] text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-[0_0_30px_rgba(15,36,57,0.5)] text-center transform hover:scale-[1.02] transition-all duration-500 shadow-lg overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      <svg className="w-4 h-4 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                      </svg>
                      <span>Donate Now</span>
                      <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-[#0f2439]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </Link>
                </>
              ) : (
                <>
                  <Link 
                    to="/#contact" 
                    onClick={() => setIsMobileMenuOpen(false)} 
                    className="group relative block w-full px-6 py-3.5 text-gray-700 font-bold hover:text-gray-900 rounded-xl transition-all duration-500 text-center border-2 border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50 hover:shadow-xl transform hover:scale-[1.02] overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      <svg className="w-4 h-4 transform group-hover:rotate-12 transition-transform duration-500 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span>Contact Us</span>
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-100/0 via-gray-100/50 to-gray-100/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
                  </Link>
                  <Link 
                    to="/donate" 
                    onClick={() => setIsMobileMenuOpen(false)} 
                    className="group relative block w-full px-6 py-3.5 bg-[#0f2439] hover:bg-[#0f2439] text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-[0_0_30px_rgba(15,36,57,0.5)] text-center transform hover:scale-[1.02] transition-all duration-500 shadow-lg overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      <svg className="w-4 h-4 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                      </svg>
                      <span>Donate Now</span>
                      <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-[#0f2439]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </Link>
                </>
              )}
            </div>
          </div>
      )}
    </nav>

    {isSocialMenuOpen && (
      <div
        className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-[9998]"
        onClick={() => setIsSocialMenuOpen(false)}
        aria-hidden="true"
      />
    )}

    <div className="lg:hidden fixed bottom-6 right-6 z-[9999]">
        {SOCIAL_LINKS.map((social, index) => {
          const centerAngle = 135
          const spread = 90
          const startAngle = centerAngle - (spread / 2)
          const angle = (startAngle + (index * (spread / (SOCIAL_LINKS.length - 1)))) * (Math.PI / 180)
          const radius = 95
          const x = Math.cos(angle) * radius
          const y = Math.sin(angle) * radius
          
          return (
            <a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`absolute w-12 h-12 rounded-full bg-white shadow-xl flex items-center justify-center text-gray-600 transition-all duration-500 ease-out ${social.color} hover:text-white hover:shadow-2xl group overflow-hidden`}
              style={{
                bottom: `${28 + Math.abs(y)}px`,
                right: `${28 + Math.abs(x)}px`,
                transform: isSocialMenuOpen 
                  ? 'translate(50%, 50%) scale(1)' 
                  : 'translate(50%, 50%) scale(0)',
                transitionDelay: `${index * 80}ms`,
                opacity: isSocialMenuOpen ? 1 : 0,
                zIndex: 10000,
                pointerEvents: isSocialMenuOpen ? 'auto' : 'none',
                willChange: 'transform, opacity'
              }}
              aria-label={social.name}
              onClick={() => setIsSocialMenuOpen(false)}
            >
              <svg className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                <path d={social.icon} />
              </svg>
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>
          )
        })}

        <button
          onClick={toggleSocialMenu}
          className="w-14 h-14 rounded-full bg-[#0f2439] hover:bg-[#0f2439] text-white shadow-2xl flex items-center justify-center transition-all duration-500 transform hover:scale-110 relative focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          style={{ zIndex: 10001 }}
          aria-label="Toggle social media menu"
          aria-expanded={isSocialMenuOpen}
          aria-controls="social-menu"
        >
          {isSocialMenuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
            </svg>
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
        </button>
      </div>
    </>
  )
}

export default Navigation

