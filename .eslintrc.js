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
        'import/no-cycle': false,
        'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
        'no-shadow': 'off',
        '@typescript-eslint/no-shadow': ['error'],
        'no-unused-vars': 'off', // for ENUMS errors (created but never used)
        '@typescript-eslint/no-unused-vars': 'error', // for ENUMS errors (created but never used)
        'no-dupe-class-members': 'off',
        'vue/comment-directive': 'error', // plugin:vue/recommended
        'vue/jsx-uses-vars': 'error', // plugin:vue/recommended
        'vue/no-multiple-template-root': 'warning',

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
