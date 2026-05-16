'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useSyncExternalStore,
} from 'react'

type Language = 'en' | 'ta'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    home: 'Home',
    deals: 'Browse Deals',
    admin: 'Admin',
    hero_title: 'Find Top Products at the Best Prices',
    hero_subtitle:
      "We curate the highest quality products and latest tech gear so you don't have to search. Shop hand-picked collections today.",
    explore_deals: 'Explore Deals',
    view_categories: 'View Categories',
    trending_now: 'Trending Now',
    newsletter_title: 'Never miss a deal!',
    subscribe: 'Subscribe',
  },
  ta: {
    home: 'முகப்பு',
    deals: 'சலுகைகள்',
    admin: 'நிர்வாகம்',
    hero_title: 'சிறந்த விலையில் சிறந்த தயாரிப்புகளைக் கண்டறியவும்',
    hero_subtitle:
      'நாங்கள் மிக உயர்ந்த தரமான தயாரிப்புகள் மற்றும் சமீபத்திய தொழில்நுட்ப கருவிகளைத் தேர்ந்தெடுக்கிறோம். இன்று தனிப்பயனாக்கப்பட்ட சேகரிப்புகளை வாங்கவும்.',
    explore_deals: 'சலுகைகளை ஆராயுங்கள்',
    view_categories: 'வகைகளைக் காண்க',
    trending_now: 'இப்போது பிரபலமானது',
    newsletter_title: 'ஒரு சலுகையையும் தவறவிடாதீர்கள்!',
    subscribe: 'பதிவு செய்யுங்கள்',
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
)

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context)
    throw new Error('useLanguage must be used within a LanguageProvider')
  return context
}

// Standard React pattern to detect mounting without triggering setState in useEffect
function useMounted() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  )
}

export function Providers({ children }: { children: React.ReactNode }) {
  // Use lazy initializer to load language from localStorage
  const [language, setLanguage] = useState<Language>(() => {
    // We check for window to avoid errors during SSR
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('language') as Language
      if (saved && translations[saved]) return saved
    }
    return 'en'
  })

  const mounted = useMounted()

  // Sync state if it changes externally (not needed here but good to keep if logic grows)
  useEffect(() => {
    // If we wanted to react to localStorage changes in other tabs
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'language') {
        const lang = e.newValue as Language
        if (lang && translations[lang]) setLanguage(lang)
      }
    }
    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem('language', lang)
  }

  const t = (key: string) => {
    return translations[language][key] || key
  }

  return (
    <NextThemesProvider attribute="class" defaultTheme="dark" enableSystem>
      <LanguageContext.Provider
        value={{ language, setLanguage: handleSetLanguage, t }}
      >
        <div style={{ visibility: mounted ? 'visible' : 'hidden' }}>
          {children}
        </div>
      </LanguageContext.Provider>
    </NextThemesProvider>
  )
}
