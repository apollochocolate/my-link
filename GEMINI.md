# 🚀 MyLink Project Guide

## 📌 Project Overview
**MyLink** is a simple 'link-in-bio' service for developers and creators to aggregate their works, portfolios, and social media channels into a single link. It focuses on providing an intuitive link list with a clean design, avoiding complex themes or widgets.

## 🛠 Tech Stack
- **Framework**: Next.js 16 (App Router, Turbopack)
- **Library**: React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4, shadcn/ui
- **Icons**: Tabler Icons (@tabler/icons-react)
- **Fonts**: Geist, Geist Mono, Source Sans 3
- **Backend**: Firebase (Authentication, Firestore)

## 📁 Key Directory Structure
- `app/`: Next.js App Router pages and layouts
- `components/`: Reusable UI components (shadcn/ui in `components/ui`)
- `hooks/`: Custom React hooks
- `lib/`: Common utility functions and configurations
- `.docs/`: Planning docs (PRD, User Scenario, Wireframe)

## 🎨 UI/UX Design Principles (Based on Wireframe)
1. **Extreme Simplicity**: No profile image uploads. Use a default icon (`[👤]`) and text (display name, bio) only.
2. **Link Sorting**: Newest links appear at the **top** (Reverse Chronological).
3. **Admin View Layout**:
    - **Desktop**: 2-column layout (Settings on left, Live Mobile Preview on right).
    - **Mobile**: Hide preview; show settings in full width.
4. **Automation**: Extract icons automatically from URLs using Google Favicon API.

## ⚙️ Commands
- `npm run dev`: Start dev server (Turbopack)
- `npm run build`: Build and validate project
- `npm run lint`: ESLint check
- `npm run typecheck`: TypeScript check
- `npm run format`: Prettier formatting

## 📝 Development Conventions
1. **Components**: Use `shadcn/ui` and ensure mobile-first responsive design.
2. **Data Structure**: Firestore `users` collection with `links` sub-collection.
3. **URL Handling**: Automatically prepend `https://` if missing.

## 🚧 Current Progress (TODO)
- [ ] Install and configure Firebase SDK
- [ ] Implement Google Social Login (Firebase Auth)
- [ ] Develop Admin Page (2-column layout & Live Preview)
- [ ] Link CRUD with Firestore (Newest-first sorting)
- [ ] Develop Public Profile Page (Responsive view)
- [ ] Integrate Google Favicon API
