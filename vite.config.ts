import { defineConfig } from 'vite';
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';
// https://rollupjs.org/guide/en/#using-output-plugins
import { terser } from 'rollup-plugin-terser';
import { createHtmlPlugin } from 'vite-plugin-html';
import Pages from 'vite-plugin-pages';

const ROOT_DIR_PATH = resolve(__dirname, 'src');
const OUTPUT_DIR_PATH = resolve(__dirname, 'dist');

const environment = process.env.NODE_ENV;
const isProd = environment === 'production';

export default defineConfig({
    // プロジェクトのルートディレクトリ（index.html が置かれている場所）
    // root: '/',
    // パブリックパス
    base: '/close/',
    plugins: [
        vue(),
        // JSコードを圧縮
        terser({
            compress: {
                // ビルド時console.log削除
                drop_console: true,
            },
        }),
        createHtmlPlugin({
            minify: {
                collapseWhitespace: false, // タグ間の空白を削除
                keepClosingSlash: true, // 空要素の末尾のスラッシュを保持
                removeComments: false, // HTMLコメントを削除
                removeRedundantAttributes: true, // 値がHTML仕様のデフォルトと一致するとき、属性を削除
                removeScriptTypeAttributes: true, // スクリプトタグからtype="text/javascript"を削除
                removeStyleLinkTypeAttributes: true, // スタイルタグとリンクタグからtype="text/css"を削除
                useShortDoctype: true, // DOCTYPE宣言を小文字にする
                minifyCSS: true, // 「clean-css」を使ってCSSを軽量化
            },
        }),
        Pages({
            dirs: 'src/pages',
        }),
    ],
    ssgOptions: {
        dirStyle: 'nested', // 出力ディレクトリのディレクトリスタイル
        script: 'async', // スクリプトのロードモードを設定
        formatting: 'minify', // 生成されたindexファイルをフォーマット
    },
    // エントリオプションとして「@rollup/plugin-alias」に渡される
    resolve: {
        // 簡単にimport出来るようにするため、エイリアス設定追加
        alias: {
            '~': ROOT_DIR_PATH,
        },
    },
    css: {
        // 開発時にソースマップを有効にするかどうか
        devSourcemap: true,
    },
    build: {
        outDir: OUTPUT_DIR_PATH, // 出力ディレクトリを指定
        // CSSコード分割を有効/無効にする
        // ※有効にすると、非同期のチャンクでインポートされたCSSは非同期チャンク自体の中にインライン化され、チャンクがロードされるときに挿入される
        cssCodeSplit: isProd,
        // 基礎となる[Rollup]バンドルを直接カスタマイズ
        rollupOptions: {
            output: {
                assetFileNames: ({ name }) => {
                    const folder = name.split('.').pop() == 'css' ? 'styles/' : '/';
                    return `assets/${folder}[name].[hash][extname]`; // 出力ポイントから作成されたチャンク
                },
                chunkFileNames: 'assets/scripts/[name].[hash].js', // コード分​​割時に作成される共有チャンク
                entryFileNames: 'assets/scripts/[name].[hash].js', // 出力ポイントから作成されたチャンク
            },
        },
        emptyOutDir: true, // ビルド時にoutDirを空にする,
        minify: 'esbuild', // esbuildが持っているminify機能を使用
    },
    server: {
        watch: {
            usePolling: true, // maybe only in WSL2
        },
    },
});
