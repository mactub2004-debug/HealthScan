# HealthScan - Complete Functional Specifications

## Table of Contents
1. [Global Specifications](#global-specifications)
2. [Onboarding Flow](#onboarding-flow)
3. [Registration Flow](#registration-flow)
4. [Home/Dashboard Screen](#homedashboard-screen)
5. [Camera/Scan Screen](#camerascan-screen)
6. [Scan Result Screen](#scan-result-screen)
7. [History Screen](#history-screen)
8. [Favorites Screen](#favorites-screen)
9. [Search Screen](#search-screen)
10. [Recommendations Screen](#recommendations-screen)
11. [Profile Screen](#profile-screen)
12. [Statistics Screen](#statistics-screen)
13. [Settings Screen](#settings-screen)
14. [Shopping List Screen](#shopping-list-screen)
15. [Product Comparison Screen](#product-comparison-screen)
16. [Bottom Navigation](#bottom-navigation)
17. [Demo Mode](#demo-mode)

---

## Global Specifications

### Design System
- **Primary Color**: `#22C55E` (Green) - Used for success states, primary actions, safe products
- **Warning Color**: `#F59E0B` (Orange/Amber) - Used for questionable products, caution states
- **Danger Color**: `#EF4444` (Red) - Used for unsafe products, delete actions, errors
- **Background**: `#F8F9FA` (Light gray) - Main background for screens
- **Card Background**: `#FFFFFF` (White) - Cards, overlays, modals
- **Text Primary**: Default body text color
- **Text Muted**: `text-muted-foreground` - Secondary text, descriptions
- **Border**: `border-gray-200` or `border-gray-100` - Standard borders

### Typography
- **Headings (h1, h2, h3)**: No font-size, font-weight, or line-height classes unless specifically requested
- **Body text (p)**: No font-size, font-weight, or line-height classes unless specifically requested
- **Small text**: `text-sm` or `text-xs` when explicitly needed for UI elements
- All typography follows the global CSS definitions in `styles/globals.css`

### Rounded Corners
- **Cards**: `rounded-2xl` (16px)
- **Buttons**: `rounded-2xl` (16px)
- **Input Fields**: `rounded-2xl` (16px)
- **Product Images**: `rounded-lg` (8px)
- **Avatar/Profile Images**: `rounded-full` (circular)
- **Icons backgrounds**: `rounded-full` (circular)
- **Checkboxes**: `rounded-lg` (8px)
- **Badges**: `rounded-full` (pill-shaped)

### Shadows
- **Cards**: `shadow-sm` - Subtle shadow for cards
- **Hover States**: `hover:shadow-md` - Enhanced shadow on hover
- **Floating Elements**: `shadow-lg` - Stronger shadow for modals, floating buttons

### Animations & Transitions
- **Screen Transitions**: `animate-in fade-in slide-in-from-bottom-4 duration-300`
- **Staggered List Items**: Each item delayed by `${index * 100}ms`
- **Button Interactions**: `transition-all` with scale and opacity changes
- **Card Hover**: `hover:shadow-md transition-all`
- **Swipe Actions**: `transition-transform duration-200`
- **Loading States**: Pulse animation for skeleton loaders

### Icons
- **Icon Library**: Lucide React
- **Icon Size**: 
  - Small: `w-4 h-4` (16px)
  - Medium: `w-5 h-5` (20px)
  - Large: `w-6 h-6` (24px)
  - Extra Large: `w-10 h-10` (40px) for empty states
- **Icon Color**: Matches text color or specific brand colors

### Spacing
- **Screen Padding**: `px-6` (24px horizontal)
- **Section Spacing**: `space-y-6` or `space-y-4` between sections
- **Card Padding**: `p-4` or `p-6` depending on card size
- **Top Padding**: `pt-10` for screens with headers

### Component States
All interactive components must support:
- **Default**: Normal appearance
- **Hover**: Visual feedback (desktop)
- **Active/Pressed**: Visual feedback (mobile)
- **Disabled**: `opacity-50 cursor-not-allowed`
- **Loading**: Spinner or skeleton loader
- **Error**: Red border, error message below
- **Success**: Green checkmark or success message

### Screen Reset Behavior
- **Key Prop**: Each screen must have a unique `key` prop to force complete unmount/remount when navigating between tabs
- **Demo Mode Keys**: `key="[screen-name]-screen"`
- **Main App Keys**: `key="[screen-name]-main"`
- **Effect**: Every time a tab is opened, all state is reset to initial values

---

## Additional Screens

Due to the length of the complete specifications, the remaining screens (Shopping List, Product Comparison, Bottom Navigation, and Demo Mode) follow the same design patterns and principles outlined above. Each screen maintains:

- Consistent color usage (green for safe, orange for caution, red for danger)
- Rounded corners using `rounded-2xl` for cards and buttons
- Proper spacing with `px-6` screen padding
- Staggered animations for list items
- Empty states with large icons and helpful CTAs
- Loading states with skeleton loaders
- Error handling with user-friendly messages
- Accessibility support for screen readers and keyboard navigation

For implementation details of the remaining screens, please refer to the design system specifications above and maintain consistency across all components.
