import { ImageResponse } from 'next/og';
import { app } from "@/lib/firebase";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore/lite";

export const runtime = 'edge';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

const db = getFirestore(app);

async function getUserProfile(username: string) {
  try {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("username", "==", username));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return null;
    }

    const profileData = querySnapshot.docs[0].data();
    return {
      displayName: profileData.displayName || username,
      bio: profileData.bio || "",
    };
  } catch (e) {
    console.error(e);
    return null;
  }
}

async function loadGoogleFont(font: string, text: string) {
  const url = `https://fonts.googleapis.com/css2?family=${font}:wght@700&text=${encodeURIComponent(text)}`;
  const css = await (
    await fetch(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1',
      },
    })
  ).text();
  const resource = css.match(/src: url\((.+)\) format\('(truetype|opentype)'\)/);
  if (!resource) return null;
  const res = await fetch(resource[1]);
  return res.arrayBuffer();
}

export default async function Image({ params }: { params: Promise<{ username: string }> }) {
  const resolvedParams = await params;
  const username = resolvedParams.username;
  
  const profile = await getUserProfile(username);
  const displayName = profile?.displayName || username;
  const bio = profile?.bio || "";

  // 폰트에 포함할 텍스트 추출 (중복 제거를 위해 Set 활용)
  const fontText = "마이링크" + displayName + bio + username;
  const textChars = Array.from(new Set(fontText.split(''))).join('');
  const fontData = await loadGoogleFont('Noto+Sans+KR', textChars);

  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(to bottom right, #09090b, #18181b)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: '"Noto Sans KR", sans-serif',
          color: 'white',
        }}
      >
        {/* 상단 로고 */}
        <div
          style={{
            position: 'absolute',
            top: 50,
            left: 50,
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            fontSize: '32px',
            fontWeight: 700,
            color: '#e4e4e7',
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
          </svg>
          마이링크
        </div>

        {/* 프로필 콘텐츠 */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '24px',
            textAlign: 'center',
            padding: '0 40px',
          }}
        >
          {/* 프로필 이미지 아이콘 (기본 👤) */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '140px',
              height: '140px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #27272a, #09090b)',
              border: '4px solid #3f3f46',
              boxShadow: '0 8px 30px rgba(0,0,0,0.4)',
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="70"
              height="70"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#a1a1aa"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>

          {/* 텍스트 영역 */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            {/* 디스플레이 네임 */}
            <div
              style={{
                fontSize: '64px',
                fontWeight: 700,
                color: '#ffffff',
                letterSpacing: '-0.02em',
              }}
            >
              {displayName}
            </div>

            {/* 사용자 아이디 */}
            <div
              style={{
                fontSize: '32px',
                fontWeight: 500,
                color: '#a1a1aa',
                letterSpacing: '-0.01em',
              }}
            >
              @{username}
            </div>

            {/* 소개글 */}
            {bio && (
              <div
                style={{
                  fontSize: '36px',
                  color: '#71717a',
                  marginTop: '12px',
                  maxWidth: '700px',
                  whiteSpace: 'pre-wrap',
                  lineHeight: '1.4',
                }}
              >
                {bio}
              </div>
            )}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: fontData
        ? [
            {
              name: 'Noto Sans KR',
              data: fontData,
              style: 'normal',
              weight: 700,
            },
          ]
        : undefined,
    }
  );
}
