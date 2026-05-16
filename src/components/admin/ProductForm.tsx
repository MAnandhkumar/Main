'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
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

import { SafeImage } from "@/components/SafeImage"

interface Category {
  id: string
  name: string
  parent_id?: string | null
}

interface ProductFormProps {
  categories: Category[]
}

export function ProductForm({ categories }: ProductFormProps) {
  const router = useRouter()
  const supabase = createClient()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image_url: '',
    category_id: '',
    slug: '',
    affiliate_url: '',
    store_name: 'Amazon',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    
    // Auto-generate slug from name if slug is empty
    if (name === 'name' && !formData.slug) {
      setFormData((prev) => ({ 
        ...prev, 
        name: value,
        slug: value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      }))
    }
  }

  const handleCategoryChange = (value: string) => {
    setFormData((prev) => ({ ...prev, category_id: value }))
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
        .from('products')
        .insert([formData])

      if (insertError) throw insertError

      router.push('/admin/products')
      router.refresh()
    } catch (err: any) {
      setError(err.message || 'Failed to create product')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="max-w-2xl mx-auto bg-card border-white/10">
      <CardHeader>
        <CardTitle>Product Details</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
              <AlertCircle className="h-4 w-4" />
              {error}
            </div>
          )}

          <div className="grid gap-2">
            <Label htmlFor="name">Product Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="e.g. Ultra HD Smart TV"
              required
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="slug">Redirect Slug</Label>
            <Input
              id="slug"
              name="slug"
              placeholder="e.g. smart-tv-2024"
              required
              value={formData.slug}
              onChange={handleChange}
            />
            <p className="text-[10px] text-muted-foreground">Unique identifier used for your affiliate links.</p>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="category_id">Category</Label>
            <Select onValueChange={(val) => handleCategoryChange(val || '')} value={formData.category_id}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.filter(c => !c.parent_id).map((root) => (
                  <div key={root.id}>
                    <SelectItem value={root.id} className="font-bold">
                      {root.name}
                    </SelectItem>
                    {categories.filter(c => c.parent_id === root.id).map(child => (
                      <SelectItem key={child.id} value={child.id} className="pl-6 text-muted-foreground">
                        — {child.name}
                      </SelectItem>
                    ))}
                  </div>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="image_url">Image URL</Label>
            <div className="flex gap-4 items-start">
              <div className="flex-1">
                <Input
                  id="image_url"
                  name="image_url"
                  placeholder="https://images.unsplash.com/..."
                  value={formData.image_url}
                  onChange={handleChange}
                />
              </div>
              {formData.image_url && (
                <div className="w-20 h-20 rounded-lg overflow-hidden border border-white/10 shrink-0 bg-muted">
                  <SafeImage 
                    src={formData.image_url} 
                    alt="Preview" 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Description (optional)</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Tell us about this product..."
              className="resize-none min-h-[100px]"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-6">
             <div className="grid gap-2">
               <Label htmlFor="store_name">Store Name</Label>
               <Input
                 id="store_name"
                 name="store_name"
                 placeholder="e.g. Amazon, AliExpress"
                 required
                 value={formData.store_name}
                 onChange={handleChange}
               />
             </div>
             <div className="grid gap-2">
               <Label htmlFor="affiliate_url">Affiliate Link (Mandatory)</Label>
               <Input
                 id="affiliate_url"
                 name="affiliate_url"
                 placeholder="https://..."
                 required
                 value={formData.affiliate_url}
                 onChange={handleChange}
               />
             </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create Product
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
