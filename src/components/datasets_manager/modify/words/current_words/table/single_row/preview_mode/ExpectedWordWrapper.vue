<template>
    <ExpectedHelper :expected="word.expected" target="current">
        <button class="undo" :disabled="blockButton" @click="reset">
            <font-awesome-icon icon="undo-alt"></font-awesome-icon>
        </button>
    </ExpectedHelper>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from "vue";
import CurrentWord from "@/classes/CurrentWord";

import ExpectedHelper from "@/components/datasets_manager/modify/words/__utils/table_cells/Expected.vue";

export default defineComponent({
    props: {
        word: {
            type: Object as PropType<CurrentWord>,
            required: true,
        },
    },
    emits: ["toggle-edit-mode"],
    components: { ExpectedHelper },
    setup(props) {
        const blockButton = computed<boolean>(() => {
            return !props.word.hasBeenModified("expected");
        });
        const reset = () => props.word.resetProperty("expected");

        return { blockButton, reset };
    },
});
</script>
