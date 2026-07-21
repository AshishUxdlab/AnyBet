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
import { Badge } from "@workspace/ui/components/badge"
import {
    Trophy,
    Dumbbell,
    TrendingUp,
    Sparkles,
    CheckCircle2,
    Circle,
    ArrowLeft,
    ArrowRight,
    Clock,
    ShieldCheck,
    Bot,
    Users,
    DollarSign,
} from "lucide-react"
import Header from "../Header/Header"

import { useAppSelector, useAppDispatch } from "@/store/hooks"
import { addChallenge } from "@/store/slices/challengeSlice"
import { db } from "@/Firebase/firebase"
import { collection, addDoc, doc, updateDoc, increment } from "firebase/firestore"
import { toast } from "sonner"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@workspace/ui/components/sheet"
import { LoginForm } from "@/components/login-form"

export default function Category() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)

    // Redux auth state
    const { isAuthenticated, uid, coins } = useAppSelector((state) => state.auth)
    const [showLoginSheet, setShowLoginSheet] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    // Stepper state: 1 = Details, 2 = Rules, 3 = Stake, 4 = Review
    const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1)

    const dispatch = useAppDispatch()

    // Form states
    const [selectedCategory, setSelectedCategory] = useState("")
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [duration, setDuration] = useState("")
    const [customHours, setCustomHours] = useState("")
    const [customMinutes, setCustomMinutes] = useState("")
    const [customSeconds, setCustomSeconds] = useState("")
    const [customMs, setCustomMs] = useState("")
    const [verification, setVerification] = useState("")
    const [stakeAmount, setStakeAmount] = useState("")
    const [maxPlayers, setMaxPlayers] = useState("")

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
                <SidebarInset className="bg-background animate-in fade-in duration-500 ease-in-out w-full overflow-x-hidden">
                    <Header loading={loading} showBackButton={true} />

                    <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-6 space-y-6 pb-44 max-w-md mx-auto w-full">
                        {/* Stepper Header */}
                        {loading ? (
                            <div className="flex items-center justify-center space-x-2 md:space-x-4 mb-2">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="flex items-center space-x-2">
                                        <div className="flex flex-col items-center gap-1">
                                            <Skeleton className="h-10 w-10 rounded-full" />
                                            <Skeleton className="h-3 w-10" />
                                        </div>
                                        {i < 4 && <Skeleton className="h-px w-12 mb-4" />}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex items-center justify-center space-x-2 md:space-x-4 mb-2">
                                {/* Step 1 */}
                                <div
                                    onClick={() => currentStep > 1 && setCurrentStep(1)}
                                    className={`flex flex-col items-center gap-1 ${currentStep > 1 ? "cursor-pointer" : ""
                                        }`}
                                >
                                    <div
                                        className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition-all ${currentStep >= 1
                                            ? "bg-primary text-primary-foreground"
                                            : "bg-muted text-muted-foreground"
                                            }`}
                                    >
                                        {currentStep > 1 ? <CheckCircle2 className="h-5 w-5" /> : 1}
                                    </div>
                                    <span
                                        className={`text-xs  ${currentStep >= 1
                                            ? "text-primary"
                                            : "text-muted-foreground"
                                            }`}
                                    >
                                        Details
                                    </span>
                                </div>
                                <div
                                    className={`h-px w-12 mb-5 transition-colors ${currentStep > 1 ? "bg-primary" : "bg-border"
                                        }`}
                                ></div>

                                {/* Step 2 */}
                                <div
                                    onClick={() => currentStep > 2 && setCurrentStep(2)}
                                    className={`flex flex-col items-center gap-1 ${currentStep > 2 ? "cursor-pointer" : ""
                                        }`}
                                >
                                    <div
                                        className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition-all ${currentStep >= 2
                                            ? "bg-primary text-primary-foreground"
                                            : "bg-muted text-muted-foreground"
                                            }`}
                                    >
                                        {currentStep > 2 ? <CheckCircle2 className="h-5 w-5" /> : 2}
                                    </div>
                                    <span
                                        className={`text-xs font-semibold ${currentStep >= 2
                                            ? "text-primary"
                                            : "text-muted-foreground"
                                            }`}
                                    >
                                        Rules
                                    </span>
                                </div>
                                <div
                                    className={`h-px w-12 mb-5 transition-colors ${currentStep > 2 ? "bg-primary" : "bg-border"
                                        }`}
                                ></div>

                                {/* Step 3 */}
                                <div
                                    onClick={() => currentStep > 3 && setCurrentStep(3)}
                                    className={`flex flex-col items-center gap-1 ${currentStep > 3 ? "cursor-pointer" : ""
                                        }`}
                                >
                                    <div
                                        className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition-all ${currentStep >= 3
                                            ? "bg-primary text-primary-foreground"
                                            : "bg-muted text-muted-foreground"
                                            }`}
                                    >
                                        {currentStep > 3 ? <CheckCircle2 className="h-5 w-5" /> : 3}
                                    </div>
                                    <span
                                        className={`text-xs font-semibold ${currentStep >= 3
                                            ? "text-primary"
                                            : "text-muted-foreground"
                                            }`}
                                    >
                                        Stake
                                    </span>
                                </div>
                                <div
                                    className={`h-px w-12 mb-5 transition-colors ${currentStep > 3 ? "bg-primary" : "bg-border"
                                        }`}
                                ></div>

                                {/* Step 4 */}
                                <div className="flex flex-col items-center gap-1">
                                    <div
                                        className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition-all ${currentStep === 4
                                            ? "bg-primary text-primary-foreground"
                                            : "bg-muted text-muted-foreground"
                                            }`}
                                    >
                                        4
                                    </div>
                                    <span
                                        className={`text-xs font-semibold ${currentStep === 4
                                            ? "text-primary"
                                            : "text-muted-foreground"
                                            }`}
                                    >
                                        Review
                                    </span>
                                </div>
                            </div>
                        )}

                        {/* Section Header Title & Subtitle */}
                        <section className="space-y-1">
                            {loading ? (
                                <div className="space-y-2">
                                    <Skeleton className="h-8 w-48" />
                                    <Skeleton className="h-4 w-full max-w-sm" />
                                </div>
                            ) : (
                                <>
                                    <h2 className="text-2xl font-semibold tracking-tight">
                                        {currentStep === 1 && "Create Challenge"}
                                        {currentStep === 2 && "Define Rules & Terms"}
                                        {currentStep === 3 && "Set Your Wager Stake"}
                                        {currentStep === 4 && "Review & Launch Challenge"}
                                    </h2>
                                    <p className="text-muted-foreground text-xs">
                                        {currentStep === 1 &&
                                            "Choose the type of challenge you want to create. Our AI will help you define the parameters in the next steps."}
                                        {currentStep === 2 &&
                                            "Specify the exact terms, duration, and resolution criteria for your social wager."}
                                        {currentStep === 3 &&
                                            "Configure your initial entry wager and total pot settings locked safely in escrow."}
                                        {currentStep === 4 &&
                                            "Verify all challenge parameters before locking your stake and publishing to the live feed."}
                                    </p>
                                </>
                            )}
                        </section>

                        {/* STEP 1: CATEGORY SELECTION */}
                        {currentStep === 1 && (
                            <section className="grid gap-3">
                                {loading ? (
                                    <>
                                        <Skeleton className="h-[80px] w-full rounded-xl" />
                                        <Skeleton className="h-[80px] w-full rounded-xl" />
                                        <Skeleton className="h-[80px] w-full rounded-xl" />
                                        <Skeleton className="h-[80px] w-full rounded-xl" />
                                    </>
                                ) : (
                                    <>
                                        {/* Option 1: Prediction */}
                                        <label
                                            className="cursor-pointer"
                                            onClick={() => setSelectedCategory("prediction")}
                                        >
                                            <Card
                                                className={`transition-all duration-300 ease-in-out py-0 border ${selectedCategory === "prediction"
                                                    ? "border-primary bg-primary/5"
                                                    : "border-border/60 bg-card hover:bg-muted/50"
                                                    }`}
                                            >
                                                <CardContent className="p-2 flex items-center gap-4">
                                                    <div className="h-10 w-10 shrink-0 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                                                        <Trophy className="h-5 w-5" />
                                                    </div>
                                                    <div className="flex-1 space-y-1">
                                                        <p className="font-semibold text-base leading-none">
                                                            Prediction
                                                        </p>
                                                        <p className="text-xs text-muted-foreground leading-snug">
                                                            Predict the outcome of an event, game, or match.
                                                        </p>
                                                    </div>
                                                    <div
                                                        className={`shrink-0 transition-colors duration-300 ${selectedCategory === "prediction"
                                                            ? "text-primary"
                                                            : "text-muted-foreground"
                                                            }`}
                                                    >
                                                        <input
                                                            type="radio"
                                                            name="challengeType"
                                                            checked={selectedCategory === "prediction"}
                                                            readOnly
                                                            className="sr-only"
                                                        />
                                                        {selectedCategory === "prediction" ? (
                                                            <CheckCircle2 className="h-6 w-6" />
                                                        ) : (
                                                            <Circle className="h-6 w-6" />
                                                        )}
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </label>

                                        {/* Option 2: Physical */}
                                        <label
                                            className="cursor-pointer"
                                            onClick={() => setSelectedCategory("physical")}
                                        >
                                            <Card
                                                className={`transition-all duration-300 ease-in-out py-0 border ${selectedCategory === "physical"
                                                    ? "border-primary bg-primary/5"
                                                    : "border-border/60 bg-card hover:bg-muted/50"
                                                    }`}
                                            >
                                                <CardContent className="p-2 flex items-center gap-4">
                                                    <div className="h-10 w-10 shrink-0 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                                                        <Dumbbell className="h-5 w-5" />
                                                    </div>
                                                    <div className="flex-1 space-y-1">
                                                        <p className="font-semibold text-base leading-none">
                                                            Physical
                                                        </p>
                                                        <p className="text-xs text-muted-foreground leading-snug">
                                                            Physical activity or fitness-based challenge.
                                                        </p>
                                                    </div>
                                                    <div
                                                        className={`shrink-0 transition-colors duration-300 ${selectedCategory === "physical"
                                                            ? "text-primary"
                                                            : "text-muted-foreground"
                                                            }`}
                                                    >
                                                        <input
                                                            type="radio"
                                                            name="challengeType"
                                                            checked={selectedCategory === "physical"}
                                                            readOnly
                                                            className="sr-only"
                                                        />
                                                        {selectedCategory === "physical" ? (
                                                            <CheckCircle2 className="h-6 w-6" />
                                                        ) : (
                                                            <Circle className="h-6 w-6" />
                                                        )}
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </label>

                                        {/* Option 3: Performance */}
                                        <label
                                            className="cursor-pointer"
                                            onClick={() => setSelectedCategory("performance")}
                                        >
                                            <Card
                                                className={`transition-all duration-300 ease-in-out py-0 border ${selectedCategory === "performance"
                                                    ? "border-primary bg-primary/5"
                                                    : "border-border/60 bg-card hover:bg-muted/50"
                                                    }`}
                                            >
                                                <CardContent className="p-2 flex items-center gap-4">
                                                    <div className="h-10 w-10 shrink-0 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                                                        <TrendingUp className="h-5 w-5" />
                                                    </div>
                                                    <div className="flex-1 space-y-1">
                                                        <p className="font-semibold text-base leading-none">
                                                            Performance
                                                        </p>
                                                        <p className="text-xs text-muted-foreground leading-snug">
                                                            Beat a specific score, speed, or target metric.
                                                        </p>
                                                    </div>
                                                    <div
                                                        className={`shrink-0 transition-colors duration-300 ${selectedCategory === "performance"
                                                            ? "text-primary"
                                                            : "text-muted-foreground"
                                                            }`}
                                                    >
                                                        <input
                                                            type="radio"
                                                            name="challengeType"
                                                            checked={selectedCategory === "performance"}
                                                            readOnly
                                                            className="sr-only"
                                                        />
                                                        {selectedCategory === "performance" ? (
                                                            <CheckCircle2 className="h-6 w-6" />
                                                        ) : (
                                                            <Circle className="h-6 w-6" />
                                                        )}
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </label>

                                        {/* Option 4: Custom */}
                                        <label
                                            className="cursor-pointer"
                                            onClick={() => setSelectedCategory("custom")}
                                        >
                                            <Card
                                                className={`transition-all duration-300 ease-in-out py-0 border ${selectedCategory === "custom"
                                                    ? "border-primary bg-primary/5"
                                                    : "border-border/60 bg-card hover:bg-muted/50"
                                                    }`}
                                            >
                                                <CardContent className="p-2 flex items-center gap-4">
                                                    <div className="h-10 w-10 shrink-0 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                                                        <Sparkles className="h-5 w-5" />
                                                    </div>
                                                    <div className="flex-1 space-y-1">
                                                        <p className="font-semibold text-base leading-none">
                                                            Custom
                                                        </p>
                                                        <p className="text-xs text-muted-foreground leading-snug">
                                                            Design your own custom challenge & resolution rules.
                                                        </p>
                                                    </div>
                                                    <div
                                                        className={`shrink-0 transition-colors duration-300 ${selectedCategory === "custom"
                                                            ? "text-primary"
                                                            : "text-muted-foreground"
                                                            }`}
                                                    >
                                                        <input
                                                            type="radio"
                                                            name="challengeType"
                                                            checked={selectedCategory === "custom"}
                                                            readOnly
                                                            className="sr-only"
                                                        />
                                                        {selectedCategory === "custom" ? (
                                                            <CheckCircle2 className="h-6 w-6" />
                                                        ) : (
                                                            <Circle className="h-6 w-6" />
                                                        )}
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </label>
                                    </>
                                )}
                            </section>
                        )}

                        {/* STEP 2: RULES & PARAMETERS */}
                        {currentStep === 2 && (
                            <section className="space-y-4">
                                <Card className="border-border/60 p-4 space-y-4">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold uppercase text-muted-foreground tracking-wider">
                                            Challenge Title
                                        </label>
                                        <Input
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            placeholder="e.g. Lakers vs Celtics Tonight"
                                            className="bg-muted/30 border-border/60 h-10"
                                        />
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold uppercase text-muted-foreground tracking-wider">
                                            Rules & Description
                                        </label>
                                        <Input
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            placeholder="Specify exact condition to win..."
                                            className="bg-muted/30 border-border/60 h-10"
                                        />
                                    </div>

                                    <div className="space-y-2 pt-1">
                                        <label className="text-xs font-bold uppercase text-muted-foreground tracking-wider flex items-center gap-1.5">
                                            <Clock className="h-3.5 w-3.5 text-primary" /> Challenge Duration
                                        </label>
                                        <div className="grid grid-cols-2 gap-2">
                                            {["2 Hours", "6 Hours", "24 Hours", "3 Days", "Custom"].map((dur) => (
                                                <Button
                                                    key={dur}
                                                    type="button"
                                                    variant={duration === dur ? "default" : "outline"}
                                                    size="sm"
                                                    onClick={() => {
                                                        setDuration(dur)
                                                        if (dur !== "Custom") {
                                                            setCustomHours("")
                                                            setCustomMinutes("")
                                                            setCustomSeconds("")
                                                            setCustomMs("")
                                                        }
                                                    }}
                                                    className="h-9 text-xs font-semibold"
                                                >
                                                    {dur}
                                                </Button>
                                            ))}
                                        </div>
                                        {duration === "Custom" && (
                                            <div className="pt-2 grid grid-cols-4 gap-2">
                                                <div className="space-y-1">
                                                    <label className="text-[10px] font-bold uppercase text-muted-foreground tracking-wider text-center block">Hr</label>
                                                    <Input
                                                        type="number"
                                                        min="0"
                                                        max="999"
                                                        value={customHours}
                                                        onChange={(e) => setCustomHours(e.target.value)}
                                                        placeholder="00"
                                                        className="bg-muted/30 border-border/60 h-10 text-center text-sm font-mono"
                                                    />
                                                </div>
                                                <div className="space-y-1">
                                                    <label className="text-[10px] font-bold uppercase text-muted-foreground tracking-wider text-center block">Min</label>
                                                    <Input
                                                        type="number"
                                                        min="0"
                                                        max="59"
                                                        value={customMinutes}
                                                        onChange={(e) => setCustomMinutes(e.target.value)}
                                                        placeholder="00"
                                                        className="bg-muted/30 border-border/60 h-10 text-center text-sm font-mono"
                                                    />
                                                </div>
                                                <div className="space-y-1">
                                                    <label className="text-[10px] font-bold uppercase text-muted-foreground tracking-wider text-center block">Sec</label>
                                                    <Input
                                                        type="number"
                                                        min="0"
                                                        max="59"
                                                        value={customSeconds}
                                                        onChange={(e) => setCustomSeconds(e.target.value)}
                                                        placeholder="00"
                                                        className="bg-muted/30 border-border/60 h-10 text-center text-sm font-mono"
                                                    />
                                                </div>
                                                <div className="space-y-1">
                                                    <label className="text-[10px] font-bold uppercase text-muted-foreground tracking-wider text-center block">Ms</label>
                                                    <Input
                                                        type="number"
                                                        min="0"
                                                        max="999"
                                                        value={customMs}
                                                        onChange={(e) => setCustomMs(e.target.value)}
                                                        placeholder="000"
                                                        className="bg-muted/30 border-border/60 h-10 text-center text-sm font-mono"
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div className="space-y-2 pt-1">
                                        <label className="text-xs font-bold uppercase text-muted-foreground tracking-wider flex items-center gap-1.5">
                                            <Bot className="h-3.5 w-3.5 text-primary" /> Verification Method
                                        </label>
                                        <div className="space-y-2">
                                            {[
                                                { id: "AI Judge", label: "🤖 AnyBet AI Judge (Auto-settled)" },
                                                { id: "Peer Consensus", label: "👥 Peer Vote Consensus" },
                                            ].map((v) => (
                                                <Card
                                                    key={v.id}
                                                    onClick={() => setVerification(v.id)}
                                                    className={`cursor-pointer p-3 border ${verification === v.id
                                                        ? "border-primary bg-primary/5 text-primary"
                                                        : "border-border/60 text-muted-foreground hover:bg-muted/40"
                                                        }`}
                                                >
                                                    <div className="flex items-center justify-between text-xs font-semibold">
                                                        <span>{v.label}</span>
                                                        {verification === v.id && (
                                                            <CheckCircle2 className="h-4 w-4 text-primary" />
                                                        )}
                                                    </div>
                                                </Card>
                                            ))}
                                        </div>
                                    </div>
                                </Card>
                            </section>
                        )}

                        {/* STEP 3: STAKE & ESCROW */}
                        {currentStep === 3 && (
                            <section className="space-y-4">
                                <Card className="border-border/60 p-5 space-y-5">
                                    <div className="space-y-2 text-center">
                                        <label className="text-xs font-bold uppercase text-muted-foreground tracking-widest">
                                            Initial Entry Stake
                                        </label>
                                        <div className="relative max-w-xs mx-auto">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl font-bold text-primary">
                                                $
                                            </span>
                                            <Input
                                                type="number"
                                                value={stakeAmount}
                                                onChange={(e) => setStakeAmount(e.target.value)}
                                                className="pl-9 text-center text-lg font-bold  text-primary"
                                            />
                                        </div>

                                        <div className="flex justify-center gap-2 pt-1">
                                            {["50", "100", "250", "500"].map((amt) => (
                                                <Button
                                                    key={amt}
                                                    type="button"
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => setStakeAmount(amt)}
                                                    className="h-8 px-3 text-xs font-bold"
                                                >
                                                    ${amt}
                                                </Button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-2 pt-2 border-t border-border/40">
                                        <label className="text-xs font-bold uppercase text-muted-foreground tracking-wider flex items-center gap-1.5">
                                            <Users className="h-3.5 w-3.5 text-primary" /> Max Players
                                        </label>
                                        <div className="grid grid-cols-1 gap-2">
                                            {[
                                                "Head-to-Head (2 Players)",
                                                "Small Group (5 Players)",
                                                "Open Tournament (Unlimited)",
                                            ].map((mp) => (
                                                <Card
                                                    key={mp}
                                                    onClick={() => setMaxPlayers(mp)}
                                                    className={`cursor-pointer p-3 border ${maxPlayers === mp
                                                        ? "border-primary bg-primary/5 text-primary"
                                                        : "border-border/60 text-muted-foreground hover:bg-muted/40"
                                                        }`}
                                                >
                                                    <div className="flex items-center justify-between text-xs font-semibold">
                                                        <span>{mp}</span>
                                                        {maxPlayers === mp && (
                                                            <CheckCircle2 className="h-4 w-4 text-primary" />
                                                        )}
                                                    </div>
                                                </Card>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Calculated Pot Card */}
                                    <div className="bg-primary/5 border border-primary/20 rounded-sm  text-center space-y-1">
                                        <div className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">
                                            ESTIMATED TOTAL POT
                                        </div>
                                        <div className="text-2xl font-semibold text-primary">
                                            ${(parseFloat(stakeAmount || "0") * 2).toLocaleString()}
                                        </div>
                                        <div className="text-[10px] text-muted-foreground">
                                            Locked securely in Smart Escrow
                                        </div>
                                    </div>
                                </Card>
                            </section>
                        )}

                        {/* STEP 4: REVIEW & LAUNCH */}
                        {currentStep === 4 && (
                            <section className="space-y-2">
                                <Card className="border-border/60 shadow-sm overflow-hidden">
                                    <CardContent className=" 1">
                                        {/* Header Badge */}
                                        <div className="flex items-center justify-between">
                                            <Badge
                                                variant="secondary"
                                                className="bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider px-2.5 py-1"
                                            >
                                                Live Challenge Draft
                                            </Badge>
                                            <div className="h-9 w-9 rounded-lg bg-primary/15 text-primary flex items-center justify-center">
                                                <Trophy className="h-5 w-5" />
                                            </div>
                                        </div>

                                        {/* Title & Description */}
                                        <div className="space-y-1">
                                            <h3 className="text-lg font-bold tracking-tight text-foreground">
                                                {title || "Untitled Challenge"}
                                            </h3>
                                            <p className="text-xs text-muted-foreground leading-relaxed">
                                                {description || "No description provided."}
                                            </p>
                                        </div>

                                        {/* Summary Parameters Table */}
                                        <div className="space-y-2 pt-3 border-t border-border/40 text-xs">
                                            <div className="flex justify-between items-center py-1">
                                                <span className="text-muted-foreground flex items-center gap-1.5">
                                                    <Trophy className="h-4 w-4 text-primary" /> Category
                                                </span>
                                                <span className="font-semibold text-foreground uppercase">
                                                    {selectedCategory}
                                                </span>
                                            </div>

                                            <div className="flex justify-between items-center py-1 border-t border-border/30">
                                                <span className="text-muted-foreground flex items-center gap-1.5">
                                                    <DollarSign className="h-4 w-4 text-primary" /> Entry Stake
                                                </span>
                                                <span className="font-bold text-primary">
                                                    ${stakeAmount || "0"}.00
                                                </span>
                                            </div>

                                            <div className="flex justify-between items-center py-1 border-t border-border/30">
                                                <span className="text-muted-foreground flex items-center gap-1.5">
                                                    <Clock className="h-4 w-4 text-primary" /> Duration
                                                </span>
                                                <span className="font-semibold text-foreground">
                                                    {duration}
                                                </span>
                                            </div>

                                            <div className="flex justify-between items-center py-1 border-t border-border/30">
                                                <span className="text-muted-foreground flex items-center gap-1.5">
                                                    <Bot className="h-4 w-4 text-primary" /> Verification
                                                </span>
                                                <span className="font-semibold text-foreground">
                                                    {verification}
                                                </span>
                                            </div>

                                            <div className="flex justify-between items-center py-1 border-t border-border/30">
                                                <span className="text-muted-foreground flex items-center gap-1.5">
                                                    <Users className="h-4 w-4 text-primary" /> Players
                                                </span>
                                                <span className="font-semibold text-foreground">
                                                    {maxPlayers}
                                                </span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Security Lock Notice */}
                                <Card className="bg-primary/5 border-primary/20 px-4">
                                    <div className="flex items-start gap-3">
                                        <ShieldCheck className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                                        <p className="text-xs text-muted-foreground leading-relaxed">
                                            Your stake of ${stakeAmount || "0"} will be held in Smart Escrow until the challenge is resolved by AI or peer consensus.
                                        </p>
                                    </div>
                                </Card>
                            </section>
                        )}
                    </main>

                    {/* Fixed Bottom Navigation Bar for Stepper */}
                    {!loading && (
                        <div className="fixed bottom-16 left-0 right-0 p-4 bg-background/90 backdrop-blur-md border-t border-border/40 z-40 md:left-[var(--sidebar-width)] md:w-[calc(100%-var(--sidebar-width))]">
                            <div className="max-w-md mx-auto flex gap-3">
                                {currentStep > 1 && (
                                    <Button
                                        variant="outline"
                                        onClick={() => setCurrentStep((prev) => (prev - 1) as any)}
                                        className="flex-1 h-10 text-xs font-semibold uppercase tracking-wider text-muted-foreground border-border/60 hover:bg-muted/50"
                                    >
                                        <ArrowLeft className="mr-1 h-4 w-4" /> Back
                                    </Button>
                                )}

                                {currentStep < 4 ? (
                                    <Button
                                        onClick={() => setCurrentStep((prev) => (prev + 1) as any)}
                                        className="flex-1 h-10 text-base font-semibold bg-primary text-primary-foreground hover:bg-primary/90 shadow-md"
                                    >
                                        Next <ArrowRight className="ml-1 h-4 w-4" />
                                    </Button>
                                ) : (
                                    <Button
                                        disabled={isSubmitting}
                                        onClick={async () => {
                                            if (!isAuthenticated) {
                                                setShowLoginSheet(true)
                                                return
                                            }

                                            const stake = parseFloat(stakeAmount)
                                            if (isNaN(stake) || stake <= 0) {
                                                toast.error("Invalid stake amount.")
                                                return
                                            }
                                            if (coins < stake) {
                                                toast.error(`Insufficient balance. You have ${coins} coins but need ${stake}.`)
                                                return
                                            }

                                            setIsSubmitting(true)
                                            try {
                                                const finalDuration = duration === "Custom"
                                                    ? `${customHours || "0"}h ${customMinutes || "0"}m ${customSeconds || "0"}s ${customMs || "0"}ms`
                                                    : duration

                                                // Map selectedCategory to ChallengeItem category
                                                const categoryMap: Record<string, "Sports" | "Physical" | "Performance"> = {
                                                    prediction: "Sports",
                                                    physical: "Physical",
                                                    performance: "Performance",
                                                    custom: "Sports",
                                                }
                                                const challengeCategory = categoryMap[selectedCategory] || "Sports"

                                                // Map selectedCategory to icon type
                                                const iconMap: Record<string, "trophy" | "dumbbell" | "gamepad" | "sparkles"> = {
                                                    prediction: "trophy",
                                                    physical: "dumbbell",
                                                    performance: "gamepad",
                                                    custom: "sparkles",
                                                }
                                                const iconColorMap: Record<string, { bg: string; color: string }> = {
                                                    prediction: { bg: "bg-indigo-500/15", color: "text-indigo-400" },
                                                    physical: { bg: "bg-purple-500/15", color: "text-purple-400" },
                                                    performance: { bg: "bg-pink-500/15", color: "text-pink-400" },
                                                    custom: { bg: "bg-amber-500/15", color: "text-amber-400" },
                                                }

                                                // Create challenge in Firestore
                                                const docRef = await addDoc(collection(db, "challenges"), {
                                                    creatorId: uid,
                                                    category: challengeCategory,
                                                    title,
                                                    description,
                                                    duration: finalDuration,
                                                    verification,
                                                    stakeAmount: stake,
                                                    maxPlayers,
                                                    createdAt: new Date().toISOString(),
                                                    status: "open"
                                                })

                                                // Dispatch to Redux for real-time display
                                                dispatch(addChallenge({
                                                    id: docRef.id,
                                                    creatorId: uid || undefined,
                                                    title,
                                                    description,
                                                    category: challengeCategory,
                                                    potAmount: `$${(stake * 2).toLocaleString()}`,
                                                    stakeAmount: stake,
                                                    timeLeft: `ENDS ${finalDuration}`,
                                                    duration: finalDuration,
                                                    verification,
                                                    maxPlayers,
                                                    isLive: true,
                                                    participantsCount: "+1",
                                                    iconType: iconMap[selectedCategory] || "trophy",
                                                    iconBg: iconColorMap[selectedCategory]?.bg || "bg-indigo-500/15",
                                                    iconColor: iconColorMap[selectedCategory]?.color || "text-indigo-400",
                                                    avatars: [],
                                                    createdAt: new Date().toISOString(),
                                                    status: "open"
                                                }))

                                                // Deduct coins from user
                                                if (uid) {
                                                    await updateDoc(doc(db, "users", uid), {
                                                        coins: increment(-stake)
                                                    })
                                                }

                                                toast.success("Challenge created successfully!")
                                                navigate("/challenges/trending")
                                            } catch (error) {
                                                console.error("Error creating challenge:", error)
                                                toast.error("Failed to create challenge. Please try again.")
                                            } finally {
                                                setIsSubmitting(false)
                                            }
                                        }}
                                        className="flex-1 h-10 text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-all active:scale-[0.99]"
                                    >
                                        {isSubmitting ? "Launching..." : "Create & Launch Challenge"}
                                    </Button>
                                )}
                            </div>
                        </div>
                    )}
                </SidebarInset>

                {/* Login/Signup Sheet if user is not authenticated */}
                <Sheet open={showLoginSheet} onOpenChange={setShowLoginSheet}>
                    <SheetContent side="bottom" className="h-[80vh] rounded-t-2xl px-2">
                        <SheetHeader className="pb-4">
                            <SheetTitle>Login Required</SheetTitle>
                            <SheetDescription>
                                You must be signed in to launch a challenge. We'll save your draft so you can continue right after!
                            </SheetDescription>
                        </SheetHeader>
                        <div className="overflow-y-auto pb-8 h-full">
                            <LoginForm initialMode="signup" />
                        </div>
                    </SheetContent>
                </Sheet>
            </SidebarProvider>
            <BottomNavbar />
        </>
    )
}
