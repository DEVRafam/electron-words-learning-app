<template>
    <Expected :word="word"></Expected>
    <Displayed :word="word"></Displayed>
    <!--  -->
    <slot name="default"></slot>
    <!--  -->
    <td class="center actions">
        <button class="edit" @click="$emit('toggle-edit-mode')" tabindex="-1" :disabled="blockEditButton">Edit</button>
        <DeleteButton :word="word"></DeleteButton>
    </td>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from "vue";
import CurrentWord from "@/classes/CurrentWord";

import DeleteButton from "./DeleteButton.vue";
import Expected from "@/components/datasets_manager/certain_datasets_manager/modify/words/current_words/table/single_row/preview_mode/ExpectedWordWrapper.vue";
import Displayed from "@/components/datasets_manager/certain_datasets_manager/modify/words/current_words/table/single_row/preview_mode/DisplayedWordWrapper.vue";

export default defineComponent({
    props: {
        word: {
            type: Object as PropType<CurrentWord>,
            required: true,
        },
    },
    emits: ["toggle-edit-mode"],
    components: { Expected, Displayed, DeleteButton },
    setup(props) {
        const blockEditButton = computed<boolean>(() => {
            return props.word.isInDeletingList();
        });

        return { blockEditButton };
    },
});
</script>
