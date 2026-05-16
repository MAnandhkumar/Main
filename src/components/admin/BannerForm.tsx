'use client'
import { SafeImage } from "@/components/SafeImage"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'

interface Banner {
  id?: string
  title: string
  subtitle?: string
  image_url: string
  link_url?: string
  button_text?: string
  active?: boolean
  priority?: number
}

interface BannerFormProps {
  initialData?: Banner
}

export function BannerForm({ initialData }: BannerFormProps) {
  const router = useRouter()
  const supabase = createClient()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<Banner>(
    initialData || {
      title: '',
      subtitle: '',
      image_url: '',
      link_url: '',
      button_text: 'Shop Now',
      active: true,
      priority: 0,
    }
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (!supabase) throw new Error('Supabase client not initialized')
      
      if (initialData?.id) {
        const { error } = await supabase
          .from('banners')
          .update(formData)
          .eq('id', initialData.id)
        if (error) throw error
      } else {
        const { error } = await supabase
          .from('banners')
          .insert([formData])
        if (error) throw error
      }

      router.push('/admin/banners')
      router.refresh()
    } catch (error: any) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <div className="grid gap-4">
        <div className="space-y-2">
          <label htmlFor="title" className="text-sm font-bold">Title</label>
          <input
            id="title"
            className="w-full p-2 rounded-md border border-border bg-background"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="subtitle" className="text-sm font-bold">Subtitle</label>
          <input
            id="subtitle"
            className="w-full p-2 rounded-md border border-border bg-background"
            value={formData.subtitle || ''}
            onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="image_url" className="text-sm font-bold">Image URL</label>
          <div className="flex gap-4 items-start">
            <div className="flex-1">
              <input
                id="image_url"
                className="w-full p-2 rounded-md border border-border bg-background"
                required
                value={formData.image_url}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
              />
            </div>
            {formData.image_url && (
              <div className="w-40 h-20 rounded-lg overflow-hidden border border-white/10 shrink-0 bg-muted">
                <SafeImage 
                  src={formData.image_url} 
                  alt="Preview" 
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="link_url" className="text-sm font-bold">Link URL</label>
            <input
              id="link_url"
              className="w-full p-2 rounded-md border border-border bg-background"
              placeholder="/product/my-slug"
              value={formData.link_url || ''}
              onChange={(e) => setFormData({ ...formData, link_url: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="button_text" className="text-sm font-bold">Button Text</label>
            <input
              id="button_text"
              className="w-full p-2 rounded-md border border-border bg-background"
              value={formData.button_text || ''}
              onChange={(e) => setFormData({ ...formData, button_text: e.target.value })}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="priority" className="text-sm font-bold">Priority (Lower = Later)</label>
            <input
              id="priority"
              type="number"
              className="w-full p-2 rounded-md border border-border bg-background"
              value={formData.priority || 0}
              onChange={(e) => setFormData({ ...formData, priority: parseInt(e.target.value) })}
            />
          </div>
          <div className="flex items-center space-x-2 pt-8">
            <input
              id="active"
              type="checkbox"
              className="w-4 h-4 rounded border-border"
              checked={formData.active}
              onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
            />
            <label htmlFor="active" className="text-sm font-bold uppercase tracking-wider">Active</label>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <Button type="submit" disabled={loading} className="font-black px-8">
          {loading ? 'Saving...' : initialData?.id ? 'Update Banner' : 'Create Banner'}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
      </div>
    </form>
  )
}
