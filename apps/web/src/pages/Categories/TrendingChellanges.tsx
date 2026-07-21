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
    Sparkles,
} from "lucide-react"
import Header from "../Header/Header"
import { useAppSelector } from "@/store/hooks"
import { toast } from "sonner"


// Helper to resolve iconType string to a Lucide component
const iconComponentMap: Record<string, any> = {
    trophy: Trophy,
    dumbbell: Dumbbell,
    gamepad: Gamepad2,
    sparkles: Sparkles,
}

const categories = ["All", "Sports", "Physical", "Performance"]

export default function TrendingChellanges() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [selectedCategory, setSelectedCategory] = useState<string>("All")
    const [searchQuery, setSearchQuery] = useState("")

    const { isAuthenticated } = useAppSelector((state) => state.auth)
    const challenges = useAppSelector((state) => state.challenges.challenges)

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

    const filteredChallenges = challenges.filter((challenge) => {
        const matchesCategory =
            !selectedCategory || selectedCategory === "All" || challenge.category === selectedCategory
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
                    <Header title="CHALLENGES" loading={loading} />

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
                        <section className="flex gap-2 overflow-x-auto  -mx-4 px-4 snap-x [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                            {loading ? (
                                <>
                                    <Skeleton className="h-9 w-24  shrink-0" />
                                    <Skeleton className="h-9 w-28  shrink-0" />
                                    <Skeleton className="h-9 w-32  shrink-0" />
                                </>
                            ) : (
                                categories.map((cat) => (
                                    <Button
                                        key={cat}
                                        variant={selectedCategory === cat ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => setSelectedCategory(cat)}
                                        className={`rounded-sm px-3 py-1 text-xs font-medium transition-all duration-300 ease-in-out shrink-0 ${selectedCategory === cat
                                            ? "bg-primary text-primary-foreground shadow-sm scale-105"
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
                                                {(() => {
                                                    const IconComp = iconComponentMap[challenge.iconType] || Trophy
                                                    return <IconComp className="h-5 w-5" />
                                                })()}
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
