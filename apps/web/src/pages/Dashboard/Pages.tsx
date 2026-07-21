import { AppSidebar } from "@/components/app-sidebar"
import { BottomNavbar } from "@/components/bottom-navbar"
import {
  SidebarInset,
  SidebarProvider,
} from "@workspace/ui/components/sidebar"
import { Button } from "@workspace/ui/components/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@workspace/ui/components/card"
import { Input } from "@workspace/ui/components/input"
import { Skeleton } from "@workspace/ui/components/skeleton"
import { Avatar, AvatarFallback, AvatarImage } from "@workspace/ui/components/avatar"
import { Sparkles, Plus, Clock, Trophy, Dumbbell, Gamepad2 } from "lucide-react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAppSelector } from "@/store/hooks"

import Header from "../Header/Header"

const iconComponentMap: Record<string, any> = {
    trophy: Trophy,
    dumbbell: Dumbbell,
    gamepad: Gamepad2,
    sparkles: Sparkles,
}

export default function Page() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const challenges = useAppSelector((state) => state.challenges.challenges)
  
  // Get at most 5 live challenges
  const liveChallenges = challenges.filter(c => c.isLive).slice(0, 5)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 72)",
            "--header-height": "calc(var(--spacing) * 12)",
          } as React.CSSProperties
        }
      >
        <AppSidebar variant="inset" />
        <SidebarInset className="animate-in fade-in duration-500 ease-in-out w-full overflow-x-hidden">

          <Header loading={loading} />

          <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-6 space-y-4 pb-24 w-full">

            <section className="">
              {loading ? (
                <>
                  <Skeleton className="h-8 w-48" />
                  <Skeleton className="h-4 w-64" />
                </>
              ) : (
                <>
                  <h2 className="text-2xl font-bold tracking-tight">
                    Hello, <span className="text-primary">Player One</span>
                  </h2>
                  <p className="text-muted-foreground text-sm">
                    The house always wins, unless the AI settles it.
                  </p>
                </>
              )}
            </section>

            <section>
              {loading ? (
                <Skeleton className="h-[120px] w-full" />
              ) : (
                <Card>
                  <CardHeader className="">
                    <CardTitle className="text-sm  uppercase text-primary">Quick Bet Entry</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2">
                      <Input placeholder="Example: I bet I can..." className="flex-1" />
                      <Button>
                        GENERATE <Sparkles className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </section>

            <section className="space-y-4">
              <div className="flex items-center justify-between">
                {loading ? (
                  <Skeleton className="h-5 w-32" />
                ) : (
                  <h3 className="text-sm font-medium uppercase">Live Challenges</h3>
                )}
                {!loading && (
                  <Button variant="link" size="sm" className="h-auto p-0 text-primary">View all</Button>
                )}
              </div>

              <div className="flex overflow-x-auto gap-4 pb-2 -mx-4 px-4 snap-x [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {loading ? (
                  <>
                    <Skeleton className="h-[200px] w-[250px] shrink-0" />
                    <Skeleton className="h-[200px] w-[250px] shrink-0" />
                  </>
                ) : liveChallenges.length > 0 ? (
                  liveChallenges.map((challenge) => (
                    <Card key={challenge.id} onClick={() => navigate("/challenges/trending")} className="w-[250px] shrink-0 snap-start flex flex-col cursor-pointer hover:border-primary/50 transition-colors">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                            <span className="mr-1 h-1.5 w-1.5 rounded-full bg-primary"></span>
                            LIVE
                          </span>
                          <span className="text-sm font-medium">{challenge.potAmount} POT</span>
                        </div>
                        <CardTitle className="text-base mt-2">{challenge.title}</CardTitle>
                        <CardDescription className="line-clamp-1">{challenge.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="mt-auto">
                        <div className="flex items-center">
                          <div className="flex -space-x-2">
                            {challenge.avatars.length > 0 ? (
                                challenge.avatars.map((img, idx) => (
                                    <Avatar key={idx} className="h-8 w-8 border-2 border-background">
                                        <AvatarImage src={img} />
                                        <AvatarFallback>U{idx + 1}</AvatarFallback>
                                    </Avatar>
                                ))
                            ) : (
                                <Avatar className="h-8 w-8 border-2 border-background">
                                    <AvatarFallback>U1</AvatarFallback>
                                </Avatar>
                            )}
                          </div>
                          <span className="ml-2 text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">{challenge.participantsCount}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                    <div className="text-sm text-muted-foreground italic w-full text-center py-4">No live challenges found.</div>
                )}
              </div>
            </section>

            <section className="space-y-4">
              {loading ? (
                <Skeleton className="h-5 w-40" />
              ) : (
                <h3 className="text-sm font-medium uppercase">Popular Categories</h3>
              )}

              <div className="grid gap-4">
                {loading ? (
                  <Skeleton className="h-[120px] w-full" />
                ) : (
                  <Card onClick={() => navigate("/challenges/create")} className="cursor-pointer hover:border-primary/50 transition-colors">
                    <CardContent className="">
                      <div className="flex justify-between items-start ">
                        <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
                          <Trophy className="h-6 w-6" />
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-semibold">$12,400</div>
                          <div className="text-xs text-muted-foreground ">Volume Today</div>
                        </div>
                      </div>
                      <CardTitle className="text-lg">Elite Sports Prediction</CardTitle>
                    </CardContent>
                  </Card>
                )}
              </div>
            </section>
          </main>

          {!loading && (
            <Button size="icon" className="fixed bottom-24 right-6 h-11 w-11 rounded-full shadow-lg z-40">
              <Plus className="h-6 w-6" />
            </Button>
          )}

        </SidebarInset>
      </SidebarProvider>
      <BottomNavbar />
    </>
  )
}
