import React from 'react'
import { createClient } from '@/lib/supabase/server'
import { Plus, ListTree, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'

import { type Category } from '@/components/admin/CategoryForm'

export default async function AdminCategoriesPage() {
  const supabase = await createClient()

  let categories: (Category & { slug: string; parent_id: string | null })[] = []

  if (
    supabase &&
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_URL !== 'your-supabase-project-url'
  ) {
    const { data } = await supabase.from('categories').select('*').order('name')
    categories = data || []
  } else {
    // Mock data
    categories = [
      { id: '1', name: 'Electronics', slug: 'electronics', parent_id: null },
      {
        id: '1-1',
        name: 'Mobile Phones',
        slug: 'mobile-phones',
        parent_id: '1',
      },
      { id: '1-2', name: 'Audio', slug: 'audio', parent_id: '1' },
      { id: '2', name: 'Furniture', slug: 'furniture', parent_id: null },
    ]
  }

  // Sort categories to show hierarchy
  const rootCategories = categories.filter((c) => !c.parent_id)
  const getChildren = (parentId: string) =>
    categories.filter((c) => c.parent_id === parentId)

  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Categories</h2>
          <p className="text-muted-foreground">
            Manage your product taxonomy and hierarchy.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Link
            href="/admin/categories/new"
            className={buttonVariants({ className: 'rounded-xl' })}
          >
            <Plus className="mr-2 h-4 w-4" /> Add Category
          </Link>
        </div>
      </div>

      <div className="bg-card overflow-hidden rounded-md border border-white/10">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/30 border-white/10 hover:bg-transparent">
              <TableHead className="w-[400px]">Name</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rootCategories.map((root) => (
              <React.Fragment key={root.id}>
                <TableRow key={root.id} className="group border-white/10">
                  <TableCell className="flex items-center gap-2 font-semibold">
                    <ListTree className="text-primary/60 h-4 w-4" /> {root.name}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {root.slug}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className="bg-primary/10 border-primary/20 text-primary-foreground"
                    >
                      Root
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {/* Actions could be added here */}
                  </TableCell>
                </TableRow>
                {getChildren(root.id).map((child) => (
                  <TableRow
                    key={child.id}
                    className="group bg-muted/5 border-white/10"
                  >
                    <TableCell className="text-muted-foreground flex items-center gap-2 pl-10">
                      <ChevronRight className="h-4 w-4 opacity-30" />{' '}
                      {child.name}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {child.slug}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className="text-muted-foreground border-white/10 bg-white/5"
                      >
                        Sub-category
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right"></TableCell>
                  </TableRow>
                ))}
              </React.Fragment>
            ))}
            {categories.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-muted-foreground h-24 text-center"
                >
                  No categories found. Create one to start organizing your
                  products.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
