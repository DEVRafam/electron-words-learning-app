<template>
    <header id="certain-datasets-manager-header">
        <header class="pinned-buttons">
            <SaveButton></SaveButton>
            <Navigation></Navigation>
        </header>
        <!--  -->
        <!--  -->
        <!--  -->
        <BackgroundShapes></BackgroundShapes>
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
        </header>
        <Stats></Stats>
        <!--  -->
    </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useModifier from "@/composable/datasets_manager/useModifier";

import BackgroundShapes from "@/components/datasets_manager/__communal/header/BackgroundShapes.vue";

import SaveButton from "./SaveButton.vue";
import Navigation from "./Navigation.vue";
import Stats from "@/components/datasets_manager/certain_datasets_manager/header/Stats.vue";
import DeleteDatasetButton from "@/components/datasets_manager/certain_datasets_manager/header/DeleteDatasetButton.vue";

export default defineComponent({
    components: { BackgroundShapes, SaveButton, Stats, DeleteDatasetButton, Navigation },
    setup() {
        const { datasetToModify, isDatasetJustCreated } = useModifier;
        //
        return { datasetToModify, isDatasetJustCreated };
    },
});
</script>
