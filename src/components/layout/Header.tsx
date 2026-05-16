'use client'

import Link from 'next/link'
import { Search, Zap } from 'lucide-react'
import { ThemeToggle } from '@/components/ThemeToggle'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/components/Providers'
import { motion } from 'framer-motion'

export function Header() {
  useLanguage()

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="bg-victory-maroon shadow-primary/20 sticky top-0 z-50 w-full border-b border-white/10 shadow-2xl transition-all duration-300"
    >
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-6 px-4 md:h-24 md:gap-12">
        {/* Left: Branding */}
        <Link href="/" className="group flex shrink-0 items-center gap-3">
          <div className="bg-victory-maroon shadow-primary/30 rounded-2xl p-2.5 text-white shadow-2xl transition-all duration-500 ease-out group-hover:scale-110 group-hover:rotate-6">
            <Zap className="h-6 w-6 fill-white/20 md:h-7 md:w-7" />
          </div>
          <div className="-gap-1 flex hidden flex-col sm:flex">
            <span className="font-heading text-2xl leading-none font-extrabold tracking-tighter text-white uppercase md:text-3xl">
              NASKART
            </span>
            <span className="text-accent pl-1 text-[9px] font-black tracking-[0.3em] uppercase">
              Victory Deals
            </span>
          </div>
        </Link>

        {/* Center: Mega Search (Enterprise Grade) */}
        <div className="group relative hidden max-w-3xl flex-1 md:block">
          <div className="pointer-events-none absolute inset-y-0 left-5 z-10 flex items-center">
            <Search className="group-focus-within:text-accent h-5 w-5 text-white/50 transition-all duration-300" />
          </div>
          <input
            type="text"
            placeholder="Search for victory-grade deals..."
            className="focus:border-accent/40 h-14 w-full rounded-2xl border-2 border-white/5 bg-white/10 pr-36 pl-14 text-base text-white shadow-inner transition-all duration-300 outline-none placeholder:text-white/40 hover:bg-white/15 focus:bg-white/20"
          />
          <div className="absolute top-1.5 right-1.5 flex items-center gap-2">
            <Button
              variant="brand"
              className="shadow-primary/20 hover:shadow-accent/40 h-11 rounded-xl px-8 text-xs font-bold tracking-widest uppercase shadow-2xl transition-all"
            >
              Hunt
            </Button>
          </div>
        </div>

        {/* Right: Premium Actions */}
        <div className="flex shrink-0 items-center gap-4 md:gap-8">
          {/* Status Links */}
          <div className="hidden items-center gap-8 xl:flex">
            <Link href="/help" className="group flex flex-col items-center">
              <span className="group-hover:text-accent text-[10px] font-black tracking-[0.2em] tracking-widest text-white/50 uppercase transition-colors">
                Support
              </span>
              <span className="text-[12px] font-bold text-white">Help Hub</span>
            </Link>
            <div className="h-8 w-px rotate-12 bg-white/10" />
            <div className="flex flex-col items-end">
              <span className="text-accent animate-pulse text-[10px] font-black tracking-[0.2em] tracking-widest uppercase">
                Verified
              </span>
              <span className="text-[12px] font-bold text-white">
                Best Prices
              </span>
            </div>
          </div>

          {/* Luxury Switchers */}
          <div className="flex items-center gap-2 rounded-2xl border border-white/5 bg-white/10 p-1.5 shadow-sm backdrop-blur-md">
            <LanguageSwitcher />
            <div className="mx-1 h-5 w-px bg-white/10" />
            <ThemeToggle />
          </div>

          {/* Mobile Actions */}
          <button className="bg-secondary/50 border-border/50 hover:bg-secondary rounded-2xl border p-3 transition-all active:scale-90 md:hidden">
            <Search className="text-primary h-5 w-5" />
          </button>
        </div>
      </div>
    </motion.header>
  )
}
