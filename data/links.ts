export interface LinkType {
  id: string;
  title: string;
  url: string;
  createdAt: string; // PRD 기준 Timestamp, 더미 데이터에서는 문자열 사용
}

export const profileData = {
  displayName: "@dev_jang",
  bio: "Designing the future of digital experiences 🚀",
};

export const dummyLinks: LinkType[] = [
  {
    id: '1',
    title: 'Instagram',
    url: 'https://instagram.com/',
    createdAt: new Date('2026-03-27T00:00:00Z').toISOString(),
  },
  {
    id: '2',
    title: 'YouTube',
    url: 'https://youtube.com/',
    createdAt: new Date('2026-03-27T01:00:00Z').toISOString(),
  },
  {
    id: '3',
    title: '블로그',
    url: 'https://velog.io/',
    createdAt: new Date('2026-03-27T02:00:00Z').toISOString(),
  },
  {
    id: '4',
    title: 'GitHub',
    url: 'https://github.com/',
    createdAt: new Date('2026-03-27T03:00:00Z').toISOString(),
  },
  {
    id: '5',
    title: '포트폴리오',
    url: 'https://my-portfolio.com',
    createdAt: new Date('2026-03-27T04:00:00Z').toISOString(),
  },
];
