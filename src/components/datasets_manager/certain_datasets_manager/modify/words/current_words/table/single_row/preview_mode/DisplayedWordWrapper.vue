<template>
    <DisplayedHelper :displayed="word.displayed" target="current">
        <div class="button-wrap">
            <button class="undo" :disabled="blockButton" @click="reset">
                <font-awesome-icon icon="undo-alt"></font-awesome-icon>
            </button>
        </div>
    </DisplayedHelper>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import CurrentWord from "@/classes/CurrentWord";

import DisplayedHelper from "@/components/datasets_manager/certain_datasets_manager/modify/words/__utils/table_cells/Displayed.vue";

export default defineComponent({
    props: {
        word: {
            type: Object as PropType<CurrentWord>,
            required: true,
        },
    },
    emits: ["toggle-edit-mode"],
    components: { DisplayedHelper },
    setup(props) {
        const blockButton = computed<boolean>(() => {
            return !props.word.hasBeenModified("displayed");
        });
        const reset = () => props.word.resetProperty("displayed");

        return { blockButton, reset };
    },
});
</script>
