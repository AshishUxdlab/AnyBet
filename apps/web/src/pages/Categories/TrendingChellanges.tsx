import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { AppSidebar } from "@/components/app-sidebar"
import { BottomNavbar } from "@/components/bottom-navbar"
import {
    SidebarInset,
    SidebarProvider,
} from "@workspace/ui/components/sidebar"
import {
    Card,
    CardContent,
} from "@workspace/ui/components/card"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Skeleton } from "@workspace/ui/components/skeleton"
import { Avatar, AvatarFallback, AvatarImage } from "@workspace/ui/components/avatar"
import { Badge } from "@workspace/ui/components/badge"
import {
    Search,
    Plus,
    Trophy,
    Dumbbell,
    Gamepad2,
    ChevronRight,
    Flame,
} from "lucide-react"
import Header from "../Header/Header"
import { useAppSelector } from "@/store/hooks"
import { toast } from "sonner"

interface ChallengeItem {
    id: string
    title: string
    description: string
    category: "SPORTS" | "PHYSICAL" | "PERFORMANCE"
    potAmount: string
    timeLeft: string
    isLive?: boolean
    participantsCount: string
    icon: any
    iconBg: string
    iconColor: string
    avatars: string[]
}

const mockChallenges: ChallengeItem[] = [
    {
        id: "1",
        title: "Lakers vs Celtics Tonight",
        description: "Who will score more than 30 points in the final quarter?",
        category: "SPORTS",
        potAmount: "$2,450",
        timeLeft: "ENDS 02:45:18",
        isLive: true,
        participantsCount: "+12",
        icon: Trophy,
        iconBg: "bg-indigo-500/15",
        iconColor: "text-indigo-400",
        avatars: [
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
        ],
    },
    {
        id: "2",
        title: "Sub-40 5 Mile Run",
        description: "Can anyone complete 5 miles in under 40 minutes this weekend?",
        category: "PHYSICAL",
        potAmount: "$1,800",
        timeLeft: "LAST 24 HRS",
        isLive: false,
        participantsCount: "+8",
        icon: Dumbbell,
        iconBg: "bg-purple-500/15",
        iconColor: "text-purple-400",
        avatars: [
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=80",
        ],
    },
    {
        id: "3",
        title: "Valorant Ace Tournament",
        description: "Achieve a full team wipe (5K Ace) in a single competitive round.",
        category: "PERFORMANCE",
        potAmount: "$3,200",
        timeLeft: "ENDS 05:10:00",
        isLive: true,
        participantsCount: "+24",
        icon: Gamepad2,
        iconBg: "bg-pink-500/15",
        iconColor: "text-pink-400",
        avatars: [
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80",
        ],
    },
    {
        id: "4",
        title: "Miami F1 Pole Position",
        description: "Predict the driver who secures pole position in qualifying.",
        category: "SPORTS",
        potAmount: "$950",
        timeLeft: "ENDS 12:00:00",
        isLive: false,
        participantsCount: "+5",
        icon: Trophy,
        iconBg: "bg-amber-500/15",
        iconColor: "text-amber-400",
        avatars: [
            "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=80",
        ],
    },
]

const categories = ["SPORTS", "PHYSICAL", "PERFORMANCE"]

