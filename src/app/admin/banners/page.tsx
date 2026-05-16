import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Plus, Edit, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SafeImage } from '@/components/SafeImage'

export default async function BannersPage() {
  const supabase = await createClient()
  if (!supabase) return <div>Database not configured</div>

  const { data: banners } = await supabase
    .from('banners')
    .select('*')
    .order('priority', { ascending: false })
    .order('created_at', { ascending: false })

  return (
    <div className="p-6 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black">Banners</h1>
          <p className="text-muted-foreground">Manage your homepage promotional banners.</p>
        </div>
        <Link href="/admin/banners/new">
          <Button className="font-black px-6">
            <Plus className="mr-2 w-5 h-5" /> Add Banner
          </Button>
        </Link>
      </div>

      <div className="grid gap-6">
        {banners?.map((banner) => (
          <div key={banner.id} className="group bg-card border border-border rounded-xl overflow-hidden flex flex-col md:flex-row shadow-sm hover:shadow-md transition-all">
            <div className="w-full md:w-64 h-32 md:h-auto relative bg-slate-100 flex items-center justify-center">
              <SafeImage src={banner.image_url} alt={banner.title} className="w-full h-full object-cover" />
              {!banner.active && (
                <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                  <span className="text-xs font-black uppercase tracking-widest text-muted-foreground">Inactive</span>
                </div>
              )}
            </div>
            
            <div className="flex-1 p-6 flex flex-col justify-center">
               <div className="flex items-start justify-between gap-4">
                 <div>
                    <h3 className="text-xl font-bold uppercase tracking-tight leading-tight">{banner.title}</h3>
                    <p className="text-sm text-muted-foreground font-medium">{banner.subtitle}</p>
                 </div>
                 <div className="flex items-center gap-2">
                    <Link href={`/admin/banners/${banner.id}`}>
                      <Button variant="outline" size="icon" className="group-hover:bg-primary group-hover:text-primary-foreground">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </Link>
                    <Button variant="outline" size="icon" className="hover:bg-destructive hover:text-white">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                 </div>
               </div>
               <div className="mt-4 flex items-center gap-4 text-xs font-black uppercase tracking-widest text-muted-foreground">
                 <span>Priority: {banner.priority}</span>
                 {banner.link_url && <span className="text-primary truncate max-w-[200px]">Link: {banner.link_url}</span>}
               </div>
            </div>
          </div>
        ))}

        {!banners?.length && (
          <div className="py-20 text-center border-2 border-dashed border-border rounded-2xl bg-muted/30">
             <p className="text-muted-foreground font-medium uppercase tracking-widest mb-4">No custom banners yet</p>
             <Link href="/admin/banners/new">
               <Button variant="ghost" className="font-black decoration-primary underline-offset-4 hover:underline">
                 Create your first banner
               </Button>
             </Link>
          </div>
        )}
      </div>
    </div>
  )
}
