import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import AOS from 'aos'
import Navigation from '../components/Navigation'

function Home() {
  const location = useLocation()
  
  useEffect(() => {
    // Scroll to top when page loads or route changes
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    // Refresh AOS on scroll for better performance
    AOS.refresh()
  }, [location.pathname])

  const stats = [
    { number: '2.5M+', label: 'Meals Served', icon: '🍽️' },
    { number: '50K+', label: 'Lives Impacted', icon: '❤️' },
    { number: '200+', label: 'Communities Served', icon: '🌍' },
    { number: '500+', label: 'Schools Supported', icon: '🏫' }
  ]

  const programs = [
    {
      title: 'Education',
      subtitle: 'Education Empowerment',
      description: 'Providing quality education, nutrition and holistic development of children in underserved communities.',
      icon: '📚',
      color: 'bg-blue-600',
      detail: 'Education, nutrition and holistic development of children'
    },
    {
      title: 'Healthcare',
      subtitle: 'Healthcare Access',
      description: 'Taking healthcare services to doorsteps of hard to reach communities through mobile clinics and health camps.',
      icon: '🏥',
      color: 'bg-green-600',
      detail: 'Taking healthcare services to doorsteps of hard to reach communities'
    },
    {
      title: 'Livelihood',
      subtitle: 'Livelihood & Skills',
      description: 'Skill training and placement support for underprivileged youth, empowering them with secure livelihood.',
      icon: '💼',
      color: 'bg-blue-600',
      detail: 'Skill training and placement support for underprivileged youth'
    },
    {
      title: 'Women Empowerment',
      subtitle: 'Women Empowerment',
      description: 'Empowering adolescent girls & women through community engagement, education, and economic opportunities.',
      icon: '👩',
      color: 'bg-green-600',
      detail: 'Empowering adolescent girls & women through community engagement'
    },
    {
      title: 'Nutrition & Wellness',
      subtitle: 'Nutrition Security',
      description: 'Ensuring nutrition security and promoting wellness across all age groups through community programs.',
      icon: '🥗',
      color: 'bg-blue-600',
      detail: 'Ensuring nutrition security and promoting wellness'
    },
    {
      title: 'Disaster Response',
      subtitle: 'Disaster Response',
      description: 'Reach out and respond to the needs of disaster-affected people with immediate relief and long-term support.',
      icon: '🆘',
      color: 'bg-green-600',
      detail: 'Reach out and respond to the needs of disaster-affected people'
    }
  ]

  const stories = [
    {
      name: 'Sarah Johnson',
      role: 'Community Leader',
      image: '👩‍👧‍👦',
      quote: 'Welled Foundation transformed our community. The education programs have given our children opportunities we never thought possible.',
      location: 'Rural Community, Kenya'
    },
    {
      name: 'Michael Chen',
      role: 'Program Beneficiary',
      image: '👨‍⚕️',
      quote: 'Thanks to their healthcare initiative, I received the medical attention I needed. They truly care about making a difference.',
      location: 'Urban Center, India'
    },
    {
      name: 'Priya Patel',
      role: 'Teacher',
      image: '👩‍🏫',
      quote: 'The resources and support from Welled Foundation have been invaluable. Our school has seen remarkable improvements.',
      location: 'Educational Hub, Bangladesh'
    }
  ]

  const campaigns = [
    {
      title: 'Feed a Child, Nourish a Future',
      description: 'Help us provide nutritious meals to children in need and support their education journey.',
      raised: 125000,
      goal: 200000,
      image: '🍽️'
    },
    {
      title: 'Build Hope Schools',
      description: 'Support our initiative to build schools and provide quality education in underserved areas.',
      raised: 85000,
      goal: 150000,
      image: '🏫'
    },
    {
      title: 'Healthcare for All',
      description: 'Fund mobile medical clinics to reach remote communities with essential healthcare services.',
      raised: 95000,
      goal: 180000,
      image: '🏥'
    }
  ]

  const testimonials = [
    {
      name: 'Rajesh Kumar',
      role: 'Corporate Partner, Tech Solutions Ltd',
      quote: 'Partnering with Welled Foundation has been a truly rewarding experience. Their commitment to transparency and impact is exemplary. Seeing the lives transformed through their programs inspires us to do more.',
      image: '💼'
    },
    {
      name: 'Dr. Meera Sharma',
      role: 'Head, Social Impact Initiative',
      quote: 'Welled Foundation\'s holistic approach to community development sets them apart. Their programs not only address immediate needs but also create sustainable solutions for long-term change.',
      image: '👩‍⚕️'
    },
    {
      name: 'Anita Desai',
      role: 'Long-term Donor & Volunteer',
      quote: 'I\'ve been supporting Welled Foundation for over 5 years. Their dedication to serving communities with dignity and respect is remarkable. Every contribution truly makes a difference.',
      image: '🙏'
    }
  ]

  const updates = [
    {
      title: 'Welled Foundation Opens New Community Center',
      date: 'March 15, 2025',
      category: 'News',
      excerpt: 'Our new community center in rural Karnataka will serve 500+ families with education and healthcare services.'
    },
    {
      title: 'Educational Program Reaches 10,000 Children Milestone',
      date: 'March 10, 2025',
      category: 'Impact',
      excerpt: 'Our education empowerment program has successfully reached and impacted over 10,000 children across 50 communities.'
    },
    {
      title: 'Partnership with Major Corporate Foundation Announced',
      date: 'March 5, 2025',
      category: 'Partnership',
      excerpt: 'We are excited to announce a strategic partnership that will help expand our nutrition programs to 20 new locations.'
    }
  ]

  return (
    <div className="App min-h-screen bg-white">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-green-50/30"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12" data-aos="fade-up" data-aos-duration="1200">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 mb-6 leading-tight">
              <span className="block mb-2">BRINGING HOPE</span>
              <span className="block text-green-600">
                THROUGH EDUCATION & EMPOWERMENT
              </span>
            </h2>
            <p className="text-lg md:text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed font-light mb-8">
              Welled Foundation is a humanitarian organization committed to uplifting lives with dignity. We serve marginalized communities by ensuring reliable nourishment, empowering education, and continuous support initiatives that cultivate lasting progress and dignified futures.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center" data-aos="fade-up" data-aos-delay="200">
              <button className="px-8 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                Know More
              </button>
              <Link to="/donate" className="px-8 py-3 bg-white text-green-600 font-semibold rounded-lg border-2 border-green-600 hover:bg-green-50 hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                Donate Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-12" data-aos="fade-up">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">OUR IMPACT</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="text-center"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-green-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-sm md:text-base font-semibold text-gray-700 uppercase tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Support A Cause Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">Support A Cause</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {campaigns.map((campaign, index) => {
              const percentage = Math.round((campaign.raised / campaign.goal) * 100)
              return (
                <div 
                  key={index}
                  className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                  data-aos="fade-up"
                  data-aos-delay={index * 150}
                >
                  <div className="p-6">
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 uppercase tracking-wide">{campaign.title}</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed text-sm">{campaign.description}</p>
                    <a href="#" className="inline-flex items-center text-green-600 font-semibold hover:text-green-700 text-sm">
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
      <section id="about" className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
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
              className="bg-white rounded-3xl p-10 shadow-xl hover:shadow-2xl border border-gray-100/50 transition-all duration-500 transform hover:-translate-y-2"
              data-aos="fade-right"
              data-aos-delay="200"
            >
              <div className="mb-6">
                <div className="w-16 h-1 bg-green-600 rounded-full mb-6"></div>
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
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
                <div className="w-20 h-1 bg-green-600 rounded-full"></div>
              </div>
              <p className="text-gray-600 leading-relaxed text-base font-light">
                We exist to serve humanity with purpose and compassion. Our mission focuses on feeding the hungry, educating the underserved, and offering essential support to people in crisis. Through structured programs and collective action, Welled Foundation aims to reduce hardship, inspire hope, and guide individuals toward a more stable and dignified life.
              </p>
            </div>

            {/* Vision Section */}
            <div 
              className="bg-white rounded-3xl p-10 shadow-xl hover:shadow-2xl border border-gray-100/50 transition-all duration-500 transform hover:-translate-y-2"
              data-aos="fade-left"
              data-aos-delay="200"
            >
              <div className="mb-6">
                <div className="w-16 h-1 bg-blue-600 rounded-full mb-6"></div>
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                  Empowering Lives. Restoring Hope.
                </h3>
                <p className="text-lg text-gray-700 mb-6 font-semibold">
                  Bridging gaps in health, learning, and opportunity for a stronger tomorrow.
                </p>
                  </div>
              <div className="border-t border-gray-200 pt-6 mb-6">
                <p className="text-gray-700 font-bold text-lg mb-6">
                  Together, we can transform communities.
                </p>
                <div className="w-20 h-1 bg-blue-600 rounded-full"></div>
              </div>
              <p className="text-gray-600 leading-relaxed text-base font-light">
                We envision a future where nourishment, education, and basic support reach every person in need. Through sustainable action and community-driven initiatives, Welled Foundation strives to eliminate hunger, uplift disadvantaged people, and create pathways to growth. Our dream is to empower lives and build a society where compassion drives progress.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Programmes Section */}
      <section id="work" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">Our Programmes</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map((program, index) => (
              <div 
                key={index} 
                className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className={`h-2 ${program.color}`}></div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className={`w-14 h-14 rounded-lg ${program.color} flex items-center justify-center text-3xl mr-4`}>
                      {program.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{program.title}</h3>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{program.detail}</p>
                  <a href="#" className="text-green-600 font-semibold text-sm hover:text-green-700 inline-flex items-center">
                    Know More
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section id="impact" className="py-24 bg-green-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%221%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')]"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-20" data-aos="fade-up">
            <h2 className="text-4xl md:text-6xl font-extrabold mb-6">Our Impact</h2>
            <p className="text-xl md:text-2xl opacity-95 max-w-3xl mx-auto font-light">
              Real numbers, real change, real impact. See how we're making a difference together.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div 
              className="bg-white/15 backdrop-blur-xl rounded-3xl p-10 border border-white/30 hover:bg-white/20 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-white/10"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="text-6xl font-extrabold mb-3 text-white">2.5M+</div>
              <div className="text-2xl opacity-95 mb-4 font-semibold">Meals Served</div>
              <p className="opacity-90 leading-relaxed font-light">Providing nutritious meals to families and children in need across our programs.</p>
            </div>
            <div 
              className="bg-white/15 backdrop-blur-xl rounded-3xl p-10 border border-white/30 hover:bg-white/20 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-white/10"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="text-6xl font-extrabold mb-3 text-white">500+</div>
              <div className="text-2xl opacity-95 mb-4 font-semibold">Schools Supported</div>
              <p className="opacity-90 leading-relaxed font-light">Enhancing educational infrastructure and resources in underserved communities.</p>
            </div>
            <div 
              className="bg-white/15 backdrop-blur-xl rounded-3xl p-10 border border-white/30 hover:bg-white/20 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-white/10"
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
      <section className="py-24 bg-blue-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20" data-aos="fade-up">
            <h2 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6">Hear from Our Contributors</h2>
            <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto font-light">
              Trusted partners and supporters share their experiences working with Welled Foundation.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="bg-white/90 backdrop-blur-sm rounded-3xl p-10 shadow-xl hover:shadow-2xl hover:shadow-green-100/50 transition-all duration-500 transform hover:-translate-y-3 border border-gray-100/50"
                data-aos="fade-up"
                data-aos-delay={index * 150}
              >
                <div className="text-6xl mb-6 transform hover:scale-110 transition-transform duration-300">{testimonial.image}</div>
                <p className="text-gray-700 text-lg mb-8 leading-relaxed italic font-light relative pl-6">
                  <span className="absolute left-0 top-0 text-5xl text-blue-200 opacity-30 font-serif leading-none">&ldquo;</span>
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
      <section id="stories" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20" data-aos="fade-up">
            <h2 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6">Impact Stories</h2>
            <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto font-light">
              Hear from the people whose lives have been transformed by our programs.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10">
            {stories.map((story, index) => (
              <div 
                key={index} 
                className="bg-white/80 backdrop-blur-sm rounded-3xl p-10 shadow-xl hover:shadow-2xl hover:shadow-blue-100/50 transition-all duration-500 transform hover:-translate-y-3 border border-gray-100/50"
                data-aos="fade-up"
                data-aos-delay={index * 150}
              >
                <div className="text-6xl mb-6 transform hover:scale-110 transition-transform duration-300">{story.image}</div>
                <div className="text-green-600 text-sm mb-6 font-semibold uppercase tracking-wide">{story.location}</div>
                <p className="text-gray-700 text-lg mb-8 leading-relaxed italic font-light relative pl-6">
                  <span className="absolute left-0 top-0 text-5xl text-green-200 opacity-30 font-serif leading-none">&ldquo;</span>
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
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6">Latest Updates</h2>
            <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto font-light">
              Stay informed about our latest initiatives, milestones, and impact stories.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {updates.map((update, index) => (
              <div 
                key={index}
                className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-green-100 text-green-600 text-xs font-semibold rounded-full uppercase tracking-wide">
                      {update.category}
                    </span>
                    <span className="text-sm text-gray-500">{update.date}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 leading-tight">{update.title}</h3>
                  <p className="text-gray-600 leading-relaxed mb-6 font-light">{update.excerpt}</p>
                  <a href="#" className="text-green-600 font-semibold hover:text-green-700 inline-flex items-center group">
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
            <button className="px-8 py-4 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all duration-300">
              View All Updates
            </button>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section id="contact" className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                      First Name <span className="text-green-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700 mb-2">
                      Last Name <span className="text-green-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address <span className="text-green-600">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                    placeholder="Company Name (Optional)"
                  />
                </div>

                <div>
                  <label htmlFor="inquiryType" className="block text-sm font-semibold text-gray-700 mb-2">
                    Type of Inquiry <span className="text-green-600">*</span>
                  </label>
                  <select
                    id="inquiryType"
                    name="inquiryType"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
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
                    Message <span className="text-green-600">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 resize-none"
                    placeholder="Tell us how we can help you..."
                  ></textarea>
                </div>

                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="newsletter"
                    name="newsletter"
                    className="mt-1 w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                  />
                  <label htmlFor="newsletter" className="ml-3 text-sm text-gray-600">
                    I would like to receive updates about Welled Foundation's programs and initiatives
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full px-8 py-4 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 hover:shadow-xl transform hover:scale-105 transition-all duration-300"
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
                    <div className="flex-shrink-0 w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center">
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
                    <div className="flex-shrink-0 w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-semibold text-gray-900 mb-1">Email</h4>
                      <a href="mailto:info@welledfoundation.org" className="text-green-600 hover:text-green-700 transition-colors">
                        info@welledfoundation.org
                      </a>
                      <br />
                      <a href="mailto:partnerships@welledfoundation.org" className="text-green-600 hover:text-green-700 transition-colors">
                        partnerships@welledfoundation.org
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-semibold text-gray-900 mb-1">Phone</h4>
                      <a href="tel:+9118001234567" className="text-green-600 hover:text-green-700 transition-colors">
                        +91-1800-123-4567
                      </a>
                      <br />
                      <a href="tel:+919876543210" className="text-green-600 hover:text-green-700 transition-colors">
                        +91-98765-43210
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center">
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
      <section id="get-involved" className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-green-50/20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div 
            className="bg-blue-600 rounded-3xl p-12 md:p-20 text-white text-center shadow-2xl relative overflow-hidden"
            data-aos="zoom-in"
          >
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%221%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')]"></div>
            </div>
            <div className="relative">
              <h2 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">Make a Difference Today</h2>
              <p className="text-xl md:text-2xl opacity-95 max-w-3xl mx-auto mb-10 font-light">
              Join us in creating lasting change. Your support can transform lives and build stronger communities.
            </p>
              <div className="flex flex-col sm:flex-row gap-5 justify-center" data-aos="fade-up" data-aos-delay="200">
                <Link to="/donate" className="px-10 py-4 bg-white text-green-600 text-lg font-bold rounded-xl hover:bg-gray-100 hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                  Donate Now
                </Link>
                <button className="px-10 py-4 bg-white/20 backdrop-blur-xl text-white text-lg font-semibold rounded-xl border-2 border-white/50 hover:bg-white/30 hover:border-white transform hover:scale-105 transition-all duration-300">
                Volunteer
              </button>
                <button className="px-10 py-4 bg-white/20 backdrop-blur-xl text-white text-lg font-semibold rounded-xl border-2 border-white/50 hover:bg-white/30 hover:border-white transform hover:scale-105 transition-all duration-300">
                Partner With Us
              </button>
              </div>
              <div className="mt-12 flex flex-wrap justify-center gap-8 text-white/90" data-aos="fade-up" data-aos-delay="300">
                <div className="text-center">
                  <div className="text-3xl font-bold mb-1">16+</div>
                  <div className="text-sm opacity-80">States Reached</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-1">78+</div>
                  <div className="text-sm opacity-80">Active Locations</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-1">15+</div>
                  <div className="text-sm opacity-80">Years of Service</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-16 relative overflow-hidden" data-aos="fade-up">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%221%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')]"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            <div className="md:col-span-1">
              <h3 className="text-3xl font-bold text-white mb-6">Welled Foundation</h3>
              <p className="mb-6 text-gray-400 leading-relaxed font-light">Building a better tomorrow through education, healthcare, and sustainable development.</p>
              <div className="flex space-x-3">
                <a href="#" className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-600 hover:scale-110 transition-all duration-300">
                  <span className="sr-only">Facebook</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#" className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-400 hover:scale-110 transition-all duration-300">
                  <span className="sr-only">Twitter</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a href="#" className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 hover:scale-110 transition-all duration-300">
                  <span className="sr-only">Instagram</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6 text-lg">About</h4>
              <ul className="space-y-3">
                <li><a href="#" className="hover:text-white transition-colors duration-300 font-light">Our Story</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300 font-light">Our Team</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300 font-light">Our Impact</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300 font-light">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6 text-lg">Programs</h4>
              <ul className="space-y-3">
                <li><a href="#" className="hover:text-white transition-colors duration-300 font-light">Education</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300 font-light">Healthcare</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300 font-light">Community Development</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300 font-light">Nutrition & Wellness</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6 text-lg">Get Involved</h4>
              <ul className="space-y-3">
                <li><a href="#" className="hover:text-white transition-colors duration-300 font-light">Donate</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300 font-light">Volunteer</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300 font-light">Partner With Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300 font-light">Contact Us</a></li>
              </ul>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-12 mt-12 pt-12 border-t border-gray-800">
            <div>
              <h4 className="text-white font-bold mb-4 text-lg">Subscribe to Our Newsletter</h4>
              <p className="text-gray-400 mb-4 font-light">Stay updated with our latest initiatives and impact stories.</p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <button className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                  Subscribe
                </button>
              </div>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4 text-lg">Contact Information</h4>
              <div className="space-y-3 text-gray-400 font-light">
                <p className="flex items-center">
                  <svg className="w-5 h-5 mr-3 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  info@welledfoundation.org
                </p>
                <p className="flex items-center">
                  <svg className="w-5 h-5 mr-3 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  +91-1800-XXX-XXXX
                </p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 mt-8 text-center">
            <p className="text-gray-400 font-light">&copy; {new Date().getFullYear()} Welled Foundation. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home

