import { createBrowserRouter } from "react-router-dom"
import DashboardPage from "@/pages/Dashboard/Pages"
import NotFoundPage from "@/pages/NotFound/NotFoundPage"
import CategoryPage from "@/pages/Categories/Category"
import JoinChallengePage from "@/pages/Categories/JoinChallenge"
import TrendingChellangesPage from "@/pages/Categories/TrendingChellanges"
import WalletPage from "@/pages/Wallets/Wallet"
import DepositPage from "@/pages/Wallets/Deposit"
import WithdrawalPage from "@/pages/Wallets/Withdrawal"
import ProfilePage from "@/pages/Profile/Profile"
import EditProfilePage from "@/pages/Profile/EditProfile"
import ActivityPage from "@/pages/Activity/Activity"
import LoginPage from "@/pages/Login/Login"
import SignUpPage from "@/pages/SignUp/SignUp"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignUpPage />,
  },
  {
    path: "/dashboard",
    element: <DashboardPage />,
  },
  {
    path: "/challenges",
    element: <TrendingChellangesPage />,
  },
  {
    path: "/challenges/trending",
    element: <TrendingChellangesPage />,
  },
  {
    path: "/challenges/create",
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
    path: "/wallet/deposit",
    element: <DepositPage />,
  },
  {
    path: "/wallet/withdraw",
    element: <WithdrawalPage />,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
  },
  {
    path: "/profile/edit",
    element: <EditProfilePage />,
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
