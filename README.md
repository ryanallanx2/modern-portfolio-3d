# Modern Portfolio Website

A cutting-edge portfolio website featuring the latest design and development trends from Dribbble and beyond.

## Features

### 1. Minimalist Design with Bold Typography
- Clean, spacious layouts with strategic use of white space
- Oversized, bold typography as a design element
- Limited color palettes with gradient accents
- Focus on content hierarchy and readability

### 2. 3D Elements and WebGL Integration
- Interactive 3D real estate explorer with realistic house models
- Property information cards on hover
- Multiple property types with switching feature
- Includes free 3D models ready to use with direct URLs
- Fallback to simple models when 3D models aren't available

### 3. Microinteractions and Subtle Animations
- Cursor-following elements that enhance user engagement
- Smooth page transitions with Framer Motion
- Interactive hover states with sound feedback
- Animated UI elements for better engagement

### 4. Horizontal Scrolling and Creative Navigation
- Optional horizontal scrolling for projects section
- Floating navigation that follows the user
- Scroll-based section highlighting
- Intuitive navigation system

### 5. Dark Mode with Neon Accents
- Dark background with vibrant neon-like effects
- Glow effects and gradients that create depth
- High contrast typography
- Toggleable light/dark modes for user preference

### 6. Brutalist Influences with Modern Refinement
- Raw, bold aesthetic with intentional asymmetry
- Mix of font weights and visual interest
- Clean with deliberately unaligned elements

### 7. Card-Based UI with Responsive Design
- Modular card layouts that adapt to any screen size
- Mobile-first approach for better user experience
- Touch-optimized interactive elements
- Bottom navigation for thumb-friendly mobile usage

### 8. Audio Integration
- Sound effects tied to user interactions
- Audio feedback for enhanced UX
- Toggle controls for user preference

### 9. Accessibility Features
- High contrast options with dark mode
- Reduced motion settings
- Screen reader compatible markup
- Keyboard navigation optimized
- Error boundaries and fallbacks for all 3D content

### 10. Asymmetrical Layouts
- Breaking from rigid grid systems for organic feel
- Overlapping elements creating depth
- Intentional "breaking" of conventional design rules
- Responsive layouts that reorganize beautifully

## 3D Models Included

The project comes with direct links to free 3D house models:

1. **Modern House** - A contemporary design with sleek lines and modern architecture
   - Created by Nigel Hants
   - [View on Sketchfab](https://sketchfab.com/3d-models/modern-house-ef570e0fcc854d9b834691433178ba4d)

2. **Traditional House** - A classic country house design with traditional features
   - Created by Irina Shakirzyanova
   - [View on Sketchfab](https://sketchfab.com/3d-models/country-house-b8a96eadc7b44291836da32698ab6641)

These models are loaded directly from URLs and don't require any additional setup.

## Tech Stack

- Next.js 13+
- TypeScript
- Tailwind CSS
- Framer Motion
- Three.js and @react-three/fiber for 3D visualization
- Shadcn UI Components
- next-themes for dark mode

## Getting Started

1. Install dependencies:
```bash
npm install
# or
yarn install
```

2. Run the development server:
```bash
npm run dev
# or
yarn dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

4. Add custom 3D models (optional):
   - Download GLB format house models from free 3D repositories
   - Place them in `/public/models/` as `modern_house.glb` and `traditional_house.glb`
   - Or continue using the provided direct URLs in the code

## Customization

You can easily customize this portfolio by:

1. Modifying the content in `app/page.tsx`
2. Changing colors in `app/globals.css` and `tailwind.config.ts`
3. Adding real audio files to `/public`
4. Adding your own 3D models or changing the URLs in `HouseModelViewer.tsx`

## Accessibility

This portfolio prioritizes accessibility with:

- Keyboard navigation support
- Reduced motion options
- Screen reader friendly markup
- High contrast mode
- Error boundaries and fallbacks for all 3D content

## Mobile Optimization

Fully responsive with:
- Touch-friendly navigation
- Adaptive layouts
- Thumb-zone optimized controls
- Mobile-specific interaction patterns

## License

MIT