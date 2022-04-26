<template>
    <span class="deletion-result">
        <span v-if="isNegative" class="msg">Something went wrong with deletion</span>
        <span v-else-if="isPositive" class="msg">Dataset has been removed successfully</span>
        <footer>
            <button @click="redirectMenu" :tabindex="tabindex">Continue</button>
            <button @click="closeModal" v-if="isNegative" :tabindex="tabindex">Return</button>
        </footer>
    </span>
</template>

<script lang="ts">
// Tools
import router from "@/router/index";
import { defineComponent, computed } from "vue";
// Composable
import useDatasetDeletionModal from "./useDatasetDeletionModal";

export default defineComponent({
    setup() {
        const { deletionOperationProgress, closeModal, confirmationModalStatus } = useDatasetDeletionModal;
        const redirectMenu = () => {
            if (["positive", "negative"].includes(deletionOperationProgress.value)) {
                router.push({ path: "/datasets-manager" });
            }
            confirmationModalStatus.value = "hidden";
        };
        const isNegative = computed<boolean>(() => deletionOperationProgress.value === "negative");
        const isPositive = computed<boolean>(() => deletionOperationProgress.value === "positive");

        const tabindex = computed<1 | -1>(() => {
            return ["positive", "negative"].includes(deletionOperationProgress.value) ? 1 : -1;
        });

        return { redirectMenu, isPositive, isNegative, closeModal, tabindex };
    },
});
</script>
