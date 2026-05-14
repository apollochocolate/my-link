"use client"

import { Card } from "@/components/ui/card"
import { TablerIcon } from "@tabler/icons-react"

interface FeatureCardProps {
  icon: TablerIcon
  title: string
  description: string
  delay?: string
}

export function FeatureCard({ icon: Icon, title, description, delay = "0s" }: FeatureCardProps) {
  return (
    <Card 
      className="group relative flex flex-col items-center gap-4 overflow-hidden border-white/20 bg-white/5 p-8 text-center backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:bg-white/10 hover:shadow-2xl hover:shadow-primary/20 animate-in fade-in slide-in-from-bottom-8"
      style={{ animationDelay: delay }}
    >
      <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-primary/10 blur-2xl transition-all group-hover:bg-primary/20" />
      
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/20 transition-all group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground group-hover:rotate-6">
        <Icon size={32} stroke={1.5} />
      </div>
      
      <div className="space-y-2">
        <h3 className="text-xl font-bold tracking-tight">{title}</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
      
      <div className="absolute bottom-0 left-0 h-1 w-0 bg-primary transition-all duration-500 group-hover:w-full" />
    </Card>
  )
}
