# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Livion is a healthcare platform built with React Native and Expo Router that supports multiple user roles: patients, clinicians, care coordinators, and administrators. The app uses file-based routing and provides role-specific experiences for health monitoring, care management, and clinical workflows.

The platform integrates with a local AI service (hosted on ngrok) for generating health insights and images using AI.

## Commands

### Development
```bash
# Start the development server
npm start
# or
expo start

# Start for specific platforms
npm run android    # Start Android emulator
npm run ios        # Start iOS simulator
npm run web        # Start web version

# Linting
npm run lint
```

### Project Management
```bash
# Reset project (moves starter code to app-example/)
npm run reset-project
```

## Architecture

### File-Based Routing (Expo Router)

The app uses Expo Router with a role-based route structure:
- **Root** (`app/_layout.tsx`): Wraps entire app with ThemeProvider → UserProvider → MockDataProvider → Stack
- **Landing** (`app/index.tsx`): Role selection screen that routes to onboarding or login flows
- **Role Routes**: Each role has its own directory with nested layouts:
  - `app/patient/*` - Patient-specific screens (onboarding, dashboard, home, messages, symptoms, care plan)
  - `app/clinician/*` - Clinician workflows (dashboard, patient details, care plan authoring, documentation)
  - `app/admin/*` - Admin screens (dashboard, login)
  - `app/coordinator/*` - Care coordinator screens
  - `app/common/*` - Shared screens (webview)

### Provider Hierarchy

Three core providers wrap the entire application (in `app/_layout.tsx`):

1. **ThemeProvider** (`components/providers/ThemeProvider.tsx`)
   - Provides `Colors` constant and theme state
   - Currently dark mode only (Stardust-inspired navy theme)
   - Access via `useTheme()` hook

2. **UserProvider** (`components/providers/UserProvider.tsx`)
   - Manages authentication and user role state
   - User types: `'patient' | 'clinician' | 'admin'`
   - Provides role-based login functions: `loginAsPatient()`, `loginAsClinician()`, `loginAsAdmin()`, `logout()`
   - Access via `useUser()` hook

3. **MockDataProvider** (`components/providers/MockDataProvider.tsx`)
   - Provides mock patient data including insights, care tasks, consents, and metrics
   - Types: `PatientData`, `Insight`, `CareTask`, `ConsentRecord`, `PatientMetrics`
   - Access via `useMockData()` hook (re-exported in `hooks/useMockData.ts`)

### Component Structure

Atomic design pattern with modifications:
- **Atoms** (`components/atoms/`): Basic building blocks
  - `Button.tsx` - Primary/secondary/tertiary variants with press animations
  - `ThemedText.tsx` - Typography component with variants (display, heading, title, subtitle, body, caption)
  - `Icon.tsx` / `IconGlyph.tsx` - Icon components
  - `Chip.tsx` - Pill-shaped UI elements
  - `InputField.tsx` - Form inputs
  - `InsightModal.tsx` - Modal for displaying AI insights

- **Molecules** (`components/molecules/`): Combinations of atoms
  - `InsightCard.tsx` - Health insight display
  - `MessageBubble.tsx` - Chat message component
  - `SafetyBanner.tsx` - Alert/warning banners
  - `CareTaskTile.tsx` - Task list items
  - `ConsentChip.tsx` - Consent status indicators

- **Organisms** (`components/organisms/`): Complex UI sections
  - `BottomNavbarPatient.tsx` / `BottomNavbarClinician.tsx` - Role-specific navigation
  - `HeaderSection.tsx` - Page headers
  - `DailyPulseFeed.tsx` - Activity/health feed
  - `TaskList.tsx` - Care task management
  - `SymptomForm.tsx` - Symptom logging
  - `PrivacyLedger.tsx` - Consent management
  - `CareTasksSection.tsx` - Care task display section

- **HOC** (`components/HOC/`):
  - `withMockData.tsx` - Higher-order component for injecting mock data

### Design System

Centralized in `constants/Colors.ts`:
- **Colors**: Primary (teal/indigo), accent (gold/coral/purple), status (green/amber/red), backgrounds, text, borders, gradients, glow effects
- **Typography**: Font families, sizes, line heights, weights
- **Spacing**: 8-point grid system (xs to 3xl)
- **BorderRadius**: sm to full
- **Shadows**: sm/md/lg/glow variants
- **Animation**: Timing presets (fast: 150ms, normal: 200ms, slow: 250ms)

Design philosophy: "Stardust-inspired" with clinical calmness, deep navy backgrounds, subtle glows, and glassmorphism effects.

### AI Integration

The patient dashboard integrates with a local AI service:
- **Base URL**: `https://jolliest-joshingly-shaneka.ngrok-free.dev`
- **Endpoints**:
  - `POST /ask` - Text-based AI queries (question-answer)
  - `POST /generate-image` - Image generation via ComfyUI
- **Usage**: See `app/patient/dashboard/home.tsx` functions `askLocalAI()` and `generateImage()`
- Returns responses via modals (`InsightModal` and custom image modal)

### TypeScript Configuration

- Path alias: `@/*` maps to root directory
- Strict mode enabled
- Extends `expo/tsconfig.base`

## Key Patterns

### Navigation
Use `useRouter()` from `expo-router`:
```typescript
import { useRouter } from 'expo-router';
const router = useRouter();
router.push('/patient/dashboard/home');
router.back();
```

### Theming
All components use the centralized design system:
```typescript
import { Colors, Spacing, BorderRadius, Typography } from '@/constants/Colors';
```

### User Context
Access current user and role:
```typescript
const { user, loginAsPatient, logout } = useUser();
if (user?.role === 'patient') { /* ... */ }
```

### Mock Data Access
```typescript
const { patientData } = useMockData();
// Access: patientData.insights, patientData.careTasks, etc.
```

### Animations
Use React Native's `Animated` API with design system timing:
```typescript
const opacity = useRef(new Animated.Value(0)).current;
Animated.timing(opacity, {
  toValue: 1,
  duration: Animation.duration.normal,
  useNativeDriver: true
}).start();
```

## Platform Support

This is a React Native app built with Expo that runs on:
- iOS (via Expo Go or development build)
- Android (via Expo Go or development build)
- Web (limited support)

Target minimum font size: 14-16pt for accessibility.
