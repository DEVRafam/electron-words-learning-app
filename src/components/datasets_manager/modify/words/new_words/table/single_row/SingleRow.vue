<template>
    <tr :class="[word.condition, { deleted: hasBeenDeleted }, { editMode }]">
        <td class="center">{{ index + 1 }}</td>
        <!--  -->
        <WordCell target="expected" :word="word" :editMode="editMode"></WordCell>
        <WordCell target="displayed" :word="word" :editMode="editMode"></WordCell>
        <!--  -->
        <td class="center origin" :class="{ inscribed: word.origin === 'Inscribed' }">{{ word.origin }}</td>
        <!--  -->
        <ActionButtons
            v-bind="{
                word: word,
                index: index,
                editMode: editMode,
            }"
            v-on="{
                'has-been-deleted': () => (hasBeenDeleted = true),
                'toggle-edit-mode': () => (editMode = !editMode),
            }"
        ></ActionButtons>
    </tr>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from "vue";
import { NewWord } from "@/types/Word";

import ActionButtons from "./ActionButtons.vue";
import WordCell from "./WordCell.vue";

export default defineComponent({
    components: { ActionButtons, WordCell },
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
    setup(props) {
        const hasBeenDeleted = ref<boolean>(false);
        const editMode = ref<boolean>(false);
        //
        watch(
            props.word,
            (val) => {
                if (val.condition === "predeleted") editMode.value = false;
            },
            { deep: true }
        );
        //
        return { hasBeenDeleted, editMode };
    },
});
</script>
