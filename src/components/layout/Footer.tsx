'use client'

import Link from 'next/link'
import Image from 'next/image'
import {
  ShoppingBag,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
} from 'lucide-react'

export function Footer() {
  return (
    <footer className="w-full border-t border-white/5 bg-slate-950 pt-20 pb-10 text-slate-400">
      <div className="mx-auto max-w-7xl px-4">
        {/* Main Footer Grid */}
        <div className="mb-20 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Info */}
          <div className="space-y-8 lg:col-span-2">
            <Link href="/" className="group flex w-fit items-center gap-2">
              <div className="bg-primary rounded-lg p-2 text-white">
                <ShoppingBag className="h-5 w-5" />
              </div>
              <span className="text-xl font-black tracking-tighter text-white">
                NASKART
              </span>
            </Link>
            <p className="max-w-sm text-sm leading-relaxed">
              Naskart is your premier destination for curated affiliate deals,
              premium electronics, and the latest tech gadgets. We partner with
              the world&apos;s leading brands to bring you exclusive offers.
            </p>
            <div className="flex items-center gap-4">
              <Link
                href="#"
                className="hover:bg-primary flex h-10 w-10 items-center justify-center rounded-full border border-white/10 transition-all hover:text-white"
              >
                <Facebook className="h-4 w-4" />
              </Link>
              <Link
                href="#"
                className="hover:bg-primary flex h-10 w-10 items-center justify-center rounded-full border border-white/10 transition-all hover:text-white"
              >
                <Twitter className="h-4 w-4" />
              </Link>
              <Link
                href="#"
                className="hover:bg-primary flex h-10 w-10 items-center justify-center rounded-full border border-white/10 transition-all hover:text-white"
              >
                <Instagram className="h-4 w-4" />
              </Link>
              <Link
                href="#"
                className="hover:bg-primary flex h-10 w-10 items-center justify-center rounded-full border border-white/10 transition-all hover:text-white"
              >
                <Youtube className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Links Column 1 */}
          <div>
            <h4 className="mb-8 text-[10px] font-black tracking-widest text-white uppercase">
              Shopping Guide
            </h4>
            <ul className="space-y-4 text-sm">
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  How to Buy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Payment Methods
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Shipping Options
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Affiliate Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Flash Sales
                </Link>
              </li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div>
            <h4 className="mb-8 text-[10px] font-black tracking-widest text-white uppercase">
              Customer Care
            </h4>
            <ul className="space-y-4 text-sm">
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Track Order
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Report a Bug
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="mb-8 text-[10px] font-black tracking-widest text-white uppercase">
              Get in Touch
            </h4>
            <div className="flex gap-4">
              <Phone className="text-primary h-5 w-5 shrink-0" />
              <div className="text-sm">
                <p className="font-bold text-white">+91 98765 43210</p>
                <p className="text-[10px] text-slate-500">Mon-Fri: 9am - 6pm</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Mail className="text-primary h-5 w-5 shrink-0" />
              <div className="text-sm">
                <p className="font-bold text-white">support@naskart.com</p>
                <p className="text-[10px] text-slate-500">
                  24/7 Online Support
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-6 border-t border-white/5 pt-10 md:flex-row">
          <p className="text-[10px] font-bold tracking-widest uppercase">
            &copy; {new Date().getFullYear()} NASKART ENTERPRISE. ALL RIGHTS
            RESERVED.
          </p>
          <div className="flex items-center gap-6 text-[10px] font-bold tracking-widest uppercase">
            <Link href="#" className="transition-colors hover:text-white">
              Privacy Policy
            </Link>
            <Link href="#" className="transition-colors hover:text-white">
              Terms of Service
            </Link>
            <Link href="#" className="transition-colors hover:text-white">
              Cookies
            </Link>
          </div>
          <div className="flex items-center gap-4 opacity-50 grayscale">
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg"
              width={40}
              height={16}
              className="h-4 w-auto"
              alt="Visa"
              unoptimized
            />
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
              width={40}
              height={24}
              className="h-6 w-auto"
              alt="Mastercard"
              unoptimized
            />
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
              width={60}
              height={16}
              className="h-4 w-auto"
              alt="Paypal"
              unoptimized
            />
          </div>
        </div>
      </div>
    </footer>
  )
}
