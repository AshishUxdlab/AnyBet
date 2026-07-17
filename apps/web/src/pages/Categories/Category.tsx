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
import { Trophy, Dumbbell, TrendingUp, Sparkles, CheckCircle2, Circle } from "lucide-react"
import Header from "../Header/Header"

export default function Category() {
    const navigate = useNavigate()
    const [selected, setSelected] = useState("prediction")
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

                    <main className="flex-1 overflow-auto p-4 md:p-6 space-y-6 pb-24">

                        {/* Stepper */}
                        {loading ? (
                            <div className="flex items-center justify-center space-x-2 md:space-x-4 mb-2">
                                <div className="flex flex-col items-center gap-1">
                                    <Skeleton className="h-10 w-10 rounded-full" />
                                    <Skeleton className="h-3 w-10" />
                                </div>
                                <Skeleton className="h-px w-12 mb-4" />
                                <div className="flex flex-col items-center gap-1">
                                    <Skeleton className="h-10 w-10 rounded-full" />
                                    <Skeleton className="h-3 w-10" />
                                </div>
                                <Skeleton className="h-px w-12 mb-4" />
                                <div className="flex flex-col items-center gap-1">
                                    <Skeleton className="h-10 w-10 rounded-full" />
                                    <Skeleton className="h-3 w-10" />
                                </div>
                                <Skeleton className="h-px w-12 mb-4" />
                                <div className="flex flex-col items-center gap-1">
                                    <Skeleton className="h-10 w-10 rounded-full" />
                                    <Skeleton className="h-3 w-10" />
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center justify-center space-x-2 md:space-x-4 mb-2">
                                <div className="flex flex-col items-center gap-1">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">1</div>
                                    <span className="text-xs font-semibold text-primary">Details</span>
                                </div>
                                <div className="h-px w-12 bg-border mb-5"></div>

                                <div className="flex flex-col items-center gap-1">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground text-sm font-bold">2</div>
                                    <span className="text-xs font-medium text-muted-foreground">Rules</span>
                                </div>
                                <div className="h-px w-12 bg-border mb-5"></div>

                                <div className="flex flex-col items-center gap-1">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground text-sm font-bold">3</div>
                                    <span className="text-xs font-medium text-muted-foreground">Stake</span>
                                </div>
                                <div className="h-px w-12 bg-border mb-5"></div>

                                <div className="flex flex-col items-center gap-1">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground text-sm font-bold">4</div>
                                    <span className="text-xs font-medium text-muted-foreground">Review</span>
                                </div>
                            </div>
                        )}

                        <section className="">
                            {loading ? (
                                <div className="space-y-2">
                                    <Skeleton className="h-8 w-48" />
                                    <Skeleton className="h-4 w-full max-w-sm" />
                                </div>
                            ) : (
                                <>
                                    <h2 className="text-2xl font-semibold tracking-tight">Create Challenge</h2>
                                    <p className="text-muted-foreground text-xs">
                                        Choose the type of challenge you want to create. Our AI will help you define the parameters in the next steps.
                                    </p>
                                </>
                            )}
                        </section>

                        <section className="grid gap-3 mb-20">
                            {loading ? (
                                <>
                                    <Skeleton className="h-[80px] w-full" />
                                    <Skeleton className="h-[80px] w-full" />
                                    <Skeleton className="h-[80px] w-full" />
                                    <Skeleton className="h-[80px] w-full" />
                                </>
                            ) : (
                                <>
                                    {/* Option 1 */}
                                    <label className="cursor-pointer" onClick={() => setSelected("prediction")}>
                                        <Card className={`transition-all duration-300 ease-in-out py-0 border ${selected === "prediction" ? "border-primary bg-primary/5" : "border-transparent bg-card hover:bg-muted/50"}`}>
                                            <CardContent className="p-4 flex items-center gap-4">
                                                <div className="h-10 w-10 shrink-0 rounded-sm bg-muted flex items-center justify-center">
                                                    <Trophy className="h-5 w-5 text-foreground" />
                                                </div>
                                                <div className="flex-1 space-y-1">
                                                    <p className="font-semibold text-base leading-none">Prediction</p>
                                                    <p className="text-sm text-muted-foreground leading-snug">Predict the outcome of an event or game.</p>
                                                </div>
                                                <div className={`shrink-0 transition-colors duration-300 ${selected === "prediction" ? "text-primary" : "text-muted-foreground"}`}>
                                                    <input type="radio" name="challengeType" checked={selected === "prediction"} readOnly className="sr-only" />
                                                    {selected === "prediction" ? <CheckCircle2 className="h-6 w-6" /> : <Circle className="h-6 w-6" />}
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </label>

                                    {/* Option 2 */}
                                    <label className="cursor-pointer" onClick={() => setSelected("physical")}>
                                        <Card className={`transition-all duration-300 ease-in-out py-0 border ${selected === "physical" ? "border-primary bg-primary/5" : "border-transparent bg-card hover:bg-muted/50"}`}>
                                            <CardContent className="p-4 flex items-center gap-4">
                                                <div className="h-10 w-10 shrink-0 rounded-sm bg-muted flex items-center justify-center">
                                                    <Dumbbell className="h-5 w-5 text-foreground" />
                                                </div>
                                                <div className="flex-1 space-y-1">
                                                    <p className="font-semibold text-base leading-none">Physical</p>
                                                    <p className="text-sm text-muted-foreground leading-snug">Physical or skill-based activity challenge.</p>
                                                </div>
                                                <div className={`shrink-0 transition-colors duration-300 ${selected === "physical" ? "text-primary" : "text-muted-foreground"}`}>
                                                    <input type="radio" name="challengeType" checked={selected === "physical"} readOnly className="sr-only" />
                                                    {selected === "physical" ? <CheckCircle2 className="h-6 w-6" /> : <Circle className="h-6 w-6" />}
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </label>

                                    {/* Option 3 */}
                                    <label className="cursor-pointer" onClick={() => setSelected("performance")}>
                                        <Card className={`transition-all duration-300 ease-in-out py-0 border ${selected === "performance" ? "border-primary bg-primary/5" : "border-transparent bg-card hover:bg-muted/50"}`}>
                                            <CardContent className="p-4 flex items-center gap-4">
                                                <div className="h-10 w-10 shrink-0 rounded-sm bg-muted flex items-center justify-center">
                                                    <TrendingUp className="h-5 w-5 text-foreground" />
                                                </div>
                                                <div className="flex-1 space-y-1">
                                                    <p className="font-semibold text-base leading-none">Performance</p>
                                                    <p className="text-sm text-muted-foreground leading-snug">Beat a specific score, time, or metric.</p>
                                                </div>
                                                <div className={`shrink-0 transition-colors duration-300 ${selected === "performance" ? "text-primary" : "text-muted-foreground"}`}>
                                                    <input type="radio" name="challengeType" checked={selected === "performance"} readOnly className="sr-only" />
                                                    {selected === "performance" ? <CheckCircle2 className="h-6 w-6" /> : <Circle className="h-6 w-6" />}
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </label>

                                    {/* Option 4 */}
                                    <label className="cursor-pointer" onClick={() => setSelected("custom")}>
                                        <Card className={`transition-all duration-300 ease-in-out py-0 border ${selected === "custom" ? "border-primary bg-primary/5" : "border-transparent bg-card hover:bg-muted/50"}`}>
                                            <CardContent className="p-4 flex items-center gap-4">
                                                <div className="h-10 w-10 shrink-0 rounded-sm bg-muted flex items-center justify-center">
                                                    <Sparkles className="h-5 w-5 text-foreground" />
                                                </div>
                                                <div className="flex-1 space-y-1">
                                                    <p className="font-semibold text-base leading-none">Custom</p>
                                                    <p className="text-sm text-muted-foreground leading-snug">Design your own unique challenge rules.</p>
                                                </div>
                                                <div className={`shrink-0 transition-colors duration-300 ${selected === "custom" ? "text-primary" : "text-muted-foreground"}`}>
                                                    <input type="radio" name="challengeType" checked={selected === "custom"} readOnly className="sr-only" />
                                                    {selected === "custom" ? <CheckCircle2 className="h-6 w-6" /> : <Circle className="h-6 w-6" />}
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </label>
                                </>
                            )}
                        </section>
                    </main>

                    {/* Fixed Bottom Select Button */}
                    {!loading && (
                        <div className="fixed bottom-20 left-0 right-0 p-4 bg-background/80 backdrop-blur-sm border-t z-40 md:left-[var(--sidebar-width)] md:w-[calc(100%-var(--sidebar-width))] animate-in fade-in duration-300">
                            <Button onClick={() => navigate("/challenges/join")} className="w-full h-10 text-base font-semibold">Select</Button>
                        </div>
                    )}

                </SidebarInset>
            </SidebarProvider>
            <BottomNavbar />
        </>
    )
}
