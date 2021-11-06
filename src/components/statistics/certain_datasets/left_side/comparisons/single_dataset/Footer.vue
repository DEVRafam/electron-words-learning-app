<template>
    <footer>
        <button tabindex="-1" @click="modifyRoute">Modify</button>
        <button tabindex="-1" @click="inspectProgress" :disabled="dataset.gamesHistory.length === 0">Inspect progress</button>
    </footer>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { ComparisonsDataset } from "@/types/compositions/statistics/_useComparisons";
import router from "@/router/index";

export default defineComponent({
    props: {
        dataset: {
            type: Object as PropType<ComparisonsDataset>,
            required: true,
        },
    },
    setup(props) {
        const modifyRoute = () =>
            router.push({
                name: "CertainDatasetManager",
                params: {
                    datasetsName: props.dataset.fileName,
                },
            });
        const inspectProgress = () => {
            if (props.dataset.gamesHistory.length === 0) return;
            router.push({
                name: "CertainDatasetStatistics",
                params: {
                    datasetsName: props.dataset.fileName,
                },
            });
        };
        return { modifyRoute, inspectProgress };
    },
});
</script>
