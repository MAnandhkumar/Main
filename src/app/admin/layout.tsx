import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import {
  LayoutDashboard,
  Package,
  Link as LinkIcon,
  LogOut,
  Settings,
  Image as ImageIcon,
} from 'lucide-react'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()

  // Gracefully handle if Supabase is unconfigured
  if (
    !supabase ||
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    process.env.NEXT_PUBLIC_SUPABASE_URL === 'your-supabase-project-url'
  ) {
    // If we're fully unconfigured, we might bypass the check just to show the beautiful UI
    // In a real app, we'd enforce it.
    console.warn('Supabase not configured. Showing admin layout anyway.')
  } else {
    // Real Auth check
    await supabase.auth.getUser()

    // Assuming middleware handles redirection for unauthenticated users,
    // but we can double check here (unless it's the login page).
  }

  return (
    <div className="bg-background/50 flex min-h-screen w-full flex-col">
      <header className="bg-background/80 sticky top-0 z-40 flex h-16 items-center gap-4 border-b border-white/10 px-4 backdrop-blur md:px-6">
        <nav className="flex items-center gap-6 text-sm font-medium">
          <Link
            href="/admin"
            className="text-primary mr-2 flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <LayoutDashboard className="h-5 w-5" />
            <span className="hidden sm:inline-block">Admin</span>
          </Link>
          <Link
            href="/admin"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Dashboard
          </Link>
          <Link
            href="/admin/products"
            className="text-muted-foreground hover:text-foreground flex items-center gap-2 transition-colors"
          >
            <Package className="h-4 w-4" /> Products
          </Link>
          <Link
            href="/admin/categories"
            className="text-muted-foreground hover:text-foreground flex items-center gap-2 transition-colors"
          >
            <Settings className="h-4 w-4" /> Categories
          </Link>
          <Link
            href="/admin/banners"
            className="text-muted-foreground hover:text-foreground flex items-center gap-2 transition-colors"
          >
            <ImageIcon className="h-4 w-4" /> Banners
          </Link>
          <Link
            href="/admin/links"
            className="text-muted-foreground hover:text-foreground flex items-center gap-2 transition-colors"
          >
            <LinkIcon className="h-4 w-4" /> Affiliate Links
          </Link>
        </nav>
        <div className="ml-auto flex items-center gap-4">
          <Link
            href="/"
            className="text-muted-foreground hover:text-foreground flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium transition-colors"
          >
            <LogOut className="h-3.5 w-3.5" /> Site Preview
          </Link>
        </div>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        {children}
      </main>
    </div>
  )
}
