<template>
    <button id="delete-dataset" @click="openModal" :tabindex="isDeletingModalOpen ? -1 : 1">Delete dataset</button>
    <!--  -->
    <teleport to="section#modals-wrapper" v-if="displayModal">
        <ConfirmationModal
            v-bind="{
                status: confirmationModalStatus,
            }"
            v-on="{
                'close-modal': closeModal,
            }"
        ></ConfirmationModal>
    </teleport>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from "vue";
import useModifier from "@/composable/datasets_manager/useModifier";

import ConfirmationModal from "./MODAL_DatasetsDeletionConfirmation.vue";

export default defineComponent({
    components: { ConfirmationModal },
    setup() {
        const { isDeletingModalOpen } = useModifier;

        const confirmationModalStatus = ref<"hidden" | "visible" | "fading">("hidden");
        const displayModal = computed<boolean>(() => confirmationModalStatus.value !== "hidden");
        const closeModal = () => {
            (confirmationModalStatus.value = "fading"),
                setTimeout(() => {
                    confirmationModalStatus.value = "hidden";
                }, 300);
        };
        const openModal = () => {
            if (!displayModal.value) confirmationModalStatus.value = "visible";
        };
        //
        watch(confirmationModalStatus, (val) => {
            if (val === "visible") isDeletingModalOpen.value = true;
            else if (val === "hidden") isDeletingModalOpen.value = false;
        });
        //
        return { confirmationModalStatus, displayModal, closeModal, openModal, isDeletingModalOpen };
    },
});
</script>
