import type { Metadata } from "next"
import { Geist, Geist_Mono, Source_Sans_3, Inter } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import { Header } from "@/components/Header"

const inter = Inter({subsets:['latin'],variable:'--font-sans'})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://my-link-xi-blond.vercel.app"),
  title: "마이링크 - 나만의 모든 링크를 한 곳에",
  description: "개발자와 크리에이터를 위한 심플하고 직관적인 링크 모음 서비스",
  openGraph: {
    title: "마이링크",
    description: "개발자와 크리에이터를 위한 심플하고 직관적인 링크 모음 서비스",
    url: "https://my-link-xi-blond.vercel.app",
    siteName: "마이링크",
    locale: "ko_KR",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="ko"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        inter.variable
      )}
    >
      <body>
        <ThemeProvider>
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
