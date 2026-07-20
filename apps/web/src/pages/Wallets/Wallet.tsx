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
import { Input } from "@workspace/ui/components/input"
import { Skeleton } from "@workspace/ui/components/skeleton"
import { PlusCircle, CreditCard, Wallet as WalletIcon, Trophy, Landmark } from "lucide-react"
import Header from "../Header/Header"

export default function Wallet() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [balance, setBalance] = useState(12450.85)
    const [available, setAvailable] = useState(8120.00)
    const [escrow] = useState(4330.85)
    const [action, setAction] = useState<"none" | "deposit" | "withdraw">("none")
    const [amount, setAmount] = useState("")
    const [error, setError] = useState("")
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

                    <Header loading={loading} />

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
                                                <span className="text-3xl font-bold tracking-tight">${Math.floor(balance).toLocaleString()}</span>
                                                <span className="text-lg font-semibold text-muted-foreground">.{Math.round((balance % 1) * 100).toString().padStart(2, "0")}</span>
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

                                    <div className="flex gap-4 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                                        {/* Card 1: Visa */}
                                        <Card className="w-[220px] shrink-0 bg-secondary/30 border-none">
                                            <CardContent className=" flex flex-col justify-between h-6">
                                                <div className="flex justify-between items-start">
                                                    <CreditCard className="h-5 w-5 text-muted-foreground" />
                                                    <span className="text-xs font-bold italic text-muted-foreground">VISA</span>
                                                </div>
                                                <div className="text-sm font-mono tracking-wider">
                                                    •••• •••• •••• 4492
                                                </div>
                                                <div className="text-xs uppercase text-muted-foreground font-medium">
                                                    Expires 12/26
                                                </div>
                                            </CardContent>
                                        </Card>

                                        {/* Card 2: Ethereum */}
                                        <Card className="w-[220px] shrink-0 bg-secondary/30 border-none">
                                            <CardContent className="p-4 flex flex-col justify-between aspect-[8/5]">
                                                <div className="flex justify-between items-start">
                                                    <WalletIcon className="h-5 w-5 text-muted-foreground" />
                                                    <span className="text-[10px] font-bold text-muted-foreground">ETH</span>
                                                </div>
                                                <div className="text-sm font-mono tracking-wider truncate">
                                                    0x71C7...60E2
                                                </div>
                                                <div className="text-[9px] uppercase text-muted-foreground font-medium">
                                                    ETHEREUM WALLET
                                                </div>
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
                                                <CardContent className="p-4 flex items-center justify-between">
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
