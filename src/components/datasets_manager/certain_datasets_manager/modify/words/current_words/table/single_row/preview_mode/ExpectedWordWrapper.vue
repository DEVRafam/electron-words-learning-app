<template>
    <ExpectedHelper :expected="word.expected" target="current">
        <div class="button-wrap">
            <Pronunciation :word="word"></Pronunciation>
            <button class="undo" :disabled="blockButton" @click="reset">
                <font-awesome-icon icon="undo-alt"></font-awesome-icon>
            </button>
        </div>
    </ExpectedHelper>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from "vue";
import CurrentWord from "@/classes/CurrentWord";

import ExpectedHelper from "@/components/datasets_manager/certain_datasets_manager/modify/words/__utils/table_cells/Expected.vue";
import Pronunciation from "./Pronunciation.vue";

export default defineComponent({
    props: {
        word: {
            type: Object as PropType<CurrentWord>,
            required: true,
        },
    },
    emits: ["toggle-edit-mode"],
    components: { ExpectedHelper, Pronunciation },
    setup(props) {
        const blockButton = computed<boolean>(() => {
            return !props.word.hasBeenModified("expected");
        });
        const reset = () => props.word.resetProperty("expected");

        return { blockButton, reset };
    },
});
</script>
