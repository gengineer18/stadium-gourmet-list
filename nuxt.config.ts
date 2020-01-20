const envPath = `.env.${process.env.NODE_ENV || 'development'}`;
require('dotenv').config({ path: envPath });
console.info(process.env.TEST)

export default {
  mode: 'universal',
  srcDir: 'app',
  /*
  ** Headers of the page
  */
  head: {
    title: 'スタグル名鑑',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
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
    '~/plugins/vue-scrollto',
    { src: "~/plugins/vue2-touch-events.ts", ssr: false },
    { src: '~/plugins/vee-validate.js', ssr: true },
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
    'nuxt-user-agent'
  ],
  manifest: {
    name: 'スタグル名鑑',
    lang: 'ja'
  },
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
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
      'vee-validate/dist/rules',
    ],
  },
  typescript: {
    typeCheck: true,
    ignoreNotFoundWarnings: true
  },
  dotenv: {
    filename: envPath
  },
}
