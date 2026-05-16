import { createClient } from '@/lib/supabase/server'
import { ProductForm } from '@/components/admin/ProductForm'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'

export default async function NewProductPage() {
  const supabase = await createClient()
  
  let categories: any[] = []
  
  if (supabase) {
    const { data } = await supabase.from('categories').select('id, name, parent_id').order('name')
    categories = data || []
  }

  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center gap-4 mb-8">
        <Link 
          href="/admin/products" 
          className={buttonVariants({ variant: "ghost", size: "sm", className: "h-8 w-8 p-0" })}
        >
          <ChevronLeft className="h-4 w-4" />
        </Link>
        <h2 className="text-3xl font-bold tracking-tight">Add New Product</h2>
      </div>
      
      {categories.length === 0 ? (
        <div className="text-center p-12 border border-dashed border-white/10 rounded-2xl bg-card">
          <h3 className="text-lg font-medium mb-2">No Categories Found</h3>
          <p className="text-muted-foreground mb-6">You need to create at least one category before adding products.</p>
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
