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
    ChevronDown,
    ChevronUp,
    Headphones,
} from "lucide-react"
import Header from "../Header/Header"
import { auth, db } from "@/Firebase/firebase"
import {
    collection,
    addDoc,
    doc,
    updateDoc,
    onSnapshot,
    query,
    orderBy,
    arrayUnion,
    serverTimestamp
} from "firebase/firestore"

interface TicketItem {
    id: string
    ticketCode?: string
    subject: string
    category: string
    status: "Open" | "In Review" | "Resolved"
    date: string
    lastUpdate: string
    description?: string
    messages?: Array<{ sender: "user" | "mod"; text: string; time: string }>
}

export default function HelpSupport() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)

    // Modals state
    const [isLiveChatOpen, setIsLiveChatOpen] = useState(false)
    const [isCreateTicketOpen, setIsCreateTicketOpen] = useState(false)
    const [viewingTicket, setViewingTicket] = useState<TicketItem | null>(null)
    const [expandedTicketId, setExpandedTicketId] = useState<string | null>(null)
    const [replyInputMap, setReplyInputMap] = useState<Record<string, string>>({})

    // Chat messages state
    const [chatMessages, setChatMessages] = useState<Array<{ sender: "bot" | "user"; text: string; time: string }>>([
        { sender: "bot", text: "Welcome to AnyBet Support! How can we help you with your challenges, wallet, or account today?", time: "Just now" }
    ])
    const [inputMessage, setInputMessage] = useState("")
    const [isTyping, setIsTyping] = useState(false)

    // Tickets state synced with Firebase
    const [tickets, setTickets] = useState<TicketItem[]>([])

    // Ticket form state
    const [ticketCategory, setTicketCategory] = useState("Challenge & Bet Disputes")
    const [ticketSubject, setTicketSubject] = useState("")
    const [ticketDesc, setTicketDesc] = useState("")
    const [ticketCreatedSuccess, setTicketCreatedSuccess] = useState(false)

    // Real-time Firebase Firestore Sync
    useEffect(() => {
        try {
            const colRef = collection(db, "support_tickets")
            const unsubscribe = onSnapshot(colRef, (snapshot) => {
                const fetchedTickets: (TicketItem & { rawTime: number })[] = snapshot.docs.map(docSnap => {
                    const data = docSnap.data()
                    let dateStr = "Just Now"
                    let rawTime = Date.now()

                    if (data.createdAt) {
                        if (typeof data.createdAt === "number") {
                            rawTime = data.createdAt
                            dateStr = new Date(data.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
                        } else if (data.createdAt.toDate) {
                            const dateObj = data.createdAt.toDate()
                            rawTime = dateObj.getTime()
                            dateStr = dateObj.toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
                        }
                    }

                    return {
                        id: docSnap.id,
                        ticketCode: data.ticketCode || docSnap.id.substring(0, 8).toUpperCase(),
                        subject: data.subject || "",
                        category: data.category || "General",
                        status: data.status || "Open",
                        date: dateStr,
                        lastUpdate: data.lastUpdate || "Submitted to moderation team",
                        description: data.description || "",
                        messages: data.messages || [],
                        rawTime
                    }
                })

                // Sort newest first
                fetchedTickets.sort((a, b) => b.rawTime - a.rawTime)

                if (fetchedTickets.length > 0) {
                    setTickets(fetchedTickets)
                }
                setLoading(false)
            }, (error) => {
                console.warn("Firebase tickets subscription info:", error)
                setLoading(false)
            })

            return () => unsubscribe()
        } catch (err) {
            console.error("Firestore initialization error:", err)
            setLoading(false)
        }
    }, [])

    const handleSendMessage = () => {
        if (!inputMessage.trim()) return

        const userMsg = inputMessage
        setChatMessages(prev => [...prev, { sender: "user", text: userMsg, time: "Just now" }])
        setInputMessage("")
        setIsTyping(true)

        setTimeout(() => {
            setIsTyping(false)
            let botReply = "Thanks for reaching out! Our team is reviewing your query."
            const lower = userMsg.toLowerCase()
            if (lower.includes("deposit") || lower.includes("wallet")) {
                botReply = "For deposit issues, please allow up to 5 minutes for payment processing. If delayed, click 'Raise Ticket' below."
            } else if (lower.includes("challenge") || lower.includes("win")) {
                botReply = "Challenge settlements are processed automatically upon official match stats verification."
            }

            setChatMessages(prev => [...prev, { sender: "bot", text: botReply, time: "Just now" }])
        }, 1200)
    }

    const handleCreateTicketSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!ticketSubject.trim() || !ticketDesc.trim()) return

        const currentTimeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        const ticketCode = `TICK-${Math.floor(1000 + Math.random() * 9000)}`
        const initialMessages: Array<{ sender: "user" | "mod"; text: string; time: string }> = []

        const tempId = `TICK-${Date.now()}`
        const newTicketItem: TicketItem = {
            id: tempId,
            ticketCode,
            subject: ticketSubject,
            category: ticketCategory,
            status: "Open",
            date: "Just Now",
            lastUpdate: "Ticket submitted to moderation team",
            description: ticketDesc,
            messages: initialMessages
        }

        // 1. Optimistic instant UI update
        setTickets(prev => [newTicketItem, ...prev])
        setExpandedTicketId(tempId)
        setTicketCreatedSuccess(true)

        // Reset modal form
        setTimeout(() => {
            setTicketCreatedSuccess(false)
            setIsCreateTicketOpen(false)
            setTicketSubject("")
            setTicketDesc("")
        }, 1200)

        // 2. Persist in Firebase Firestore
        const newTicketPayload = {
            ticketCode,
            subject: ticketSubject,
            category: ticketCategory,
            status: "Open",
            lastUpdate: "Ticket submitted to moderation team",
            description: ticketDesc,
            messages: initialMessages,
            userId: auth.currentUser?.uid || "guest_user",
            userEmail: auth.currentUser?.email || "anonymous@anybet.com",
            createdAt: Date.now()
        }

        try {
            await addDoc(collection(db, "support_tickets"), newTicketPayload)
        } catch (err) {
            console.error("Firebase save ticket error:", err)
        }
    }

    const handleAddInlineReply = async (ticketId: string) => {
        const text = replyInputMap[ticketId]?.trim()
        if (!text) return

        const currentTimeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        const newMsg = { sender: "user" as const, text, time: currentTimeStr }

        try {
            const ticketRef = doc(db, "support_tickets", ticketId)
            await updateDoc(ticketRef, {
                lastUpdate: "Follow-up added by user",
                messages: arrayUnion(newMsg)
            })
            setReplyInputMap(prev => ({ ...prev, [ticketId]: "" }))
        } catch (err) {
            console.error("Firebase update reply error:", err)
            // Local fallback
            setTickets(prev => prev.map(t => {
                if (t.id === ticketId) {
                    return {
                        ...t,
                        lastUpdate: "Follow-up added by user",
                        messages: [...(t.messages || []), newMsg]
                    }
                }
                return t
            }))
            setReplyInputMap(prev => ({ ...prev, [ticketId]: "" }))
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
                <SidebarInset className="bg-background animate-in fade-in duration-500 ease-in-out min-h-screen flex flex-col">
                    <Header loading={loading} showBackButton={true} title="SUPPORT" />

                    <main className="flex-1 overflow-auto p-4 md:p-6 space-y-4 pb-24 max-w-md mx-auto w-full">
                        {loading ? (
                            <div className="space-y-4 pt-2">
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
                                {/* Hero Support Card */}
                                <Card className="w-full">
                                    <CardContent className="p-4 space-y-4">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                                                <Headphones className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <h2 className="text-base font-bold text-foreground">AnyBet Support Hub</h2>
                                                <p className="text-xs text-muted-foreground mt-0.5">Dispute a challenge or need wallet help? We're active 24/7.</p>
                                            </div>
                                        </div>

                                        <Button
                                            onClick={() => setIsCreateTicketOpen(true)}
                                            className="w-full h-10 font-bold uppercase tracking-wide bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm"
                                        >
                                            <PlusCircle className="h-4 w-4 mr-1.5" /> Raise Support Ticket
                                        </Button>
                                    </CardContent>
                                </Card>



                                {/* Support Tickets Section */}
                                <div className="space-y-3 pt-1">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-sm font-bold uppercase tracking-wide">My Support Tickets</h3>
                                        <Button size="sm" variant="link" onClick={() => setIsCreateTicketOpen(true)} className="h-auto p-0 text-xs font-semibold text-primary">
                                            + NEW TICKET
                                        </Button>
                                    </div>

                                    {tickets.length === 0 ? (
                                        <Card className="p-6 text-center space-y-2 border-dashed">
                                            <Ticket className="h-8 w-8 text-muted-foreground mx-auto" />
                                            <p className="text-xs text-muted-foreground">You have no open support tickets.</p>
                                        </Card>
                                    ) : (
                                        tickets.map((t) => (
                                            <Card key={t.id} onClick={() => setViewingTicket(t)} className="cursor-pointer hover:border-primary/40 transition-all">
                                                <CardContent className="p-4 space-y-2.5">
                                                    <div className="flex items-start justify-between gap-2">
                                                        <div>
                                                            <div className="text-[10px] uppercase font-semibold text-muted-foreground font-mono">
                                                                {t.ticketCode || t.id} • {t.category}
                                                            </div>
                                                            <div className="text-sm font-semibold text-foreground mt-0.5">{t.subject}</div>
                                                        </div>
                                                        <Badge
                                                            variant="outline"
                                                            className={`text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider shrink-0 ${
                                                                t.status === "Resolved"
                                                                    ? "bg-primary/10 text-primary border-primary/30"
                                                                    : "bg-secondary text-muted-foreground border-border"
                                                            }`}
                                                        >
                                                            {t.status}
                                                        </Badge>
                                                    </div>

                                                    <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-border/40">
                                                        <span className="flex items-center gap-1 text-[10px] uppercase">
                                                            <Clock className="h-3 w-3" /> {t.date}
                                                        </span>
                                                        <span className="text-[10px] uppercase font-medium text-foreground">{t.lastUpdate}</span>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))
                                    )}
                                </div>
                            </>
                        )}
                    </main>

                    {/* LIVE CHAT MODAL */}
                    {isLiveChatOpen && (
                        <div className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex justify-center items-center p-4">
                            <div className="w-full max-w-md bg-card border border-border rounded-2xl shadow-2xl flex flex-col h-[75vh] max-h-[550px] animate-in zoom-in-95 duration-200 overflow-hidden">
                                <div className="p-3.5 border-b border-border bg-card flex items-center justify-between rounded-t-2xl">
                                    <div className="flex items-center gap-2.5">
                                        <div className="relative">
                                            <Avatar className="h-9 w-9 border border-primary/30">
                                                <AvatarImage src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80" />
                                                <AvatarFallback><Bot className="h-5 w-5 text-primary" /></AvatarFallback>
                                            </Avatar>
                                            <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-primary ring-2 ring-card" />
                                        </div>
                                        <div>
                                            <h3 className="text-xs font-bold text-foreground flex items-center gap-1">
                                                Sarah <Badge variant="secondary" className="text-[8px] py-0 px-1 font-semibold">AnyBet Bot</Badge>
                                            </h3>
                                            <p className="text-[9px] text-primary font-medium">Online | Typical reply ~ instant</p>
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

                                <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-muted/10">
                                    {chatMessages.map((msg, idx) => (
                                        <div
                                            key={idx}
                                            className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
                                        >
                                            <div
                                                className={`max-w-[80%] rounded-2xl px-3.5 py-2 text-xs leading-relaxed shadow-sm ${
                                                    msg.sender === "user"
                                                        ? "bg-primary text-primary-foreground rounded-br-none font-medium"
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

                                <div className="p-3 border-t border-border bg-card flex items-center gap-2 rounded-b-2xl shrink-0">
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
                        <div className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex justify-center items-center p-4">
                            <div className="w-full max-w-md bg-card border border-border rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                                <div className="p-4 border-b border-border flex items-center justify-between bg-muted/30">
                                    <div className="flex items-center gap-2">
                                        <Ticket className="h-4 w-4 text-primary" />
                                        <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">Raise Support Ticket</h3>
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
                                            <div className="h-12 w-12 rounded-full bg-primary/10 text-primary mx-auto flex items-center justify-center border border-primary/20">
                                                <CheckCircle2 className="h-6 w-6" />
                                            </div>
                                            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">Ticket Submitted!</h4>
                                            <p className="text-xs text-muted-foreground">AnyBet sports moderators will inspect your ticket shortly.</p>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="space-y-1.5">
                                                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Category</label>
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
                                                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Subject</label>
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
                                                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Description</label>
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
                                                    className="h-9 text-xs font-semibold"
                                                >
                                                    Cancel
                                                </Button>
                                                <Button
                                                    type="submit"
                                                    className="h-9 text-xs font-bold uppercase tracking-wider bg-primary text-primary-foreground hover:bg-primary/90"
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

                    {/* CLEAN TICKET SUMMARY DETAILS MODAL */}
                    {viewingTicket && (
                        <div className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex justify-center items-center p-4">
                            <div className="w-full max-w-md bg-card border border-border rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                                <div className="p-4 border-b border-border flex items-center justify-between bg-muted/30">
                                    <div className="flex items-center gap-2">
                                        <Ticket className="h-4 w-4 text-primary" />
                                        <div>
                                            <div className="text-[10px] font-mono font-semibold text-muted-foreground">{viewingTicket.ticketCode || viewingTicket.id}</div>
                                            <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">Support Ticket Details</h3>
                                        </div>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => setViewingTicket(null)}
                                        className="h-8 w-8 rounded-full"
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>

                                <div className="p-4 space-y-4">
                                    <div className="flex items-center justify-between p-3 rounded-xl bg-secondary/30 border border-border/50">
                                        <span className="text-xs font-semibold text-muted-foreground uppercase">Ticket Status</span>
                                        <Badge
                                            variant="outline"
                                            className={`text-[10px] font-bold px-2.5 py-0.5 uppercase tracking-wider ${
                                                viewingTicket.status === "Resolved"
                                                    ? "bg-primary/10 text-primary border-primary/30"
                                                    : "bg-secondary text-muted-foreground border-border"
                                            }`}
                                        >
                                            {viewingTicket.status}
                                        </Badge>
                                    </div>

                                    <div className="space-y-3 text-xs">
                                        <div className="flex justify-between py-1.5 border-b border-border/40">
                                            <span className="text-muted-foreground uppercase font-semibold text-[10px]">Category</span>
                                            <span className="font-semibold text-foreground">{viewingTicket.category}</span>
                                        </div>

                                        <div className="flex justify-between py-1.5 border-b border-border/40">
                                            <span className="text-muted-foreground uppercase font-semibold text-[10px]">Subject</span>
                                            <span className="font-semibold text-foreground text-right max-w-[200px]">{viewingTicket.subject}</span>
                                        </div>

                                        <div className="flex justify-between py-1.5 border-b border-border/40">
                                            <span className="text-muted-foreground uppercase font-semibold text-[10px]">Submitted Date</span>
                                            <span className="font-mono text-muted-foreground">{viewingTicket.date}</span>
                                        </div>

                                        <div className="flex justify-between py-1.5 border-b border-border/40">
                                            <span className="text-muted-foreground uppercase font-semibold text-[10px]">Last Status Update</span>
                                            <span className="font-semibold text-foreground text-right">{viewingTicket.lastUpdate}</span>
                                        </div>

                                        <div className="space-y-1.5 pt-2">
                                            <span className="text-muted-foreground uppercase font-bold text-[10px] block">Issue Description</span>
                                            <div className="p-3 rounded-xl bg-background border border-border/60 text-foreground text-xs leading-relaxed">
                                                {viewingTicket.description || viewingTicket.subject}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-2 flex justify-end">
                                        <Button
                                            onClick={() => setViewingTicket(null)}
                                            className="w-full h-9 text-xs font-bold uppercase tracking-wider bg-primary text-primary-foreground hover:bg-primary/90"
                                        >
                                            Close Details
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </SidebarInset>
            </SidebarProvider>
            <BottomNavbar />
        </>
    )
}
