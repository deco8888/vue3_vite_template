/** @type {import('@typescript-eslint/utils').TSESLint.Linter.Config} */
const config = {
    root: true, //.eslintrc.jsがプロジェクトのルートに配置させているか
    env: {
        browser: true, // ブラウザで実行されるコードを検証
        node: true,
        es2021: true,
    },
    parser: 'vue-eslint-parser', // .vueファイルの<template>タグをlintすることができる
    parserOptions: {
        parser: '@typescript-eslint/parser', // .vueファイルの<script>タグを解析する
        project: ['./tsconfig.json'],
        sourceType: 'module', // ES Modules機能を有効
        ecmaVersion: 'latest', // ECMAScript 最新
        warnOnUnsupportedTypeScriptVersion: false, // 明示的にサポートされていないバージョンのtsを使用した場合、parserが表示する警告を切り替える
    },
    plugins: ['@typescript-eslint', 'vue'],
    extends: [
        'eslint:recommended', // eslintが提供してくれている設定
        'plugin:@typescript-eslint/recommended', // TSでチェックされる項目をLintから除外する設定
        'plugin:@typescript-eslint/recommended-requiring-type-checking', // 型チェックが必要なルールを適用
        'eslint-config-prettier', // prettierと競合するeslintのルールを無効化する
        'prettier',
        // ▼ Vue用
        'plugin:vue/vue3-recommended', // 「eslint-plugin-vue」が推奨するルールを適用
        '@vue/eslint-config-typescript/recommended', //@typescript-eslint/recommended ルールセットから拡張されたもの
        '@vue/eslint-config-prettier', //「eslint-config-prettier」のvue版
    ],
    rules: {
        '@typescript-eslint/explicit-module-boundary-types': ['off'],
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/no-var-requires': 'warn',
        'vue/multi-word-component-names': 'off', // 複数語にするかどうか
        'vue/attribute-hyphenation': ['error', 'never'],
        'vue/no-v-html': 'off',
    },
};
module.exports = config;
