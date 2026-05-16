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
    <div className="space-y-8 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black">Banners</h1>
          <p className="text-muted-foreground">
            Manage your homepage promotional banners.
          </p>
        </div>
        <Link href="/admin/banners/new">
          <Button className="px-6 font-black">
            <Plus className="mr-2 h-5 w-5" /> Add Banner
          </Button>
        </Link>
      </div>

      <div className="grid gap-6">
        {banners?.map((banner) => (
          <div
            key={banner.id}
            className="group bg-card border-border flex flex-col overflow-hidden rounded-xl border shadow-sm transition-all hover:shadow-md md:flex-row"
          >
            <div className="relative flex h-32 w-full items-center justify-center bg-slate-100 md:h-auto md:w-64">
              <SafeImage
                src={banner.image_url}
                alt={banner.title}
                className="h-full w-full object-cover"
              />
              {!banner.active && (
                <div className="bg-background/80 absolute inset-0 flex items-center justify-center">
                  <span className="text-muted-foreground text-xs font-black tracking-widest uppercase">
                    Inactive
                  </span>
                </div>
              )}
            </div>

            <div className="flex flex-1 flex-col justify-center p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl leading-tight font-bold tracking-tight uppercase">
                    {banner.title}
                  </h3>
                  <p className="text-muted-foreground text-sm font-medium">
                    {banner.subtitle}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Link href={`/admin/banners/${banner.id}`}>
                    <Button
                      variant="outline"
                      size="icon"
                      className="group-hover:bg-primary group-hover:text-primary-foreground"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="icon"
                    className="hover:bg-destructive hover:text-white"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="text-muted-foreground mt-4 flex items-center gap-4 text-xs font-black tracking-widest uppercase">
                <span>Priority: {banner.priority}</span>
                {banner.link_url && (
                  <span className="text-primary max-w-[200px] truncate">
                    Link: {banner.link_url}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}

        {!banners?.length && (
          <div className="border-border bg-muted/30 rounded-2xl border-2 border-dashed py-20 text-center">
            <p className="text-muted-foreground mb-4 font-medium tracking-widest uppercase">
              No custom banners yet
            </p>
            <Link href="/admin/banners/new">
              <Button
                variant="ghost"
                className="decoration-primary font-black underline-offset-4 hover:underline"
              >
                Create your first banner
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
