<template>
    <span id="datasets-deletion-confirmation" :class="[confirmationModalStatus, { inputIsFocused }, deletionOperationProgress]">
        <div class="bg-img" :style="iconBackgroundImage"></div>
        <!--  -->
        <ConfirmationForm></ConfirmationForm>
        <LoadingScreen></LoadingScreen>
        <DeletionResultMsg></DeletionResultMsg>
        <!--  -->
    </span>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useGeneralInformations from "@/composable/datasets_manager/submodules/useGeneralInformations";
import useDatasetDeletionModal from "./useDatasetDeletionModal";

import ConfirmationForm from "./ConfirmationForm.vue";
import DeletionResultMsg from "./DeletionResultMsg.vue";

export default defineComponent({
    components: { ConfirmationForm, DeletionResultMsg },
    setup() {
        const { iconBackgroundImage } = useGeneralInformations;
        const { inputIsFocused, deletionOperationProgress, confirmationModalStatus } = useDatasetDeletionModal;

        return { iconBackgroundImage, inputIsFocused, deletionOperationProgress, confirmationModalStatus };
    },
});
</script>
