# BrightSecure - Complete Development Documentation

**Last Updated:** January 21, 2025

---

## Table of Contents

1. [Overview](#overview)
2. [Tech Stack](#tech-stack)
3. [Repository Structure](#repository-structure)
4. [Frontend Architecture](#frontend-architecture)
5. [Backend Architecture](#backend-architecture)
6. [Database Schema](#database-schema)
7. [Security & Compliance](#security--compliance)
8. [API Reference](#api-reference)
9. [Deployment](#deployment)
10. [Recent Developments](#recent-developments)
11. [Environment Variables](#environment-variables)
12. [Development Commands](#development-commands)

---

## Overview

BrightSecure is a HIPAA-compliant AI-powered receptionist service for healthcare and professional services. The platform:

- Answers business calls 24/7 using AI (powered by Vapi.ai)
- Books appointments automatically
- Sends encrypted transcripts via Paubox (HIPAA-compliant email)
- Supports multi-tenant organizations with role-based access
- Provides A/B testing for AI prompt optimization

**Target Industries:** Law firms, medical practices, dental offices, accounting firms, financial advisors, chiropractors, therapists, real estate agencies.

---

## Tech Stack

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 14.2.0 | React framework with App Router |
| TypeScript | 5.x | Type-safe JavaScript |
| Tailwind CSS | 3.x | Utility-first CSS framework |
| Zustand | 4.x | State management (auth) |
| Recharts | 2.x | Chart components |
| Lucide React | - | Icon library |
| Axios | 1.x | HTTP client |

### Backend

| Technology | Version | Purpose |
|------------|---------|---------|
| Django | 5.x | Python web framework |
| Django REST Framework | 3.x | REST API toolkit |
| PostgreSQL | 15.x | Primary database (Railway) |
| SimpleJWT | 5.x | JWT authentication |
| Celery | 5.x | Async task queue |
| Redis | 7.x | Cache & message broker |
| Whitenoise | 6.x | Static file serving |

### Third-Party Integrations

| Service | Purpose |
|---------|---------|
| **Vapi.ai** | AI voice assistant for call handling |
| **Twilio** | Phone number provisioning & call routing |
| **Paubox** | HIPAA-compliant encrypted email |
| **Stripe** | Payment processing & subscriptions |
| **Sentry** | Error tracking (optional) |

### Infrastructure

| Platform | Service |
|----------|---------|
| **Vercel** | Frontend hosting (Next.js) |
| **Railway** | Backend hosting (Django) + PostgreSQL |
| **GitHub** | Source code repositories |

---

## Repository Structure

```
brightsecure/
├── frontend/                    # Next.js frontend (deployed to Vercel)
│   ├── app/                     # Next.js App Router pages
│   ├── components/              # React components
│   ├── lib/                     # Utilities, API client, auth
│   ├── public/                  # Static assets
│   └── tailwind.config.ts       # Tailwind configuration
│
├── backend/                     # Django backend (deployed to Railway)
│   ├── apps/                    # Django applications
│   │   ├── accounts/            # User authentication & profiles
│   │   ├── organizations/       # Multi-tenant organizations
│   │   ├── calls/               # Call handling & Vapi webhooks
│   │   ├── appointments/        # Appointment scheduling
│   │   ├── billing/             # Stripe subscriptions
│   │   ├── notifications/       # Email notifications (Paubox)
│   │   └── dashboard/           # Dashboard analytics
│   ├── core/                    # Django project settings
│   │   └── settings/            # Environment-specific settings
│   └── utils/                   # Shared utilities
│
└── mobile/                      # React Native app (planned)
```

---

## Frontend Architecture

### Route Groups (Next.js App Router)

```
app/
├── (admin)/                     # Admin-only routes (staff/superuser)
│   ├── admin/page.tsx           # Admin dashboard
│   ├── admin/optimization/      # AI A/B testing management
│   └── layout.tsx               # Admin layout with access control
│
├── (auth)/                      # Authentication routes (public)
│   ├── login/
│   ├── register/
│   ├── forgot-password/
│   ├── verify-email/
│   ├── verification-required/
│   └── resend-verification/
│
├── (dashboard)/                 # Main app (authenticated users)
│   ├── dashboard/               # User dashboard
│   ├── calendar/                # Appointment calendar
│   ├── calls/                   # Call history & details
│   ├── billing/                 # Subscription management
│   ├── settings/                # Account settings
│   └── layout.tsx               # Dashboard layout with sidebar
│
├── blog/                        # Marketing blog pages
├── industries/                  # Industry landing pages
├── pricing/                     # Pricing page
├── privacy/                     # Privacy policy
├── terms/                       # Terms of service
└── page.tsx                     # Homepage
```

### Key Components

| Component | Location | Purpose |
|-----------|----------|---------|
| `AIOptimizationSettings` | `components/settings/` | A/B testing management UI |
| `PromptPerformanceChart` | `components/charts/` | Variant performance visualization |
| `VoiceDemo` | `components/demo/` | Interactive voice demo on homepage |
| `Avatar`, `Button`, `Card` | `components/ui/` | Reusable UI primitives |

### State Management

- **Auth Store** (`lib/auth.ts`): Zustand store for authentication
  - User data, tokens, login/logout/register actions
  - Persisted to localStorage

- **API Client** (`lib/api.ts`): Axios-based API client
  - Automatic token injection
  - Token refresh on 401
  - Organized by resource (authApi, callsApi, organizationsApi, etc.)

---

## Backend Architecture

### Django Apps

#### `accounts` - User Management
- Custom User model with email as username
- JWT authentication with refresh tokens
- Email verification & password reset
- User profiles with notification preferences
- **AuditLog** model for HIPAA compliance

#### `organizations` - Multi-Tenant Support
- Organization model with industry types
- OrganizationMember with roles (Owner, Admin, Rep)
- Business hours configuration
- Greeting messages (Welcome, After Hours, Holiday, etc.)
- Call handling settings
- Company profiles with branding

#### `calls` - Call Handling & AI
- Call model with Twilio/Vapi integration
- Message model for conversation transcripts
- VapiAssistant configuration per organization
- **PromptVariant** for A/B testing
- **PromptVariantStats** for performance metrics
- Webhooks for Twilio & Vapi events

#### `appointments` - Scheduling
- Appointment model with status workflow
- Time slot management
- Integration with business hours

#### `billing` - Subscriptions
- Stripe integration
- Subscription tiers (Trial, Basic, Pro, Enterprise)
- Usage tracking

#### `notifications` - Email
- Paubox HIPAA-compliant email backend
- Email templates
- Notification preferences

---

## Database Schema

### Core Models

#### User (accounts.User)
```
- id: UUID (primary key)
- email: string (unique)
- first_name, last_name: string
- phone: string
- role: enum (user, admin, super_admin)
- is_active, is_staff, is_verified: boolean
- created_at, updated_at, last_login_at: datetime
```

#### Organization (organizations.Organization)
```
- id: UUID (primary key)
- name: string
- slug: string (unique)
- industry_type: enum (legal, medical, dental, accounting, etc.)
- email, phone, website: string
- address fields: line1, line2, city, state, postal, country
- twilio_phone_number, twilio_phone_sid: string
- voice: FK to VoiceOption
- subscription_tier: enum (trial, basic, pro, enterprise)
- stripe_customer_id: string
- timezone: string
- settings: JSON
- is_active, is_onboarded: boolean
- trial_ends_at: datetime
```

#### Call (calls.Call)
```
- id: UUID (primary key)
- organization: FK to Organization
- prompt_variant: FK to PromptVariant (A/B testing)
- twilio_sid, vapi_call_id: string
- caller_phone, caller_name: string
- caller_city, caller_state, caller_country: string
- to_phone: string
- direction: string (inbound/outbound)
- started_at, answered_at, ended_at: datetime
- duration_seconds: integer
- status: enum (ringing, in_progress, completed, failed, etc.)
- outcome: enum (appointment_booked, message_taken, transferred, etc.)
- transcript, summary: text
- recording_url: string
- extracted_data: JSON
```

#### PromptVariant (calls.PromptVariant)
```
- id: UUID (primary key)
- organization: FK to Organization
- name, description: string
- system_prompt, first_message: text
- status: enum (draft, active, paused, winner, archived)
- traffic_percentage: integer (0-100)
- is_control: boolean
```

### Relationships

```
User ─────┬──── OrganizationMember ────┬──── Organization
          │                            │
          │                            ├──── Call ────── PromptVariant
          │                            │
          │                            ├──── VapiAssistant
          │                            │
          │                            ├──── BusinessHours
          │                            │
          │                            └──── GreetingMessage
          │
          └──── AuditLog (HIPAA compliance)
```

---

## Security & Compliance

### HIPAA Compliance

| Requirement | Implementation |
|-------------|----------------|
| **Access Control** | JWT authentication, role-based permissions |
| **Audit Trail** | AuditLog model tracks all PHI access |
| **Encryption in Transit** | HTTPS enforced, TLS 1.2+ |
| **Encryption at Rest** | PostgreSQL encryption, secure secrets |
| **Secure Email** | Paubox HIPAA-compliant email delivery |
| **Business Associate Agreement** | Available for all accounts |
| **Minimum Necessary** | Role-based access limits data exposure |

### Additional Compliance

- **PIPEDA** (Canada): Privacy policy, consent management
- **PHIPA** (Ontario): Healthcare-specific privacy
- **GDPR Ready** (EU): Data export, deletion capabilities

### Security Headers (Production)

```python
SECURE_BROWSER_XSS_FILTER = True
SECURE_CONTENT_TYPE_NOSNIFF = True
X_FRAME_OPTIONS = 'DENY'
SECURE_HSTS_SECONDS = 31536000  # 1 year
SECURE_HSTS_INCLUDE_SUBDOMAINS = True
SECURE_HSTS_PRELOAD = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
```

### Authentication

- **JWT Tokens**: Access (15 min) + Refresh (7 days)
- **Token Rotation**: New refresh token on each refresh
- **Blacklisting**: Revoked tokens are blacklisted
- **Password Validation**: Min 8 chars, no common passwords

### Rate Limiting

```python
'DEFAULT_THROTTLE_RATES': {
    'anon': '100/hour',
    'user': '1000/hour'
}
```

### Sentry Integration (Optional)

- Error tracking with PII filtering
- `send_default_pii=False` for HIPAA compliance

---

## API Reference

### Base URL
- Production: `https://brightsecure-backend-production.up.railway.app`

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login/` | Login, returns JWT tokens |
| POST | `/api/auth/register/` | Register new user + organization |
| POST | `/api/auth/logout/` | Logout, blacklist refresh token |
| POST | `/api/auth/token/refresh/` | Refresh access token |
| GET | `/api/auth/me/` | Get current user |
| POST | `/api/auth/verify-email/` | Verify email with token |
| POST | `/api/auth/resend-verification/` | Resend verification email |
| POST | `/api/auth/forgot-password/` | Request password reset |
| POST | `/api/auth/reset-password/` | Reset password with token |

### Calls Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/calls/` | List calls (paginated) |
| GET | `/api/calls/{id}/` | Get call details |
| GET | `/api/calls/stats/` | Call statistics |

### Prompt Variants (Admin)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/calls/prompt-variants/` | List variants |
| POST | `/api/calls/prompt-variants/` | Create variant |
| GET | `/api/calls/prompt-variants/{id}/` | Get variant |
| PATCH | `/api/calls/prompt-variants/{id}/` | Update variant |
| DELETE | `/api/calls/prompt-variants/{id}/` | Delete variant |
| POST | `/api/calls/prompt-variants/{id}/activate/` | Activate for A/B test |
| POST | `/api/calls/prompt-variants/{id}/pause/` | Pause variant |
| POST | `/api/calls/prompt-variants/{id}/promote/` | Promote as winner |
| GET | `/api/calls/prompt-analytics/` | Performance metrics |

### Organizations

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/organizations/` | List organizations |
| GET | `/api/organizations/{id}/` | Get organization |
| PATCH | `/api/organizations/{id}/` | Update organization |

### Webhooks

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/webhooks/twilio/voice/` | Twilio voice webhook |
| POST | `/api/webhooks/vapi/` | Vapi.ai webhook |
| POST | `/api/webhooks/stripe/` | Stripe webhook |

---

## Deployment

### Frontend (Vercel)

| Setting | Value |
|---------|-------|
| **URL** | https://brightsecure-frontend.vercel.app |
| **GitHub Repo** | FazleAliNaqvi/brightsecure-frontend |
| **Branch** | main |
| **Framework** | Next.js |
| **Build Command** | `npm run build` |
| **Output Directory** | `.next` |

### Backend (Railway)

| Setting | Value |
|---------|-------|
| **URL** | https://brightsecure-backend-production.up.railway.app |
| **GitHub Repo** | FazleAliNaqvi/brightsecure-backend |
| **Branch** | main |
| **Database** | PostgreSQL (Railway plugin) |
| **Start Command** | `gunicorn core.wsgi:application` |

### Deployment Flow

1. Push to `main` branch on GitHub
2. Vercel/Railway automatically detects changes
3. Builds and deploys to production
4. Zero-downtime deployment

---

## Recent Developments

### January 2025

#### AI Prompt Optimization & A/B Testing (Admin Only)
- **PromptVariant** model for storing different prompt versions
- **PromptVariantStats** for cached performance metrics
- Weighted random selection for traffic distribution
- Admin dashboard at `/admin` with staff-only access
- Organization selector for managing prompts across clients
- Performance comparison charts (Recharts)

#### Files Modified
- `backend/apps/calls/models.py` - PromptVariant, PromptVariantStats
- `backend/apps/calls/views.py` - PromptVariantViewSet
- `backend/apps/calls/webhooks.py` - Variant selection logic
- `frontend/app/(admin)/` - Admin route group
- `frontend/components/settings/AIOptimizationSettings.tsx`
- `frontend/lib/auth.ts` - Added is_staff, is_superuser to User type

#### Homepage Spacing Updates
- Updated section padding for better visual hierarchy
- Inspired by hookpoint.com design
- Further refinements pending

---

## Environment Variables

### Frontend (.env.local)

```bash
NEXT_PUBLIC_API_URL=https://brightsecure-backend-production.up.railway.app
```

### Backend (.env)

```bash
# Django
SECRET_KEY=<your-secret-key>
DEBUG=False
ALLOWED_HOSTS=brightsecure-backend-production.up.railway.app

# Database
DATABASE_URL=postgresql://user:pass@host:5432/dbname

# JWT
JWT_SECRET_KEY=<your-jwt-secret>
JWT_ACCESS_TOKEN_LIFETIME=15
JWT_REFRESH_TOKEN_LIFETIME=7

# Twilio
TWILIO_ACCOUNT_SID=<your-twilio-sid>
TWILIO_AUTH_TOKEN=<your-twilio-token>
TWILIO_PHONE_NUMBER=<your-twilio-number>

# Vapi.ai
VAPI_API_KEY=<your-vapi-key>
VAPI_ASSISTANT_ID=<your-vapi-assistant>

# Stripe
STRIPE_SECRET_KEY=<your-stripe-secret>
STRIPE_PUBLISHABLE_KEY=<your-stripe-publishable>
STRIPE_WEBHOOK_SECRET=<your-stripe-webhook>

# Paubox (HIPAA Email)
PAUBOX_API_KEY=<your-paubox-key>

# Redis (optional)
REDIS_URL=redis://localhost:6379/0

# Sentry (optional)
SENTRY_DSN=<your-sentry-dsn>
```

---

## Development Commands

### Frontend

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Type checking
npm run type-check

# Lint
npm run lint
```

### Backend

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Start development server
python manage.py runserver

# Run Celery worker (for async tasks)
celery -A core worker -l info

# Run Celery beat (for scheduled tasks)
celery -A core beat -l info
```

---

## Design System

### Color Palette (Tailwind)

```css
/* Primary - Coral Red (Airbnb-inspired) */
primary-500: #FF5A5F

/* Secondary - Teal */
secondary-500: #00A699

/* Neutrals */
dark: #484848
light: #767676
surface: #F7F7F7
border: #EBEBEB
```

### Typography

- **Font Family**: Inter, system-ui, sans-serif
- **Headings**: Bold, dark color
- **Body**: Regular, light color

### Shadows

```css
shadow-airbnb: 0 1px 2px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.05)
shadow-airbnb-lg: 0 2px 8px rgba(0,0,0,0.08), 0 8px 24px rgba(0,0,0,0.08)
shadow-airbnb-xl: 0 4px 12px rgba(0,0,0,0.08), 0 16px 32px rgba(0,0,0,0.12)
```

---

## CI/CD Pipeline

### Automated Testing Script

Create a file `scripts/test-flow.sh` to test the entire application flow:

```bash
#!/bin/bash

# BrightSecure CI/CD Test Script
# Tests the complete application flow

set -e  # Exit on any error

echo "=========================================="
echo "BrightSecure CI/CD Test Suite"
echo "=========================================="

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Test counters
PASSED=0
FAILED=0

# Function to log test results
log_result() {
    if [ $1 -eq 0 ]; then
        echo -e "${GREEN}✓ PASS${NC}: $2"
        ((PASSED++))
    else
        echo -e "${RED}✗ FAIL${NC}: $2"
        ((FAILED++))
    fi
}

echo ""
echo "--- Frontend Tests ---"

# 1. Frontend - Check dependencies
echo "Checking frontend dependencies..."
cd frontend
npm install --silent
log_result $? "Frontend dependencies installed"

# 2. Frontend - Type checking
echo "Running TypeScript type check..."
npm run type-check 2>/dev/null
log_result $? "TypeScript type check"

# 3. Frontend - Lint
echo "Running ESLint..."
npm run lint 2>/dev/null
log_result $? "ESLint check"

# 4. Frontend - Build
echo "Building frontend for production..."
npm run build 2>/dev/null
log_result $? "Frontend production build"

cd ..

echo ""
echo "--- Backend Tests ---"

# 5. Backend - Check dependencies
echo "Checking backend dependencies..."
cd backend
source venv/bin/activate 2>/dev/null || python -m venv venv && source venv/bin/activate
pip install -r requirements.txt --quiet
log_result $? "Backend dependencies installed"

# 6. Backend - Django check
echo "Running Django system checks..."
python manage.py check --deploy 2>/dev/null
log_result $? "Django system checks"

# 7. Backend - Migrations check
echo "Checking for pending migrations..."
python manage.py makemigrations --check --dry-run 2>/dev/null
log_result $? "No pending migrations"

# 8. Backend - Run tests
echo "Running Django tests..."
python manage.py test --verbosity=0 2>/dev/null
log_result $? "Django unit tests"

cd ..

echo ""
echo "--- API Health Checks ---"

# 9. Backend API health check (production)
echo "Checking backend API health..."
BACKEND_STATUS=$(curl -s -o /dev/null -w "%{http_code}" https://brightsecure-backend-production.up.railway.app/api/health/ 2>/dev/null || echo "000")
if [ "$BACKEND_STATUS" = "200" ]; then
    log_result 0 "Backend API responding (HTTP $BACKEND_STATUS)"
else
    log_result 1 "Backend API check (HTTP $BACKEND_STATUS)"
fi

# 10. Frontend health check (production)
echo "Checking frontend health..."
FRONTEND_STATUS=$(curl -s -o /dev/null -w "%{http_code}" https://brightsecure-frontend.vercel.app/ 2>/dev/null || echo "000")
if [ "$FRONTEND_STATUS" = "200" ]; then
    log_result 0 "Frontend responding (HTTP $FRONTEND_STATUS)"
else
    log_result 1 "Frontend check (HTTP $FRONTEND_STATUS)"
fi

echo ""
echo "=========================================="
echo "Test Summary"
echo "=========================================="
echo -e "${GREEN}Passed: $PASSED${NC}"
echo -e "${RED}Failed: $FAILED${NC}"
echo ""

if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}All tests passed!${NC}"
    exit 0
else
    echo -e "${RED}Some tests failed. Please review.${NC}"
    exit 1
fi
```

### GitHub Actions Workflow

Create `.github/workflows/ci.yml` in both repos:

```yaml
# .github/workflows/ci.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  # Frontend CI
  frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Type check
        run: npm run type-check

      - name: Lint
        run: npm run lint

      - name: Build
        run: npm run build
        env:
          NEXT_PUBLIC_API_URL: ${{ secrets.NEXT_PUBLIC_API_URL }}

  # Backend CI (for backend repo)
  backend:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_USER: test
          POSTGRES_PASSWORD: test
          POSTGRES_DB: test_db
        ports:
          - 5432:5432
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5

    steps:
      - uses: actions/checkout@v4

      - name: Setup Python
        uses: actions/setup-python@v5
        with:
          python-version: '3.11'
          cache: 'pip'

      - name: Install dependencies
        run: pip install -r requirements.txt

      - name: Run Django checks
        run: python manage.py check --deploy
        env:
          DATABASE_URL: postgres://test:test@localhost:5432/test_db
          SECRET_KEY: test-secret-key
          DJANGO_SETTINGS_MODULE: core.settings.production

      - name: Run migrations
        run: python manage.py migrate
        env:
          DATABASE_URL: postgres://test:test@localhost:5432/test_db
          SECRET_KEY: test-secret-key
          DJANGO_SETTINGS_MODULE: core.settings.production

      - name: Run tests
        run: python manage.py test
        env:
          DATABASE_URL: postgres://test:test@localhost:5432/test_db
          SECRET_KEY: test-secret-key
          DJANGO_SETTINGS_MODULE: core.settings.production
```

### Manual Testing Checklist

Before each release, verify:

- [ ] User can register a new account
- [ ] Email verification works
- [ ] User can log in
- [ ] Dashboard loads with data
- [ ] Calls page displays call history
- [ ] Settings page loads all tabs
- [ ] Admin section accessible (staff only)
- [ ] AI Optimization page loads variants
- [ ] Homepage displays correctly
- [ ] All links work (no 404s)

---

## Known Issues / TODO

1. **Homepage spacing** - Needs fine-tuning (some sections larger than others)
2. **Admin pages** - Organizations and Users pages not yet implemented
3. **Mobile app** - Initial setup only, not developed
4. **Redis** - Not configured in production (using local memory cache)

---

## Session End Reminder

> **IMPORTANT FOR AI ASSISTANT:**
>
> At the end of EVERY coding session, you MUST:
>
> 1. **Update this DEVELOPMENT.md file** with any changes made during the session
> 2. **Add new features/fixes** to the "Recent Developments" section
> 3. **Update the CI/CD script** if new tests are needed
> 4. **Commit and push** the updated documentation
> 5. **Share the updated .md file** with the user
>
> This ensures the documentation stays current and the user always has
> an accurate reference for the codebase.

---

## Contact & Support

For questions about this codebase, refer to this documentation or the inline code comments.

**GitHub Issues**: https://github.com/FazleAliNaqvi/brightsecure-frontend/issues
