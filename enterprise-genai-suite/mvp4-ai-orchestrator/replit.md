# Williams-Sonoma AI Content Studio

## Overview

This is a full-stack web application that provides AI-powered content generation tools for Williams-Sonoma's marketing and development teams. The platform combines image generation, content creation, and code assistance into a unified interface, designed specifically for the Williams-Sonoma brand aesthetic and requirements.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom Williams-Sonoma brand variables
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **State Management**: TanStack Query (React Query) for server state
- **Routing**: Wouter for lightweight client-side routing
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (@neondatabase/serverless)
- **API Pattern**: RESTful endpoints under `/api` prefix
- **External Services**: OpenAI API for content generation

### Data Storage Solutions
- **Primary Database**: PostgreSQL hosted on Neon (Active)
- **ORM**: Drizzle ORM with type-safe schema definitions
- **Schema Management**: Drizzle Kit for migrations
- **Storage Implementation**: DatabaseStorage class using real PostgreSQL database

## Key Components

### 1. Image Generator
- **Purpose**: Generate brand-consistent product images using AI
- **Features**: 
  - Custom Williams-Sonoma brand style presets
  - Multiple aspect ratio options
  - Batch generation capabilities
  - Quality scoring system
- **Technology**: OpenAI DALL-E integration

### 2. Content Studio
- **Purpose**: Create marketing copy and product descriptions
- **Features**:
  - Multiple content types (product descriptions, social media, etc.)
  - Tone customization
  - Length control
  - SEO keyword integration
- **Technology**: OpenAI GPT-4o for text generation

### 3. Code Assistant
- **Purpose**: Generate React components and UI code
- **Features**:
  - Framework-specific code generation
  - TypeScript support
  - Complexity level selection
  - Brand-consistent styling
- **Technology**: OpenAI for code generation with React/Tailwind focus

### 4. AI Orchestrator (Agentic Workflows)
- **Purpose**: Multi-agent AI system with MCP context sharing
- **Features**:
  - 6-agent workflow orchestration (Strategy, Visual, Copy, Code, QA, Optimization)
  - Cross-modal content optimization
  - Real-time workflow status tracking
  - Quality assessment and brand alignment scoring
  - Context-aware session management
- **Technology**: OpenAI GPT-4o with custom agent coordination and Model Context Protocol implementation

## Data Flow

1. **User Input**: Users interact with form interfaces to specify generation parameters
2. **API Request**: Frontend sends structured requests to Express.js backend
3. **OpenAI Integration**: Backend processes requests and calls appropriate OpenAI APIs
4. **Data Storage**: Generated content is stored in PostgreSQL with metadata
5. **Response Handling**: Results are returned to frontend and cached using React Query
6. **UI Updates**: Components re-render with new data and provide user feedback

## External Dependencies

### Core Dependencies
- **OpenAI API**: Content generation (images, text, code)
- **Neon Database**: PostgreSQL hosting and serverless functions
- **Radix UI**: Headless UI component primitives
- **TanStack Query**: Server state management and caching

### Development Tools
- **Vite**: Build tool and development server
- **Drizzle Kit**: Database schema management
- **TypeScript**: Static type checking
- **ESBuild**: Production bundling

### Williams-Sonoma Brand Integration
- Custom CSS variables for brand colors (forest green, cream, gold)
- Tailwind configuration with brand-specific design tokens
- Component styling aligned with Williams-Sonoma visual identity

## Deployment Strategy

### Development Environment
- **Frontend**: Vite dev server with HMR (Hot Module Replacement)
- **Backend**: tsx for TypeScript execution with auto-reload
- **Database**: Neon development instance

### Production Build
- **Frontend**: Vite build to `dist/public` directory
- **Backend**: ESBuild bundle to `dist/index.js`
- **Static Serving**: Express serves built frontend files
- **Environment**: NODE_ENV=production with optimizations

### Environment Configuration
- **Database**: `DATABASE_URL` environment variable required
- **OpenAI**: `OPENAI_API_KEY` or `OPENAI_API_KEY_ENV_VAR`
- **Replit Integration**: Special handling for Replit development environment

## Changelog

```
Changelog:
- July 05, 2025. Initial setup with three AI content generation MVPs
- July 05, 2025. Migrated from in-memory storage to PostgreSQL database  
- July 05, 2025. Added advanced agentic AI workflows with multi-agent orchestration
- July 05, 2025. Implemented Model Context Protocol (MCP) for session coherence
- July 05, 2025. Fixed UI text visibility issues for refinement tools
```

## Enterprise Considerations

For enterprise deployment at Williams-Sonoma, this MVP would need significant scaling in:
- Infrastructure (cloud deployment, load balancing, monitoring)
- Security (SSO, role-based access, compliance)
- Brand management (approval workflows, asset libraries)
- Integrations (DAM, CMS, marketing automation)
- Performance (99.9% uptime, global deployment)

See `ENTERPRISE_DEPLOYMENT.md` for comprehensive enterprise readiness requirements.

## User Preferences

```
Preferred communication style: Simple, everyday language.
```