# BrightSecure Development Documentation

Last updated: January 21, 2025

## Overview

BrightSecure is an AI-powered receptionist service for healthcare and professional services. It answers business calls 24/7, books appointments, and sends HIPAA-compliant encrypted transcripts.

---

## Tech Stack

### Frontend
- **Framework**: Next.js 14.2.0 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom Airbnb-inspired design system
- **State Management**: Zustand (for auth)
- **Charts**: Recharts
- **Icons**: Lucide React
- **Deployment**: Vercel

### Backend
- **Framework**: Django 5.x with Django REST Framework
- **Database**: PostgreSQL (hosted on Railway)
- **Authentication**: JWT (SimpleJWT)
- **AI/Voice**: Vapi.ai integration
- **Email**: Paubox (HIPAA-compliant encrypted email)
- **Deployment**: Railway

### Mobile (Planned)
- **Framework**: React Native with Expo
- **Status**: Initial setup only

---

## Repository Structure

```
brightsecure/
├── frontend/          # Next.js frontend (Vercel)
├── backend/           # Django backend (Railway)
└── mobile/            # React Native mobile app (planned)
```

---

## Deployment URLs

| Service | URL | Platform |
|---------|-----|----------|
| Frontend | https://brightsecure-frontend.vercel.app | Vercel |
| Backend API | https://brightsecure-backend-production.up.railway.app | Railway |
| GitHub (Frontend) | https://github.com/FazleAliNaqvi/brightsecure-frontend | GitHub |
| GitHub (Backend) | https://github.com/FazleAliNaqvi/brightsecure-backend | GitHub |

---

## Frontend Structure

```
frontend/
├── app/
│   ├── (admin)/           # Admin-only routes (staff/superuser)
│   │   ├── admin/
│   │   │   ├── page.tsx           # Admin dashboard
│   │   │   └── optimization/      # AI A/B testing
│   │   └── layout.tsx             # Admin layout with access control
│   ├── (auth)/            # Authentication pages
│   │   ├── login/
│   │   ├── register/
│   │   ├── forgot-password/
│   │   ├── verify-email/
│   │   └── verification-required/
│   ├── (dashboard)/       # Main app (authenticated users)
│   │   ├── dashboard/
│   │   ├── calendar/
│   │   ├── calls/
│   │   ├── billing/
│   │   ├── settings/
│   │   └── layout.tsx     # Dashboard layout with sidebar
│   ├── blog/              # Blog pages
│   ├── industries/        # Industry landing pages
│   ├── pricing/
│   ├── privacy/
│   ├── terms/
│   └── page.tsx           # Homepage
├── components/
│   ├── ui/                # Reusable UI components
│   ├── charts/            # Recharts components
│   ├── demo/              # Voice demo component
│   ├── settings/          # Settings components
│   └── seo/               # SEO schema components
├── lib/
│   ├── api.ts             # API client (axios)
│   ├── auth.ts            # Auth store (zustand)
│   └── utils.ts           # Utility functions
└── tailwind.config.ts     # Tailwind configuration
```

---

## Backend Structure

```
backend/
├── apps/
│   ├── users/             # User management, authentication
│   ├── organizations/     # Multi-tenant organizations
│   ├── calls/             # Call handling, Vapi webhooks
│   │   ├── models.py      # Call, PromptVariant, PromptVariantStats
│   │   ├── views.py       # CallViewSet, PromptVariantViewSet
│   │   ├── webhooks.py    # Twilio/Vapi webhooks
│   │   └── serializers.py
│   └── billing/           # Subscription management
├── brightsecure/          # Django project settings
└── manage.py
```

---

## Recent Developments (January 2025)

### AI Prompt Optimization & A/B Testing (Admin Only)

Added a complete A/B testing system for AI prompts:

**Backend:**
- `PromptVariant` model - stores different prompt versions with status (draft/active/paused/winner/archived)
- `PromptVariantStats` model - cached performance statistics per variant
- `Call.prompt_variant` FK - tracks which variant was used per call
- Weighted random selection for traffic distribution
- Auto-updates stats when calls complete

**Frontend:**
- Admin section at `/admin` with staff-only access
- AI Optimization page at `/admin/optimization`
- Organization selector for managing prompts across clients
- Performance comparison charts (Recharts)
- Create/edit/activate/pause/promote variants

