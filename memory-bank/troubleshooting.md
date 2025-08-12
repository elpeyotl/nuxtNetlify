# Troubleshooting - The Yelling Light

## Häufige Probleme und Lösungen

### Vue Package Version Mismatch

**Problem:**
```
Vue packages version mismatch:
- vue@2.7.16
- vue-server-renderer@2.6.14

This may cause things to work incorrectly. Make sure to use the same version for both.
```

**Ursache:**
Inkompatible Versionen zwischen Vue.js und vue-server-renderer können zu Build-Fehlern und Runtime-Problemen führen.

**Lösung:**
```bash
# 1. Aktuelle Versionen prüfen
yarn list vue vue-server-renderer

# 2. Kompatible Versionen installieren
yarn add vue@2.6.14 vue-server-renderer@2.6.14

# ODER für Vue 2.7.x:
yarn add vue@2.7.16 vue-server-renderer@2.7.16

# 3. Lock-File aktualisieren
yarn install --frozen-lockfile

### Netlify Deployment Python Version Problem - GELÖST
**Problem:** Build failure wegen Python 3.13.6 Kompatibilitätsproblemen

**Angewandte Lösung:**
```toml
# netlify.toml erstellt mit:
[build]
  command = "npm run generate"
  publish = "dist"

[build.environment]
  NODE_VERSION = "18"
  PYTHON_VERSION = "3.8"
  NPM_FLAGS = "--production=false"
  NODE_OPTIONS = "--openssl-legacy-provider --max-old-space-size=4096"

**Lokaler Test:** ✅ `npm run generate` erfolgreich - 95 Routen generiert

```

**Status:** ✅ Konfiguration erstellt - Deployment sollte jetzt funktionieren


# 4. Cache leeren
yarn cache clean
rm -rf node_modules/.cache
```

**Empfohlene Vue 2.x Versionen für Nuxt 2.14.5:**
```json
{
  "vue": "2.6.14",
  "vue-server-renderer": "2.6.14",
  "vue-template-compiler": "2.6.14"
}
```

### Dependency Management

#### Node.js Version Kompatibilität
```bash
# Empfohlene Node.js Version für dieses Projekt
node --version  # Sollte 16.x oder 18.x sein

# Falls nvm verwendet wird:
nvm use 16
```

#### Package-Lock Probleme
```bash
# Bei Dependency-Konflikten:
rm -rf node_modules
rm yarn.lock
yarn install

# Oder mit npm:
rm -rf node_modules
rm package-lock.json
npm install
```

### Build-Probleme

#### Memory Issues
```bash
# Für große Projekte:
export NODE_OPTIONS="--max-old-space-size=4096"
yarn build

# Oder in package.json:
{
  "scripts": {
    "build": "NODE_OPTIONS='--max-old-space-size=4096' nuxt build"
  }
}
```

#### Tailwind CSS Build Errors
```bash
# Tailwind Cache leeren:
rm -rf .nuxt
rm -rf dist
yarn dev
```

### Development Server Issues

#### Port bereits in Verwendung
```bash
# Port prüfen:
lsof -ti:3000

# Prozess beenden:
kill -9 $(lsof -ti:3000)

# Alternativen Port verwenden:
yarn dev --port 3001
```

#### Hot Reload funktioniert nicht
```javascript
// nuxt.config.js
export default {
  watchers: {
    webpack: {
      aggregateTimeout: 300,
      poll: 1000
    }
  }
}
```

### Content Management Issues

#### Netlify CMS Login Probleme
```yaml
# static/admin/config.yml
backend:
  name: git-gateway
  branch: master # Oder main, je nach Repository

# Netlify Identity konfigurieren:
# 1. Netlify Dashboard → Identity → Enable
# 2. Registration → Invite only
# 3. Git Gateway → Enable
```

#### Content nicht sichtbar
```bash
# @nuxt/content Cache leeren:
rm -rf .nuxt/content
yarn dev
```

#### Markdown Rendering Probleme
```javascript
// nuxt.config.js
export default {
  content: {
    markdown: {
      remarkPlugins: ['remark-breaks'],
      rehypePlugins: []
    }
  }
}
```

### Performance Issues

#### Slow Build Times
```javascript
// nuxt.config.js - Development Optimierungen
export default {
  build: {
    hardSource: process.env.NODE_ENV === 'development',
    cache: true,
    parallel: true
  }
}
```

#### Large Bundle Size
```bash
# Bundle Analyse:
yarn build --analyze

# Webpack Bundle Analyzer öffnet automatisch
```

### Deployment Issues

#### Netlify Build Failures
```toml
# netlify.toml
[build]
  command = "yarn generate"
  publish = "dist"

[build.environment]
  NODE_VERSION = "16"
  YARN_VERSION = "1.22.19"
  NODE_OPTIONS = "--max-old-space-size=4096"
```

