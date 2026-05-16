import { createClient } from '@/lib/supabase/server'
import { Plus, Pencil, Trash2, ExternalLink } from 'lucide-react'
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

export default async function AdminLinksPage() {
    const supabase = await createClient()

    let links: any[] = []

    if (supabase && process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_URL !== 'your-supabase-project-url') {
        const { data } = await supabase
            .from('affiliate_links')
            .select('*, products(name)')
            .order('created_at', { ascending: false })
        links = data || []
    } else {
        // Mock data
        links = [
            { id: '1', platform: 'Amazon', products: { name: 'Premium Noise-Cancelling Headphones' }, slug: 'amazon-headphones', affiliate_url: 'https://amazon.com/...' },
            { id: '2', platform: 'Walmart', products: { name: 'Ergonomic Desk Chair' }, slug: 'walmart-chair', affiliate_url: 'https://walmart.com/...' },
        ]
    }

    return (
        <div className="flex-1 space-y-4">
            <div className="flex items-center justify-between space-y-2">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-primary">Affiliate Links</h2>
                    <p className="text-muted-foreground">Manage and track your affiliate redirection links.</p>
                </div>
                <div className="flex items-center space-x-2">
                    <Button className="rounded-xl">
                        <Plus className="mr-2 h-4 w-4" /> Add Link
                    </Button>
                </div>
            </div>

            <div className="rounded-md border border-white/10 bg-card">
                <Table>
                    <TableHeader>
                        <TableRow className="border-white/10 hover:bg-transparent text-primary/70">
                            <TableHead>Platform</TableHead>
                            <TableHead>Product</TableHead>
                            <TableHead>Slug</TableHead>
                            <TableHead>Target URL</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {links.map((link) => (
                            <TableRow key={link.id} className="border-white/10 group">
                                <TableCell className="font-medium">
                                    <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">{link.platform}</Badge>
                                </TableCell>
                                <TableCell className="font-semibold">{link.products?.name || 'N/A'}</TableCell>
                                <TableCell className="text-muted-foreground">
                                    <code className="text-[10px] bg-muted px-2 py-1 rounded font-mono">/go/{link.slug}</code>
                                </TableCell>
                                <TableCell className="max-w-[200px] truncate text-xs text-muted-foreground">
                                    {link.affiliate_url}
                                </TableCell>
                                <TableCell className="text-right space-x-1">
                                    <Button variant="ghost" size="icon" className="hover:bg-primary/10 transition-colors">
                                        <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="hover:bg-primary/10 transition-colors">
                                        <Pencil className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="hover:bg-destructive/10 transition-colors">
                                        <Trash2 className="h-4 w-4 text-destructive" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                        {links.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={5} className="h-32 text-center text-muted-foreground">
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

import { Link as LinkIcon } from 'lucide-react'
