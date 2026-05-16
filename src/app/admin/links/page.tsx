import { createClient } from '@/lib/supabase/server'
import {
  Link as LinkIcon,
  Plus,
  Pencil,
  Trash2,
  ExternalLink,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'

interface AffiliateLink {
  id: string
  platform: string
  products?: { name: string }
  slug: string
  affiliate_url: string
}

export default async function AdminLinksPage() {
  const supabase = await createClient()

  let links: AffiliateLink[] = []

  if (
    supabase &&
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_URL !== 'your-supabase-project-url'
  ) {
    const { data } = await supabase
      .from('affiliate_links')
      .select('*, products(name)')
      .order('created_at', { ascending: false })
    links = data || []
  } else {
    // Mock data
    links = [
      {
        id: '1',
        platform: 'Amazon',
        products: { name: 'Premium Noise-Cancelling Headphones' },
        slug: 'amazon-headphones',
        affiliate_url: 'https://amazon.com/...',
      },
      {
        id: '2',
        platform: 'Walmart',
        products: { name: 'Ergonomic Desk Chair' },
        slug: 'walmart-chair',
        affiliate_url: 'https://walmart.com/...',
      },
    ]
  }

  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-primary text-3xl font-bold tracking-tight">
            Affiliate Links
          </h2>
          <p className="text-muted-foreground">
            Manage and track your affiliate redirection links.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button className="rounded-xl">
            <Plus className="mr-2 h-4 w-4" /> Add Link
          </Button>
        </div>
      </div>

      <div className="bg-card rounded-md border border-white/10">
        <Table>
          <TableHeader>
            <TableRow className="text-primary/70 border-white/10 hover:bg-transparent">
              <TableHead>Platform</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Target URL</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {links.map((link) => (
              <TableRow key={link.id} className="group border-white/10">
                <TableCell className="font-medium">
                  <Badge
                    variant="outline"
                    className="bg-primary/5 text-primary border-primary/20"
                  >
                    {link.platform}
                  </Badge>
                </TableCell>
                <TableCell className="font-semibold">
                  {link.products?.name || 'N/A'}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  <code className="bg-muted rounded px-2 py-1 font-mono text-[10px]">
                    /go/{link.slug}
                  </code>
                </TableCell>
                <TableCell className="text-muted-foreground max-w-[200px] truncate text-xs">
                  {link.affiliate_url}
                </TableCell>
                <TableCell className="space-x-1 text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:bg-primary/10 transition-colors"
                  >
                    <ExternalLink className="text-muted-foreground group-hover:text-primary h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:bg-primary/10 transition-colors"
                  >
                    <Pencil className="text-muted-foreground group-hover:text-primary h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:bg-destructive/10 transition-colors"
                  >
                    <Trash2 className="text-destructive h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {links.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-muted-foreground h-32 text-center"
                >
                  <div className="flex flex-col items-center justify-center gap-2">
                    <LinkIcon className="h-8 w-8 opacity-20" />
                    <span>No affiliate links found.</span>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