#### Static Generation Errors
```javascript
// nuxt.config.js
export default {
  generate: {
    fallback: true,
    crawler: false, // Bei Problemen mit dynamischen Routen
    exclude: [
      /^\/admin/ // CMS Admin-Bereich ausschließen
    ]
  }
}
```

### CSS/Styling Issues

#### Tailwind Classes nicht angewendet
```javascript
// tailwind.config.js
module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}'
  ]
}
```

#### SCSS/SASS Probleme
```bash
# SASS Dependencies installieren:
yarn add -D sass sass-loader@10
```

### JavaScript/Vue Issues

#### Composition API Probleme
```bash
# Composition API für Vue 2:
yarn add @nuxtjs/composition-api

# nuxt.config.js:
buildModules: ['@nuxtjs/composition-api/module']
```

#### ESLint Errors
```bash
# ESLint Cache leeren:
rm -rf .eslintcache
yarn lint --fix
```

### Image/Media Issues

#### Lazy Loading nicht funktioniert
```javascript
// plugins/vue-lazyload.js
import Vue from 'vue'
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: '/img/error.jpg',
  loading: '/img/loading.gif',
  attempt: 1
})
```

#### SVG Icons nicht geladen
```bash
# SVG Icons neu generieren:
yarn svg
```

### Database/API Issues

#### Content API nicht erreichbar
```javascript
// Lokale Content API prüfen:
// http://localhost:3000/_content/

// Content-Module Konfiguration:
export default {
  content: {
    dir: 'content',
    fullTextSearchFields: ['title', 'description', 'slug']
  }
}
```

## Debugging Tools

### Vue DevTools
```bash
# Vue DevTools für Development:
yarn add -D @vue/devtools
```

### Nuxt DevTools
```javascript
// nuxt.config.js
export default {
  devtools: process.env.NODE_ENV === 'development'
}
```

### Console Debugging
```javascript
// Debug-Modus aktivieren:
export default {
  debug: process.env.NODE_ENV === 'development'
}
```

## Monitoring & Logging

### Error Tracking
```javascript
// plugins/error-tracking.js
export default ({ app }, inject) => {
  inject('logError', (error, context) => {
    console.error(`[${context}]`, error)
    
    // Production Error Tracking
    if (process.env.NODE_ENV === 'production') {
      // Sentry, LogRocket, etc.
    }
  })
}
```

### Performance Monitoring
```javascript
// Performance Debugging
if (process.client && process.env.NODE_ENV === 'development') {
  console.log('Performance Timing:', performance.timing)
}
```

## Support & Community

### Offizielle Dokumentation
- [Nuxt.js Docs](https://nuxtjs.org/docs)
- [Vue.js Docs](https://vuejs.org/guide/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

### Community Support
- [Nuxt.js Discord](https://discord.com/invite/ps2h6QT)
- [Vue.js Forum](https://forum.vuejs.org/)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/nuxt.js)

### Projekt-spezifische Hilfe
Bei projektspezifischen Problemen:
1. Repository Issues prüfen
2. Entwicklungsteam kontaktieren
3. Memory Bank Dokumentation konsultieren

## ✅ Gelöste Probleme (12. August 2025)

### Vue Package Version Mismatch - GELÖST
**Problem:** Vue packages version mismatch (vue@2.7.16 vs vue-server-renderer@2.6.14)

**Angewandte Lösung:**
```bash
# 1. Explizite Vue-Versionen in package.json hinzugefügt:
"vue": "2.6.14",
"vue-server-renderer": "2.6.14",
"vue-template-compiler": "2.6.14"

# 2. Dependencies neu installiert:
npm install

# 3. ESLint-Fehler behoben:
npm run lint:fix
```

**Status:** ✅ Erfolgreich gelöst - Projekt läuft ohne Vue-Versionskonflikte

### Node.js Kompatibilitätsproblem - GELÖST
**Problem:** `Error: error:0308010C:digital envelope routines::unsupported` mit Node.js v22

**Angewandte Lösung:**
```bash
# Legacy OpenSSL Provider in package.json Scripts hinzugefügt:
"dev": "NODE_OPTIONS=\"--openssl-legacy-provider\" nuxt",
"build": "NODE_OPTIONS=\"--openssl-legacy-provider\" nuxt build",
"generate": "NODE_OPTIONS=\"--openssl-legacy-provider\" nuxt generate"
```

**Status:** ✅ Erfolgreich gelöst - Development Server läuft stabil

### Yarn/npm Inkompatibilität - GELÖST
**Problem:** `yarn: command not found` in Scripts

**Angewandte Lösung:**
```bash
# Scripts in package.json von yarn auf npm umgestellt:
"lint": "npm run lint:js",
"lint:fix": "eslint --ext .js,.vue --ignore-path .gitignore . --fix"
```

**Status:** ✅ Erfolgreich gelöst - Alle Scripts funktionieren mit npm

---