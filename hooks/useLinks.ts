"use client"

import { useState, useEffect, useCallback } from "react"
import { db } from "@/lib/firebase"
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore"
import { LinkType } from "@/data/links"

export function useLinks() {
  const [links, setLinks] = useState<LinkType[]>([])
  const [loading, setLoading] = useState(true)

  // 링크 목록을 불러오는 함수
  const fetchLinks = useCallback(async () => {
    try {
      setLoading(true)
      const linksRef = collection(db, "users", "anonymous", "links")
      const q = query(linksRef, orderBy("createdAt", "desc"))
      
      const querySnapshot = await getDocs(q)
      const fetchedLinks = querySnapshot.docs.map((doc) => {
        const data = doc.data()
        return {
          id: doc.id,
          title: data.title,
          url: data.url,
          createdAt: data.createdAt?.toDate 
            ? data.createdAt.toDate().toISOString() 
            : data.createdAt || new Date().toISOString(),
        } as LinkType
      })
      
      setLinks(fetchedLinks)
    } catch (error) {
      console.error("Error fetching links:", error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchLinks()
  }, [fetchLinks])

  const addLink = async (title: string, url: string) => {
    try {
      const linksRef = collection(db, "users", "anonymous", "links")
      
      // URL 자동 완성 (https://)
      const formattedUrl = url.startsWith("http") ? url : `https://${url}`

      await addDoc(linksRef, {
        title,
        url: formattedUrl,
        createdAt: serverTimestamp(),
      })

      // 링크 추가 성공 후 목록 다시 불러오기
      await fetchLinks()
    } catch (error) {
      console.error("Error adding link:", error)
      throw error
    }
  }

  return { links, loading, addLink }
}
