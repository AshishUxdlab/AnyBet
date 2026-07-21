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
import { Badge } from "@workspace/ui/components/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@workspace/ui/components/avatar"
import { Skeleton } from "@workspace/ui/components/skeleton"
import {
    ArrowLeft,
    MessageSquare,
    Ticket,
    Mail,
    ShieldCheck,
    CheckCircle2,
    Clock,
    Send,
    X,
    Bot,
    PlusCircle,
    FileText,
    ChevronRight,
    Headphones,
} from "lucide-react"
import Header from "../Header/Header"

interface TicketItem {
    id: string
    subject: string
    category: string
    status: "Open" | "In Review" | "Resolved"
    date: string
    lastUpdate: string
}

export default function HelpSupport() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)

    // Modals state
    const [isLiveChatOpen, setIsLiveChatOpen] = useState(false)
    const [isCreateTicketOpen, setIsCreateTicketOpen] = useState(false)

    // Chat messages state
    const [chatMessages, setChatMessages] = useState<Array<{ sender: "bot" | "user"; text: string; time: string }>>([
        { sender: "bot", text: "Welcome to AnyBet Support! How can we help you with your challenges, wallet, or account today?", time: "Just now" }
    ])
    const [inputMessage, setInputMessage] = useState("")
    const [isTyping, setIsTyping] = useState(false)

    // AnyBet-specific sample tickets
    const [tickets, setTickets] = useState<TicketItem[]>([
        {
            id: "TICK-4821",
            subject: "Lakers vs Celtics challenge pot settlement delay",
            category: "Challenge & Bet Disputes",
            status: "In Review",
            date: "Today, 02:15 PM",
            lastUpdate: "Assigned to Sports Moderator"
        },
        {
            id: "TICK-3910",
            subject: "Deposit of $50 via Visa not showing in wallet",
            category: "Wallet & Cashouts",
            status: "Resolved",
            date: "Yesterday, 06:40 PM",
            lastUpdate: "Fund credited & PRO XP awarded"
        }
    ])

    // Ticket form state
    const [ticketCategory, setTicketCategory] = useState("Challenge & Bet Disputes")
    const [ticketSubject, setTicketSubject] = useState("")
    const [ticketDesc, setTicketDesc] = useState("")
    const [ticketCreatedSuccess, setTicketCreatedSuccess] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false)
        }, 500)
        return () => clearTimeout(timer)
    }, [])

    const handleSendMessage = () => {
        if (!inputMessage.trim()) return

        const userMsg = inputMessage.trim()
        const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        
        setChatMessages(prev => [...prev, { sender: "user", text: userMsg, time: now }])
        setInputMessage("")
        setIsTyping(true)

        setTimeout(() => {
            setIsTyping(false)
            let botReply = "Thanks for reaching out! Our AnyBet moderation team is checking your request. Is there anything else about your active bets or wallet balance you'd like to check?"
            const lowerMsg = userMsg.toLowerCase()
            
            if (lowerMsg.includes("deposit") || lowerMsg.includes("money") || lowerMsg.includes("add") || lowerMsg.includes("pay")) {
                botReply = "AnyBet supports instant Deposits via Card, UPI & Crypto! Go to Wallet > Deposit. If funds were deducted but delayed, please provide the transaction reference."
            } else if (lowerMsg.includes("withdraw") || lowerMsg.includes("cashout")) {
                botReply = "Withdrawals are instant for PRO users ($10 minimum). Check your Wallet > Withdrawal tab for real-time status."
            } else if (lowerMsg.includes("bet") || lowerMsg.includes("challenge") || lowerMsg.includes("win")) {
                botReply = "Challenge pots are auto-verified via official live match stats. If an opponent didn't confirm or score is disputed, click 'Raise Ticket' to summon a referee."
            }

            setChatMessages(prev => [...prev, { sender: "bot", text: botReply, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }])
        }, 1100)
    }

    const handleCreateTicketSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!ticketSubject.trim() || !ticketDesc.trim()) return

        const newTicket: TicketItem = {
            id: `TICK-${Math.floor(1000 + Math.random() * 9000)}`,
            subject: ticketSubject,
            category: ticketCategory,
            status: "Open",
            date: "Just now",
            lastUpdate: "Received by Support Moderator"
        }

        setTickets([newTicket, ...tickets])
        setTicketCreatedSuccess(true)

        setTimeout(() => {
            setTicketCreatedSuccess(false)
            setIsCreateTicketOpen(false)
            setTicketSubject("")
            setTicketDesc("")
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
                <SidebarInset className="bg-background animate-in fade-in duration-300 ease-in-out">
                    {/* Standard App Header */}
                    <Header title="HELP & SUPPORT" loading={loading} />

                    <main className="flex-1 overflow-auto p-4 md:p-6 pb-24 max-w-md mx-auto w-full space-y-6">
                        {/* Top Back Navigation Bar (Matches EditProfile & Wallet pages) */}
                        <div className="flex items-center justify-between">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => navigate("/profile")}
                                className="flex items-center gap-2 text-muted-foreground hover:text-foreground p-0 h-auto font-medium text-xs"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                <span>Back to Profile</span>
                            </Button>
                            <Badge variant="secondary" className="text-xs font-mono">
                                SUPPORT
                            </Badge>
                        </div>

                        {loading ? (
                            <div className="space-y-4">
                                <Skeleton className="h-28 w-full rounded-xl" />
                                <div className="grid grid-cols-3 gap-2">
                                    <Skeleton className="h-20 rounded-xl" />
                                    <Skeleton className="h-20 rounded-xl" />
                                    <Skeleton className="h-20 rounded-xl" />
                                </div>
                                <Skeleton className="h-40 w-full rounded-xl" />
                            </div>
                        ) : (
                            <>
                                {/* Hero Card */}
                                <Card>
                                    <CardContent className="p-4 space-y-3">
                                        <div className="flex items-center gap-2.5">
                                            <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center border border-primary/20">
                                                <Headphones className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <h2 className="text-sm font-bold text-foreground">AnyBet Support Hub</h2>
                                                <p className="text-[11px] text-muted-foreground">Have a challenge dispute or wallet issue? We're here 24/7.</p>
                                            </div>
                                        </div>

                                        <Button
                                            onClick={() => setIsCreateTicketOpen(true)}
                                            className="w-full h-9 text-xs font-semibold bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm"
                                        >
                                            <PlusCircle className="h-4 w-4 mr-1.5" /> Raise Support Ticket
                                        </Button>
                                    </CardContent>
                                </Card>

                                {/* Quick Support Actions */}
                                <div className="grid grid-cols-3 gap-2">
                                    <Button
                                        variant="outline"
                                        onClick={() => setIsLiveChatOpen(true)}
                                        className="h-auto py-3 px-2 flex flex-col items-center gap-1.5 border-border/80 hover:border-primary/50 hover:bg-primary/5 transition-all group"
                                    >
                                        <div className="h-8 w-8 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <MessageSquare className="h-4 w-4" />
                                        </div>
                                        <span className="text-[11px] font-bold text-foreground">Live Chat</span>
                                        <span className="text-[9px] text-emerald-500 font-medium">Instant</span>
                                    </Button>

                                    <Button
                                        variant="outline"
                                        onClick={() => setIsCreateTicketOpen(true)}
                                        className="h-auto py-3 px-2 flex flex-col items-center gap-1.5 border-border/80 hover:border-primary/50 hover:bg-primary/5 transition-all group"
                                    >
                                        <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <Ticket className="h-4 w-4" />
                                        </div>
                                        <span className="text-[11px] font-bold text-foreground">Raise Ticket</span>
                                        <span className="text-[9px] text-muted-foreground font-medium">New Issue</span>
                                    </Button>

                                    <Button
                                        variant="outline"
                                        onClick={() => window.open("mailto:support@anybet.com")}
                                        className="h-auto py-3 px-2 flex flex-col items-center gap-1.5 border-border/80 hover:border-primary/50 hover:bg-primary/5 transition-all group"
                                    >
                                        <div className="h-8 w-8 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <Mail className="h-4 w-4" />
                                        </div>
                                        <span className="text-[11px] font-bold text-foreground">Email Support</span>
                                        <span className="text-[9px] text-muted-foreground font-medium">support@anybet</span>
                                    </Button>
                                </div>

                                {/* Support Tickets List Section */}
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-1.5">
                                            <Ticket className="h-4 w-4 text-primary" /> My Support Tickets ({tickets.length})
                                        </span>
                                        <Button size="sm" variant="ghost" onClick={() => setIsCreateTicketOpen(true)} className="h-7 text-xs font-semibold text-primary p-0">
                                            + New Ticket
                                        </Button>
                                    </div>

                                    {tickets.length === 0 ? (
                                        <Card className="p-6 text-center space-y-3 border-dashed">
                                            <Ticket className="h-8 w-8 text-muted-foreground mx-auto" />
                                            <p className="text-xs text-muted-foreground">You have no open support tickets.</p>
                                        </Card>
                                    ) : (
                                        tickets.map((t) => (
                                            <Card key={t.id} className="border-border/60 hover:border-border/90 transition-all">
                                                <CardContent className="p-3.5 space-y-2.5">
                                                    <div className="flex items-start justify-between gap-2">
                                                        <div>
                                                            <span className="text-[10px] font-mono text-muted-foreground font-semibold">{t.id} • {t.category}</span>
                                                            <h4 className="text-xs font-bold text-foreground leading-tight mt-0.5">{t.subject}</h4>
                                                        </div>
                                                        <Badge
                                                            variant="outline"
                                                            className={`text-[9px] font-bold px-2 py-0.5 uppercase tracking-wider shrink-0 ${
                                                                t.status === "Resolved"
                                                                    ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/30"
                                                                    : t.status === "In Review"
                                                                    ? "bg-amber-500/10 text-amber-500 border-amber-500/30"
                                                                    : "bg-blue-500/10 text-blue-500 border-blue-500/30"
                                                            }`}
                                                        >
                                                            {t.status}
                                                        </Badge>
                                                    </div>

                                                    <div className="flex items-center justify-between text-[10px] text-muted-foreground pt-2 border-t border-border/40">
                                                        <span className="flex items-center gap-1">
                                                            <Clock className="h-3 w-3" /> {t.date}
                                                        </span>
                                                        <span className="font-medium text-foreground">{t.lastUpdate}</span>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))
                                    )}
                                </div>

                                {/* Banner Link to Dedicated FAQ Page */}
                                <Card
                                    onClick={() => navigate("/faq")}
                                    className="bg-secondary/40 border-border/60 hover:border-primary/40 cursor-pointer transition-all p-4"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="h-9 w-9 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                                                <FileText className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <h4 className="text-xs font-bold text-foreground">AnyBet FAQ Knowledge Base</h4>
                                                <p className="text-[10px] text-muted-foreground">Find instant answers to betting, wallet & challenge rules</p>
                                            </div>
                                        </div>
                                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                                    </div>
                                </Card>

                                {/* Direct Contact Info */}
                                <Card className="bg-muted/30 border-border/60 p-4">
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-xs font-bold text-foreground">
                                            <ShieldCheck className="h-4 w-4 text-primary" /> AnyBet Fair Play Guarantee
                                        </div>
                                        <p className="text-[11px] text-muted-foreground leading-relaxed">
                                            All sports and performance challenge pots are monitored by live referees. Dispute tickets are reviewed within 15 minutes.
                                        </p>
                                    </div>
                                </Card>
                            </>
                        )}
                    </main>

                    {/* LIVE CHAT MODAL */}
                    {isLiveChatOpen && (
                        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-center items-end sm:items-center p-0 sm:p-4">
                            <div className="w-full max-w-md bg-card border border-border sm:rounded-2xl rounded-t-2xl shadow-2xl flex flex-col h-[85vh] sm:h-[600px] animate-in slide-in-from-bottom duration-300">
                                {/* Chat Header */}
                                <div className="p-3.5 border-b border-border bg-card flex items-center justify-between rounded-t-2xl">
                                    <div className="flex items-center gap-2.5">
                                        <div className="relative">
                                            <Avatar className="h-9 w-9 border border-primary/30">
                                                <AvatarImage src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80" />
                                                <AvatarFallback><Bot className="h-5 w-5 text-primary" /></AvatarFallback>
                                            </Avatar>
                                            <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-card" />
                                        </div>
                                        <div>
                                            <h3 className="text-xs font-bold text-foreground flex items-center gap-1">
                                                Sarah <Badge variant="secondary" className="text-[8px] py-0 px-1 font-semibold">AnyBet Bot</Badge>
                                            </h3>
                                            <p className="text-[9px] text-emerald-500 font-medium">Online | Typical reply ~ instant</p>
                                        </div>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => setIsLiveChatOpen(false)}
                                        className="h-8 w-8 rounded-full"
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>

                                {/* Chat Messages Container */}
                                <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-muted/10">
                                    {chatMessages.map((msg, idx) => (
                                        <div
                                            key={idx}
                                            className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
                                        >
                                            <div
                                                className={`max-w-[80%] rounded-2xl px-3.5 py-2 text-xs leading-relaxed shadow-sm ${
                                                    msg.sender === "user"
                                                        ? "bg-primary text-primary-foreground rounded-br-none"
                                                        : "bg-card border border-border text-foreground rounded-bl-none"
                                                }`}
                                            >
                                                {msg.text}
                                            </div>
                                            <span className="text-[8px] text-muted-foreground mt-1 px-1 font-mono">{msg.time}</span>
                                        </div>
                                    ))}

                                    {isTyping && (
                                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground p-2 bg-card border border-border rounded-xl w-24">
                                            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-bounce" />
                                            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-bounce [animation-delay:0.2s]" />
                                            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-bounce [animation-delay:0.4s]" />
                                        </div>
                                    )}
                                </div>

                                {/* Chat Input Footer */}
                                <div className="p-3 border-t border-border bg-card flex items-center gap-2 rounded-b-2xl">
                                    <Input
                                        type="text"
                                        placeholder="Ask about deposits, challenges, or payouts..."
                                        value={inputMessage}
                                        onChange={(e) => setInputMessage(e.target.value)}
                                        onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                                        className="flex-1 h-9 text-xs bg-background border-border"
                                    />
                                    <Button
                                        size="icon"
                                        onClick={handleSendMessage}
                                        disabled={!inputMessage.trim()}
                                        className="h-9 w-9 bg-primary text-primary-foreground hover:bg-primary/90 shrink-0"
                                    >
                                        <Send className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* RAISE TICKET MODAL */}
                    {isCreateTicketOpen && (
                        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-center items-center p-4">
                            <div className="w-full max-w-md bg-card border border-border rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                                <div className="p-4 border-b border-border flex items-center justify-between bg-muted/30">
                                    <div className="flex items-center gap-2">
                                        <Ticket className="h-4 w-4 text-primary" />
                                        <h3 className="text-sm font-bold text-foreground">Raise AnyBet Support Ticket</h3>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => setIsCreateTicketOpen(false)}
                                        className="h-8 w-8 rounded-full"
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>

                                <form onSubmit={handleCreateTicketSubmit} className="p-4 space-y-4">
                                    {ticketCreatedSuccess ? (
                                        <div className="py-8 text-center space-y-3">
                                            <div className="h-12 w-12 rounded-full bg-emerald-500/10 text-emerald-500 mx-auto flex items-center justify-center border border-emerald-500/20">
                                                <CheckCircle2 className="h-6 w-6" />
                                            </div>
                                            <h4 className="text-sm font-bold text-foreground">Ticket Submitted!</h4>
                                            <p className="text-xs text-muted-foreground">AnyBet sports moderators will inspect your ticket shortly.</p>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="space-y-1.5">
                                                <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Category</label>
                                                <select
                                                    value={ticketCategory}
                                                    onChange={(e) => setTicketCategory(e.target.value)}
                                                    className="w-full h-9 rounded-md border border-border bg-background px-3 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                                                >
                                                    <option value="Challenge & Bet Disputes">Challenge & Bet Disputes (Unsettled pots, match scores)</option>
                                                    <option value="Wallet & Cashouts">Wallet & Cashouts (Deposits, Withdrawals)</option>
                                                    <option value="Badges & Leaderboard">Badges & XP Leaderboard Rank</option>
                                                    <option value="Account & KYC">Account Settings & KYC Verification</option>
                                                    <option value="App Bug">App Bug or Tech Issue</option>
                                                </select>
                                            </div>

                                            <div className="space-y-1.5">
                                                <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Subject</label>
                                                <Input
                                                    required
                                                    type="text"
                                                    placeholder="e.g. Lakers vs Celtics match result dispute..."
                                                    value={ticketSubject}
                                                    onChange={(e) => setTicketSubject(e.target.value)}
                                                    className="h-9 text-xs bg-background border-border"
                                                />
                                            </div>

                                            <div className="space-y-1.5">
                                                <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Description</label>
                                                <textarea
                                                    required
                                                    rows={4}
                                                    placeholder="Provide details, challenge ID, or transaction numbers..."
                                                    value={ticketDesc}
                                                    onChange={(e) => setTicketDesc(e.target.value)}
                                                    className="w-full rounded-md border border-border bg-background p-2.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                                                />
                                            </div>

                                            <div className="pt-2 flex justify-end gap-2">
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    onClick={() => setIsCreateTicketOpen(false)}
                                                    className="h-9 text-xs"
                                                >
                                                    Cancel
                                                </Button>
                                                <Button
                                                    type="submit"
                                                    className="h-9 text-xs font-semibold bg-primary text-primary-foreground hover:bg-primary/90"
                                                >
                                                    Submit Ticket
                                                </Button>
                                            </div>
                                        </>
                                    )}
                                </form>
                            </div>
                        </div>
                    )}
                </SidebarInset>
            </SidebarProvider>
            <BottomNavbar />
        </>
    )
}
