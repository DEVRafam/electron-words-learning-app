<template>
    <Modal @close-modal="$emit('close-modal')" id="add-new-word-modal" :removeTabindexFromClosing="true" :class="[type]">
        <!--  -->
        <header>
            <h2>Add new word</h2>
            <div class="buttons-wrap">
                <div class="group">
                    <label for="type">Select type: </label>
                    <select v-model="type" id="type" tabindex="-1">
                        <option value="pair">PAIR</option>
                        <option value="image">IMAGE</option>
                        <option value="irregular">IRREGULAR</option>
                    </select>
                </div>
                <button :disabled="blockAddButton" @click="addWord">Add</button>
            </div>
        </header>

        <section class="form" @submit.prevent>
            <!--  -->
            <Expected></Expected>
            <Displayed></Displayed>
            <!--  -->
        </section>
        <!--  -->
    </Modal>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted } from "vue";
import useModifier from "@/composable/datasets_manager/useModifier";
import useAddNewWordModal from "./useAddNewWordModal";

import Expected from "./Expected.vue";
import Displayed from "./Displayed.vue";

export default defineComponent({
    emits: ["close-modal"],
    components: { Expected, Displayed },
    setup() {
        const { type, blockAddButton, addWord, reset } = useAddNewWordModal;

        onMounted(() => (useModifier.isAnyModalOpened.value = true));
        onUnmounted(() => {
            useModifier.isAnyModalOpened.value = false;
            reset();
        });

        return { type, blockAddButton, addWord };
    },
});
</script>
