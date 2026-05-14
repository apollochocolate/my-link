"use client"

import { useAuth } from "@/hooks/useAuth"
import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuGroup,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  IconBrandGoogle,
  IconLogout,
  IconExternalLink,
  IconCopy,
  IconChevronDown,
} from "@tabler/icons-react"

export function Header() {
  const { user, loading, loginWithGoogle, logout } = useAuth()

  const handleCopyLink = async () => {
    if (!user) return
    const url = `${window.location.origin}/${user.username}`
    await navigator.clipboard.writeText(url)
    alert("링크가 클립보드에 복사되었습니다!")
  }

  const handlePreview = () => {
    if (!user) return
    window.open(`/${user.username}`, "_blank")
  }

  if (loading) {
    return (
      <header className="sticky top-0 z-50 flex h-14 w-full items-center justify-between border-b border-border/40 bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 sm:px-6">
        <span className="text-lg font-bold tracking-tight text-primary">
          MyLink
        </span>
        <div className="h-8 w-24 animate-pulse rounded-md bg-muted" />
      </header>
    )
  }

  return (
    <header className="sticky top-0 z-50 flex h-14 w-full items-center justify-between border-b border-border/40 bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 sm:px-6">
      <span className="text-lg font-bold tracking-tight text-primary">
        MyLink
      </span>

      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger 
            className={cn(
              buttonVariants({ variant: "outline" }),
              "flex items-center gap-2 rounded-full px-2 py-1.5 h-auto text-sm font-medium cursor-pointer"
            )}
          >
            <Avatar className="h-6 w-6">
              <AvatarImage src={`https://api.dicebear.com/7.x/notionists/svg?seed=${user.displayName}`} alt={user.displayName} />
              <AvatarFallback>{user.displayName.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <span className="hidden sm:inline-block">{user.displayName}님</span>
            <IconChevronDown size={14} className="text-muted-foreground" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuGroup>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user.displayName}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user.email}
                  </p>
                </div>
              </DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handlePreview} className="cursor-pointer gap-2">
              <IconExternalLink size={16} className="text-muted-foreground" />
              내 페이지 미리보기
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleCopyLink} className="cursor-pointer gap-2">
              <IconCopy size={16} className="text-muted-foreground" />
              내 페이지 링크 복사
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout} className="cursor-pointer gap-2 text-destructive focus:bg-destructive/10 focus:text-destructive">
              <IconLogout size={16} />
              로그아웃
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button
          onClick={loginWithGoogle}
          variant="outline"
          className="h-9 gap-2 shadow-sm"
        >
          <IconBrandGoogle size={18} />
          Google로 로그인
        </Button>
      )}
    </header>
  )
}
