<template>
    <div class="confirmation-form">
        <font-awesome-icon icon="globe-europe" class="globe"></font-awesome-icon>
        <!--  -->
        <h2>Are you sure?</h2>
        <!--  -->
        <span class="consequences">
            <span>All words and progress logs are going to be removed</span>
            <strong> irrevocably</strong>
        </span>
        <!--  -->
        <footer>
            <button @click="handleDeletion" :tabindex="tabindex">I'm sure</button>
            <button @click="closeModal" :tabindex="tabindex">Return</button>
        </footer>
    </div>
</template>

<script lang="ts">
// Tools
import { defineComponent, computed } from "vue";
// Composable
import useDatasetDeletionModal from "./useDatasetDeletionModal";
import useModifier from "@/composable/datasets_manager/useModifier";

export default defineComponent({
    setup() {
        const { handleDeletion, closeModal, deletionOperationProgress } = useDatasetDeletionModal;
        const { datasetToModify } = useModifier;
        //
        const maxlength = computed<number>(() => {
            return datasetToModify.value?.fileName.length || 20;
        });
        const tabindex = computed<1 | -1>(() => {
            return deletionOperationProgress.value === "formStage" ? 1 : -1;
        });

        return { datasetToModify, handleDeletion, closeModal, maxlength, tabindex };
    },
});
</script>
