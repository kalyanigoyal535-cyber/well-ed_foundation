import { useState } from 'react'

function OptimizedImage({ 
  src, 
  alt, 
  className = '', 
  loading = 'lazy',
  width,
  height,
  priority = false,
  fallback = '/logo.png',
  ...props 
}) {
  const [imageError, setImageError] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  const handleError = (e) => {
    if (fallback && !imageError) {
      setImageError(true)
      e.target.src = fallback
    } else {
      e.target.style.display = 'none'
    }
  }

  const handleLoad = () => {
    setImageLoaded(true)
  }

  return (
    <img
      src={src}
      alt={alt}
      className={`${className} ${!imageLoaded ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
      loading={priority ? 'eager' : loading}
      width={width}
      height={height}
      onError={handleError}
      onLoad={handleLoad}
      decoding="async"
      {...props}
    />
  )
}

export default OptimizedImage
