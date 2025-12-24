/**
 * Smooth scroll utility function
 * Provides enhanced smooth scrolling with offset for fixed navigation
 */
export const smoothScrollTo = (targetId, offset = 100) => {
  const targetElement = document.getElementById(targetId)
  if (targetElement) {
    const elementPosition = targetElement.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - offset
    
    // Use native browser smooth scrolling
    window.scrollTo({
      top: Math.max(0, offsetPosition),
      behavior: 'smooth'
    })
  }
}

/**
 * Handle anchor link clicks with smooth scrolling
 */
export const handleAnchorClick = (e, offset = 100) => {
  const href = e.currentTarget.getAttribute('href')
  if (href && href.startsWith('#') && href !== '#') {
    const targetId = href.substring(1)
    if (targetId && targetId !== '') {
      e.preventDefault()
      e.stopPropagation()
      
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        smoothScrollTo(targetId, offset)
      }, 10)
    }
  }
}

