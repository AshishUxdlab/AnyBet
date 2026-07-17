import { useState, useEffect } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { BottomNavbar } from "@/components/bottom-navbar"
import {
    SidebarInset,
    SidebarProvider,
} from "@workspace/ui/components/sidebar"
import { Card, CardContent } from "@workspace/ui/components/card"
import { Skeleton } from "@workspace/ui/components/skeleton"
import { Avatar, AvatarImage, AvatarFallback } from "@workspace/ui/components/avatar"
import { Tabs, TabsList, TabsTrigger } from "@workspace/ui/components/tabs"
import { Trophy, Star } from "lucide-react"
import Header from "../Header/Header"

export default function Activity() {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false)
        }, 1500)
        return () => clearTimeout(timer)
    }, [])

    return (
        <>
            <SidebarProvider
                style={
                    {
                        "--sidebar-width": "calc(var(--spacing) * 72)",
                        "--header-height": "calc(var(--spacing) * 12)",
                    } as React.CSSProperties
                }
            >
                <AppSidebar variant="inset" />
                <SidebarInset className="bg-background animate-in fade-in duration-500 ease-in-out">

                    <Header loading={loading} />

                    <main className="flex-1 overflow-auto p-4 md:p-6 space-y-6 pb-24 max-w-md mx-auto w-full">
                        {loading ? (
                            <div className="space-y-6">
                                <Skeleton className="h-10 w-full rounded-lg" />
                                <div className="flex justify-between items-end h-48 px-4">
                                    <div className="flex flex-col items-center space-y-2 flex-1">
                                        <Skeleton className="h-12 w-12 rounded-full" />
                                        <Skeleton className="h-12 w-full max-w-[60px] rounded-lg" />
                                    </div>
                                    <div className="flex flex-col items-center space-y-2 flex-1 scale-110">
                                        <Skeleton className="h-16 w-16 rounded-full" />
                                        <Skeleton className="h-20 w-full max-w-[80px] rounded-lg" />
                                    </div>
                                    <div className="flex flex-col items-center space-y-2 flex-1">
                                        <Skeleton className="h-12 w-12 rounded-full" />
                                        <Skeleton className="h-8 w-full max-w-[60px] rounded-lg" />
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <Skeleton className="h-16 w-full rounded-xl" />
                                    <Skeleton className="h-16 w-full rounded-xl" />
                                    <Skeleton className="h-16 w-full rounded-xl" />
                                </div>
                            </div>
                        ) : (
                            <Tabs defaultValue="global" className="w-full space-y-6">
                                <TabsList className="grid w-full grid-cols-2">
                                    <TabsTrigger value="global">GLOBAL</TabsTrigger>
                                    <TabsTrigger value="friends">FRIENDS</TabsTrigger>
                                </TabsList>

                                <div className="space-y-6">
                                    {/* Podium */}
                                    <div className="flex items-end justify-center gap-2 pt-6 px-2">
                                        {/* Rank 2 */}
                                        <div className="flex flex-col items-center text-center flex-1 space-y-2">
                                            <div className="relative">
                                                <Avatar className="h-14 w-14 border-2 border-primary/20">
                                                    <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" alt="AI_MASTER" />
                                                    <AvatarFallback>AI</AvatarFallback>
                                                </Avatar>
                                                <div className="absolute -bottom-1 -right-1 h-5 w-5 bg-muted border border-border flex items-center justify-center rounded-full text-[10px] font-bold">2</div>
                                            </div>
                                            <div className="space-y-0.5">
                                                <div className="text-[10px] font-bold truncate max-w-[80px]">AI_MASTER</div>
                                                <div className="text-[10px] font-semibold text-primary">$38,200</div>
                                            </div>
                                            <div className="w-full bg-secondary/30 rounded-t-lg h-16 flex items-center justify-center border-t border-x border-border">
                                                <span className="text-muted-foreground text-xs font-bold">2nd</span>
                                            </div>
                                        </div>

                                        {/* Rank 1 */}
                                        <div className="flex flex-col items-center text-center flex-1 space-y-2 z-10 -translate-y-2">
                                            <div className="relative">
                                                <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-primary animate-bounce">
                                                    <Star className="h-5 w-5 fill-primary" />
                                                </div>
                                                <Avatar className="h-18 w-18 border-2 border-primary ring-4 ring-primary/10">
                                                    <AvatarImage src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80" alt="CRYPTOKING" />
                                                    <AvatarFallback>CK</AvatarFallback>
                                                </Avatar>
                                                <div className="absolute -bottom-1 -right-1 h-6 w-6 bg-primary text-primary-foreground flex items-center justify-center rounded-full text-xs font-extrabold border border-background">1</div>
                                            </div>
                                            <div className="space-y-0.5">
                                                <div className="text-xs font-bold truncate max-w-[90px]">CRYPTOKING</div>
                                                <div className="text-xs font-extrabold text-primary">$42,500</div>
                                            </div>
                                            <div className="w-full bg-primary/10 rounded-t-lg h-24 flex items-center justify-center border-t border-x border-primary/20">
                                                <Trophy className="h-6 w-6 text-primary" />
                                            </div>
                                        </div>

                                        {/* Rank 3 */}
                                        <div className="flex flex-col items-center text-center flex-1 space-y-2">
                                            <div className="relative">
                                                <Avatar className="h-12 w-12 border-2 border-primary/20">
                                                    <AvatarImage src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&auto=format&fit=crop&q=80" alt="BETRUNNER" />
                                                    <AvatarFallback>BR</AvatarFallback>
                                                </Avatar>
                                                <div className="absolute -bottom-1 -right-1 h-5 w-5 bg-muted border border-border flex items-center justify-center rounded-full text-[10px] font-bold">3</div>
                                            </div>
                                            <div className="space-y-0.5">
                                                <div className="text-[10px] font-bold truncate max-w-[80px]">BETRUNNER</div>
                                                <div className="text-[10px] font-semibold text-primary">$31,900</div>
                                            </div>
                                            <div className="w-full bg-secondary/30 rounded-t-lg h-12 flex items-center justify-center border-t border-x border-border">
                                                <span className="text-muted-foreground text-[10px] font-bold">3rd</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* List Rankings */}
                                    <div className="space-y-3">
                                        <Card>
                                            <CardContent className="p-4 flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <span className="text-sm font-bold text-muted-foreground w-4 text-center">4</span>
                                                    <Avatar className="h-8 w-8">
                                                        <AvatarImage src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80" />
                                                        <AvatarFallback>CK</AvatarFallback>
                                                    </Avatar>
                                                    <span className="text-sm font-semibold">CyberKnight</span>
                                                </div>
                                                <span className="text-sm font-bold text-muted-foreground">$28,400</span>
                                            </CardContent>
                                        </Card>

                                        <Card>
                                            <CardContent className="p-4 flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <span className="text-sm font-bold text-muted-foreground w-4 text-center">5</span>
                                                    <Avatar className="h-8 w-8">
                                                        <AvatarImage src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80" />
                                                        <AvatarFallback>MS</AvatarFallback>
                                                    </Avatar>
                                                    <span className="text-sm font-semibold">MoonShot</span>
                                                </div>
                                                <span className="text-sm font-bold text-muted-foreground">$25,120</span>
                                            </CardContent>
                                        </Card>

                                        <Card>
                                            <CardContent className="p-4 flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <span className="text-sm font-bold text-muted-foreground w-4 text-center">6</span>
                                                    <Avatar className="h-8 w-8">
                                                        <AvatarImage src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80" />
                                                        <AvatarFallback>NG</AvatarFallback>
                                                    </Avatar>
                                                    <span className="text-sm font-semibold">Nova_Gamer</span>
                                                </div>
                                                <span className="text-sm font-bold text-muted-foreground">$22,900</span>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </div>
                            </Tabs>
                        )}
                    </main>

                    {/* Fixed User Rank Bar */}
                    {!loading && (
                        <div className="fixed bottom-20 left-0 right-0 p-4 bg-background/80 backdrop-blur-sm border-t z-40 md:left-[var(--sidebar-width)] md:w-[calc(100%-var(--sidebar-width))]">
                            <Card className="border-primary bg-primary/5">
                                <CardContent className="p-3 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-8 w-8 border border-primary/20">
                                            <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" />
                                            <AvatarFallback>P1</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <span className="text-[9px] uppercase font-bold text-primary">Your Rank</span>
                                            <div className="text-xs font-bold text-foreground">#128 Player One</div>
                                        </div>
                                    </div>
                                    <span className="text-xs font-extrabold text-primary">$15.4k</span>
                                </CardContent>
                            </Card>
                        </div>
                    )}

                </SidebarInset>
            </SidebarProvider>
            <BottomNavbar />
        </>
    )
}
