import { Metadata } from "next"
import { notFound } from "next/navigation"
import { app } from "@/lib/firebase"
import { getFirestore, collection, query, where, getDocs, orderBy } from "firebase/firestore/lite"

// Server-side safe Firestore instance
const db = getFirestore(app)
import { PublicProfile } from "@/components/PublicProfile"
import { LinkType } from "@/data/links"

interface ProfilePageProps {
  params: Promise<{
    username: string
  }>
}

// 사용자 데이터를 가져오는 서버 사이드 함수
async function getUserProfileAndLinks(username: string) {
  const usersRef = collection(db, "users")
  const q = query(usersRef, where("username", "==", username))
  const querySnapshot = await getDocs(q)

  if (querySnapshot.empty) {
    return null
  }

  const userDoc = querySnapshot.docs[0]
  const userId = userDoc.id
  const profileData = userDoc.data()

  // 링크 목록 가져오기
  const linksRef = collection(db, "users", userId, "links")
  const linksQuery = query(linksRef, orderBy("createdAt", "desc"))
  const linksSnapshot = await getDocs(linksQuery)
  
  const links: LinkType[] = linksSnapshot.docs.map((doc) => {
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

  return {
    profile: {
      displayName: profileData.displayName || username,
      bio: profileData.bio || "",
    },
    links
  }
}

// 동적 SEO 메타데이터 생성
export async function generateMetadata({ params }: ProfilePageProps): Promise<Metadata> {
  const resolvedParams = await params
  const data = await getUserProfileAndLinks(resolvedParams.username)

  if (!data) {
    return {
      title: "사용자를 찾을 수 없습니다 | MyLink",
    }
  }

  return {
    title: `${data.profile.displayName}님의 링크 | MyLink`,
    description: data.profile.bio || `${data.profile.displayName}님의 모든 링크를 한 곳에서 확인하세요.`,
  }
}

// 메인 서버 컴포넌트 페이지
export default async function ProfilePage({ params }: ProfilePageProps) {
  const resolvedParams = await params
  const data = await getUserProfileAndLinks(resolvedParams.username)

  if (!data) {
    notFound()
  }

  return (
    <main className="min-h-[calc(100vh-56px)] bg-background">
      <div className="mx-auto max-w-md h-full min-h-screen border-x border-border/40 shadow-sm bg-card">
        <PublicProfile 
          displayName={data.profile.displayName}
          bio={data.profile.bio}
          links={data.links}
        />
      </div>
    </main>
  )
}
