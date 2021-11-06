<template>
    <div class="single-dataset">
        <div class="image"></div>
        <div class="content">
            <Header :dataset="dataset"></Header>
            <Stats :dataset="dataset"></Stats>
            <Footer :dataset="dataset"></Footer>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { ComparisonsDataset } from "@/types/compositions/statistics/_useComparisons";

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
    },
    setup() {
        //
    },
});
</script>
