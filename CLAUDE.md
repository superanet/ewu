# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 SaaS starter template with authentication, Stripe payments, and team management. It uses the App Router with React Server Components and Server Actions.

## Development Commands

### Setup
```bash
pnpm install                 # Install dependencies
pnpm db:setup               # Create .env file (interactive setup)
pnpm db:migrate             # Run database migrations
pnpm db:seed                # Seed database with test user (test@test.com / admin123)
```

### Development
```bash
pnpm dev                    # Start dev server with Turbopack (http://localhost:3000)
pnpm build                  # Build for production
pnpm start                  # Start production server
```

### Database
```bash
pnpm db:generate            # Generate new migration from schema changes
pnpm db:migrate             # Apply migrations to database
pnpm db:studio              # Open Drizzle Studio (database GUI)
```

### Stripe (Local Testing)
```bash
stripe login                # Authenticate Stripe CLI
stripe listen --forward-to localhost:3000/api/stripe/webhook  # Listen for webhooks
```

## Architecture

### Route Structure

The app uses Next.js route groups for organization:

- **`app/(login)/`** - Unauthenticated routes (sign-in, sign-up)
  - Uses `actions.ts` for Server Actions (signIn, signUp)
  - Shared `login.tsx` component for auth forms

- **`app/(dashboard)/`** - Protected routes requiring authentication
  - `/` - Landing page with animated terminal
  - `/pricing` - Pricing page with Stripe checkout
  - `/dashboard` - Main dashboard with nested routes:
    - `/dashboard` - Overview
    - `/dashboard/general` - Team settings
    - `/dashboard/security` - User security settings
    - `/dashboard/activity` - Activity logs

- **`app/api/`** - API routes
  - `/api/stripe/checkout` - Create Stripe checkout session
  - `/api/stripe/webhook` - Handle Stripe webhooks
  - `/api/user` - User CRUD operations
  - `/api/team` - Team CRUD operations

### Authentication System

**JWT-based authentication with HTTP-only cookies:**

- `lib/auth/session.ts` - Core auth functions:
  - `hashPassword()` / `comparePasswords()` - bcrypt password hashing
  - `signToken()` / `verifyToken()` - JWT creation/validation using jose
  - `getSession()` - Retrieve current session from cookies
  - `setSession()` - Create new session cookie (24hr expiry)

- `middleware.ts` - Global middleware:
  - Protects `/dashboard/*` routes
  - Auto-refreshes session tokens on GET requests
  - Redirects unauthenticated users to `/sign-in`

- `lib/auth/middleware.ts` - Local middleware helpers:
  - `validatedAction()` - Validate Zod schemas for Server Actions
  - `validatedActionWithUser()` - Validate + require authenticated user
  - `withTeam()` - Require user + team membership

### Database Schema

**Drizzle ORM with PostgreSQL** (`lib/db/schema.ts`):

Core tables:
- `users` - User accounts with email/password
- `teams` - Team/organization entities with Stripe integration
- `teamMembers` - Many-to-many user-team relationships with roles
- `invitations` - Pending team invitations
- `activityLogs` - Audit trail for user actions

Key relationships:
- Users can belong to multiple teams via `teamMembers`
- Teams have Stripe customer/subscription IDs for billing
- Activity logs track actions with team/user context

**Database queries** (`lib/db/queries.ts`):
- Centralized query functions using Drizzle
- Use these instead of writing raw queries

### Payments Integration

**Stripe integration** (`lib/payments/`):

- `stripe.ts` - Stripe client initialization
- `actions.ts` - Server Actions for:
  - Creating checkout sessions
  - Managing subscriptions
  - Accessing customer portal

**Webhook handling** (`app/api/stripe/webhook/route.ts`):
- Processes `checkout.session.completed` events
- Updates team subscription status in database
- Validates webhook signatures using `STRIPE_WEBHOOK_SECRET`

### Activity Logging

The `ActivityType` enum in `lib/db/schema.ts` defines trackable events:
- Authentication events (SIGN_UP, SIGN_IN, SIGN_OUT)
- Account changes (UPDATE_PASSWORD, DELETE_ACCOUNT, UPDATE_ACCOUNT)
- Team operations (CREATE_TEAM, INVITE_TEAM_MEMBER, etc.)

Log activities using the `activityLogs` table with team/user context.

## Environment Variables

Required in `.env` (use `pnpm db:setup` to create):

```
POSTGRES_URL=postgresql://...          # Database connection string
STRIPE_SECRET_KEY=sk_test_...         # Stripe secret key
STRIPE_WEBHOOK_SECRET=whsec_...       # Stripe webhook signing secret
BASE_URL=http://localhost:3000        # Application base URL
AUTH_SECRET=...                        # JWT signing secret (use: openssl rand -base64 32)
```

## Key Patterns

### Server Actions

Server Actions are defined in `actions.ts` files within route groups:
- Use `'use server'` directive
- Validate inputs with Zod schemas via `validatedAction()` helpers
- Return `ActionState` objects with error/success messages
- Access via `useActionState()` hook in client components

### Role-Based Access Control (RBAC)

Two role levels:
- **Owner** - Full team management permissions
- **Member** - Limited permissions

Check roles in Server Actions before performing privileged operations.

### Type Safety

- Database types auto-generated from Drizzle schema
- Export types: `User`, `Team`, `TeamMember`, `ActivityLog`, `Invitation`
- Use `TeamDataWithMembers` for teams with populated member data

## Testing Credentials

Default seeded user:
- Email: `test@test.com`
- Password: `admin123`

Stripe test card:
- Number: `4242 4242 4242 4242`
- Expiration: Any future date
- CVC: Any 3 digits

## Important Notes

- Environment variables must be in `.env` (not `.env.local`) for Drizzle to work
- Session cookies expire after 24 hours and auto-refresh on GET requests
- All protected routes must start with `/dashboard` to be caught by middleware
- Stripe webhooks require CLI forwarding for local development
- Database migrations are in `lib/db/migrations/` - don't edit manually
