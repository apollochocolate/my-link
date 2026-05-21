# 🚀 마이링크 (MyLink)

> 개발자와 크리에이터를 위한 초간결, 초스피드 '링크인바이오(Link-in-Bio)' 서비스입니다.  
> 복잡한 테마나 위젯 대신, 오로지 본질인 **'링크'**와 **'프로필'**에만 집중하여 직관적인 연결을 제공합니다.

---

## 📌 프로젝트 소개
**마이링크(MyLink)**는 흩어져 있는 개인의 포트폴리오, 작업물, 소셜 미디어 채널 등을 단 하나의 링크로 모아주는 서비스입니다. 
불필요한 기능과 복잡한 설정을 걷어내고, 방문자가 오직 작성자의 링크 리스트에만 몰입할 수 있도록 디자인되었습니다.

---

## ✨ 핵심 기능 (Key Features)

### 🔑 1. 초간편 구글 소셜 로그인
- **Firebase Auth** 연동을 통한 빠르고 안전한 Google 소셜 로그인 지원
- 가입 시 구글 이메일 아이디의 앞자리(예: `username@gmail.com`에서 `username`)를 추출하여, 본인만의 개인 접속 URL Slug 및 초기 닉네임으로 자동 설정

### 👤 2. 심플한 프로필 설정 (관리자 뷰)
- **실시간 프로필 편집**: 닉네임(`displayName`)과 짧은 소개글(`bio`) 입력 및 수정 가능
- **동적 URL 연동**: 닉네임을 변경하면 개인 프로필 페이지의 접속 주소(예: `/new-username`)가 자동으로 함께 업데이트됩니다.

### 🔗 3. 링크 리스트 CRUD & 파비콘 자동 추출
- **링크 관리**: 제목(Title)과 URL을 입력하여 간편하게 링크 블록 생성, 수정, 삭제 가능
- **자동 파비콘 가져오기**: 직접 아이콘이나 이미지를 업로드할 필요 없이, **Google Favicon API**를 이용해 입력한 URL의 파비콘 이미지를 실시간으로 자동 렌더링
- **정렬 규칙**: 가장 최근에 등록한 링크가 가장 상단에 위치하는 역순 정렬(Reverse Chronological)

### 🎨 4. 반응형 퍼블릭 프로필 페이지 (방문자 뷰)
- 극도의 단순함(Extreme Simplicity)을 지향하며, 사용자 프로필(기본 아이콘 + 닉네임 + 소개글)과 링크 리스트만 깔끔하게 노출
- **데스크톱 & 모바일 완벽 대응**: 언제 어디서나 깔끔한 화면을 제공하는 반응형 UI
- **2-Column Layout**: 관리자 화면에서는 데스크톱 기준 왼쪽에는 설정 창, 오른쪽에는 실시간 모바일 프리뷰 화면을 배치해 변경 사항을 한눈에 확인 가능 (모바일에서는 프리뷰 자동 숨김 처리)

### 🖼️ 5. 동적 오픈그래프 이미지 (Dynamic OG Image)
- **`@vercel/og`** 기술을 활용하여 사용자마다 개별화된 동적 OG 이미지 생성 및 메타 태그 주입
- SNS(카카오톡, 디스코드, 트위터 등)에 개인 링크 공유 시, 해당 사용자의 닉네임과 로고가 박힌 전용 공유 카드 이미지를 실시간으로 자동 렌더링

### 📊 6. 방문 통계 대시보드 (Stats Dashboard)
- 프로필 페이지의 총 누적 방문 수 추적
- 각 링크 버튼별 클릭 횟수를 카운팅하여 어떤 링크가 가장 많은 관심을 받았는지 데이터 대시보드로 시각화 제공

---

## 🛠 기술 스택 (Tech Stack)

