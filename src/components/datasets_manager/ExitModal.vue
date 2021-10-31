<template>
    <div id="exit-modal" class="bigger" :class="modalStage" v-if="displayExitModal">
        <h2>Do you want to exit?</h2>
        <!--  -->
        <footer>
            <template v-if="blockSaveButton">
                <a tabindex="1" @focus="(e) => (focusedElement = e.target)" @blur="() => (focusedElement = null)" @click="redirect">Exit</a>
            </template>
            <!--  -->
            <template v-else>
                <a tabindex="1" class="discard" @focus="(e) => (focusedElement = e.target)" @blur="() => (focusedElement = null)" @click="redirect">Exit w/o saving</a>
                <a tabindex="1" class="save" @focus="(e) => (focusedElement = e.target)" @blur="() => (focusedElement = null)" @click="redirectWithSaving">Exit with saving</a>
            </template>
            <!--  -->
            <a @click="closeModal" tabindex="1" @focus="(e) => (focusedElement = e.target)" @blur="() => (focusedElement = null)">Keep modifing</a>
        </footer>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import useModifier from "@/composable/datasets_manager/useModifier";
import useKeydown from "@/composable/useKeydown";
import router from "@/router/index";

const CLOSING_MODAL_TIMEOUT = 301; // 🚀
const REDIRECTION_AFTER_SAVING_TIMEOUT = 1500; // 🚀

export default defineComponent({
    setup() {
        const { blockSaveButton, displayExitModal, saveChanges, isAnyModalOpened } = useModifier;
        const modalStage = ref<"show" | "hide" | "">("");
        const focusedElement = ref<HTMLElement | null>(null);
        let _closing: ReturnType<typeof setTimeout> | false = false;

        const closeModal = async () => {
            return new Promise((resolve) => {
                modalStage.value = "hide";
                _closing = setTimeout(() => {
                    displayExitModal.value = false;
                    focusedElement.value = null;
                    _closing = false;
                    resolve(1);
                }, CLOSING_MODAL_TIMEOUT);
            });
        };

        const redirect = () => {
            if (displayExitModal.value === "menu") router.push({ path: "/" });
            else
                router.push({
                    name: "CertainDatasetStatistics",
                    params: {
                        datasetsName: router.currentRoute.value.params.datasetsName,
                    },
                });
        };
        const redirectWithSaving = async () => {
            await closeModal();
            if (await saveChanges()) setTimeout(redirect, REDIRECTION_AFTER_SAVING_TIMEOUT);
        };

        watch(displayExitModal, (val) => {
            if (val) modalStage.value = "show";
        });

        useKeydown([
            {
                key: "Escape",
                fn: () => {
                    if (_closing || isAnyModalOpened.value) return;

                    if (displayExitModal.value) closeModal();
                    else {
                        displayExitModal.value = "menu";
                    }
                },
            },
            {
                key: "Enter",
                fn: () => {
                    if (!displayExitModal.value) return;
                    if (focusedElement.value instanceof HTMLElement) {
                        focusedElement.value.click();
                    }
                },
            },
        ]);

        return { blockSaveButton, displayExitModal, modalStage, closeModal, focusedElement, redirect, redirectWithSaving };
        //
    },
});
</script>
