import { createClient } from '@/lib/supabase/server'
import { CategoryForm } from '@/components/admin/CategoryForm'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'

export default async function NewCategoryPage() {
  const supabase = await createClient()
  
  let categories: any[] = []
  
  if (supabase) {
    // Only fetch root categories to prevent deep nesting for now if desired, 
    // or fetch all to allow sub-sub categories.
    const { data } = await supabase
      .from('categories')
      .select('id, name')
      .is('parent_id', null)
      .order('name')
    categories = data || []
  }

  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center gap-4 mb-8">
        <Link 
          href="/admin/categories" 
          className={buttonVariants({ variant: "ghost", size: "sm", className: "h-8 w-8 p-0 border border-white/10" })}
        >
          <ChevronLeft className="h-4 w-4" />
        </Link>
        <h2 className="text-3xl font-bold tracking-tight">New Category</h2>
      </div>
      
      <CategoryForm categories={categories} />
    </div>
  )
}
