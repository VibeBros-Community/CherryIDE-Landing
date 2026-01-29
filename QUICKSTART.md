# Quick Start Guide

## 🚀 Get Started in 30 Seconds

```bash
# Start development server
npm run dev

# Open browser
open http://localhost:3000
```

## 📝 Common Tasks

### Development
```bash
npm run dev          # Start dev server (http://localhost:3000)
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Check TypeScript types
```

### Customize Content

**Update Site Info:**
- Edit `config/site.ts` for name, tagline, stats, links

**Modify Features:**
- Edit `config/features.ts` to change the 6 core features

**Change AI Models:**
- Edit `data/models.ts` to add/remove models

**Update Testimonials:**
- Edit `data/testimonials.ts` for social proof

### Change Colors

Edit `tailwind.config.ts`:
```typescript
cherry: {
  500: '#f43f5e',  // Your primary brand color
  600: '#e11d48',
  700: '#be123c',
}
```

### Add New Section

1. Create folder: `sections/my-section/`
2. Create file: `sections/my-section/index.tsx`
3. Add to homepage: `app/page.tsx`

```tsx
import MySection from '@/sections/my-section';

export default function HomePage() {
  return (
    <main>
      {/* ... other sections */}
      <MySection />
    </main>
  );
}
```

## 🎨 Component Usage

### Button
```tsx
import { Button } from '@/components/ui/button';

// Variants: default, secondary, outline, ghost, link
// Sizes: default, sm, lg, xl, icon
<Button variant="default" size="lg">Click me</Button>
```

### Card
```tsx
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>Content here</CardContent>
</Card>
```

## 📂 Project Structure

```
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout + SEO
│   ├── page.tsx           # Homepage
│   └── globals.css        # Global styles
├── components/
│   ├── ui/                # Base components
│   └── layout/            # Header, Footer
├── sections/              # Page sections
├── lib/                   # Utilities
├── config/                # Configuration
└── data/                  # Static data
```

## 🔧 Troubleshooting

**Port already in use:**
```bash
# Kill process on port 3000
npx kill-port 3000
npm run dev
```

**Build errors:**
```bash
# Clean and rebuild
rm -rf .next node_modules
npm install
npm run build
```

**Type errors:**
```bash
npm run type-check
```

## 📦 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Manual Deploy
```bash
npm run build
# Deploy .next folder to your host
```

## 🎯 Next Steps

1. **Phase 3**: Add 3D scenes with React Three Fiber
2. **Phase 4**: Implement GSAP scroll animations
3. **Phase 5**: Create additional pages
4. **Phase 6**: Run Lighthouse audit
5. **Phase 7**: Deploy to production

## 📚 Learn More

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)

## 🐛 Issues?

Check `IMPLEMENTATION.md` for detailed documentation.
