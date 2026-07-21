import React from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { Bell } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import { useNotifications } from "@/context/NotificationContext"
import { cn } from "@workspace/ui/lib/utils"

export const NotificationCenter: React.FC = () => {
  const { unreadCount } = useNotifications()
  const navigate = useNavigate()
  const location = useLocation()

  const isActive = location.pathname === "/notifications"

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => navigate("/notifications")}
      className={cn(
        "relative transition-colors hover:bg-accent/60",
        isActive && "bg-accent text-primary"
      )}
      title="Notifications"
    >
      <Bell className="h-5 w-5" />
      {unreadCount > 0 && (
        <span className="absolute top-1.5 right-1.5 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-primary border-2 border-background" />
        </span>
      )}
    </Button>
  )
}
