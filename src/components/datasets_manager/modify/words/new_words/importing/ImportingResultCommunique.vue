<template>
    <span id="importing-result-communique" :class="importingResult">
        <!--  -->
        <template v-if="importingResult == 'negative'">
            <font-awesome-icon icon="times-circle"></font-awesome-icon>
        </template>
        <!--  -->
        <template v-else-if="importingResult == 'positive'">
            <font-awesome-icon icon="check-circle"></font-awesome-icon>
        </template>
    </span>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import useModifier from "@/composable/datasets_manager/useModifier";
//
export default defineComponent({
    setup() {
        const { amountOfImportedWords } = useModifier.useWordsManager;
        const { importingResult } = useModifier.useImporting;
        const hasOrHave = computed<"has" | "have">(() => {
            return amountOfImportedWords.value == 1 ? "has" : "have";
        });
        //
        return { importingResult, amountOfImportedWords, hasOrHave };
    },
});
</script>
