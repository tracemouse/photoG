// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  alias: {
    cookie: "cookie"
  },
  // site: {
  //   url: process.env.SITE_URL,
  //   name: process.env.SITE_NAME,
  //   description: process.env.SITE_DESCRIPTION,
  //   defaultLocale: 'zh', // not needed if you have @nuxtjs/i18n installed
  // },
  runtimeConfig: {
    api: {
      SRC_URL: process.env.SRC_URL,
      SUPABASE_URL: process.env.SUPABASE_URL,
      SUPABASE_KEY: process.env.SUPABASE_KEY,
      SUPABASE_SERVICE_KEY: process.env.SUPABASE_SERVICE_KEY,
    },
    // 需要写在public里面，否则客户端无法访问
    public: {
      SITE_NAME: process.env.SITE_NAME,
      SITE_URL: process.env.SITE_URL,
      IMG_PROXY: process.env.IMG_PROXY,
      SITE_KEYWORDS: process.env.SITE_KEYWORDS,
    }
  },
  devServer:{
    host: '0.0.0.0',
    port: 3001,
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "~/assets/css/bootstrap.scss";`
          // additionalData: '@use "@/assets/css/bootstrap.scss" as *'
        }
      }
    }
  },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
      templateParams: {
        separator: '-',
      },
      titleTemplate: 'GSC IT Development & Test Center 2025 Annual Dinner',
      meta:[
        {
          name: 'apple-mobile-web-app-capable',
          content: 'yes'
        },
        {
          name: 'apple-mobile-web-app-status-bar-style',
          content: 'white',
        },
        {
          name: 'apple-mobile-web-app-title',
          content: process.env.SITE_NAME,
        },
        // {
        //   name: 'apple-touch-startup-image',
        //   content: '/launch.png',
        // }
        {
          name: 'mobile-web-app-capable',
          content: 'yes',
        },
        {
          name: 'keywords',
          content: process.env.SITE_KEYWORDS,
        }
      ],
      link: [
        { 
          rel: 'stylesheet', 
          href: '/reset.css'
        },
        {
          rel: 'stylesheet',
          // href: 'https://gcore.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css'
          href: '/bootstrap/bootstrap.min.css'
        },
        {
          rel: 'stylesheet',
          href: '/main.css'
        },
      ],
      script: [
        {
          // src: 'https://gcore.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
          src: '/bootstrap/bootstrap.bundle.min.js',
          // body: true,
        }
      ]
    }
  },
  supabase: {
    redirect: false, // https://supabase.nuxtjs.org/get-started#redirect
    url: process.env.SUPABASE_URL,
    // key: process.env.SUPABASE_KEY,
    serviceKey: process.env.SUPABASE_SERVICE_KEY,
  },
  icon: {
    // serverBundle: {
    //   remote: 'unpkg', // 'unpkg' or 'github-raw', or a custom function
    // },
    // serverBundle: false,
    clientBundle: {
      includeCustomCollections: true,
      sizeLimitKb: 256,
      scan: {
        // note that when you specify those values, the default behavior will be overridden
        globInclude: ['components/**/*.vue', /* ... */],
        globExclude: ['node_modules', 'dist', /* ... */],
      },
      icons:[
        'tabler:badge-4k',
        'tabler:device-tv',
        'tabler:bookmarks',
        'tabler:file-spark',
        'tabler:user-cog',
        'tabler:file-description',
        'tabler:diamond',
        'tabler:coins',
        'tabler:folder-dollar',
        'tabler:devices-share',
        'tabler:git-pull-request',
        'tabler:users',
        'tabler:device-tv',
        'tabler:coins',
        'tabler:star',
        'tabler:movie'
      ],
    },
    customCollections: [
      {
        prefix: 'icon',
        dir: './assets/icons'
      },
    ],
  },
  modules: ["@nuxt/image", "@nuxt/icon", // "@nuxtjs/robots",
  '@nuxtjs/supabase', // "@nuxt/scripts",
  '@vueuse/nuxt',
  "@pinia/nuxt",
  "@pinia-plugin-persistedstate/nuxt",
  ],
  compatibilityDate: '2024-07-19'
});