import React, { useState } from "react"
import {
  Bell,
  Volume2,
  Trophy,
  Wallet,
  Mail,
  ShieldCheck,
  Check,
} from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@workspace/ui/components/sheet"
import { Button } from "@workspace/ui/components/button"
import { Checkbox } from "@workspace/ui/components/checkbox"

interface NotificationPreferencesModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const NotificationPreferencesModal: React.FC<NotificationPreferencesModalProps> = ({
  open,
  onOpenChange,
}) => {
  const [preferences, setPreferences] = useState({
    push: true,
    sound: true,
    challenges: true,
    wallet: true,
    email: false,
    marketing: false,
  })

  const [saved, setSaved] = useState(false)

  const toggle = (key: keyof typeof preferences) => {
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }))
    setSaved(false)
  }

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => {
      setSaved(false)
      onOpenChange(false)
    }, 800)
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-md p-6 bg-background flex flex-col justify-between">
        <div>
          <SheetHeader className="p-0 pb-6 border-b border-border/40">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-500 border border-cyan-500/20">
                <Bell className="h-5 w-5" />
              </div>
              <div>
                <SheetTitle className="text-lg font-semibold">Notification Preferences</SheetTitle>
                <SheetDescription className="text-xs text-muted-foreground">
                  Customize how and when you receive notifications on AnyBet.
                </SheetDescription>
              </div>
            </div>
          </SheetHeader>

          <div className="py-6 space-y-6">
            {/* Direct Alerts */}
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                General Alerts
              </h4>
              <div className="space-y-3">
                <label className="flex items-start justify-between p-3.5 rounded-xl bg-card border border-border/50 hover:border-border transition-colors cursor-pointer">
                  <div className="flex items-start gap-3">
                    <Bell className="h-4 w-4 text-cyan-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-foreground">In-App Push Notifications</p>
                      <p className="text-xs text-muted-foreground">Receive real-time popups while active</p>
                    </div>
                  </div>
                  <Checkbox
                    checked={preferences.push}
                    onCheckedChange={() => toggle("push")}
                  />
                </label>

                <label className="flex items-start justify-between p-3.5 rounded-xl bg-card border border-border/50 hover:border-border transition-colors cursor-pointer">
                  <div className="flex items-start gap-3">
                    <Volume2 className="h-4 w-4 text-purple-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Notification Sound</p>
                      <p className="text-xs text-muted-foreground">Play alert audio sound on new updates</p>
                    </div>
                  </div>
                  <Checkbox
                    checked={preferences.sound}
                    onCheckedChange={() => toggle("sound")}
                  />
                </label>
              </div>
            </div>

            {/* Category Preferences */}
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                Categories
              </h4>
              <div className="space-y-3">
                <label className="flex items-start justify-between p-3.5 rounded-xl bg-card border border-border/50 hover:border-border transition-colors cursor-pointer">
                  <div className="flex items-start gap-3">
                    <Trophy className="h-4 w-4 text-amber-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Challenge Updates & Invites</p>
                      <p className="text-xs text-muted-foreground">Challenge wins, friend bets & reminders</p>
                    </div>
                  </div>
                  <Checkbox
                    checked={preferences.challenges}
                    onCheckedChange={() => toggle("challenges")}
                  />
                </label>

                <label className="flex items-start justify-between p-3.5 rounded-xl bg-card border border-border/50 hover:border-border transition-colors cursor-pointer">
                  <div className="flex items-start gap-3">
                    <Wallet className="h-4 w-4 text-emerald-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Wallet & Transactions</p>
                      <p className="text-xs text-muted-foreground">Deposits, withdrawals, & cash rewards</p>
                    </div>
                  </div>
                  <Checkbox
                    checked={preferences.wallet}
                    onCheckedChange={() => toggle("wallet")}
                  />
                </label>

                <label className="flex items-start justify-between p-3.5 rounded-xl bg-card border border-border/50 hover:border-border transition-colors cursor-pointer">
                  <div className="flex items-start gap-3">
                    <Mail className="h-4 w-4 text-blue-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Email Digests</p>
                      <p className="text-xs text-muted-foreground">Weekly activity and leaderboards</p>
                    </div>
                  </div>
                  <Checkbox
                    checked={preferences.email}
                    onCheckedChange={() => toggle("email")}
                  />
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-border/40">
          <Button
            onClick={handleSave}
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-medium gap-2"
          >
            {saved ? (
              <>
                <Check className="h-4 w-4" /> Preferences Saved!
              </>
            ) : (
              <>
                <ShieldCheck className="h-4 w-4" /> Save Preferences
              </>
            )}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
