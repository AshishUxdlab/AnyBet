import { Skeleton } from "@workspace/ui/components/skeleton"
import { SidebarTrigger } from "@workspace/ui/components/sidebar"
import { NotificationCenter } from "@/components/NotificationCenter"

interface HeaderProps {
  loading?: boolean;
  title?: string;
  showSidebarTrigger?: boolean;
}

const Header = ({ loading = false, title = "ANYBET", showSidebarTrigger = true }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b flex items-center justify-between px-4 py-4">
      {!showSidebarTrigger ? (
        <div className="h-6 w-6" /> // Placeholder for alignment
      ) : loading ? (
        <Skeleton className="h-6 w-6" />
      ) : (
        <SidebarTrigger className="md:hidden" />
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