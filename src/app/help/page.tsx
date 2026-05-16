'use client'

import Link from 'next/link'
import {
  ArrowLeft,
  HelpCircle,
  MessageSquare,
  Mail,
  Shield,
  Zap,
  Search,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function HelpPage() {
  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <div className="bg-brand-gradient relative w-full overflow-hidden py-16 text-white">
        <div className="absolute top-0 left-0 h-full w-full opacity-20">
          <div className="absolute top-10 left-10 h-96 w-96 animate-pulse rounded-full bg-white blur-[120px]" />
          <div className="absolute right-10 bottom-10 h-96 w-96 animate-pulse rounded-full bg-white blur-[120px]" />
        </div>
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 text-sm font-black tracking-widest text-white/60 uppercase transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Deals
          </Link>
          <h1 className="mb-6 text-4xl font-black tracking-tighter md:text-6xl">
            How can we help?
          </h1>
          <div className="group relative mx-auto max-w-2xl">
            <div className="pointer-events-none absolute inset-y-0 left-5 flex items-center">
              <Search className="text-accent h-5 w-5 animate-pulse" />
            </div>
            <input
              type="text"
              placeholder="How can we help you find victory today?"
              className="focus:ring-accent/30 h-16 w-full rounded-2xl border border-white/20 bg-white/10 pr-32 pl-14 text-lg backdrop-blur-xl transition-all placeholder:text-white/50 focus:ring-4 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Quick Links */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:col-span-2">
            <HelpCard
              icon={<Zap className="text-primary h-6 w-6" />}
              title="How NASKART Works"
              desc="Learn how we find and verify the best affiliate deals across the globe."
            />
            <HelpCard
              icon={<Shield className="h-6 w-6 text-green-500" />}
              title="Verified Partners"
              desc="Our commitment to only linking to trusted and secure merchant sites."
            />
            <HelpCard
              icon={<MessageSquare className="h-6 w-6 text-blue-500" />}
              title="Deal Reporting"
              desc="Found a broken link or an expired deal? Let our team know immediately."
            />
            <HelpCard
              icon={<Mail className="h-6 w-6 text-purple-500" />}
              title="Privacy Policy"
              desc="Understand how we handle redirection and your browsing experience."
            />
          </div>

          {/* Contact Support */}
          <div className="space-y-6">
            <div className="border-border/50 rounded-3xl border bg-slate-100 p-8 dark:bg-slate-800/50">
              <h3 className="mb-4 text-xl font-black">Still need help?</h3>
              <p className="text-muted-foreground mb-8 text-sm">
                Our support team is available 24/7 to help you with any
                deal-related queries.
              </p>
              <Button className="bg-primary shadow-primary/20 h-12 w-full rounded-xl text-xs font-black tracking-widest text-white uppercase shadow-lg">
                Contact Support
              </Button>
            </div>
            <div className="border-border flex flex-col items-center rounded-3xl border border-dashed p-8 text-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
                <HelpCircle className="text-muted-foreground h-6 w-6" />
              </div>
              <h4 className="mb-2 text-sm font-bold">FAQ Section</h4>
              <p className="text-muted-foreground text-[10px]">
                Quick answers to common questions about our platform.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function HelpCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode
  title: string
  desc: string
}) {
  return (
    <div className="border-border/50 bg-card hover:border-primary/50 group rounded-3xl border p-8 transition-all hover:shadow-xl">
      <div className="mb-6 w-fit rounded-2xl bg-slate-50 p-4 transition-transform group-hover:scale-110 dark:bg-slate-800/50">
        {icon}
      </div>
      <h3 className="mb-2 text-lg font-black tracking-tight">{title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
    </div>
  )
}
