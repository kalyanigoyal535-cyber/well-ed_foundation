export const smoothScrollTo = (targetId, offset = 100) => {
  const targetElement = document.getElementById(targetId)
  if (targetElement) {
    const elementPosition = targetElement.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - offset
    
    window.scrollTo({
      top: Math.max(0, offsetPosition),
      behavior: 'smooth'
    })
  }
}

export const handleAnchorClick = (e, offset = 100) => {
  const href = e.currentTarget.getAttribute('href')
  if (href && href.startsWith('#') && href !== '#') {
    const targetId = href.substring(1)
    if (targetId && targetId !== '') {
      e.preventDefault()
      e.stopPropagation()
      
      setTimeout(() => {
        smoothScrollTo(targetId, offset)
      }, 10)
    }
  }
}
