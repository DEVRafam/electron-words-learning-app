<template>
    <div class="icon">
        <span class="bg-shape left-top"></span>
        <span class="bg-shape left-bottom"></span>
        <span class="bg-shape right-top"></span>
        <span class="bg-shape right-bottom"></span>
        <div class="img" :style="gameplaysIconPathResolver(dataset)"></div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { GameplayDataFileForPreview } from "@/types/Gameplay";
import useLoader from "@/composable/datasets_loaders/useDatasetsLoader";

export default defineComponent({
    props: {
        dataset: {
            type: Object as PropType<GameplayDataFileForPreview>,
            required: true,
        },
    },
    setup() {
        const { gameplaysIconPathResolver } = useLoader;

        return { gameplaysIconPathResolver };
    },
});
</script>
