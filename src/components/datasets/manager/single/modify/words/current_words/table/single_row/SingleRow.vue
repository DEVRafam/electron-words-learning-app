<template>
    <tr :class="{ editMode: turnEditModeOn, predeleted: word.isInDeletingList(), modified: hasBeenModified }">
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
// Tools
import CurrentWord from "@/classes/CurrentWord";
import { defineComponent, PropType, ref, watch, computed } from "vue";
// Composable
import { loadExtendedContent } from "@/composable/datasets_manager/useModifier";
// Components
import PreviewMode from "./preview_mode/PreviewMode.vue";
import EditMode from "./edit_mode/EditMode.vue";
//
import SingleRowProgressStatus from "@/components/datasets/manager/single/modify/words/__utils/table_cells/SingleRowProgressStatus.vue";

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
    setup(props) {
        const turnEditModeOn = ref<boolean>(false);
        const toggleEditMode = () => {
            turnEditModeOn.value = !turnEditModeOn.value;
        };
        watch(turnEditModeOn, (val) => {
            if (val && props.word.isInDeletingList()) turnEditModeOn.value = false;
        });
        watch(loadExtendedContent, () => (turnEditModeOn.value = false));

        const hasBeenModified = computed<boolean>(() => {
            return props.word.hasBeenModified("expected") || props.word.hasBeenModified("displayed");
        });
        return { toggleEditMode, turnEditModeOn, hasBeenModified };
    },
});
</script>
