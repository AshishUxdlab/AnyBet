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
import { ArrowLeft, MoreVertical, ShieldCheck, CreditCard, Clock, Receipt, TrendingUp, CheckCircle2 } from "lucide-react"

export default function Withdrawal() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [withdrawn, setWithdrawn] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false)
        }, 1500)
        return () => clearTimeout(timer)
    }, [])

    const handleConfirmWithdrawal = () => {
        setWithdrawn(true)
        setTimeout(() => {
            navigate("/wallet")
        }, 1200)
    }

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
                <SidebarInset className="bg-background animate-in fade-in duration-500 ease-in-out w-full overflow-x-hidden">
                    {/* Header with Back Button */}
                    <header className="flex items-center justify-between px-4 py-4 border-b">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => navigate("/wallet")}
                            className="h-9 w-9"
                        >
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                        <span className="text-lg font-semibold tracking-wider">ANYBET</span>
                        <Button variant="ghost" size="icon" className="h-9 w-9">
                            <MoreVertical className="h-5 w-5" />
                        </Button>
                    </header>

                    <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-6 space-y-6 pb-44 max-w-md mx-auto w-full">
                        {loading ? (
                            <div className="space-y-4 flex flex-col items-center">
                                {/* Top Icon Skeleton */}
                                <Skeleton className="h-12 w-12 rounded-full" />

                                {/* Title & Subtitle Skeletons */}
                                <div className="text-center space-y-2 w-full flex flex-col items-center">
                                    <Skeleton className="h-5 w-44 rounded-full" />
                                    <Skeleton className="h-3.5 w-64 rounded-full" />
                                </div>

                                {/* Withdrawal Details Card Skeleton */}
                                <Card className="w-full border-border/60 shadow-sm overflow-hidden">
                                    <CardContent className="p-5 space-y-6">
                                        <div className="flex flex-col items-center space-y-2">
                                            <Skeleton className="h-3 w-32 rounded-full" />
                                            <Skeleton className="h-6 w-36 rounded-full" />
                                        </div>

                                        <div className="space-y-4 pt-1">
                                            <div className="flex justify-between items-center">
                                                <Skeleton className="h-3.5 w-20 rounded-full" />
                                                <Skeleton className="h-3.5 w-24 rounded-full" />
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <Skeleton className="h-3.5 w-28 rounded-full" />
                                                <Skeleton className="h-3.5 w-24 rounded-full" />
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <Skeleton className="h-3.5 w-16 rounded-full" />
                                                <Skeleton className="h-3.5 w-20 rounded-full" />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Security Notice Skeleton */}
                                <Card className="w-full border border-border/60 p-4">
                                    <div className="flex items-center gap-3">
                                        <Skeleton className="h-4 w-4 rounded-full shrink-0" />
                                        <div className="space-y-2 w-full">
                                            <Skeleton className="h-3 w-full rounded-full" />
                                            <Skeleton className="h-3 w-3/4 rounded-full" />
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        ) : (
                            <div className="space-y-5 flex flex-col items-center">
                                {/* Top Icon */}
                                <div className="h-11 w-11 rounded-full bg-primary/10 text-primary flex items-center justify-center border border-primary/20 shadow-sm">
                                    <Receipt className="h-7 w-7" />
                                </div>

                                {/* Title & Subtitle */}
                                <div className="text-center space-y-1">
                                    <h2 className="text-xl font-semibold tracking-tight text-foreground">
                                        Review Withdrawal
                                    </h2>
                                    <p className="text-xs text-muted-foreground max-w-xs mx-auto">
                                        Please verify your transaction details below before confirming.
                                    </p>
                                </div>

                                {/* Withdrawal Details Card */}
                                <Card className="w-full border-border/60 shadow-sm overflow-hidden">
                                    <CardContent className=" space-y-4">
                                        <div className="text-center space-y-1">
                                            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                                                WITHDRAWAL AMOUNT
                                            </span>
                                            <div className="text-xl font-black text-primary tracking-tight">
                                                $1,250.00
                                            </div>
                                        </div>

                                        <div className="space-y-2.5 pt-3 border-t border-border/40 text-xs">
                                            <div className="flex justify-between items-center py-1">
                                                <span className="text-muted-foreground flex items-center gap-1.5">
                                                    <CreditCard className="h-4 w-4" /> Method
                                                </span>
                                                <span className="font-semibold text-foreground">Visa ****4492</span>
                                            </div>

                                            <div className="flex justify-between items-center py-1 border-t border-border/30">
                                                <span className="text-muted-foreground flex items-center gap-1.5">
                                                    <Clock className="h-4 w-4" /> Arrival Time
                                                </span>
                                                <span className="font-semibold text-foreground">1-3 Business Days</span>
                                            </div>

                                            <div className="flex justify-between items-center py-1 border-t border-border/30">
                                                <span className="text-muted-foreground flex items-center gap-1.5">
                                                    <Receipt className="h-4 w-4" /> Fees
                                                </span>
                                                <span className="font-bold text-primary">Free ($0.00)</span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Security Protection Notice */}
                                <Card className="w-full bg-primary/5 border-primary/20 p-4">
                                    <div className="flex items-start gap-3">
                                        <ShieldCheck className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                                        <p className="text-xs text-muted-foreground leading-relaxed">
                                            Your funds are protected by end-to-end encryption. Once confirmed, this action cannot be reversed.
                                        </p>
                                    </div>
                                </Card>
                            </div>
                        )}
                    </main>

                    {/* Fixed Bottom Action Buttons */}
                    {loading ? (
                        <div className="fixed bottom-16 left-0 right-0 p-4 z-40 md:left-[var(--sidebar-width)] md:w-[calc(100%-var(--sidebar-width))]">
                            <div className="max-w-md mx-auto space-y-2">
                                <Skeleton className="h-10 w-full rounded-xl" />
                                <Skeleton className="h-10 w-full rounded-xl" />
                            </div>
                        </div>
                    ) : (
                        <div className="fixed bottom-16 left-0 right-0 p-4 bg-background/80 backdrop-blur-md border-t border-border/40 z-40 md:left-[var(--sidebar-width)] md:w-[calc(100%-var(--sidebar-width))]">
                            <div className="max-w-md mx-auto space-y-2">
                                <Button
                                    onClick={handleConfirmWithdrawal}
                                    disabled={withdrawn}
                                    className="w-full h-9 text-base font-semibold bg-primary text-primary-foreground hover:bg-primary/90 shadow-md transition-all active:scale-[0.99]"
                                >
                                    {withdrawn ? (
                                        <span className="flex items-center gap-2">
                                            <CheckCircle2 className="h-5 w-5" /> Withdrawal Initiated!
                                        </span>
                                    ) : (
                                        <span className="flex items-center justify-center gap-2">
                                            Confirm & Withdraw <TrendingUp className="h-5 w-5" />
                                        </span>
                                    )}
                                </Button>

                                <Button
                                    variant="outline"
                                    onClick={() => navigate("/wallet")}
                                    className="w-full h-9 text-xs font-semibold uppercase tracking-wider text-muted-foreground border-border/60 hover:bg-muted/50"
                                >
                                    CANCEL
                                </Button>
                            </div>
                        </div>
                    )}
                </SidebarInset>
            </SidebarProvider>
            <BottomNavbar />
        </>
    )
}
