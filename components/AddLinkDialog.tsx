"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { IconPlus, IconLoader2 } from "@tabler/icons-react"

interface AddLinkDialogProps {
  onAddLink: (title: string, url: string) => Promise<void>
}

const formSchema = z.object({
  title: z.string().trim().min(1, {
    message: "제목을 입력해주세요.",
  }),
  url: z
    .string()
    .trim()
    .min(1, {
      message: "주소(URL)를 입력해주세요.",
    })
    .transform((val) => {
      if (!/^https?:\/\//i.test(val)) {
        return `https://${val}`
      }
      return val
    })
    .refine(
      (val) => {
        try {
          new URL(val)
          return true
        } catch {
          return false
        }
      },
      {
        message: "올바른 URL 형식이 아닙니다.",
      }
    ),
})

type FormValues = z.infer<typeof formSchema>

export function AddLinkDialog({ onAddLink }: AddLinkDialogProps) {
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      url: "",
    },
    mode: "onChange",
  })

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen)
    if (!newOpen) {
      reset()
    }
  }

  const onSubmit = async (data: FormValues) => {
    try {
      setIsSubmitting(true)
      await onAddLink(data.title, data.url)
      reset()
      setOpen(false)
    } catch (error) {
      console.error("Failed to add link:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={
          <Button className="group h-12 w-full gap-2 rounded-xl text-[15px] font-semibold transition-all duration-300 hover:-translate-y-0.5 shadow-sm">
            <IconPlus
              size={20}
              stroke={2.5}
              className="transition-transform duration-300 group-hover:rotate-90"
            />
            <span>새로운 링크 추가</span>
          </Button>
        }
      />
      <DialogContent className="rounded-2xl sm:max-w-[425px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle className="text-xl">새 링크 추가</DialogTitle>
            <DialogDescription>
              아래 폼을 입력하여 새로운 링크 버튼을 추가하세요.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-5 py-6">
            <div className="grid gap-2">
              <Label htmlFor="title">표시할 제목 (Title)</Label>
              <Input
                id="title"
                {...register("title")}
                placeholder="예: 내 포트폴리오"
                className={`h-11 ${errors.title ? "border-destructive focus-visible:ring-destructive" : ""}`}
              />
              {errors.title && (
                <p className="line-clamp-1 text-sm font-medium text-destructive">
                  {errors.title.message}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="url">주소 (URL)</Label>
              <Input
                id="url"
                type="text"
                {...register("url")}
                placeholder="예: google.com (https 자동 추가)"
                className={`h-11 ${errors.url ? "border-destructive focus-visible:ring-destructive" : ""}`}
              />
              {errors.url && (
                <p className="line-clamp-1 text-sm font-medium text-destructive">
                  {errors.url.message}
                </p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="h-11 rounded-lg"
            >
              취소
            </Button>
            <Button
              type="submit"
              disabled={!isValid || isSubmitting}
              className="h-11 min-w-[100px] rounded-lg disabled:pointer-events-none disabled:opacity-50"
            >
              {isSubmitting ? (
                <IconLoader2 size={18} className="animate-spin" />
              ) : (
                "추가하기"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
