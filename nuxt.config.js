import { pageTitle, pageDescription } from './config/yellingLightSettings'

export default {
  googleAnalytics: {
    id: 'UA-127631817-1',
  },
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',
  mode: 'spa',
  // Global page headers (https://go.nuxtjs.dev/config-head)

  head: {
    title: 'netlifyCMS',
    meta: [
      { title: 'The yelling light' },
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: pageDescription,
      },
      {
        hid: 'twitter:title',
        name: 'twitter:title',
        content: pageTitle,
      },
      {
        hid: 'twitter:description',
        name: 'twitter:description',
        content: pageDescription,
      },
      {
        hid: 'twitter:image',
        name: 'twitter:image',
        content: '/img/yelling-logo.jpg',
      },
      {
        hid: 'twitter:image:alt',
        name: 'twitter:image:alt',
        content: 'Yelling light logo',
      },
      {
        hid: 'og:title',
        property: 'og:title',
        content: pageTitle,
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: pageDescription,
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: '/img/yelling-logo.jpg',
      },
      {
        hid: 'og:image:secure_url',
        property: 'og:image:secure_url',
        content: '/img/yelling-logo.jpg',
      },
      {
        hid: 'og:image:alt',
        property: 'og:image:alt',
        content: 'Yelling light logo',
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
      {
        rel: 'preload',
        as: 'style',
        href:
          'https://fonts.googleapis.com/css2?family=Montserrat&family=RalewayRaleway:ital,wght@0,200;0,400;1,200&display=swap',
      },
      {
        rel: 'stylesheet',
        media: 'print',
        onload: "this.onload=null;this.removeAttribute('media');",
        href:
          'https://fonts.googleapis.com/css2?family=Montserrat&family=RalewayRaleway:ital,wght@0,200;0,400;1,200&display=swap',
      },
    ],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['~/assets/styles/styles.css', '~/assets/styles/animate.css'],
  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: ['~/plugins/vue-lazyload.js', '~/plugins/svgIcon.js'],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/composition-api',
    '@nuxtjs/google-analytics',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
  ],

  // Content module configuration (https://go.nuxtjs.dev/content-config)
  content: {},

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},
}
