import { createClient } from '@/lib/supabase/server'
import { BannerForm } from '@/components/admin/BannerForm'
import { notFound } from 'next/navigation'

interface EditBannerPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function EditBannerPage({ params }: EditBannerPageProps) {
  const { id } = await params
  const supabase = await createClient()
  if (!supabase) return <div>Database not configured</div>

  const { data: banner } = await supabase
    .from('banners')
    .select('*')
    .eq('id', id)
    .single()

  if (!banner) {
    notFound()
  }

  return (
    <div className="space-y-8 p-6">
      <div>
        <h1 className="text-3xl font-black tracking-tighter uppercase">
          Edit Banner
        </h1>
        <p className="text-muted-foreground mt-1 text-xs font-bold tracking-widest uppercase">
          Update your promotional message and visuals
        </p>
      </div>

      <div className="bg-card border-border rounded-2xl border p-8 shadow-sm">
        <BannerForm initialData={banner} />
      </div>
    </div>
  )
}
