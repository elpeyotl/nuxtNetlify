# Entwicklungsrichtlinien - The Yelling Light

## Code-Standards

### JavaScript/Vue.js Standards
- **ESLint Konfiguration**: `@nuxtjs/eslint-config`
- **Code-Formatierung**: Prettier mit `.prettierrc`
- **Vue Style Guide**: Offizielle Vue.js Style Guide befolgen
- **Composition API**: Bevorzugt für neue Komponenten

### Naming Conventions

#### Dateien & Verzeichnisse
```
components/
├── PascalCase.vue          # Vue-Komponenten
├── camelCase.js            # JavaScript-Module
└── kebab-case/             # Verzeichnisse

content/
├── kebab-case.md           # Markdown-Dateien
└── kebab-case/             # Content-Verzeichnisse

pages/
├── kebab-case.vue          # Seiten-Komponenten
└── _slug.vue               # Dynamische Routen
```

#### Vue-Komponenten
```vue
<!-- PascalCase für Komponenten-Namen -->
<template>
  <div class="component-wrapper">
    <!-- kebab-case für HTML-Attribute -->
    <custom-component :prop-name="value" @event-name="handler" />
  </div>
</template>

<script>
export default {
  name: 'ComponentName', // PascalCase
  props: {
    propName: String      // camelCase
  },
  data() {
    return {
      localVariable: ''   // camelCase
    }
  },
  methods: {
    methodName() {}       // camelCase
  }
}
</script>
```

### CSS/Styling Guidelines

#### Tailwind CSS Best Practices
```vue
<template>
  <!-- Responsive Design -->
  <div class="w-full md:w-1/2 lg:w-1/3">
    
    <!-- Komponenten-spezifische Klassen -->
    <div class="card-container">
      
      <!-- Utility-First Approach -->
      <h2 class="text-2xl font-bold text-gray-800 mb-4">
        {{ title }}
      </h2>
    </div>
  </div>
</template>

<style scoped>
/* Nur für komplexe, wiederverwendbare Styles */
.card-container {
  @apply bg-white rounded-lg shadow-md p-6;
}

/* Vermeide: Inline-Styles */
/* Bevorzuge: Tailwind-Utilities */
</style>
```

#### Custom CSS Organisation
```css
/* assets/styles/styles.css */

/* 1. Base Styles */
@tailwind base;

/* 2. Component Styles */
@tailwind components;

/* 3. Utility Styles */
@tailwind utilities;

/* 4. Custom Components */
.btn-primary {
  @apply bg-blue-500 text-white font-bold py-2 px-4 rounded;
}

.btn-primary:hover {
  @apply bg-blue-700;
}
```

## Komponenten-Entwicklung

### Komponenten-Struktur
```vue
<template>
  <!-- Template sollte einen Root-Element haben (Vue 2) -->
  <div class="component-root">
    <!-- Conditional Rendering -->
    <div v-if="isVisible" class="content">
      <!-- Props verwenden -->
      <h1>{{ title }}</h1>
      
      <!-- Events emittieren -->
      <button @click="handleClick">
        {{ buttonText }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ExampleComponent',
  
  // Props Definition
  props: {
    title: {
      type: String,
      required: true
    },
    isVisible: {
      type: Boolean,
      default: true
    }
  },
  
  // Data
  data() {
    return {
      buttonText: 'Click me'
    }
  },
  
  // Computed Properties
  computed: {
    computedValue() {
      return this.title.toUpperCase()
    }
  },
  
  // Methods
  methods: {
    handleClick() {
      this.$emit('button-clicked', this.title)
    }
  },
  
  // Lifecycle Hooks
  mounted() {
    console.log('Component mounted')
  }
}
</script>

<style scoped>
/* Scoped Styles für Komponenten-spezifische Styles */
.component-root {
  /* Styles hier */
}
</style>
```

### Wiederverwendbare Komponenten
```vue
<!-- components/Card.vue -->
<template>
  <div class="card" :class="cardClasses">
    <div v-if="$slots.header" class="card-header">
      <slot name="header"></slot>
    </div>
    
    <div class="card-body">
      <slot></slot>
    </div>
    
    <div v-if="$slots.footer" class="card-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    variant: {
      type: String,
      default: 'default',
      validator: value => ['default', 'primary', 'secondary'].includes(value)
    }
  },
  computed: {
    cardClasses() {
      return {
        'card--primary': this.variant === 'primary',
        'card--secondary': this.variant === 'secondary'
      }
    }
  }
}
</script>
```

## Content Management Guidelines

### Markdown-Struktur
```markdown
---
# Frontmatter (YAML)
title: "Artikel-Titel"
date: 2023-01-01
artist: "Künstlername"
genres: ["rock", "indie"]
thumbnail: "/img/thumbnail.jpg"
isPrivate: false
---

# Hauptinhalt

Markdown-Content hier...

## Unterüberschrift

- Liste
- Elemente

[Link](https://example.com)

![Bild](/img/image.jpg)
```

### Content-Validierung
```javascript
// helpers/contentValidation.js
export const validateArtist = (artist) => {
  const required = ['artist', 'date', 'thumbnail']
  const missing = required.filter(field => !artist[field])
  
  if (missing.length > 0) {
    throw new Error(`Missing required fields: ${missing.join(', ')}`)
  }
  
  return true
}
```

## Performance Guidelines

