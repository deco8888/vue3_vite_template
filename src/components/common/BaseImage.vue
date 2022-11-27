<script setup lang="ts">
import { computed } from 'vue';

type Props = {
    pcImg: string;
    retinaImg?: string;
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
</script>

<template>
    <img
        v-if="getPcImg"
        ref="img"
        :src="getPcImg"
        :srcset="getRetinaImg"
        :width="width"
        :height="height"
        :alt="alt"
        :role="alt ? '' : 'none'"
        :loading="loadingLazy ? 'lazy' : null"
        :decoding="decodingAsync ? 'async' : 'auto'"
    />
</template>
