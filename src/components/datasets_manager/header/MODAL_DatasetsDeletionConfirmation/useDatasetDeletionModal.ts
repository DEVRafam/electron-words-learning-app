import { ref, computed, Ref, ComputedRef, watch } from "vue";
import { deleteDataset, isDeletingModalOpen } from "@/composable/datasets_manager/useModifier";
//
// Properties
//
export const deletionOperationProgress = ref<"formStage" | "inProgress" | "positive" | "negative">("formStage");
export const confirmationModalStatus = ref<"hidden" | "visible" | "fading">("hidden");
export const displayModal = computed<boolean>(() => confirmationModalStatus.value !== "hidden");
//
// Methods sync
//
export const inputClear = () => {
    document.getElementById("dataset-delete-confirmation")?.focus();
};
export const closeModal = () => {
    (confirmationModalStatus.value = "fading"),
        setTimeout(() => {
            confirmationModalStatus.value = "hidden";
        }, 300);
};
export const openModal = () => {
    if (!displayModal.value) confirmationModalStatus.value = "visible";
};
//
// Methods async
//
export const handleDeletion = async () => {
    deletionOperationProgress.value = "inProgress";
    await new Promise((resolve) => setTimeout(resolve, 1000));
    deletionOperationProgress.value = await deleteDataset();
};
//
// Watchers
//
watch(confirmationModalStatus, (val) => {
    if (val === "visible") {
        isDeletingModalOpen.value = true;
        deletionOperationProgress.value = "formStage";
    } else if (val === "hidden") isDeletingModalOpen.value = false;
});
//
export default {
    // Properties:
    deletionOperationProgress,
    confirmationModalStatus,
    displayModal,
    // methods SYNC:
    inputClear,
    closeModal,
    openModal,
    // methods ASYNC:
    handleDeletion,
} as {
    // Properties:
    deletionOperationProgress: Ref<"formStage" | "inProgress" | "positive" | "negative">;
    confirmationModalStatus: Ref<"hidden" | "visible" | "fading">;
    displayModal: ComputedRef<boolean>;
    // methods SYNC:
    inputClear(): void;
    closeModal(): void;
    openModal(): void;
    // methods ASYNC:
    handleDeletion(): Promise<void>;
};
