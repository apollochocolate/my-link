import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = '마이링크 - 나만의 모든 링크를 한 곳에';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

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

export default async function Image() {
  const text = '마이링크나만의모든를한곳에';
  const fontData = await loadGoogleFont('Noto+Sans+KR', text);

  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(to bottom right, #ffffff, #f4f4f5)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: '"Noto Sans KR", sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid #e4e4e7',
            borderRadius: '40px',
            padding: '60px 100px',
            background: 'white',
            boxShadow: '0 20px 40px rgba(0,0,0,0.05)',
          }}
        >
          <div
            style={{
              fontSize: '80px',
              fontWeight: 700,
              color: '#09090b',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="80"
              height="80"
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
              fontSize: '40px',
              color: '#71717a',
              fontWeight: 700,
            }}
          >
            나만의 모든 링크를 한 곳에
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
