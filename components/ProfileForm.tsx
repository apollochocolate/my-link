"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useAuth } from "@/hooks/useAuth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { IconLoader2, IconCheck } from "@tabler/icons-react"
import { Card } from "@/components/ui/card"

const profileFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: "아이디는 최소 3자 이상이어야 합니다." })
    .max(20, { message: "아이디는 최대 20자 이하여야 합니다." })
    .regex(/^[a-zA-Z0-9_-]+$/, {
      message: "아이디는 영문, 숫자, 하이픈(-), 언더스코어(_)만 사용할 수 있습니다.",
    }),
  displayName: z
    .string()
    .min(1, { message: "표시 이름을 입력해주세요." })
    .max(50, { message: "표시 이름은 최대 50자 이하여야 합니다." }),
  bio: z
    .string()
    .max(160, { message: "소개글은 160자 이내로 작성해주세요." })
    .optional(),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

export function ProfileForm() {
  const { user, updateProfile, checkUsernameAvailability } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [usernameError, setUsernameError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid, isDirty },
    reset,
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      username: "",
      displayName: "",
      bio: "",
    },
    mode: "onChange",
  })

  // Set default values when user loads or updates
  useEffect(() => {
    if (user) {
      reset({
        username: user.username || "",
        displayName: user.displayName || "",
        bio: user.bio || "",
      })
    }
  }, [user, reset])

  const usernameWatch = watch("username")

  // Debounced username check
  useEffect(() => {
    const checkUsername = async () => {
      if (!user || !usernameWatch) return
      
      // If it's unchanged, it's valid
      if (usernameWatch === user.username) {
        setUsernameError(null)
        return
      }

      // Check regex first before db check
      if (!/^[a-zA-Z0-9_-]+$/.test(usernameWatch) || usernameWatch.length < 3) {
        return // handled by zod
      }

      const isAvailable = await checkUsernameAvailability(usernameWatch, user.uid)
      if (!isAvailable) {
        setUsernameError("이미 사용 중인 아이디입니다.")
      } else {
        setUsernameError(null)
      }
    }

    const timer = setTimeout(() => {
      checkUsername()
    }, 500)

    return () => clearTimeout(timer)
  }, [usernameWatch, user, checkUsernameAvailability])

  const onSubmit = async (data: ProfileFormValues) => {
    if (!user) return
    if (usernameError) return

    try {
      setIsSubmitting(true)
      setSuccessMessage(false)
      
      await updateProfile(user.uid, {
        username: data.username,
        displayName: data.displayName,
        bio: data.bio || "",
      })

      setSuccessMessage(true)
      setTimeout(() => setSuccessMessage(false), 3000)
    } catch (error) {
      console.error("Failed to update profile:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!user) return null

  return (
    <Card className="p-6 w-full shadow-sm bg-card">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div className="grid gap-2">
          <Label htmlFor="username">고유 아이디 (URL용)</Label>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground text-sm font-medium">mylink.com/</span>
            <Input
              id="username"
              {...register("username")}
              placeholder="username"
              className={`flex-1 ${errors.username || usernameError ? "border-destructive focus-visible:ring-destructive" : ""}`}
            />
          </div>
          {(errors.username || usernameError) && (
            <p className="text-sm font-medium text-destructive">
              {errors.username?.message || usernameError}
            </p>
          )}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="displayName">표시 이름</Label>
          <Input
            id="displayName"
            {...register("displayName")}
            placeholder="예: 홍길동"
            className={`${errors.displayName ? "border-destructive focus-visible:ring-destructive" : ""}`}
          />
          {errors.displayName && (
            <p className="text-sm font-medium text-destructive">
              {errors.displayName.message}
            </p>
          )}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="bio">소개글 (선택)</Label>
          <Textarea
            id="bio"
            {...register("bio")}
            placeholder="자신을 소개하는 짧은 문구를 입력해주세요."
            className={`resize-none h-24 ${errors.bio ? "border-destructive focus-visible:ring-destructive" : ""}`}
          />
          {errors.bio && (
            <p className="text-sm font-medium text-destructive">
              {errors.bio.message}
            </p>
          )}
        </div>

        <div className="flex justify-end gap-3 pt-2">
          {successMessage && (
            <div className="flex items-center gap-2 text-sm font-medium text-green-600 dark:text-green-500 mr-auto animate-in fade-in">
              <IconCheck size={18} />
              저장되었습니다
            </div>
          )}
          <Button
            type="submit"
            disabled={!isValid || !!usernameError || !isDirty || isSubmitting}
            className="min-w-[120px] rounded-lg disabled:pointer-events-none disabled:opacity-50 transition-all duration-300"
          >
            {isSubmitting ? (
              <IconLoader2 size={18} className="animate-spin" />
            ) : (
              "변경사항 저장"
            )}
          </Button>
        </div>
      </form>
    </Card>
  )
}
