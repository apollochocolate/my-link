"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { LinkType } from "@/data/links"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  IconArrowUpRight,
  IconEdit,
  IconTrash,
  IconCheck,
  IconX,
  IconLoader2,
} from "@tabler/icons-react"

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

interface LinkItemProps {
  link: LinkType
  onUpdate: (id: string, title: string, url: string) => Promise<void>
  onDelete: (id: string) => Promise<void>
}

export function LinkItem({ link, onUpdate, onDelete }: LinkItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: link.title,
      url: link.url,
    },
    mode: "onChange",
  })

  const handleEditClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsEditing(true)
  }

  const handleCancelEdit = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsEditing(false)
    reset({ title: link.title, url: link.url })
  }

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setShowDeleteDialog(true)
  }

  const onSubmit = async (data: FormValues) => {
    try {
      setIsSubmitting(true)
      await onUpdate(link.id, data.title, data.url)
      setIsEditing(false)
    } catch (error) {
      console.error("Failed to update link:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleConfirmDelete = async () => {
    try {
      setIsDeleting(true)
      await onDelete(link.id)
      setShowDeleteDialog(false)
    } catch (error) {
      console.error("Failed to delete link:", error)
    } finally {
      setIsDeleting(false)
    }
  }

  if (isEditing) {
    return (
      <Card className="relative flex flex-col gap-4 border-indigo-200 bg-indigo-50/30 p-4 shadow-sm dark:border-indigo-900/50 dark:bg-indigo-900/10">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div className="space-y-1">
            <Input
              {...register("title")}
              placeholder="제목"
              className={`h-9 bg-white dark:bg-zinc-900 ${errors.title ? "border-red-500" : ""}`}
              autoFocus
            />
            {errors.title && (
              <p className="text-xs text-red-500">{errors.title.message}</p>
            )}
          </div>
          <div className="space-y-1">
            <Input
              {...register("url")}
              placeholder="URL"
              className={`h-9 bg-white dark:bg-zinc-900 ${errors.url ? "border-red-500" : ""}`}
            />
            {errors.url && (
              <p className="text-xs text-red-500">{errors.url.message}</p>
            )}
          </div>
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleCancelEdit}
              disabled={isSubmitting}
              className="h-8 w-8 p-0"
            >
              <IconX size={18} />
            </Button>
            <Button
              type="submit"
              size="sm"
              disabled={!isValid || isSubmitting}
              className="h-8 w-8 bg-indigo-600 p-0 text-white hover:bg-indigo-700"
            >
              {isSubmitting ? (
                <IconLoader2 size={18} className="animate-spin text-white" />
              ) : (
                <IconCheck size={18} />
              )}
            </Button>
          </div>
        </form>
      </Card>
    )
  }

  return (
    <>
      <div className="group relative w-full">
        <a
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full rounded-xl transition-all outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
        >
          <Card className="relative flex flex-row items-center gap-4 overflow-hidden border-zinc-200/60 bg-white/70 !p-4 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-indigo-500/5 dark:border-zinc-800/60 dark:bg-zinc-900/50 dark:hover:shadow-indigo-500/10">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-indigo-500/0 to-indigo-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:to-indigo-500/10" />

            <div className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-zinc-100 p-1.5 ring-1 ring-zinc-200 dark:bg-zinc-800 dark:ring-zinc-700">
              <img
                src={`https://s2.googleusercontent.com/s2/favicons?domain=${link.url}&sz=64`}
                alt={link.title}
                className="h-6 w-6 rounded-sm bg-transparent"
                width={24}
                height={24}
              />
            </div>
            <span className="relative z-10 flex-1 font-semibold text-zinc-700 transition-colors group-hover:text-indigo-600 dark:text-zinc-200 dark:group-hover:text-indigo-400">
              {link.title}
            </span>
            <IconArrowUpRight
              className="relative z-10 h-5 w-5 text-zinc-400 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-indigo-600 dark:group-hover:text-indigo-400"
              stroke={1.5}
            />
          </Card>
        </a>

        {/* Action Buttons - Always Visible */}
        <div className="absolute top-2 right-12 z-20 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100 sm:opacity-100">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleEditClick}
            className="h-8 w-8 rounded-full bg-white/80 p-0 text-zinc-500 hover:bg-indigo-50 hover:text-indigo-600 shadow-sm backdrop-blur-sm dark:bg-zinc-800/80 dark:hover:bg-indigo-900/30"
          >
            <IconEdit size={16} stroke={1.5} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDeleteClick}
            className="h-8 w-8 rounded-full bg-white/80 p-0 text-zinc-500 hover:bg-red-50 hover:text-red-600 shadow-sm backdrop-blur-sm dark:bg-zinc-800/80 dark:hover:bg-red-900/30"
          >
            <IconTrash size={16} stroke={1.5} />
          </Button>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="rounded-2xl sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle className="text-lg">정말 삭제하시겠습니까?</DialogTitle>
            <DialogDescription className="pt-2">
              <span className="font-semibold text-zinc-900 dark:text-zinc-100">{link.title}</span> 링크를 삭제합니다.
            </DialogDescription>
          </DialogHeader>
          <div className="py-2">
            <p className="text-sm font-medium text-red-500">
              이 작업은 되돌릴 수 없습니다.
            </p>
          </div>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => setShowDeleteDialog(false)}
              className="h-10 rounded-lg"
            >
              취소
            </Button>
            <Button
              variant="destructive"
              onClick={handleConfirmDelete}
              disabled={isDeleting}
              className="h-10 min-w-[80px] rounded-lg"
            >
              {isDeleting ? (
                <IconLoader2 size={16} className="animate-spin" />
              ) : (
                "삭제하기"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
