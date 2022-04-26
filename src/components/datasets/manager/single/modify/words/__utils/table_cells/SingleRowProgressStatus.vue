<template>
    <template v-if="datasetWordsProgress">
        <td class="progress-status center" :class="datasetWordsProgress[word.expected]">
            {{ datasetWordsProgress[word.expected] ? datasetWordsProgress[word.expected] : "-" }}
        </td>
    </template>
    <td class="progress-status center" v-else>-</td>
</template>

<script lang="ts">
// Tools
import { defineComponent, PropType } from "vue";
// Types
import type Word from "@/types/Word";
// Composable
import useWordsManager from "@/composable/datasets_manager/submodules/useWordsManager";

export default defineComponent({
    props: {
        word: {
            type: Object as PropType<Word>,
            required: true,
        },
    },
    setup() {
        const { datasetWordsProgress } = useWordsManager;
        return { datasetWordsProgress };
    },
});
</script>
