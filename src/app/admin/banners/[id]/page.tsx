import { createClient } from '@/lib/supabase/server'
import { BannerForm } from '@/components/admin/BannerForm'
import { notFound } from 'next/navigation'

interface EditBannerPageProps {
  params: {
    id: string
  }
}

export default async function EditBannerPage({ params }: EditBannerPageProps) {
  const supabase = await createClient()
  if (!supabase) return <div>Database not configured</div>

  const { data: banner } = await supabase
    .from('banners')
    .select('*')
    .eq('id', params.id)
    .single()

  if (!banner) {
    notFound()
  }

  return (
    <div className="p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-black uppercase tracking-tighter">Edit Banner</h1>
        <p className="text-muted-foreground uppercase tracking-widest text-xs font-bold mt-1">Update your promotional message and visuals</p>
      </div>

      <div className="bg-card border border-border p-8 rounded-2xl shadow-sm">
        <BannerForm initialData={banner} />
      </div>
    </div>
  )
}
