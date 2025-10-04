# Thao Ly's Personal Portfolio

## Overview

This is a personal portfolio website for Thao Ly, a second-year student showcasing the intersection of art, language, and technology. The portfolio features a Japanese-influenced artistic design aesthetic with modern web technologies, presenting a journey timeline, skills proficiency, interactive profile hub, project showcase, and contact information. The site emphasizes visual storytelling through animations, interactive elements, and a carefully curated color palette inspired by Japanese minimalism.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build Tools**
- **React 18** with TypeScript for component-based UI development
- **Vite** as the build tool and development server with HMR (Hot Module Replacement)
- **Wouter** for client-side routing (lightweight alternative to React Router)
- **TanStack Query** (React Query) for data fetching and state management

**UI Component System**
- **shadcn/ui** component library based on Radix UI primitives
- **Tailwind CSS** for utility-first styling with custom design system
- **Framer Motion** for animations and interactive elements
- Custom theming with CSS variables supporting light/dark modes

**Design System**
- Color palette: Navy Blue (primary), Red-Orange (accent), Cream (background)
- Typography: Inter (body), Playfair Display (headings), Noto Sans JP (Japanese text)
- Component variants defined using `class-variance-authority`
- Responsive design with mobile-first approach

**Key Features**
- Hero section with artistic background and interactive CTAs
- Journey timeline with animated milestones (2022-2025)
- Skills proficiency with animated progress bars
- **Interactive Orbital Profile Hub System**:
  - Central sun representing the user (Thao Ly)
  - 4 planets orbiting at different speeds representing categories (Hobbies, Goals, Skills, Desires)
  - Satellite dots orbiting each planet representing individual items
  - Hover effects: animations pause and planets zoom on hover
  - Click interactions: dialog opens with detailed information
  - Parallax effect: orbital system responds to mouse movement
  - Smooth CSS animations with customizable speeds and radii
- Project showcase with video/image galleries
- Gallery carousel with touch/swipe support
- Code projects dialog for GitHub repository links

### Backend Architecture

**Server Framework**
- **Express.js** with TypeScript running on Node.js
- Minimal API surface - primarily serves as a static file server
- Custom Vite middleware integration for development with HMR
- Error handling middleware for graceful error responses

**Development Setup**
- Development mode: Vite dev server with Express backend
- Production mode: Pre-built static assets served by Express
- Cross-environment configuration using `cross-env`

**Storage Layer**
- In-memory storage implementation (`MemStorage`) as default
- Interface-based design (`IStorage`) allowing easy swapping to persistent storage
- User schema defined but not actively used in current implementation

### Data Storage Solutions

**Database Configuration**
- **Drizzle ORM** configured for PostgreSQL via Neon serverless
- Schema definitions in TypeScript with Zod validation
- Migration support through `drizzle-kit`
- Currently minimal schema (users table only) suggesting future expansion

**Current Implementation**
- In-memory storage for development/demo purposes
- No active database operations in the portfolio (static content driven)
- User authentication schema prepared but not implemented

**Design Decision**: The portfolio currently operates without persistent storage, keeping it lightweight and fast. The database infrastructure is scaffolded for future features like contact forms, visitor analytics, or content management.

### External Dependencies

**UI & Design Libraries**
- Radix UI primitives (@radix-ui/*) for accessible, unstyled components
- Tailwind CSS with custom configuration for design system
- Google Fonts: Inter, Playfair Display, Noto Sans JP
- Lucide React for icons

**Development Tools**
- TypeScript for type safety across frontend and backend
- ESBuild for server-side bundling
- PostCSS with Autoprefixer for CSS processing
- Replit-specific plugins for development environment

**Media Handling**
- Static assets served from `attached_assets` directory
- Video files (MP4) with TypeScript declarations
- Image optimization for hero backgrounds and project showcases

**Third-Party Services**
- GitHub for project repository hosting and linking
- Email integration for contact functionality (mailto links)
- Potential Neon database connection (configured but not actively used)

**Build & Deployment**
- Vite for frontend bundling with React plugin
- ESBuild for backend bundling
- Path aliases for clean imports (@/, @shared/, @assets/, @videos/)
- Environment-specific configurations (development vs production)