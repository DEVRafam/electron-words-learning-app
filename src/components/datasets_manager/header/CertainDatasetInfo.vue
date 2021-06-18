<template>
    <section v-if="isDatasetSelected">
        <h2>{{ datasetToModify.title }}</h2>
        <div class="content">
            <ul>
                <li>
                    <span>Current words amount: </span>
                    <strong>3</strong>
                </li>
                <li>
                    <span>New words amount: </span>
                    <strong>23</strong>
                </li>
                <li>
                    <span>Deleted words amount: </span>
                    <strong>1</strong>
                </li>
            </ul>
            <div class="buttons-wrap">
                <button class="save">Save</button>
                <button class="discard" @click="previewModifySection = false">Discard</button>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useModifier from "@/composable/datasets_manager/useModifier";
export default defineComponent({
    setup() {
        const { datasetToModify, isDatasetSelected, previewModifySection } = useModifier;
        //
        return { datasetToModify, isDatasetSelected, previewModifySection };
    },
});
</script>
