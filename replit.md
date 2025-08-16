# Web War: Apocalypse - Interactive Programming Game

## Overview

Web War: Apocalypse is an interactive cyberpunk-themed educational game that teaches web development fundamentals through gamified coding challenges. Players take on the role of a "Code Warrior" in a post-apocalyptic world where they must rebuild the web using HTML, CSS, and JavaScript to save humanity from a digital apocalypse.

The application features a story-driven progression system where players complete coding challenges to unlock new levels, earn XP, and advance through the narrative. The game combines real-time code validation, Monaco code editor integration, and a cyberpunk aesthetic to create an engaging learning experience.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The frontend is built using **React 18** with TypeScript, leveraging a component-based architecture for maximum reusability and maintainability. The application uses **Vite** as the build tool for fast development and optimized production builds.

**Key Design Patterns:**
- **Custom Hooks Pattern**: Centralized state management through hooks like `useGameState` and `useLocalStorage` for clean separation of concerns
- **Screen-based Navigation**: Simple state-driven navigation system using screen enums rather than complex routing
- **Component Composition**: Highly modular UI components with consistent props interfaces

**State Management:**
- Local state management using React hooks and localStorage for game progression persistence
- TanStack Query for server state management and API caching
- Game state includes level progression, XP tracking, achievements, and user progress

### Backend Architecture
The backend follows a **lightweight Express.js REST API** architecture with a focus on simplicity and extensibility.

**API Design:**
- RESTful endpoints for game progress management (`/api/progress`)
- Centralized error handling middleware
- Request/response logging for development debugging
- Modular route registration system

**Storage Strategy:**
- Abstract storage interface (`IStorage`) allowing for easy database swapping
- In-memory storage implementation (`MemStorage`) for development
- Prepared for PostgreSQL integration via Drizzle ORM
- Separate schema definitions in shared directory for type safety

### Data Storage Solutions
**Database Schema Design:**
- **Users Table**: Basic user authentication with username/password
- **Game Progress Table**: Comprehensive progress tracking including current level, XP, completed levels, achievements, and timestamps
- **Type-safe Schema**: Drizzle ORM with Zod validation ensures runtime type safety

**Data Persistence:**
- Client-side localStorage for immediate game state persistence
- Server-side database for cross-device progress synchronization
- JSON fields for flexible storage of arrays (completed levels, achievements)

### UI/UX Architecture
**Design System:**
- **Shadcn/ui Components**: Consistent, accessible component library
- **Tailwind CSS**: Utility-first styling with custom cyberpunk theme variables
- **Radix UI Primitives**: Accessible, unstyled components as foundation
- **Custom Theme**: Cyberpunk color palette with custom CSS variables for consistent theming

**Responsive Design:**
- Mobile-first approach with breakpoint-specific optimizations
- Flexible layout components using CSS Grid and Flexbox
- Touch-friendly interactions for mobile devices

### Code Validation System
**Real-time Validation Engine:**
- Custom validation functions for each coding challenge
- DOM parsing for HTML structure validation
- Progressive requirement checking with visual feedback
- Real-time preview generation for immediate visual feedback

**Educational Framework:**
- Structured level progression with increasing complexity
- Hint system for guided learning
- XP and achievement system for motivation
- Code quality feedback and suggestions

### Development Tools Integration
**Monaco Editor:**
- Full-featured code editor with syntax highlighting
- Dynamic loading for optimal bundle size
- Language support for HTML, CSS, and JavaScript
- Theme integration with cyberpunk aesthetic

**Development Experience:**
- Hot module replacement via Vite
- TypeScript for compile-time error detection
- Path aliases for clean import statements
- ESBuild for fast production builds

## External Dependencies

### Database & ORM
- **PostgreSQL**: Primary database (configured via DATABASE_URL)
- **Neon Database**: Serverless PostgreSQL provider (@neondatabase/serverless)
- **Drizzle ORM**: Type-safe database toolkit with migration support
- **Drizzle-Zod**: Schema validation integration

### UI Framework & Styling
- **React 18**: Core frontend framework with hooks and concurrent features
- **Tailwind CSS**: Utility-first CSS framework with custom configuration
- **Radix UI**: Comprehensive accessible component primitives
- **Shadcn/ui**: Pre-built component library built on Radix
- **Class Variance Authority**: Type-safe CSS class composition

### Development & Build Tools
- **Vite**: Fast build tool with HMR and optimized bundling
- **TypeScript**: Static type checking and enhanced developer experience
- **ESBuild**: Fast JavaScript bundler for production builds
- **PostCSS**: CSS processing with Tailwind integration

### Code Editor & Validation
- **Monaco Editor**: VS Code-powered web editor (loaded via CDN)
- **Zod**: Runtime type validation for API payloads
- **React Hook Form**: Form handling with validation integration

### State Management & Data Fetching
- **TanStack Query**: Server state management with caching and synchronization
- **Wouter**: Lightweight client-side routing
- **Date-fns**: Date manipulation and formatting utilities

### Fonts & Icons
- **Google Fonts**: Custom typography (Orbitron, Source Code Pro, Inter)
- **Lucide React**: Consistent icon library with React components

### Session & Storage
- **Connect-pg-simple**: PostgreSQL session store for Express
- **Local Storage**: Client-side persistence for game state