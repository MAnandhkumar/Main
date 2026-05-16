'use client'

import Link from 'next/link'
import { ArrowLeft, HelpCircle, MessageSquare, Mail, Shield, Zap, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="w-full bg-brand-gradient py-16 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-20">
          <div className="absolute top-10 left-10 w-96 h-96 bg-white blur-[120px] rounded-full animate-pulse" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white blur-[120px] rounded-full animate-pulse" />
        </div>
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8 text-sm font-black uppercase tracking-widest">
            <ArrowLeft className="w-4 h-4" /> Back to Deals
          </Link>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-6">How can we help?</h1>
          <div className="max-w-2xl mx-auto relative group">
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-accent animate-pulse" />
            </div>
            <input 
              type="text" 
              placeholder="How can we help you find victory today?" 
              className="w-full h-16 pl-14 pr-32 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-lg focus:outline-none focus:ring-4 focus:ring-accent/30 transition-all placeholder:text-white/50"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Quick Links */}
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <HelpCard 
              icon={<Zap className="w-6 h-6 text-primary" />}
              title="How NASKART Works"
              desc="Learn how we find and verify the best affiliate deals across the globe."
            />
            <HelpCard 
              icon={<Shield className="w-6 h-6 text-green-500" />}
              title="Verified Partners"
              desc="Our commitment to only linking to trusted and secure merchant sites."
            />
            <HelpCard 
              icon={<MessageSquare className="w-6 h-6 text-blue-500" />}
              title="Deal Reporting"
              desc="Found a broken link or an expired deal? Let our team know immediately."
            />
            <HelpCard 
              icon={<Mail className="w-6 h-6 text-purple-500" />}
              title="Privacy Policy"
              desc="Understand how we handle redirection and your browsing experience."
            />
          </div>

          {/* Contact Support */}
          <div className="space-y-6">
            <div className="bg-slate-100 dark:bg-slate-800/50 p-8 rounded-3xl border border-border/50">
              <h3 className="text-xl font-black mb-4">Still need help?</h3>
              <p className="text-sm text-muted-foreground mb-8">Our support team is available 24/7 to help you with any deal-related queries.</p>
              <Button className="w-full h-12 rounded-xl bg-primary text-white font-black uppercase text-xs tracking-widest shadow-lg shadow-primary/20">
                Contact Support
              </Button>
            </div>
            <div className="p-8 rounded-3xl border border-dashed border-border flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
                <HelpCircle className="w-6 h-6 text-muted-foreground" />
              </div>
              <h4 className="font-bold text-sm mb-2">FAQ Section</h4>
              <p className="text-[10px] text-muted-foreground">Quick answers to common questions about our platform.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function HelpCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="p-8 rounded-3xl border border-border/50 bg-card hover:border-primary/50 transition-all hover:shadow-xl group">
      <div className="mb-6 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 w-fit group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-lg font-black mb-2 tracking-tight">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
    </div>
  )
}
