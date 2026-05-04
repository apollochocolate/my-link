"use client"

import { useLinks } from "@/hooks/useLinks"
import { profileData } from "@/data/links"
import { Card } from "@/components/ui/card"
import { IconUser, IconArrowUpRight } from "@tabler/icons-react"
import { AddLinkDialog } from "@/components/AddLinkDialog"
import { LinkItem } from "@/components/LinkItem"

export default function Page() {
  const { links, loading, addLink, updateLink, deleteLink } = useLinks()

  const handleAddLink = async (title: string, url: string) => {
    await addLink(title, url)
  }

  const handleUpdateLink = async (id: string, title: string, url: string) => {
    await updateLink(id, title, url)
  }

  const handleDeleteLink = async (id: string) => {
    await deleteLink(id)
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

          {loading ? (
            <div className="flex flex-col gap-3.5">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="h-[76px] animate-pulse border-zinc-200/60 bg-white/50 dark:border-zinc-800/60 dark:bg-zinc-900/30" />
              ))}
            </div>
          ) : (
            links.map((link) => (
              <LinkItem
                key={link.id}
                link={link}
                onUpdate={handleUpdateLink}
                onDelete={handleDeleteLink}
              />
            ))
          )}
          {links.length === 0 && !loading && (
            <div className="py-20 text-center text-zinc-400">
              아직 등록된 링크가 없습니다.
            </div>
          )}
        </section>
      </div>
    </main>
  )
}
