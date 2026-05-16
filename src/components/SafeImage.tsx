'use client'

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallback?: string
}

export function SafeImage({
  src,
  alt,
  className,
  fallback = 'https://images.unsplash.com/photo-1560393464-5c69a73c5770?q=80&w=800&auto=format&fit=crop',
  ...props
}: SafeImageProps) {
  const [imgSrc, setImgSrc] = useState(src)
  const [error, setError] = useState(!src)

  // Sync if src prop changes externally
  useEffect(() => {
    if (!src) {
      setError(true)
    } else {
      setImgSrc(src)
      setError(false)
    }
  }, [src])

  const handleError = () => {
    if (!error) {
      setImgSrc(fallback)
      setError(true)
    }
  }

  if (error) {
    return (
      <div className={cn("flex flex-col items-center justify-center bg-victory-maroon text-white p-4 text-center", className)}>
        <div className="bg-victory-gold/20 p-4 rounded-full mb-2">
          <span className="font-black text-xl tracking-tighter opacity-80">NK</span>
        </div>
        <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Victory Selection</span>
      </div>
    )
  }

  return (
    <img
      {...props}
      src={imgSrc}
      alt={alt}
      className={cn(className, error && "opacity-80 grayscale-[0.5]")}
      onError={handleError}
    />
  )
}
