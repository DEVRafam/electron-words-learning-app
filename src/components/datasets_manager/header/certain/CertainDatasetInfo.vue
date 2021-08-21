<template>
    <section v-if="isDatasetSelected" class="certain-dataset">
        <slot name="background-shapes"></slot>
        <header class="top">
            <!--  -->
            <!-- Already existing dataset -->
            <!--  -->
            <span v-if="!isDatasetJustCreated">
                <h2>{{ datasetToModify.title }}</h2>
                <span class="dates">
                    <span class="created-at">
                        Created at: <span class="color">{{ datasetToModify.createdAt }}</span>
                    </span>
                    <span class="latest-modification">
                        Latest modification at: <span class="color">{{ datasetToModify.lastModified }}</span>
                    </span>
                    <DeleteDatasetButton></DeleteDatasetButton>
                </span>
            </span>
            <!--  -->
            <!-- Brand new dataset -->
            <!--  -->
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
import DeleteDatasetButton from "./DeleteDatasetButton.vue";

export default defineComponent({
    components: { Stats, SaveOrDiscard, DeleteDatasetButton },
    setup() {
        const { datasetToModify, isDatasetSelected, isDatasetJustCreated } = useModifier;
        //
        return { datasetToModify, isDatasetSelected, isDatasetJustCreated };
    },
});
</script>
