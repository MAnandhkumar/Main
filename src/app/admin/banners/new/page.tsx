import { BannerForm } from '@/components/admin/BannerForm'

export default function NewBannerPage() {
  return (
    <div className="p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-black uppercase tracking-tighter">Create New Banner</h1>
        <p className="text-muted-foreground uppercase tracking-widest text-xs font-bold mt-1">Add a high-impact promotion to your homepage</p>
      </div>

      <div className="bg-card border border-border p-8 rounded-2xl shadow-sm">
        <BannerForm />
      </div>
    </div>
  )
}
