import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { AppSidebar } from "@/components/app-sidebar"
import { BottomNavbar } from "@/components/bottom-navbar"
import {
    SidebarInset,
    SidebarProvider,
} from "@workspace/ui/components/sidebar"
import { Card, CardContent } from "@workspace/ui/components/card"
import { Button } from "@workspace/ui/components/button"
import { Skeleton } from "@workspace/ui/components/skeleton"
import { Badge } from "@workspace/ui/components/badge"
import { ArrowLeft, MoreVertical, Trophy, Plus, Clock } from "lucide-react"

export default function JoinChallenge() {
    const navigate = useNavigate()
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

                    {/* Custom Header with Back Button */}
                    <header className="flex items-center justify-between px-4 py-4 border-b">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => navigate("/challenges")}
                            className="h-9 w-9"
                        >
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                        <span className="text-lg font-semibold tracking-wider">ANYBET</span>
                        <Button variant="ghost" size="icon" className="h-9 w-9">
                            <MoreVertical className="h-5 w-5" />
                        </Button>
                    </header>

                    <main className="flex-1 overflow-auto p-4 md:p-6 space-y-6 pb-24 max-w-md mx-auto w-full">
                        {loading ? (
                            <div className="space-y-4 flex flex-col items-center">
                                <Skeleton className="h-6 w-32 rounded-full" />
                                <Skeleton className="h-16 w-16 rounded-full" />
                                <div className="space-y-2 w-full flex flex-col items-center">
                                    <Skeleton className="h-8 w-64" />
                                    <Skeleton className="h-4 w-full" />
                                </div>
                                <Skeleton className="h-[120px] w-full rounded-xl" />
                                <Skeleton className="h-[120px] w-full rounded-xl" />
                                <Skeleton className="h-12 w-full rounded-lg" />
                            </div>
                        ) : (
                            <div className="space-y-4 flex flex-col items-center">

                                {/* Badge */}
                                <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/10 px-2 py-0.5 text-xs uppercase font-medium">
                                    ⚡ Live Challenge
                                </Badge>

                                {/* Game Icon */}
                                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                    <Trophy className="h-6 w-6" />
                                </div>

                                {/* Title & Subtitle */}
                                <div className="text-center space-y-1">
                                    <h2 className="text-xl font-semibold tracking-tight">Lakers vs Celtics Tonight</h2>
                                    <p className="text-muted-foreground text-xs max-w-xs mx-auto">
                                        Social prediction for the NBA Finals regular season matchup
                                    </p>
                                </div>

                                {/* Pot Amount Card */}
                                <Card className="w-full text-center">
                                    <CardContent className=" space-y-1">
                                        <div className="text-xs uppercase text-muted-foreground font-medium">
                                            Total Pot Amount
                                        </div>
                                        <div className="text-2xl font-bold text-primary">
                                            $250
                                        </div>
                                        <div className="text-[10px] text-muted-foreground">
                                            Locked in Escrow
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Timer Card */}
                                <Card className="w-full text-center">
                                    <CardContent className=" space-y-2">
                                        <div className="text-xs uppercase text-muted-foreground font-medium flex items-center justify-center gap-1">
                                            <Clock className="h-3 w-3" /> Ends In
                                        </div>
                                        <div className="flex justify-center items-center gap-3 text-2xl font-bold">
                                            <div className="flex flex-col items-center">
                                                <span>02</span>
                                                <span className="text-[9px] text-muted-foreground uppercase">Hrs</span>
                                            </div>
                                            <span className="text-muted-foreground/50 pb-4">:</span>
                                            <div className="flex flex-col items-center">
                                                <span>45</span>
                                                <span className="text-[9px] text-muted-foreground uppercase">Min</span>
                                            </div>
                                            <span className="text-muted-foreground/50 pb-4">:</span>
                                            <div className="flex flex-col items-center">
                                                <span>18</span>
                                                <span className="text-[9px] text-muted-foreground uppercase">Sec</span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        )}
                    </main>

                    {/* Fixed Bottom Join Challenge Button */}
                    {!loading && (
                        <div className="fixed bottom-20 left-0 right-0 p-4 bg-background/80 ">
                            <Button className="w-full h-10 text-base font-semibold">
                                <Plus className="mr-1 h-4 w-4" /> Join Challenge
                            </Button>
                        </div>
                    )}

                </SidebarInset>
            </SidebarProvider>
            <BottomNavbar />
        </>
    )
}
