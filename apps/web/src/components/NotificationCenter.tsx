import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  Bell,
  CheckCheck,
  Trash2,
  Trophy,
  Wallet,
  Sparkles,
  ChevronRight,
  Inbox,
  Filter,
} from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import { Badge } from "@workspace/ui/components/badge"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@workspace/ui/components/sheet"
import { useNotifications, type NotificationItem } from "@/context/NotificationContext"
import { cn } from "@workspace/ui/lib/utils"

export const NotificationCenter: React.FC = () => {
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAll,
  } = useNotifications()

  const [filter, setFilter] = useState<"all" | "unread" | "challenge" | "wallet">("all")
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const filteredNotifications = notifications.filter((item) => {
    if (filter === "unread") return item.unread
    if (filter === "challenge") return item.type === "challenge"
    if (filter === "wallet") return item.type === "wallet"
    return true
  })

  const getIcon = (type: NotificationItem["type"]) => {
    switch (type) {
      case "challenge":
        return <Trophy className="h-4 w-4 text-amber-400 shrink-0" />
      case "wallet":
        return <Wallet className="h-4 w-4 text-emerald-400 shrink-0" />
      case "system":
      default:
        return <Sparkles className="h-4 w-4 text-cyan-400 shrink-0" />
    }
  }

  const handleNotificationClick = (item: NotificationItem) => {
    if (item.unread) {
      markAsRead(item.id)
    }
    if (item.link) {
      setOpen(false)
      navigate(item.link)
    }
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative hover:bg-accent/60">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500 border-2 border-background" />
            </span>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-full sm:max-w-md p-0 bg-zinc-950 text-zinc-100 border-l border-zinc-800 flex flex-col justify-between shadow-2xl z-[100]"
      >
        {/* Header */}
        <SheetHeader className="p-4 border-b border-zinc-800 flex flex-row items-center justify-between shrink-0 space-y-0">
          <div className="flex items-center gap-2">
            <SheetTitle className="text-base font-bold text-white">Notifications</SheetTitle>
            {unreadCount > 0 ? (
              <Badge variant="secondary" className="bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 text-xs px-2 py-0.5">
                {unreadCount} new
              </Badge>
            ) : (
              <Badge variant="outline" className="text-xs text-zinc-400 border-zinc-700">
                0 unread
              </Badge>
            )}
          </div>

          <div className="flex items-center gap-1 mr-6">
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={markAllAsRead}
                className="h-8 px-2 text-xs text-zinc-400 hover:text-white hover:bg-zinc-900"
                title="Mark all as read"
              >
                <CheckCheck className="h-3.5 w-3.5 mr-1 text-cyan-400" />
                Mark read
              </Button>
            )}
            {notifications.length > 0 && (
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={clearAll}
                className="h-8 w-8 text-zinc-400 hover:text-red-400 hover:bg-zinc-900"
                title="Clear all"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        </SheetHeader>

        {/* Filter Tabs */}
        <div className="grid grid-cols-4 gap-1.5 px-3.5 py-2.5 border-b border-zinc-800/80 bg-zinc-900/60 shrink-0">
          {(["all", "unread", "challenge", "wallet"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={cn(
                "text-xs py-1 px-1 rounded-lg font-medium transition-all capitalize text-center truncate",
                filter === tab
                  ? "bg-cyan-500 text-black font-semibold shadow-md shadow-cyan-500/20"
                  : "bg-zinc-800/80 text-zinc-300 hover:bg-zinc-700 hover:text-white border border-zinc-700/50"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Notification List */}
        <div className="flex-1 overflow-y-auto divide-y divide-zinc-800/60 p-2 space-y-1">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((item) => (
              <div
                key={item.id}
                onClick={() => handleNotificationClick(item)}
                className={cn(
                  "flex items-start gap-3.5 p-3.5 rounded-xl transition-all cursor-pointer group hover:bg-zinc-900 border border-transparent hover:border-zinc-800 relative",
                  item.unread && "bg-cyan-950/20 border-cyan-900/30"
                )}
              >
                {/* Unread Indicator Bar */}
                {item.unread && (
                  <span className="absolute left-1 top-3.5 bottom-3.5 w-1 bg-cyan-400 rounded-full shadow-sm shadow-cyan-400/50" />
                )}

                {/* Icon Box */}
                <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 group-hover:scale-105 transition-transform shrink-0 shadow-inner">
                  {getIcon(item.type)}
                </div>

                {/* Text Content */}
                <div className="flex-1 min-w-0 pr-1">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className={cn("text-xs font-semibold truncate", item.unread ? "text-white" : "text-zinc-400")}>
                      {item.title}
                    </h4>
                    <span className="text-[10px] text-zinc-500 shrink-0">{item.timestamp}</span>
                  </div>
                  <p className="text-xs text-zinc-300/90 mt-1 line-clamp-2 leading-relaxed">
                    {item.message}
                  </p>

                  {item.link && (
                    <span className="inline-flex items-center gap-1 text-[11px] text-cyan-400 font-medium mt-2 group-hover:underline">
                      View details
                      <ChevronRight className="h-3 w-3" />
                    </span>
                  )}
                </div>

                {/* Quick Action Delete */}
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    deleteNotification(item.id)
                  }}
                  className="opacity-0 group-hover:opacity-100 transition-opacity p-1 text-zinc-500 hover:text-red-400 shrink-0"
                  title="Remove"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center p-12 text-center h-full">
              <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 text-zinc-500 mb-3 shadow-inner">
                <Inbox className="h-8 w-8" />
              </div>
              <p className="text-sm font-semibold text-white">No notifications</p>
              <p className="text-xs text-zinc-400 mt-1 max-w-[220px]">
                {filter === "unread" ? "You've read all your notifications!" : "You have no notifications in this category."}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        {notifications.length > 0 && (
          <div className="p-3 border-t border-zinc-800 bg-zinc-900/80 text-center shrink-0">
            <p className="text-xs text-zinc-400 font-medium">
              Showing {filteredNotifications.length} of {notifications.length} notifications
            </p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
