# Portfolio Builder

A complete Portfolio Builder SaaS application with custom subdomains featuring a minimal, elegant portfolio template. Built with Next.js 15, Better Auth, PostgreSQL (Neon), and Drizzle ORM.

## Features

- **Beautiful Minimal Design** - Stand out with elegant typography and sophisticated design
- **Custom Subdomain** - Get yourname.portfolio.com instantly
- **Easy Editing** - Update your portfolio anytime from your dashboard
- **Mobile Responsive** - Perfect on all devices
- **Google OAuth** - Quick and secure authentication
- **Auto-Save** - Your changes are saved automatically
- **Real-time Username Validation** - Check username availability instantly

## Tech Stack

- **Framework**: Next.js 15 (App Router with TypeScript, React 19)
- **Database**: PostgreSQL via Neon serverless
- **ORM**: Drizzle ORM
- **Auth**: Better Auth v1 with Google OAuth
- **Styling**: Tailwind CSS v4 + Framer Motion
- **Fonts**: Playfair Display, Cormorant Garamond, Inter, Geist
- **Components**: Custom shadcn/ui-style components

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm
- Neon PostgreSQL database
- Google OAuth credentials

### Environment Variables

Create a `.env.local` file with:

```bash
# Database (Neon)
DATABASE_URL=postgresql://username:password@host:5432/database?sslmode=require

# Better Auth
BETTER_AUTH_SECRET=your-random-32-character-secret
BETTER_AUTH_URL=http://localhost:3000

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# App URLs
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_DOMAIN=localhost:3000
```

### Setup

1. **Install dependencies**

   ```bash
   pnpm install
   ```

2. **Set up the database**

   ```bash
   pnpm db:push
   ```

3. **Run the development server**

   ```bash
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000)

### Database Commands

- `pnpm db:generate` - Generate migrations
- `pnpm db:migrate` - Run migrations
- `pnpm db:push` - Push schema to database
- `pnpm db:studio` - Open Drizzle Studio

## Deployment

### Vercel

1. Push to GitHub
2. Connect to Vercel
3. Set environment variables
4. Add custom domain (portfolio.com)
5. Add wildcard domain (\*.portfolio.com)
6. Configure DNS:
   - A record @ → Vercel IP
   - CNAME \* → cname.vercel-dns.com

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── auth/[...all]/    # Better Auth
│   │   ├── check-username/   # Username availability
│   │   ├── portfolio/        # Portfolio CRUD
│   │   └── portfolio/publish/ # Publish/unpublish
│   ├── dashboard/            # Portfolio editor
│   ├── login/                # Login page
│   ├── portfolio/[username]/ # Public portfolio
│   ├── preview/              # Portfolio preview
│   └── signup/               # Signup page
├── components/
│   ├── aceternity/           # Animated components
│   ├── dashboard/            # Dashboard components
│   ├── landing/              # Landing page sections
│   ├── portfolio/            # Portfolio template
│   └── ui/                   # Base UI components
├── db/
│   ├── index.ts              # Database connection
│   └── schema.ts             # Drizzle schema
└── lib/
    ├── auth.ts               # Better Auth config
    ├── auth-client.ts        # Auth client
    ├── utils.ts              # Utilities
    └── validations.ts        # Zod schemas
```

## License

MIT
