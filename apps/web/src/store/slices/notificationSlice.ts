import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export type NotificationItem = {
  id: string
  title: string
  message: string
  type: "challenge" | "wallet" | "system"
  unread: boolean
  timestamp: string
  link?: string
}

export type NotificationFilter = "all" | "unread" | "challenge" | "wallet"

interface NotificationState {
  items: NotificationItem[]
  filter: NotificationFilter
}

const STORAGE_KEY = "anybet_notifications"

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "1",
    title: "Challenge Won! 🎉",
    message: "You won the '100 Pushups Daily' challenge! ₹500 credited to your wallet.",
    type: "challenge",
    unread: true,
    timestamp: "10 mins ago",
    link: "/wallet",
  },
  {
    id: "2",
    title: "Deposit Successful 💰",
    message: "₹1,000 added to your AnyBet wallet via UPI (Txn: #ANY9872).",
    type: "wallet",
    unread: true,
    timestamp: "1 hour ago",
    link: "/wallet",
  },
  {
    id: "3",
    title: "New Challenge Challenge 🔥",
    message: "Vikram challenged you to '5km Weekend Run' for ₹200 pool.",
    type: "challenge",
    unread: true,
    timestamp: "3 hours ago",
    link: "/challenges",
  },
  {
    id: "4",
    title: "Streak Alert ⚡",
    message: "You are on a 5-day active challenge streak! Keep it going.",
    type: "system",
    unread: false,
    timestamp: "Yesterday",
    link: "/activity",
  },
  {
    id: "5",
    title: "Welcome to AnyBet 👋",
    message: "Complete your profile to unlock ₹50 bonus cash credit.",
    type: "system",
    unread: false,
    timestamp: "2 days ago",
    link: "/profile/edit",
  },
]

const loadInitialState = (): NotificationState => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      return {
        items: JSON.parse(saved),
        filter: "all",
      }
    }
  } catch (e) {
    console.error("Failed to load notifications from localStorage", e)
  }
  return {
    items: INITIAL_NOTIFICATIONS,
    filter: "all",
  }
}

const initialState: NotificationState = loadInitialState()

export const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    markAsRead: (state, action: PayloadAction<string>) => {
      const item = state.items.find((n) => n.id === action.payload)
      if (item) {
        item.unread = false
      }
      saveToStorage(state.items)
    },
    markAllAsRead: (state) => {
      state.items.forEach((n) => {
        n.unread = false
      })
      saveToStorage(state.items)
    },
    deleteNotification: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((n) => n.id !== action.payload)
      saveToStorage(state.items)
    },
    clearAll: (state) => {
      state.items = []
      saveToStorage(state.items)
    },
    addNotification: (
      state,
      action: PayloadAction<Omit<NotificationItem, "id" | "timestamp" | "unread">>
    ) => {
      const newItem: NotificationItem = {
        ...action.payload,
        id: Date.now().toString(),
        unread: true,
        timestamp: "Just now",
      }
      state.items.unshift(newItem)
      saveToStorage(state.items)
    },
    setFilter: (state, action: PayloadAction<NotificationFilter>) => {
      state.filter = action.payload
    },
  },
})

function saveToStorage(items: NotificationItem[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  } catch (e) {
    console.error("Failed to save notifications to localStorage", e)
  }
}

export const {
  markAsRead,
  markAllAsRead,
  deleteNotification,
  clearAll,
  addNotification,
  setFilter,
} = notificationSlice.actions

export default notificationSlice.reducer
