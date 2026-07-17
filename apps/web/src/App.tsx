import { RouterProvider } from "react-router-dom"
import { TooltipProvider } from "@workspace/ui/components/tooltip"
import { router } from "@/routes/routes"

export function App() {
  return (
    <TooltipProvider>
      <RouterProvider router={router} />
    </TooltipProvider>
  )
}
