<template>
    <span class="deletion-result">
        <span v-if="isNegative" class="msg">Something went wrong with deletion</span>
        <span v-else-if="isPositive" class="msg">Dataset has been removed successfully</span>
        <footer>
            <button @click="redirectMenu">Continue</button>
            <button @click="closeModal" v-if="isNegative">Return</button>
        </footer>

        <span class="bg-shape"></span>
        <span class="bg-shape"></span>
        <span class="bg-shape"></span>
        <span class="bg-shape"></span>
        <span class="bg-shape"></span>
    </span>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import useDatasetDeletionModal from "./useDatasetDeletionModal";
import useDatasetsLoader from "@/composable/datasets_loaders/useDatasetsLoader";
export default defineComponent({
    setup() {
        const { deletionOperationProgress, closeModal, confirmationModalStatus } = useDatasetDeletionModal;
        const { refreshKey } = useDatasetsLoader;
        const redirectMenu = () => {
            if (["positive", "negative"].includes(deletionOperationProgress.value)) {
                refreshKey.value += 1;
            }
            confirmationModalStatus.value = "hidden";
        };
        const isNegative = computed<boolean>(() => deletionOperationProgress.value === "negative");
        const isPositive = computed<boolean>(() => deletionOperationProgress.value === "positive");

        return { redirectMenu, isPositive, isNegative, closeModal };
    },
});
</script>
