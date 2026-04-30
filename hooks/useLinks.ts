"use client"

import { useState, useEffect } from "react"
import { db } from "@/lib/firebase"
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore"
import { LinkType } from "@/data/links"

export function useLinks() {
  const [links, setLinks] = useState<LinkType[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // users/anonymous/links 컬렉션 참조
    const linksRef = collection(db, "users", "anonymous", "links")
    
    // createdAt 기준 내림차순 정렬 쿼리
    const q = query(linksRef, orderBy("createdAt", "desc"))

    // 실시간 리스너 설정
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedLinks = snapshot.docs.map((doc) => {
        const data = doc.data()
        return {
          id: doc.id,
          title: data.title,
          url: data.url,
          // Firestore Timestamp인 경우 ISO string으로 변환, 아니면 기존 값 사용
          createdAt: data.createdAt?.toDate 
            ? data.createdAt.toDate().toISOString() 
            : data.createdAt || new Date().toISOString(),
        } as LinkType
      })
      
      setLinks(fetchedLinks)
      setLoading(false)
    }, (error) => {
      console.error("Error fetching links:", error)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const addLink = async (title: string, url: string) => {
    try {
      const linksRef = collection(db, "users", "anonymous", "links")
      
      // URL 자동 완성 (https://)
      const formattedUrl = url.startsWith("http") ? url : `https://${url}`

      await addDoc(linksRef, {
        title,
        url: formattedUrl,
        createdAt: serverTimestamp(), // 서버 시간을 사용하여 정렬의 정확성 확보
      })
    } catch (error) {
      console.error("Error adding link:", error)
      throw error
    }
  }

  return { links, loading, addLink }
}