### Lazy Loading Implementation
```vue
<template>
  <div>
    <!-- Lazy Load Images -->
    <img 
      v-lazy="imageSrc" 
      :alt="imageAlt"
      class="lazy-image"
    />
    
    <!-- Lazy Load Components -->
    <lazy-component 
      v-if="shouldLoadComponent"
      @intersect="onIntersect"
    >
      <heavy-component />
    </lazy-component>
  </div>
</template>

<script>
export default {
  data() {
    return {
      shouldLoadComponent: false
    }
  },
  methods: {
    onIntersect() {
      this.shouldLoadComponent = true
    }
  }
}
</script>
```

### Bundle Optimization
```javascript
// nuxt.config.js
export default {
  build: {
    // Analyze bundle size
    analyze: process.env.NODE_ENV === 'development',
    
    // Optimize CSS
    extractCSS: true,
    
    // Split chunks
    splitChunks: {
      layouts: true,
      pages: true,
      commons: true
    }
  }
}
```

## Testing Guidelines

### Component Testing
```javascript
// tests/components/Card.spec.js
import { mount } from '@vue/test-utils'
import Card from '@/components/Card.vue'

describe('Card Component', () => {
  test('renders with default props', () => {
    const wrapper = mount(Card, {
      slots: {
        default: 'Test Content'
      }
    })
    
    expect(wrapper.text()).toContain('Test Content')
    expect(wrapper.classes()).toContain('card')
  })
  
  test('applies variant classes correctly', () => {
    const wrapper = mount(Card, {
      propsData: {
        variant: 'primary'
      }
    })
    
    expect(wrapper.classes()).toContain('card--primary')
  })
})
```

### Content Testing
```javascript
// tests/content/validation.spec.js
import { validateArtist } from '@/helpers/contentValidation'

describe('Content Validation', () => {
  test('validates artist with all required fields', () => {
    const artist = {
      artist: 'Test Artist',
      date: '2023-01-01',
      thumbnail: '/img/test.jpg'
    }
    
    expect(() => validateArtist(artist)).not.toThrow()
  })
})
```

## Git Workflow

### Branch Strategy
```
main/master          # Production branch
├── develop          # Development branch
├── feature/xyz      # Feature branches
├── hotfix/abc       # Hotfix branches
└── release/v1.x     # Release branches
```

### Commit Messages
```
feat: add new artist profile component
fix: resolve lazy loading issue in gallery
docs: update content management guidelines
style: format code with prettier
refactor: optimize image loading performance
test: add unit tests for Card component
chore: update dependencies
```

### Pull Request Template
```markdown
## Beschreibung
Kurze Beschreibung der Änderungen

## Art der Änderung
- [ ] Bug Fix
- [ ] Neue Funktion
- [ ] Breaking Change
- [ ] Dokumentation

## Testing
- [ ] Unit Tests hinzugefügt/aktualisiert
- [ ] Manuelle Tests durchgeführt
- [ ] Cross-Browser Testing

## Checklist
- [ ] Code folgt Style Guidelines
- [ ] Self-Review durchgeführt
- [ ] Dokumentation aktualisiert
```

## Deployment Guidelines

### Environment Variables
```bash
# .env.example
NUXT_ENV_BASE_URL=https://theyellinglight.ch
NUXT_ENV_API_URL=https://api.theyellinglight.ch
GOOGLE_ANALYTICS_ID=GA-XXXXXXXXX
```

### Build Optimization
```javascript
// nuxt.config.js
export default {
  // Production optimizations
  ...(process.env.NODE_ENV === 'production' && {
    build: {
      html: {
        minify: {
          collapseBooleanAttributes: true,
          decodeEntities: true,
          minifyCSS: true,
          minifyJS: true,
          processConditionalComments: true,
          removeEmptyAttributes: true,
          removeRedundantAttributes: true,
          trimCustomFragments: true,
          useShortDoctype: true
        }
      }
    }
  })
}
```

## Accessibility Guidelines

### ARIA Labels
```vue
<template>
  <nav aria-label="Hauptnavigation">
    <ul role="menubar">
      <li role="none">
        <a 
          href="/artists" 
          role="menuitem"
          aria-current="page"
        >
          Künstler
        </a>
      </li>
    </ul>
  </nav>
</template>
```

### Keyboard Navigation
```vue
<script>
export default {
  methods: {
    handleKeydown(event) {
      if (event.key === 'Enter' || event.key === ' ') {
        this.handleClick()
        event.preventDefault()
      }
    }
  }
}
</script>
```

## Error Handling

### Global Error Handler
```javascript
// plugins/errorHandler.js
export default ({ app }, inject) => {
  inject('handleError', (error, context = '') => {
    console.error(`Error in ${context}:`, error)
    
    // Send to monitoring service
    if (process.env.NODE_ENV === 'production') {
      // Sentry, LogRocket, etc.
    }
  })
}
```

### Component Error Boundaries
```vue
<script>
export default {
  errorCaptured(err, instance, info) {
    console.error('Component error:', err, info)
    this.$handleError(err, 'Component')
    return false
  }
}
</script>
```

## Monitoring & Analytics

### Performance Monitoring
```javascript
// plugins/performance.js
export default ({ app }) => {
  if (process.client) {
    // Core Web Vitals
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(console.log)
      getFID(console.log)
      getFCP(console.log)
      getLCP(console.log)
      getTTFB(console.log)
    })
  }
}
```

### Content Analytics
```javascript
// Track content interactions
export const trackContentView = (contentType, contentId) => {
  if (process.client && window.gtag) {
    window.gtag('event', 'content_view', {
      content_type: contentType,
      content_id: contentId
    })
  }
}