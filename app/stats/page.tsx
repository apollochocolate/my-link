"use client"

import { useAuth } from "@/hooks/useAuth"
import { useLinks } from "@/hooks/useLinks"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  IconArrowLeft,
  IconChartBar,
  IconClick,
  IconTrendingUp,
  IconTrophy,
  IconExternalLink,
} from "@tabler/icons-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useMemo } from "react"
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartConfig = {
  clicks: {
    label: "클릭 수",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig

export default function StatsPage() {
  const { user, loading: authLoading } = useAuth()
  const { links, loading: linksLoading } = useLinks(user?.uid ?? null)
  const router = useRouter()

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/")
    }
  }, [user, authLoading, router])

  const statsData = useMemo(() => {
    if (!links) return []
    return links
      .map((link) => ({
        name: link.title,
        clicks: link.clickCount || 0,
      }))
      .sort((a, b) => b.clicks - a.clicks)
  }, [links])

  const totalClicks = useMemo(() => {
    return statsData.reduce((acc, curr) => acc + curr.clicks, 0)
  }, [statsData])

  const topLink = statsData[0]

  if (authLoading || linksLoading) {
    return (
      <main className="flex min-h-[calc(100vh-56px)] items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-muted border-t-primary" />
          <p className="text-sm text-muted-foreground font-medium">통계 데이터를 불러오는 중...</p>
        </div>
      </main>
    )
  }

  if (!user) return null

  return (
    <main className="min-h-[calc(100vh-56px)] bg-background p-4 md:p-8 lg:p-12">
      <div className="mx-auto max-w-5xl space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Link 
              href="/" 
              className="group flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              <IconArrowLeft size={16} className="transition-transform group-hover:-translate-x-0.5" />
              대시보드로 돌아가기
            </Link>
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">내 링크 통계</h1>
            <p className="text-muted-foreground">링크들이 얼마나 많은 관심을 받고 있는지 확인하세요.</p>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="relative overflow-hidden border-none bg-gradient-to-br from-primary to-primary/60 text-primary-foreground shadow-lg">
            <CardHeader className="pb-2">
              <CardDescription className="text-primary-foreground/80 font-medium">총 클릭 수</CardDescription>
              <CardTitle className="text-4xl font-extrabold">{totalClicks.toLocaleString()}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-primary-foreground/70">전체 링크 합계</p>
            </CardContent>
            <IconClick className="absolute -bottom-2 -right-2 h-24 w-24 opacity-10" stroke={1} />
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-sm transition-all hover:shadow-md">
            <CardHeader className="pb-2">
              <CardDescription className="font-medium">가장 인기 있는 링크</CardDescription>
              <CardTitle className="truncate text-xl font-bold">
                {topLink ? topLink.name : "-"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-1.5 text-sm font-semibold text-primary">
                <IconTrophy size={16} />
                <span>{topLink ? topLink.clicks.toLocaleString() : 0} 클릭</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-sm transition-all hover:shadow-md">
            <CardHeader className="pb-2">
              <CardDescription className="font-medium">활성 링크 수</CardDescription>
              <CardTitle className="text-3xl font-bold">{links.length}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">관리 중인 총 링크 개수</p>
            </CardContent>
            <IconChartBar className="absolute top-4 right-4 h-5 w-5 text-muted-foreground/30" />
          </Card>
        </div>

        {/* Chart Section */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="col-span-1 border-border/50 bg-card/30 backdrop-blur-md shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <IconTrendingUp size={20} className="text-primary" />
                링크별 성과
              </CardTitle>
              <CardDescription>어떤 링크가 가장 많이 클릭되었나요?</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <div className="h-[350px] w-full">
                {statsData.length > 0 ? (
                  <ChartContainer config={chartConfig}>
                    <BarChart
                      data={statsData}
                      layout="vertical"
                      margin={{ left: 40, right: 20, top: 10, bottom: 10 }}
                    >
                      <XAxis type="number" hide />
                      <YAxis
                        dataKey="name"
                        type="category"
                        tickLine={false}
                        axisLine={false}
                        width={100}
                        fontSize={12}
                        className="font-medium"
                      />
                      <ChartTooltip
                        cursor={{ fill: "rgba(0,0,0,0.05)" }}
                        content={<ChartTooltipContent hideLabel />}
                      />
                      <Bar dataKey="clicks" radius={[0, 4, 4, 0]} barSize={24}>
                        {statsData.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={index === 0 ? "hsl(var(--primary))" : "hsl(var(--primary) / 0.3)"} 
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ChartContainer>
                ) : (
                  <div className="flex h-full flex-col items-center justify-center text-muted-foreground">
                    <p>표시할 데이터가 없습니다.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Table Section */}
          <Card className="border-border/50 bg-card/30 backdrop-blur-md shadow-sm">
            <CardHeader>
              <CardTitle>세부 통계</CardTitle>
              <CardDescription>전체 링크의 클릭 수 리스트입니다.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {statsData.length > 0 ? (
                  statsData.map((item, index) => (
                    <div 
                      key={item.name} 
                      className="flex items-center justify-between rounded-lg border border-border/40 bg-background/40 p-3.5 transition-colors hover:bg-background/60"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-xs font-bold text-muted-foreground">
                          {index + 1}
                        </div>
                        <span className="font-medium">{item.name}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm font-bold">{item.clicks.toLocaleString()} clicks</span>
                        <a 
                          href={links.find(l => l.title === item.name)?.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className={cn(
                            buttonVariants({ variant: "ghost", size: "icon" }),
                            "h-8 w-8 text-muted-foreground hover:text-primary"
                          )}
                        >
                          <IconExternalLink size={16} />
                        </a>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="py-10 text-center text-sm text-muted-foreground">링크가 없습니다.</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
