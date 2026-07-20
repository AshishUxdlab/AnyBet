import { RouterProvider } from "react-router-dom"
import { TooltipProvider } from "@workspace/ui/components/tooltip"
import { Provider } from "react-redux"
import { store } from "@/store/store"
import { router } from "@/routes/routes"
import { NotificationProvider } from "@/context/NotificationContext"

export function App() {
  return (
    <Provider store={store}>
      <NotificationProvider>
        <TooltipProvider>
          <RouterProvider router={router} />
        </TooltipProvider>
      </NotificationProvider>
    </Provider>
  )
}


