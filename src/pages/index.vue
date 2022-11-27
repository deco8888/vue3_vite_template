<script setup lang="ts">
import gsap from 'gsap';
import { onMounted } from 'vue';
import { Scroll } from '~/assets/scripts/modules/scroll';
import { SmoothScroll } from '~/assets/scripts/modules/smoothScroll';
import { useRootStore } from '~/store/root';
import loaded from 'imagesloaded';

const store = useRootStore();

const init = (): Promise<void> => {
    return new Promise((resolve) => {
        const tl = gsap.timeline({
            paused: true,
            ease: 'power2.easeOut',
        });
        tl.to(
            '.wrapper',
            {
                duration: 0.3,
                opacity: 1,
            },
            0.3
        );
        // mvを表示
        tl.to(
            '.p-mv',
            {
                duration: 0.3,
                opacity: 1,
                onComplete: () => resolve(),
            },
            '<'
        );
        tl.play();
    });
};

const initSmoothScroll = (): void => {
    const smoothScroll = new SmoothScroll();
    const hash = location.hash;
    if (hash) {
        setTimeout(() => {
            smoothScroll.setSmoothScroll(hash);
        }, 100);
    }
};

onMounted(() => {
    loaded(
        document.body,
        {
            background: true,
        },
        (): void => {
            void (async (): Promise<void> => {
                await init();
                store.loaded();
                initSmoothScroll();
                new Scroll();
            })();
        }
    );
});
</script>

<template>
    <div class="wrapper">
        <Mv />
    </div>
</template>

<style lang="scss">
@use 'swiper/css';
@use 'swiper/css/navigation';
</style>
