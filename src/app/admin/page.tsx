import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Activity, CreditCard, DollarSign, Users } from 'lucide-react'

export default function AdminDashboard() {
    return (
        <div className="flex-1 space-y-4">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Dashboard Overview</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="bg-card border-white/5">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Clicks</CardTitle>
                        <Activity className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">12,402</div>
                        <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                    </CardContent>
                </Card>
                <Card className="bg-card border-white/5">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Products</CardTitle>
                        <PackageIcon className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">145</div>
                        <p className="text-xs text-muted-foreground">+12 new products this week</p>
                    </CardContent>
                </Card>
                <Card className="bg-card border-white/5">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Affiliate Links</CardTitle>
                        <LinkIcon className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">382</div>
                        <p className="text-xs text-muted-foreground">Across 4 platforms</p>
                    </CardContent>
                </Card>
                <Card className="bg-card border-white/5">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                        <BarChartIcon className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">4.2%</div>
                        <p className="text-xs text-muted-foreground">+0.5% from last month</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-8">
                <Card className="col-span-4 bg-card border-white/5">
                    <CardHeader>
                        <CardTitle>Click Analytics (Mock)</CardTitle>
                        <CardDescription>Clicks over the last 30 days</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[300px] flex items-center justify-center border-t border-white/5 bg-muted/20">
                        <p className="text-muted-foreground text-sm">Chart rendering region (e.g. Recharts)</p>
                    </CardContent>
                </Card>

                <Card className="col-span-3 bg-card border-white/5">
                    <CardHeader>
                        <CardTitle>Top Performing Links</CardTitle>
                        <CardDescription>Highest click-through rates</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-8">
                            {[
                                { name: 'Apple AirPods Pro', platform: 'Amazon', clicks: '3,200' },
                                { name: 'Sony WH-1000XM5', platform: 'BestBuy', clicks: '2,840' },
                                { name: 'Samsung 49" Odyssey', platform: 'Amazon', clicks: '1,500' },
                                { name: 'Herman Miller Embody', platform: 'Official', clicks: '920' },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center">
                                    <div className="ml-4 space-y-1">
                                        <p className="text-sm font-medium leading-none">{item.name}</p>
                                        <p className="text-sm text-muted-foreground">{item.platform}</p>
                                    </div>
                                    <div className="ml-auto font-medium">{item.clicks} clicks</div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

function PackageIcon(props: any) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m7.5 4.27 9 5.15" /><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" /><path d="m3.3 7 8.7 5 8.7-5" /><path d="M12 22V12" /></svg>
    )
}
function LinkIcon(props: any) {
    return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>
}
function BarChartIcon(props: any) {
    return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" x2="12" y1="20" y2="10" /><line x1="18" x2="18" y1="20" y2="4" /><line x1="6" x2="6" y1="20" y2="16" /></svg>
}
