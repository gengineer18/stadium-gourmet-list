const envPath = `.env.${process.env.NODE_ENV || 'development'}`
require('dotenv').config({ path: envPath })
export default {
  mode: 'universal',
  srcDir: 'app',
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '%s | みんなでつくる Jリーグスタグル名鑑',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'みんなでつくる Jリーグスタグル名鑑は、「スタジアムグルメを通じてさらにJリーグを盛り上げていく」ことをコンセプトとしたスタグル情報記録・共有Webサイトです。'
      },
      {
        hid: 'og:site_name',
        property: 'og:site_name',
        content: 'みんなでつくる Jリーグスタグル名鑑'
      },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      {
        hid: 'og:url',
        property: 'og:url',
        content: 'https://stgrmeikan.com'
      },
      {
        hid: 'og:title',
        property: 'og:title',
        content: 'みんなでつくる Jリーグスタグル名鑑'
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content:
          'みんなでつくる Jリーグスタグル名鑑は、「スタジアムグルメを通じてさらにJリーグを盛り上げていく」ことをコンセプトとしたスタグル情報記録・共有Webサイトです。'
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: 'https://firebasestorage.googleapis.com/v0/b/stadium-gourmet-list.appspot.com/o/assets%2Fogp.png?alt=media&token=5ee41d9e-38b7-44ab-9c91-0671ff7122fc'
      },
      {
        hid: 'twitter:card',
        name: 'twitter:card',
        content: 'summary'
      },
      {
        hid: 'twitter:site',
        name: 'twitter:site',
        content: '@stgrmeikan'
      },
      {
        hid: 'twitter:creator',
        name: 'twitter:creator',
        content: '@stgrmeikan'
      },
      {
        hid: 'twitter:image',
        name: 'twitter:image',
        content: 'https://firebasestorage.googleapis.com/v0/b/stadium-gourmet-list.appspot.com/o/assets%2Fogp.png?alt=media&token=5ee41d9e-38b7-44ab-9c91-0671ff7122fc'
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'apple-touch-icon', href: '' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    '~/assets/css/buefy.scss',
    '~/assets/css/transition.scss'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/plugins/vue-simple-spinner.js', ssr: false },
    '~/plugins/firebase',
    '~/plugins/auth',
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxt/typescript-build'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://buefy.github.io/#/documentation
    'nuxt-buefy',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    'nuxt-user-agent',
    ['@nuxtjs/google-analytics',
      {
        id: 'UA-155565454-1',
        debug: {
          enabled: process.env.NODE_ENV !== 'production',    // default value is false
          trace: process.env.NODE_ENV !== 'production',      // default value is false
          sendHitTask: process.env.NODE_ENV !== 'production' // default value is false
        }
      }
    ]
  ],
  manifest: {
    name: 'みんなでつくる Jリーグスタグル名鑑',
    lang: 'ja',
    theme_color: '#f6d04d',
    background_color: '#ffffff',
    display: 'standalone',
    Scope: '/',
    start_url: '/',
    splash_pages: null
  },
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    BaseUrl: process.env.FB_DATABASE_URL
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config: any, ctx: any) {
    },
    transpile: [
      'vee-validate/dist/rules'
    ]
  },
  typescript: {
    typeCheck: true,
    ignoreNotFoundWarnings: true
  },
  dotenv: {
    filename: envPath
  }
}
