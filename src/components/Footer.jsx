import { Link } from 'react-router-dom'
import { SOCIAL_LINKS, CONTACT_INFO } from '../constants/data'
import OptimizedImage from './OptimizedImage'

function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-700 py-6 sm:py-8 border-t border-gray-300 relative overflow-hidden w-full max-w-full" data-aos="fade-up">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative w-full">
        <div className="grid md:grid-cols-4 gap-4 mb-4">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-2">
              <OptimizedImage 
                src="/logo.png" 
                alt="Welled Foundation Logo" 
                className="h-10 w-10 object-contain"
                loading="lazy"
                width="40"
                height="40"
              />
              <h3 className="text-lg font-bold text-gray-900">Welled Foundation</h3>
            </div>
            <p className="mb-2 text-gray-600 leading-tight text-xs">Building a better tomorrow through education, healthcare, and sustainable development.</p>
            <div className="flex space-x-1.5" role="list" aria-label="Social media links">
              {SOCIAL_LINKS.map((social, index) => (
                <a 
                  key={index}
                  href={social.url} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-[#1877F2] hover:text-white hover:scale-110 transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                  aria-label={`Follow us on ${social.name}`}
                >
                  <span className="sr-only">{social.name}</span>
                  <svg className="w-3.5 h-3.5 text-gray-600 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d={social.icon} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-gray-900 font-bold mb-1.5 text-sm">About</h4>
            <ul className="space-y-1">
              <li><a href="#" className="text-gray-600 hover:text-[#1A4B8A] hover:translate-x-1 transition-all duration-300 text-xs inline-block">Our Story</a></li>
              <li><a href="#" className="text-gray-600 hover:text-[#1A4B8A] hover:translate-x-1 transition-all duration-300 text-xs inline-block">Our Team</a></li>
              <li><a href="#" className="text-gray-600 hover:text-[#1A4B8A] hover:translate-x-1 transition-all duration-300 text-xs inline-block">Our Impact</a></li>
              <li><a href="#" className="text-gray-600 hover:text-[#1A4B8A] hover:translate-x-1 transition-all duration-300 text-xs inline-block">Careers</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-gray-900 font-bold mb-1.5 text-sm">Programs</h4>
            <ul className="space-y-1">
              <li><a href="#" className="text-gray-600 hover:text-[#1A4B8A] hover:translate-x-1 transition-all duration-300 text-xs inline-block">Education</a></li>
              <li><a href="#" className="text-gray-600 hover:text-[#1A4B8A] hover:translate-x-1 transition-all duration-300 text-xs inline-block">Healthcare</a></li>
              <li><a href="#" className="text-gray-600 hover:text-[#1A4B8A] hover:translate-x-1 transition-all duration-300 text-xs inline-block">Community Development</a></li>
              <li><a href="#" className="text-gray-600 hover:text-[#1A4B8A] hover:translate-x-1 transition-all duration-300 text-xs inline-block">Nutrition & Wellness</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-gray-900 font-bold mb-1.5 text-sm">Get Involved</h4>
            <ul className="space-y-1">
              <li><Link to="/donate" className="text-gray-600 hover:text-[#1A4B8A] hover:translate-x-1 transition-all duration-300 text-xs inline-block">Donate</Link></li>
              <li><a href="#" className="text-gray-600 hover:text-[#1A4B8A] hover:translate-x-1 transition-all duration-300 text-xs inline-block">Volunteer</a></li>
              <li><a href="#" className="text-gray-600 hover:text-[#1A4B8A] hover:translate-x-1 transition-all duration-300 text-xs inline-block">Partner With Us</a></li>
              <li><a href="#contact" className="text-gray-600 hover:text-[#1A4B8A] hover:translate-x-1 transition-all duration-300 text-xs inline-block">Contact Us</a></li>
            </ul>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4 mt-3 pt-3 border-t border-gray-300">
          <div>
            <h4 className="text-gray-900 font-bold mb-1.5 text-sm">Subscribe to Our Newsletter</h4>
            <p className="text-gray-600 mb-2 text-xs">Stay updated with our latest initiatives and impact stories.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1 px-2 py-1.5 bg-white border border-gray-300 rounded text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#1A4B8A] focus:border-[#1A4B8A] transition-all text-xs"
              />
              <button className="px-3 py-1.5 bg-[#1A4B8A] text-white font-semibold rounded hover:bg-[#153d6f] transform hover:scale-105 transition-all duration-300 text-xs">
                Subscribe
              </button>
            </div>
          </div>
          <div>
            <h4 className="text-gray-900 font-bold mb-1.5 text-sm">Contact Information</h4>
            <div className="space-y-1 text-gray-600 text-xs">
              <p className="flex items-center hover:text-[#1A4B8A] transition-colors">
                <svg className="w-3.5 h-3.5 mr-1.5 text-[#1A4B8A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href={`mailto:${CONTACT_INFO.email}`} className="hover:underline">{CONTACT_INFO.email}</a>
              </p>
              <p className="flex items-center hover:text-[#1A4B8A] transition-colors">
                <svg className="w-3.5 h-3.5 mr-1.5 text-[#1A4B8A]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href={`tel:${CONTACT_INFO.phone.replace(/\s/g, '')}`} className="hover:underline">{CONTACT_INFO.phone}</a>
              </p>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-300 pt-2 mt-2 text-center">
          <p className="text-gray-600 text-xs">&copy; {new Date().getFullYear()} Welled Foundation. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

