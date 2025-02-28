# Intrinsic Labs Website

## Project Description

I run a small software development studio called Intrinsic Labs LLC. We do native mobile for iOS and Android and full stack web dev from scratch. Currently I just have some info about us on my personal site: @https://asherpope.com/ We are building a brand new site to showcase our work, offers, and share what we're up to via a blog. 


## Project Structure
```
intrinsic-labs-website/
├── public/              # Static assets
├── src/
│   ├── app/             # Next.js App Router structure
│   ├── components/      # Reusable UI components
│   ├── lib/             # Utility functions and API clients
│   ├── hooks/           # Custom React hooks
│   ├── styles/          # Global styles and Tailwind config
│   └── types/           # TypeScript type definitions
├── .env.local           # Environment variables
├── next.config.js       # Next.js configuration
├── tailwind.config.js   # Tailwind CSS configuration
└── package.json         # Dependencies and scripts
```

## Tech Stack

### Frontend
- **Next.js**: React framework for server-rendered and static websites
  - App Router for file-based routing
  - Server Components for improved performance
  - Image optimization for fast loading
- **TypeScript**: For type safety and improved developer experience
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **Framer Motion**: Animation library for React components
- **GSAP**: Advanced animation library for complex interactions and scroll effects
- **React Hook Form**: Form handling with validation

### Backend & Data
- **Supabase**: 
  - PostgreSQL database for content storage
  - Authentication system
  - Storage for images and assets
  - Real-time subscriptions for dynamic content
- **Next.js API Routes**: Serverless functions for backend logic

### Content Management
- **Custom Admin Dashboard**: Built with Next.js and Tailwind CSS
  - Interface for managing Supabase data
  - Content editing and preview capabilities
  - Media library management

### Deployment & Infrastructure
- **Vercel**: 
  - Hosting platform optimized for Next.js
  - Global CDN for fast content delivery
  - Preview deployments for testing
  - Serverless functions

### Analytics & Monitoring
- **Vercel Analytics** or **Plausible**: Privacy-focused website analytics
- **Sentry**: Error tracking and performance monitoring

### Development Tools
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **Husky**: Git hooks for pre-commit checks
- **Jest** & **React Testing Library**: Testing framework


