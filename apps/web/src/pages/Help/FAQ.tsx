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
    Ticket,
    ChevronRight,
    FileText,
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
                    <Header title="FAQ" loading={loading} showBackButton={true} />

                    <main className="flex-1 overflow-auto p-4 md:p-6 space-y-4 pb-24 max-w-md mx-auto w-full">
                        {loading ? (
                            <div className="space-y-4 pt-2">
                                <Skeleton className="h-28 w-full rounded-xl" />
                                <div className="flex gap-2 overflow-x-auto pb-1">
                                    <Skeleton className="h-8 w-20 rounded-full shrink-0" />
                                    <Skeleton className="h-8 w-24 rounded-full shrink-0" />
                                    <Skeleton className="h-8 w-28 rounded-full shrink-0" />
                                </div>
                                <Skeleton className="h-40 w-full rounded-xl" />
                            </div>
                        ) : (
                            <>
                                {/* Hero Knowledge Base Card */}
                                <Card className="w-full">
                                    <CardContent className="p-4 space-y-3">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                                                <FileText className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <h2 className="text-base font-bold text-foreground">AnyBet Knowledge Base</h2>
                                                <p className="text-xs text-muted-foreground mt-0.5">Find instant answers to betting, wallet & challenge rules.</p>
                                            </div>
                                        </div>

                                        {/* Embedded Search Input */}
                                        <div className="relative pt-1">
                                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                type="text"
                                                placeholder="Search questions, challenges, deposits..."
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                className="pl-9 h-9 text-xs bg-background/80 border-border/70 focus-visible:ring-primary"
                                            />
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Category Filter Chips */}
                                <div className="flex items-center gap-2 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                                    {[
                                        { id: "all", label: "All Topics" },
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
                                            className={`h-8 px-3.5 text-xs font-semibold rounded-full shrink-0 transition-all ${
                                                selectedCategory === cat.id
                                                    ? "bg-primary text-primary-foreground shadow-sm"
                                                    : "border-border/80 text-muted-foreground hover:text-foreground"
                                            }`}
                                        >
                                            {cat.label}
                                        </Button>
                                    ))}
                                </div>

                                {/* FAQ Accordion List */}
                                <div className="space-y-3">
                                    <h3 className="text-sm font-bold uppercase tracking-wide">Frequently Asked Questions</h3>

                                    {filteredFaqs.length === 0 ? (
                                        <Card className="p-6 text-center space-y-3 border-dashed">
                                            <AlertCircle className="h-8 w-8 text-muted-foreground mx-auto" />
                                            <div>
                                                <p className="text-xs font-semibold text-foreground">No matching FAQ found</p>
                                                <p className="text-[11px] text-muted-foreground mt-0.5">Didn't find your answer? Reach out directly to AnyBet support.</p>
                                            </div>
                                            <Button size="sm" onClick={() => navigate("/help")} className="bg-primary text-primary-foreground text-xs font-bold h-9 uppercase">
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
                                                    className="cursor-pointer hover:border-primary/40 transition-all"
                                                >
                                                    <CardContent className="p-4 space-y-2">
                                                        <div className="flex items-start justify-between gap-3">
                                                            <div>
                                                                <div className="text-[10px] uppercase font-semibold text-muted-foreground font-mono">{faq.categoryName}</div>
                                                                <div className="text-sm font-semibold text-foreground mt-0.5">{faq.question}</div>
                                                            </div>
                                                            <div className="text-muted-foreground shrink-0 pt-0.5">
                                                                {isOpen ? <ChevronUp className="h-4 w-4 text-primary" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
                                                            </div>
                                                        </div>

                                                        {isOpen && (
                                                            <div className="pt-2.5 border-t border-border/40 text-xs text-muted-foreground leading-relaxed animate-in fade-in duration-150">
                                                                {faq.answer}
                                                            </div>
                                                        )}
                                                    </CardContent>
                                                </Card>
                                            )
                                        })
                                    )}
                                </div>

                                {/* Fair Play / Need Assistance Info Card */}
                                <Card className="bg-secondary/30 border-none p-4">
                                    <div className="flex items-center justify-between gap-3">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-foreground">
                                                <Ticket className="h-4 w-4 text-primary" /> Still need assistance?
                                            </div>
                                            <p className="text-xs text-muted-foreground leading-relaxed">
                                                Raise a support ticket or live chat with moderators 24/7.
                                            </p>
                                        </div>
                                        <Button
                                            size="sm"
                                            onClick={() => navigate("/help")}
                                            className="h-9 text-xs font-bold uppercase tracking-wide bg-primary text-primary-foreground hover:bg-primary/90 shrink-0 shadow-sm"
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
