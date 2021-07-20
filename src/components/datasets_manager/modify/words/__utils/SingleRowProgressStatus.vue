<template>
    <template v-if="datasetWordsProgress">
        <td class="progress-status center" :class="datasetWordsProgress[word.expected]">
            {{ datasetWordsProgress[word.expected] ? datasetWordsProgress[word.expected] : "-" }}
        </td>
    </template>
    <td class="progress-status center" v-else>-</td>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import Word from "@/types/Word";
import useModifier from "@/composable/datasets_manager/useModifier";

export default defineComponent({
    props: {
        word: {
            type: Object as PropType<Word>,
            required: true,
        },
    },
    setup() {
        const { datasetWordsProgress } = useModifier;
        return { datasetWordsProgress };
    },
});
</script>
