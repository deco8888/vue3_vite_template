<script setup lang="ts">
import gsap from 'gsap';
import { ref, watch } from 'vue';
import { lerp } from '~/assets/scripts/utils/math';

type Props = {
    amt?: number;
};

type ElmInfoOptions = {
    el: HTMLElement | null;
    current: number;
    previous: number;
    ease: number;
    parallax: number;
};

const props = withDefaults(defineProps<Props>(), {
    amt: 1,
});

const target = ref<HTMLElement>(null);
const elmInfo = ref<ElmInfoOptions>({
    el: null,
    current: 0,
    previous: 0,
    ease: 0.1,
    parallax: 1,
});

const scrollY = (): void => {
    if (target.value) {
        const elmTop = target.value.getBoundingClientRect().top;
        elmInfo.value.current = (window.innerHeight - elmTop) * 0.01;
    }
};

const transformElm = (): void => {
    scrollY();
    elmInfo.value.ease = parseFloat(`0.1${props.amt}`);
    // 開始位置（previous）と終了位置間（current）の進行状況を基に、該当要素の変更位置を計算
    elmInfo.value.previous = lerp(elmInfo.value.previous, elmInfo.value.current, elmInfo.value.ease);
    elmInfo.value.previous = Math.floor(elmInfo.value.previous * 100) / 100;
    const tl = gsap.timeline();
    if (window.scrollY > 0) {
        tl.to(
            elmInfo.value.el,
            {
                y: -elmInfo.value.previous,
                duration: 1,
            },
            `0.0${props.amt}`
        );
    } else {
        tl.to(
            elmInfo.value.el,
            {
                y: 0,
                duration: 1,
            },
            0
        );
    }
    requestAnimationFrame(() => transformElm());
};

watch(target, () => {
    if (target.value) {
        elmInfo.value.el = target.value;
        scrollY();
        transformElm();
    }
});
</script>

<template>
    <div ref="target">
        <slot name="parallax"></slot>
    </div>
</template>
