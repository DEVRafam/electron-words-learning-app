<template>
    <div
        class="single-gameplay-dataset"
        :tabindex="blocked ? -1 : 1"
        :autofocus="index === 0"
        :class="{ blocked }"
        v-on="{
            click: triggerCallback, //
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
import { defineComponent, PropType } from "vue";
import { GameplayDataFileForPreview } from "@/types/Gameplay";
import useLoader from "@/composable/datasets_loaders/useDatasetsLoader";

import ProgressBar from "./progress_bar/ProgressBarSuspeseWrapper.vue";

export default defineComponent({
    props: {
        gameplay: {
            type: Object as PropType<GameplayDataFileForPreview>,
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
    },
    emits: ["callback"],
    components: { ProgressBar },
    setup(props, { emit }) {
        const { gameplaysIconPathResolver } = useLoader;
        const triggerCallback = () => {
            if (!props.blocked) emit("callback", props.gameplay);
        };

        return { gameplaysIconPathResolver, triggerCallback };
    },
});
</script>
