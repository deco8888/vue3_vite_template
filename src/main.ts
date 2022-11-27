import '~/assets/styles/app.scss';
import { ViteSSG } from 'vite-ssg';
import { createPinia } from 'pinia';
import App from './App.vue';
import pageIndex from '~/pages/index.vue';

// createApp(App).mount('#app')
const routes = [{ path: '/', component: pageIndex }];

export const createApp = ViteSSG(
    // ルートコンポーネント
    App,
    { routes },
    ({ app }): void => {
        const pinia = createPinia();
        app.use(pinia);
    }
);
