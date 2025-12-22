import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isHomePage = location.pathname === '/'

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 backdrop-blur-md ${
      isScrolled ? 'bg-white/95 shadow-xl shadow-gray-200/50' : 'bg-white/80'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex-shrink-0">
            <h1 className="text-2xl md:text-3xl font-bold text-green-600 tracking-tight">
              Welled Foundation
            </h1>
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {isHomePage ? (
              <>
                <a href="#about" className="text-gray-700 hover:text-green-600 transition-all duration-300 font-medium relative group">
                  About
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-600 group-hover:w-full transition-all duration-300"></span>
                </a>
                <a href="#work" className="text-gray-700 hover:text-green-600 transition-all duration-300 font-medium relative group">
                  Our Work
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-600 group-hover:w-full transition-all duration-300"></span>
                </a>
                <a href="#impact" className="text-gray-700 hover:text-green-600 transition-all duration-300 font-medium relative group">
                  Impact
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-600 group-hover:w-full transition-all duration-300"></span>
                </a>
                <a href="#stories" className="text-gray-700 hover:text-green-600 transition-all duration-300 font-medium relative group">
                  Stories
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-600 group-hover:w-full transition-all duration-300"></span>
                </a>
                <a href="#get-involved" className="text-gray-700 hover:text-green-600 transition-all duration-300 font-medium relative group">
                  Get Involved
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-600 group-hover:w-full transition-all duration-300"></span>
                </a>
              </>
            ) : (
              <>
                <Link to="/#about" className="text-gray-700 hover:text-green-600 transition-all duration-300 font-medium relative group">
                  About
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-600 group-hover:w-full transition-all duration-300"></span>
                </Link>
                <Link to="/#work" className="text-gray-700 hover:text-green-600 transition-all duration-300 font-medium relative group">
                  Our Work
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-600 group-hover:w-full transition-all duration-300"></span>
                </Link>
                <Link to="/#impact" className="text-gray-700 hover:text-green-600 transition-all duration-300 font-medium relative group">
                  Impact
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-600 group-hover:w-full transition-all duration-300"></span>
                </Link>
                <Link to="/#stories" className="text-gray-700 hover:text-green-600 transition-all duration-300 font-medium relative group">
                  Stories
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-600 group-hover:w-full transition-all duration-300"></span>
                </Link>
                <Link to="/#get-involved" className="text-gray-700 hover:text-green-600 transition-all duration-300 font-medium relative group">
                  Get Involved
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-600 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </>
            )}
            <Link to="/donate" className="text-gray-700 hover:text-green-600 transition-all duration-300 font-medium relative group">
              Donate
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
          </div>

          <div className="hidden md:flex space-x-4">
            {isHomePage ? (
              <>
                <a href="#contact" className="px-6 py-2.5 text-green-600 font-semibold hover:bg-green-50 rounded-xl transition-all duration-300 hover:shadow-md">
                  Contact Us
                </a>
                <Link to="/donate" className="px-6 py-2.5 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                  Donate Now
                </Link>
              </>
            ) : (
              <>
                <Link to="/#contact" className="px-6 py-2.5 text-green-600 font-semibold hover:bg-green-50 rounded-xl transition-all duration-300 hover:shadow-md">
                  Contact Us
                </Link>
                <Link to="/donate" className="px-6 py-2.5 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                  Donate Now
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-gray-700 focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-4 space-y-4">
            {isHomePage ? (
              <>
                <a href="#about" className="block text-gray-700 hover:text-green-600 font-medium">About</a>
                <a href="#work" className="block text-gray-700 hover:text-green-600 font-medium">Our Work</a>
                <a href="#impact" className="block text-gray-700 hover:text-green-600 font-medium">Impact</a>
                <a href="#stories" className="block text-gray-700 hover:text-green-600 font-medium">Stories</a>
                <a href="#get-involved" className="block text-gray-700 hover:text-green-600 font-medium">Get Involved</a>
              </>
            ) : (
              <>
                <Link to="/#about" className="block text-gray-700 hover:text-green-600 font-medium">About</Link>
                <Link to="/#work" className="block text-gray-700 hover:text-green-600 font-medium">Our Work</Link>
                <Link to="/#impact" className="block text-gray-700 hover:text-green-600 font-medium">Impact</Link>
                <Link to="/#stories" className="block text-gray-700 hover:text-green-600 font-medium">Stories</Link>
                <Link to="/#get-involved" className="block text-gray-700 hover:text-green-600 font-medium">Get Involved</Link>
              </>
            )}
            <Link to="/donate" className="block text-gray-700 hover:text-green-600 font-medium">Donate</Link>
            <div className="pt-4 space-y-2">
              {isHomePage ? (
                <>
                  <a href="#contact" className="block w-full px-6 py-2 text-green-600 font-semibold hover:bg-green-50 rounded-lg transition-colors text-center">
                    Contact Us
                  </a>
                  <Link to="/donate" className="block w-full px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 text-center">
                    Donate Now
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/#contact" className="block w-full px-6 py-2 text-green-600 font-semibold hover:bg-green-50 rounded-lg transition-colors text-center">
                    Contact Us
                  </Link>
                  <Link to="/donate" className="block w-full px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 text-center">
                    Donate Now
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navigation

