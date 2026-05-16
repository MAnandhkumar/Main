'use client'

import Link from 'next/link'
import { Search, Zap, Phone, HelpCircle } from 'lucide-react'
import { ThemeToggle } from '@/components/ThemeToggle'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/components/Providers'
import { motion } from 'framer-motion'

export function Header() {
  const { t } = useLanguage()

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-50 w-full bg-victory-maroon border-b border-white/10 shadow-2xl shadow-primary/20 transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 h-18 md:h-24 flex items-center justify-between gap-6 md:gap-12">
        {/* Left: Branding */}
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          <div className="bg-victory-maroon p-2.5 rounded-2xl text-white shadow-2xl shadow-primary/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 ease-out">
            <Zap className="h-6 w-6 md:h-7 md:w-7 fill-white/20" />
          </div>
          <div className="flex flex-col -gap-1 hidden sm:flex">
            <span className="font-heading font-extrabold text-2xl md:text-3xl tracking-tighter uppercase leading-none text-white">NASKART</span>
            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-accent pl-1">Victory Deals</span>
          </div>
        </Link>

        {/* Center: Mega Search (Enterprise Grade) */}
        <div className="flex-1 max-w-3xl relative group hidden md:block">
          <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none z-10">
            <Search className="h-5 w-5 text-white/50 group-focus-within:text-accent transition-all duration-300" />
          </div>
          <input
            type="text"
            placeholder="Search for victory-grade deals..."
            className="w-full h-14 pl-14 pr-36 bg-white/10 hover:bg-white/15 focus:bg-white/20 border-2 border-white/5 focus:border-accent/40 rounded-2xl text-base text-white placeholder:text-white/40 transition-all duration-300 outline-none shadow-inner"
          />
          <div className="absolute right-1.5 top-1.5 flex items-center gap-2">
            <Button variant="brand" className="h-11 px-8 rounded-xl font-bold uppercase text-xs tracking-widest shadow-2xl shadow-primary/20 hover:shadow-accent/40 transition-all">
              Hunt
            </Button>
          </div>
        </div>

        {/* Right: Premium Actions */}
        <div className="flex items-center gap-4 md:gap-8 shrink-0">
          {/* Status Links */}
          <div className="hidden xl:flex items-center gap-8">
            <Link href="/help" className="flex flex-col items-center group">
              <span className="text-[10px] font-black text-white/50 group-hover:text-accent uppercase tracking-widest transition-colors tracking-[0.2em]">Support</span>
              <span className="text-[12px] font-bold text-white">Help Hub</span>
            </Link>
            <div className="h-8 w-px bg-white/10 rotate-12" />
            <div className="flex flex-col items-end">
              <span className="text-[10px] font-black text-accent uppercase tracking-widest animate-pulse tracking-[0.2em]">Verified</span>
              <span className="text-[12px] font-bold text-white">Best Prices</span>
            </div>
          </div>

          {/* Luxury Switchers */}
          <div className="flex items-center gap-2 bg-white/10 p-1.5 rounded-2xl border border-white/5 backdrop-blur-md shadow-sm">
            <LanguageSwitcher />
            <div className="w-px h-5 bg-white/10 mx-1" />
            <ThemeToggle />
          </div>

          {/* Mobile Actions */}
          <button className="md:hidden bg-secondary/50 p-3 rounded-2xl border border-border/50 hover:bg-secondary transition-all active:scale-90">
            <Search className="w-5 h-5 text-primary" />
          </button>
        </div>
      </div>
    </motion.header>
  )
}
