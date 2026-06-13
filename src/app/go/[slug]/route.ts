import { createClient } from '@/lib/supabase/server'
import { NextResponse, after } from 'next/server'
import { headers } from 'next/headers'
import { notFound } from 'next/navigation'

export async function GET(
  request: Request,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params
  const reqHeaders = await headers()

  // 1. Initialize Supabase Client
  const supabase = await createClient()

  // For demonstration/mock purposes if env vars are missing
  if (
    !supabase ||
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    process.env.NEXT_PUBLIC_SUPABASE_URL === 'your-supabase-project-url'
  ) {
    return NextResponse.redirect(
      new URL('https://example-affiliate-link.com/' + slug)
    )
  }

  // 2. Fetch the affiliate link from the DB
  const { data: link, error: linkError } = await supabase
    .from('affiliate_links')
    .select('id, affiliate_url')
    .eq('slug', slug)
    .single()

  if (linkError || !link) {
    // Fallback redirect to 404 page if link not found
    return notFound()
  }

  // 3. Log the click event asynchronously
  const userAgent = reqHeaders.get('user-agent') || 'Unknown'
  const referrer = reqHeaders.get('referer') || 'Direct'

  after(async () => {
    await supabase.from('clicks').insert({
      affiliate_link_id: link.id,
      user_agent: userAgent,
      referrer: referrer,
    })
  })

  // 4. Redirect (302) to the external affiliate URL
  return NextResponse.redirect(link.affiliate_url)
}
