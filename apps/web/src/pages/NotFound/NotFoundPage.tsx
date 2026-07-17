import { useNavigate } from "react-router-dom"
import { Button } from "@workspace/ui/components/button"
import { HomeIcon } from "lucide-react"

export default function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-background px-4 text-center">
      <img
        src="/images/404.gif"
        alt="Page not found"
        className="mb-8 w-full max-w-md rounded-2xl"
      />
      <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
        Page Not Found
      </h1>
      <p className="mt-3 text-base text-muted-foreground sm:text-lg">
        Oops! The page you're looking for doesn't exist or has been moved.
      </p>
      <Button
        onClick={() => navigate("/")}
        className="mt-8 gap-2"
        size="lg"
      >
        <HomeIcon className="size-4" />
        Back to Home
      </Button>
    </div>
  )
}
