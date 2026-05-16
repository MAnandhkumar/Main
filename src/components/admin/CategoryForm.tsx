'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertCircle, Loader2 } from 'lucide-react'

export interface Category {
  id: string
  name: string
}

interface CategoryFormProps {
  categories: Category[]
}

export function CategoryForm({ categories }: CategoryFormProps) {
  const router = useRouter()
  const supabase = createClient()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    parent_id: null as string | null,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Auto-generate slug from name if slug is empty
    if (name === 'name' && !formData.slug) {
      setFormData((prev) => ({
        ...prev,
        name: value,
        slug: value
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, ''),
      }))
    }
  }

  const handleParentChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      parent_id: value === 'none' ? null : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    if (!supabase) {
      setError('Supabase is not configured.')
      setLoading(false)
      return
    }

    try {
      const { error: insertError } = await supabase
        .from('categories')
        .insert([formData])

      if (insertError) throw insertError

      router.push('/admin/categories')
      router.refresh()
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : typeof err === 'object' && err !== null && 'message' in err
            ? String((err as { message: unknown }).message)
            : 'Failed to create category'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="bg-card mx-auto max-w-2xl border-white/10 shadow-2xl backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-xl">Category Info</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit}
          className="space-y-6"
          role="form"
          aria-label="Category Form"
        >
          {error && (
            <div className="bg-destructive/10 text-destructive border-destructive/20 flex items-center gap-2 rounded-lg border p-3 text-sm">
              <AlertCircle className="h-4 w-4" />
              {error}
            </div>
          )}

          <div className="grid gap-2">
            <Label htmlFor="name" className="text-sm font-medium">
              Category Name
            </Label>
            <Input
              id="name"
              name="name"
              placeholder="e.g. Laptops"
              required
              value={formData.name}
              onChange={handleChange}
              className="border-white/10 bg-white/5"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="slug" className="text-sm font-medium">
              Slug
            </Label>
            <Input
              id="slug"
              name="slug"
              placeholder="e.g. laptops"
              required
              value={formData.slug}
              onChange={handleChange}
              className="border-white/10 bg-white/5"
            />
            <p className="text-muted-foreground text-[10px]">
              URL friendly identifier.
            </p>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="parent_id" className="text-sm font-medium">
              Parent Category (Optional)
            </Label>
            <Select
              onValueChange={(val) => handleParentChange(val || 'none')}
              value={formData.parent_id || 'none'}
            >
              <SelectTrigger className="border-white/10 bg-white/5">
                <SelectValue placeholder="No parent (Root Category)" />
              </SelectTrigger>
              <SelectContent className="bg-popover border-white/10">
                <SelectItem value="none">None (Root Category)</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-muted-foreground text-[10px]">
              Select if this is a sub-category.
            </p>
          </div>

          <div className="flex justify-end gap-3 pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              disabled={loading}
              className="border-white/10 hover:bg-white/5"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="bg-primary hover:bg-primary/90"
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create Category
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
