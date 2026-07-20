import { useState, useEffect } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { BottomNavbar } from "@/components/bottom-navbar"
import {
    SidebarInset,
    SidebarProvider,
} from "@workspace/ui/components/sidebar"
import { Card, CardContent } from "@workspace/ui/components/card"
import { Button } from "@workspace/ui/components/button"
import { Skeleton } from "@workspace/ui/components/skeleton"
import { Avatar, AvatarImage, AvatarFallback } from "@workspace/ui/components/avatar"
import { Badge } from "@workspace/ui/components/badge"
import {
    Settings,
    Shield,
    Bell,
    HelpCircle,
    ChevronRight,
    Coins,
    Flame,
    Award,
    CheckCircle
} from "lucide-react"
import Header from "../Header/Header"

export default function Profile() {
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

                    <Header title="PROFILE" loading={loading} />

                    <main className="flex-1 overflow-auto p-4 md:p-6 space-y-6 pb-24 max-w-md mx-auto w-full">
                        {loading ? (
                            <div className="space-y-6">
                                <div className="flex flex-col items-center space-y-3">
                                    <Skeleton className="h-24 w-24 rounded-full" />
                                    <Skeleton className="h-6 w-32" />
                                    <Skeleton className="h-3 w-24" />
                                </div>
                                <Skeleton className="h-20 w-full rounded-xl" />
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center">
                                        <Skeleton className="h-5 w-20" />
                                        <Skeleton className="h-4 w-12" />
                                    </div>
                                    <div className="grid grid-cols-4 gap-2">
                                        <Skeleton className="h-16 rounded-xl" />
                                        <Skeleton className="h-16 rounded-xl" />
                                        <Skeleton className="h-16 rounded-xl" />
                                        <Skeleton className="h-16 rounded-xl" />
                                    </div>
                                </div>
                                <Skeleton className="h-[200px] w-full rounded-xl" />
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {/* Profile Info */}
                                <div className="flex flex-col items-center text-center space-y-3">
                                    <div className="relative">
                                        <Avatar className="h-24 w-24 border-2 border-primary/20">
                                            <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80" alt="Player One" />
                                            <AvatarFallback>P1</AvatarFallback>
                                        </Avatar>
                                        <Badge className="absolute bottom-0 right-0 bg-primary hover:bg-primary text-primary-foreground font-bold px-1.5 py-0.5 text-[9px] uppercase tracking-wider">
                                            PRO
                                        </Badge>
                                    </div>
                                    <div className="space-y-1">
                                        <h2 className="text-xl font-bold tracking-tight">Player One</h2>
                                        <div className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">
                                            Elite Tier Member
                                        </div>
                                    </div>
                                </div>

                                {/* Stats Card */}
                                <Card>
                                    <CardContent className=" grid grid-cols-3 gap-2 text-center divide-x divide-border">
                                        <div className="space-y-1">
                                            <div className="text-[9px] uppercase text-muted-foreground font-semibold tracking-wider">Challenges</div>
                                            <div className="text-base font-semibold text-foreground">42</div>
                                        </div>
                                        <div className="space-y-1">
                                            <div className="text-[9px] uppercase text-muted-foreground font-semibold tracking-wider">Total Earned</div>
                                            <div className="text-base font-semibold text-primary">$15.4k</div>
                                        </div>
                                        <div className="space-y-1">
                                            <div className="text-[9px] uppercase text-muted-foreground font-semibold tracking-wider">Rank</div>
                                            <div className="text-base font-semibold text-foreground">#128</div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Badges Section */}
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-sm font-semibold uppercase tracking-wide">Badges</h3>
                                        <Button variant="link" size="sm" className="h-auto p-0 text-xs font-semibold text-primary">VIEW ALL</Button>
                                    </div>
                                    <div className="grid grid-cols-4 gap-2 text-center">
                                        <div className="space-y-1.5">
                                            <div className="h-11 w-11 rounded-full bg-secondary/50 flex items-center justify-center mx-auto text-foreground border border-border">
                                                <Coins className="h-4 w-4" />
                                            </div>
                                            <div className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">High Roller</div>
                                        </div>
                                        <div className="space-y-1.5">
                                            <div className="h-11 w-11 rounded-full bg-secondary/50 flex items-center justify-center mx-auto text-foreground border border-border">
                                                <Flame className="h-4 w-4" />
                                            </div>
                                            <div className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">Win Streak</div>
                                        </div>
                                        <div className="space-y-1.5">
                                            <div className="h-11 w-11 rounded-full bg-secondary/50 flex items-center justify-center mx-auto text-foreground border border-border">
                                                <CheckCircle className="h-4 w-4" />
                                            </div>
                                            <div className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground text-center leading-tight">Early Adopter</div>
                                        </div>
                                        <div className="space-y-1.5">
                                            <div className="h-11 w-11 rounded-full bg-secondary/50 flex items-center justify-center mx-auto text-foreground border border-border">
                                                <Award className="h-4 w-4" />
                                            </div>
                                            <div className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">Champion</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Settings Menu */}
                                <Card>
                                    <CardContent className="p-0 flex flex-col divide-y divide-border">
                                        <Button variant="ghost" className="w-full justify-between h-auto py-3 px-4 font-normal rounded-none text-foreground border-none hover:bg-muted/30">
                                            <div className="flex items-center gap-3">
                                                <Settings className="h-4 w-4 text-muted-foreground" />
                                                <span className="text-sm font-medium">Account Settings</span>
                                            </div>
                                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                                        </Button>

                                        <Button variant="ghost" className="w-full justify-between h-auto py-3 px-4 font-normal rounded-none text-foreground border-none hover:bg-muted/30">
                                            <div className="flex items-center gap-3">
                                                <Shield className="h-4 w-4 text-muted-foreground" />
                                                <span className="text-sm font-medium">Security</span>
                                            </div>
                                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                                        </Button>

                                        <Button variant="ghost" className="w-full justify-between h-auto py-3 px-4 font-normal rounded-none text-foreground border-none hover:bg-muted/30">
                                            <div className="flex items-center gap-3">
                                                <Bell className="h-4 w-4 text-muted-foreground" />
                                                <span className="text-sm font-medium">Notification Preferences</span>
                                            </div>
                                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                                        </Button>

                                        <Button variant="ghost" className="w-full justify-between h-auto py-3 px-4 font-normal rounded-none text-foreground border-none hover:bg-muted/30">
                                            <div className="flex items-center gap-3">
                                                <HelpCircle className="h-4 w-4 text-muted-foreground" />
                                                <span className="text-sm font-medium">Help & Support</span>
                                            </div>
                                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                                        </Button>
                                    </CardContent>
                                </Card>
                            </div>
                        )}
                    </main>

                </SidebarInset>
            </SidebarProvider>
            <BottomNavbar />
        </>
    )
}
