module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
    },
    extends: [
        '@nuxtjs/eslint-config-typescript',
        'plugin:nuxt/recommended',
        'airbnb-base',
    ],
    plugins: [
    ],
    parserOptions: {
        ecmaVersion: 2021,
    },
    // add your custom rules here
    rules: {
        indent: ['error', 4],
        'vue/html-indent': ['error', 4],
        semi: ['error', 'always'],
        'space-before-function-paren': ['error', 'never'],
        // 'no-shadow': ['error', { allow: ['state'] }],
        'import/extensions': [
            'error',
            'ignorePackages',
            {
                js: 'never',
                jsx: 'never',
                ts: 'never',
                tsx: 'never',
            },
        ],
        'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
        'no-shadow': 'off',
        '@typescript-eslint/no-shadow': ['error'],
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': 'error',
        'no-dupe-class-members': 'off',
        'vue/comment-directive': 'error',
        'vue/no-multiple-template-root': 0,
        'vue/multi-word-component-names': ['error', {
            ignores: ['default', 'home', 'new', 'edit', 'index'],
        }],
    },
    settings: {
        'import/resolver': {
            typescript: {},
            node: {
                extensions: ['.js', '.ts'],
                paths: ['node_modules/', 'node_modules/@types'],
            },
        },
    },

};
