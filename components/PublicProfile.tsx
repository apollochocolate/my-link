"use client"

import { LinkType } from "@/data/links"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { IconArrowUpRight, IconUser } from "@tabler/icons-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { trackLinkClick } from "@/app/actions/track"

interface PublicProfileProps {
  userId: string
  displayName: string
  bio?: string
  links: LinkType[]
}

export function PublicProfile({ userId, displayName, bio = "나만의 링크들을 한 곳에 모았습니다.", links }: PublicProfileProps) {
  const handleLinkClick = (linkId: string) => {
    trackLinkClick(userId, linkId).catch((error) => {
      console.error("[PublicProfile] Error tracking click:", error)
    })
  }

  return (
    <div className="flex h-full w-full flex-col bg-background text-foreground">
      <ScrollArea className="flex-1">
        <div className="flex flex-col items-center px-4 py-12 sm:px-6">
          <div className="flex w-full max-w-sm flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Profile Section */}
            <section className="flex flex-col items-center gap-4">
              <Avatar className="h-24 w-24 border-2 border-border/50 shadow-sm">
                <AvatarImage src={`https://api.dicebear.com/7.x/notionists/svg?seed=${displayName}`} alt={displayName} />
                <AvatarFallback className="bg-muted">
                  <IconUser className="h-10 w-10 text-muted-foreground" stroke={1.5} />
                </AvatarFallback>
              </Avatar>
              <div className="space-y-1.5 text-center">
                <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
                  @{displayName}
                </h1>
                <p className="text-sm font-medium text-muted-foreground">
                  {bio}
                </p>
              </div>
            </section>

            {/* Links Section */}
            <section className="flex w-full flex-col gap-3">
              {links.length === 0 ? (
                <div className="py-10 text-center text-sm text-muted-foreground">
                  아직 등록된 링크가 없습니다.
                </div>
              ) : (
                links.map((link) => (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleLinkClick(link.id)}
                    className="group block w-full rounded-xl transition-all outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    <Card className="relative flex flex-row items-center gap-4 overflow-hidden border-border bg-card p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:bg-accent/50">
                      <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted ring-1 ring-border/50">
                        <img
                          src={`https://s2.googleusercontent.com/s2/favicons?domain=${link.url}&sz=64`}
                          alt={link.title}
                          className="h-5 w-5 rounded-sm bg-transparent"
                          width={20}
                          height={20}
                        />
                      </div>
                      <span className="relative z-10 flex-1 font-semibold text-card-foreground transition-colors group-hover:text-primary">
                        {link.title}
                      </span>
                      <IconArrowUpRight
                        className="relative z-10 h-5 w-5 text-muted-foreground transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary"
                        stroke={1.5}
                      />
                    </Card>
                  </a>
                ))
              )}
            </section>
            
            <div className="mt-8 text-center">
              <span className="text-xs font-medium text-muted-foreground/50">Powered by MyLink</span>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}
