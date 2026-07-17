import { createBrowserRouter } from "react-router-dom"
import DashboardPage from "@/pages/Dashboard/Pages"
import NotFoundPage from "@/pages/NotFound/NotFoundPage"
import CategoryPage from "@/pages/Categories/Category"
import JoinChallengePage from "@/pages/Categories/JoinChallenge"
import WalletPage from "@/pages/Wallets/Wallet"
import ProfilePage from "@/pages/Profile/Profile"
import ActivityPage from "@/pages/Activity/Activity"

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
    path: "/challenges",
    element: <CategoryPage />,
  },
  {
    path: "/challenges/join",
    element: <JoinChallengePage />,
  },
  {
    path: "/wallet",
    element: <WalletPage />,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
  },
  {
    path: "/activity",
    element: <ActivityPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
])
