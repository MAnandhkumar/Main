import { BannerForm } from '@/components/admin/BannerForm'

export default function NewBannerPage() {
  return (
    <div className="space-y-8 p-6">
      <div>
        <h1 className="text-3xl font-black tracking-tighter uppercase">
          Create New Banner
        </h1>
        <p className="text-muted-foreground mt-1 text-xs font-bold tracking-widest uppercase">
          Add a high-impact promotion to your homepage
        </p>
      </div>

      <div className="bg-card border-border rounded-2xl border p-8 shadow-sm">
        <BannerForm />
      </div>
    </div>
  )
}
