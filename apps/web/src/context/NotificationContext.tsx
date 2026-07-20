import React, { createContext, useContext } from "react"
import { useAppDispatch, useAppSelector } from "@/store/store"
import {
  markAsRead as markAsReadAction,
  markAllAsRead as markAllAsReadAction,
  deleteNotification as deleteNotificationAction,
  clearAll as clearAllAction,
  addNotification as addNotificationAction,
  setFilter as setFilterAction,
  type NotificationItem,
  type NotificationFilter,
} from "@/store/slices/notificationSlice"

export type { NotificationItem, NotificationFilter }

interface NotificationContextType {
  notifications: NotificationItem[]
  unreadCount: number
  filter: NotificationFilter
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  deleteNotification: (id: string) => void
  clearAll: () => void
  addNotification: (item: Omit<NotificationItem, "id" | "timestamp" | "unread">) => void
  setFilter: (filter: NotificationFilter) => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useAppDispatch()
  const { items: notifications, filter } = useAppSelector((state) => state.notifications)

  const unreadCount = notifications.filter((n) => n.unread).length

  const markAsRead = (id: string) => dispatch(markAsReadAction(id))
  const markAllAsRead = () => dispatch(markAllAsReadAction())
  const deleteNotification = (id: string) => dispatch(deleteNotificationAction(id))
  const clearAll = () => dispatch(clearAllAction())
  const addNotification = (item: Omit<NotificationItem, "id" | "timestamp" | "unread">) =>
    dispatch(addNotificationAction(item))
  const setFilter = (f: NotificationFilter) => dispatch(setFilterAction(f))

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        filter,
        markAsRead,
        markAllAsRead,
        deleteNotification,
        clearAll,
        addNotification,
        setFilter,
      }}
    >
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotifications = () => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error("useNotifications must be used within a NotificationProvider")
  }
  return context
}
