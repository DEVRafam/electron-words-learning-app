import { ref, computed, Ref, ComputedRef, watch } from "vue";
import { datasetToModify, deleteDataset, isDeletingModalOpen } from "@/composable/datasets_manager/useModifier";
//
// Properties
//
export const deletionOperationProgress = ref<"formStage" | "inProgress" | "positive" | "negative">("formStage");
export const usersConfirmation = ref<string>("");
export const inputIsFocused = ref<boolean>(false);
export const blockDeleteAction = computed<boolean>(() => {
    return usersConfirmation.value !== datasetToModify.value?.fileName;
});
export const confirmationModalStatus = ref<"hidden" | "visible" | "fading">("hidden");
export const displayModal = computed<boolean>(() => confirmationModalStatus.value !== "hidden");
//
// Methods sync
//
export const inputClear = () => {
    usersConfirmation.value = "";
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
    if (blockDeleteAction.value) return;
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
        usersConfirmation.value = "";
        deletionOperationProgress.value = "formStage";
        inputIsFocused.value = false;
    } else if (val === "hidden") isDeletingModalOpen.value = false;
});
//
export default {
    // Properties:
    deletionOperationProgress,
    usersConfirmation,
    blockDeleteAction,
    inputIsFocused,
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
    usersConfirmation: Ref<string>;
    blockDeleteAction: ComputedRef<boolean>;
    inputIsFocused: Ref<boolean>;
    confirmationModalStatus: Ref<"hidden" | "visible" | "fading">;
    displayModal: ComputedRef<boolean>;
    // methods SYNC:
    inputClear(): void;
    closeModal(): void;
    openModal(): void;
    // methods ASYNC:
    handleDeletion(): Promise<void>;
};
