// Shared constants and data for the application

export const STATS = [
  { number: '2.5M+', label: 'Meals Served', icon: '🍽️' },
  { number: '50K+', label: 'Lives Impacted', icon: '❤️' },
  { number: '200+', label: 'Communities Served', icon: '🌍' },
  { number: '500+', label: 'Schools Supported', icon: '🏫' }
]

export const PROGRAMS = [
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
    color: 'bg-primary-600',
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
    color: 'bg-primary-600',
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
    color: 'bg-primary-600',
    detail: 'Reach out and respond to the needs of disaster-affected people'
  }
]

export const STORIES = [
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

export const CAMPAIGNS = [
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

export const TESTIMONIALS = [
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

export const UPDATES = [
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

export const DONATION_TABS = [
  { id: 'general', label: 'General Donation', icon: '💝' },
  { id: 'honor', label: 'Donate in Honor', icon: '🎖️' },
  { id: 'memory', label: 'Donate in Memory', icon: '🕊️' },
  { id: 'occasion', label: 'Special Occasion', icon: '🎉' },
  { id: 'sme', label: 'SME Donations', icon: '🏢' },
  { id: 'school', label: 'Sponsor a School', icon: '🏫' },
  { id: 'equipment', label: 'Kitchen Equipment', icon: '🍳' }
]

export const PRESET_AMOUNTS = [
  { amount: 51, label: '₹ 51', children: 0 },
  { amount: 100, label: '₹ 100', children: 0 },
  { amount: 250, label: '₹ 250', children: 0 },
  { amount: 500, label: '₹ 500', children: 0 },
  { amount: 1000, label: '₹ 1,000', children: 0 },
  { amount: 1500, label: '₹ 1,500', children: 0 },
  { amount: 2000, label: '₹ 2,000', children: 0 },
  { amount: 2500, label: '₹ 2,500', children: 0 },
  { amount: 3000, label: '₹ 3,000', children: 0 },
  { amount: 4000, label: '₹ 4,000', children: 0 },
  { amount: 5000, label: '₹ 5,000', children: 1 },
  { amount: 5100, label: '₹ 5,100', children: 1 }
]

export const SOCIAL_LINKS = [
  { name: 'Facebook', url: '#', icon: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z', color: 'hover:bg-[#1877F2]' },
  { name: 'Twitter', url: '#', icon: 'M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z', color: 'hover:bg-[#1DA1F2]' },
  { name: 'Instagram', url: '#', icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z', color: 'hover:bg-gradient-to-br hover:from-[#833AB4] hover:via-[#FD1D1D] hover:to-[#FCB045]' },
  { name: 'LinkedIn', url: '#', icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z', color: 'hover:bg-[#0077B5]' }
]

export const INDIAN_STATES = [
  { value: '', label: 'Anywhere' },
  { value: 'andhra-pradesh', label: 'Andhra Pradesh' },
  { value: 'assam', label: 'Assam' },
  { value: 'chhattisgarh', label: 'Chhattisgarh' },
  { value: 'gujarat', label: 'Gujarat' },
  { value: 'karnataka', label: 'Karnataka' },
  { value: 'maharashtra', label: 'Maharashtra' },
  { value: 'odisha', label: 'Odisha' },
  { value: 'rajasthan', label: 'Rajasthan' },
  { value: 'tamil-nadu', label: 'Tamil Nadu' },
  { value: 'telangana', label: 'Telangana' },
  { value: 'uttar-pradesh', label: 'Uttar Pradesh' },
  { value: 'other', label: 'Other' }
]

export const CONTACT_INFO = {
  email: 'info@welledfoundation.org',
  emailPartnerships: 'partnerships@welledfoundation.org',
  phone: '+91-1800-123-4567',
  phoneAlt: '+91-98765-43210',
  address: {
    line1: '123 Foundation Street',
    line2: 'Community Center Building',
    line3: 'City - 560001, State, Country'
  },
  officeHours: {
    weekdays: 'Monday - Friday: 9:00 AM - 6:00 PM',
    saturday: 'Saturday: 10:00 AM - 2:00 PM',
    sunday: 'Sunday: Closed'
  }
}


