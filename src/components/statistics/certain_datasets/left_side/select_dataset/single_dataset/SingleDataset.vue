<template>
    <div class="single-dataset">
        <Header :dataset="dataset" v-if="!hideButtons"></Header>
        <div class="level">
            <div class="image" :style="gameplaysIconPathResolver(dataset.icon)"></div>
            <Stats :dataset="dataset" :colors="colors"></Stats>
        </div>
        <button class="compare" @click="handleCompare" v-if="!hideCompare" :disabled="dataset.gamesHistory.length === 0">Compare</button>
        <Footer :dataset="dataset" :label="label"></Footer>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { ComparisonsDataset } from "@/types/compositions/statistics/_useComparisons";
import { gameplaysIconPathResolver } from "@/composable/datasets_loaders/useDatasetsLoader";
import { datasetToCompare } from "@/composable/statistics/certain/submodules/useComparisons";

import Footer from "./Footer.vue";
import Header from "./Header.vue";
import Stats from "./Stats.vue";

export default defineComponent({
    components: { Footer, Header, Stats },
    props: {
        dataset: {
            type: Object as PropType<ComparisonsDataset>,
            required: true,
        },
        hideButtons: {
            type: Boolean as PropType<boolean>,
            default: false,
        },
        hideCompare: {
            type: Boolean as PropType<boolean>,
            default: false,
        },
        label: {
            type: String as PropType<string>,
            required: false,
        },
        colors: {
            type: Array as PropType<string[]>,
            required: false,
        },
    },
    setup(props) {
        const handleCompare = () => {
            if (props.dataset.gamesHistory.length) {
                datasetToCompare.value = props.dataset;
            }
            //
        };
        return { gameplaysIconPathResolver, handleCompare };
    },
});
</script>
