import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import { STATS, PROGRAMS, STORIES, CAMPAIGNS, TESTIMONIALS, UPDATES } from '../constants/data'

function Home() {
  const location = useLocation()
  
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

  return (
    <div className="App bg-white w-full">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section with Banner Image */}
      <section className="relative h-[60vh] sm:h-[70vh] md:h-[75vh] lg:h-[80vh] flex items-center overflow-hidden mt-20 sm:mt-24 md:mt-24 lg:mt-28 xl:mt-32 w-full">
        {/* Banner Image Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/banner.jpg)'
          }}
        ></div>
        <div className="absolute inset-0 bg-black/20 sm:bg-black/15"></div>
        
        {/* Text Content - Responsive Alignment */}
        <div className="relative max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8 lg:py-10 w-full z-10">
          <div className="flex justify-center lg:justify-end items-center h-full">
            <div className="text-center lg:text-right w-full lg:max-w-2xl px-2 sm:px-0" data-aos="fade-left" data-aos-duration="1200">
              <div className="inline-block mb-3 sm:mb-4 md:mb-5 px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-3 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 rounded-full border-2 border-yellow-200 shadow-xl animate-slide-in-right" data-aos="fade-up" data-aos-delay="100">
                <span className="text-gray-900 text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center justify-center lg:justify-start gap-2">
                  <span className="w-2 h-2 bg-gray-900 rounded-full animate-pulse"></span>
                  Transforming Lives Since 2010
                </span>
              </div>
              
              {/* Mission Statement */}
              <div className="space-y-3 sm:space-y-4 md:space-y-5 mb-4 sm:mb-6 md:mb-8 bg-black/40 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-white/20 shadow-2xl">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight mb-3 sm:mb-4">
                  <span className="block mb-1 sm:mb-2 md:mb-3 animate-fade-in-up text-shadow-lg" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.5)' }}>To Feed.</span>
                  <span className="block mb-1 sm:mb-2 md:mb-3 text-yellow-400 drop-shadow-2xl animate-fade-in-up-delayed font-extrabold" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.8), 0 0 15px rgba(251, 191, 36, 0.4)' }}>To Educate.</span>
                  <span className="block animate-fade-in-up-delayed-2 text-shadow-lg" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.5)' }}>To Uplift.</span>
                </h1>
                
                <div className="h-1 w-16 sm:w-20 bg-gradient-to-r from-yellow-400 to-yellow-300 rounded-full mb-3 sm:mb-4 mx-auto lg:mx-0"></div>
                
                <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-yellow-50 font-semibold leading-relaxed mb-3 sm:mb-4 animate-slide-in-up" style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.8)' }}>
                  Focused on hunger relief, learning access & human support.
                </p>
                
                <div className="space-y-2 sm:space-y-3 md:space-y-4 mt-4 sm:mt-6">
                  <p className="text-xs sm:text-sm md:text-base lg:text-lg text-white font-bold leading-relaxed animate-slide-in-up-delayed" style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.8)' }}>
                    Our mission: <span className="text-yellow-400 font-extrabold">Restore dignity through action, not words.</span>
                  </p>
                  <p className="text-xs sm:text-sm md:text-base text-white/95 font-medium leading-relaxed animate-fade-in" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.7)' }}>
                    We exist to serve humanity with purpose and compassion. Our mission focuses on feeding the hungry, educating the underserved, and offering essential support to people in crisis.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-b from-white to-primary-50/30 relative w-full">
        <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative w-full z-10">
          <div className="text-center mb-12" data-aos="fade-up">
            <h2 className="text-4xl md:text-5xl font-extrabold gradient-text mb-4">OUR IMPACT</h2>
            <p className="text-gray-600 max-w-2xl mx-auto font-light">Real numbers, real change, real impact</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {STATS.map((stat, index) => (
              <div 
                key={index} 
                className="group relative glass rounded-2xl p-6 md:p-8 text-center card-hover"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-accent-gradient rounded-t-2xl"></div>
                <div className="text-4xl mb-3 transform group-hover:scale-110 transition-transform duration-300">{stat.icon}</div>
                <div className="text-4xl md:text-5xl lg:text-6xl font-extrabold gradient-text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-xs md:text-sm font-semibold text-gray-700 uppercase tracking-wide">{stat.label}</div>
              </div>
            ))}
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
                <h3 className="text-3xl md:text-4xl font-bold gradient-text-primary mb-4 leading-tight">
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
      <section id="impact" className="py-24 bg-accent-gradient text-white relative overflow-hidden w-full">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%221%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')]"></div>
        </div>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative w-full z-10">
          <div className="text-center mb-20" data-aos="fade-up">
            <h2 className="text-4xl md:text-6xl font-extrabold mb-6">Our Impact</h2>
            <p className="text-xl md:text-2xl opacity-95 max-w-3xl mx-auto font-light">
              Real numbers, real change, real impact. See how we're making a difference together.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div 
              className="glass-dark rounded-3xl p-10 border border-white/30 hover:bg-white/25 transition-all duration-500 transform hover:-translate-y-3 hover:shadow-2xl hover:shadow-white/20 card-hover"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="text-6xl font-extrabold mb-3 text-white">2.5M+</div>
              <div className="text-2xl opacity-95 mb-4 font-semibold">Meals Served</div>
              <p className="opacity-90 leading-relaxed font-light">Providing nutritious meals to families and children in need across our programs.</p>
            </div>
            <div 
              className="glass-dark rounded-3xl p-10 border border-white/30 hover:bg-white/25 transition-all duration-500 transform hover:-translate-y-3 hover:shadow-2xl hover:shadow-white/20 card-hover"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="text-6xl font-extrabold mb-3 text-white">500+</div>
              <div className="text-2xl opacity-95 mb-4 font-semibold">Schools Supported</div>
              <p className="opacity-90 leading-relaxed font-light">Enhancing educational infrastructure and resources in underserved communities.</p>
            </div>
            <div 
              className="glass-dark rounded-3xl p-10 border border-white/30 hover:bg-white/25 transition-all duration-500 transform hover:-translate-y-3 hover:shadow-2xl hover:shadow-white/20 card-hover"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <div className="text-6xl font-extrabold mb-3 text-white">10K+</div>
              <div className="text-2xl opacity-95 mb-4 font-semibold">Lives Changed</div>
              <p className="opacity-90 leading-relaxed font-light">Creating opportunities and transforming lives through our comprehensive programs.</p>
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

