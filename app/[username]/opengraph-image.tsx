import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

async function loadGoogleFont(font: string, text: string) {
  const url = `https://fonts.googleapis.com/css2?family=${font}:wght@700;900&text=${encodeURIComponent(text)}`;
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

export default async function Image({ params }: { params: { username: string } }) {
  const username = params.username;
  // 폰트에 포함할 텍스트 추출 (중복 제거를 위해 Set 활용)
  const textChars = Array.from(new Set(('마이링크' + username).split(''))).join('');
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
        <div
          style={{
            position: 'absolute',
            top: 40,
            left: 40,
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            fontSize: '32px',
            fontWeight: 700,
            color: '#a1a1aa',
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
          </svg>
          마이링크
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '30px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '160px',
              height: '160px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #3f3f46, #27272a)',
              boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
              border: '4px solid #52525b',
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="80"
              height="80"
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
          
          <div
            style={{
              fontSize: '80px',
              fontWeight: 700,
              color: '#f4f4f5',
              letterSpacing: '-0.02em',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            @{username}
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
