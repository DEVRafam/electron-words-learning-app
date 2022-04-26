<template>
    <button id="delete-dataset" @click="openModal" :tabindex="-1">Delete dataset</button>
    <!--  -->
    <teleport to="section#modals-wrapper" v-if="displayModal">
        <ConfirmationModal></ConfirmationModal>
    </teleport>
    <!--  -->
</template>

<script lang="ts">
// Tools
import { defineComponent } from "vue";
// Composable
import useDatasetDeletionModal from "@/components/datasets/manager/single/header/MODAL_DatasetsDeletionConfirmation/useDatasetDeletionModal";
// Components
import ConfirmationModal from "@/components/datasets/manager/single/header/MODAL_DatasetsDeletionConfirmation/DatasetsDeletionConfirmation.vue";

export default defineComponent({
    components: { ConfirmationModal },
    setup() {
        const { displayModal, openModal } = useDatasetDeletionModal;
        //
        return { displayModal, openModal };
    },
});
</script>
