import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import OptimizedImage from "../components/OptimizedImage";
import { STATS, PROGRAMS } from "../constants/data";
import SendUsMessage from "../components/SendUsMessage";
const desktopBanners = [
  "/banner.jpg",
  "/banner2.jpg",
  "/banner3.jpg",
  "/banner4.jpg",
];

const mobileBanners = [
  "/banner-mobile.jpg",
  "/banner2-mobile.jpg",
  "/banner3-mobile.jpg",
  "/banner4-mobile.jpg",
];

function Home() {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);
  const [isAboutExpanded, setIsAboutExpanded] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const banners = isMobile ? mobileBanners : desktopBanners;

  const [currentBanner, setCurrentBanner] = useState(0);
  const [bannerHeight, setBannerHeight] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [location.pathname]);

  useEffect(() => {
    setCurrentBanner(0);
  }, [isMobile]);

  useEffect(() => {
    const updateHeight = () => {
      if (banners.length === 0) return;
      const img = new Image();
      img.src = banners[currentBanner];
      img.onload = () => {
        const aspectRatio = img.height / img.width;
        const height = window.innerWidth * aspectRatio;
        setBannerHeight(height);
      };
    };

    updateHeight();

    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, [currentBanner, banners]);

  useEffect(() => {
    if (banners.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [banners.length]);

  const goToSlide = (index) => {
    setCurrentBanner(index);
  };

  const nextSlide = () => {
    setCurrentBanner((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const impactStories = [
    {
      name: "Sunita",
      title: "A Homemaker from a Resettlement Colony",
      description:
        "Sunita believed constant fatigue was a normal part of daily life. Through a community wellness session, she learned about basic nutrition and hydration. Small changes in her routine helped her feel more energetic and confident about her health.",
      image: "/impact-sunita.jpg",
      badge: "WELLNESS CHAMPION",
    },
    {
      name: "Irfan",
      title: "A College Student",
      description:
        "Irfan struggled with anxiety but never spoke about it. A mental wellness awareness session helped him understand that mental health matters too. Today, he openly talks about stress and encourages others to seek support early.",
      image: "/impact-irfan.jpg",
      badge: "MENTAL HEALTH ADVOCATE",
    },
    {
      name: "Rekha",
      title: "A Daily Wage Worker",
      description:
        "Rekha often ignored minor health issues due to lack of information. After attending a health outreach camp, she learned to recognize early warning signs and seek timely help, preventing bigger problems later.",
      image: "/impact-rekha.jpg",
      badge: "HEALTH AWARENESS LEADER",
    },
  ];

  const [currentStory, setCurrentStory] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStory((prev) => (prev + 1) % impactStories.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [impactStories.length]);

  const nextStory = () => {
    setCurrentStory((prev) => (prev + 1) % impactStories.length);
  };

  const prevStory = () => {
    setCurrentStory(
      (prev) => (prev - 1 + impactStories.length) % impactStories.length
    );
  };

  const goToStory = (index) => {
    setCurrentStory(index);
  };

  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      nextStory();
    }
    if (isRightSwipe) {
      prevStory();
    }
  };

  return (
    <div className="App bg-white w-full">
      <Navigation />

      <section
        id="banner"
        className="relative w-full overflow-hidden mt-20 sm:mt-24 md:mt-24 lg:mt-28 xl:mt-32"
      >
        <div
          className="relative w-full"
          style={{
            height: bannerHeight ? `${bannerHeight}px` : "auto",
            minHeight: "400px",
          }}
        >
          {banners.map((banner, index) => (
            <div
              key={index}
              className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out ${
                index === currentBanner ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
              style={{
                backgroundImage: `url(${banner})`,
              }}
            />
          ))}
        </div>

        {banners.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2 md:gap-3">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentBanner
                    ? "w-8 md:w-10 h-2 md:h-2.5 bg-white shadow-lg"
                    : "w-2 md:w-2.5 h-2 md:h-2.5 bg-white/50 hover:bg-white/70"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </section>

      <section
        id="about"
        className="pt-4 pb-12 sm:pt-6 sm:pb-16 md:pt-8 md:pb-20 bg-gradient-to-b from-white via-primary-50/20 to-white w-full relative overflow-hidden"
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-48 h-48 bg-primary-200/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-64 h-64 bg-yellow-200/10 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-6 sm:mb-8">
            <div className="inline-block mb-1.5">
              <span className="text-primary-600 text-[10px] sm:text-xs font-bold uppercase tracking-widest">
                Who We Are
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-2">
              <span className="bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 bg-clip-text text-transparent">
                ABOUT US
              </span>
            </h2>
            <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-primary-500 to-transparent mx-auto"></div>
          </div>

          <div className="mx-auto">
            <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-center">
              <div className="hidden lg:block lg:col-span-2 space-y-4">
                <div className="group relative bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-4 border-2 border-yellow-200/60 shadow-lg hover:shadow-2xl hover:shadow-yellow-200/50 transition-all duration-500 hover:-translate-y-2 overflow-hidden">
                  <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23eab308' fill-opacity='0.4'%3E%3Cpath d='M20 20.5V18H0v-2h20v-2H0v-2h20v-2H0V8h20V6H0V4h20V2H0V0h22v20h18v-2H22zm0 0v2H0v-2h20z'/%3E%3C/g%3E%3C/svg%3E")`,
                        backgroundSize: "40px 40px",
                      }}
                    ></div>
                  </div>
                  <div className="relative z-10">
                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center shadow-xl mb-3 mx-auto transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-extrabold bg-gradient-to-r from-yellow-600 to-yellow-700 bg-clip-text text-transparent text-center mb-1.5">
                      Community
                    </h3>
                    <p className="text-xs text-gray-700 text-center leading-relaxed font-medium">
                      Uniting hearts, transforming lives together
                    </p>
                  </div>
                </div>

                <div className="group relative bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl p-4 border-2 border-primary-200/60 shadow-lg hover:shadow-2xl hover:shadow-primary-200/50 transition-all duration-500 hover:-translate-y-2 overflow-hidden">
                  <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%231A4B8A' fill-opacity='0.4'%3E%3Cpath d='M20 20.5V18H0v-2h20v-2H0v-2h20v-2H0V8h20V6H0V4h20V2H0V0h22v20h18v-2H22zm0 0v2H0v-2h20z'/%3E%3C/g%3E%3C/svg%3E")`,
                        backgroundSize: "40px 40px",
                      }}
                    ></div>
                  </div>
                  <div className="relative z-10">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 rounded-lg flex items-center justify-center shadow-xl mb-3 mx-auto transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-extrabold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent text-center mb-1.5">
                      Impact
                    </h3>
                    <p className="text-xs text-gray-700 text-center leading-relaxed font-medium">
                      Measuring success in lives transformed
                    </p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-8">
                <div className="relative">
                  <div className="absolute -top-2 -left-2 w-12 h-12 border-t-2 border-l-2 border-primary-400 rounded-tl-xl opacity-30"></div>
                  <div className="absolute -bottom-2 -right-2 w-12 h-12 border-b-2 border-r-2 border-primary-400 rounded-br-xl opacity-30"></div>

                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 md:p-10 shadow-xl border border-white/50 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-5">
                      <div
                        className="absolute inset-0"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231A4B8A' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                          backgroundSize: "60px 60px",
                        }}
                      ></div>
                    </div>

                    <div className="relative z-10">
                      <div className="mb-6 sm:mb-8">
                        <div className="flex items-start gap-3 mb-3">
                          <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center shadow-lg transform rotate-3">
                            <svg
                              className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                              />
                            </svg>
                          </div>
                          <p className="text-base sm:text-lg md:text-xl text-gray-800 leading-relaxed font-bold">
                            <span className="bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
                              Well-Ed Foundation was created with a simple
                              intention � to stand with people where they are.
                            </span>
                          </p>
                        </div>
                      </div>

                      <div className="mb-6 sm:mb-8 space-y-4">
                        <p className="text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed">
                          We understand that health is often not ignored by
                          choice. For many individuals and families, it takes a
                          back seat because daily responsibilities are heavy,
                          resources are limited, and reliable guidance is hard
                          to find. We understand the confusion, the hesitation,
                          and the quiet concerns people carry about their
                          well-being.
                        </p>

                        {isAboutExpanded && (
                          <div className="space-y-4 transition-all duration-500 ease-in-out">
                            <p className="text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed">
                              At Well-Ed Foundation, we listen before we act. We
                              engage with communities with empathy and respect,
                              acknowledging their realities and lived
                              experiences. Our work is rooted in the belief that
                              every person deserves the opportunity to
                              understand their own health, regardless of
                              background or circumstance.
                            </p>

                            <p className="text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed">
                              We focus on making{" "}
                              <span className="font-semibold text-primary-700">
                                wellness education simple, accessible, and
                                meaningful
                              </span>
                              , especially for those who are underserved. By
                              sharing clear, practical health knowledge, we help
                              individuals take small but confident steps toward
                              caring for themselves and their families.
                            </p>
                          </div>
                        )}

                        <div className="flex justify-start pt-2">
                          <button
                            onClick={() => setIsAboutExpanded(!isAboutExpanded)}
                            className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-primary-700 hover:text-primary-800 bg-primary-50 hover:bg-primary-100 rounded-md transition-all duration-300 shadow-sm hover:shadow border border-primary-200 hover:border-primary-300"
                          >
                            <span>
                              {isAboutExpanded ? "Show Less" : "Know More"}
                            </span>
                            <svg
                              className={`w-3 h-3 transition-transform duration-300 ${
                                isAboutExpanded ? "rotate-180" : ""
                              }`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 my-6 sm:my-8">
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary-300 to-transparent"></div>
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center shadow-lg transform -rotate-6">
                          <svg
                            className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                            />
                          </svg>
                        </div>
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary-300 to-transparent"></div>
                      </div>

                      <div className="bg-gradient-to-br from-primary-50 via-yellow-50/50 to-primary-50 rounded-xl p-5 sm:p-6 md:p-8 border-2 border-primary-200/50 shadow-lg">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-1.5 h-1.5 bg-primary-600 rounded-full animate-pulse"></div>
                          <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-800">
                            Our Name, Our Promise
                          </h3>
                        </div>
                        <div className="space-y-3">
                          <p className="text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed font-semibold">
                            <span className="text-lg sm:text-xl md:text-2xl font-extrabold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
                              Well-Ed
                            </span>{" "}
                            stands for{" "}
                            <span className="text-primary-700 font-bold">
                              Wellness Education
                            </span>{" "}
                            - education that supports, not overwhelms.
                          </p>
                          <p className="text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed font-semibold">
                            It reflects our promise to guide without judgment
                            and to help without conditions.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="hidden lg:block lg:col-span-2 space-y-4">
                <div className="group relative bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border-2 border-green-200/60 shadow-lg hover:shadow-2xl hover:shadow-green-200/50 transition-all duration-500 hover:-translate-y-2 overflow-hidden">
                  <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%2322c55e' fill-opacity='0.4'%3E%3Cpath d='M20 20.5V18H0v-2h20v-2H0v-2h20v-2H0V8h20V6H0V4h20V2H0V0h22v20h18v-2H22zm0 0v2H0v-2h20z'/%3E%3C/g%3E%3C/svg%3E")`,
                        backgroundSize: "40px 40px",
                      }}
                    ></div>
                  </div>
                  <div className="relative z-10">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-400 via-green-500 to-green-600 rounded-lg flex items-center justify-center shadow-xl mb-3 mx-auto transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-extrabold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent text-center mb-1.5">
                      Education
                    </h3>
                    <p className="text-xs text-gray-700 text-center leading-relaxed font-medium">
                      Igniting minds, unlocking potential
                    </p>
                  </div>
                </div>

                <div className="group relative bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border-2 border-blue-200/60 shadow-lg hover:shadow-2xl hover:shadow-blue-200/50 transition-all duration-500 hover:-translate-y-2 overflow-hidden">
                  <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%233b82f6' fill-opacity='0.4'%3E%3Cpath d='M20 20.5V18H0v-2h20v-2H0v-2h20v-2H0V8h20V6H0V4h20V2H0V0h22v20h18v-2H22zm0 0v2H0v-2h20z'/%3E%3C/g%3E%3C/svg%3E")`,
                        backgroundSize: "40px 40px",
                      }}
                    ></div>
                  </div>
                  <div className="relative z-10">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-300 via-blue-400 to-blue-500 rounded-lg flex items-center justify-center shadow-xl mb-3 mx-auto transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-extrabold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent text-center mb-1.5">
                      Care
                    </h3>
                    <p className="text-xs text-gray-700 text-center leading-relaxed font-medium">
                      Nurturing wellness with compassion
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 sm:mt-10 md:mt-12 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div className="group relative bg-white/90 backdrop-blur-sm rounded-xl p-4 md:p-5 shadow-lg border border-primary-200/50 hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary-500 via-primary-600 to-primary-700"></div>

              <div className="mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center shadow-md transform group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
              </div>

              <h3 className="text-lg md:text-xl font-bold text-primary-700 mb-3">
                Our Mission
              </h3>
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed mb-2">
                Our mission is to make wellness education accessible to all,
                with special focus on underprivileged and underserved
                communities.
              </p>
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                We work to bridge the gaps created by lack of awareness, limited
                access, and social barriers that prevent people from
                understanding and managing their health. Through education,
                outreach, and community engagement, we aim to empower
                individuals with knowledge that is practical, respectful, and
                relevant to their everyday lives.
              </p>
            </div>

            <div className="group relative bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 rounded-xl p-4 md:p-5 shadow-lg text-white hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full blur-xl"></div>

              <div className="relative z-10">
                <div className="mb-3">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center shadow-md transform group-hover:scale-110 transition-transform duration-300">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </div>
                </div>

                <h3 className="text-lg md:text-xl font-bold mb-3">
                  Our Commitment
                </h3>
                <p className="text-xs sm:text-sm leading-relaxed mb-2">
                  At Well-Ed Foundation, wellness is inclusive and
                  compassionate.
                </p>
                <p className="text-xs sm:text-sm leading-relaxed opacity-95">
                  We are committed to walking alongside individuals and
                  communities listening, learning, and supporting them because
                  wellness should never be selective, and no one should feel
                  alone on their journey to better health.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 sm:mt-10 flex justify-center gap-3">
            <div className="w-2 h-2 bg-primary-400 rounded-full"></div>
            <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
            <div className="w-2 h-2 bg-primary-400 rounded-full"></div>
          </div>
        </div>
      </section>

      <section
        id="impact"
        className="py-8 md:py-10 bg-gradient-to-br from-primary-50 via-yellow-50/40 to-primary-50 relative w-full overflow-hidden"
      >
        <div className="absolute inset-0 bg-grid-pattern opacity-8"></div>

        <div className="absolute inset-0 bg-gradient-to-r from-primary-100/30 via-transparent to-yellow-100/30"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-40 h-40 bg-primary-200/40 rounded-full blur-3xl animate-float"></div>
          <div
            className="absolute bottom-10 right-10 w-48 h-48 bg-yellow-200/40 rounded-full blur-3xl animate-float"
            style={{ animationDelay: "1s" }}
          ></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-success-200/20 rounded-full blur-2xl animate-pulse-slow"></div>
        </div>

        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary-400 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-6 md:mb-8">
            <div className="inline-block mb-2 px-3 py-1 bg-gray-800 rounded-full shadow-md transform hover:scale-105 transition-transform duration-300">
              <span className="text-[10px] font-bold text-white uppercase tracking-wider">
                Making a Difference
              </span>
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
              const themes = [
                {
                  gradient: "from-yellow-400 via-yellow-500 to-yellow-600",
                  bg: "from-yellow-50 to-yellow-100",
                  border: "border-yellow-300",
                  text: "text-yellow-700",
                  shadow: "shadow-yellow-300/50",
                },
                {
                  gradient: "from-primary-600 via-primary-700 to-primary-800",
                  bg: "from-primary-50 to-primary-100",
                  border: "border-primary-300",
                  text: "text-primary-700",
                  shadow: "shadow-primary-300/50",
                },
                {
                  gradient: "from-green-400 via-green-500 to-green-600",
                  bg: "from-green-50 to-green-100",
                  border: "border-green-300",
                  text: "text-green-700",
                  shadow: "shadow-green-300/50",
                },
                {
                  gradient: "from-blue-300 via-blue-400 to-blue-500",
                  bg: "from-blue-50 to-blue-100",
                  border: "border-blue-300",
                  text: "text-blue-700",
                  shadow: "shadow-blue-300/50",
                },
              ];
              const theme = themes[index];

              return (
                <div
                  key={index}
                  className="group relative bg-white/90 backdrop-blur-sm rounded-xl p-2 md:p-3 text-center border-2 border-white/60 hover:border-white shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 overflow-hidden"
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${theme.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  ></div>

                  <div
                    className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${theme.gradient} shadow-md`}
                  ></div>

                  <div
                    className={`absolute inset-0 rounded-xl bg-gradient-to-r ${theme.gradient} opacity-0 group-hover:opacity-15 blur-md transition-opacity duration-500`}
                  ></div>

                  <div
                    className={`absolute top-1.5 right-1.5 w-2 h-2 border-t-2 border-r-2 ${theme.border} rounded-tr-md opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  ></div>
                  <div
                    className={`absolute bottom-1.5 left-1.5 w-2 h-2 border-b-2 border-l-2 ${theme.border} rounded-bl-md opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  ></div>

                  <div className="absolute top-3 right-3 w-1 h-1 bg-primary-300 rounded-full opacity-0 group-hover:opacity-60 animate-pulse"></div>
                  <div
                    className="absolute bottom-3 left-3 w-0.5 h-0.5 bg-primary-400 rounded-full opacity-0 group-hover:opacity-40 animate-pulse"
                    style={{ animationDelay: "0.3s" }}
                  ></div>

                  <div className="relative z-10">
                    <div className="relative mb-2 flex justify-center">
                      <div
                        className={`w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br ${theme.gradient} rounded-lg flex items-center justify-center shadow-xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 relative overflow-hidden border border-white/50`}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                        <svg
                          className="w-5 h-5 md:w-6 md:h-6 text-white transform group-hover:scale-110 transition-transform duration-500 relative z-10"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          strokeWidth={2.5}
                        >
                          {index === 0 && (
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            />
                          )}
                          {index === 1 && (
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                          )}
                          {index === 2 && (
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                            />
                          )}
                          {index === 3 && (
                            <>
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 14l9-5-9-5-9 5 9 5z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                              />
                            </>
                          )}
                        </svg>
                      </div>
                    </div>

                    <div className="mb-1">
                      <div
                        className={`text-xl md:text-2xl lg:text-3xl font-extrabold bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent mb-1 transform group-hover:scale-105 transition-transform duration-300`}
                      >
                        {stat.number}
                      </div>
                      <div
                        className={`h-0.5 bg-gradient-to-r ${theme.gradient} w-full mx-auto rounded-full`}
                      ></div>
                    </div>

                    <div
                      className={`text-[9px] md:text-[10px] font-bold ${theme.text} uppercase tracking-wider mb-1 transform group-hover:translate-y-[-1px] transition-transform duration-300`}
                    >
                      {stat.label}
                    </div>

                    <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <div
                          className={`w-1 h-1 rounded-full bg-gradient-to-r ${theme.gradient} animate-pulse`}
                        ></div>
                        <span className="text-[9px] text-gray-500 font-medium">
                          Growing
                        </span>
                        <div
                          className={`w-1 h-1 rounded-full bg-gradient-to-r ${theme.gradient} animate-pulse`}
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                      <div className="w-full h-0.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r ${theme.gradient} rounded-full transform translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-1000`}
                          style={{ width: `${75 + index * 5}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`absolute inset-0 rounded-xl ${theme.shadow} opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-500 -z-10`}
                  ></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section
        id="work"
        className="pt-4 md:pt-6 pb-20 md:pb-28 bg-white w-full"
        style={{ backgroundColor: "#ffffff" }}
      >
        <div className="w-full">
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold mb-6 text-blue-900">
              Our Programmes
            </h2>
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-yellow-400"></div>
              <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
              <div className="w-12 h-0.5 bg-gradient-to-r from-yellow-400 to-transparent"></div>
            </div>
            <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto font-medium">
              Empowering communities through comprehensive educational and
              wellness initiatives
            </p>
          </div>

          <div className="w-full relative">
            <div className="hidden lg:flex absolute left-4 top-0 bottom-0 w-48 items-center justify-center pointer-events-none z-0">
              <div className="relative w-full h-full flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-100/50 via-blue-100/40 to-cyan-100/50 rounded-3xl blur-2xl"></div>
                <div className="relative opacity-50">
                  <svg
                    width="100"
                    height="120"
                    viewBox="0 0 100 120"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Pastel Green Book - Back */}
                    <path
                      d="M8 25L8 70C8 72 9 73 11 73L35 73C37 73 38 72 38 70L38 25C38 23 37 22 35 22L11 22C9 22 8 23 8 25Z"
                      fill="#86EFAC"
                    />
                    <path d="M10 27L10 68L33 68L33 27L10 27Z" fill="#A7F3D0" />
                    <line
                      x1="14"
                      y1="35"
                      x2="29"
                      y2="35"
                      stroke="#6EE7B7"
                      strokeWidth="0.8"
                    />
                    <line
                      x1="14"
                      y1="42"
                      x2="29"
                      y2="42"
                      stroke="#6EE7B7"
                      strokeWidth="0.8"
                    />
                    <line
                      x1="14"
                      y1="49"
                      x2="29"
                      y2="49"
                      stroke="#6EE7B7"
                      strokeWidth="0.8"
                    />

                    {/* Pastel Pink Book - Middle */}
                    <path
                      d="M22 32L22 77C22 79 23 80 25 80L49 80C51 80 52 79 52 77L52 32C52 30 51 29 49 29L25 29C23 29 22 30 22 32Z"
                      fill="#F9A8D4"
                    />
                    <path d="M24 34L24 75L47 75L47 34L24 34Z" fill="#FBCFE8" />
                    <line
                      x1="28"
                      y1="42"
                      x2="43"
                      y2="42"
                      stroke="#F5A3D1"
                      strokeWidth="0.8"
                    />
                    <line
                      x1="28"
                      y1="49"
                      x2="43"
                      y2="49"
                      stroke="#F5A3D1"
                      strokeWidth="0.8"
                    />
                    <line
                      x1="28"
                      y1="56"
                      x2="43"
                      y2="56"
                      stroke="#F5A3D1"
                      strokeWidth="0.8"
                    />

                    {/* Pastel Light Blue Book - Front */}
                    <path
                      d="M36 39L36 84C36 86 37 87 39 87L63 87C65 87 66 86 66 84L66 39C66 37 65 36 63 36L39 36C37 36 36 37 36 39Z"
                      fill="#BAE6FD"
                    />
                    <path d="M38 41L38 82L61 82L61 41L38 41Z" fill="#DBEAFE" />
                    <line
                      x1="42"
                      y1="49"
                      x2="57"
                      y2="49"
                      stroke="#93C5FD"
                      strokeWidth="0.8"
                    />
                    <line
                      x1="42"
                      y1="56"
                      x2="57"
                      y2="56"
                      stroke="#93C5FD"
                      strokeWidth="0.8"
                    />
                    <line
                      x1="42"
                      y1="63"
                      x2="57"
                      y2="63"
                      stroke="#93C5FD"
                      strokeWidth="0.8"
                    />
                  </svg>
                </div>
                <div className="absolute top-10 left-10 w-24 h-24 bg-indigo-200/30 rounded-full blur-xl"></div>
                <div className="absolute bottom-10 right-10 w-20 h-20 bg-cyan-200/30 rounded-full blur-xl"></div>
              </div>
            </div>

            <div className="hidden lg:flex absolute right-4 top-0 bottom-0 w-48 items-center justify-center pointer-events-none z-0">
              <div className="relative w-full h-full flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-100/50 via-purple-100/40 to-rose-100/50 rounded-3xl blur-2xl"></div>
                <div className="relative opacity-50">
                  <svg
                    width="80"
                    height="100"
                    viewBox="0 0 80 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Stylized Yellow Lightbulb */}
                    <path
                      d="M40 5C28.95 5 20 13.95 20 25C20 33.28 23.89 40.5 30 44.5V58C30 59.66 31.34 61 33 61H47C48.66 61 50 59.66 50 58V44.5C56.11 40.5 60 33.28 60 25C60 13.95 51.05 5 40 5Z"
                      fill="#FCD34D"
                    />
                    <path
                      d="M40 9C31.16 9 24 16.16 24 25C24 32.18 27.47 38.5 32.5 42V57C32.5 58.05 33.45 59 34.5 59H45.5C46.55 59 47.5 58.05 47.5 57V42C52.53 38.5 56 32.18 56 25C56 16.16 48.84 9 40 9Z"
                      fill="#FDE047"
                    />
                    {/* Filament */}
                    <circle cx="40" cy="32" r="1.5" fill="#78350F" />
                    <path
                      d="M38 36L42 36"
                      stroke="#78350F"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                    />
                    {/* Base */}
                    <rect
                      x="35"
                      y="58"
                      width="10"
                      height="6"
                      rx="1"
                      fill="#F59E0B"
                    />
                    <rect
                      x="36.5"
                      y="64"
                      width="7"
                      height="5"
                      rx="0.8"
                      fill="#D97706"
                    />
                    <rect
                      x="38"
                      y="69"
                      width="4"
                      height="3"
                      rx="0.5"
                      fill="#78350F"
                    />
                  </svg>
                </div>
                <div className="absolute top-10 right-10 w-24 h-24 bg-violet-200/30 rounded-full blur-xl"></div>
                <div className="absolute bottom-10 left-10 w-20 h-20 bg-rose-200/30 rounded-full blur-xl"></div>
              </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 relative z-10">
              {PROGRAMS.map((program, index) => {
                const colorGradients = [
                  "from-blue-700 via-blue-800 to-blue-900", // Dark Blue - Educational Bridge
                  "from-yellow-400 via-yellow-500 to-yellow-600", // Bright Yellow - Digital Literacy
                  "from-blue-400 via-blue-500 to-blue-600", // Light Blue - Health & Wellness
                  "from-green-400 via-green-500 to-green-600", // Bright Green - Nutrition
                  "from-yellow-500 via-yellow-600 to-amber-500", // Yellow variant - Mobile Library
                  "from-emerald-500 via-green-600 to-teal-600",
                ];
                const bgGradients = [
                  "from-blue-50 via-blue-100/70 to-white",
                  "from-yellow-50 via-yellow-100/70 to-white",
                  "from-blue-50 via-sky-100/70 to-white",
                  "from-green-50 via-green-100/70 to-white",
                  "from-yellow-50 via-amber-50/70 to-white",
                  "from-emerald-50 via-green-100/70 to-white",
                ];

                const programIcons = [
                  <svg
                    key="education"
                    className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>,
                  <svg
                    key="digital"
                    className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>,
                  <svg
                    key="health"
                    className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>,
                  <svg
                    key="nutrition"
                    className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>,
                  <svg
                    key="library"
                    className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>,
                  <svg
                    key="mentorship"
                    className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>,
                ];

                return (
                  <div key={index} className="relative group h-full">
                    <div
                      className={`relative h-full rounded-2xl overflow-hidden bg-gradient-to-br ${bgGradients[index]} border-2 border-white/80 shadow-lg hover:shadow-xl transition-all duration-700 transform hover:-translate-y-1 flex flex-col`}
                    >
                      <div
                        className={`absolute inset-0 bg-gradient-to-r ${colorGradients[index]} opacity-0 group-hover:opacity-10 transition-opacity duration-700`}
                      ></div>

                      <div
                        className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${colorGradients[index]} shadow-md`}
                      ></div>

                      <div className="relative flex flex-col items-center text-center gap-2 md:gap-3 p-3 md:p-4 flex-grow">
                        <div className="flex-shrink-0 relative">
                          <div className="relative">
                            <div
                              className={`absolute inset-0 bg-gradient-to-r ${colorGradients[index]} rounded-full blur-2xl opacity-30 group-hover:opacity-50 group-hover:scale-150 transition-all duration-700`}
                            ></div>

                            <div
                              className={`relative w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-gradient-to-br ${colorGradients[index]} flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-700 shadow-xl border-2 border-white/50 mx-auto`}
                              style={{
                                borderRadius:
                                  index === 0
                                    ? "35% 65% 65% 35% / 35% 35% 65% 65%"
                                    : index === 1
                                    ? "65% 35% 35% 65% / 65% 65% 35% 35%"
                                    : index === 2
                                    ? "50% 50% 50% 50% / 60% 40% 60% 40%"
                                    : index === 3
                                    ? "40% 60% 60% 40% / 40% 60% 40% 60%"
                                    : index === 4
                                    ? "60% 40% 40% 60% / 50% 50% 50% 50%"
                                    : "45% 55% 55% 45% / 55% 45% 55% 45%",
                              }}
                            >
                              <div className="relative z-10 transform group-hover:scale-125 transition-transform duration-700">
                                {programIcons[index]}
                              </div>

                              <div
                                className={`absolute inset-3 bg-gradient-to-br ${colorGradients[index]} opacity-30 blur-xl rounded-full`}
                              ></div>

                              <div
                                className={`absolute -top-2 -right-2 w-3 h-3 bg-gradient-to-br ${colorGradients[index]} rounded-full opacity-60 group-hover:animate-ping`}
                              ></div>
                              <div
                                className={`absolute -bottom-2 -left-2 w-2 h-2 bg-gradient-to-br ${colorGradients[index]} rounded-full opacity-40 group-hover:animate-ping`}
                                style={{ animationDelay: "0.3s" }}
                              ></div>
                            </div>
                          </div>
                        </div>

                        <div className="flex-1 flex flex-col items-center justify-between w-full">
                          <div className="inline-flex items-center gap-1.5 mb-2 px-2 py-0.5 bg-white/80 backdrop-blur-sm rounded-full shadow-md">
                            <span
                              className={`text-[10px] font-black bg-gradient-to-r ${colorGradients[index]} bg-clip-text text-transparent`}
                            >
                              #{String(index + 1).padStart(2, "0")}
                            </span>
                            <div
                              className={`w-0.5 h-0.5 rounded-full bg-gradient-to-r ${colorGradients[index]}`}
                            ></div>
                          </div>

                          <h3
                            className={`text-sm md:text-base lg:text-base font-extrabold mb-1.5 md:mb-2 bg-gradient-to-r ${colorGradients[index]} bg-clip-text text-transparent leading-tight`}
                          >
                            {program.title}
                          </h3>

                          <p className="text-[10px] md:text-xs text-gray-700 leading-relaxed font-medium mb-2 flex-grow">
                            {program.detail}
                          </p>

                          <div className="flex items-center justify-center gap-1.5 w-full mt-auto">
                            <div
                              className={`w-6 h-0.5 bg-gradient-to-r ${colorGradients[index]} rounded-full`}
                            ></div>
                            <div
                              className={`w-1.5 h-1.5 bg-gradient-to-r ${colorGradients[index]} rounded-full`}
                            ></div>
                            <div
                              className={`w-4 h-0.5 bg-gradient-to-r ${colorGradients[index]} rounded-full`}
                            ></div>
                          </div>
                        </div>
                      </div>

                      <div
                        className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700`}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex justify-center items-center gap-4 mt-12 md:mt-16">
            <div className="w-3 h-3 bg-indigo-600 rounded-full animate-pulse"></div>
            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-indigo-600 to-transparent"></div>
            <div
              className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"
              style={{ animationDelay: "0.3s" }}
            ></div>
            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-emerald-500 to-transparent"></div>
            <div
              className="w-3 h-3 bg-violet-600 rounded-full animate-pulse"
              style={{ animationDelay: "0.6s" }}
            ></div>
          </div>
        </div>
      </section>

      <section
        id="stories"
        className="pt-6 md:pt-8 pb-8 md:pb-10 lg:pb-12 bg-gradient-to-b from-gray-50 via-white to-gray-50 relative overflow-hidden w-full border-2 border-yellow-400"
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary-100/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-100/25 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary-50/30 rounded-full blur-3xl"></div>
        </div>

        <div className="absolute inset-0 opacity-[0.015] pointer-events-none">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2240%22 height=%2240%22 viewBox=%220 0 40 40%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22%231A4B8A%22 fill-opacity=%220.4%22%3E%3Cpath d=%22M0 38.59l2.83-2.83 1.41 1.41L1.41 40H0v-1.41zM0 1.4l2.83 2.83 1.41-1.41L1.41 0H0v1.41zM38.59 40l-2.83-2.83 1.41-1.41L40 38.59V40h-1.41zM40 1.41l-2.83 2.83-1.41-1.41L38.59 0H40v1.41zM20 18.6l2.83-2.83 1.41 1.41L21.41 20l2.83 2.83-1.41 1.41L20 21.41l-2.83 2.83-1.41-1.41L18.59 20l-2.83-2.83 1.41-1.41L20 18.59z%22/%3E%3C/g%3E%3C/svg%3E')]"></div>
        </div>

        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary-300/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-yellow-300/40 to-transparent"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-4 md:mb-6">
            <div className="inline-block mb-1">
              <span className="text-primary-600 text-[10px] sm:text-xs font-bold uppercase tracking-widest">
                Real Impact
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold mb-2">
              <span className="bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 bg-clip-text text-transparent">
                Impact Stories
              </span>
            </h2>
            <div className="flex items-center justify-center gap-1.5 mb-2">
              <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-yellow-400"></div>
              <div className="w-1 h-1 bg-yellow-400 rounded-full"></div>
              <div className="w-8 h-0.5 bg-gradient-to-r from-yellow-400 to-transparent"></div>
            </div>
            <p className="text-gray-600 text-[10px] sm:text-xs max-w-2xl mx-auto">
              Real people, real transformations, real impact
            </p>
          </div>

          <div
            className="relative"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {impactStories.map((story, index) => {
              const isActive = index === currentStory;
              return (
                <div
                  key={index}
                  className={`transition-all duration-700 ${
                    isActive
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-95 absolute inset-0 pointer-events-none"
                  }`}
                >
                  <div
                    className={`bg-white rounded-xl lg:rounded-2xl shadow-2xl overflow-hidden border border-gray-200 max-w-4xl mx-auto group hover:shadow-3xl transition-all duration-500 ${
                      isActive ? "animate-[fadeInUp_0.6s_ease-out]" : ""
                    }`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-500 via-yellow-400 to-primary-500 opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10 blur-xl"></div>

                    <div className="grid md:grid-cols-5 gap-0 relative">
                      <div
                        className={`relative order-1 md:col-span-2 overflow-hidden aspect-square md:aspect-[4/5] group/image ${
                          index % 2 === 0 ? "" : "md:order-2"
                        } ${
                          isActive
                            ? index % 2 === 0
                              ? "animate-[fadeInLeft_0.7s_ease-out_0.1s_both]"
                              : "animate-[fadeInRight_0.7s_ease-out_0.1s_both]"
                            : ""
                        }`}
                      >
                        <OptimizedImage
                          src={story.image}
                          alt={`${story.name} - ${story.title}`}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          loading="lazy"
                        />

                        <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-yellow-400/30 to-transparent"></div>
                        <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-primary-600/30 to-transparent"></div>

                        <div
                          className={`absolute top-4 left-4 transform rotate-[-5deg] ${
                            isActive
                              ? "animate-[zoomIn_0.5s_ease-out_0.3s_both]"
                              : ""
                          }`}
                        >
                          <div className="px-3 py-1.5 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg border-2 border-yellow-400">
                            <span className="text-xs font-black text-primary-700 uppercase tracking-wider">
                              {story.badge.split(" ")[0]}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div
                        className={`p-4 md:p-5 lg:p-6 flex flex-col justify-center md:col-span-3 relative ${
                          index % 2 === 0 ? "order-2" : "order-1"
                        } ${
                          isActive
                            ? index % 2 === 0
                              ? "animate-[fadeInRight_0.7s_ease-out_0.2s_both]"
                              : "animate-[fadeInLeft_0.7s_ease-out_0.2s_both]"
                            : ""
                        }`}
                      >
                        <div className="absolute inset-0 opacity-5">
                          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%231A4B8A%22 fill-opacity=%221%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
                        </div>

                        <div className="relative z-10">
                          <div
                            className={`mb-4 ${
                              isActive
                                ? "animate-[fadeInUp_0.5s_ease-out_0.3s_both]"
                                : ""
                            }`}
                          >
                            <svg
                              className="w-8 h-8 text-primary-200"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.996 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.984zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                            </svg>
                          </div>

                          <div
                            className={`mb-4 ${
                              isActive
                                ? "animate-[fadeInUp_0.5s_ease-out_0.35s_both]"
                                : ""
                            }`}
                          >
                            <h4 className="text-lg sm:text-xl md:text-2xl font-extrabold text-gray-900 mb-3 leading-tight">
                              <span className="bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
                                {story.name}
                              </span>
                              <span className="text-gray-700">
                                , {story.title}
                              </span>
                            </h4>

                            <div
                              className={`flex items-center gap-2 mb-4 ${
                                isActive
                                  ? "animate-[fadeInRight_0.6s_ease-out_0.4s_both]"
                                  : ""
                              }`}
                            >
                              <div className="h-1 w-12 bg-gradient-to-r from-primary-600 to-yellow-400 rounded-full"></div>
                              <div className="h-1 w-1 bg-yellow-400 rounded-full"></div>
                              <div className="h-1 w-8 bg-gradient-to-r from-yellow-400 to-primary-600 rounded-full"></div>
                            </div>
                          </div>

                          <p
                            className={`text-gray-700 text-sm sm:text-base leading-relaxed mb-5 font-medium ${
                              isActive
                                ? "animate-[fadeInUp_0.6s_ease-out_0.45s_both]"
                                : ""
                            }`}
                          >
                            {story.description}
                          </p>

                          <div
                            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-primary-50 to-yellow-50 border-2 border-primary-200 shadow-md hover:shadow-lg transition-shadow duration-300 group/badge ${
                              isActive
                                ? "animate-[fadeInUp_0.5s_ease-out_0.5s_both]"
                                : ""
                            }`}
                          >
                            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                            <span className="text-xs font-black text-primary-700 uppercase tracking-widest">
                              {story.badge}
                            </span>
                            <svg
                              className="w-4 h-4 text-primary-600 transform group-hover/badge:translate-x-1 transition-transform"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2.5}
                                d="M13 7l5 5m0 0l-5 5m5-5H6"
                              />
                            </svg>
                          </div>
                        </div>

                        <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-primary-100/50 to-transparent rounded-tl-full"></div>
                      </div>
                    </div>

                    <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-primary-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                </div>
              );
            })}

            <button
              onClick={prevStory}
              className="absolute left-0 md:-left-4 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white shadow-xl flex items-center justify-center text-primary-600 hover:text-primary-700 hover:bg-primary-50 transition-all duration-300 z-20 border border-gray-200 hover:border-primary-300 group"
              aria-label="Previous story"
            >
              <svg
                className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={nextStory}
              className="absolute right-0 md:-right-4 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white shadow-xl flex items-center justify-center text-primary-600 hover:text-primary-700 hover:bg-primary-50 transition-all duration-300 z-20 border border-gray-200 hover:border-primary-300 group"
              aria-label="Next story"
            >
              <svg
                className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            <div className="flex justify-center gap-2 sm:gap-3 mt-6 md:mt-8">
              {impactStories.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToStory(index)}
                  className={`transition-all duration-300 rounded-full ${
                    index === currentStory
                      ? "w-10 sm:w-12 h-3 bg-gradient-to-r from-primary-600 to-yellow-400 shadow-lg"
                      : "w-3 h-3 bg-gray-300 hover:bg-primary-400"
                  }`}
                  aria-label={`Go to story ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* Contact Us message  */}
      <SendUsMessage />
      <Footer />
    </div>
  );
}

export default Home;
