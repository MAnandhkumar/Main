import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Activity, Package, Link as LinkIcon, BarChart3 } from 'lucide-react'

export default function AdminDashboard() {
  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">
          Dashboard Overview
        </h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-card border-white/5">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clicks</CardTitle>
            <Activity className="text-primary h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,402</div>
            <p className="text-muted-foreground text-xs">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card className="bg-card border-white/5">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Products
            </CardTitle>
            <Package className="text-primary h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">145</div>
            <p className="text-muted-foreground text-xs">
              +12 new products this week
            </p>
          </CardContent>
        </Card>
        <Card className="bg-card border-white/5">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Affiliate Links
            </CardTitle>
            <LinkIcon className="text-primary h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">382</div>
            <p className="text-muted-foreground text-xs">Across 4 platforms</p>
          </CardContent>
        </Card>
        <Card className="bg-card border-white/5">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Conversion Rate
            </CardTitle>
            <BarChart3 className="text-primary h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.2%</div>
            <p className="text-muted-foreground text-xs">
              +0.5% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="bg-card col-span-4 border-white/5">
          <CardHeader>
            <CardTitle>Click Analytics (Mock)</CardTitle>
            <CardDescription>Clicks over the last 30 days</CardDescription>
          </CardHeader>
          <CardContent className="bg-muted/20 flex h-[300px] items-center justify-center border-t border-white/5">
            <p className="text-muted-foreground text-sm">
              Chart rendering region (e.g. Recharts)
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card col-span-3 border-white/5">
          <CardHeader>
            <CardTitle>Top Performing Links</CardTitle>
            <CardDescription>Highest click-through rates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {[
                {
                  name: 'Apple AirPods Pro',
                  platform: 'Amazon',
                  clicks: '3,200',
                },
                {
                  name: 'Sony WH-1000XM5',
                  platform: 'BestBuy',
                  clicks: '2,840',
                },
                {
                  name: 'Samsung 49" Odyssey',
                  platform: 'Amazon',
                  clicks: '1,500',
                },
                {
                  name: 'Herman Miller Embody',
                  platform: 'Official',
                  clicks: '920',
                },
              ].map((item, i) => (
                <div key={i} className="flex items-center">
                  <div className="ml-4 space-y-1">
                    <p className="text-sm leading-none font-medium">
                      {item.name}
                    </p>
                    <p className="text-muted-foreground text-sm">
                      {item.platform}
                    </p>
                  </div>
                  <div className="ml-auto font-medium">
                    {item.clicks} clicks
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
