import * as React from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { cn } from "@workspace/ui/lib/utils"
import {
  HomeIcon,
  TrophyIcon,
  WalletIcon,
  ActivityIcon,
  UserIcon,
} from "lucide-react"

const navItems = [
  { label: "Home", icon: HomeIcon, path: "/" },
  { label: "Challenges", icon: TrophyIcon, path: "/challenges" },
  { label: "Wallet", icon: WalletIcon, path: "/wallet" },
  { label: "Activity", icon: ActivityIcon, path: "/activity" },
  { label: "Profile", icon: UserIcon, path: "/profile" },
]

export function BottomNavbar() {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/80 backdrop-blur-lg lg:hidden">
      <div className="mx-auto flex h-16 max-w-lg items-center justify-around px-2">
        {navItems.map((item) => {
          const isActive =
            location.pathname === item.path ||
            (item.path !== "/" && location.pathname.startsWith(item.path))

          return (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className={cn(
                "group flex flex-1 flex-col items-center justify-center gap-1 rounded-lg py-1 text-xs transition-colors",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full transition-all",
                  isActive && "bg-primary/10"
                )}
              >
                <item.icon
                  className={cn(
                    "size-5 transition-all",
                    isActive && "scale-110"
                  )}
                  strokeWidth={isActive ? 2.5 : 1.5}
                />
              </div>
              <span
                className={cn(
                  "text-[10px] font-medium transition-all",
                  isActive && "font-semibold"
                )}
              >
                {item.label}
              </span>
            </button>
          )
        })}
      </div>
      {/* Safe area spacer for iOS notch devices */}
      <div className="h-[env(safe-area-inset-bottom)]" />
    </nav>
  )
}
