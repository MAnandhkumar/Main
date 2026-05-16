'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { ShoppingBag } from 'lucide-react'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const supabase = createClient()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        // Bypass if not configured
        if (!supabase || !process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL === 'your-supabase-project-url') {
            router.push('/admin')
            return
        }

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (error) {
            setError(error.message)
            setLoading(false)
        } else {
            router.push('/admin')
            router.refresh()
        }
    }

    return (
        <div className="flex items-center justify-center min-h-[80vh]">
            <Card className="w-full max-w-sm bg-card border-white/10 shadow-2xl">
                <CardHeader className="space-y-1 align-center text-center">
                    <div className="flex justify-center mb-4">
                        <div className="bg-primary/20 p-3 rounded-xl">
                            <ShoppingBag className="h-6 w-6 text-primary" />
                        </div>
                    </div>
                    <CardTitle className="text-2xl font-bold">Admin Login</CardTitle>
                    <CardDescription>
                        Enter your credentials to access the admin panel
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleLogin}>
                    <CardContent className="grid gap-4">
                        {error && (
                            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-sm text-red-500 font-medium">
                                {error}
                            </div>
                        )}
                        <div className="grid gap-2">
                            <label htmlFor="email">Email</label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="admin@naskart.com"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="grid gap-2">
                            <label htmlFor="password">Password</label>
                            <Input
                                id="password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full" type="submit" disabled={loading}>
                            {loading ? 'Logging in...' : 'Sign In'}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}
