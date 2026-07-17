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
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/50 backdrop-blur-lg lg:hidden">
      <div className="mx-auto flex h-16 max-w-lg items-center justify-around px-2">
        {navItems.map((item) => {
          const isActive =
            location.pathname === item.path ||
            (item.path !== "/" && location.pathname.startsWith(item.path))

          return (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className="flex flex-1 flex-col items-center justify-center text-xs outline-none"
            >
              <div
                className={cn(
                  "flex flex-col items-center justify-center gap-1 rounded-full py-1.5 px-4 transition-all duration-300 ease-in-out",
                  isActive
                    ? "bg-primary/[0.07] text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/20"
                )}
              >
                <item.icon
                  className="size-5 transition-all duration-300"
                  strokeWidth={2}
                />
                <span className="text-[10px] font-medium transition-all duration-300">
                  {item.label}
                </span>
              </div>
            </button>
          )
        })}
      </div>
      {/* Safe area spacer for iOS notch devices */}
      <div className="h-[env(safe-area-inset-bottom)]" />
    </nav>
  )
}
