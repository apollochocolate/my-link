"use client"

import { useState } from "react"
import { dummyLinks, profileData, LinkType } from "@/data/links"
import { Card } from "@/components/ui/card"
import { IconUser, IconArrowUpRight } from "@tabler/icons-react"
import { AddLinkDialog } from "@/components/AddLinkDialog"

export default function Page() {
  const [links, setLinks] = useState<LinkType[]>(dummyLinks)

  const handleAddLink = (title: string, url: string) => {
    const newLink: LinkType = {
      id: Math.random().toString(36).substring(2, 9),
      title,
      url,
      createdAt: new Date().toISOString(),
    }

    // 새 링크를 가장 위에 추가 (최신순 정렬에 맞게)
    setLinks([newLink, ...links])
  }
  return (
    <main className="flex min-h-screen flex-col items-center overflow-x-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-50 via-white to-zinc-50 p-6 text-zinc-900 dark:from-zinc-900 dark:via-zinc-950 dark:to-zinc-950 dark:text-zinc-100">
      <div className="mt-12 mb-20 flex w-full max-w-lg animate-in flex-col gap-10 duration-700 fade-in slide-in-from-bottom-4">
        {/* Profile Section */}
        <section className="flex flex-col items-center gap-5">
          <div className="flex h-24 w-24 items-center justify-center rounded-full border border-zinc-100 bg-white shadow-xl shadow-indigo-100/50 dark:border-zinc-700/50 dark:bg-zinc-800 dark:shadow-none">
            <IconUser className="h-10 w-10 text-zinc-400" stroke={1.5} />
          </div>
          <div className="space-y-1.5 text-center">
            <h1 className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
              {profileData.displayName}
            </h1>
            <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
              {profileData.bio}
            </p>
          </div>
        </section>

        {/* Links Section */}
        <section className="flex w-full flex-col gap-3.5 px-2">
          {/* Add Link Dialog */}
          <div className="mb-2">
            <AddLinkDialog onAddLink={handleAddLink} />
          </div>

          {links.map((link) => {
            return (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group w-full rounded-xl transition-all outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
              >
                <Card className="relative flex flex-row items-center gap-4 overflow-hidden border-zinc-200/60 bg-white/70 !p-4 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-indigo-500/5 dark:border-zinc-800/60 dark:bg-zinc-900/50 dark:hover:shadow-indigo-500/10">
                  {/* Subtle hover background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-indigo-500/0 to-indigo-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:to-indigo-500/10" />

                  <div className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-zinc-100 p-1.5 ring-1 ring-zinc-200 dark:bg-zinc-800 dark:ring-zinc-700">
                    <img
                      src={`https://s2.googleusercontent.com/s2/favicons?domain=${link.url}&sz=64`}
                      alt={link.title}
                      className="h-6 w-6 rounded-sm bg-transparent"
                      width={24}
                      height={24}
                    />
                  </div>
                  <span className="relative z-10 flex-1 font-semibold text-zinc-700 transition-colors group-hover:text-indigo-600 dark:text-zinc-200 dark:group-hover:text-indigo-400">
                    {link.title}
                  </span>
                  <IconArrowUpRight
                    className="relative z-10 h-5 w-5 text-zinc-400 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-indigo-600 dark:group-hover:text-indigo-400"
                    stroke={1.5}
                  />
                </Card>
              </a>
            )
          })}
        </section>
      </div>
    </main>
  )
}
