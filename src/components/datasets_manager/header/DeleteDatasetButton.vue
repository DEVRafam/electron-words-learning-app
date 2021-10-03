<template>
    <button id="delete-dataset" @click="openModal" :tabindex="isDeletingModalOpen ? -1 : 1">Delete dataset</button>
    <!--  -->
    <teleport to="section#modals-wrapper" v-if="displayModal">
        <ConfirmationModal></ConfirmationModal>
    </teleport>
    <!--  -->
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useModifier from "@/composable/datasets_manager/useModifier";
import useDatasetDeletionModal from "@/components/datasets_manager/header/MODAL_DatasetsDeletionConfirmation/useDatasetDeletionModal";

import ConfirmationModal from "@/components/datasets_manager/header/MODAL_DatasetsDeletionConfirmation/DatasetsDeletionConfirmation.vue";

export default defineComponent({
    components: { ConfirmationModal },
    setup() {
        const { isDeletingModalOpen } = useModifier;
        const { displayModal, openModal } = useDatasetDeletionModal;
        //
        return { displayModal, openModal, isDeletingModalOpen };
    },
});
</script>
