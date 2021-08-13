<template>
    <td class="center actions">
        <button @click="toggleWord" tabindex="-1">{{ buttonMsg }}</button>
    </td>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from "vue";
import { ArchivedWord } from "@/types/Word";
import useWordsManager from "@/composable/datasets_manager/submodules/useWordsManager";

export default defineComponent({
    props: {
        word: {
            type: Object as PropType<ArchivedWord>,
            required: true,
        },
        isWordInRestoringList: {
            type: Boolean as PropType<boolean>,
            required: true,
        },
    },
    setup(props) {
        const { wordsToRestore } = useWordsManager;
        const buttonMsg = computed<"Restore" | " Undo ">(() => {
            return props.isWordInRestoringList ? " Undo " : "Restore";
        });

        const toggleWord = () => {
            const { word } = props;
            if (wordsToRestore.value.includes(word)) wordsToRestore.value.remove(word);
            else wordsToRestore.value.push(word);
        };

        return { buttonMsg, toggleWord };
    },
});
</script>
