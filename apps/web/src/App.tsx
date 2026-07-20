import { useEffect } from "react"
import { RouterProvider } from "react-router-dom"
import { TooltipProvider } from "@workspace/ui/components/tooltip"
import { Provider } from "react-redux"
import { store } from "@/store/store"
import { router } from "@/routes/routes"
import { NotificationProvider } from "@/context/NotificationContext"
import { auth, db } from "@/Firebase/firebase"
import { onAuthStateChanged } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
import { useAppDispatch } from "@/store/hooks"
import { setUser, clearUser } from "@/store/slices/authSlice"
import { Toaster } from "@workspace/ui/components/sonner"

export function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        let coins = 0
        let username = ""
        let name = user.displayName || ""
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid))
          if (userDoc.exists()) {
            const data = userDoc.data()
            coins = data.coins || 0
            username = data.username || ""
            name = data.name || name
          }
        } catch (err) {
          console.error("Error fetching user data:", err)
        }

        dispatch(setUser({
          uid: user.uid,
          email: user.email,
          name: name,
          username: username,
          coins: coins
        }))
      } else {
        dispatch(clearUser())
      }
    })

    return () => unsubscribe()
  }, [dispatch])

  return (
    <Provider store={store}>
      <NotificationProvider>
        <TooltipProvider>
          <RouterProvider router={router} />
          <Toaster />
        </TooltipProvider>
      </NotificationProvider>
    </Provider>
  )
}


