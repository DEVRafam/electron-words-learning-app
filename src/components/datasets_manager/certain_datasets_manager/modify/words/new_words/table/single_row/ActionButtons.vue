<template>
    <td class="center actions">
        <template v-if="word.condition !== 'predeleted'">
            <template v-if="editMode">
                <button @click="toggleEditMode" class="save">Save</button>
            </template>
            <!--  -->
            <template v-else>
                <button @click="toggleEditMode" tabindex="-1">Edit</button>
            </template>
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
    emits: ["has-been-deleted", "toggle-edit-mode"],
    props: {
        word: {
            type: Object as PropType<NewWord>,
            required: true,
        },
        index: {
            type: Number as PropType<number>,
            required: true,
        },
        editMode: {
            type: Boolean as PropType<boolean>,
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
        const toggleEditMode = () => emit("toggle-edit-mode");

        return { deleteItemPermanently, predeletionToggler, toggleEditMode };
    },
});
</script>
