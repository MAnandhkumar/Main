'use client'

import { useLanguage } from './Providers'
import { cn } from '@/lib/utils'

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ta' : 'en')
  }

  return (
    <button
      onClick={toggleLanguage}
      className="group relative flex h-8 w-16 items-center gap-0.5 rounded-full bg-slate-200 p-0.5 transition-all dark:bg-slate-800"
    >
      {/* Sliding Background */}
      <div
        className={cn(
          'absolute inset-y-0.5 w-[30px] rounded-full shadow-sm transition-all duration-300 ease-out',
          language === 'en'
            ? 'left-0.5 bg-white dark:bg-slate-700'
            : 'bg-primary left-[33px]'
        )}
      />

      {/* Options */}
      <div className="relative z-10 flex h-full w-full items-center justify-between px-2 text-[10px] leading-none font-black tracking-widest select-none">
        <span
          className={cn(
            'transition-colors duration-300',
            language === 'en'
              ? 'text-slate-900 dark:text-white'
              : 'text-muted-foreground'
          )}
        >
          EN
        </span>
        <span
          className={cn(
            'transition-colors duration-300',
            language === 'ta' ? 'text-white' : 'text-muted-foreground'
          )}
        >
          TA
        </span>
      </div>
    </button>
  )
}
