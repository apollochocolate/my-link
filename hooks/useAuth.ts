"use client"

import { useState, useEffect } from "react"
import { auth, db } from "@/lib/firebase"
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth"
import { doc, getDoc, setDoc, serverTimestamp, updateDoc, collection, query, where, getDocs } from "firebase/firestore"

export interface UserProfile {
  uid: string
  email: string
  displayName: string
  username?: string
  bio?: string
}

export function useAuth() {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Firestore에서 사용자 프로필 가져오기
        const userProfile = await getUserProfile(firebaseUser)
        setUser(userProfile)
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const checkUsernameAvailability = async (username: string, currentUserId: string): Promise<boolean> => {
    const usersRef = collection(db, "users")
    const q = query(usersRef, where("username", "==", username))
    const querySnapshot = await getDocs(q)
    
    if (querySnapshot.empty) return true
    
    let isAvailable = true
    querySnapshot.forEach((doc) => {
      if (doc.id !== currentUserId) {
        isAvailable = false
      }
    })
    return isAvailable
  }

  const updateProfile = async (userId: string, data: Partial<UserProfile>) => {
    const userRef = doc(db, "users", userId)
    await updateDoc(userRef, {
      ...data,
      updatedAt: serverTimestamp(),
    })
    
    // 프로필 업데이트 후 로컬 상태 반영
    setUser((prev) => {
      if (!prev) return null
      return { ...prev, ...data }
    })
  }

  const getUserProfile = async (firebaseUser: User): Promise<UserProfile> => {
    const userRef = doc(db, "users", firebaseUser.uid)
    const userSnap = await getDoc(userRef)

    if (userSnap.exists()) {
      const data = userSnap.data()
      return {
        uid: firebaseUser.uid,
        email: data.email || firebaseUser.email || "",
        displayName: data.displayName || "",
        username: data.username,
        bio: data.bio || "",
      }
    }

    // 이메일의 앞부분을 username 베이스로 사용
    const emailPrefix = (firebaseUser.email || "").split("@")[0]
    let baseUsername = emailPrefix
    let username = baseUsername
    let isUnique = await checkUsernameAvailability(username, firebaseUser.uid)
    let counter = 1
    
    while (!isUnique) {
      username = `${baseUsername}${counter}`
      isUnique = await checkUsernameAvailability(username, firebaseUser.uid)
      counter++
    }

    const newProfile: UserProfile = {
      uid: firebaseUser.uid,
      email: firebaseUser.email || "",
      displayName: firebaseUser.displayName || emailPrefix,
      username,
      bio: "",
    }

    // Firestore에 새 사용자 문서 생성
    await setDoc(userRef, {
      email: newProfile.email,
      displayName: newProfile.displayName,
      username: newProfile.username,
      bio: newProfile.bio,
      createdAt: serverTimestamp(),
    })

    return newProfile
  }

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider()
    await signInWithPopup(auth, provider)
  }

  const logout = async () => {
    await signOut(auth)
  }

  return { user, loading, loginWithGoogle, logout, updateProfile, checkUsernameAvailability }
}
