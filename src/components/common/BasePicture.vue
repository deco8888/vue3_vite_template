<script setup lang="ts">
import { computed } from 'vue';

type Props = {
    pcImg: string;
    retinaImg?: string;
    spImg?: string;
    folder?: string;
    alt?: string;
    role?: string;
    width: string;
    height: string;
    loadingLazy?: boolean;
    decodingAsync?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
    retinaImg: '',
    spImg: '',
    folder: '',
    alt: '',
    role: '',
    loadingLazy: true,
    decodingAsync: true,
});

const getPcImg = computed(() => {
    return props.pcImg ? `assets/images/pc/${props.folder ? props.folder : 'lo-res'}/${props.pcImg}` : '';
});

const getRetinaImg = computed(() => {
    return props.retinaImg ? `assets/images/pc/hi-res/${props.retinaImg} 2x` : '';
});

const getSpImg = computed(() => {
    return props.spImg ? `assets/images/sp/${props.spImg}` : '';
});
</script>

<template>
    <picture>
        <source v-if="getSpImg" media="(max-width: 768px)" :srcset="getSpImg" />
        <img
            v-if="getPcImg"
            :src="getPcImg"
            :srcset="getRetinaImg"
            :alt="alt"
            :role="alt ? '' : 'none'"
            :width="width"
            :height="height"
            :loading="loadingLazy ? 'lazy' : null"
            :decoding="decodingAsync ? 'async' : 'auto'"
        />
    </picture>
</template>
