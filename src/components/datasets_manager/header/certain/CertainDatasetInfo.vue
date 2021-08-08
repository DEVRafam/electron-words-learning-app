<template>
    <section v-if="isDatasetSelected" class="certain-dataset">
        <slot name="default"></slot>
        <header class="top">
            <span v-if="!isDatasetJustCreated">
                <h2>{{ datasetToModify.title }}</h2>
                <span class="created-at">
                    Created at: <span class="color">{{ datasetToModify.createdAt }}</span>
                </span>
            </span>
            <span v-else>
                <h2 class="uppercase">New <span class="color">dataset's</span> creating</h2>
            </span>
            <SaveOrDiscard></SaveOrDiscard>
        </header>
        <Stats></Stats>
    </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useModifier from "@/composable/datasets_manager/useModifier";

import Stats from "./Stats.vue";
import SaveOrDiscard from "./SaveOrDiscard.vue";

export default defineComponent({
    components: { Stats, SaveOrDiscard },
    setup() {
        const { datasetToModify, isDatasetSelected, isDatasetJustCreated } = useModifier;
        //
        return { datasetToModify, isDatasetSelected, isDatasetJustCreated };
    },
});
</script>
