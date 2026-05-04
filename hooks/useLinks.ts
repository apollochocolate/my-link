"use client"

import { useState, useEffect, useCallback } from "react"
import { db } from "@/lib/firebase"
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
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
          updatedAt: data.updatedAt?.toDate
            ? data.updatedAt.toDate().toISOString()
            : data.updatedAt || undefined,
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

      // 로딩 상태를 보여주기 위한 인위적 지연
      await new Promise((resolve) => setTimeout(resolve, 500))

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

  const updateLink = async (id: string, title: string, url: string) => {
    try {
      const linkRef = doc(db, "users", "anonymous", "links", id)
      const formattedUrl = url.startsWith("http") ? url : `https://${url}`

      // 로딩 상태를 보여주기 위한 인위적 지연
      await new Promise((resolve) => setTimeout(resolve, 500))

      await updateDoc(linkRef, {
        title,
        url: formattedUrl,
        updatedAt: serverTimestamp(),
      })

      await fetchLinks()
    } catch (error) {
      console.error("Error updating link:", error)
      throw error
    }
  }

  const deleteLink = async (id: string) => {
    try {
      const linkRef = doc(db, "users", "anonymous", "links", id)
      await deleteDoc(linkRef)
      await fetchLinks()
    } catch (error) {
      console.error("Error deleting link:", error)
      throw error
    }
  }

  return { links, loading, addLink, updateLink, deleteLink }
}
