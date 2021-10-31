<template>
    <td class="center actions">
        <template v-if="word.condition !== 'predeleted'">
            <button @click="predeletionToggler" tabindex="-1">Delete</button>
        </template>
        <!--  -->
        <template v-else>
            <button @click="predeletionToggler" tabindex="-1">Restore</button>
            <button @click="deleteItemPermanently" tabindex="-1">Remove</button>
        </template>
    </td>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { NewWord } from "@/types/Word";
import useWordsManager from "@/composable/datasets_manager/submodules/useWordsManager";

export default defineComponent({
    emits: ["has-been-deleted"],
    props: {
        word: {
            type: Object as PropType<NewWord>,
            required: true,
        },
        index: {
            type: Number as PropType<number>,
            required: true,
        },
    },
    setup(props, { emit }) {
        const { newWords } = useWordsManager;
        const deleteItemPermanently = () => {
            emit("has-been-deleted");
            setTimeout(() => {
                newWords.value.splice(props.index, 1);
            }, 300);
        };
        const predeletionToggler = () => {
            props.word.condition = props.word.condition === "predeleted" ? "positive" : "predeleted";
        };

        return { deleteItemPermanently, predeletionToggler };
    },
});
</script>
