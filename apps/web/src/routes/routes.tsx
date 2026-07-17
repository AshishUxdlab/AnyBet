import { createBrowserRouter } from "react-router-dom"
import DashboardPage from "@/pages/Dashboard/Pages"
import NotFoundPage from "@/pages/NotFound/NotFoundPage"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardPage />,
  },
  {
    path: "/dashboard",
    element: <DashboardPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
])