| 구분 | 기술 스택 | 비고 |
| :--- | :--- | :--- |
| **Framework** | Next.js 16 (App Router, Turbopack) | 최신 Next.js 및 개발 환경 최적화 |
| **Library** | React 19, TypeScript | 고성능 컴포넌트 렌더링 및 안정적인 타입 체킹 |
| **Styling** | Tailwind CSS 4, shadcn/ui | 유연하고 현대적인 스타일링 및 UI 프레셋 적용 |
| **Backend** | Firebase (Authentication, Firestore) | 실시간 동기화 및 클라우드 데이터베이스 |
| **Icons & Fonts**| Tabler Icons (`@tabler/icons-react`), Geist, Source Sans 3 | 미려하고 가독성 높은 폰트 및 아이콘 세트 |
| **Dynamic Media**| `@vercel/og` | 동적 공유 이미지 생성 |

---

## 📁 디렉토리 구조 (Directory Structure)

```bash
my-link/
├── .docs/                 # 기획 문서 (PRD, 사용자 시나리오, 와이어프레임)
├── app/                   # Next.js App Router (페이지 및 레이아웃)
│   ├── [username]/        # 사용자 퍼블릭 프로필 페이지 & Dynamic OG 생성기
│   ├── actions/           # 서버 액션 및 통계 트래킹 로직
│   ├── stats/             # 방문 및 클릭 통계 대시보드 페이지
│   ├── globals.css        # Tailwind CSS 전역 스타일 및 디자인 토큰
│   └── page.tsx           # 메인 홈 / 어드민 페이지 관리
├── components/            # 재사용 가능한 공통 UI 컴포넌트
│   └── ui/                # shadcn/ui 기반 컴포넌트 프리셋
├── hooks/                 # 커스텀 React 훅
├── lib/                   # Firebase 초기화 및 공통 유틸리티 함수
├── public/                # 정적 에셋 (기본 아이콘 및 로고 등)
└── GEMINI.md              # AI 에이전트 전용 개발 가이드라인
```

---

## 💾 데이터베이스 모델링 (Firebase Firestore)

Firestore는 대용량의 미디어 파일 처리 없이 가볍고 효율적인 텍스트 위주의 NoSQL 구조로 모델링되었습니다.

### 1. `users` Collection (사용자 프로필)
- **Document ID**: `uid` (Firebase Auth UID)
- **스키마**:
  ```json
  {
    "email": "string (구글 연동 이메일)",
    "username": "string (구글 계정 본명)",
    "displayName": "string (화면 노출 닉네임 / URL Slug)",
    "bio": "string (한 줄 소개글)",
    "createdAt": "timestamp (가입 일자)"
  }
  ```

### 2. `users/{uid}/links` Sub-Collection (개인 등록 링크 목록)
- **Document ID**: 자동 생성 ID
- **스키마**:
  ```json
  {
    "title": "string (링크 버튼 타이틀)",
    "url": "string (이동할 주소)",
    "createdAt": "timestamp (정렬 기준이 되는 링크 등록 시간)"
  }
  ```
  *(💡 파비콘 이미지는 DB에 저장하지 않고, 클라이언트에서 입력된 `url`을 Google Favicon API 주소와 결합하여 실시간으로 렌더링합니다.)*

---

## ⚙️ 실행 방법 (Getting Started)

### 1. 환경 변수 설정
프로젝트 루트 디렉토리에 `.env.local` 파일을 생성한 후 아래와 같이 Firebase 자격 증명을 입력합니다.
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 2. 패키지 설치 및 로컬 서버 시작
```bash
# 의존성 패키지 설치
npm install

# Turbopack 기반 개발용 로컬 서버 구동 (http://localhost:3000)
npm run dev
```

### 3. 유용한 명령어
- `npm run build`: 프로덕션 배포용 빌드 및 코드 적합성 검증
- `npm run lint`: ESLint 코드 스타일 검사
- `npm run typecheck`: TypeScript 타입 안정성 검사
- `npm run format`: Prettier 코드 포맷 정렬
