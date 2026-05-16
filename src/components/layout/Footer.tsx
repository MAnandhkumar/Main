'use client'

import Link from 'next/link'
import { ShoppingBag, Facebook, Twitter, Instagram, Youtube, ExternalLink, Mail, Phone, MapPin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="w-full bg-slate-950 text-slate-400 pt-20 pb-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-20">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-8">
            <Link href="/" className="flex items-center gap-2 group w-fit">
              <div className="bg-primary p-2 rounded-lg text-white">
                <ShoppingBag className="h-5 w-5" />
              </div>
              <span className="font-black text-xl tracking-tighter text-white">NASKART</span>
            </Link>
            <p className="text-sm leading-relaxed max-w-sm">
              Naskart is your premier destination for curated affiliate deals, premium electronics, and the latest tech gadgets. We partner with the world's leading brands to bring you exclusive offers.
            </p>
            <div className="flex items-center gap-4">
              <Link href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-primary hover:text-white transition-all"><Facebook className="w-4 h-4" /></Link>
              <Link href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-primary hover:text-white transition-all"><Twitter className="w-4 h-4" /></Link>
              <Link href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-primary hover:text-white transition-all"><Instagram className="w-4 h-4" /></Link>
              <Link href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-primary hover:text-white transition-all"><Youtube className="w-4 h-4" /></Link>
            </div>
          </div>

          {/* Links Column 1 */}
          <div>
            <h4 className="text-white font-black uppercase text-[10px] tracking-widest mb-8">Shopping Guide</h4>
            <ul className="space-y-4 text-sm">
              <li><Link href="#" className="hover:text-primary transition-colors">How to Buy</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Payment Methods</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Shipping Options</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Affiliate Policy</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Flash Sales</Link></li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div>
            <h4 className="text-white font-black uppercase text-[10px] tracking-widest mb-8">Customer Care</h4>
            <ul className="space-y-4 text-sm">
              <li><Link href="#" className="hover:text-primary transition-colors">Track Order</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Returns & Refunds</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Help Center</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Report a Bug</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="text-white font-black uppercase text-[10px] tracking-widest mb-8">Get in Touch</h4>
            <div className="flex gap-4">
              <Phone className="w-5 h-5 text-primary shrink-0" />
              <div className="text-sm">
                <p className="text-white font-bold">+91 98765 43210</p>
                <p className="text-[10px] text-slate-500">Mon-Fri: 9am - 6pm</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Mail className="w-5 h-5 text-primary shrink-0" />
              <div className="text-sm">
                <p className="text-white font-bold">support@naskart.com</p>
                <p className="text-[10px] text-slate-500">24/7 Online Support</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-[10px] font-bold uppercase tracking-widest">
            &copy; {new Date().getFullYear()} NASKART ENTERPRISE. ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center gap-6 text-[10px] font-bold uppercase tracking-widest">
             <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
             <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
             <Link href="#" className="hover:text-white transition-colors">Cookies</Link>
          </div>
          <div className="flex items-center gap-4 grayscale opacity-50">
             <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" className="h-4" alt="Visa" />
             <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-6" alt="Mastercard" />
             <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" className="h-4" alt="Paypal" />
          </div>
        </div>
      </div>
    </footer>
  )
}
