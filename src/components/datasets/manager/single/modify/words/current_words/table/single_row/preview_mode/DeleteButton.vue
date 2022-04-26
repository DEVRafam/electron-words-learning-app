<template>
    <button @click="prepareWordForDeleting" tabindex="-1">{{ buttonMsg }}</button>
</template>

<script lang="ts">
// Tools
import { defineComponent, PropType, computed } from "vue";
import CurrentWords from "@/classes/CurrentWord";
// Composable
import useWordsManager from "@/composable/datasets_manager/submodules/useWordsManager";

export default defineComponent({
    props: {
        word: {
            type: Object as PropType<CurrentWords>,
            required: true,
        },
    },
    setup(props) {
        const { wordsToDelete } = useWordsManager;
        const prepareWordForDeleting = () => {
            if (wordsToDelete.value.includes(props.word)) wordsToDelete.value.remove(props.word);
            else wordsToDelete.value.push(props.word);
        };
        //
        const buttonMsg = computed<"Delete" | "Undo">(() => {
            return props.word.isInDeletingList() ? "Undo" : "Delete";
        });

        return { prepareWordForDeleting, buttonMsg };
    },
});
</script>
