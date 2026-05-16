# Naskart - Premium Affiliate Marketing Platform

A production-ready, enterprise-grade affiliate marketing aggregator built with modern web technologies.

## Tech Stack

- **Frontend Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS, ShadCN UI, Framer Motion
- **Database & Auth**: Supabase (PostgreSQL, Row Level Security)
- **Deployment**: Vercel

## Core Features

1. **Public Website**: Highly polished, glassmorphism UI for product grids and detail pages. SEO optimized with dynamic meta tags.
2. **Affiliate Redirect Engine**: Tracks outgoing clicks and safely 302 redirects users to the affiliate partner.
3. **Admin Dashboard**: Protect routes to manage inventory and monitor platform analytics via Supabase Auth.
4. **Resilient**: Code handles missing Supabase configurations gracefully (renders mocked data for immediate previewing).

## Setup & Local Development

### 1. Configure Supabase

1. Create a project at [Supabase](https://supabase.com).
2. Go to the SQL Editor and execute the contents of `schema.sql` found in the root of the text.
3. This creates all tables (`categories`, `products`, `affiliate_links`, `clicks`, `admins`) and their corresponding Row Level Security (RLS) policies.

### 2. Configure Environment Variables

1. Copy `.env.example` to `.env.local`
   ```bash
   cp .env.example .env.local
   ```
2. Fill in the values from your Supabase Dashboard (Settings -> API).

### 3. Install & Run

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Open [http://localhost:3000](http://localhost:3000)

## Deployment on Vercel

1. Push your code to a GitHub repository.
2. Log into [Vercel](https://vercel.com) and click "Add New Project".
3. Import your GitHub repository.
4. Expand **Environment Variables** and add:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Click **Deploy**. Vercel will automatically build the Next.js app and assign it a URL.

## Contact

Maintainer: Admin @ Naskart
