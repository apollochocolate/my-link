"use server"

import { app } from "@/lib/firebase"
import { getFirestore, doc, updateDoc, increment } from "firebase/firestore/lite"

export async function trackLinkClick(userId: string, linkId: string) {
  try {
    if (!userId || !linkId) {
      throw new Error("Invalid parameters: userId and linkId are required.")
    }

    const db = getFirestore(app)
    const linkRef = doc(db, "users", userId, "links", linkId)
    
    // 동시 클릭해도 안전하게 서버에서 원자적으로 처리 (increment 사용)
    await updateDoc(linkRef, {
      clickCount: increment(1)
    })
    
    return { success: true }
  } catch (error) {
    // 에러 발생 시 콘솔 에러 로깅 (로그인 확인 또는 권한 등 실패 시)
    console.error("[trackLinkClick] Failed to track link click:", error)
    return { success: false, error: "Failed to track click" }
  }
}
