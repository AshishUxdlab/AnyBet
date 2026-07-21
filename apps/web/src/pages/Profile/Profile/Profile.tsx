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
import { Avatar, AvatarImage, AvatarFallback } from "@workspace/ui/components/avatar"
import { Badge } from "@workspace/ui/components/badge"
import {
    Settings,
    Shield,
    Bell,
    HelpCircle,
    FileText,
    ChevronRight,
    Coins,
    Flame,
    Award,
    CheckCircle,
    Pencil,
    LogOut,
    LogIn
} from "lucide-react"
import { signOut, onAuthStateChanged, type User } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
import { auth, db } from "@/Firebase/firebase"
import Header from "../../Header/Header"
import { NotificationPreferencesModal } from "@/components/NotificationPreferencesModal"

interface UserProfileData {
    name?: string
    username?: string
    email?: string
    phone?: string
    bio?: string
    photoURL?: string
}

export default function Profile() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [currentUser, setCurrentUser] = useState<User | null>(null)
    const [profileData, setProfileData] = useState<UserProfileData | null>(null)
    const [notifModalOpen, setNotifModalOpen] = useState(false)

    const handleLogout = async () => {
        try {
            await signOut(auth)
            navigate("/login")
        } catch (err) {
            console.error("Logout error:", err)
        }
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setCurrentUser(user)
                try {
                    const userDocRef = doc(db, "users", user.uid)
                    const userSnap = await getDoc(userDocRef)
                    if (userSnap.exists()) {
                        setProfileData(userSnap.data() as UserProfileData)
                    } else {
                        setProfileData({
                            name: user.displayName || "Player One",
                            email: user.email || "",
                            username: user.email ? user.email.split("@")[0] : "playerone",
                            photoURL: user.photoURL || undefined
                        })
                    }
                } catch (err) {
                    console.warn("Could not fetch user from Firestore:", err)
                    setProfileData({
                        name: user.displayName || "Player One",
                        email: user.email || "",
                        username: user.email ? user.email.split("@")[0] : "playerone",
                        photoURL: user.photoURL || undefined
                    })
                }
            } else {
                setCurrentUser(null)
                setProfileData(null)
            }
            setLoading(false)
        })

        return () => unsubscribe()
    }, [])

    const displayName = profileData?.name || currentUser?.displayName || (currentUser ? "Logged User" : "Guest User")
    const usernameTag = profileData?.username ? `@${profileData.username}` : (profileData?.email || (currentUser ? "Member" : "Not Logged In"))
    const rawAvatar = profileData?.photoURL || currentUser?.photoURL
    const avatarUrl = (rawAvatar && !rawAvatar.startsWith("blob:")) 
        ? rawAvatar 
        : "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80"
    const initials = displayName ? displayName.substring(0, 2).toUpperCase() : "GU"

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
                    
                    <Header title="PROFILE" loading={loading} />

                    <main className="flex-1 overflow-auto p-4 md:p-6 space-y-4 pb-24 max-w-md mx-auto w-full">
                        {loading ? (
                            <div className="space-y-6">
                                <div className="flex flex-col items-center space-y-3">
                                    <Skeleton className="h-24 w-24 rounded-full" />
                                    <Skeleton className="h-6 w-32" />
                                    <Skeleton className="h-3 w-24" />
                                </div>
                                <Skeleton className="h-20 w-full rounded-xl" />
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center">
                                        <Skeleton className="h-5 w-20" />
                                        <Skeleton className="h-4 w-12" />
                                    </div>
                                    <div className="grid grid-cols-4 gap-2">
                                        <Skeleton className="h-16 rounded-xl" />
                                        <Skeleton className="h-16 rounded-xl" />
                                        <Skeleton className="h-16 rounded-xl" />
                                        <Skeleton className="h-16 rounded-xl" />
                                    </div>
                                </div>
                                <Skeleton className="h-[200px] w-full rounded-xl" />
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {/* Profile Info */}
                                <div className="flex flex-col items-center text-center space-y-3">
                                    <div className="relative group cursor-pointer" onClick={() => navigate(currentUser ? "/profile/edit" : "/login")}>
                                        <Avatar className="h-24 w-24 border-2 border-primary/20 transition-transform duration-200 group-hover:scale-105">
                                            <AvatarImage src={avatarUrl} alt={displayName} />
                                            <AvatarFallback>{initials}</AvatarFallback>
                                        </Avatar>
                                        <Badge className="absolute bottom-0 right-0 bg-primary hover:bg-primary text-primary-foreground font-bold px-1.5 py-0.5 text-[9px] uppercase tracking-wider shadow-sm">
                                            {currentUser ? "PRO" : "GUEST"}
                                        </Badge>
                                        {/* Pencil Edit Icon Button */}
                                        {currentUser && (
                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    navigate("/profile/edit")
                                                }}
                                                className="absolute top-0 right-0 p-1.5 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full shadow-lg transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-ring border border-background"
                                                title="Edit Profile"
                                            >
                                                <Pencil className="h-3.5 w-3.5" />
                                            </button>
                                        )}
                                    </div>
                                    <div className="space-y-1">
                                        <h2 className="text-xl font-bold tracking-tight">{displayName}</h2>
                                        <div className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">
                                            {usernameTag}
                                        </div>
                                    </div>
                                </div>

                                {/* Stats Card */}
                                <Card>
                                    <CardContent className=" grid grid-cols-3 gap-2 text-center divide-x divide-border">
                                        <div className="space-y-1">
                                            <div className="text-[9px] uppercase text-muted-foreground font-semibold tracking-wider">Challenges</div>
                                            <div className="text-base font-semibold text-foreground">42</div>
                                        </div>
                                        <div className="space-y-1">
                                            <div className="text-[9px] uppercase text-muted-foreground font-semibold tracking-wider">Total Earned</div>
                                            <div className="text-base font-semibold text-primary">$15.4k</div>
                                        </div>
                                        <div className="space-y-1">
                                            <div className="text-[9px] uppercase text-muted-foreground font-semibold tracking-wider">Rank</div>
                                            <div className="text-base font-semibold text-foreground">#128</div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Badges Section */}
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-sm font-semibold uppercase tracking-wide">Badges</h3>
                                        <Button variant="link" size="sm" className="h-auto p-0 text-xs font-semibold text-primary">VIEW ALL</Button>
                                    </div>
                                    <div className="grid grid-cols-4 gap-2 text-center">
                                        <div className="space-y-1.5">
                                            <div className="h-11 w-11 rounded-full bg-secondary/50 flex items-center justify-center mx-auto text-foreground border border-border">
                                                <Coins className="h-4 w-4" />
                                            </div>
                                            <div className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">High Roller</div>
                                        </div>
                                        <div className="space-y-1.5">
                                            <div className="h-11 w-11 rounded-full bg-secondary/50 flex items-center justify-center mx-auto text-foreground border border-border">
                                                <Flame className="h-4 w-4" />
                                            </div>
                                            <div className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">Win Streak</div>
                                        </div>
                                        <div className="space-y-1.5">
                                            <div className="h-11 w-11 rounded-full bg-secondary/50 flex items-center justify-center mx-auto text-foreground border border-border">
                                                <CheckCircle className="h-4 w-4" />
                                            </div>
                                            <div className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground text-center leading-tight">Early Adopter</div>
                                        </div>
                                        <div className="space-y-1.5">
                                            <div className="h-11 w-11 rounded-full bg-secondary/50 flex items-center justify-center mx-auto text-foreground border border-border">
                                                <Award className="h-4 w-4" />
                                            </div>
                                            <div className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">Champion</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Settings Menu */}
                                <Card>
                                    <CardContent className="p-0 flex flex-col divide-y divide-border">
                                        {currentUser && (
                                            <Button variant="ghost" onClick={() => navigate("/profile/edit")} className="w-full justify-between h-auto py-3 px-4 font-normal rounded-none text-foreground border-none hover:bg-muted/30">
                                                <div className="flex items-center gap-3">
                                                    <Settings className="h-4 w-4 text-muted-foreground" />
                                                    <span className="text-sm font-medium">Account Settings</span>
                                                </div>
                                                <ChevronRight className="h-4 w-4 text-muted-foreground" />
                                            </Button>
                                        )}

                                        <Button variant="ghost" className="w-full justify-between h-auto py-3 px-4 font-normal rounded-none text-foreground border-none hover:bg-muted/30">
                                            <div className="flex items-center gap-3">
                                                <Shield className="h-4 w-4 text-muted-foreground" />
                                                <span className="text-sm font-medium">Security</span>
                                            </div>
                                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                                        </Button>

                                        <Button variant="ghost" onClick={() => navigate("/notifications")} className="w-full justify-between h-auto py-3 px-4 font-normal rounded-none text-foreground border-none hover:bg-muted/30">
                                            <div className="flex items-center gap-3">
                                                <Bell className="h-4 w-4 text-muted-foreground" />
                                                <span className="text-sm font-medium">Notifications</span>
                                            </div>
                                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                                        </Button>

                                        <Button variant="ghost" onClick={() => navigate("/help")} className="w-full justify-between h-auto py-3 px-4 font-normal rounded-none text-foreground border-none hover:bg-muted/30">
                                            <div className="flex items-center gap-3">
                                                <HelpCircle className="h-4 w-4 text-muted-foreground" />
                                                <span className="text-sm font-medium">Help & Support</span>
                                            </div>
                                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                                        </Button>

                                        <Button variant="ghost" onClick={() => navigate("/faq")} className="w-full justify-between h-auto py-3 px-4 font-normal rounded-none text-foreground border-none hover:bg-muted/30">
                                            <div className="flex items-center gap-3">
                                                <FileText className="h-4 w-4 text-muted-foreground" />
                                                <span className="text-sm font-medium">FAQ</span>
                                            </div>
                                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                                        </Button>

                                        {currentUser ? (
                                            <Button variant="ghost" onClick={handleLogout} className="w-full justify-between h-auto py-3 px-4 font-normal rounded-none text-destructive border-none hover:bg-destructive/10 hover:text-destructive">
                                                <div className="flex items-center gap-3">
                                                    <LogOut className="h-4 w-4 text-destructive" />
                                                    <span className="text-sm font-semibold">Log Out</span>
                                                </div>
                                                <ChevronRight className="h-4 w-4 text-destructive/50" />
                                            </Button>
                                        ) : (
                                            <div className="p-4 bg-card">
                                                <Button onClick={() => navigate("/login")} className="w-full h-11 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold rounded-xl shadow-md transition-transform active:scale-[0.98]">
                                                    Log In / Sign Up
                                                </Button>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            </div>
                        )}
                    </main>

                </SidebarInset>
            </SidebarProvider>
            <NotificationPreferencesModal open={notifModalOpen} onOpenChange={setNotifModalOpen} />
            <BottomNavbar />
        </>
    )
}

