import { useState, useEffect, useRef } from "react"
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
import { Label } from "@workspace/ui/components/label"
import { Skeleton } from "@workspace/ui/components/skeleton"
import { Avatar, AvatarImage, AvatarFallback } from "@workspace/ui/components/avatar"
import { Badge } from "@workspace/ui/components/badge"
import {
    ArrowLeft,
    Camera,
    Check,
    Save,
    Sparkles,
    Lock
} from "lucide-react"
import { onAuthStateChanged, updateProfile, type User } from "firebase/auth"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { auth, db } from "@/Firebase/firebase"
import Header from "../../Header/Header"

// Sample avatar presets for quick selection
const AVATAR_PRESETS = [
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80"
]

export default function EditProfile() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [isSaving, setIsSaving] = useState(false)
    const [savedSuccess, setSavedSuccess] = useState(false)
    const [currentUser, setCurrentUser] = useState<User | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    // Form fields
    const [profileImage, setProfileImage] = useState(AVATAR_PRESETS[0])
    const [fullName, setFullName] = useState("")
    const [username, setUsername] = useState("")
    const [bio, setBio] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setCurrentUser(user)
                setEmail(user.email || "")
                setProfileImage(user.photoURL || AVATAR_PRESETS[0])
                setFullName(user.displayName || "")

                try {
                    const userDocRef = doc(db, "users", user.uid)
                    const userSnap = await getDoc(userDocRef)
                    if (userSnap.exists()) {
                        const data = userSnap.data()
                        if (data.name) setFullName(data.name)
                        if (data.username) setUsername(data.username)
                        if (data.bio) setBio(data.bio)
                        if (data.phone) setPhone(data.phone)
                        if (data.photoURL) setProfileImage(data.photoURL)
                    } else if (user.email) {
                        setUsername(user.email.split("@")[0])
                    }
                } catch (err) {
                    console.warn("Could not load user doc from Firestore:", err)
                }
            } else {
                navigate("/login")
            }
            setLoading(false)
        })

        return () => unsubscribe()
    }, [navigate])

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                if (typeof reader.result === "string") {
                    setProfileImage(reader.result)
                }
            }
            reader.readAsDataURL(file)
        }
    }

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!currentUser) return

        setIsSaving(true)
        try {
            // Only pass photoURL to Firebase Auth if it's a short URL (Auth photoURL has max length limits)
            const isShortPhotoUrl = profileImage && profileImage.length < 2000
            await updateProfile(currentUser, {
                displayName: fullName,
                ...(isShortPhotoUrl ? { photoURL: profileImage } : {})
            })

            // Update Firestore Document (Firestore handles Base64 data URLs without length issues)
            await setDoc(doc(db, "users", currentUser.uid), {
                uid: currentUser.uid,
                name: fullName,
                username: username,
                bio: bio,
                email: email,
                phone: phone,
                photoURL: profileImage,
                updatedAt: new Date().toISOString()
            }, { merge: true })

            setSavedSuccess(true)
            setTimeout(() => {
                navigate("/profile")
            }, 800)
        } catch (err) {
            console.error("Failed to update profile:", err)
        } finally {
            setIsSaving(false)
        }
    }

    const initials = fullName ? fullName.substring(0, 2).toUpperCase() : "U"

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
                    <Header title="EDIT PROFILE" loading={loading} />

                    <main className="flex-1 overflow-auto p-4 md:p-6 pb-24 max-w-md mx-auto w-full">
                        {/* Top Back Navigation Bar */}
                        <div className="flex items-center justify-between mb-5">
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
                                EDIT
                            </Badge>
                        </div>

                        {loading ? (
                            <div className="space-y-6">
                                <div className="flex flex-col items-center space-y-3">
                                    <Skeleton className="h-20 w-20 rounded-full" />
                                    <Skeleton className="h-4 w-32" />
                                </div>
                                <Skeleton className="h-[320px] w-full rounded-xl" />
                            </div>
                        ) : (
                            <form onSubmit={handleSave} className="space-y-6">
                                {/* Profile Picture Card */}
                                <Card>
                                    <CardContent className="p-4 flex flex-col items-center space-y-3">
                                        <div className="relative">
                                            <Avatar className="h-20 w-20 border border-border shadow-sm">
                                                <AvatarImage src={profileImage} alt={fullName} />
                                                <AvatarFallback className="text-base font-bold">{initials}</AvatarFallback>
                                            </Avatar>
                                            <button
                                                type="button"
                                                onClick={() => fileInputRef.current?.click()}
                                                className="absolute bottom-0 right-0 p-1.5 bg-primary text-primary-foreground rounded-full shadow hover:bg-primary/90 transition-transform active:scale-95"
                                                title="Upload photo"
                                            >
                                                <Camera className="h-3.5 w-3.5" />
                                            </button>
                                            <input
                                                ref={fileInputRef}
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={handleImageChange}
                                            />
                                        </div>

                                        <div className="text-center space-y-0.5">
                                            <h3 className="text-xs font-semibold text-foreground">Change Profile Photo</h3>
                                            <p className="text-xs text-muted-foreground">Tap camera icon or choose a preset</p>
                                        </div>

                                        {/* Avatar Preset Pickers */}
                                        <div className="flex gap-2 pt-1">
                                            {AVATAR_PRESETS.map((img, idx) => (
                                                <button
                                                    key={idx}
                                                    type="button"
                                                    onClick={() => setProfileImage(img)}
                                                    className={`rounded-full overflow-hidden transition-all ${
                                                        profileImage === img
                                                            ? "ring-2 ring-primary ring-offset-2 ring-offset-background"
                                                            : "opacity-50 hover:opacity-100"
                                                    }`}
                                                >
                                                    <img src={img} alt={`Preset ${idx + 1}`} className="h-7 w-7 object-cover" />
                                                </button>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Personal Details Card */}
                                <Card>
                                    <CardContent className="p-4 space-y-4">
                                        <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground border-b pb-2">
                                            Personal Details
                                        </h2>

                                        {/* Full Name */}
                                        <div className="space-y-1.5">
                                            <Label htmlFor="fullName" className="text-xs font-medium text-foreground">
                                                Full Name
                                            </Label>
                                            <Input
                                                id="fullName"
                                                value={fullName}
                                                onChange={(e) => setFullName(e.target.value)}
                                                className="h-10 text-sm bg-background"
                                                placeholder="Enter full name"
                                                required
                                            />
                                        </div>

                                        {/* Username */}
                                        <div className="space-y-1.5">
                                            <Label htmlFor="username" className="text-xs font-medium text-foreground">
                                                Username
                                            </Label>
                                            <Input
                                                id="username"
                                                value={username}
                                                onChange={(e) => setUsername(e.target.value)}
                                                className="h-10 text-sm bg-background"
                                                placeholder="Enter username"
                                                required
                                            />
                                        </div>

                                        {/* Bio */}
                                        <div className="space-y-1.5">
                                            <Label htmlFor="bio" className="text-xs font-medium text-foreground">
                                                Bio / Status
                                            </Label>
                                            <Input
                                                id="bio"
                                                value={bio}
                                                onChange={(e) => setBio(e.target.value)}
                                                className="h-10 text-sm bg-background"
                                                placeholder="Tell something about yourself"
                                            />
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Contact Information Card */}
                                <Card>
                                    <CardContent className="p-4 space-y-4">
                                        <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground border-b pb-2">
                                            Contact Information
                                        </h2>

                                        {/* Email */}
                                        <div className="space-y-1.5">
                                            <div className="flex justify-between items-center">
                                                <Label htmlFor="email" className="text-xs font-medium text-foreground">
                                                    Email Address
                                                </Label>
                                                <span className="text-xs text-muted-foreground flex items-center gap-1 font-normal">
                                                    <Lock className="h-3 w-3" /> Read-only
                                                </span>
                                            </div>
                                            <Input
                                                id="email"
                                                type="email"
                                                value={email}
                                                readOnly
                                                disabled
                                                className="h-10 text-sm bg-muted/40 text-muted-foreground cursor-not-allowed opacity-80"
                                            />
                                        </div>

                                        {/* Phone */}
                                        <div className="space-y-1.5">
                                            <Label htmlFor="phone" className="text-xs font-medium text-foreground">
                                                Phone Number
                                            </Label>
                                            <Input
                                                id="phone"
                                                type="tel"
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                                className="h-10 text-sm bg-background"
                                                placeholder="+1 (555) 000-0000"
                                            />
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Success Feedback Banner */}
                                {savedSuccess && (
                                    <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-lg flex items-center gap-2 text-xs font-medium animate-in fade-in">
                                        <Check className="h-4 w-4 text-emerald-400" />
                                        Profile updated successfully! Redirecting...
                                    </div>
                                )}

                                {/* Submit Actions */}
                                <div className="flex items-center gap-3 pt-2">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => navigate("/profile")}
                                        className="flex-1 font-medium text-sm h-10"
                                        disabled={isSaving}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        className="flex-1 font-medium text-sm h-10 gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
                                        disabled={isSaving || savedSuccess}
                                    >
                                        {isSaving ? (
                                            <>
                                                <Sparkles className="h-4 w-4 animate-spin" />
                                                Saving...
                                            </>
                                        ) : savedSuccess ? (
                                            <>
                                                <Check className="h-4 w-4" />
                                                Saved!
                                            </>
                                        ) : (
                                            <>
                                                <Save className="h-4 w-4" />
                                                Save Changes
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </form>
                        )}
                    </main>
                </SidebarInset>
            </SidebarProvider>
            <BottomNavbar />
        </>
    )
}

