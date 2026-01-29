# Cherry IDE - Marketing Website

High-performance Next.js 15 marketing website for Cherry IDE, featuring 3D animations and scroll-based interactions.

## Tech Stack

- **Next.js 15** with App Router
- **React 18** + **TypeScript 5**
- **Tailwind CSS 4** for styling
- **React Three Fiber** for 3D scenes
- **GSAP** for advanced animations
- **Framer Motion** for UI transitions
- **Radix UI** for accessible components

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

## Project Structure

```
├── app/              # Next.js App Router pages
├── components/       # Reusable components
│   ├── ui/          # Base UI components
│   ├── layout/      # Header, Footer
│   ├── animations/  # Animation components
│   └── shared/      # Shared components
├── sections/        # Homepage sections
├── scenes/          # 3D scenes (R3F)
├── lib/            # Utilities
├── hooks/          # Custom hooks
├── config/         # Configuration
└── data/           # Static data
```

## Performance Targets

- Lighthouse Performance: 90+
- Lighthouse Accessibility: 100
- Lighthouse SEO: 100
- Core Web Vitals: All "Good"
- Bundle size: <200KB initial

## Development Phases

### ✅ Phase 1: Project Setup
- Next.js 15 initialization
- Dependencies installation
- Folder structure
- Base components
- Design system

### ✅ Phase 2: Core Sections
- Hero section
- Features grid
- Model showcase
- Social proof
- Differentiators
- Pricing preview
- Final CTA

### 🚧 Phase 3: 3D Integration
- Hero 3D scene with R3F
- 3D model optimization
- WebGL fallbacks

### 🚧 Phase 4: Advanced Animations
- GSAP ScrollTrigger
- Framer Motion interactions
- Lenis smooth scroll

### 🚧 Phase 5: Content & Pages
- Additional pages
- Blog structure
- Content population

### 🚧 Phase 6: Optimization & SEO
- Performance audit
- SEO implementation
- Accessibility testing

### 🚧 Phase 7: Launch
- Analytics
- Monitoring
- Production deployment

## License

MIT
