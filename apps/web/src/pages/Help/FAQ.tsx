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
import { Skeleton } from "@workspace/ui/components/skeleton"
import {
    ArrowLeft,
    Search,
    ChevronDown,
    ChevronUp,
    HelpCircle,
    Sparkles,
    AlertCircle,
    FileText,
    Ticket,
    ChevronRight,
} from "lucide-react"
import Header from "../Header/Header"

interface FAQItem {
    id: string
    category: "all" | "challenges" | "wallet" | "badges" | "account"
    categoryName: string
    question: string
    answer: string
}

const ANYBET_FAQS: FAQItem[] = [
    {
        id: "1",
        category: "challenges",
        categoryName: "Challenges & Bets",
        question: "How do AnyBet challenges and pot payouts work?",
        answer: "When you create or join a challenge (e.g. Lakers vs Celtics), your stake is safely held in the challenge pot. Once the match finishes, official sports API data automatically verifies the winner and credits the total pot to your wallet!"
    },
    {
        id: "2",
        category: "challenges",
        categoryName: "Challenges & Bets",
        question: "What happens if an opponent does not accept my challenge?",
        answer: "If your challenge remains open and is not joined before the event starts, your staked amount is 100% refunded back to your AnyBet wallet balance automatically."
    },
    {
        id: "3",
        category: "wallet",
        categoryName: "Wallet & Cashouts",
        question: "How do I deposit funds into my AnyBet wallet?",
        answer: "Go to Wallet > Deposit. Select Visa/Mastercard, UPI, or Crypto. Enter the amount and complete payment. Deposits land in your wallet balance in under 60 seconds with 0% processing fees."
    },
    {
        id: "4",
        category: "wallet",
        categoryName: "Wallet & Cashouts",
        question: "What is the minimum withdrawal limit and speed?",
        answer: "The minimum cashout limit is $10. Standard bank withdrawals take 15–30 minutes, while PRO users enjoy instant priority cashouts."
    },
    {
        id: "5",
        category: "badges",
        categoryName: "Badges & Leaderboard",
        question: "How do I earn badges like High Roller, Win Streak, or Champion?",
        answer: "Badges are unlocked automatically based on your gameplay achievements! High Roller is awarded for $1,000+ single bets, Win Streak for 5 consecutive challenge wins, and Champion for entering top leaderboard ranks."
    },
    {
        id: "6",
        category: "badges",
        categoryName: "Badges & Leaderboard",
        question: "How is my global Rank (e.g. #128) calculated?",
        answer: "Your rank is updated live based on Total Earned dollars, challenge win ratio, and active streak multipliers. You can inspect your rank directly on the Profile page."
    },
    {
        id: "7",
        category: "account",
        categoryName: "Account & Security",
        question: "How do I upgrade to a PRO Member badge?",
        answer: "Complete account KYC verification under Profile > Account Settings and maintain an active challenge history. PRO status gives instant cashouts and priority support."
    },
    {
        id: "8",
        category: "account",
        categoryName: "Account & Security",
        question: "Is my money and personal data safe on AnyBet?",
        answer: "Yes! AnyBet uses 256-bit SSL encryption, 2FA authentication, and holds funds in secure segregated accounts under strict regulatory standards."
    }
]

