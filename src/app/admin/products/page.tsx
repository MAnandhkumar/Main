import { createClient } from '@/lib/supabase/server'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { Button, buttonVariants } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { SafeImage } from '@/components/SafeImage'

import { type Product } from '@/components/HomeContent'

export default async function AdminProductsPage() {
  const supabase = await createClient()

  let products: (Product & { category?: string; status?: string })[] = []

  if (
    supabase &&
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_URL !== 'your-supabase-project-url'
  ) {
    const { data } = await supabase
      .from('products')
      .select('*, categories(name)')
      .order('created_at', { ascending: false })
    products = data || []
  } else {
    // Mock data
    products = [
      {
        id: '1',
        name: 'Premium Noise-Cancelling Headphones',
        description: 'High-quality audio with advanced noise cancellation.',
        category: 'Electronics',
        slug: 'premium-headphones',
        status: 'Active',
        image_url:
          'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=200&auto=format&fit=crop',
      },
      {
        id: '2',
        name: 'Ergonomic Desk Chair',
        description: 'Supportive and comfortable for long work hours.',
        category: 'Furniture',
        slug: 'ergonomic-chair',
        status: 'Active',
        image_url:
          'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=200&auto=format&fit=crop',
      },
      {
        id: '3',
        name: 'Minimalist Smartwatch',
        description: 'Sleek design with essential health tracking features.',
        category: 'Accessories',
        slug: 'minimalist-smartwatch',
        status: 'Draft',
        image_url:
          'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=200&auto=format&fit=crop',
      },
    ]
  }

  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Products</h2>
          <p className="text-muted-foreground">
            Manage your product catalog and listings.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Link
            href="/admin/products/new"
            className={buttonVariants({ className: 'rounded-xl' })}
          >
            <Plus className="mr-2 h-4 w-4" /> Add Product
          </Link>
        </div>
      </div>

      <div className="bg-card rounded-md border border-white/10">
        <Table>
          <TableHeader>
            <TableRow className="border-white/10 hover:bg-transparent">
              <TableHead className="w-[80px]">Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id} className="border-white/10">
                <TableCell>
                  <div className="bg-muted h-12 w-12 overflow-hidden rounded-lg border border-white/5">
                    <SafeImage
                      src={product.image_url}
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </TableCell>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>
                  {product.categories?.name || product.category || 'N/A'}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {product.slug}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      product.status === 'Active' ? 'default' : 'secondary'
                    }
                  >
                    {product.status || 'Active'}
                  </Badge>
                </TableCell>
                <TableCell className="space-x-2 text-right">
                  <Button variant="ghost" size="icon">
                    <Pencil className="text-muted-foreground hover:text-foreground h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="text-destructive h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {products.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-muted-foreground h-24 text-center"
                >
                  No products found. Add a new product to get started.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