**Files Modified:**
- `backend/apps/calls/models.py` - PromptVariant, PromptVariantStats models
- `backend/apps/calls/views.py` - PromptVariantViewSet, PromptAnalyticsView
- `backend/apps/calls/webhooks.py` - Variant selection and stats updates
- `frontend/app/(admin)/` - New admin route group
- `frontend/components/settings/AIOptimizationSettings.tsx`
- `frontend/components/charts/PromptPerformanceChart.tsx`
- `frontend/lib/api.ts` - promptVariantsApi methods
- `frontend/lib/auth.ts` - Added is_staff, is_superuser to User type

### Homepage Spacing Updates

Updated homepage section spacing for better visual hierarchy. Current values:
- Hero: `pt-28 pb-20 lg:pt-36 lg:pb-28`
- Voicemail Problem: `py-20 lg:py-28`
- Voice Demo: `py-24 lg:py-32`
- Features: `py-24 lg:py-36`
- Why Bright Secure: `py-28 lg:py-40`
- Industries: `py-28 lg:py-40`
- Compliance: `py-28 lg:py-40`
- CTA: `py-28 lg:py-40`
- Footer: `py-16 lg:py-20`

**Note:** Further spacing adjustments planned.

### Bug Fixes

- Fixed Settings dropdown link (was `/dashboard/settings`, now `/settings`)
- Added `is_staff` and `is_superuser` to User TypeScript interface

---

## API Endpoints

### Authentication
- `POST /api/auth/login/` - Login
- `POST /api/auth/register/` - Register
- `POST /api/auth/logout/` - Logout
- `GET /api/auth/me/` - Get current user
- `POST /api/auth/verify-email/` - Verify email
- `POST /api/auth/resend-verification/` - Resend verification email

### Calls
- `GET/POST /api/calls/` - List/create calls
- `GET /api/calls/{id}/` - Get call detail
- `GET /api/calls/stats/` - Call statistics

### Prompt Variants (Admin)
- `GET/POST /api/calls/prompt-variants/` - List/create variants
- `GET/PATCH/DELETE /api/calls/prompt-variants/{id}/` - Manage variant
- `POST /api/calls/prompt-variants/{id}/activate/` - Start A/B test
- `POST /api/calls/prompt-variants/{id}/pause/` - Pause variant
- `POST /api/calls/prompt-variants/{id}/promote/` - Make winner
- `GET /api/calls/prompt-analytics/` - Get variant performance metrics

### Organizations
- `GET /api/organizations/` - List organizations
- `GET /api/organizations/{id}/` - Get organization detail

---

## Environment Variables

### Frontend (Vercel)
```
NEXT_PUBLIC_API_URL=https://brightsecure-backend-production.up.railway.app
```

### Backend (Railway)
```
SECRET_KEY=<django-secret>
DATABASE_URL=<postgres-url>
VAPI_API_KEY=<vapi-key>
PAUBOX_API_KEY=<paubox-key>
TWILIO_ACCOUNT_SID=<twilio-sid>
TWILIO_AUTH_TOKEN=<twilio-token>
```

---

## Development Commands

### Frontend
```bash
cd frontend
npm install
npm run dev          # Start dev server (localhost:3000)
npm run build        # Production build
npm run type-check   # TypeScript check
```

### Backend
```bash
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver  # Start dev server (localhost:8000)
```

---

## Deployment

### Frontend (Vercel)
- Auto-deploys from `main` branch on GitHub
- Connected repo: `FazleAliNaqvi/brightsecure-frontend`
- Manual deploy: Push to main or use Vercel dashboard

### Backend (Railway)
- Auto-deploys from `main` branch on GitHub
- Connected repo: `FazleAliNaqvi/brightsecure-backend`

---

## Known Issues / TODO

1. **Homepage spacing** - Needs fine-tuning (some sections larger than others)
2. **Admin users/organizations pages** - Quick links exist but pages not yet implemented
3. **Mobile app** - Initial setup only, not developed

---

## Design System

### Colors (Tailwind)
- Primary (Coral Red): `primary-500: #FF5A5F`
- Secondary (Teal): `secondary-500: #00A699`
- Dark text: `dark: #484848`
- Light text: `light: #767676`
- Surface: `surface: #F7F7F7`
- Border: `border: #EBEBEB`

### Typography
- Font: Inter
- Headings: Bold, dark color
- Body: Regular, light color

### Shadows
- `shadow-airbnb` - Subtle card shadow
- `shadow-airbnb-lg` - Elevated card shadow
- `shadow-airbnb-xl` - Modal/dropdown shadow

---

## Contact

For questions about this codebase, refer to this documentation or the inline code comments.
