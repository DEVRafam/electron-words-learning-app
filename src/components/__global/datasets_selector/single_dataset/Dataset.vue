<template>
    <div
        class="single-gameplay-dataset"
        v-bind="{
            tabindex,
            autofocus: index === 0,
            class: { blocked },
        }"
    >
        <span class="lock-icon" v-if="blocked"><font-awesome-icon icon="lock"></font-awesome-icon></span>
        <h3>{{ gameplay.title }}</h3>
        <p>{{ gameplay.description }}</p>
        <div class="icon" :style="gameplaysIconPathResolver(gameplay)"></div>
        <!--  -->
        <ProgressBar :gameplay="gameplay" :blocked="blocked"></ProgressBar>
        <!--  -->
        <strong class="amount-of-words">
            <span>Amount of words: </span>
            <span class="color">{{ gameplay.wordsAmount }}</span>
        </strong>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from "vue";
import { DatasetFileForPreview } from "@/types/Dataset";
import { gameplaysIconPathResolver } from "@/composable/datasets_loaders/useDatasetsLoader";

import ProgressBar from "./progress_bar/ProgressBarSuspeseWrapper.vue";

export default defineComponent({
    props: {
        gameplay: {
            type: Object as PropType<DatasetFileForPreview>,
            required: true,
        },
        blocked: {
            type: Boolean as PropType<boolean>,
            required: true,
        },
        index: {
            type: Number as PropType<number>,
            required: true,
        },
        sliderIndex: {
            type: Number as PropType<number>,
            required: true,
        },
    },
    emits: ["callback"],
    components: { ProgressBar },
    setup(props, { emit }) {
        const triggerCallback = () => {
            if (!props.blocked) emit("callback", props.gameplay);
        };
        const tabindex = computed<number>(() => {
            const { index, blocked, sliderIndex } = props;
            if (blocked) return -1;
            if (sliderIndex == 0) return index - 2 <= 0 ? 1 : -1;
            return [-1, 0, -2].includes(sliderIndex - index) ? 1 : -1;
        });
        return { gameplaysIconPathResolver, triggerCallback, tabindex };
    },
});
</script>
