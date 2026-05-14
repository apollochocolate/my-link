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
      <Card className="relative flex flex-col gap-4 border-border bg-muted/20 p-4 shadow-sm">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div className="space-y-1">
            <Input
              {...register("title")}
              placeholder="제목"
              className={`h-9 bg-background ${errors.title ? "border-destructive" : ""}`}
              autoFocus
            />
            {errors.title && (
              <p className="text-xs text-destructive">{errors.title.message}</p>
            )}
          </div>
          <div className="space-y-1">
            <Input
              {...register("url")}
              placeholder="URL"
              className={`h-9 bg-background ${errors.url ? "border-destructive" : ""}`}
            />
            {errors.url && (
              <p className="text-xs text-destructive">{errors.url.message}</p>
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
              className="h-8 w-8 p-0"
            >
              {isSubmitting ? (
                <IconLoader2 size={18} className="animate-spin" />
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
          className="block w-full rounded-xl transition-all outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <Card className="relative flex flex-row items-center gap-4 overflow-hidden border-border bg-card p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:bg-accent/50">
            <div className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-muted p-1.5 ring-1 ring-border/50">
              <img
                src={`https://s2.googleusercontent.com/s2/favicons?domain=${link.url}&sz=64`}
                alt={link.title}
                className="h-6 w-6 rounded-sm bg-transparent"
                width={24}
                height={24}
              />
            </div>
            <span className="relative z-10 flex-1 font-semibold text-card-foreground transition-colors group-hover:text-primary">
              {link.title}
            </span>
            <IconArrowUpRight
              className="relative z-10 h-5 w-5 text-muted-foreground transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary"
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
            className="h-8 w-8 rounded-full bg-background/80 p-0 text-muted-foreground hover:bg-accent hover:text-accent-foreground shadow-sm backdrop-blur-sm"
          >
            <IconEdit size={16} stroke={1.5} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDeleteClick}
            className="h-8 w-8 rounded-full bg-background/80 p-0 text-muted-foreground hover:bg-destructive/10 hover:text-destructive shadow-sm backdrop-blur-sm"
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
              <span className="font-semibold text-foreground">{link.title}</span> 링크를 삭제합니다.
            </DialogDescription>
          </DialogHeader>
          <div className="py-2">
            <p className="text-sm font-medium text-destructive">
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
