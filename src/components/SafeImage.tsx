'use client'

import { useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface SafeImageProps extends React.ComponentPropsWithoutRef<typeof Image> {
  fallback?: string
}

export function SafeImage({
  src,
  alt,
  className,
  fallback = 'https://images.unsplash.com/photo-1560393464-5c69a73c5770?q=80&w=800&auto=format&fit=crop',
  width,
  height,
  ...props
}: SafeImageProps) {
  const [prevSrc, setPrevSrc] = useState(src)
  const [imgSrc, setImgSrc] = useState(src)
  const [error, setError] = useState(!src)

  if (src !== prevSrc) {
    setPrevSrc(src)
    setImgSrc(src)
    setError(!src)
  }

  const handleError = () => {
    if (!error) {
      setImgSrc(fallback)
      setError(true)
    }
  }

  if (error) {
    return (
      <div
        className={cn(
          'bg-victory-maroon flex flex-col items-center justify-center p-4 text-center text-white',
          className
        )}
      >
        <div className="bg-victory-gold/20 mb-2 rounded-full p-4">
          <span className="text-xl font-black tracking-tighter opacity-80">
            NK
          </span>
        </div>
        <span className="text-[10px] font-black tracking-widest uppercase opacity-60">
          Victory Selection
        </span>
      </div>
    )
  }

  return (
    <Image
      {...props}
      src={imgSrc || fallback}
      alt={alt || ''}
      width={width || 800}
      height={height || 800}
      className={cn(className, error && 'opacity-80 grayscale-[0.5]')}
      onError={handleError}
      unoptimized // Keep it unoptimized to behave like a standard img but satisfy the lint
    />
  )
}
