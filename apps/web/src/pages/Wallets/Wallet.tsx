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
import { PlusCircle, Trophy, Landmark, Eye, Snowflake, Lock, Trash2, MoreHorizontal } from "lucide-react"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    type CarouselApi,
} from "@workspace/ui/components/carousel"
import Header from "../Header/Header"

export default function Wallet() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [balance, setBalance] = useState(12450.85)
    const [available, setAvailable] = useState(8120.00)
    const [escrow] = useState(4330.85)
    // @ts-ignore - Keeping these states to preserve the user's code
    const [action, setAction] = useState<"none" | "deposit" | "withdraw">("none")
    // @ts-ignore
    const [amount, setAmount] = useState("")
    // @ts-ignore
    const [error, setError] = useState("")
    const [carouselApi, setCarouselApi] = useState<CarouselApi>()
    const [activeCardIndex, setActiveCardIndex] = useState(0)
    const [transactions, setTransactions] = useState([
        {
            id: 1,
            type: "payout",
            title: "Payout: Lakers vs Celtics",
            amount: "+$1,200.00",
            date: "24 Oct 11:20 PM • Completed",
            sub: "Challenge Win"
        },
        {
            id: 2,
            type: "deposit",
            title: "Deposit: Bank Transfer",
            amount: "+$500.00",
            date: "22 Oct 09:15 AM • Completed",
            sub: "Deposit"
        }
    ])

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false)
        }, 1500)
        return () => clearTimeout(timer)
    }, [])

    useEffect(() => {
        if (!carouselApi) return
        const onSelect = () => setActiveCardIndex(carouselApi.selectedScrollSnap())
        carouselApi.on("select", onSelect)
        onSelect()
        return () => { carouselApi.off("select", onSelect) }
    }, [carouselApi])

    // @ts-ignore - Keeping this function to preserve the user's code
    const handleConfirm = () => {
        setError("")
        const parsedAmount = parseFloat(amount)
        if (isNaN(parsedAmount) || parsedAmount <= 0) {
            setError("Please enter a valid positive amount")
            return
        }

        if (action === "deposit") {
            setBalance(prev => prev + parsedAmount)
            setAvailable(prev => prev + parsedAmount)
            setTransactions(prev => [
                {
                    id: Date.now(),
                    type: "deposit",
                    title: "Deposit: Bank Transfer",
                    amount: `+$${parsedAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
                    date: "Just Now • Completed",
                    sub: "Deposit"
                },
                ...prev
            ])
            setAction("none")
            setAmount("")
        } else if (action === "withdraw") {
            if (parsedAmount > available) {
                setError("Insufficient available funds")
                return
            }
            setBalance(prev => prev - parsedAmount)
            setAvailable(prev => prev - parsedAmount)
            setTransactions(prev => [
                {
                    id: Date.now(),
                    type: "withdraw",
                    title: "Withdraw: Bank Transfer",
                    amount: `-$${parsedAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
                    date: "Just Now • Completed",
                    sub: "Withdrawal"
                },
                ...prev
            ])
            setAction("none")
            setAmount("")
        }
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
                <SidebarInset className="bg-background animate-in fade-in duration-500 ease-in-out">

                    <Header title="WALLET" loading={loading} />

                    <main className="flex-1 overflow-auto p-4 md:p-6 space-y-4 pb-24 max-w-md mx-auto w-full">

                        {loading ? (
                            <div className="space-y-4">
                                <Skeleton className="h-[180px] w-full rounded-xl" />
                                <div className="grid grid-cols-2 gap-4">
                                    <Skeleton className="h-[80px] rounded-xl" />
                                    <Skeleton className="h-[80px] rounded-xl" />
                                </div>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center">
                                        <Skeleton className="h-6 w-32" />
                                        <Skeleton className="h-4 w-16" />
                                    </div>
                                    <div className="flex gap-4 overflow-x-auto pb-2">
                                        <Skeleton className="aspect-[8/5] w-[200px] shrink-0 rounded-xl" />
                                        <Skeleton className="aspect-[8/5] w-[200px] shrink-0 rounded-xl" />
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <Skeleton className="h-6 w-40" />
                                    <Skeleton className="h-[72px] w-full rounded-xl" />
                                    <Skeleton className="h-[72px] w-full rounded-xl" />
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {/* Total Balance Card */}
                                <Card className="w-full">
                                    <CardContent className="space-y-4">
                                        <div className="space-y-1">
                                            <span className="text-xs uppercase text-muted-foreground font-semibold">Total Balance</span>
                                            <div className="flex items-baseline gap-1">
                                                <span className="text-xl font-bold tracking-tight">${Math.floor(balance).toLocaleString()}</span>
                                                <span className="text-md font-semibold text-muted-foreground">.{Math.round((balance % 1) * 100).toString().padStart(2, "0")}</span>
                                            </div>
                                        </div>

                                        <div className="flex gap-3">
                                            <Button className="flex-1 h-10 font-bold" size="sm" onClick={() => navigate("/wallet/deposit")}>
                                                <PlusCircle className="mr-1.5 h-4 w-4" /> DEPOSIT
                                            </Button>
                                            <Button variant="outline" className="flex-1 h-10 font-bold" size="sm" onClick={() => navigate("/wallet/withdraw")}>
                                                <Landmark className="mr-1.5 h-4 w-4" /> WITHDRAW
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Funds Columns */}
                                <div className="grid grid-cols-2 gap-3">
                                    <Card>
                                        <CardContent className="space-y-1">
                                            <span className="text-[10px] uppercase font-semibold text-muted-foreground">Available Funds</span>
                                            <div className="text-lg font-bold text-primary">${available.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardContent className="space-y-1">
                                            <span className="text-[10px] uppercase font-semibold text-muted-foreground">Locked in Escrow</span>
                                            <div className="text-lg font-bold text-muted-foreground">${escrow.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                                        </CardContent>
                                    </Card>
                                </div>

                                {/* Linked Accounts Section */}
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-sm font-bold uppercase tracking-wide">Linked Accounts</h3>
                                        <Button variant="link" size="sm" className="h-auto p-0 text-xs font-semibold text-primary">MANAGE</Button>
                                    </div>

                                    <Carousel setApi={setCarouselApi} opts={{ align: "center" }} className="w-full max-w-sm mx-auto">
                                        <CarouselContent className="-ml-2">
                                            {/* Card 1 */}
                                            <CarouselItem className="pl-2 basis-[70%]">
                                                <div className={`transition-all duration-500 ease-out relative rounded-xl overflow-hidden bg-gradient-to-br from-[#0B3B52] to-[#0A1A2F] text-white p-3 space-y-2 flex flex-col justify-between origin-center ${activeCardIndex === 0 ? "scale-100 z-20 opacity-100" : "scale-95 z-0 opacity-50 translate-x-8"}`}>
                                                    <div className="flex justify-between items-start">
                                                        <span className="font-semibold text-sm">ANYBET</span>
                                                        <MoreHorizontal className="text-white/80" />
                                                    </div>

                                                    <div className="flex justify-between items-center ">
                                                        <div className="w-8 h-6 bg-gradient-to-br from-[#e6c27a] to-[#d4af37] rounded opacity-90 flex items-center justify-center overflow-hidden">
                                                            <div className="w-full h-full opacity-30 bg-[linear-gradient(45deg,transparent_25%,rgba(0,0,0,0.1)_50%,transparent_75%)] bg-[length:4px_4px]"></div>
                                                        </div>
                                                        <span className="text-[10px] text-white/70 ">DEBIT CARD</span>
                                                    </div>

                                                    <div className="text-sm md:text-xl font-mono tracking-widest ">
                                                        •••• •••• •••• 4921
                                                    </div>

                                                    <div className="flex justify-between items-end">
                                                        <span className="text-xs tracking-widest text-white/90 uppercase">Ashish Kumar</span>
                                                        <div className="flex items-center gap-3">
                                                            <div className="flex flex-col items-center">
                                                                <span className="text-[6px] text-white/70">VALID THRU</span>
                                                                <span className="text-xs font-mono">12/26</span>
                                                            </div>
                                                            <span className="text-xl font-bold italic">VISA</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </CarouselItem>

                                            {/* Card 2 */}
                                            <CarouselItem className="pl-2 basis-[70%]">
                                                <div className={`transition-all duration-500 ease-out relative rounded-xl overflow-hidden bg-gradient-to-br from-[#2A2A2A] to-[#111111] text-white p-3 space-y-3  flex flex-col justify-between origin-center ${activeCardIndex === 1 ? "scale-100 z-20 opacity-100" : "scale-95 z-0 opacity-50 -translate-x-8"}`}>
                                                    <div className="flex justify-between items-start">
                                                        <span className="font-semibold text-md opacity-0">ANYBET</span>
                                                        <MoreHorizontal className="text-white/80" />
                                                    </div>

                                                    <div className="flex justify-between items-center ">
                                                        <div className="w-8 h-6 bg-transparent rounded"></div>
                                                        <span className="text-[10px] text-white/70 ">DEBIT CARD</span>
                                                    </div>

                                                    <div className="text-sm md:text-sm font-mono tracking-widest ">
                                                        •••• •••• •••• 8821
                                                    </div>

                                                    <div className="flex justify-between items-end">
                                                        <span className="text-xs tracking-widest text-white/90 uppercase opacity-0">Ashish Kumar</span>
                                                        <div className="flex items-center gap-3">
                                                            <div className="flex flex-col items-center">
                                                                <span className="text-[6px] text-white/70">VALID THRU</span>
                                                                <span className="text-xs font-mono">08/27</span>
                                                            </div>
                                                            {/* Fake Mastercard Logo */}
                                                            <div className="flex -space-x-2">
                                                                <div className="w-6 h-6 rounded-full bg-[#EA001B] opacity-90 mix-blend-screen"></div>
                                                                <div className="w-6 h-6 rounded-full bg-[#F79E1B] opacity-90 mix-blend-screen"></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </CarouselItem>
                                        </CarouselContent>
                                    </Carousel>

                                    {/* Dots */}
                                    <div className="flex justify-center gap-1.5 mt-[-4px] pb-1">
                                        {[0, 1].map((index) => (
                                            <button
                                                key={index}
                                                className={`w-2 h-2 rounded-full transition-colors ${activeCardIndex === index ? 'bg-cyan-600' : 'bg-muted'}`}
                                                onClick={() => carouselApi?.scrollTo(index)}
                                            />
                                        ))}
                                    </div>

                                    {/* Actions */}
                                    <div className="grid grid-cols-4 gap-2 pt-2">
                                        <Card className="bg-secondary/40 border-none cursor-pointer hover:bg-secondary/60 transition-colors">
                                            <CardContent className=" flex flex-col items-center justify-center gap-2">
                                                <Eye className="h-5 w-5 text-cyan-500" />
                                                <span className="text-[9px] text-center font-medium leading-tight text-foreground/80">View Details</span>
                                            </CardContent>
                                        </Card>
                                        <Card className="bg-secondary/40 border-none cursor-pointer hover:bg-secondary/60 transition-colors">
                                            <CardContent className=" flex flex-col items-center justify-center gap-2">
                                                <Snowflake className="h-5 w-5 text-blue-500" />
                                                <span className="text-[9px] text-center font-medium leading-tight text-foreground/80">Freeze Card</span>
                                            </CardContent>
                                        </Card>
                                        <Card className="bg-secondary/40 border-none cursor-pointer hover:bg-secondary/60 transition-colors">
                                            <CardContent className=" flex flex-col items-center justify-center gap-2">
                                                <Lock className="h-5 w-5 text-orange-500" />
                                                <span className="text-[9px] text-center font-medium leading-tight text-foreground/80">Change PIN</span>
                                            </CardContent>
                                        </Card>
                                        <Card className="bg-secondary/40 border-none cursor-pointer hover:bg-secondary/60 transition-colors">
                                            <CardContent className=" flex flex-col items-center justify-center gap-2">
                                                <Trash2 className="h-5 w-5 text-red-500" />
                                                <span className="text-[9px] text-center font-medium leading-tight text-foreground/80">Remove Card</span>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </div>

                                {/* Recent Transactions Section */}
                                <div className="space-y-3">
                                    <h3 className="text-sm font-bold uppercase tracking-wide">Recent Transactions</h3>

                                    <div className="space-y-3">
                                        {transactions.map(tx => (
                                            <Card key={tx.id}>
                                                <CardContent className="flex items-center justify-between">
                                                    <div className="flex items-center gap-3">
                                                        <div className={`h-10 w-10 rounded-full flex items-center justify-center ${tx.type === "deposit" || tx.type === "payout" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
                                                            {tx.type === "payout" ? <Trophy className="h-5 w-5" /> : <Landmark className="h-5 w-5" />}
                                                        </div>
                                                        <div>
                                                            <div className="text-sm font-semibold">{tx.title}</div>
                                                            <div className="text-[9px] text-muted-foreground uppercase mt-0.5">{tx.date}</div>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className={`text-sm font-bold ${tx.amount.startsWith("+") ? "text-primary" : "text-foreground"}`}>{tx.amount}</div>
                                                        <div className="text-[9px] text-muted-foreground uppercase mt-0.5">{tx.sub}</div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                    </main>

                </SidebarInset>
            </SidebarProvider>
            <BottomNavbar />
        </>
    )
}
