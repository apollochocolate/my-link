"use client"

import { Button } from "@/components/ui/button"
import { IconBrandGoogle, IconBrandGithub, IconLink, IconChartBar, IconUser, IconRocket } from "@tabler/icons-react"
import { FloatingIcons } from "./FloatingIcons"
import { FeatureCard } from "./FeatureCard"
import { PublicProfile } from "@/components/PublicProfile"

interface LandingPageProps {
  onLogin: () => void
}

export function LandingPage({ onLogin }: LandingPageProps) {
  const dummyLinks = [
    { id: "1", title: "GitHub", url: "https://github.com", createdAt: new Date() },
    { id: "2", title: "LinkedIn", url: "https://linkedin.com", createdAt: new Date() },
    { id: "3", title: "Portfolio", url: "https://portfolio.com", createdAt: new Date() },
  ]

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center bg-background text-foreground selection:bg-primary/30">
      {/* Background */}
      <FloatingIcons />
      
      {/* Hero Section */}
      <section className="container relative z-10 flex flex-col items-center justify-center px-4 pt-32 pb-20 text-center sm:pt-48">
        <div className="mb-8 flex animate-bounce items-center justify-center rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary ring-1 ring-primary/20 backdrop-blur-sm">
          <IconRocket className="mr-2" size={16} />
          <span>가장 쉬운 링크 관리의 시작</span>
        </div>
        
        <h1 className="max-w-4xl text-5xl font-extrabold tracking-tight sm:text-7xl lg:text-8xl">
          흩어져 있는 당신의
          <br />
          <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
            가치를 한 곳에
          </span>
        </h1>
        
        <p className="mt-8 max-w-2xl text-lg text-muted-foreground sm:text-xl">
          포트폴리오, SNS, 블로그 등 모든 링크를 하나의 아름다운 페이지로 모으세요. 
          단 1분이면 당신만의 특별한 링크 페이지가 완성됩니다.
        </p>
        
        <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row">
          <Button
            onClick={onLogin}
            size="lg"
            className="h-14 gap-3 rounded-2xl px-8 text-lg font-bold shadow-2xl shadow-primary/20 transition-all hover:-translate-y-1 hover:shadow-primary/30"
          >
            <IconBrandGoogle size={24} />
            Google로 무료로 시작하기
          </Button>
          <p className="text-sm text-muted-foreground">
            신용카드 필요 없음 · 평생 무료
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="container relative z-10 px-4 py-24 sm:py-32">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">강력한 기능을 경험하세요</h2>
          <p className="mt-4 text-muted-foreground">단순하지만 꼭 필요한 기능들만 담았습니다.</p>
        </div>
        
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <FeatureCard
            icon={IconLink}
            title="손쉬운 링크 관리"
            description="URL만 입력하면 아이콘을 자동으로 불러옵니다. 순서를 자유롭게 바꾸고 관리하세요."
            delay="0s"
          />
          <FeatureCard
            icon={IconChartBar}
            title="상세한 클릭 통계"
            description="어떤 링크가 가장 인기가 많은지, 얼마나 많은 사람들이 방문했는지 실시간으로 확인하세요."
            delay="0.1s"
          />
          <FeatureCard
            icon={IconUser}
            title="나만의 고유 URL"
            description="mylink.com/username 형태의 짧고 직관적인 고유 URL을 가질 수 있습니다."
            delay="0.2s"
          />
        </div>
      </section>

      {/* Preview Section */}
      <section className="container relative z-10 px-4 py-24 sm:py-32">
        <div className="flex flex-col items-center gap-16 lg:flex-row lg:items-start">
          <div className="flex-1 space-y-8 text-center lg:text-left">
            <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">
              모든 기기에서
              <br />
              <span className="text-primary">완벽하게 보입니다</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              당신의 페이지는 모바일, 태블릿, 데스크톱 등 어떤 환경에서도 최적화된 레이아웃으로 표시됩니다. 
              방문자들에게 최고의 경험을 선사하세요.
            </p>
            <div className="flex justify-center lg:justify-start">
              <Button
                onClick={onLogin}
                variant="outline"
                size="lg"
                className="h-12 gap-2 rounded-xl border-primary/20 hover:bg-primary/5"
              >
                지금 바로 만들기
              </Button>
            </div>
          </div>
          
          <div className="relative flex-1">
            {/* Phone Mockup */}
            <div className="relative mx-auto h-[600px] w-[300px] overflow-hidden rounded-[2.5rem] border-[8px] border-foreground/10 bg-background shadow-2xl ring-1 ring-border">
              <div className="absolute top-0 left-1/2 z-50 h-5 w-24 -translate-x-1/2 rounded-b-xl bg-foreground/10" />
              <div className="h-full w-full overflow-hidden">
                <PublicProfile
                  userId="preview"
                  displayName="DemoUser"
                  bio="안녕하세요! 마이링크 예시 페이지입니다."
                  links={dummyLinks as any}
                />
              </div>
            </div>
            {/* Decorative background elements */}
            <div className="absolute -bottom-10 -right-10 -z-10 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute -top-10 -left-10 -z-10 h-64 w-64 rounded-full bg-purple-500/10 blur-3xl" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 w-full border-t border-border bg-card/50 py-12 backdrop-blur-sm">
        <div className="container mx-auto flex flex-col items-center justify-between gap-6 px-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <IconLink size={20} />
            </div>
            <span className="text-xl font-bold">MyLink</span>
          </div>
          
          <div className="text-center text-sm text-muted-foreground">
            © 2026 한양여자대학교 바이브 코딩. All rights reserved.
          </div>
          
          <div className="flex items-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <IconBrandGithub size={24} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
