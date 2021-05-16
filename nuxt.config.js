export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Wikispeech',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["~assets/styles/main.scss", "~assets/styles/main.css"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['~/plugins/bus.js'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
  ],

  loading: {
    color: "#66a8ff"
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/buefy
    'nuxt-buefy',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    'nuxt-responsive-loader',
    [
      "nuxt-cookie-control",
      {
        barPosition: "bottom-full",
        colors: {
          barTextColor: "#fff",
          barBackground: "#004aad",
          barButtonColor: "#111111",
          barButtonBackground: "#fff",
          barButtonHoverColor: "#fff",
          barButtonHoverBackground: "#004aad",
          modalButtonBackground: "#004aad",
          modalButtonHoverColor: "#111111",
          controlButtonBackground: "#004aad",
          controlButtonHoverBackground: "#004aad",
          controlButtonIconHoverColor: "#fff",
          controlButtonIconColor: "#fff",
          modalButtonHoverBackground: "#fff",
          checkboxActiveBackground: "#004aad",
          checkboxInactiveBackground: "#ede1e1",
          checkboxActiveCircleBackground: "#448cce",
          checkboxInactiveCircleBackground: "#f44336",
          checkboxDisabledBackground: "#ddd",
          checkboxDisabledCircleBackground: "#fff"
        },
        text: {
          barDescription: 'We use our own cookies so that we can show you this website. If you continue browsing, we consider that you have accepted the cookies and the cookie policy. You can find the cookie policy at: https://www.wikispeech.net/legal-infos/cookie-policy',
        }
      }
    ],
    '@nuxtjs/sitemap',
    'nuxt-i18n',
    'cookie-universal-nuxt',
  ],

  sitemap: {
    hostname: 'https://www.wikispeech.net',
    gzip: false,
    exclude: [
      '/listen/**'
    ],
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  i18n: {
    seo: false,
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      onlyOnRoot: true,
      alwaysRedirect: true
    },
    locales: [
      {
        code: 'en',
        iso: 'en-US',
        name: 'English',
        file: 'en-US.js'
      },
      {
        code: 'fr',
        iso: 'fr-FR',
        name: 'Français',
        file: 'fr-FR.js'
      },
      {
        code: 'es',
        iso: 'es-ES',
        name: 'Español',
        file: 'es-ES.js'
      }
    ],
    lazy: true,
    langDir: 'lang/',
    defaultLocale: 'en',
    strategy: 'no_prefix',
    vueI18n: {
      fallbackLocale: 'en',
    },
    vueI18nLoader: true,
  },
  cookies: {
    necessary: [
      {
        //if multilanguage
        name: {
          en: 'Default Cookies'
        },
        //if multilanguage
        description: {
          en: 'Used for cookie control.'
        },
        cookies: ['cookie_control_consent', 'cookie_control_enabled_cookies']
      },
      {
        //if multilanguage
        name: {
          en: 'Language Cookies'
        },
        //if multilanguage
        description: {
          en: 'Used for cookie control.',
          en: 'Utilisé pour déterminer votre langue.',
          es: 'Usado para determinar vuestro lenguaje.'
        },
        cookies: ['i18n_redirected']
      }
    ],
    optional: [
      {
        name: 'Google Analitycs',
        //if you don't set identifier, slugified name will be used
        identifier: 'ga',
        //if multilanguage
        description: {
          en: 'Google GTM is ...',
          fr: 'Google Tag Manager est ...',
          es: 'Google Tag Manager esta ...'
        },

        initialState: true,
        src: 'https://www.googletagmanager.com/gtag/js?id=G-13J1HCCQ7K',
        async: true,
        cookies: ['_ga', '_gat', '_gid'],
        accepted: () => {
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({
            'gtm.start': new Date().getTime(),
            event: 'gtm.js'
          });
        },
        declined: () => {
        }
      }
    ]
  }
}