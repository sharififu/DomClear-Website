# Design System Transfer Package

Use this file to port the "Soft-Tech Landing" design system (colors, typography, spacing, and component styles) to your other project.

## Instructions for the User

1.  **Drag and drop this file** into your React Native/Expo project's Cursor chat.
2.  **Enter this prompt**:
    > "Please adopt the design system defined in this file. Update my constants/Colors.ts, contexts/ThemeContext.tsx, and component styles to match this new 'Soft-Tech Landing' design system. Keep the same React Native structure but update colors, border radius, shadows, and spacing to match."

---

## 1. Design Tokens (JSON Source of Truth)

These tokens define the core visual language (colors, spacing, radii).

```json:src/design/design.json
{
  "profile_name": "Soft-Tech Landing KIT",
  "design_language": {
    "tone": ["friendly", "confident", "modern", "approachable"],
    "visual_keywords": ["soft gradients", "rounded cards", "clean grid", "ample white space"]
  },
  "foundations": {
    "spacing_scale_px": [4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96],
    "radii_px": { "sm": 8, "md": 12, "lg": 16, "xl": 24, "pill": 999 },
    "elevation": {
      "card": "0 6px 20px rgba(10, 20, 40, 0.06)",
      "card_hover": "0 10px 30px rgba(10, 20, 40, 0.10)",
      "button_focus": "0 0 0 4px rgba(0, 150, 255, 0.20)"
    },
    "palette": {
      "primary": { "50": "#e6f7ff", "100": "#cceeff", "400": "#4db8ff", "500": "#2ea0ff", "600": "#1a86f0" },
      "accent_teal": { "400": "#22d3b6", "500": "#10bfa3", "600": "#0ea08a" },
      "accent_purple": { "400": "#9b8aff", "500": "#7c6df0", "700": "#4e45b8" },
      "neutral": {
        "50": "#FAFBFC",
        "100": "#F4F6F8",
        "200": "#E9EDF2",
        "600": "#4B5563",
        "800": "#1F2937",
        "900": "#0F172A"
      },
      "gradient_tokens": {
        "brand_1": "linear-gradient(135deg, rgba(46,160,255,1) 0%, rgba(124,109,240,1) 100%)",
        "brand_2": "linear-gradient(135deg, rgba(16,191,163,1) 0%, rgba(78,69,184,1) 100%)"
      }
    },
    "typography": {
      "font_family_head": ["Poppins", "Inter", "sans-serif"],
      "font_family_body": ["Inter", "sans-serif"]
    }
  }
}
```

## 2. Tailwind Configuration

Update your `tailwind.config.js` to use these tokens.

```javascript:tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f7ff',
          100: '#cceeff',
          400: '#4db8ff',
          500: '#2ea0ff',
          600: '#1a86f0',
        },
        accent: {
          teal: '#0ea08a',
          purple: '#7c6df0',
        },
        neutral: {
          50: '#FAFBFC',
          100: '#F4F6F8',
          200: '#E9EDF2',
          600: '#4B5563',
          800: '#1F2937',
          900: '#0F172A',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 6px 20px rgba(10, 20, 40, 0.06)',
        'card-hover': '0 10px 30px rgba(10, 20, 40, 0.10)',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, rgba(46,160,255,1) 0%, rgba(124,109,240,1) 100%)',
      }
    },
  },
  plugins: [],
};
```

## 3. Base CSS (Typography)

Add these Google Fonts and base styles to `src/index.css`.

```css:src/index.css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@600;700&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply font-sans text-neutral-600 bg-neutral-50;
  }
  h1, h2, h3, h4, h5, h6 {
    @apply font-heading text-neutral-900;
  }
}
```

## 4. Core UI Components

Create these reusable components to enforce the design system.

### Button (`src/components/ui/Button.tsx`)

```tsx
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'accent';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-full font-semibold transition-all duration-200 active:scale-95";
  
  const variants = {
    primary: "bg-primary-600 text-white hover:bg-primary-500 shadow-lg shadow-primary-600/20 border border-transparent",
    accent: "bg-accent-teal text-white hover:bg-accent-teal/90 shadow-lg shadow-accent-teal/20 border border-transparent",
    secondary: "bg-white text-primary-600 border border-neutral-200 hover:bg-neutral-50 hover:border-primary-200",
    ghost: "text-primary-600 hover:bg-primary-50 border border-transparent"
  };

  const sizes = {
    sm: "px-4 py-2 text-sm gap-2",
    md: "px-6 py-3 text-base gap-2",
    lg: "px-8 py-4 text-lg gap-3"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`} 
      {...props} 
    />
  );
};
```

### Card (`src/components/ui/Card.tsx`)

```tsx
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ children, className = '', onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`
        bg-white rounded-2xl border border-neutral-200 shadow-card p-6 
        ${onClick ? 'cursor-pointer hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300' : ''} 
        ${className}
      `}
    >
      {children}
    </div>
  );
};
```