export default function TrendingChellanges() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [selectedCategory, setSelectedCategory] = useState<string>("SPORTS")
    const [searchQuery, setSearchQuery] = useState("")

    const { isAuthenticated } = useAppSelector((state) => state.auth)

    const handleCreateClick = () => {
        if (isAuthenticated) {
            navigate("/challenges/create")
        } else {
            toast.info("Please login first to create a challenge.")
            navigate("/login")
        }
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false)
        }, 1500)
        return () => clearTimeout(timer)
    }, [])

    const filteredChallenges = mockChallenges.filter((challenge) => {
        const matchesCategory =
            !selectedCategory || challenge.category === selectedCategory
        const matchesSearch =
            challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            challenge.description.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesCategory && matchesSearch
    })

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
                    <Header loading={loading} />

                    <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-6 space-y-5 pb-24 max-w-md md:max-w-2xl mx-auto w-full">
                        {/* Search Input Section */}
                        <section className="relative">
                            {loading ? (
                                <Skeleton className="h-11 w-full rounded-xl" />
                            ) : (
                                <div className="relative">
                                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        type="text"
                                        placeholder="Search challenges, events, or players..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="pl-10 "
                                    />
                                </div>
                            )}
                        </section>

                        {/* Category Filter Pills */}
                        <section className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 snap-x [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                            {loading ? (
                                <>
                                    <Skeleton className="h-9 w-24 rounded-full shrink-0" />
                                    <Skeleton className="h-9 w-28 rounded-full shrink-0" />
                                    <Skeleton className="h-9 w-32 rounded-full shrink-0" />
                                </>
                            ) : (
                                categories.map((cat) => (
                                    <Button
                                        key={cat}
                                        variant={selectedCategory === cat ? "default" : "outline"}
                                        size="sm"
                                        onClick={() =>
                                            setSelectedCategory(selectedCategory === cat ? "" : cat)
                                        }
                                        className={`rounded-sm px-2 text-xs font-semibold uppercase tracking-wider transition-all shrink-0 ${selectedCategory === cat
                                            ? "bg-primary text-primary-foreground shadow-sm"
                                            : "bg-muted/50 border-transparent text-muted-foreground hover:bg-muted hover:text-foreground"
                                            }`}
                                    >
                                        {cat}
                                    </Button>
                                ))
                            )}
                        </section>

                        {/* Section Header: Title & Live Badge */}
                        <section className="flex items-center justify-between pt-1">
                            {loading ? (
                                <>
                                    <Skeleton className="h-8 w-44" />
                                    <Skeleton className="h-6 w-20 rounded-full" />
                                </>
                            ) : (
                                <>
                                    <div>
                                        <h1 className="text-xl font-bold tracking-tight text-foreground flex items-center ">
                                            Trending
                                        </h1>
                                        <h2 className="text-xl font-bold tracking-tight text-primary">
                                            Challenges
                                        </h2>
                                    </div>
                                    <div className="flex items-center gap-1.5 bg-primary/10 border border-primary/20 text-primary text-xs font-bold px-3 py-1 rounded-full">
                                        <span className="relative flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                                        </span>
                                        <span>4.2K LIVE</span>
                                    </div>
                                </>
                            )}
                        </section>

                        {/* Challenge Cards List */}
                        <section className="space-y-4">
                            {loading ? (
                                <>
                                    <Card className="w-full  space-y-1">
                                        <div className="flex justify-between items-center">
                                            <Skeleton className="h-10 w-10 " />
                                            <Skeleton className="h-5 w-24 " />
                                        </div>
                                        <Skeleton className="h-6 w-3/4" />
                                        <Skeleton className="h-4 w-full" />
                                        <div className="flex justify-between items-center pt-2">
                                            <div className="flex gap-1 items-center">
                                                <Skeleton className="h-7 w-7" />
                                                <Skeleton className="h-7 w-7 " />
                                                <Skeleton className="h-5 w-10 " />
                                            </div>
                                            <Skeleton className="h-6 w-20" />
                                        </div>
                                    </Card>

                                    <Card className="w-full  space-y-1">
                                        <div className="flex justify-between items-center">
                                            <Skeleton className="h-10 w-10 " />
                                            <Skeleton className="h-5 w-24 " />
                                        </div>
                                        <Skeleton className="h-6 w-3/4" />
                                        <Skeleton className="h-4 w-full" />
                                        <div className="flex justify-between items-center pt-2">
                                            <div className="flex gap-1 items-center">
                                                <Skeleton className="h-7 w-7 " />
                                                <Skeleton className="h-7 w-7 " />
                                                <Skeleton className="h-5 w-10 " />
                                            </div>
                                            <Skeleton className="h-6 w-20" />
                                        </div>
                                    </Card>

                                    <Card className="w-full p-4 space-y-1">
                                        <div className="flex justify-between items-center">
                                            <Skeleton className="h-10 w-10 " />
                                            <Skeleton className="h-5 w-24 " />
                                        </div>
                                        <Skeleton className="h-6 w-3/4" />
                                        <Skeleton className="h-4 w-full" />
                                        <div className="flex justify-between items-center pt-2">
                                            <div className="flex gap-1 items-center">
                                                <Skeleton className="h-7 w-7 " />
                                                <Skeleton className="h-7 w-7 " />
                                                <Skeleton className="h-5 w-10 " />
                                            </div>
                                            <Skeleton className="h-6 w-20" />
                                        </div>
                                    </Card>
                                </>
                            ) : filteredChallenges.length === 0 ? (
                                <div className="text-center py-10 space-y-2">
                                    <Flame className="h-8 w-8 text-muted-foreground mx-auto" />
                                    <p className="text-sm text-muted-foreground font-medium">
                                        No challenges found matching your filters.
                                    </p>
                                </div>
                            ) : (
                                filteredChallenges.map((challenge) => (
                                    <Card
                                        key={challenge.id}
                                        onClick={handleCreateClick}
                                        className="w-full transition-all duration-300 border border-border/60 shadow-sm hover:shadow-md overflow-hidden cursor-pointer hover:border-primary/50 group"
                                    >
                                        <CardContent className="  space-y-1">
                                            {/* Top Header Row */}
                                            <div className="flex items-center justify-between">
                                                <div
                                                    className={`h-10 w-10 rounded-xl ${challenge.iconBg} ${challenge.iconColor} flex items-center justify-center transition-transform group-hover:scale-105`}
                                                >
                                                    <challenge.icon className="h-5 w-5" />
                                                </div>
                                                <Badge
                                                    variant="secondary"
                                                    className="bg-muted/80 text-muted-foreground text-[10px] tracking-wider uppercase font-semibold px-2.5 py-1 "
                                                >
                                                    {challenge.timeLeft}
                                                </Badge>
                                            </div>

                                            {/* Content Section */}
                                            <div className="space-y-1">
                                                <h3 className="text-sm font-bold tracking-tight text-foreground group-hover:text-primary transition-colors flex items-center justify-between">
                                                    {challenge.title}
                                                    <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                                                </h3>
                                                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                                                    {challenge.description}
                                                </p>
                                            </div>

                                            {/* Bottom Footer Row */}
                                            <div className="flex items-center justify-between pt-1 border-t border-border/40">
                                                <div className="flex items-center">
                                                    <div className="flex -space-x-2">
                                                        {challenge.avatars.map((img, idx) => (
                                                            <Avatar
                                                                key={idx}
                                                                className="h-7 w-7 border-2 border-background"
                                                            >
                                                                <AvatarImage src={img} alt="User avatar" />
                                                                <AvatarFallback>U{idx + 1}</AvatarFallback>
                                                            </Avatar>
                                                        ))}
                                                    </div>
                                                    <span className="ml-2 text-xs font-semibold text-muted-foreground bg-muted/80 px-2 py-0.5 rounded-full">
                                                        {challenge.participantsCount}
                                                    </span>
                                                </div>

                                                <div className="text-right">
                                                    <div className="text-lg font-semibold text-foreground tracking-tight">
                                                        {challenge.potAmount}
                                                    </div>
                                                    <div className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">
                                                        TOTAL POT
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))
                            )}
                        </section>
                    </main>

                    {/* Floating Action Button (FAB) */}
                    {!loading && (
                        <Button
                            size="icon"
                            onClick={handleCreateClick}
                            className="fixed bottom-24 right-6 h-12 w-12 rounded-full shadow-lg bg-primary text-primary-foreground hover:bg-primary/90 z-40 transition-transform active:scale-95"
                        >
                            <Plus className="h-6 w-6" />
                        </Button>
                    )}
                </SidebarInset>
            </SidebarProvider>
            <BottomNavbar />
        </>
    )
}
