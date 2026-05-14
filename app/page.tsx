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
    return (
      <main className="flex min-h-[calc(100vh-56px)] flex-col items-center overflow-x-hidden bg-background p-6 text-foreground">
        <div className="mt-16 mb-20 flex w-full max-w-2xl animate-in flex-col items-center gap-16 duration-700 fade-in slide-in-from-bottom-4">
          {/* Hero Section */}
          <section className="flex flex-col items-center gap-6 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg">
              <IconLink className="h-10 w-10" stroke={1.5} />
            </div>
            <div className="space-y-3">
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
                나만의 링크 페이지를
                <br />
                <span className="text-primary">
                  한 곳에서 관리하세요
                </span>
              </h1>
              <p className="mx-auto max-w-md text-lg text-muted-foreground">
                포트폴리오, SNS, 블로그 등 모든 링크를 하나의 페이지로 모아
                간편하게 공유할 수 있습니다.
              </p>
            </div>
            <Button
              onClick={loginWithGoogle}
              size="lg"
              className="mt-2 gap-2.5 rounded-xl font-semibold shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl"
            >
              <IconBrandGoogle size={20} />
              Google로 시작하기
            </Button>
          </section>

          {/* Features Section */}
          <section className="grid w-full grid-cols-1 gap-4 sm:grid-cols-3">
            <Card className="flex flex-col items-center gap-3 bg-card p-6 text-center shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <IconRocket size={24} className="text-primary" />
              </div>
              <h3 className="font-semibold text-card-foreground">
                간편한 설정
              </h3>
              <p className="text-sm text-muted-foreground">
                Google 로그인 한 번이면 바로 시작할 수 있습니다.
              </p>
            </Card>
            <Card className="flex flex-col items-center gap-3 bg-card p-6 text-center shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <IconDeviceDesktop size={24} className="text-primary" />
              </div>
              <h3 className="font-semibold text-card-foreground">
                반응형 디자인
              </h3>
              <p className="text-sm text-muted-foreground">
                어떤 기기에서도 아름답게 보이는 페이지를 제공합니다.
              </p>
            </Card>
            <Card className="flex flex-col items-center gap-3 bg-card p-6 text-center shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <IconPalette size={24} className="text-primary" />
              </div>
              <h3 className="font-semibold text-card-foreground">
                깔끔한 UI
              </h3>
              <p className="text-sm text-muted-foreground">
                심플하고 직관적인 인터페이스로 링크를 관리하세요.
              </p>
            </Card>
          </section>
        </div>
      </main>
    )
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