export default function FAQ() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedCategory, setSelectedCategory] = useState<string>("all")
    const [expandedFaq, setExpandedFaq] = useState<string | null>("1")

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false)
        }, 400)
        return () => clearTimeout(timer)
    }, [])

    const filteredFaqs = ANYBET_FAQS.filter(faq => {
        const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory
        const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesCategory && matchesSearch
    })

    const handleFaqClick = (e: React.MouseEvent, id: string) => {
        e.preventDefault()
        e.stopPropagation()
        setExpandedFaq(prev => prev === id ? null : id)
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
                    <Header title="FAQ" loading={loading} />

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
                                FAQ
                            </Badge>
                        </div>

                        {loading ? (
                            <div className="space-y-4">
                                <Skeleton className="h-12 w-full rounded-xl" />
                                <div className="flex gap-2 overflow-x-auto pb-1">
                                    <Skeleton className="h-8 w-20 rounded-full shrink-0" />
                                    <Skeleton className="h-8 w-24 rounded-full shrink-0" />
                                    <Skeleton className="h-8 w-28 rounded-full shrink-0" />
                                </div>
                                <Skeleton className="h-24 w-full rounded-xl" />
                                <Skeleton className="h-24 w-full rounded-xl" />
                            </div>
                        ) : (
                            <>
                                {/* Search Card */}
                                <Card>
                                    <CardContent className="p-4 space-y-3">
                                        <span className="text-xs font-semibold text-primary uppercase tracking-wider flex items-center gap-1.5">
                                            <Sparkles className="h-3.5 w-3.5" /> Search AnyBet Knowledge Base
                                        </span>
                                        <div className="relative">
                                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                type="text"
                                                placeholder="Search challenges, cashouts, badges, ranks..."
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                className="pl-9 bg-background/80 border-border/70 focus-visible:ring-primary h-10 text-xs shadow-inner"
                                            />
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Category Filter Chips */}
                                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                                    {[
                                        { id: "all", label: "All FAQs" },
                                        { id: "challenges", label: "Challenges" },
                                        { id: "wallet", label: "Wallet" },
                                        { id: "badges", label: "Badges & Ranks" },
                                        { id: "account", label: "Account" },
                                    ].map((cat) => (
                                        <Button
                                            key={cat.id}
                                            type="button"
                                            variant={selectedCategory === cat.id ? "default" : "outline"}
                                            size="sm"
                                            onClick={() => setSelectedCategory(cat.id)}
                                            className={`h-7 px-3 text-xs font-semibold rounded-full shrink-0 transition-all ${
                                                selectedCategory === cat.id
                                                    ? "bg-primary text-primary-foreground"
                                                    : "border-border/70 text-muted-foreground hover:text-foreground"
                                            }`}
                                        >
                                            {cat.label}
                                        </Button>
                                    ))}
                                </div>

                                {/* FAQ Accordion List */}
                                <div className="space-y-3">
                                    {filteredFaqs.length === 0 ? (
                                        <Card className="p-6 text-center space-y-3 border-dashed">
                                            <AlertCircle className="h-8 w-8 text-muted-foreground mx-auto" />
                                            <div>
                                                <p className="text-sm font-semibold text-foreground">No matching FAQ found</p>
                                                <p className="text-xs text-muted-foreground">Didn't find your answer? Reach out directly to AnyBet support.</p>
                                            </div>
                                            <Button size="sm" onClick={() => navigate("/help")} className="bg-primary text-primary-foreground text-xs">
                                                Go to Help & Support
                                            </Button>
                                        </Card>
                                    ) : (
                                        filteredFaqs.map((faq) => {
                                            const isOpen = expandedFaq === faq.id
                                            return (
                                                <Card
                                                    key={faq.id}
                                                    onClick={(e) => handleFaqClick(e, faq.id)}
                                                    className={`transition-all duration-200 cursor-pointer overflow-hidden ${
                                                        isOpen ? "border-primary/40 shadow-sm" : "border-border/60 hover:border-border"
                                                    }`}
                                                >
                                                    <CardContent className="p-3.5 space-y-2">
                                                        <div className="flex items-start justify-between gap-3">
                                                            <div className="flex items-start gap-2.5">
                                                                <HelpCircle className={`h-4 w-4 mt-0.5 shrink-0 ${isOpen ? "text-primary" : "text-muted-foreground"}`} />
                                                                <div>
                                                                    <span className="text-[9px] font-bold text-primary uppercase tracking-wider block mb-0.5">
                                                                        {faq.categoryName}
                                                                    </span>
                                                                    <span className="text-xs font-bold leading-snug text-foreground">
                                                                        {faq.question}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div className="text-muted-foreground p-0.5 shrink-0">
                                                                {isOpen ? <ChevronUp className="h-4 w-4 text-primary" /> : <ChevronDown className="h-4 w-4" />}
                                                            </div>
                                                        </div>

                                                        {isOpen && (
                                                            <div className="pt-2.5 border-t border-border/40 text-xs text-muted-foreground leading-relaxed pl-6 animate-in fade-in-50 duration-150">
                                                                {faq.answer}
                                                            </div>
                                                        )}
                                                    </CardContent>
                                                </Card>
                                            )
                                        })
                                    )}
                                </div>

                                {/* Still Need Help Banner */}
                                <Card className="bg-primary/5 border-primary/20 p-4">
                                    <div className="flex items-center justify-between gap-3">
                                        <div className="space-y-1">
                                            <h4 className="text-xs font-bold text-foreground flex items-center gap-1.5">
                                                <Ticket className="h-4 w-4 text-primary" /> Have a challenge dispute?
                                            </h4>
                                            <p className="text-[10px] text-muted-foreground">
                                                Raise a support ticket or chat with a live moderator.
                                            </p>
                                        </div>
                                        <Button
                                            size="sm"
                                            onClick={() => navigate("/help")}
                                            className="h-8 text-xs font-semibold bg-primary text-primary-foreground hover:bg-primary/90 shrink-0"
                                        >
                                            Support <ChevronRight className="h-3.5 w-3.5 ml-1" />
                                        </Button>
                                    </div>
                                </Card>
                            </>
                        )}
                    </main>
                </SidebarInset>
            </SidebarProvider>
            <BottomNavbar />
        </>
    )
}
