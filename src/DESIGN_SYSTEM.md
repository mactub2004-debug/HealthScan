# HealthScan Design System

## Overview
HealthScan is a modern, minimalist food scanning mobile app with a focus on clean visuals, intuitive navigation, and health-conscious design.

## Color Palette

### Primary Colors
- **Primary Green** (`#22C55E`): Used for "suitable" products, CTAs, and positive actions
- **Accent Green** (`#4CE3B6`): Used for branding, logo, highlights, and special accents
- **Warning Orange** (`#F97316`): Used for "questionable" products and caution states
- **Danger Red** (`#EF4444`): Used for "not recommended" products and alerts

### Neutral Colors
- **Background**: `#F8F9FA` (light gray)
- **Card**: `#FFFFFF` (white)
- **Foreground**: `#1F2937` (dark gray)
- **Muted**: `#6B7280` (medium gray)
- **Border**: `#E5E7EB` (light border)

### Dark Mode
All colors have dark mode variants that maintain the same semantic meaning while being optimized for low-light viewing.

## Typography

### Font Family
- System font stack (San Francisco on iOS, Roboto on Android, fallback to system defaults)

### Font Weights
- **Normal**: 400 (body text, inputs)
- **Medium**: 500 (headings, buttons, labels)

### Type Scale
Follows default HTML semantic sizing:
- `h1`: Largest heading
- `h2`: Section headings
- `h3`: Subsection headings
- `h4`: Small headings
- `p`: Body text
- `label`: Form labels
- `button`: Button text

## Spacing & Layout

### Border Radius
- **Default**: `1rem` (16px) - Cards, buttons, containers
- **Large**: `1.5rem` (24px) - Feature cards
- **Extra Large**: `2rem` (32px) - Major sections

### Container
- **Max Width**: 448px (28rem) for optimal mobile viewing
- **Padding**: 1.5rem (24px) horizontal on mobile

## Components

### Product Status Indicators

#### Suitable
- Icon: CheckCircle2
- Color: Green (`#22C55E`)
- Background: Green 10% opacity
- Usage: Products that match user profile

#### Questionable
- Icon: AlertTriangle
- Color: Orange (`#F97316`)
- Background: Orange 10% opacity
- Usage: Products with minor concerns

#### Not Recommended
- Icon: XCircle
- Color: Red (`#EF4444`)
- Background: Red 10% opacity
- Usage: Products that conflict with user allergies/preferences

### Cards
- White background with subtle shadow
- Rounded corners (1rem)
- 1px border using `border` color
- Hover effect: slight scale transform (1.02)

### Buttons

#### Primary
- Background: Primary green
- Text: White
- Rounded: 1rem
- Hover: Slightly darker green

#### Secondary
- Background: Light gray
- Text: Dark gray
- Rounded: 1rem

#### Ghost
- Transparent background
- Text: Current color
- Hover: Light background

### Navigation
- Bottom navigation bar with 4 main sections
- Icons with labels
- Active state indicated by primary color
- Inactive state uses muted foreground

## Iconography

### Icon Library
Lucide React - Modern, consistent icon set

### Icon Sizes
- **Small**: 16px (w-4 h-4)
- **Medium**: 20px (w-5 h-5)
- **Large**: 24px (w-6 h-6)
- **Extra Large**: 32px+ for feature illustrations

### Common Icons
- **Scan**: Main scanning action
- **CheckCircle2**: Suitable products
- **AlertTriangle**: Questionable products
- **XCircle**: Not recommended products
- **Heart**: Favorites
- **Sparkles**: Recommendations/smart features
- **Search**: Search functionality
- **History**: Scan history
- **Settings**: App settings

## Interactions

### Transitions
- Default: 150-300ms ease-in-out
- Transform scales: 1.02 for hover states
- Color transitions for state changes

### Loading States
- Skeleton loaders for content
- Animated scanning lines for camera view
- Pulse animations for active scanning

## Screens

### 1. Onboarding (3 slides)
- Centered content with large icons
- Progress dots at top
- Next/Skip navigation
- Gradient icon containers

### 2. Registration
- Multi-step form (4 steps)
- Progress bar
- Tag-based selection for allergies/preferences/goals
- Consistent "Continue" CTA

### 3. Home Dashboard
- Gradient header with user greeting
- Stats cards showing key metrics
- Prominent scan button
- Quick action cards
- Recommended products list
- Daily tip card

### 4. Camera/Scan View
- Fullscreen overlay
- Scanning frame with corner brackets
- Mode toggle (barcode/photo)
- Flash control
- Capture button

### 5. Scan Result
- Status header with color coding
- Product image and details
- Benefits/concerns lists
- Ingredients breakdown
- Allergen warnings
- Alternative recommendations
- Action buttons (scan another, buy online)

### 6. History
- Tabbed view (All / Favorites)
- Chronological list with timestamps
- Swipeable cards
- Favorite toggle
- Delete option

### 7. Search
- Search input with filters
- Category chips
- Status filters
- Product grid/list
- Empty states

### 8. Recommendations
- Tabbed sections (For You, Trending, Top Rated)
- Personalized suggestions
- Featured products
- Smart tips

### 9. Settings
- Profile card
- Grouped settings sections
- Toggle switches for preferences
- Navigation to sub-settings
- Dark mode toggle
- Notification preferences
- Language selection
- Privacy controls

## Design Principles

1. **Clarity First**: Information hierarchy that prioritizes health and safety data
2. **Minimal Friction**: Quick scanning process with instant feedback
3. **Trust Building**: Clear visual indicators for product suitability
4. **Personalization**: Tailored recommendations based on user profile
5. **Accessibility**: High contrast ratios, clear typography, intuitive icons
6. **Consistency**: Uniform spacing, colors, and interaction patterns
7. **Mobile-First**: Optimized for one-handed use and thumb-friendly navigation

## Future Enhancements

- Barcode database integration
- Real-time product scanning with ML
- Social features (share scans, reviews)
- Gamification (streaks, achievements)
- Meal planning integration
- Shopping list creation
- Nutritionist AI chatbot
- Multi-language support
- Offline mode
- Apple Health / Google Fit integration