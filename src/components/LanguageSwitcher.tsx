'use client'

import { useLanguage } from './Providers'
import { Languages } from 'lucide-react'
import { cn } from '@/lib/utils'

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ta' : 'en')
  }

  return (
    <button 
      onClick={toggleLanguage}
      className="flex items-center gap-0.5 p-0.5 rounded-full bg-slate-200 dark:bg-slate-800 relative w-16 h-8 group transition-all"
    >
      {/* Sliding Background */}
      <div 
        className={cn(
          "absolute inset-y-0.5 rounded-full w-[30px] shadow-sm transition-all duration-300 ease-out",
          language === 'en' ? "left-0.5 bg-white dark:bg-slate-700" : "left-[33px] bg-primary"
        )}
      />
      
      {/* Options */}
      <div className="relative flex w-full h-full items-center justify-between px-2 text-[10px] font-black tracking-widest leading-none z-10 select-none">
        <span className={cn(
          "transition-colors duration-300",
          language === 'en' ? "text-slate-900 dark:text-white" : "text-muted-foreground"
        )}>
          EN
        </span>
        <span className={cn(
          "transition-colors duration-300",
          language === 'ta' ? "text-white" : "text-muted-foreground"
        )}>
          TA
        </span>
      </div>
    </button>
  )
}
