import { createBrowserRouter } from "react-router-dom"
import DashboardPage from "@/pages/Dashboard/Pages"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardPage />,
  },
  {
    path: "/dashboard",
    element: <DashboardPage />,
  },
])
