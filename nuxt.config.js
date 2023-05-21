export default {
    // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
    ssr: true,

    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: '',
        htmlAttrs: {
            lang: 'en',
        },
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '' },
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/dumbbell.ico' },
        ],
    },

    'vue/multi-word-component-names': ['error', {
        ignores: [],
    }],
    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [
        '@/assets/css/fonts.css',
        '@/assets/style/variables.less',
        '@/assets/style/bootstrap-grid.min.css',
        '@/node_modules/normalize-css/normalize.css',
        '@/node_modules/vue-select/dist/vue-select.css',
        '@/node_modules/vue-simple-calendar/static/css/gcal.css',
        '@/assets/style/main.less',
    ],
    styleResources: {
        less: [
            '~/assets/style/variables.less',
            '~/assets/style/less-mixin.less',
        ],
    },

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
        { src: '@/plugins/vmask.js' },
        { src: '@/plugins/auth.ts' },
        { src: '@/plugins/onAxiosErrors.ts' },
        { src: '@/plugins/notification.js' },
        { src: '@/plugins/serviceAccessor.ts' },
        { src: '@/plugins/vselect.js' },
        { src: '@/plugins/portal-vue.js' },
        { src: '@/plugins/vue-calendar.js', mode: 'client' },
    ],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
    // https://go.nuxtjs.dev/typescript
        '@nuxt/typescript-build',
        ['@pinia/nuxt', { disableVuex: false }],
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
    // https://go.nuxtjs.dev/axios
        [
            'nuxt-i18n', {
                lazy: true,
                strategy: 'prefix_except_default',
                detectBrowserLanguage: {
                    alwaysRedirect: true,
                    fallbackLocale: 'ru',
                    redirectOn: 'root',
                },
                locales: [
                    { code: 'ru', iso: 'ru-RU', file: 'ru.json' },
                    { code: 'en', iso: 'en-US', file: 'en.json' },
                ],
                langDir: 'locales/',
                defaultLocale: 'ru',
                seo: false,
                vueI18n: '~/config/i18n.ts',
            },
        ],
        'bootstrap-vue/nuxt',
        '@nuxtjs/axios',
        '@nuxtjs/auth',
        '@nuxtjs/style-resources',
        '@nuxtjs/composition-api/module',
        '@nuxtjs/dayjs',
    ],
    auth: {
        strategies: {
            local: {
                token: {
                    property: 'token',
                    maxAge: 60,
                    global: true,
                    // required: true,
                    // type: 'Bearer'
                },
                user: {
                    property: 'user',
                },
                endpoints: {
                    login: { url: 'http://localhost:5000/auth/login', method: 'post' },
                    logout: { url: 'http://localhost:5000/auth/logout', method: 'post' },
                    user: { url: 'http://localhost:5000/auth/user', method: 'get' },
                },
            },
        },
        redirect: false,
        autoLogout: true,
    },

    // Axios module configuration: https://go.nuxtjs.dev/config-axios
    axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
        baseURL: '/',
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
        loaders: {
            cssModules: {
                modules: {
                    localIdentName: '[name]_[local]_[hash:base64:4]',
                    exportLocalsConvention: 'camelCase',
                },
            },
        },
    },
};
