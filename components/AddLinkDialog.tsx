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
import { IconPlus } from "@tabler/icons-react"

interface AddLinkDialogProps {
  onAddLink: (title: string, url: string) => void
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

  const onSubmit = (data: FormValues) => {
    onAddLink(data.title, data.url)
    reset()
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={
          <Button className="group h-12 w-full gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow-lg shadow-indigo-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:from-indigo-600 hover:to-violet-600 hover:shadow-indigo-500/40 active:translate-y-0">
            <IconPlus
              size={20}
              stroke={2.5}
              className="transition-transform duration-300 group-hover:rotate-90"
            />
            <span className="text-[15px] font-semibold">새로운 링크 추가</span>
          </Button>
        }
      />
      <DialogContent className="rounded-2xl sm:max-w-[425px] dark:border-zinc-800">
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
                className={`h-11 dark:border-zinc-700 ${errors.title ? "border-red-500 focus-visible:ring-red-500 dark:border-red-500" : ""}`}
              />
              {errors.title && (
                <p className="line-clamp-1 text-sm font-medium text-red-500 dark:text-red-400">
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
                className={`h-11 dark:border-zinc-700 ${errors.url ? "border-red-500 focus-visible:ring-red-500 dark:border-red-500" : ""}`}
              />
              {errors.url && (
                <p className="line-clamp-1 text-sm font-medium text-red-500 dark:text-red-400">
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
              disabled={!isValid}
              className="h-11 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:pointer-events-none disabled:opacity-50"
            >
              추가하기
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
