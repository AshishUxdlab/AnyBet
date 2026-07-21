import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { AppSidebar } from "@/components/app-sidebar"
import { BottomNavbar } from "@/components/bottom-navbar"
import Header from "../Header/Header"
import {
  SidebarInset,
  SidebarProvider,
} from "@workspace/ui/components/sidebar"
import { Card, CardContent } from "@workspace/ui/components/card"
import { Button } from "@workspace/ui/components/button"
import { Badge } from "@workspace/ui/components/badge"
import { Skeleton } from "@workspace/ui/components/skeleton"
import { Tabs, TabsList, TabsTrigger } from "@workspace/ui/components/tabs"
import {
  CheckCheck,
  Trash2,
  Trophy,
  Wallet,
  Sparkles,
  ChevronRight,
  Inbox,
  ArrowLeft,
} from "lucide-react"
import { useNotifications, type NotificationItem } from "@/context/NotificationContext"
import { cn } from "@workspace/ui/lib/utils"

export default function NotificationsPage() {
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAll,
  } = useNotifications()

  const [loading, setLoading] = useState(true)
  const [filter, setFilterState] = useState<string>("all")
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 600)
    return () => clearTimeout(timer)
  }, [])

  const filteredNotifications = notifications.filter((item) => {
    if (filter === "unread") return item.unread
    if (filter === "challenge") return item.type === "challenge"
    if (filter === "wallet") return item.type === "wallet"
    if (filter === "system") return item.type === "system"
    return true
  })

  const getIcon = (type: NotificationItem["type"]) => {
    switch (type) {
      case "challenge":
        return <Trophy className="h-4 w-4 text-primary shrink-0" />
      case "wallet":
        return <Wallet className="h-4 w-4 text-primary shrink-0" />
      case "system":
      default:
        return <Sparkles className="h-4 w-4 text-primary shrink-0" />
    }
  }

  const handleNotificationClick = (item: NotificationItem) => {
    if (item.unread) {
      markAsRead(item.id)
    }
    if (item.link) {
      navigate(item.link)
    }
  }

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
        <SidebarInset className="bg-background animate-in fade-in duration-500 ease-in-out min-h-screen flex flex-col">
          <Header loading={loading} showBackButton={true} title="NOTIFICATIONS" />

          <main className="flex-1 overflow-auto p-4 md:p-6 space-y-4 pb-24 max-w-md mx-auto w-full">
            {/* Top Navigation & Action Header */}
            <div className="flex items-center justify-between gap-2 pt-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate(-1)}
                className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground p-0 h-auto font-medium text-xs"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back</span>
              </Button>

              <div className="flex items-center gap-2">
                <span className="text-sm font-bold tracking-wide uppercase text-foreground">
                  Notifications
                </span>
                {unreadCount > 0 && (
                  <Badge className="bg-primary/10 text-primary border-primary/20 text-[10px] font-bold px-2 py-0.5">
                    {unreadCount} NEW
                  </Badge>
                )}
              </div>

              <div className="flex items-center gap-1">
                {unreadCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={markAllAsRead}
                    className="h-7 px-2 text-xs font-semibold text-muted-foreground hover:text-primary"
                    title="Mark all read"
                  >
                    <CheckCheck className="h-3.5 w-3.5 mr-1 text-primary" />
                    Read
                  </Button>
                )}
                {notifications.length > 0 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={clearAll}
                    className="h-7 w-7 text-muted-foreground hover:text-destructive"
                    title="Clear all"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                )}
              </div>
            </div>

            {loading ? (
              <div className="space-y-3 pt-2">
                <Skeleton className="h-10 w-full rounded-lg" />
                <Skeleton className="h-20 w-full rounded-xl" />
                <Skeleton className="h-20 w-full rounded-xl" />
                <Skeleton className="h-20 w-full rounded-xl" />
              </div>
            ) : (
              <Tabs value={filter} onValueChange={setFilterState} className="w-full space-y-4">
                {/* Standard UI Tabs Component */}
                <TabsList className="grid w-full grid-cols-4 sm:grid-cols-4">
                  <TabsTrigger value="all" className="text-xs font-semibold">
                    ALL
                  </TabsTrigger>
                  <TabsTrigger value="unread" className="text-xs font-semibold">
                    UNREAD ({unreadCount})
                  </TabsTrigger>
                  <TabsTrigger value="challenge" className="text-xs font-semibold">
                    CHALLENGES
                  </TabsTrigger>
                  <TabsTrigger value="wallet" className="text-xs font-semibold">
                    WALLET
                  </TabsTrigger>
                </TabsList>

                {/* Notifications Content */}
                <div className="space-y-3">
                  {filteredNotifications.length > 0 ? (
                    filteredNotifications.map((item) => (
                      <Card
                        key={item.id}
                        onClick={() => handleNotificationClick(item)}
                        className={cn(
                          "group transition-all duration-200 cursor-pointer border hover:border-primary/40 relative overflow-hidden",
                          item.unread
                            ? "bg-primary/5 border-primary/20"
                            : "bg-card hover:bg-card/90"
                        )}
                      >
                        {item.unread && (
                          <span className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />
                        )}

                        <CardContent className="p-4 flex items-start gap-3">
                          <div className="p-2 rounded-lg bg-secondary/50 border border-border/50 shrink-0">
                            {getIcon(item.type)}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                              <h3
                                className={cn(
                                  "text-xs font-bold truncate",
                                  item.unread ? "text-foreground" : "text-muted-foreground"
                                )}
                              >
                                {item.title}
                              </h3>
                              <span className="text-[10px] text-muted-foreground shrink-0">
                                {item.timestamp}
                              </span>
                            </div>

                            <p className="text-xs text-muted-foreground mt-1 leading-relaxed line-clamp-2">
                              {item.message}
                            </p>

                            {item.link && (
                              <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary mt-2 group-hover:underline">
                                <span>VIEW DETAILS</span>
                                <ChevronRight className="h-3 w-3" />
                              </div>
                            )}
                          </div>

                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => {
                              e.stopPropagation()
                              deleteNotification(item.id)
                            }}
                            className="opacity-0 group-hover:opacity-100 transition-opacity h-7 w-7 text-muted-foreground hover:text-destructive shrink-0"
                            title="Delete"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <Card>
                      <CardContent className="flex flex-col items-center justify-center p-10 text-center space-y-2">
                        <div className="p-3 rounded-full bg-secondary/50 text-muted-foreground">
                          <Inbox className="h-8 w-8 text-primary" />
                        </div>
                        <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">
                          No Notifications
                        </h3>
                        <p className="text-xs text-muted-foreground max-w-xs">
                          {filter === "unread"
                            ? "You've read all your notifications!"
                            : "You have no notifications in this category."}
                        </p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </Tabs>
            )}
          </main>
        </SidebarInset>
      </SidebarProvider>

      <BottomNavbar />
    </>
  )
}
