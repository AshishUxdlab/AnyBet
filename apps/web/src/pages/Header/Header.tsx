import { Skeleton } from "@workspace/ui/components/skeleton"
import { NotificationCenter } from "@/components/NotificationCenter"
import { ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { Button } from "@workspace/ui/components/button"

interface HeaderProps {
  loading?: boolean;
  title?: string;
  showBackButton?: boolean;
}

const Header = ({ loading = false, title = "ANYBET", showBackButton = false }: HeaderProps) => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b flex items-center justify-between px-4 py-4">
      {showBackButton ? (
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="h-8 w-8 -ml-2 hover:bg-accent/60">
           <ArrowLeft className="h-5 w-5" />
        </Button>
      ) : loading ? (
        <Skeleton className="h-8 w-8 -ml-2 rounded-full" />
      ) : (
        <img src="/images/Group%201171279597%201.png" alt="Logo" className="h-8 w-8 -ml-2 object-contain" />
      )}
      
      {loading ? (
        <Skeleton className="h-6 w-24" />
      ) : (
        <span className="text-lg font-semibold">{title}</span>
      )}

      {loading ? (
        <Skeleton className="h-8 w-8 rounded-full" />
      ) : (
        <NotificationCenter />
      )}
    </header>
  )
}

export default Header