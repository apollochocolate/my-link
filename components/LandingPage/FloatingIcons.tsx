"use client"

import {
  IconLink,
  IconBrandGoogle,
  IconUser,
  IconStar,
  IconHeart,
  IconShare,
  IconClick,
  IconWorld,
} from "@tabler/icons-react"
import { useEffect, useState } from "react"

const icons = [
  IconLink,
  IconBrandGoogle,
  IconUser,
  IconStar,
  IconHeart,
  IconShare,
  IconClick,
  IconWorld,
]

export function FloatingIcons() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      {[...Array(15)].map((_, i) => {
        const Icon = icons[i % icons.length]
        const top = Math.random() * 100
        const left = Math.random() * 100
        const delay = Math.random() * 5
        const size = 20 + Math.random() * 30
        const opacity = 0.05 + Math.random() * 0.1

        return (
          <div
            key={i}
            className="absolute animate-float text-primary"
            style={{
              top: `${top}%`,
              left: `${left}%`,
              animationDelay: `${delay}s`,
              opacity: opacity,
            }}
          >
            <Icon size={size} stroke={1.5} />
          </div>
        )
      })}
    </div>
  )
}
