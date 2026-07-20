import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { cn } from "@workspace/ui/lib/utils"
import { Button } from "@workspace/ui/components/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@workspace/ui/components/field"
import { Input } from "@workspace/ui/components/input"
import { auth, db } from "@/Firebase/firebase"
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"
import { AlertCircle, Loader2 } from "lucide-react"
import { toast } from "sonner"

interface LoginFormProps extends React.ComponentProps<"div"> {
  initialMode?: "login" | "signup"
}

export function LoginForm({
  className,
  initialMode = "login",
  ...props
}: LoginFormProps) {
  const navigate = useNavigate()
  const [mode, setMode] = useState<"login" | "signup">(initialMode)
  const [name, setName] = useState("")
  const [username, setUsername] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (mode === "signup") {
      if (!name.trim()) {
        setError("Please enter your full name.")
        return
      }
      if (!username.trim()) {
        setError("Please enter a username.")
        return
      }
      if (password !== confirmPassword) {
        setError("Passwords do not match.")
        return
      }
    }

    setLoading(true)

    try {
      if (mode === "login") {
        await signInWithEmailAndPassword(auth, email, password)
        toast.success("Logged in successfully!")
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        const user = userCredential.user

        // Update display name
        if (name) {
          await updateProfile(user, { displayName: name })
        }

        // Store extra user details in Firestore
        try {
          await setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            name: name,
            username: username,
            email: email,
            phone: phone,
            coins: 200,
            createdAt: new Date().toISOString()
          })
        } catch (dbErr) {
          console.warn("Could not write user record to Firestore:", dbErr)
        }
        toast.success("Account created successfully! Enjoy your 200 bonus coins!")
      }
      navigate("/dashboard")
    } catch (err: any) {
      console.error("Auth error:", err)
      const code = err?.code || ""
      if (code === "auth/email-already-in-use") {
        setError("This email is already registered. Please log in.")
      } else if (code === "auth/invalid-credential" || code === "auth/wrong-password" || code === "auth/user-not-found") {
        setError("Invalid email or password.")
      } else if (code === "auth/weak-password") {
        setError("Password should be at least 6 characters.")
      } else if (code === "auth/invalid-email") {
        setError("Please enter a valid email address.")
      } else {
        setError(err.message || "An error occurred during authentication.")
      }
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setError(null)
    setGoogleLoading(true)
    try {
      const provider = new GoogleAuthProvider()
      const res = await signInWithPopup(auth, provider)
      const user = res.user
      try {
        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          name: user.displayName || "",
          username: user.email?.split("@")[0] || "",
          email: user.email || "",
          phone: user.phoneNumber || "",
          coins: 200,
          createdAt: new Date().toISOString()
        }, { merge: true })
      } catch (dbErr) {
        console.warn("Could not write google user record to Firestore:", dbErr)
      }
      toast.success("Signed in with Google successfully!")
      navigate("/dashboard")
    } catch (err: any) {
      console.error("Google Auth error:", err)
      if (err?.code !== "auth/popup-closed-by-user") {
        setError("Failed to sign in with Google.")
      }
    } finally {
      setGoogleLoading(false)
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>
            {mode === "login" ? "Login to your account" : "Create an account"}
          </CardTitle>
          <CardDescription>
            {mode === "login"
              ? "Enter your email below to login to your account"
              : "Enter your details below to create your account"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} autoComplete="off">
            <FieldGroup>
              {error && (
                <div className="p-3 text-xs bg-destructive/10 border border-destructive/30 text-destructive rounded-lg flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Full Name (Sign Up Only) */}
              {mode === "signup" && (
                <Field>
                  <FieldLabel htmlFor="name">Full Name</FieldLabel>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoComplete="name"
                    required
                  />
                </Field>
              )}

              {/* Username (Sign Up Only) */}
              {mode === "signup" && (
                <Field>
                  <FieldLabel htmlFor="username">Username</FieldLabel>
                  <Input
                    id="username"
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    autoComplete="off"
                    required
                  />
                </Field>
              )}

              {/* Mobile Number (Sign Up Only) */}
              {mode === "signup" && (
                <Field>
                  <FieldLabel htmlFor="phone">Mobile Number</FieldLabel>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter mobile number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    autoComplete="tel"
                  />
                </Field>
              )}

              {/* Email */}
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                />
              </Field>

              {/* Password */}
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  {mode === "login" && (
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        alert("Password reset email feature coming soon.")
                      }}
                      className="ms-auto inline-block text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  )}
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete={mode === "login" ? "current-password" : "new-password"}
                  required
                />
              </Field>

              {/* Confirm Password (Sign Up Only) */}
              {mode === "signup" && (
                <Field>
                  <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    autoComplete="new-password"
                    required
                  />
                </Field>
              )}

              <Field className="space-y-3 pt-1">
                <Button type="submit" className="w-full" disabled={loading || googleLoading}>
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      {mode === "login" ? "Logging in..." : "Creating Account..."}
                    </>
                  ) : (
                    mode === "login" ? "Login" : "Sign Up"
                  )}
                </Button>

                <Button
                  variant="outline"
                  type="button"
                  className="w-full"
                  onClick={handleGoogleSignIn}
                  disabled={loading || googleLoading}
                >
                  {googleLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Connecting...
                    </>
                  ) : (
                    "Login with Google"
                  )}
                </Button>

                <FieldDescription className="text-center pt-2">
                  {mode === "login" ? (
                    <>
                      Don&apos;t have an account?{" "}
                      <button
                        type="button"
                        onClick={() => {
                          setMode("signup")
                          navigate("/signup")
                        }}
                        className="underline underline-offset-4 hover:text-primary font-semibold"
                      >
                        Sign up
                      </button>
                    </>
                  ) : (
                    <>
                      Already have an account?{" "}
                      <button
                        type="button"
                        onClick={() => {
                          setMode("login")
                          navigate("/login")
                        }}
                        className="underline underline-offset-4 hover:text-primary font-semibold"
                      >
                        Log in
                      </button>
                    </>
                  )}
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
