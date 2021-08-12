<template>
    <tr :class="{ editMode: turnEditModeOn, predeleted: word.isInDeletingList(), modified: word.hasBeenModified() }">
        <td class="center">{{ index + 1 }}</td>
        <!--  -->
        <EditMode v-if="turnEditModeOn" :word="word" @exit-edit-mode="() => (turnEditModeOn = false)">
            <SingleRowProgressStatus :word="word"></SingleRowProgressStatus>
        </EditMode>
        <!--  -->
        <PreviewMode v-else :word="word" @toggle-edit-mode="toggleEditMode">
            <SingleRowProgressStatus :word="word"></SingleRowProgressStatus>
        </PreviewMode>
        <!--  -->
    </tr>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import CurrentWord from "@/classes/CurrentWord";

import SingleRowProgressStatus from "@/components/datasets_manager/modify/words/__utils/table_cells/SingleRowProgressStatus.vue";
import PreviewMode from "@/components/datasets_manager/modify/words/current_words/table/single_row/PreviewMode.vue";
import EditMode from "@/components/datasets_manager/modify/words/current_words/table/single_row/EditMode.vue";

export default defineComponent({
    props: {
        word: {
            type: Object as PropType<CurrentWord>,
            required: true,
        },
        index: {
            type: Number as PropType<number>,
            required: true,
        },
    },
    components: { SingleRowProgressStatus, PreviewMode, EditMode },
    setup() {
        const turnEditModeOn = ref<boolean>(false);
        const toggleEditMode = () => {
            turnEditModeOn.value = !turnEditModeOn.value;
        };

        return { toggleEditMode, turnEditModeOn };
    },
});
</script>
