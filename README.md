# UrbanSafai - Home & Office Cleaning Services

A modern, responsive website for UrbanSafai cleaning services built with Next.js 16, TypeScript, Tailwind CSS, and shadcn/ui.

## Features

- Service showcase with detailed descriptions
- Online booking system with admin dashboard
- Admin authentication (NextAuth.js)
- Email notifications via Resend
- Customer reviews section
- Blog section
- Service area coverage
- WhatsApp integration
- Fully responsive (mobile-first)
- Dark/light mode support

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4 + shadcn/ui
- **Database**: MySQL via Prisma ORM
- **Auth**: NextAuth.js v4 (Credentials Provider)
- **Email**: Resend
- **Animations**: Framer Motion

## Quick Start

### 1. Install dependencies

```bash
bun install
```

### 2. Set up environment variables

```bash
cp .env.example .env.local
```

Edit `.env.local` with your values:

```env
DATABASE_URL="mysql://USER:PASSWORD@HOST:3306/DATABASE"
NEXTAUTH_SECRET=your-secret-here
NEXTAUTH_URL=https://yourdomain.com
ADMIN_EMAIL=admin@urbansafai.in
ADMIN_PASSWORD=your-secure-password
RESEND_API_KEY=re_xxx
```

> Generate a secret: `openssl rand -base64 32`

### 3. Initialize the database

```bash
# After starting the app, visit: http://localhost:3000/api/setup
# Or run: bunx prisma db push
```

### 4. Start development server

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
urbansafai/
├── prisma/
│   └── schema.prisma       # Database schema
├── public/
│   ├── gallery/           # Service images
│   ├── blog/              # Blog post images
│   └── logo.svg
├── src/
│   ├── app/
│   │   ├── admin/         # Admin login & bookings dashboard
│   │   ├── api/           # API routes (bookings, auth, contact, reviews)
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx        # Main website page
│   ├── components/
│   │   ├── layout/        # Header, Footer, WhatsApp button
│   │   ├── sections/      # All page sections (hero, services, booking, etc.)
│   │   └── ui/            # shadcn/ui components
│   ├── lib/               # Utilities, auth config, data files
│   └── middleware.ts      # Route protection for admin
├── .env.example
└── next.config.ts
```

## Admin Access

- **URL**: `/admin`
- **Credentials**: Set in `.env.local` (`ADMIN_EMAIL` / `ADMIN_PASSWORD`)
- **Bookings Dashboard**: `/admin/bookings`

## Production Deployment

### Build

```bash
bun run build
```

### Start production server

```bash
bun run start
```

The project uses `output: 'standalone'` for optimized deployments.

### Deploy to Vercel

1. Push to GitHub
2. Import project on [vercel.com](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy

### Deploy to VPS (e.g., Railway, Hostinger, AWS EC2)

1. Clone the repo
2. Install dependencies: `bun install`
3. Set up `.env` (or `.env.local`) with your MySQL connection string
4. Run `bun run build`
5. Run `bun run start`
6. Visit `/api/setup` to create database tables

## License

Private project. All rights reserved.
