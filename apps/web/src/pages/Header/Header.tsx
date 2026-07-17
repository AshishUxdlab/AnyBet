import React from 'react'
import { Skeleton } from "@workspace/ui/components/skeleton"
import { Button } from "@workspace/ui/components/button"
import { SidebarTrigger } from "@workspace/ui/components/sidebar"
import { Bell } from "lucide-react"

interface HeaderProps {
  loading?: boolean;
}

const Header = ({ loading = false }: HeaderProps) => {
  return (
    <header className="flex items-center justify-between px-4 py-4 border-b">
      {loading ? (
        <Skeleton className="h-6 w-6" />
      ) : (
        <SidebarTrigger className="md:hidden" />
      )}
      
      {loading ? (
        <Skeleton className="h-6 w-24" />
      ) : (
        <span className="text-lg font-semibold">ANYBET</span>
      )}

      {loading ? (
        <Skeleton className="h-8 w-8 rounded-full" />
      ) : (
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary" />
        </Button>
      )}
    </header>
  )
}

export default Header