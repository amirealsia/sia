# Multi-Language Support Documentation

## Overview

The landing page now supports 4 languages with a simple client-side translation system:
- 🇺🇸 English (en)
- 🇰🇷 Korean (한국어, ko)
- 🇯🇵 Japanese (日本語, ja)
- 🇨🇳 Chinese (中文, zh)

## Architecture

### Why Client-Side Instead of next-intl?

We initially tried using `next-intl` with Next.js 15's App Router, but encountered persistent routing issues:
- Complex `[locale]` dynamic route structure
- Middleware conflicts causing 404 errors
- Build cache corruption requiring frequent clean rebuilds
- Module resolution errors

**Solution**: Implemented a simpler, more reliable client-side translation system using React Context.

## Implementation

### Files Structure

```
landing/
├── lib/
│   └── translations.ts          # All translation strings
├── contexts/
│   └── LanguageContext.tsx      # Language state management
├── app/
│   ├── layout.tsx               # Wrapped with LanguageProvider
│   └── page.tsx                 # Uses translations via useLanguage hook
```

### How It Works

1. **Translation Storage** (`lib/translations.ts`)
   - All translations stored in a single TypeScript object
   - Type-safe with `TranslationKey` type
   - Easy to maintain and add new languages

2. **Language Context** (`contexts/LanguageContext.tsx`)
   - React Context provides language state globally
   - Saves selected language to localStorage
   - Auto-detects browser language on first visit
   - Provides `useLanguage()` hook for components

3. **Usage in Components**
   ```tsx
   import { useLanguage } from '@/contexts/LanguageContext';

   export default function Component() {
     const { language, setLanguage, t } = useLanguage();

     return <h1>{t.hero.title}</h1>;
   }
   ```

## Language Selector

Located in the top navigation bar:
- Shows current language flag
- Dropdown menu with all language options
- Highlights currently selected language in pink
- Changes persist across sessions via localStorage

## Adding New Translations

To add a new language:

1. Add the language to `lib/translations.ts`:
   ```typescript
   export const translations = {
     // ... existing languages
     fr: {
       nav: {
         about: "À propos",
         // ... more translations
       }
     }
   }
   ```

2. Add language option to `app/page.tsx`:
   ```typescript
   const languages = [
     // ... existing languages
     { code: 'fr', name: 'Français', flag: '🇫🇷' },
   ];
   ```

## Benefits of This Approach

✅ **Simple**: No complex routing, just React Context
✅ **Reliable**: No 404 errors or build issues
✅ **Fast**: Client-side switching is instant
✅ **Type-Safe**: Full TypeScript support
✅ **Maintainable**: All translations in one file
✅ **Works with Next.js 15**: No compatibility issues

## Limitations

⚠️ **SEO**: Client-side rendering means search engines might not index all languages
⚠️ **Initial Load**: Loads all translations upfront (minimal impact for 4 languages)

## Future Improvements

If SEO becomes important, consider:
- Using `next-intl` v4.0+ when stable with Next.js 15
- Server-side rendering with middleware
- Separate translation files per language

For now, the client-side approach provides excellent UX and reliability.

## Testing

1. Open http://localhost:3000
2. Click the language selector (flag icon in navigation)
3. Select different languages
4. Verify all text changes
5. Refresh page - selected language should persist
6. Clear localStorage and refresh - should detect browser language

## Translation Coverage

All sections are fully translated:
- Navigation menu
- Hero section (title, subtitle, description, CTA buttons)
- About section (title, 3 feature cards)
- Gallery section (title, "Day" labels)
- Technical Details (all labels and values)
- Roadmap (Q1-Q4 titles and items)
- Community section (title, description)
- Footer (tagline, privacy, terms, rights)

## Language Detection

On first visit, the system:
1. Checks localStorage for saved language preference
2. If none, detects browser language from `navigator.language`
3. Falls back to English if browser language not supported
4. Saves selection for future visits
