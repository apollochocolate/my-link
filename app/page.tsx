"use client"

import { useAuth } from "@/hooks/useAuth"
import { useLinks } from "@/hooks/useLinks"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  IconUser,
  IconLink,
  IconBrandGoogle,
  IconRocket,
  IconDeviceDesktop,
  IconPalette,
} from "@tabler/icons-react"
import { AddLinkDialog } from "@/components/AddLinkDialog"
import { LinkItem } from "@/components/LinkItem"
import { PublicProfile } from "@/components/PublicProfile"
import { ProfileForm } from "@/components/ProfileForm"
import { LandingPage } from "@/components/LandingPage/LandingPage"

export default function Page() {
  const { user, loading: authLoading, loginWithGoogle } = useAuth()
  const { links, loading: linksLoading, addLink, updateLink, deleteLink } = useLinks(user?.uid ?? null)

  const handleAddLink = async (title: string, url: string) => {
    await addLink(title, url)
  }

  const handleUpdateLink = async (id: string, title: string, url: string) => {
    await updateLink(id, title, url)
  }

  const handleDeleteLink = async (id: string) => {
    await deleteLink(id)
  }

  // 인증 로딩 중
  if (authLoading) {
    return (
      <main className="flex min-h-[calc(100vh-56px)] flex-col items-center justify-center bg-background p-6 text-foreground">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-muted border-t-primary" />
          <p className="text-sm text-muted-foreground">로딩 중...</p>
        </div>
      </main>
    )
  }

  // 비로그인 상태 - 랜딩 페이지
  if (!user) {
    return <LandingPage onLogin={loginWithGoogle} />
  }

  // 로그인 상태 - 마이 페이지 (Admin View)
  return (
    <main className="flex min-h-[calc(100vh-56px)] flex-col items-center overflow-x-hidden bg-background">
      <div className="w-full max-w-6xl flex-1 items-start md:grid md:grid-cols-[1fr_380px] lg:grid-cols-[1fr_400px]">
        {/* Left Column: Settings */}
        <div className="flex w-full flex-col p-6 lg:p-10">
          <div className="mx-auto w-full max-w-xl animate-in flex-col gap-10 duration-700 fade-in slide-in-from-bottom-4">
            <div className="mb-8 space-y-1">
              <h2 className="text-2xl font-bold tracking-tight">설정</h2>
              <p className="text-muted-foreground">프로필 정보와 링크를 관리하세요.</p>
            </div>

            <div className="flex flex-col gap-10">
              {/* Profile Section */}
              <section className="flex w-full flex-col gap-4">
                <h3 className="text-lg font-semibold tracking-tight">프로필 설정</h3>
                <ProfileForm />
              </section>

              {/* Links Section */}
              <section className="flex w-full flex-col gap-4">
                <h3 className="text-lg font-semibold tracking-tight">링크 관리</h3>
                {/* Add Link Dialog */}
                <div className="mb-2">
                <AddLinkDialog onAddLink={handleAddLink} />
              </div>

              {linksLoading ? (
                <div className="flex flex-col gap-3.5">
                  {[1, 2, 3].map((i) => (
                    <Card key={i} className="h-[76px] animate-pulse bg-muted/50" />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {links.map((link) => (
                    <LinkItem
                      key={link.id}
                      link={link}
                      onUpdate={handleUpdateLink}
                      onDelete={handleDeleteLink}
                    />
                  ))}
                </div>
              )}
              {links.length === 0 && !linksLoading && (
                <div className="py-20 text-center text-muted-foreground border-2 border-dashed rounded-xl border-border/50">
                  아직 등록된 링크가 없습니다.
                </div>
              )}
            </section>
            </div>
          </div>
        </div>

        {/* Right Column: Live Mobile Preview */}
        <div className="hidden border-l border-border bg-muted/10 md:block min-h-[calc(100vh-56px)]">
          <div className="sticky top-14 flex h-[calc(100vh-56px)] items-center justify-center p-8">
            {/* Phone Mockup Frame */}
            <div className="relative h-[720px] w-[340px] overflow-hidden rounded-[2.5rem] border-[8px] border-foreground/10 bg-background shadow-2xl ring-1 ring-border">
              {/* Notch */}
              <div className="absolute top-0 left-1/2 z-50 h-5 w-32 -translate-x-1/2 rounded-b-2xl bg-foreground/10" />
              
              <div className="h-full w-full overflow-y-auto overflow-x-hidden scrollbar-hide">
                <PublicProfile 
                  userId={user.uid}
                  displayName={user.displayName} 
                  bio={user.bio}
                  links={links} 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
