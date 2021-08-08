<template>
    <ContentBackgroundShapes></ContentBackgroundShapes>
    <!--  -->
    <h3>
        <strong>{{ index + 1 }}. </strong>
        <span>{{ dataset.title }}</span>
    </h3>
    <!--  -->
    <span class="li">
        <span>Last modification: </span>
        <strong>{{ dataset.lastModified }}</strong>
    </span>
    <span class="li">
        <span>Current words amount: </span>
        <strong>{{ dataset.wordsAmount }}</strong>
    </span>
    <!--  -->
    <p>{{ dataset.description }}</p>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { GameplayDataFileForPreview } from "@/types/Gameplay";

import ContentBackgroundShapes from "./ContentBackgroundShapes.vue";

export default defineComponent({
    components: { ContentBackgroundShapes },
    props: {
        dataset: {
            type: Object as PropType<GameplayDataFileForPreview>,
            required: true,
        },
        index: {
            type: Number as PropType<number>,
            required: true,
        },
    },
});
</script>
