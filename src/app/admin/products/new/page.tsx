import { createClient } from '@/lib/supabase/server'
import { ProductForm } from '@/components/admin/ProductForm'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'

import { type Category } from '@/components/admin/CategoryForm'

export default async function NewProductPage() {
  const supabase = await createClient()

  let categories: Category[] = []

  if (supabase) {
    const { data } = await supabase
      .from('categories')
      .select('id, name, parent_id')
      .order('name')
    categories = data || []
  }

  return (
    <div className="flex-1 space-y-4">
      <div className="mb-8 flex items-center gap-4">
        <Link
          href="/admin/products"
          className={buttonVariants({
            variant: 'ghost',
            size: 'sm',
            className: 'h-8 w-8 p-0',
          })}
        >
          <ChevronLeft className="h-4 w-4" />
        </Link>
        <h2 className="text-3xl font-bold tracking-tight">Add New Product</h2>
      </div>

      {categories.length === 0 ? (
        <div className="bg-card rounded-2xl border border-dashed border-white/10 p-12 text-center">
          <h3 className="mb-2 text-lg font-medium">No Categories Found</h3>
          <p className="text-muted-foreground mb-6">
            You need to create at least one category before adding products.
          </p>
          <Link href="/admin/categories/new" className={buttonVariants()}>
            Create First Category
          </Link>
        </div>
      ) : (
        <ProductForm categories={categories} />
      )}
    </div>
  )
}
